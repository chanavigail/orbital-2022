import React, { useState, useEffect } from "react";

import "./Invitations.css";
import { supabase } from "../helper";
import CreatedInvitation from "./CreatedInvitation/CreatedInvitation";
import NewInvitation from "./NewInvitation/NewInvitation";

function Invitations() {
  /*const [invitations, setInvitations] = useState([]);
  // this keeps track of user input, but i alr have this in invitation from so just need to do some parent child props stuff

  useEffect(() => {
    fetchInvitations();
  }, []);

  async function fetchInvitations() {
    const { data } = await supabase.from("invitations").select();
    setInvitations(data);
  }*/

  const addInvitationHandler = (invitationData) => {
    const { creatorName, date, time, locations } = invitationData;

    /*async function createInvitation() {
      await supabase
        .from("invitations")
        .insert([{ creatorName, date, time, locations }])
        .single();
      fetchInvitations();
    }

    console.log(invitationData);*/
  };

  return (
    <div>
      <h1>Invitations</h1>
      <h1>Invitations</h1>

      <CreatedInvitation />
      <CreatedInvitation />

      <NewInvitation onAddInvitation={addInvitationHandler} />
    </div>
  );
}

export default Invitations;
