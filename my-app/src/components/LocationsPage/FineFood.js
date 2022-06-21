import React from "react";

function FineFood() {
  return (
    <div>
      <img
        src={require("../../images/utownFF.jpg")}
        width="250"
        height="250"
        alt="UTOWN Fine Food"
        id="utownFF"
        onClick={toggleStatus}
        className="loc"
      />
      <p id="utownFF-status" className="status">
        Currently there's <strong>0 people</strong> in UTOWN Fine Food
      </p>
    </div>
  );
}

export default FineFood;

function toggleStatus() {
  const box = document.getElementById("utownFF-status");
  if (box.style.display === "none") {
    box.style.display = "block";
  } else {
    box.style.display = "none";
  }
}
