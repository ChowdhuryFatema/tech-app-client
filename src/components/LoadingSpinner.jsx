import { ClimbingBoxLoader } from "react-spinners";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center w-full min-h-[calc(100vh-76px)]">
            <ClimbingBoxLoader size={24} color="#A931E5" />
        </div>
    );
};

export default LoadingSpinner;