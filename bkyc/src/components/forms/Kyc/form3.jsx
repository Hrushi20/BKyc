import React from 'react';
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import docs from "../../../assets/docs.svg"
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Pin from '../../../assets/pin.svg';
import Lottie from 'react-lottie';

const Form3 = ({ setAadhar,setPan,setLocation, location, pan,aadhar, setValidate3 }) => {

    React.useEffect(() => {
        setValidate3(pan != null && aadhar != null)
    })

    const [isPanImgLarge,setIsPanImgIsLarge] = useState(false);
    const [isAadharImgLarge,setIsAadharImgLarge] = useState(false);

    const [viewport, setViewport] = React.useState({
        zoom: 14,
        bearing: 0,
        pitch: 50
      });


    const getLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(getAdress, (err) => console.log("Error ", err));
        }else{
            console.log("browser uncompatible to location");
        }
    }

    const getAdress = (position) => {
        console.log(position);
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        fetch(`https://eu1.locationiq.com/v1/reverse.php?key=pk.e19562da8a3935341ea561085bac486f&lat=${lat}&lon=${long}&format=json`)
            .then(res => res.json())
            .then(data => {setLocation({lat,long, addr: data.display_name}); console.log(data);})
    }

    function restrictFileSize(file,type){

        const size = file.size / 1024; // KB

        if(size > 150){
            // Error mangement
            console.log("File too large");
            if(type === 'aadhar')
                setIsAadharImgLarge(true);
            else if(type === 'pan')
                setIsPanImgIsLarge(true);
            return;
        }

        if(type === 'aadhar'){
            setAadhar(file);
            setIsAadharImgLarge(false);
        }
        else if(type === 'pan'){
            setPan(file);
            setIsPanImgIsLarge(false);
        }
        else
            console.log("Shoudln't be here bro");

    }

    return (
        <div style={{ display:"flex", alignItems:"center", justifyContent: "space-around", width: '100%'}}>
            <div>
                <img style={{width:300,height:300}} src={docs} alt="This is an img"/>
            </div>
            <Box>
            <div style={{ marginTop:5,marginBottom:30, fontFamily: 'Nunito Sans'}}>
                <span>Note: </span>
                <span>Image size should be less 150KB.</span>
            </div>
            <span style={{fontFamily: 'Nunito Sans', paddingRight: 46, fontWeight: 'bolder', fontSize: 20}}> Aadhar Card : </span>
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="aadhaar-file"
                onChange={(e)=>restrictFileSize(e.target.files[0],'aadhar')}
            />
            <label htmlFor="aadhaar-file">
                <Button size="large" variant="contained" color="primary" component="span">
                Upload
                </Button>
            </label>
            <span style={{marginLeft:10}}>{aadhar?.name}</span>
            {isAadharImgLarge && <span style={{marginLeft:10, color:"red"}}>Img too large</span>}
            <br /><br /><br />

           <span style={{fontFamily: 'Nunito Sans', paddingRight: 70, fontWeight: 'bolder', fontSize: 20}}> PAN Card : </span>
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="pan-file"
                onChange={(e)=>restrictFileSize(e.target.files[0],'pan')}
            />
            <label htmlFor="pan-file">
                <Button size="large" variant="contained" color="primary" component="span">
                Upload
                </Button>
            </label>
                <span style={{marginLeft:10}}>{pan?.name}</span>
                {isPanImgLarge && <span style={{marginLeft:10, color:"red"}}> Img too large</span>}
            
            <div  style={{margin: '24px 0', alignItems:'flex-start', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}} className="loc">
                <Button onClick={getLocation} color="info" > Get Live Location</Button>
                { location.lat && location.long && 
                 <ReactMapGL
                    {...viewport}
                    latitude= {location.lat}
                    longitude= {location.long} 
                    width= {500}
                    height= {300}
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    onViewportChange={setViewport}
                    mapboxApiAccessToken='pk.eyJ1IjoiYmt5YyIsImEiOiJja3liOTA3M3EwY3lnMnBwYmM5MTl3Mm9pIn0.HVCUmG3sO4Wl3QZ5B5EEWw'
                >
                    <Popup
                        style={{backgroundColor: 'red'}}
                        tipSize={-15}
                        anchor="bottom"
                        longitude={location.long}
                        latitude={location.lat}
                        closeOnClick={false}
                    >
                        <p style={{fontSize: 12, width: 124, padding: 12, fontFamily: 'Nunito', backgroundColor: '#ff9933'}} className="popup">{location.addr}</p>
                        
                    </Popup>
                  <Marker longitude={location.long} latitude={location.lat} offsetTop={-viewport.zoom * 3 / 2} >
                    <img alt='user-location' src={Pin} width={viewport.zoom} height={viewport.zoom} />
                  </Marker>
                </ReactMapGL>}
                
                
            </div>
        </Box>
        </div>
    )
};

export default Form3;