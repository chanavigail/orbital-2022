import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
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
    <Container
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        margin="auto"
        sx={{
          boxShadow: 2,
          width: 700,
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#faf2dc",
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h3" sx={{}}>
            Log In
          </Typography>
          <TextField
            id="email"
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            id="password"
            className="inputField"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loading ? (
            <Typography variant="subtitle1">Logging In...</Typography>
          ) : (
            ""
          )}
          <Button
            variant="contained"
            style={{ backgroundColor: "#ffb24d" }}
            type="submit"
          >
            Log In
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default LogIn;
