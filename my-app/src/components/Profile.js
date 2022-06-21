import { Box, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "./helper";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
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

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, avatar_url`)
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

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <h1>Profile</h1>
      <Box
        sx={{
          display: "flex",
          margin: 2,
          alignItems: "center",
          padding: 2,
        }}
      >
        {loading ? (
          <p>
            You are currently not logged in, click
            <a href="http://localhost:3000/Sign%20In">here</a>
            to Log In or
            <a href="http://localhost:3000/Sign%20Up">here</a>
            to Sign Up!
          </p>
        ) : (
          <form onSubmit={updateProfile}>
            {
              // here idk why i cannot do the session?.user?.email thing but if
              // cannot then should do if (session) show this div
              // if session don't exist then show another page saying you have
              // not logged in and provide link to login?
            }
            <div>Email: {session.user.email}</div>
            <div>
              <label htmlFor="username">Username: </label>
              <input
                id="username"
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Button
                variant="contained"
                style={{ backgroundColor: "#ffb24d" }}
                disabled={loading}
              >
                Update profile
              </Button>
            </div>
          </form>
        )}
        <Button
          variant="contained"
          style={{ backgroundColor: "#ffb24d" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </div>
  );
};

export default Profile;
