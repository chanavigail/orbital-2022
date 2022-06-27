import React from "react";

import { supabase } from "../helper";
import "./FriendList.css";

function FriendList() {
  const [ friends, setFriends ] = React.useState([]);
  const user = supabase.auth.user();

  const { data: userFriends, error } = supabase
    .from("friends")
    .select("*")
    .match({ user_id: user.id })

  const component = 
    <div className="friendslist">
      <ul className="friendslist" id="friends-ul">
        <li className="friendslist friends-li">{userFriends[0]}</li>
      </ul>
    </div>;
  
  for (let i=0; i <= userFriends.length; i++) {
    const friends_li = document.createElement("li");
    friends_li.innerHTML = userFriends[i];
    friends_li.setAttribute("class", "friendslist friends-li")
    document.getElementById("friends-ul").appendChild(friends_li);
  }

  return component;
}

export default FriendList;