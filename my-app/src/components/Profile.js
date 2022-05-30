import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../contexts/Auth';

export default function Profile() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const { error } = await signUp({ email, password })
      if (error) throw error
      alert('error signing in')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      navigate("/");
    }
  }

  return (
    <div className="profile">
      <h1 className="header">SignUp</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
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
        />
        <button className="button block">
          Register
        </button>
      </form>
    </div>
  )
}