import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, 
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { auth } from "../firebase/firebase.init"; 
import { AuthContext } from './AuthContext';
import toast from 'react-hot-toast';


const googleProvider = new GoogleAuthProvider();
const API_BASE_URL = 'https://car-shop-backend-navy.vercel.app';
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);
    const createUser = (email, password, name, photoURL) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                return updateProfile(result.user, {
                    displayName: name,
                    photoURL: photoURL || null
                })
                .then(() => result);
            });
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };
    
    const getIdToken = async () => {
        if (user) {
            return await user.getIdToken();
        }
        return null;
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                currentUser.getIdToken()
                    .then(idToken => {
                        axios.post(`${API_BASE_URL}/auth/jwt`, { idToken }, { withCredentials: true })
                            .then(res => {
                                setLoading(false);
                            })
                            .catch(error => {
                                console.error("Error exchanging ID Token:", error);
                                setLoading(false);
                            });
                    });
            } 
            else {
                axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true })
                    .then(() => {
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error("Error clearing token on logout:", error);
                        setLoading(false);
                    });
            }
            if (!currentUser) {
                setLoading(false);
            }
        });
        
        return () => unsubscribe();
    }, []);
    
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        getIdToken,
    };

    return (
        <AuthContext.Provider value={authInfo}> 
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;