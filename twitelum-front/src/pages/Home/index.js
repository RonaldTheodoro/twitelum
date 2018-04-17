import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import Modal from '../../components/Modal'


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
    // this.adicionaTweet = this.adicionaTweet.bind(this)

    if (!localStorage.getItem('TOKEN'))
      props.history.push('/login')
  }

  componentWillMount() {
    this.context.store.subscribe(() => {
      this.setState({
        tweets: this.context.store.getState()
      })
    })
  }

  componentDidMount() {
    const token = localStorage.getItem('TOKEN')

    fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${token}`)
      .then((response) => response.json())
      .then((tweets) => {
        this.context.store.dispatch({ type: 'CARREGA_TWEETS', tweets: tweets })
        // this.setState({ tweets })
      })
  }

  adicionaTweet = (event) => {
    event.preventDefault()
    const novoTweet = this.state.novoTweet
    const tweetsAntigos = this.state.tweets

    const token = localStorage.getItem('TOKEN')

    if (novoTweet) {
      fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${token}`, {
        method: 'POST',
        body: JSON.stringify({ conteudo: novoTweet })
      }).then((response) => response.json())
        .then((response) => this.setState({
          tweets: [response, ...tweetsAntigos],
          novoTweet: ''
        })
        )
    }
  }

  removeTweet = (tweetId) => {
    const token = localStorage.getItem('TOKEN')
    const url = `http://localhost:3001/tweets/${tweetId}?X-AUTH-TOKEN=${token}`

    fetch(url, {
      method: 'DELETE',
    }).then((response) => response.json())
      .then((response) => this.setState({
        tweets: this.state.tweets.filter(tweet => tweet._id !== tweetId),
        tweetAtivo: {}
      }))
    /*
    this.runFetch(url, { method: 'DELETE' }, (response) => this.setState({
      tweets: this.state.tweets.filter(tweet => tweet._id !== tweetId)
    }))
    */
  }

  abreModalParaTweet = (event, tweetId) => {
    const isTweetHeader = event.target.closest('.tweet__cabecalho')
    const isTweetFooter = event.target.closest('.tweet__footer')

    if (isTweetHeader || isTweetFooter)
      return false

    this.setState({
      tweetAtivo: this.state.tweets.find(tweet => tweet._id === tweetId)
    })
  }

  fechaModal = (event) => {
    const isModal = event.target.closest('.widget')

    if (!isModal)
      this.setState({
        tweetAtivo: {}
      })
  }

  runFetch = (url, data, func) => {
    fetch(url, data)
      .then((response) => response.json())
      .then((response) => func(response))
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
                    removeHandler={() => this.removeTweet(tweet._id)}
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
