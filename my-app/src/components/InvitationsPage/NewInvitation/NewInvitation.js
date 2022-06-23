import React from "react";
import "./NewInvitation.css";

import InvitationForm from "./InvitationForm";

const NewInvitation = (props) => {
  /*const createInvitationHandler = (enteredInvitationData) => {
    const invitationData = {
      ...enteredInvitationData,
      id: Math.random().toString(),
    };

    props.onAddInvitation(invitationData);
  };*/

  return (
    <div>
      <InvitationForm /*onCreateInvitation={createInvitationHandler}*/ />
    </div>
  );
};

export default NewInvitation;
