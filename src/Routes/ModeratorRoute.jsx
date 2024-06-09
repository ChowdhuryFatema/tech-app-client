import { Navigate } from "react-router-dom";

import useAuth from "../Hooks/useAuth";
import PropTypes from 'prop-types';
import LoadingSpinner from "../components/LoadingSpinner";
import useModerator from "../Hooks/useModerator";


const ModeratorRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isModerator, isModeratorLoading] = useModerator()

    if(loading || isModeratorLoading){
        return <LoadingSpinner></LoadingSpinner>
    }

    if(user && isModerator){
        return children;
    }

    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

ModeratorRoute.propTypes = {
    children: PropTypes.node,
}
export default ModeratorRoute;