import React from 'react';
import ReactDOM from 'react-dom';

// CSS Global
import './assets/css/reset.css'
import './assets/css/container.css'
import './assets/css/btn.css'
import './assets/css/icon.css'
import './assets/css/iconHeart.css'
import './assets/css/notificacao.css'

import './assets/css/novoTweet.css'
// import './index.css';

import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import Router from './router.js'


ReactDOM.render(
  <BrowserRouter>
    <Router/>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
