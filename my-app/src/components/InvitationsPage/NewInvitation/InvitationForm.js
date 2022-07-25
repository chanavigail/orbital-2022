import {
  Card,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { supabase } from "../../helper";

import "./InvitationForm.css";

const InvitationForm = () => {
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredTime, setEnteredTime] = useState("");
  const [enteredLocation, setEnteredLocation] = useState("");
  const [username, setUsername] = useState(null);

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };
  const timeChangeHandler = (event) => {
    setEnteredTime(event.target.value);
  };
  const locationChangeHandler = (event) => {
    setEnteredLocation(event.target.value);
  };

  const user = supabase.auth.user();

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = async () => {
    let { data, error, status } = await supabase
      .from("profiles")
      .select(`username`)
      .eq("id", user.id)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      setUsername(data.username);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const invitationData = {
      id: user.id,
      date: enteredDate,
      time: enteredTime,
      location: enteredLocation,
      accepted_people: [],
      username: username,
    };

    if (!username) {
      alert("Please update profile first before creating an invitation.");
    } else {
      async function createInvitation() {
        const { data, error } = await supabase
          .from("invitations")
          .insert([{ ...invitationData }]);
        window.location.reload(false);
      }

      createInvitation();

      setEnteredDate("");
      setEnteredTime("");
      setEnteredLocation("");
    }
  };

  return (
    <>
      <Card
        onSubmit={submitHandler}
        className="new-invitation__controls"
        component="form"
        style={{ backgroundColor: "#ffda6a" }}
        align="center"
      >
        <Typography align="center">
          Input details to create new invitation!
        </Typography>

        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ alignItems: "center" }}
        >
          <Grid item md={6}>
            <InputLabel>Date</InputLabel>
            <TextField
              id="date"
              type="date"
              sx={{ width: 250 }}
              value={enteredDate}
              onChange={dateChangeHandler}
            />
          </Grid>

          <Grid item md={6}>
            <InputLabel>Time</InputLabel>
            <TextField
              id="time"
              type="time"
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 250 }}
              value={enteredTime}
              onChange={timeChangeHandler}
            />
          </Grid>

          <Grid item md={6}>
            <InputLabel>Location</InputLabel>
            <Select
              sx={{ width: 250, textAlign: "left" }}
              value={enteredLocation}
              onChange={locationChangeHandler}
            >
              <MenuItem value="CAPT DH">CAPT DH</MenuItem>
              <MenuItem value="TEMBUSU DH">Tembusu DH</MenuItem>
              <MenuItem value="RC4 DH">RC4 DH</MenuItem>
              <MenuItem value="USP DH">USP DH</MenuItem>
              <MenuItem value="UTOWN FC">UTOWN Food Clique</MenuItem>
              <MenuItem value="UTOWN FF">UTOWN Fine Food</MenuItem>
            </Select>
          </Grid>

          <Grid item md={6}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#ffb24d" }}
              type="submit"
              disabled={!(enteredDate && enteredTime && enteredLocation)}
            >
              Create Invitation
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default InvitationForm;
