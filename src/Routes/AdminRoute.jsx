import { Navigate } from "react-router-dom";

import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import PropTypes from 'prop-types';
import LoadingSpinner from "../components/LoadingSpinner";


const AdminRoute = ({children}) => {

    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    if(loading || isAdminLoading){
        return <LoadingSpinner></LoadingSpinner>
    }

    if(user && isAdmin){
        return children;
    }

    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

AdminRoute.propTypes = {
    children: PropTypes.node,
}
export default AdminRoute;