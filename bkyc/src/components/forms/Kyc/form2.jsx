import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import contactInfo from "../../../assets/form2.svg"

const Form2 = ({ address,setAddress,pincode,setPhoneNumber,phoneNumber,setPincode,email,setEmail }) => {

    return (
        <div style={{ display:"flex", alignItems:"center", justifyContent: "space-around", width: '100%'}}>
            <Box component="form" autoComplete="off" style={{width: 400}} >
                <TextField style={{ margin:10 }}  label="Address" fullWidth  variant="outlined" type="text" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                <br/>
                <TextField style={{ margin:10 }}  label="Pincode" fullWidth variant="outlined" type="number" value={pincode} onChange={(e)=>setPincode(e.target.value)}/>
                <br/>
                <TextField style={{ margin:10 }} label="Email" fullWidth variant="outlined" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <br/>
                <TextField style={{ margin:10 }} label="Phone No." fullWidth variant="outlined" type="number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
            </Box>
            <div>
                <img style={{width:300,height:300}} src={contactInfo} alt="This is an img"/>
            </div>
        </div>
    )
};

export default Form2;