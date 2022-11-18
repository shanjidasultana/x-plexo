import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const initializeAuthenciation=()=>{
    initializeApp(firebaseConfig);
}
export default initializeAuthenciation;