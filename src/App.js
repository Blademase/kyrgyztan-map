// src/App.js
import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent/MapComponent';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 0.5 second delay

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <Header />
          <div className="content">
            <MapComponent />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
