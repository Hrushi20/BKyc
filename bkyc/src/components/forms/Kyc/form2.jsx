import React from 'react';
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import contactInfo from "../../../assets/form2.svg";
import Fade from 'react-reveal/Fade';


const Form2 = ({ address,setAddress,pincode,setPhoneNumber,phoneNumber,setPincode,email,setEmail, click2, setValidate2 }) => {

    const [input1, setInput1] = React.useState(false);
    const [input2, setInput2] = React.useState(false);
    const [input3, setInput3] = React.useState(false);
    const [input4, setInput4] = React.useState(false);

    function validate(field, inp) {
        return field == '' && inp;
    }

    React.useEffect(() => {
        setValidate2(input1 && input2 && input3 && input4)
    })

    return (
        <div style={{ display:"flex", alignItems:"center", justifyContent: "space-around", width: '100%'}}>
          <Fade left cascade>
            <Box component="form" autoComplete="off" style={{width: 400}} >
                <TextField onBlur={() => setInput1(true)} error={!click2 ? validate(address, input1) : address == ''} style={{ margin:10 }} helperText={!click2 ? validate(address, input1) && "required" : address == '' && "required"}  label="Address" fullWidth  variant="outlined" type="text" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                <br/>
                <TextField onBlur={() => setInput2(true)} error={!click2 ? validate(pincode, input2) : pincode == ''} style={{ margin:10 }} helperText={!click2 ? validate(pincode, input2) && "required" : pincode == '' && "required"}  label="Pincode" fullWidth variant="outlined" type="number" value={pincode} onChange={(e)=>setPincode(e.target.value)}/>
                <br/>
                <TextField onBlur={() => setInput3(true)} error={!click2 ? validate(email, input3) : email == ''} style={{ margin:10 }} helperText={!click2 ? validate(email, input3) && "required" : email == '' && "required"} label="Email" fullWidth variant="outlined" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <br/>
                <TextField onBlur={() => setInput4(true)} error={!click2 ? validate(phoneNumber, input4) : phoneNumber == ''} style={{ margin:10 }} helperText={!click2 ? validate(phoneNumber, input4) && "required" : phoneNumber == '' && "required"} label="Phone No." fullWidth variant="outlined" type="number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
            </Box>
         </Fade>
            <div>
                <img style={{width:300,height:300}} src={contactInfo} alt="This is an img"/>
            </div>
        </div>
    )
};

export default Form2;