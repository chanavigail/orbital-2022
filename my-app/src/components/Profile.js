import {
  Box,
  Button,
  Divider,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
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
      <Stack>
        <Box>
          <Typography variant="h2">Profile</Typography>
          <Typography variant="h3">Profile</Typography>
          {loading ? (
            <p>
              You are currently not logged in, click
              <a href="http://localhost:3000/Log%20In">here</a>
              to Log In or
              <a href="http://localhost:3000/Sign%20Up">here</a>
              to Sign Up!
            </p>
          ) : (
            <Box component="form" margin="auto" onSubmit={updateProfile}>
              <Stack divider={<Divider orientation="horizontal" />} spacing={2}>
                <Box
                  display="flex"
                  gap={2}
                  alignItems="center"
                  justifyContent="left"
                >
                  <InputLabel>Email: </InputLabel>
                  <Typography>{session.user.email}</Typography>
                </Box>

                <Box
                  display="flex"
                  gap={2}
                  alignItems="center"
                  justifyContent="left"
                >
                  <InputLabel>Username: </InputLabel>
                  <TextField
                    id="username"
                    type="text"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Box>

                <Button
                  variant="contained"
                  style={{ backgroundColor: "#ffb24d" }}
                  disabled={loading}
                >
                  Update profile
                </Button>
              </Stack>
            </Box>
          )}
        </Box>

        <Box marginTop={30}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#ffb24d" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Stack>
    </div>
  );
};

export default Profile;
