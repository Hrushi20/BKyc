import React , {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Loader from './components/loader';
import Home from './views/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const LazyStatus = React.lazy(() => import('./views/Status'));
const LazyError = React.lazy(() => import('./views/Error'));
const LazyProfile = React.lazy(() => import('./views/Profile'));
const LazyClients = React.lazy(() => import('./views/AddClients'));
const LazyNotif = React.lazy(() => import('./views/Notifications'));

function App() {

  const authData = useAuth0();

  const user = localStorage.getItem("user-data");
  const ustatus = user ? JSON.parse(user).status : null;
  const urole = user ? JSON.parse(user).role : null;

  const [status, setStatus] = useState(ustatus);
  const [role, setRole] = useState(urole);
  const [loading, setLoading] = useState(true);

  async function findUserinMongoose() {

    console.log("app useEffect ", role);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData)
    }
      const data = await (await fetch(`${process.env.REACT_APP_PORTAL}/users/get-user`, requestOptions)).json();
      if(data) {
      const jsonData = { userId : data.userId, role: data.role, status: data.status }
      localStorage.setItem("user-data", JSON.stringify(jsonData));
      setStatus(data.status);
      setRole(data.role); 
      } 
      else setRole(null);
      setLoading(false);
  }

  
 useEffect(() => {
     findUserinMongoose();
 })


  return (
    <>
      <React.Suspense fallback={<Loader />} >
        {loading && authData.isLoading ?
         <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
           <img src={require('../src/assets/loading.gif')} alt="loading..." />
         </div>
         :
        <Routes>
            <Route path='/' element={<Home role={role} setRole={setRole} status={status} setStatus={setStatus} />} />
            <Route path='/status' element={<LazyStatus role={role} />} />
            <Route path='/profile' element={<LazyProfile role={role} setRole={setRole} status={status} setStatus={setStatus} />} />
            <Route path='/add-clients' element={<LazyClients role={role} />} />
            <Route path='/notifications' element={<LazyNotif role={role} />} />
            <Route path='*' element={<LazyError />} />
        </Routes>
      }
      <ToastContainer />
      </React.Suspense>
    </>
  );
}

export default App;
