import React from "react";
import { ReactDOM } from "react";

function Locations() {
    return (
        <div>
            <div id="locations">
                <h1>All locations</h1>
                <img 
                    src={require("../images/captdh.jpeg")} 
                    width="250" height="250" 
                    alt="DineTogether logo" 
                    id="captdh"
                    onClick={toggleStatus}
                />
                <p id="captdh-status">
                    Currently there's <strong>0 people</strong> in CAPT DH
                </p>
            </div>
        </div>
    );
}

export default Locations;

function toggleStatus() {
    const box = document.getElementById("captdh-status");
    if (box.style.display === "none") {
        box.style.display = "block";
    } else {
        box.style.display = "none";
    }
}