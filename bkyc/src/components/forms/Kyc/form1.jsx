import { TextField } from "@mui/material";
import React from 'react';
import { Box } from "@mui/system";
import personalInfo from "../../../assets/form1.svg";
import Fade from 'react-reveal/Fade';


const Form1 = ({ setFirstName,setMiddleName,setLastName,setValidate1,firstName,middleName,lastName, validate1, click1 }) => {

    const [input1, setInput1] = React.useState(false);
    const [input2, setInput2] = React.useState(false);
    const [input3, setInput3] = React.useState(false);

    function validate(field, inp) {
        return field == '' && inp;
    }

    React.useEffect(() => {
        setValidate1(input1 && input2 && input3)
    })

    return (
        <div style={{ display:"flex", alignItems:"center", justifyContent: "space-around", width: '100%'}}>
            <div >
                <img style={{width:300,height:300}} src={personalInfo} alt="This is an img"/>
            </div>
            <Fade right cascade>
                <Box component="form" autoComplete="off" style={{width: 400}} >
                    <TextField onBlur={() => setInput1(true)} error={!click1 ? validate(firstName, input1) : firstName == ''} style={{ margin:10 }} helperText={!click1 ? validate(firstName, input1) && "required" : firstName == '' && "required"} fullWidth label="First Name" variant="outlined" type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                    <br/>
                    <TextField onBlur={() => setInput2(true)} error={!click1 ? validate(middleName, input2) : middleName == ''} style={{ margin:10 }} helperText={!click1 ? validate(middleName, input2) && "required" : middleName == '' && "required"} fullWidth label="Middle Name" variant="outlined" type="text" value={middleName} onChange={(e)=>setMiddleName(e.target.value)}/>
                    <br/>
                    <TextField onBlur={() => setInput3(true)} error={!click1 ? validate(lastName, input3) : lastName == ''} style={{ margin:10 }} helperText={!click1 ? validate(lastName, input3) && "required" : lastName == '' && "required"} fullWidth label="Last Name" variant="outlined" type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                    <br/>
                    <TextField
                        style={{ margin:10 }}
                        id="date"
                        label="Birthday"
                        type="date"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={e => console.log(e)}
                    />
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
            </Fade>
        </div>
    )
};

export default Form1;