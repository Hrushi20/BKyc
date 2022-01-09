import React from 'react';
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import docs from "../../../assets/docs.svg"
import { useState } from "react";


const Form3 = ({ setAadhar,setPan,pan,aadhar, setValidate3 }) => {

    React.useEffect(() => {
        setValidate3(pan != null && aadhar != null)
    })

    const [isPanImgLarge,setIsPanImgIsLarge] = useState(false);
    const [isAadharImgLarge,setIsAadharImgLarge] = useState(false);

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
            </Box>
        </div>
    )
};

export default Form3;