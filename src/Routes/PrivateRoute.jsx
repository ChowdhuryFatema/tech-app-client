import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropType from 'prop-types';
import LoadingSpinner from "../components/LoadingSpinner";


const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext)
    const location = useLocation()

    if(loading){
        return <LoadingSpinner></LoadingSpinner>;
    }

    if(user){
        return children;
    }

    return <Navigate to="/login" state={{from: location}}></Navigate>
};
PrivateRoute.propTypes = {
    children: PropType.node,
}
export default PrivateRoute;