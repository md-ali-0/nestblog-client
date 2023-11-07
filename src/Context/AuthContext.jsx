import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setIsLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const loginUser = (email, password) => {
        setIsLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    const updateUser = (displayName, photoURL)=>{
        setIsLoading(true)
        return updateProfile(auth.currentUser, {displayName, photoURL})
    }
    const googleLogin = ()=>{
        setIsLoading(true)
        return signInWithPopup(auth, googleProvider);
    }
    const logOutUser = ()=>{
        setIsLoading(true)
        return signOut(auth)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else{
                setUser(null);
            }
            setIsLoading(false);
        });
        return () => {
            unSubscribe();
        };
    }, [auth]);

    const authInfo = {
        user,
        isLoading,
        setIsLoading,
        createUser,
        logOutUser,
        loginUser,
        updateUser,
        googleLogin
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.object.isRequired,
};

export default AuthProvider;
