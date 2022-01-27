import Lottie  from "react-lottie";
import ethAnim from '../../assets/etherium.json';
import { Button } from "@mui/material";
import { useState } from "react";

const etherium = {
    loop: true,
    autoplay: true,
    animationData: ethAnim,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

const Verified = ({ getKycFromEthereum }) => {
    const [data,setData] = useState(null);

    async function fetchHash(){

        const ethereumData = await getKycFromEthereum();
        setData(ethereumData);
    }

    return (
        <div>
            <>
                <p className="statuscontent"> Congratulations !!. Your KYC is verified.  </p>
                <p className="statuscontent">Your kyc is safely stored on the ethereum blockchain...</p>
                <Lottie
                    options={etherium}
                    height={300}
                    width={300}
                />
                {!data ?<p className="statuscontent"> Know your Hash here - <Button onClick={fetchHash}> view Hash </Button> </p>:
                <div className="statuscontent">
                    <p>KycId: {data[0]}</p>
                    <p>IpfsHash: {data[1]}</p>
                    <p>CipherKey: {data[2]}</p>
                </div>}
            </>
        </div>
    )
};

export default Verified;