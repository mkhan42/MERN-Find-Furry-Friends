import { useState } from 'react';
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import Title from "../../components/Title/Title";
import React from "react";
import "./AuthPage.css";
import FileBase64 from "react-file-base64";

export default function AuthPage({ setUser }) {

  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
    <div className='my-title-new'>
     <Title />
     </div>
    {/* <div className='my-title'> */}
    {/* <p>Lost a furry friend? Found a lost friend? <br/> Find-Furry-Friends is dedicated to helping pet owners find their missing friends! <br/> Just Sign Up or Log in below!</p> */}
    {/* </div> */}
    {/* <div className='my-auth-div'> */}
     {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
      {/* <div className='center-option my-options'> */}
      <p className='center-option' onClick={() => setShowLogin(!showLogin)}>{showLogin ? `Don't have an account? Sign up!` : 'Already have an account? Log in'}</p>
      {/* </div> */}
      </>
    // </div>
  );
}
