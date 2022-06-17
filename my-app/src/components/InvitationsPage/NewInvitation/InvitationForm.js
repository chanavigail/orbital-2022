import {
  Card,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  FormControl,
  Typography,
} from "@mui/material";

import React, { useState } from "react";

import "./InvitationForm.css";

const InvitationForm = () => {
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredTime, setEnteredTime] = useState("");
  const [enteredLocation, setEnteredLocation] = useState("");

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };
  const timeChangeHandler = (event) => {
    setEnteredTime(event.target.value);
  };
  const locationChangeHandler = (event) => {
    setEnteredLocation(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const invitationData = {
      date: new Date(enteredDate),
      time: enteredTime,
      location: enteredLocation,
    };

    console.log(invitationData);

    setEnteredDate("");
    setEnteredTime("");
    setEnteredLocation("");
  };

  return (
    <>
      <Card
        onSubmit={submitHandler}
        className="new-invitation__controls"
        component="form"
        style={{ backgroundColor: "#ffda6a" }}
      >
        <Typography align="center">
          Input details to create new invitation!
        </Typography>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <InputLabel>Date</InputLabel>
            <TextField
              id="date"
              type="date"
              sx={{ width: 250 }}
              value={enteredDate}
              onChange={dateChangeHandler}
            />
          </Grid>

          <Grid item xs={6}>
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

          <Grid item xs={6}>
            <InputLabel>Location</InputLabel>
            <Select
              sx={{ width: 250 }}
              value={enteredLocation}
              onChange={locationChangeHandler}
            >
              <MenuItem value="captdh">CAPT DH</MenuItem>
              <MenuItem value="tembudh">Tembusu DH</MenuItem>
              <MenuItem value="rc4dh">RC4 DH</MenuItem>
              <MenuItem value="utownfc">UTOWN Food Clique</MenuItem>
              <MenuItem value="utownff">UTOWN Fine Food</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#ffb24d" }}
              type="submit"
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