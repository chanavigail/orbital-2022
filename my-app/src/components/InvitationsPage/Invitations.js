import React from "react";

import "./Invitations.css";

import CreatedInvitation from "./CreatedInvitation/CreatedInvitation";
import NewInvitation from "./NewInvitation/NewInvitation";

function Invitations() {
  return (
    <div>
      <div className="invitations">
        <h1>Invitations</h1>
      </div>

      <NewInvitation />

      <CreatedInvitation />
      <CreatedInvitation />
      <CreatedInvitation />
    </div>
  );
}

export default Invitations;
