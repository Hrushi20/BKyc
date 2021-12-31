import React, {useEffect} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import Home from './views/Home';

const LazyAbout = React.lazy(() => import('./views/About'));
const LazyError = React.lazy(() => import('./views/Error'));

function App() {
  


  return (
    <>
      <React.Suspense fallback="Loading ..." >
       <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<LazyAbout />} />
          <Route path='*' element={<LazyError />} />
      </Routes>
      </React.Suspense>
    </>
  );
}

export default App;
