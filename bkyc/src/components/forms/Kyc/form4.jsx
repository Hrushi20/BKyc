import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { Box } from "@mui/system";
import submit from "../../../assets/form4.svg";
import Webcam from "react-webcam";
import { useRef } from "react";
import { useCallback } from "react";
import React from "react";


const Form4 = ({ submitKyc,setLivePhoto, livePhoto }) => {

    const webcamRef = useRef(null);

    const [checked, setChecked] = React.useState(false);

    const handleChange = () => setChecked(!checked)

    const capturePhoto = useCallback(() => {

        setLivePhoto(webcamRef.current.getScreenshot())

    },[setLivePhoto])

    return (
        <div style={{ display:"flex", alignItems:"center", justifyContent: "space-around", width: '100%'}}>
            <Box style={{alignItems: 'center', justifyContent:'center', display: 'flex', flexDirection: 'column'}}>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    style={{width: 400, border: '2px solid gray', borderRadius: 10 }}
                />
                <br /><br />
                <Button onClick={capturePhoto}>Capture Photo</Button>
                {livePhoto && (
                    <img
                    src={livePhoto}
                    />
                )}
                <br />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Please check all the documents before submitting your documents." />               
                <br /><br />
                <Button variant="contained" color="success" onClick={submitKyc}>Submit</Button>

            </Box>   
            <div>
                <img style={{width:300,height:300}} src={submit} alt="This is an img"/>
            </div>
        </div>
    )
};

export default Form4;