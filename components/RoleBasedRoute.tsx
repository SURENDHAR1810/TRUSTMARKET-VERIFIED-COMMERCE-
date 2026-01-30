import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '../context/AuthContext';

interface RoleBasedRouteProps {
    children: React.ReactNode;
    allowedRoles: UserRole[];
    redirectTo?: string;
}

/**
 * Route protection component that enforces role-based access control.
 * Redirects users to login if not authenticated, or to specified page if role is not allowed.
 */
const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
    children,
    allowedRoles,
    redirectTo = '/unauthorized'
}) => {
    const { user, userData, loading } = useAuth();
    const location = useLocation();

    // Show loading spinner while checking auth state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check if user's role is in the allowed roles list
    const userRole = userData?.role || 'buyer';
    if (!allowedRoles.includes(userRole)) {
        // Redirect based on user's actual role
        const roleRedirects: Record<UserRole, string> = {
            buyer: '/',
            seller: '/dashboard',
            admin: '/admin',
        };
        const defaultRedirect = roleRedirects[userRole] || redirectTo;
        return <Navigate to={defaultRedirect} replace />;
    }

    return <>{children}</>;
};

export default RoleBasedRoute;
