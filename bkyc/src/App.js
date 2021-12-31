import React, {useEffect} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import './App.css';
import About from './views/About';
import Error from './views/Error';
import Home from './views/Home';

function App() {
  
  return (
    <>
       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
