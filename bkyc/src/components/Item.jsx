import { Box } from '@mui/system';
import React from 'react';
import '../styles/item.css';
import Button from '@mui/material/Button';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import { IconButton, Modal, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TodayIcon from '@mui/icons-material/Today';


const Buttons = ({kycVerified,kycRejected,index}) => (
    <div className="buttons">
        <Button startIcon={<TodayIcon />} style={{margin: '0 20'}}  variant="contained"> Schedule a Meet </Button>
        <Tooltip title="Accept">
            <IconButton color='success' onClick={()=>kycVerified(index)}>
                <CheckCircleIcon style={{margin: '0 20'}} />
            </IconButton>
        </Tooltip>
        <Tooltip title="Reject">
            <IconButton color='error' onClick={()=>kycRejected(index)}>
                <CancelIcon style={{margin: '0 20'}} />
            </IconButton>
        </Tooltip>
    </div>
)

function Item({data, index, kycVerified,kycRejected}) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70vw',
        bgcolor: 'white',
        border: '1px solid #000',
        borderRadius: 1,
        boxShadow: 24,
        height: '90vh',
        overflow: 'auto',
        display: 'flex',
    };

    return (
        <Box
            sx={{border: index%2 === 0 ? '1px solid white' : '1px solid rgba(0,0,0,0.1)',
                 backgroundColor: index%2 === 0 ? 'white' : 'rgba(0,0,0,0.1)' ,  
                 '&:hover': {boxShadow: '0px 2px rgba(0,0,0,0.4)',opacity: [0.9, 0.8], position: 'relative', top: -1, }
               }}
             className='item-body'>
            <div className="left-content">
                <p className='applicant-name'>{data.firstName} {data.middleName} {data.lastName}</p>
                <div style={{margin: '20 0'}} ><Buttons kycVerified={kycVerified} kycRejected={kycRejected} index={index}/></div>
            </div>
            <div className="right-content">
                <div className="detail"><p className='que'>Date-of-Birth : </p> {data.dob}</div>
                <div className="detail"><p className='que'>Email : </p> {data.email}</div>
                <div className="detail"><p className='que'>Phone : </p> {data.phoneNumber}</div>
                <Button onClick={handleOpen} endIcon={<AspectRatioOutlinedIcon />}  color='warning' variant="text">Expand</Button>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <div className="left-content">
                        <img src={data.livePhoto} alt="live" width={200} style={{border: '2px solid gray', borderRadius: 10}}  />
                        <div className="detail"><p className='que'>First name : </p> {data.firstName}</div>
                        <div className="detail"><p className='que'>Last name : </p> {data.lastName}</div>
                        <div className="detail"><p className='que'>Middle name : </p> {data.middleName}</div>
                        <div className="detail"><p className='que'>Date-of-Birth : </p> {data.dob}</div>
                        <div className="detail"><p className='que'>Email : </p> {data.email}</div>

                    </div>
                    <div className="right-content">
                        <div className="detail"><p className='que'>Phone : </p> {data.phoneNumber}</div>
                        <div className="detail"><p className='que'>Address : </p><p style={{width: '60%'}}> {data.address} </p></div>
                        <div className="detail"><p className='que'>Pin : </p> {data.pincode}</div>
                        <div className="detail"><p className='que'>Aadhaar & Pan-card : </p></div>
                        <div style={{display: 'flex', width: '100%',justifyContent: 'space-around'}} className="docs">
                            <img src={data.aadhar} alt="aadhaar" width={100} style={{border: '2px solid gray', borderRadius: 10}}  />                        
                            <img src={data.pan} alt="pan" width={100} style={{border: '2px solid gray', borderRadius: 10}}  />                        
                        </div>
                
                        <Buttons kycVerified={kycVerified} kycRejected={kycRejected} index={index}/>
                        
                    </div>
                </Box>
            </Modal>
        </Box>
    )
}

export default Item
