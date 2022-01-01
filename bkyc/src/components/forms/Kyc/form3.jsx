import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import docs from "../../../assets/docs.svg"

const Form3 = () => {

    return (
        <div style={{ display:"flex", alignItems:"center", justifyContent: "space-around", width: '100%'}}>
            <div>
                <img style={{width:300,height:300}} src={docs} alt="This is an img"/>
            </div>
            <Box>
            <span style={{fontFamily: 'Nunito Sans', paddingRight: 46, fontWeight: 'bolder', fontSize: 20}}> Aadhar Card : </span>
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="aadhaar-file"
            />
            <label htmlFor="aadhaar-file">
                <Button size="large" variant="contained" color="primary" component="span">
                Upload
                </Button>
            </label>
            <br /><br /><br />

           <span style={{fontFamily: 'Nunito Sans', paddingRight: 70, fontWeight: 'bolder', fontSize: 20}}> PAN Card : </span>
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="pan-file"
            />
            <label htmlFor="pan-file">
                <Button size="large" variant="contained" color="primary" component="span">
                Upload
                </Button>
            </label>
            </Box>
        </div>
    )
};

export default Form3;