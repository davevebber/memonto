import React, { useState } from 'react';
import Nav from './components/Nav';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Nav />
      </Router>
    </>
  );
}

export default App;
