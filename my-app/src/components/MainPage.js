import React from "react";

function MainPage() {
    return (
        <div>
            <div id="checkin-box">
                <h1>Check in/out</h1>
                <select htmlFor="checkin" className="dropdown" id="checkin-form">
                    <option value="captdh">CAPT DH</option>
                </select>
                <button className="checkin-button">Check in</button>
                <button className="checkin-button">Check out</button>
            </div>
        </div>
    );
}

export default MainPage;