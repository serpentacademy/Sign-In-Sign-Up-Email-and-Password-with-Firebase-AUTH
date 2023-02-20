import './App.css';
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {getAuth, signInAnonymously, onAuthStateChanged, signOut, signInWithEmailAndPassword} from "firebase/auth"
import {ToastContainer, toast} from 'react-toastify'
import app from './firebase'; 
import "react-toastify/dist/ReactToastify.css"
import React from 'react';
import { Timestamp} from '@firebase/firestore';


//firestore dependencies
import { doc, FieldValue, getDoc, getFirestore, serverTimestamp, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { async } from '@firebase/util';
import SignIn from './SignIn';
import SignUp from './SignUp';


const analytics = getAnalytics(app);
function App() {
  const [uid, setUid] = React.useState("");
  const [signMode, setSignMode] = React.useState("signIn")
  const [validLogin, setValidLogin] = React.useState(false)

  const singUpAnonymously= ()=>{
    signInAnonymously(getAuth(app)).then(

      user=> (setUid(user.user.uid), console.log(user.providerId))
    )
      
  }
  const db = getFirestore(app);

const messaging = getMessaging(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);



React.useEffect(()=>{
//singUpAnonymously();
  console.log(uid)
  onMessage(messaging, message=>{
    console.log("your message: ", message)
   
    toast(message.notification.title)
  


   // console.log("payload.data.url"+message.data.url)
//window.location.replace("http://localhost:3000/"+message.data.url)
  })

  if (uid!= "")
{
    //CREATE DATA
//setUserDoc(uid)

    //UPDATE DATA
    //updateUserDoc(uid)
    //READ DATA
  //getUserDoc(uid)

  //DELETE DATA 

}else{
  console.log("not user uid")
}



},[validLogin])

function setSignModeF1 (){
  setSignMode("signUp")
}
function setSignModeF2 (){
  setSignMode("signIn")
}

function checkIfValidLogin(){
  const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    //console.log(user.isAnonymous)
    
    if (validLogin == false){
      setValidLogin(prevState => !prevState)
    }
      
  

    
    // ...
  } else {
    // User is signed out
    // ...
  }
});
}
checkIfValidLogin();

function signOutF(){
  signOut(getAuth(app)).then(
    
 

    (validLogin == true?
      setValidLogin(prevState => !prevState)
      :console.log("ee")
    )
      
    
      
  

    
    
    
  )

}


  return (
    <div>
    <h1>Firebase Cloud Firestore</h1>
    <button onClick={setSignModeF1}>Sign Up</button>
    <button onClick={setSignModeF2}>Sign In</button>
    <br/>
    {signMode=="signIn"? <SignIn mode="Sign In"></SignIn>: <SignUp mode="Sign Up"></SignUp>}
    <ToastContainer/>
    {validLogin?<div><h2>Logged in</h2><button onClick={signOutF}>Sign Out</button></div>: <h2>Not logged in</h2> }

    </div>
  );
}

export default App;
