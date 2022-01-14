import { useEffect, useState } from "react";
import { Input, Button } from "@mui/material";
import UserDetail from "./userDetail";

const Bank = () => {

    const [userDetails, setUserDetails] = useState(null);
    const [searchUserId, setSearchUserId] = useState("");
    const [loading, setLoading] = useState(true);
    const [userKyc, setUserKyc] = useState(null);
    const [blockchainResponse, setBlockchainResponse] = useState(null);

    useEffect(async () => {
        const bankId = "9876";
        const res = await (await fetch(`${process.env.REACT_APP_PORTAL}/bank/getAllGrantedUserDetails/${bankId}`)).json();
        setLoading(false);
        setUserDetails(res.userDetails);
    }, [])

    async function getUserKycFromBlockchain(userId) {
        console.log("Fetching user Kyc from ethereum blockchain");
        // const res = await (await fetch(`${process.env.REACT_APP_PORTAL}/ethereum/getUserKyc/${userId}`)).json();
        // setUserKyc(res.userKyc);
        // console.log(res.blockchainResponse);
    }

    async function requestUserAccessForKyc() {
        const bankId = localStorage.getItem("userId");
        const res = await (await fetch(`${process.env.REACT_APP_PORTAL}/bank/requestUserKyc`, {
            method: "POST",
            body: JSON.stringify({ userId: "1234", bankId: "9876" }),
            headers: {
                "Content-Type": "application/json"
            }
        })).json();

        console.log("Request to user sent successfully...");
    }

    return (
        <div>
            <div>
                <Input onChange={(e) => setSearchUserId(e.target.value)} value={searchUserId} />
                <Button onClick={requestUserAccessForKyc}>Request Kyc Access</Button>
            </div>
            <div>
                {loading ? <div>Please wait as we are fetching you details...</div> :
                    !userDetails ? <div>No users present.</div> :
                        userDetails.map(userDetail =>
                            <div key={userDetail.userId} style={{ border: "1px solid black", padding: 10 }}>
                                <UserDetail {...userDetail}
                                    getUserKycFromBlockchain={getUserKycFromBlockchain} />
                            </div>
                        )
                }
            </div>
        </div>

    )
};

export default Bank;