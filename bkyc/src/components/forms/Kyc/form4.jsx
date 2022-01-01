import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import contact from "../../../assets/suggestions.svg"


const Form4 = ({ submitKyc }) => {

    return (
        <div style={{ display:"flex",alignItems:"center" }}>
            <Box>
            <Typography variant="h5">Please check all the documents before submitting your documents.</Typography>
                <Button variant="outlined" onClick={submitKyc}>Outlined</Button>
            </Box>   
            <div>
                <img style={{width:300,height:300}} src={contact} alt="This is an img"/>
            </div>
        </div>
    )
};

export default Form4;