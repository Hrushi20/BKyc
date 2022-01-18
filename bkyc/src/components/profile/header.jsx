import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import Zoom from 'react-reveal/Zoom';
import Nav from '../../views/Nav';
import { Avatar, Chip } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";

const ProfileHeader = ({ status }) => {
    const authData = useAuth0();

    return (
        <>
            <div className="sec1">
                <div className="front profile">
                    <Nav />
                    <div className="mainHeading">
                        <p className="title">
                            <Fade left cascade> Profile</Fade>
                        </p>
                        <div className="metadata">
                            <Slide left>
                                <Chip className='status' color='success' label={"status : " + status} />
                            </Slide>
                            <Avatar
                                className='avatar'
                                alt="Remy Sharp"
                                sx={{ width: 140, height: 140, bgcolor: '#ff9933' }}
                            >
                                <PersonRoundedIcon sx={{ width: 80, height: 80 }} />
                            </Avatar>
                            <Slide right>
                                <Chip className='email' style={{ fontSize: 13 }} color='primary' label={"Email : " + authData.user.email} />
                            </Slide>
                        </div>
                    </div>
                </div>
                <div className="back profile" />
            </div>
            <Zoom>
                <p className="name">{authData.user.name}</p>
            </Zoom>
        </>
    )
}

export default ProfileHeader;