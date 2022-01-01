import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import contact from "../../../assets/suggestions.svg"

const Form2 = ({ address,setAddress,pincode,setPhoneNumber,phoneNumber,setPincode,email,setEmail }) => {

    return (
        <div style={{ display:"flex",alignItems:"center" }}>
            <Box >
                <TextField style={{ margin:10 }} label="Address" variant="filled" type="text" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                <br/>
                <TextField style={{ margin:10 }} label="Pincode" variant="filled" type="number" value={pincode} onChange={(e)=>setPincode(e.target.value)}/>
                <br/>
                <TextField style={{ margin:10 }} label="Email" variant="filled" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <br/>
                <TextField style={{ margin:10 }} label="Phone No." variant="filled" type="number" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
            </Box>
            <div>
                <img style={{width:300,height:300}} src={contact} alt="This is an img"/>
            </div>
        </div>
    )
};

export default Form2;