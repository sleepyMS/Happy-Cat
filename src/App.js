import logo from './logo.svg';
import Nav from './Componenet/Nav/Nav'
import React, { useState } from 'react'; //추가
import './App.css';
import Map from './Componenet/Map/Map'

function App() {
  return (
    <div className="App">
      <Nav />
      <Map />
    </div>
  );
}

export default App;
