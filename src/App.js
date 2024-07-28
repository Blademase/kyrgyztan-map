// src/App.js
import React from 'react';
import MapComponent from './components/MapComponent/MapComponent';
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
           <MapComponent />
         
      <Footer/>
    </div>
  );
}

export default App;
