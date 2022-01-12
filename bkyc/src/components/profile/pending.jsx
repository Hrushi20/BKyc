import Lottie from "react-lottie";
import reviewAnim from "../../assets/review.json";

const review = {
    loop: true,
    autoplay: true,
    animationData: reviewAnim,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

const pending = () => {
    return (
        <>
            <p className="statuscontent"> Please Wait !!. Your KYC is under process. </p>
            <Lottie
                options={review}
                height={400}
                width={400}
            />
        </>
    )
}

export default pending;