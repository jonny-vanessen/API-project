import "./App.css";
import Land from "./Conversation/Land";
import React, { useEffect, useState } from "react";
import {Switch, Link, Route} from 'react-router-dom'
import Home from './Home';

function App() {
  return (
    <div className="App flex-col align-center">
      <Switch>
        <Route exact path='/' component={Land}/>
        <Route exact path='/home' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
