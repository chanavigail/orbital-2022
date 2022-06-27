import React from "react";

import { supabase } from "../helper";
import "./FriendList.css";

function FriendList() {
  const [ friends, setFriends ] = React.useState([]);
  const user = supabase.auth.user();

  const { data: userFriends, error } = await supabase
    .from("friends")
    .select("*")
    .match({ user_id: user.id })

  const component = 
    <div className="friendslist">
      <ul className="friendslist" id="friends-ul">
        <li className="friendslist friends-li">{userFriends[0]}</li>
      </ul>
    </div>;
  
  return component;
}

export default FriendList;