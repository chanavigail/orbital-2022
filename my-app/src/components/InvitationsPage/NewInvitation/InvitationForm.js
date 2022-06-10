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
    <form onSubmit={submitHandler}>
      <div className="new-invitation__controls">
        <div className="new-invitation__control">
          <label>Date</label>
          <input
            type="date"
            min="2022-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>

        <div className="new-invitation__control">
          <label>Time</label>
          <input type="time" value={enteredTime} onChange={timeChangeHandler} />
        </div>

        <div className="new-invitation__control">
          <label>Location</label>
          <select value={enteredLocation} onChange={locationChangeHandler}>
            <option value="CAPT">CAPT DH</option>
            <option value="Tembusu">Tembusu DH</option>
            <option value="RC4">RC4 DH</option>
            <option value="FC">Food Clique</option>
          </select>
        </div>
      </div>

      <div className="new-invitation__actions">
        <button type="submit">Create Invitation</button>
      </div>
    </form>
  );
};

export default InvitationForm;
