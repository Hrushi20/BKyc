import React, { useEffect, useState, useRef} from 'react'
import Nav from './Nav'
import Fade from 'react-reveal';
import {  toast } from 'react-toastify';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Fab, Typography, Modal, TextField, Button } from '@mui/material';
import '../styles/clients.css';
import AddIcon from '@mui/icons-material/Add';
import loadingform from '../assets/loadingform.json';
import Lottie from 'react-lottie';
import Footer from '../components/Footer';
import RefreshIcon from '@mui/icons-material/Refresh';


export function TabPanel(props) {
    const { children, value, index } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

function AddClients() {

  const loadingForm = {
    loop: true,
    autoplay: true,
    animationData: loadingform,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

    const [value, setValue] = useState(0);
    const [id, setId] = useState('');
    const idInput = useRef(null);

    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userKyc, setUserKyc] = useState(null);
    const [blockchainResponse, setBlockchainResponse] = useState(null);

    const user = localStorage.getItem("user-data");
    const bankId = JSON.parse(user).userId;

    console.log("user : ",userDetails);

    useEffect(() => {
      async function getAllUsers () {
        const res = await (await fetch(`${process.env.REACT_APP_PORTAL}/bank/getAllUserDetails/${bankId}`)).json();
        setUserDetails(res.userDetails);
        setLoading(false);
      }

      getAllUsers();

  }, [])

    function checkGranted(item) {
       return item.userId == id;
    }

    async function requestUserAccessForKyc() {
      const alreadyGranted = userDetails?.granteduserDetails?.some(checkGranted);
      const alreadyPending = userDetails?.pendinguserDetails?.some(checkGranted);

      if(alreadyGranted) toast("User granted acccess already !");
      else if(alreadyPending) toast("User is already in pending list !");
      else {
        const res = await (await fetch(`${process.env.REACT_APP_PORTAL}/bank/requestUserKyc`, {
            method: "POST",
            body: JSON.stringify({ userId: id, bankId }),
            headers: {
                "Content-Type": "application/json"
            }
        })).json();

        console.log("request access resp : ", res);

        toast(res.message);
      }
  }
   
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function fetchUserKyc(userId){
      const res = await (await fetch(`${process.env.REACT_APP_PORTAL}/ethereum/get-decrypted-kyc-for-bank/${userId}`)).json();
      console.log(res);
      console.log("Need to display user Kyc");
    }

    return (
        <div>
            <div className="sec1">
              <div className="front profile">
                <Nav />
                <div className="mainHeading">
                    <p className="title">
                      <Fade left cascade> Add clients </Fade>
                    </p>
                    <p className="tagline"> Know all about the accepted and pending client requests  </p>
                </div>
              </div>
               <div className="back profile" />
            </div> 
            
            { !loading ? 
            <>
              <form >
                <fieldset className='formid'>
                      <legend className='tit'>  Add clients  </legend>
                      <TextField inputRef={idInput} style={{ margin:10 }} fullWidth label="user ID" variant="outlined" type="text" value={id} onChange={(e)=>setId(e.target.value)}/>
                      <Button onClick={requestUserAccessForKyc} sx={{padding: '4px 52px', margin: '12px 8px;'}} color='info' variant='contained'> Request Access  </Button>
                </fieldset>
              </form>
              <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                <Button onClick={() => window.location.reload()} startIcon={<RefreshIcon />} sx={{padding: '4px 44px', marginTop: 4, marginRight: 4}} color='warning' variant='contained'> Refresh </Button>
              </div>
              <div className="req">
                  <Tabs value={value} onChange={handleChange} className='tabs' >
                      <Tab label="Active"  />
                      <Tab label="Pending" />
                  </Tabs>
                  
                  <TabPanel value={value} index={0}>
                      {!userDetails?.granteduserDetails.length && <p className='empty'> No user records </p> }
                      {userDetails?.granteduserDetails.map(item => ( 
                      <div className='ubox'>
                        <p className='uname'>{item.username}</p>
                        <p className='uid'>USER - ID : &nbsp;&nbsp;&nbsp;  {item.userId}</p>
                        <Button onClick={()=>fetchUserKyc(item.userId)}>View Kyc</Button>
                      </div>
                     ))}
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    {!userDetails?.pendinguserDetails.length && <p className='empty'> No user records </p> }
                    {userDetails?.pendinguserDetails.map(item => ( 
                      <div className='ubox'>
                        <p className='uname'>{item.username}</p>
                        <p className='uid'>USER - ID : &nbsp;&nbsp;&nbsp;  {item.userId}</p>
                      </div>
                     ))}
                  </TabPanel>
                  <div className="fab">
                      <Fab onClick={() => console.log(idInput?.current?.focus()) } color='primary'>
                          <AddIcon />
                      </Fab>
                  </div>
                  
              </div>
            </> : <Lottie
                    options={loadingForm}
                    width={400}
                />
          }

          <Footer />

        </div>
    )
}

export default AddClients;
