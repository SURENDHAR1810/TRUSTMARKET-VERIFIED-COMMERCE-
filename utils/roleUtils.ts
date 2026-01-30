import { UserRole } from '../context/AuthContext';

/**
 * Get the appropriate dashboard/home page based on user role
 */
export const getDashboardByRole = (role: UserRole): string => {
    const dashboards: Record<UserRole, string> = {
        buyer: '/',
        seller: '/dashboard',
        admin: '/admin',
    };
    return dashboards[role] || '/';
};

/**
 * Get a user-friendly role display name
 */
export const getRoleDisplayName = (role: UserRole): string => {
    const names: Record<UserRole, string> = {
        buyer: 'Buyer',
        seller: 'Seller',
        admin: 'Administrator',
    };
    return names[role] || 'User';
};
