import { useState } from 'react';
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import React from "react";
import "./AuthPage.css";

export default function AuthPage({ setUser }) {

  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
    <h1 className="my-title">FIND-FURRY-FRIENDS</h1>
     {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
      <div>
      <p onClick={() => setShowLogin(!showLogin)}>{showLogin ? `Don't have an account? Sign up!` : 'Already have an account? Log in'}</p>
      </div>
    </div>
  );
}
