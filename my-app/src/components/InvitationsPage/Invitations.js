import React from "react";
import CreatedInvitation from "./CreatedInvitation/CreatedInvitation";
import "./Invitations.css";
import NewInvitation from "./NewInvitation/NewInvitation";

function Invitations() {
  return (
    <div>
      <div>
        <h1>Invitations</h1>
      </div>

      <NewInvitation />

      <div className="invitations">
        <CreatedInvitation></CreatedInvitation>
      </div>
    </div>
  );
}

export default Invitations;
