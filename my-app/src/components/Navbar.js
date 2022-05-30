import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav id="nav">
            <Link to ="/welcome">
                <img src={require("../images/logo.png")} width="273" height="50" alt="DineTogether logo" className="nav" />
            </Link>
            <ul id="navlist" className="nav">
                <li className="navli nav">
                    <Link to="/locations">All Locations</Link>
                </li>
                <li className="navli nav">
                    <Link to="/friends">Friends</Link>
                </li>
                <li className="navli nav">
                    <Link to="/invitations">Invitations</Link>
                </li>
                <li className="navli nav" id="usertab">
                    <Link to="/profile">Profile</Link>
                </li>
            </ul>
        </nav>
    )
};

export default Navbar;
