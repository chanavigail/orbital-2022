import React from "react";

function FoodClique() {
  return (
    <div>
      <img
        src={require("../../images/utownFC.jpg")}
        width="250"
        height="250"
        alt="UTOWN Food Clique"
        id="utownFC"
        onClick={toggleStatus}
        className="loc"
      />
      <p id="utownFC-status" className="status">
        Currently there's <strong>0 people</strong> in UTOWN Food Clique
      </p>
    </div>
  );
}

export default FoodClique;

function toggleStatus() {
  const box = document.getElementById("fineclique-status");
  if (box.style.display === "none") {
    box.style.display = "block";
  } else {
    box.style.display = "none";
  }
}
