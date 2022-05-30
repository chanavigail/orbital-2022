import React from "react";

function Locations() {
    return (
        <div>
            <div id="locations">
                <h1>All locations</h1>
                <img src={require("../images/captdh.jpeg")} width="500" height="500" alt="DineTogether logo" className="capt-dh" />
            </div>
        </div>
    );
}

export default Locations;