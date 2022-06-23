import React from "react";

function CaptDH() {
  return (
    <div>
      <div>
        <img
          src={require("../../images/captdh.jpeg")}
          width="250"
          height="250"
          alt="CAPT Dining Hall"
          id="captdh"
          onClick={toggleStatus}
          className="loc"
        />
        <p id="captdh-status" className="status">
          Currently there's <strong>0 people</strong> in CAPT DH
        </p>
      </div>
    </div>
  );
}

export default CaptDH;

function toggleStatus() {
  const box = document.getElementById("captdh-status");
  if (box.style.display === "none") {
    box.style.display = "block";
  } else {
    box.style.display = "none";
  }
}
