import { Button, InputLabel, Stack, TextField } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../components/helper";

// const cors = require("cors");
// supabase.use(cors());

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [password, setPassword] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    console.log(session);
    if (session) getProfile();
  }, [session]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      alert("Thanks for signing up!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username , avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={3} component="form" onSubmit={handleLogin}>
      <Stack direction="row" spacing={7} alignItems="center">
        <InputLabel>Email</InputLabel>
        <TextField
          id="email"
          className="inputField"
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={3} alignItems="center">
        <InputLabel htmlFor="password">Password</InputLabel>
        <TextField
          id="password"
          className="inputField"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Stack>

      <Button
        variant="contained"
        style={{ backgroundColor: "#ffb24d" }}
        type="submit"
        sx={{ display: "inline" }}
      >
        Sign Up
      </Button>
    </Stack>
  );
}
