import React from 'react';
import Lottie from 'react-lottie';
import Load from '../assets/loading.json';

function Loader() {
    const loading = {
        loop: true,
        autoplay: true,
        animationData: Load,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    return (
        <Lottie 
            options={loading}
            height={300}
            width={300}
        /> 
    )
}

export default Loader;
