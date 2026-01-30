import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    User,
    UserCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

// User roles in TrustMarket
export type UserRole = 'buyer' | 'seller' | 'admin';

// User document structure in Firestore
export interface UserData {
    uid: string;
    email: string;
    name: string;
    role: UserRole;
    createdAt: any;
    updatedAt: any;
    // Buyer-specific
    favorites?: string[];
    purchaseHistory?: string[];
    // Seller-specific
    products?: string[];
    verified?: boolean;
}

interface AuthContextType {
    user: User | null;
    userData: UserData | null;
    loading: boolean;
    signup: (email: string, password: string, additionalData?: Partial<UserData>) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                try {
                    // Fetch additional user data from Firestore
                    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                    if (userDoc.exists()) {
                        setUserData(userDoc.data() as UserData);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setUser(null);
                setUserData(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const signup = async (email: string, password: string, additionalData: Partial<UserData> = {}) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Default to 'buyer' role if not specified
        const role = additionalData.role || 'buyer';

        // Create user document in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
            email: email,
            uid: userCredential.user.uid,
            role: role,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            ...additionalData
        });
        return userCredential;
    };

    const login = async (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        return signOut(auth);
    };

    const value = {
        user,
        userData,
        loading,
        signup,
        login,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
