import React, { useState, useEffect } from 'react';
import axios from 'axios'; // <-- সরাসরি axios ইম্পোর্ট করুন
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
const API_BASE_URL = 'http://localhost:3011'; // <-- আপনার ব্যাকএন্ড URL নিশ্চিত করুন

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);

    // ------------------------------------------
    // Authentication Functions
    // ------------------------------------------
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


    // ------------------------------------------
    // User State Observer & Token Exchange (Fix Applied Here)
    // ------------------------------------------

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            
            // JWT Token Exchange Logic
            if (currentUser) {
                currentUser.getIdToken()
                    .then(idToken => {
                        // Use direct axios call here
                        axios.post(`${API_BASE_URL}/auth/jwt`, { idToken }, { withCredentials: true })
                            .then(res => {
                                // console.log("JWT token exchanged successfully.");
                                setLoading(false);
                            })
                            .catch(error => {
                                console.error("Error exchanging ID Token:", error);
                                setLoading(false);
                            });
                    });
            } else {
                // Logout: Clear cookie/token on the server
                axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true })
                    .then(() => {
                        // console.log("Logout successful, client token cleared.");
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
    }, []); // Empty dependency array as API_BASE_URL is a constant
    
    
    // ------------------------------------------
    // Context Value
    // ------------------------------------------
    
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