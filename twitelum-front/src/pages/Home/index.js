import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'

class Home extends Component {
  constructor(props) {
    super()
    this.state = {
      novoTweet: '',
      tweets: []
    }
    // this.adicionaTweet = this.adicionaTweet.bind(this)

    if (!localStorage.getItem('TOKEN'))
      props.history.push('/login')
  }

  componentDidMount() {
    const token = localStorage.getItem('TOKEN')

    fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${token}`)
      .then((response) => response.json())
      .then((tweets) => this.setState({ tweets }))
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
                  <span className={`novoTweet__status ${this.state.novoTweet.length > 140 ? 'novoTweet__status--invalido' : ''}`}>
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
                {this.state.tweets.length === 0 ?
                  'Nenhum tweet encontrado :(' : ''}
                {this.state.tweets.map((tweet, index) =>
                  <Tweet key={tweet + index} texto={tweet.conteudo} tweetInfo={tweet} />
                )}
              </div>
            </Widget>
          </Dashboard>
        </div>
      </Fragment>
    )
  }
}

export default Home;
