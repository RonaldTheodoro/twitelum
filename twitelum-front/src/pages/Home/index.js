import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      novoTweet: '',
      tweets: []
    }
    this.adicionaTweet = this.adicionaTweet.bind(this)
  }

  adicionaTweet (event) {
    event.preventDefault()
    const novoTweet = this.state.novoTweet
    const tweetsAntigos = this.state.tweets
    this.setState({
      tweets: [novoTweet, ...tweetsAntigos],
      novoTweet: ''
    })
  }

  render () {
    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario="@omariosouto" />
        </Cabecalho>
        <div className="container">
          <Dashboard>
            <Widget>
              <form className="novoTweet" onSubmit={ this.adicionaTweet }>
                <div className="novoTweet__editorArea">
                  <span className={`novoTweet__status ${ this.state.novoTweet.length > 140 ? 'novoTweet__status--invalido' : '' }` }>
                    { this.state.novoTweet.length }/140
                  </span>
                  <textarea
                    value={ this.state.novoTweet }
                    onChange={(event) => {
                      this.setState({novoTweet: event.target.value})
                    }}
                    className="novoTweet__editor"
                    placeholder="O que está acontecendo?">
                  </textarea>
                </div>
                <button type="submit" disabled={ this.state.novoTweet.length > 140 ? true : false } className="novoTweet__envia">Tweetar</button>
              </form>
            </Widget>
            <Widget>
              <TrendsArea />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              <div className="tweetsArea">
                { (this.state.tweets.length === 0) ? 'Nenhum tweet encontrado :(' : this.state.tweets.map(
                    (tweet, index) =>
                      <Tweet key={tweet + index} texto={tweet} />
                  ) }
              </div>
            </Widget>
          </Dashboard>
        </div>
      </Fragment>
    )
  }
}

export default Home;
