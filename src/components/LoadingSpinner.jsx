import { PacmanLoader } from "react-spinners";

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center w-full min-h-[calc(100vh-76px)]">
            <PacmanLoader size={24} color="#0ae0b8" />
        </div>
    );
};

export default LoadingSpinner;