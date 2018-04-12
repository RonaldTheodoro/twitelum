import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import LoginPage from './pages/LoginPage'


class PrivateRoute extends Component {
  estaAutenticado() {
    return (localStorage.getItem('TOKEN')) ? true : false
  }

  render() {
    if (this.estaAutenticado())
      return (<Route {...this.props} />)
    else
      return (<Redirect to="/login" />)
  }
}

const Router = () => {
  return (
    <Switch>
      <PrivateRoute path="/" exact component={Home} />
      <Route path="/login" component={LoginPage} />
      <Route path="/*" component={() => (<div>404</div>)} />
    </Switch>
  )
}

export default Router