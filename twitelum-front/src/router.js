import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import LoginPage from './pages/LoginPage'


const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/*" component={ () => (<div>404</div>) }/>
    </Switch>
  )
}

export default Router