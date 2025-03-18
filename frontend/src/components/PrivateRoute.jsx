/**
 * PrivateRoute Component
 * Protected route wrapper that checks for authentication
 * Redirects to login if user is not authenticated
 * 
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @returns {React.ReactElement}
 */

import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
