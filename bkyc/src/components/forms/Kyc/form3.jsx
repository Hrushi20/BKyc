
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import contact from "../../../assets/suggestions.svg"
import Webcam from "react-webcam";
import { useRef } from "react";
import { useCallback } from "react";

const Form3 = ({ setLivePhoto,livePhoto }) => {

    const webcamRef = useRef(null);

    const capturePhoto = useCallback(() => {

        setLivePhoto(webcamRef.current.getScreenshot())

    },[setLivePhoto])

    return (
        <div style={{ display:"flex",alignItems:"center" }}>
            <div>
                <img style={{width:300,height:300}} src={contact} alt="This is an img"/>
            </div>
            <Box >
                <input type="file"/>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                />
                <button onClick={capturePhoto}>Capture Photo</button>
                {livePhoto && (
                    <img
                    src={livePhoto}
                    />
                )}
            </Box>
        </div>
    )
};

export default Form3;