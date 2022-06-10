import React from "react";
import "./CreatedInvitation.css";
import InvitationDate from "./InvitationDate";

function CreatedInvitation() {
  const date = new Date(2022, 5, 1);
  const time = "7pm";
  const CreatorName = "Name";

  /* thinking of putting name of creator, location,
  date, time, and other ppl who accepted the invitation alr? + accept button */
  return (
    <div className="box">
      <div className="created-invitation__name">
        <h3>{CreatorName}</h3>
      </div>
      <InvitationDate date={date} />
      <div className="created-invitation__time">{time}</div>
      <button className="invitation__button">Accept</button>
    </div>
  );
}

export default CreatedInvitation;
