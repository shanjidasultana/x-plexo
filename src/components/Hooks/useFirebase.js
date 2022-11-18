import  { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import initializeAuthenciation from '../../firebase/firebase.init';
import { Navigate } from 'react-router-dom';
initializeAuthenciation()
const useFirebase = () => {
    const auth = getAuth();
    const googleprovider = new GoogleAuthProvider();

    const [user,setUser] = useState({})
    const [error,setError]=useState('');

    const SignInUsingGoogle=()=>{
        return signInWithPopup(auth, googleprovider)
           
    }
    const registerUser=(email, password,name,history )=>{
          createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              setError( '');
              const newUser= { email:email, displayName: name };
              updateProfile(auth.currentUser, {
                  displayName:name,
                }).then(() => {
                }).catch((error) => {
                  setError( error.message);
                })
              setUser(newUser);
              Navigate(history)
            })
            .catch((error) => {
              setError( error.message);
           
            })
            .finally(()=>{
            }
          )
      }
      const loginUser=(email, password,history,location)=>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const destination=location?.state?.from || '/'
           Navigate(destination);
            setError( '');
          })
          .catch((error) => {
            setError( error.message);
          })
          .finally(()=>{
          }
            
          )
    }
    const  logoutUser=()=>{
        signOut(auth)
        .then(() => {
            setUser({});
        });

    }
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
             setUser(user);
           
             };
         });
    },[]);
     
        return {
            user,
            SignInUsingGoogle,
            loginUser,
            registerUser,
            error,
            logoutUser
           
        }
            
    
};

export default useFirebase;