import React, { useEffect, useState } from "react";

import { supabase } from "../helper";
import "./FriendList.css";

function FriendList() {
  const [ ids, setIds ] = useState([]);
  const [ friends, setFriends ] = useState([])

  useEffect(() => {
    getFriends();
  }, [])

  async function getIds() {
    if ( user !== null ) {
      const { data: userFriends, error: idError } = await supabase
        .from("friends")
        .select("friend_id")
        .match({ user_id: supabase.auth.user().id })
      if (idError) throw idError;
      setIds(userFriends)
    }
  };

  async function getFriends() {
    getIds();
    for (let i = 0; i < ids.length; i++) {
      const { data, error: friendsError } = await supabase
        .from("profiles")
        .select(`username, current_loc`)
        .match( {id: ids[i].friend_id} )
      if (friendsError) throw friendsError;
      friends.push(
        {
          item_key: i + 1,
          username: data[0].username,
          loc: data[0].current_loc}
      )
    }
  }

  return (
    <div className="friendslist">
      <ul className="friendslist" id="friends-ul">
        <li className="friends-li">rayna - CAPT DH</li>
      </ul>
    </div>
  );
}

export default FriendList;
