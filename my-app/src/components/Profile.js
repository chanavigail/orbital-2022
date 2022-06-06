import React from 'react';
import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from '../contexts/Auth';
import { supabase } from '../supabase';

export default function Profile() {
  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');

  // const { signUp } = useAuth();
  // const navigate = useNavigate();

  // async function handleSubmit(e) {
  //   e.preventDefault()

  //   const { error } = await signUp({ email, password })
  //   if (error) {
  //     alert("error signing in")
  //   } else {
  //     navigate("/welcome")
  //   }
  // }

  return (
    <div className="profile">
      <h1 className="header">Sign Up</h1>
      <form onSubmit={signInWithGoogle}>
        {/* <label htmlFor="email">Email</label>
        <input
          id="email"
          className="inputField"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className="inputField"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> */}
        <button className="button block">
          Register
        </button>
      </form>
    </div>
  )
}

async function signInWithGoogle() {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'google',
  })
}