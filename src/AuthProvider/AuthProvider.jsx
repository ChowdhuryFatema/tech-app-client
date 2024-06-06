import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";


export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

    const axiosPublic = useAxiosPublic();

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    // social login provider
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();

    // create user 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // update User Profile
    const updateUserProfile = (name, image) => {
        updateProfile(auth.currentUser, {
             displayName: name, 
             photoURL: image,          
           })
           setUser({
             ...user,
             displayName: name, 
             photoURL: image
           })
     }

    // sign in user 
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

       // google login 
       const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // github login 
    const gitHubLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, gitHubProvider)
    }

    // log out user 
    const logOutUser = () => {
        setLoading(true);
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {           

            setUser(currentUser);

            if(currentUser){
                const userInfo = { 
                    email: currentUser?.email,
                }
                axiosPublic.post('/jwt', userInfo)
                .then(data => {
                    if(data.data.token){
                        localStorage.setItem('access-token', data.data.token)
                        setLoading(false);
                    }
                })
            }
            else{
                localStorage.removeItem('access-token');
                setLoading(false)
            }

        });

        return () => unSubscribe();
    }, []);

    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        updateUserProfile,
        signInUser,
        googleLogin,
        gitHubLogin,
        logOutUser,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
}
export default AuthProvider;