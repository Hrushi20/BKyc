import React , {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Loader from './components/loader';
import Home from './views/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import UserRole from './views/UserRole';
import useKyc from './hooks/useKyc';

const LazyStatus = React.lazy(() => import('./views/Status'));
const LazyError = React.lazy(() => import('./views/Error'));
const LazyProfile = React.lazy(() => import('./views/Profile'));
const LazyClients = React.lazy(() => import('./views/AddClients'));
const LazyNotif = React.lazy(() => import('./views/Notifications'));

function App() {

  const { isLoading } = useAuth0();

  const user = localStorage.getItem("user-data");
  const ustatus = user ? JSON.parse(user).status : null;


    const [status, setStatus] = useState(ustatus);
    const [role, setRole] = useState(null);



  return (
    <>
      <React.Suspense fallback={<Loader />} >
        {isLoading ?
         <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
           <img src={require('../src/assets/loading.gif')} alt="loading..." />
         </div>
         :
        <Routes>
            <Route path='/' element={<Home role={role} setRole={setRole} status={status} setStatus={setStatus} />} />
            <Route path='/status' element={<LazyStatus />} />
            <Route path='/profile' element={<LazyProfile role={role} setRole={setRole} status={status} setStatus={setStatus} />} />
            <Route path='/add-clients' element={<LazyClients />} />
            <Route path='/notifications' element={<LazyNotif />} />
            <Route path='*' element={<LazyError />} />
        </Routes>
      }
      <ToastContainer />
      </React.Suspense>
    </>
  );
}

export default App;
