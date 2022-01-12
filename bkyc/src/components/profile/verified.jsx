import Lottie  from "react-lottie";
import ethAnim from '../../assets/etherium.json';

const etherium = {
    loop: true,
    autoplay: true,
    animationData: ethAnim,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

const verified = () => {
    return (
        <div>
            <>
                <p className="statuscontent"> Congratulations !!. Your KYC is verified.  </p>
                <Lottie
                    options={etherium}
                    height={300}
                    width={300}
                />
                <p className="statuscontent"> Know your Hash here - <a href='#'> view Hash </a> </p>
            </>
        </div>
    )
};

export default verified;