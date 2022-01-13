import { Button } from "@mui/material";
import pay from "../../assets/pay.svg";

const paymentPending = ({ connectToMetamask,address,isInstalled,sendKycToEthereum,cipherKey,setCipherKey }) => {

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
                </label>
                <Button disabled={!address} variant='outlined' onClick={() => sendKycToEthereum()}> Pay Ethers </Button>
                {/* <Button disabled={!isConnected} variant='outlined' color='warning' onClick={getKycFromEthereum}>Get data</Button> */}
            </div>
        </div>
    )
}

export default paymentPending;