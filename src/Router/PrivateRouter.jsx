import PropTypes from 'prop-types';
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../components/Loading";

const PrivateRouter = ({children}) => {
    const { user, isLoading,  } = useContext(AuthContext);
    const location = useLocation()
    if (isLoading) {
        return <Loading/>
    }
    if (!user) {
        return <Navigate to='/login' state={location.pathname} replace></Navigate>
    }
    return children;
};
PrivateRouter.propTypes = {
    children: PropTypes.node,
};
export default PrivateRouter;