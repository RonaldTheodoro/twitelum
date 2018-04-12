import React, { Component } from 'react'
import Widget from '../../components/Widget'

import './loginPage.css'


function MensagemErro(props) {
  if (props.errorMessage)
    return (
      <div className="loginPage__errorBox">
        {props.errorMessage}
      </div>
    )
  else
    return ''
}

class LoginPage extends Component {
  state = {
    errorMessage: ''
  }

  fazerLogin = (event) => {
    event.preventDefault()

    const dadosDeLogin = {
      login: this.inputLogin.value,
      senha: this.inputSenha.value
    }

    fetch('http://localhost:3001/login', {
      method: 'POST',
      body: JSON.stringify(dadosDeLogin)
    }).then((response) => {
      if (!response.ok)
        throw response;
      return response.json()
    }).then((responseEmJson) => {
      localStorage.setItem('TOKEN', responseEmJson.token)
      this.props.history.push('/')
    }).catch((responseError) => {
      responseError.json().then((response) => {
        this.setState({
          errorMessage: response.message
        })
      })
    })
  }

  render() {
    return (
      <div className="loginPage">
        <div className="container">
          <Widget>
            <h1 className="loginPage__title">Twitelum</h1>
            <form className="loginPage__form" action="/" onSubmit={this.fazerLogin}>
              <div className="loginPage__inputWrap">
                <label className="loginPage__label" htmlFor="login">Login</label>
                <input ref={(inputLogin) => this.inputLogin = inputLogin} className="loginPage__input" type="text" id="login" name="login" />
              </div>
              <div className="loginPage__inputWrap">
                <label className="loginPage__label" htmlFor="senha">Senha</label>
                <input ref={(inputSenha) => this.inputSenha = inputSenha} className="loginPage__input" type="password" id="senha" name="senha" />
              </div>
              <MensagemErro errorMessage={this.state.errorMessage}/>
              <div className="loginPage__inputWrap">
                <button className="loginPage__btnLogin" type="submit">
                  Logar
                </button>
              </div>
            </form>
          </Widget>
        </div>
      </div>
    )
  }
}


export default LoginPage