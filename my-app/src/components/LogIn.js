import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "./helper";

function LogIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) throw error;
      alert("You have successsfully logged in!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <h1>Log In</h1>
      <div>
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loading ? <p>Logging In...</p> : ""}
          <button className="button block" aria-live="polite">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
