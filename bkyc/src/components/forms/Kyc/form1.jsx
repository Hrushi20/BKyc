import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import contact from "../../../assets/suggestions.svg"

const Form1 = ({ setFirstName,setMiddleName,setLastName,firstName,middleName,lastName }) => {

    

    // console.log(data);


    return (
        <div style={{ display:"flex",alignItems:"center" }}>
            <div >
                <img style={{width:300,height:300}} src={contact} alt="This is an img"/>
            </div>
            <Box component="form" autoComplete="off" >
                <TextField style={{ margin:10 }} label="First Name" variant="filled" type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                <br/>
                <TextField style={{ margin:10 }} label="Middle Name" variant="filled" type="text" value={middleName} onChange={(e)=>setMiddleName(e.target.value)}/>
                <br/>
                <TextField style={{ margin:10 }} label="Last Name" variant="filled" type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                <br/>
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="DoB"
                        value={dob}
                        onChange={(newValue) => {
                        setDob(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider> */}
            </Box>
        </div>
    )
};

export default Form1;