import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { checkSignUp, dbSignUp } from './helper';

export default function Profile() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  function signUp() {
    dbSignUp(username, password);
    alert("Successful!");
  }

  function checkFirst() {
    const [ count, setCount ] = React.useState(99);
    const check = checkSignUp(username, password)
      .then(user => setCount(user[0]))
      .catch(console.error);
    alert(count);
    count < 1 ? signUp() : alert("Username already in use, please choose another username")
  }

  return (
    <div className="profile">
      <h1 className="header">Sign Up</h1>
      <form onSubmit={checkFirst}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          className="inputField"
          type="text"
          placeholder="Your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          className="inputField"
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button block" type='submit'>
          Register
        </button>
      </form>
      <p className='profile-message'>Already registered? Click here</p>
    </div>
  )
}

