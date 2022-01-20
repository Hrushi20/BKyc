import { Box } from "@mui/system";
import '../styles/item.css';

function DisplayKyc(data) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '88vw',
        bgcolor: 'white',
        border: '1px solid #000',
        borderRadius: 1,
        boxShadow: 24,
        height: '90vh',
        overflow: 'auto',
        display: 'flex',
    };

    return (
        <Box sx={style} >
            <div className="left-content">
                <img src={data.livePhoto} alt="live" width={280} style={{ border: '2px solid gray', borderRadius: 10 }} />
                <div className="detail"><p className='que'>First name : </p> {data.firstName}</div>
                <div className="detail"><p className='que'>Last name : </p> {data.lastName}</div>
                <div className="detail"><p className='que'>Middle name : </p> {data.middleName}</div>
                <div className="detail"><p className='que'>Date-of-Birth : </p> {data.dob}</div>
                <div className="detail"><p className='que'>Email : </p> {data.email}</div>
                <div className="detail"><p className='que'>Phone : </p> {data.phoneNumber}</div>
                <div className="detail"><p className='que'>Pin : </p> {data.pincode}</div>
            </div>
            <div className="right-content">
                <div className="detail"><p className='que'>Address : </p><p style={{ width: '60%' }}> {data.address} </p></div>
                <div className="detail"><p className='que'>Aadhaar & Pan-card : </p></div>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }} className="docs">
                    <img src={data.aadhar} alt="aadhaar" width={250} style={{ border: '2px solid gray', borderRadius: 10 }} />
                    <img src={data.pan} alt="pan" width={250} style={{ border: '2px solid gray', borderRadius: 10 }} />
                </div>
            </div>
        </Box>
    )
}

export default DisplayKyc;