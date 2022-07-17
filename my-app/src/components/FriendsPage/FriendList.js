import React, { useEffect, useState } from "react";

import { supabase } from "../helper";
import "./FriendList.css";

function FriendList() {
  const [ ids, setIds ] = useState([]);
  const [ friends, setFriends ] = useState([])
  const user = supabase.auth.user();

  useEffect(() => {
    getIds();
    getFriends();
  }, [])

  async function getIds() {
    if ( user !== null ) {
      const { data: userFriends, error: idError } = await supabase
        .from("friends")
        .select("friend_id")
        .match({ user_id: user.id })
      if (idError) throw idError;
      setIds(userFriends)
    }
  };

  async function getFriends() {
    for (let i = 0; i < ids.length; i++) {
      const { data, error: friendsError } = await supabase
        .from("profiles")
        .select(`username, current_loc`)
        .match( {id: ids[i].friend_id} )
      friends.push(
        {
          item_key: i + 1,
          username: data[0].username,
          loc: data[0].current_loc}
      )
    }
  }

  const component = (
    <div className="friendslist">
      <ul className="friendslist" id="friends-ul">
        {friends.map((item) => (
          <li key={item.item_key}>{item.username} - {item.loc}</li>
        ))}
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