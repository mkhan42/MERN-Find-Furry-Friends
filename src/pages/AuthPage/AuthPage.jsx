import { useState } from 'react';
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import React from "react";

export default function AuthPage({ setUser }) {

  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
    <h1>FIND-FURRY-FRIENDS</h1>
     {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
      <div>
      <p onClick={() => setShowLogin(!showLogin)}>{showLogin ? `Don't have an account? Sign up!` : 'Already have an account? Log in'}</p>
      </div>
    </>
  );
}
