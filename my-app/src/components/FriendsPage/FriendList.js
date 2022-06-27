import React, { useEffect } from "react";

import { supabase } from "../helper";
import "./FriendList.css";

function FriendList() {
  const [ friends, setFriends ] = React.useState([""]);
  const user = supabase.auth.user();

  useEffect(() => {
    getFriends();
  }, [])

  async function getFriends() {
    if ( user !== null ) {
      const { data: userFriends, error } = await supabase
        .from("friends")
        .select("*")
        .match({ user_id: "c2bee42e-7da4-431b-b3c5-4226ece08234" })
      if (error) throw error;
      setFriends(userFriends)
    }
  };

  const component = (
    <div className="friendslist">
      <ul className="friendslist" id="friends-ul">
        <li className="friendslist friends-li">raynangxinyee@gmail.com</li>
      </ul>
    </div>
  );
  
  // for (let i=0; i <= friends.length; i++) {
  //   const friends_li = document.createElement("li");
  //   friends_li.innerHTML = friends[i];
  //   friends_li.setAttribute("class", "friendslist friends-li")
  //   document.getElementById("friends-ul").appendChild(friends_li);
  // }

  return component;
}

export default FriendList;