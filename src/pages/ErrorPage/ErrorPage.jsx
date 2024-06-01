import { Link } from "react-router-dom";
// import errorImg from '../../assets/images/error.jpg';

const ErrorPage = () => {
    return (
        <div className='w-full min-h-screen'>

            <div className="flex flex-col justify-center items-center pt-20">
                <div>
                    {/* <img src={errorImg} className="w-full"/> */}
                    404 not found
                </div>

                <div className="">
                    <Link to="/" className="btn bg-gradient-to-r from-[#E855DE] text-white to-[#5400EE] font-bold text-lg border-none">
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;