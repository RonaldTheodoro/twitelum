import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../containers/TweetPadrao'
import Modal from '../../components/Modal'
import * as TweetsAPI from '../../apis/TweetsAPI'


class Home extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super()
    this.state = {
      novoTweet: '',
      tweets: [],
      tweetAtivo: {}
    }

    if (!localStorage.getItem('TOKEN'))
      props.history.push('/login')
  }

  componentWillMount() {
    this.context.store.subscribe(() => {
      this.setState({
        tweets: this.context.store.getState().lista,
        tweetAtivo: this.context.store.getState().tweetAtivo
      })
    })
  }

  componentDidMount() {
    this.context.store.dispatch(TweetsAPI.carrega())
  }

  adicionaTweet = (event) => {
    event.preventDefault()
    const novoTweet = this.state.novoTweet

    this.context.store.dispatch(TweetsAPI.adiciona(novoTweet))
    this.setState({ novoTweet: '' })
  }

  abreModalParaTweet = (event, tweetId) => {
    const ignoraModal = event.target.closest('.ignoraModal')

    if (!ignoraModal)
      this.context.store.dispatch({ type: 'ADD_TWEET_ATIVO', tweetId })
  }

  fechaModal = (event) => {
    const isModal = event.target.closest('.widget')

    if (!isModal)
      this.context.store.dispatch({type: 'REMOVE_TWEET_ATIVO'})
  }

  render() {
    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
          <Dashboard>
            <Widget>
              <form className="novoTweet" onSubmit={this.adicionaTweet}>
                <div className="novoTweet__editorArea">
                  <span className={`novoTweet__status ${this.state.novoTweet.length > 140 && 'novoTweet__status--invalido'}`}>
                    {this.state.novoTweet.length}/140
                  </span>
                  <textarea
                    value={this.state.novoTweet}
                    onChange={(event) => {
                      this.setState({ novoTweet: event.target.value })
                    }}
                    className="novoTweet__editor"
                    placeholder="O que está acontecendo?">
                  </textarea>
                </div>
                <button type="submit" disabled={this.state.novoTweet.length > 140 ? true : false} className="novoTweet__envia">Tweetar</button>
              </form>
            </Widget>
            <Widget>
              <TrendsArea />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              <div className="tweetsArea">
                {this.state.tweets.length === 0 && 'Nenhum tweet encontrado'}
                {this.state.tweets.map((tweet, index) =>
                  <Tweet
                    key={tweet._id}
                    handleAbreModalParaTweet={(event) => this.abreModalParaTweet(event, tweet._id)}
                    tweetInfo={tweet} />
                )}
              </div>
            </Widget>
          </Dashboard>
        </div>
        <Modal fechaModal={this.fechaModal} isAberto={!!this.state.tweetAtivo._id}>
          <Widget>
            <Tweet
              key={this.state.tweetAtivo._id}
              removeHandler={(event) => this.removeTweet(this.state.tweetAtivo._id)}
              handleAbreModalParaTweet={(event) => this.abreModalParaTweet(event, this.state.tweetAtivo._id)}
              tweetInfo={this.state.tweetAtivo} />
          </Widget>
        </Modal>
      </Fragment>
    )
  }
}

export default Home;
