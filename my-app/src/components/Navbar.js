import React from "react";

function Navbar() {
    return (
        <div id="nav">
            <img src={require("../images/logo.png")} width="273" height="50" alt="DineTogether logo" className="nav" />
            <ul id="navlist" className="nav">
                <li className="navli nav"><a href="locations.html">All Locations</a></li>
                <li className="navli nav"><a href="friends.html">Friends</a></li>
                <li className="navli nav" id="usertab"><a href="profile.html">Profile</a></li>
            </ul>
        </div>
    )
};

export default Navbar;