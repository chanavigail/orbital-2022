import {
  Avatar,
  Box,
  Button,
  Divider,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "./helper";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [current_loc, setCurrent_loc] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, avatar_url, current_loc`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
        setCurrent_loc(data.current_loc);
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
        current_loc,
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
      alert("Profile has been updated!");
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
      setLoading(true);
    }
  };

  return (
    <Stack>
      <Box>
        <Typography variant="h3" sx={{ mt: 10 }}>
          Profile
        </Typography>
        {loading ? (
          <Typography variant="h6">
            You are currently not logged in, click&nbsp;
            <a href="http://localhost:3000/Log%20In">here</a>
            &nbsp;to Log In or&nbsp;
            <a href="http://localhost:3000/Sign%20Up">here</a>
            &nbsp;to Sign Up!
          </Typography>
        ) : (
          <Box component="form" marginTop={2}>
            <Stack
              divider={<Divider orientation="horizontal" />}
              spacing={2}
              //sx={{ alignItems: "center" }}
            >
              <Avatar sx={{ width: 56, height: 56 }} />
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
                onClick={updateProfile}
              >
                Update profile
              </Button>
            </Stack>
          </Box>
        )}
      </Box>

      {loading ? (
        ""
      ) : (
        <Box marginTop={20}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#ffb24d" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      )}
    </Stack>
  );
};

export default Profile;
