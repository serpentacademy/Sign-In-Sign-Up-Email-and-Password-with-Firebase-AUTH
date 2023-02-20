import React, {Component}  from "react";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import app from './firebase'
function SignIn (props) {
    const auth = getAuth(app);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
  

    function signInWEAP(){
        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(userCredential.user.uid)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
    }
    const onChangeHandlerP = event => {
        setPassword(event.target.value);
     };
     const onChangeHandlerE = event => {
      setEmail(event.target.value);
   };
    return(
        <div><h1> {props.mode}</h1>
        <input onChange={onChangeHandlerE} value={email} type="email" placeholder="email"></input>
        <br></br>
          <input onChange={onChangeHandlerP} value={password} type="password" placeholder="password"></input>
          <br/>
          <button onClick={signInWEAP}>Sign In</button>
          </div>)
  }

  export default SignIn;