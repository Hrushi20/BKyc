
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import contact from "../../../assets/suggestions.svg"

const Form3 = ({  }) => {

    return (
        <div style={{ display:"flex",alignItems:"center" }}>
            <div>
                <img style={{width:300,height:300}} src={contact} alt="This is an img"/>
            </div>
            <Box >
                <input type="file"/>
            </Box>
        </div>
    )
};

export default Form3;