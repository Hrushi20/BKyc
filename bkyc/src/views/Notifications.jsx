import React, {useState, useEffect} from 'react'
import Nav from './Nav'
import Fade from 'react-reveal';
import Slide from 'react-reveal/Slide';
import Zoom from 'react-reveal/Zoom';
import { TabPanel } from './AddClients';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Button, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import loadingform from '../assets/loadingform.json';
import Lottie from 'react-lottie';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const Req = ({item, role, grantBankAccess, rejectBankAccess,terminateBankAccess}) => (
   <div style={{display: 'flex',justifyContent:'space-between', alignItems:'center', borderBottom: '1px solid#b3b3b3' }}>
      <div className="details">
          <p className='uid bid'>BANK - ID : &nbsp;&nbsp;&nbsp;  {item.bankId}</p>
      </div>
      <div className="buttons">
        {role === 'pending' && <Tooltip title="Accept">
            <IconButton color='success' onClick={()=>grantBankAccess(item.bankId)}>
                <CheckCircleIcon style={{margin: '0 20'}} />
            </IconButton>
        </Tooltip>}
        <Tooltip title="Reject">
            <IconButton color='error' onClick={()=> role === 'pending' ? rejectBankAccess(item.bankId): terminateBankAccess(item.bankId)}>
                <CancelIcon style={{margin: '0 20'}} />
            </IconButton>
        </Tooltip>
      </div>
   </div>
)



function Notifications() {

  const [value, setValue] = useState(0);
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = localStorage.getItem("user-data");
  const userId = JSON.parse(user).userId;

  const loadingForm = {
    loop: true,
    autoplay: true,
    animationData: loadingform,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
   };

  useEffect(async() => {

      const res = await (await fetch(`${process.env.REACT_APP_PORTAL}/users/get-requests/${userId}`)).json();
      console.log("req resp : ", res);
      setRequests(res.requests);
      setLoading(false);
      console.log("all requests updated ");

  }, [])

  async function grantBankAccess(bankId){
    const res = await (await fetch(`${process.env.REACT_APP_PORTAL}/bank/grantedBankKyc`, {
      method:"POST",
      body: JSON.stringify({ userId,bankId }),
      headers: {
        "Content-type":"application/json"
      }
    })).json();
    console.log(res);
    const updatedPendingRequests = requests.pendingRequests.filter(request => request.bankId !== bankId);
    const updatedRequests = { ...requests,pendingRequests: updatedPendingRequests };
    setRequests(updatedRequests);
  }

  async function rejectBankAccess(bankId){
    const res = await (await fetch(`${process.env.REACT_APP_PORTAL}/bank/rejectBankKyc`, {
      method: "POST",
      body: JSON.stringify({ userId,bankId }),
      headers: {
        "Content-type":"application/json"
      }
    })).json();

    const updatedPendingRequests = requests.pendingRequests.filter(request => request.bankId !== bankId);
    const updatedRequests = { ...requests,pendingRequests: updatedPendingRequests };
    setRequests(updatedRequests);
  }

  async function terminateBankAccess(bankId){
     const res = await (await fetch(`${process.env.REACT_APP_PORTAL}/bank/terminateBankKyc`, {
      method: "POST",
      body: JSON.stringify({ userId,bankId }),
      headers: {
        "Content-type":"application/json"
      }
    })).json();

    const updatedGrantedRequests = requests.grantedRequests.filter(request => request.bankId !== bankId);
    const updatedRequests = { ...requests,grantedRequests: updatedGrantedRequests };
    setRequests(updatedRequests);
  }


    return (
        <div>
            <div className="sec1">
              <div className="front profile">
                <Nav />
                <div className="mainHeading">
                    <p className="title">
                      <Fade left cascade> Notifications </Fade>
                    </p>
                    <p className="tagline"> Know your accepted and pending KYC access-requests   </p>
                </div>
              </div>
                <div className="back profile" />
            </div> 

            <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                <Button onClick={() => window.location.reload()} startIcon={<RefreshIcon />} sx={{padding: '4px 44px', marginTop: 4, marginRight: 5}} color='warning' variant='contained'> Refresh </Button>
            </div>

            {!loading  ? 
            
            <div className="notifications req">
                  <Tabs value={value} onChange={handleChange} className='tabs' >
                      <Tab label="Pending"  />
                      <Tab label="Accepted" />
                  </Tabs>
                  
                  <TabPanel value={value} index={0}>
                      {!requests?.pendingRequests.length && <p className='empty'> No bank records </p> }
                      {requests?.pendingRequests.map(item => <Req role='pending' item={item} grantBankAccess={grantBankAccess} rejectBankAccess={rejectBankAccess}/>)}
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                      {!requests?.grantedRequests.length && <p className='empty'> No bank records </p> }
                      {requests?.grantedRequests.map(item => <Req role='granted' item={item} terminateBankAccess={terminateBankAccess}/>)}
                  </TabPanel>

              </div>

            : <Lottie
                  options={loadingForm}
                  width={400}
              />
          }
        </div>
    )
}

export default Notifications
