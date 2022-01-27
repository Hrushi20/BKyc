import Lottie from "react-lottie";
import reviewAnim from "../../assets/review.json";
import { Button } from "@mui/material";

const review = {
    loop: true,
    autoplay: true,
    animationData: reviewAnim,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

const pending = () => {
    
    return (
        <>
            <p className="statuscontent"> Please Wait !!. Your KYC is under process. </p>
            <Lottie
                options={review}
                height={400}
                width={400}
            />
            <Button style={{ width:"100vw",margin:"20px auto" }}><a href={`https://a00c-223-230-46-181.ngrok.io/videoKyc?roomId=2413`} target="_blank">Video Kyc Verification</a></Button>
        </>
    )
}

export default pending;