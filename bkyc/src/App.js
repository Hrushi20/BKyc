import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Loader from './components/loader';
import Home from './views/Home';

const LazyStatus = React.lazy(() => import('./views/Status'));
const LazyError = React.lazy(() => import('./views/Error'));
const LazyProfile = React.lazy(() => import('./views/Profile'));

function App() {
  
  return (
    <>
      <React.Suspense fallback={<Loader />} >
       <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/status' element={<LazyStatus />} />
          <Route path='/profile' element={<LazyProfile />} />
          <Route path='*' element={<LazyError />} />
      </Routes>
      </React.Suspense>
    </>
  );
}

export default App;
