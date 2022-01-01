import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import personalInfo from "../../../assets/form1.svg"

const Form1 = ({ setFirstName,setMiddleName,setLastName,firstName,middleName,lastName }) => {

    return (
        <div style={{ display:"flex", alignItems:"center", justifyContent: "space-around", width: '100%'}}>
            <div >
                <img style={{width:300,height:300}} src={personalInfo} alt="This is an img"/>
            </div>
            <Box component="form" autoComplete="off" style={{width: 400}} >
                <TextField style={{ margin:10 }} fullWidth label="First Name" variant="outlined" type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                <br/>
                <TextField style={{ margin:10 }} fullWidth label="Middle Name" variant="outlined" type="text" value={middleName} onChange={(e)=>setMiddleName(e.target.value)}/>
                <br/>
                <TextField style={{ margin:10 }} fullWidth label="Last Name" variant="outlined" type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
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