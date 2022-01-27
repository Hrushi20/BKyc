import { Button } from "@mui/material";

const userDetail = ({ userId,username,getUserKycFromBlockchain }) => {
    return (
            <div>
                <p>Username: {username}</p>
                <Button onClick={()=>getUserKycFromBlockchain(userId)}>Get Kyc</Button>             
            </div>
    )
}

export default userDetail;