import React, {Component}  from "react";
import app from './firebase'; 
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

function SignUp (props) {
  const auth = getAuth(app);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
        function createUserWithEmailAndPasswordF(){
          // if password is more than 8 characters long
          if (password.length>=8){
            console.log("password lenght correct")
          }else{
            console.log("password should be at least 8 characters long")
            return
          }
  
          createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
          console.log("user created"+ userCredential.user.uid)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
        }
        const onChangeHandlerP = event => {
          setPassword(event.target.value);
       };
       const onChangeHandlerE = event => {
        setEmail(event.target.value);
     };
      // Initialize Firebase Authentication and get a reference to the service


        return(<div><h1> {props.mode}</h1>
      <input onChange={onChangeHandlerE} value={email} type="email" placeholder="email"></input>
      <br></br>
        <input onChange={onChangeHandlerP} value={password} type="password" placeholder="password"></input>
        <br/>
        <button onClick={createUserWithEmailAndPasswordF}>Sign Up</button>
        </div> );

    
  }

  export default SignUp;