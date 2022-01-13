import { Button, Checkbox, FormControlLabel } from "@mui/material";
import pay from "../../assets/pay.svg";
import { useState } from 'react';

function DisplayKyc( data ) {
   
    return (
        <div>
            Your decoded kyc will come here
        </div>
    )
}

const PaymentPending = ({ connectToMetamask, address, isInstalled, sendKycToEthereum, decodeUserKyc, userKyc }) => {

    const [cipherKey, setCipherKey] = useState("");
    const [checked,setChecked] = useState(false);

    return (
        <div className='payment'>
            <p className="pay-tit">You are almost there ! </p>
            <img style={{ width: 300, height: 300 }} src={pay} alt="This is an img" />
            <p className="pay-cont"> Complete the payment using Metamask to enjoy the benefits of BLOCKCHAIN </p>
            {!isInstalled && <Button color='success' variant='contained'> <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en-US' rel="noreferrer" target="_blank"> Install Metamask </a></Button>}
            {!address && isInstalled && <Button color='success' variant='contained' onClick={connectToMetamask}> Connect to metamask </Button>}
            {address && isInstalled && <p>Your wallet with address: {address} has been connected to our website</p>}
            <div>
                <label>
                    <span>Cipher Key: </span>
                    <input type="text" value={cipherKey} onChange={(e) => setCipherKey(e.target.value)} />
                    <Button onClick={() => decodeUserKyc(cipherKey)}>Confirm Cipher Key</Button>
                </label>
                {userKyc && <><DisplayKyc {...userKyc} />
                <FormControlLabel control={<Checkbox checked={checked} onChange={(e)=>setChecked(e.target.checked)}/>} label="Confirm kyc"/>
                <Button disabled={!checked} variant='outlined' onClick={() => sendKycToEthereum(cipherKey)}> Pay Ethers </Button></>}
            </div>
        </div>
    )
}

export default PaymentPending;