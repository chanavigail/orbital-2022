import React from "react";

import FriendList from "./FriendList";
import "./Friends.css";

function Friends() {
  return (
    <div>
      <div className="friends">
        <h1>Friends</h1>
        <FriendList />
      </div>
    </div>
  );
}

export default Friends;
