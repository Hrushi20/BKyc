import React from 'react'
import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';
import Rotate from 'react-reveal/Rotate';

const RContent = (props) => {
    return (
        <div className="sec2">
            <Fade left>
             <div className="img">
                <img src={props.src} alt={props.alt} />
             </div>
            </Fade>
            <Slide bottom cascade>
                <Rotate top left>
                    <div className="container" />
                </Rotate>
                <div className="contentArea">
                    <p className="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quidem quod quisquam non facere veniam ducimus deserunt quibusdam maxime tempore,
                    quaerat corrupti praesentium est? Aliquam hic voluptas dolores reprehenderit nihil perspiciatis!
                    </p>
                    <br />
                    <p className="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Quidem quod quisquam non facere veniam ducimus deserunt quibusdam maxime tempore,
                    quaerat corrupti praesentium est? Aliquam hic voluptas dolores reprehenderit nihil perspiciatis!
                    </p>
                </div>
             </Slide>
         </div>
    )
}

export default RContent;
