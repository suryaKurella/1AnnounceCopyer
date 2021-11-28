import React, {useContext, useEffect, useState} from 'react';
import {auth} from '../firebase'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import {StoreContext} from "./MobxStoreContext";

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}
export const AuthProvider = ({children}) => {
    const store = useContext(StoreContext)
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [isUser, setIsUser] = useState(false)

    const signup = async (email, password, userName) => {
        await auth.createUserWithEmailAndPassword(email, password)
        return auth.currentUser.updateProfile({
            displayName: userName
        })
    }

    const login = async (email, password) => {


        try {
            await auth.signInWithEmailAndPassword(email, password)
            localStorage.setItem('isUserLog', true)
            setIsUser(true)
            store.isOldUserr = true
        } catch (err) {
            console.error(err)
        }

        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        store.isOldUserr = false
        // localStorage.setItem('isUserLog', false)
        return auth.signOut()
    }

    useEffect(() => {
        return auth.onAuthStateChanged(user => {


            setCurrentUser(user)
            setLoading(false)
        })
    }, [])






    const value = {
        currentUser,
        login,
        signup,
        logout
    }

    return (
        <div>
            <AuthContext.Provider value={value}>
                {!loading && children}

            </AuthContext.Provider>
        </div>
    );
};

export default AuthContext;
