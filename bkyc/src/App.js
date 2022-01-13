import React from 'react';
import {Routes, Route} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Loader from './components/loader';
import Home from './views/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const LazyStatus = React.lazy(() => import('./views/Status'));
const LazyError = React.lazy(() => import('./views/Error'));
const LazyProfile = React.lazy(() => import('./views/Profile'));

function App() {

  // const loadingForm = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: loadingform,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice"
  //   }
  // };
  
  const { isLoading } = useAuth0();

  return (
    <>
      <React.Suspense fallback={<Loader />} >
        {isLoading ?
         <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
           <img src={require('../src/assets/loading.gif')} alt="loading..." />
         </div>
         :
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/status' element={<LazyStatus />} />
            <Route path='/profile' element={<LazyProfile />} />
            <Route path='*' element={<LazyError />} />
        </Routes>
      }
      <ToastContainer />
      </React.Suspense>
    </>
  );
}

export default App;
