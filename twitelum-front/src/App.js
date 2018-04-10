import React, { Component } from 'react';
import Cabecalho from './componentes/Cabecalho';
import NavMenu from './componentes/NavMenu'
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Cabecalho>
          <NavMenu usuario="ronaldtheodoro"/>
        </Cabecalho>
      </div>
    );
  }
}

export default App;