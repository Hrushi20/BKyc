import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import submit from "../../../assets/form4.svg";
import Webcam from "react-webcam";
import { useRef } from "react";
import { useCallback } from "react";
import React from "react";
import { main } from "../../../ai-models/FaceDetection";
import Alert from '@mui/material/Alert';
import {  toast } from 'react-toastify';
import Lottie from 'react-lottie';
import Facescan from '../../../assets/face-scan.json';

const Scan = () => {
    const style = {
        position: 'absolute',
        width: '100vw',
        bgcolor: 'rgba(256,256,256,0.6)',
        height: '100vh',
        overflow: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center'
    };
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(true);

    const scan = {
        loop: true,
        autoplay: true,
        animationData: Facescan,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    return (
        <Modal open={open} handleClose={handleClose} >
            <Box sx={style} >
                <Lottie options={scan} width={300} height={300} />
            </Box>
        </Modal>
    )
}


const Form4 = ({ submitKyc, setStatus,setLivePhoto, livePhoto }) => {

    const webcamRef = useRef(null);
    const facedetectionImg = useRef(null);
    const [checked, setChecked] = React.useState(false);
    const [init, setInit] = React.useState(true);
    const [temp, setTemp] = React.useState(false);
 
    const [faceDetected, setFaceDetected] = React.useState({ bool: false, loading: true});
    

    const checkErr = () => {
        !checked && toast.error("click the checkbox to continue !!");
        !livePhoto && toast.error("capture a live photo!");
    }

    const onSubmit = () => {
        if (checked && livePhoto) submitKyc(setStatus);
        else checkErr();
    }

    const capturePhoto = useCallback( () => {
        setInit(true);
        setFaceDetected({ bool: false, loading: true });
        setTemp(true);
        setLivePhoto(webcamRef.current.getScreenshot());

    },[setLivePhoto])

    React.useEffect( () => {
         
         async function faceDetect() {
            const detection = await main(facedetectionImg.current);
            setFaceDetected({bool: detection, loading: false});
            setInit(false);
            !detection && setLivePhoto(null);
        }
    
        livePhoto && faceDetect();
        
    }, [livePhoto])

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
                {livePhoto && <img ref={facedetectionImg} src={livePhoto} alt='LivePhoto' />}

                {init && temp && (faceDetected.loading ?  <Scan />
                    : !faceDetected.loading && faceDetected.bool ? toast.success("Image is good to go !", { position: toast.POSITION.TOP_CENTER })
                    : !faceDetected.loading && !faceDetected.bool ? toast.warning("Our AI tells there is no face in the captured pic" )
                    : null)
                }
                <br />
                <div style={{display: 'flex'}} className="check">
                    <input
                        type="checkbox"
                        id="check"
                        name="check"
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                        />
                    <label htmlFor="check" style={{fontFamily: 'Nunito', marginLeft: 16, position: "relative", top: -4}}> Please check all the documents before submitting your documents. </label>
                    
                </div>
                
                 <br /><br />
                <Button variant="contained" color="success" onClick={onSubmit}>Submit</Button>

            </Box>   
            <div>
                <img style={{width:300,height:300}} src={submit} alt="This is an img"/>
            </div>
        </div>
    )
};

export default Form4;