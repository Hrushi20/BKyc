import { Button, Checkbox, FormControlLabel, Modal, TextField } from "@mui/material";
import pay from "../../assets/pay.svg";
import { useState } from 'react';
import { Box } from "@mui/system";
import '../../styles/item.css';

function DisplayKyc(data) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70vw',
        bgcolor: 'white',
        border: '1px solid #000',
        borderRadius: 1,
        boxShadow: 24,
        height: '90vh',
        overflow: 'auto',
        display: 'flex',
    };

    return (
        <Box sx={style} >
            <div className="left-content">
                <img src={data.livePhoto} alt="live" width={200} style={{ border: '2px solid gray', borderRadius: 10 }} />
                <div className="detail"><p className='que'>First name : </p> {data.firstName}</div>
                <div className="detail"><p className='que'>Last name : </p> {data.lastName}</div>
                <div className="detail"><p className='que'>Middle name : </p> {data.middleName}</div>
                <div className="detail"><p className='que'>Date-of-Birth : </p> {data.dob}</div>
                <div className="detail"><p className='que'>Email : </p> {data.email}</div>
            </div>
            <div className="right-content">
                <div className="detail"><p className='que'>Phone : </p> {data.phoneNumber}</div>
                <div className="detail"><p className='que'>Address : </p><p style={{ width: '60%' }}> {data.address} </p></div>
                <div className="detail"><p className='que'>Pin : </p> {data.pincode}</div>
                <div className="detail"><p className='que'>Aadhaar & Pan-card : </p></div>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }} className="docs">
                    <img src={data.aadhar} alt="aadhaar" width={100} style={{ border: '2px solid gray', borderRadius: 10 }} />
                    <img src={data.pan} alt="pan" width={100} style={{ border: '2px solid gray', borderRadius: 10 }} />
                </div>
            </div>
        </Box>
    )
}

const PaymentPending = ({ connectToMetamask, address, isInstalled, sendKycToEthereum, decodeUserKyc, userKyc }) => {

    const [cipherKey, setCipherKey] = useState("");
    const [checked, setChecked] = useState(false);

    const [open, setOpen] = useState(false);
    const handleClose = () => { setOpen(false); }
    const handleOpen = () => { setOpen(true); }

    return (
        <div className='payment'>
            <p className="pay-tit">You are almost there ! </p>
            <img style={{ width: 300, height: 300 }} src={pay} alt="This is an img" />
            <p className="pay-cont"> Complete the payment using Metamask to enjoy the benefits of BLOCKCHAIN </p>
            {!isInstalled && <Button color='success' variant='contained'> <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en-US' rel="noreferrer" target="_blank"> Install Metamask </a></Button>}
            {!address && isInstalled && <Button color='success' variant='contained' onClick={connectToMetamask}> Connect to metamask </Button>}
            {address && isInstalled && <p>Your wallet with address: {address} has been connected to our website</p>}
            <div style={{margin: '32px 0', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <label>
                    <TextField fullWidth label='Enter cipher-key' type="text" value={cipherKey} onChange={(e) => setCipherKey(e.target.value)} />
                    <Button style={{marginBottom: 24}} onClick={() => {handleOpen(); decodeUserKyc(cipherKey);} }>Confirm Cipher Key</Button> <br/>
                </label>
                {userKyc &&
                    <>
                        <Modal open={open} onClose={handleClose} >
                             <DisplayKyc {...userKyc} />
                        </Modal>
                        <FormControlLabel control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />} label="Confirm kyc" />
                        <Button disabled={!checked} variant='outlined' onClick={() => sendKycToEthereum(cipherKey)}> Pay Ethers </Button>
                    </>
                }
            </div>
        </div>
    )
}

export default PaymentPending;