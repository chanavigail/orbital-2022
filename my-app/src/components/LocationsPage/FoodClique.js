import React from "react";
import { supabase } from "../helper";

function FoodClique() {

  async function getVol() {
    const [ vol, setVol ] = React.useState(0)
    const { data: num, error } = await supabase
      .from("locations")
      .select("*")
      .match({name: "utownff"});
    return num.pop().current_vol;
  }

  function personOrPeople() {
    if (getVol() === 1) {
      return "person";
    }
    return "people"
  }

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
        Currently there's <strong>{getVol()} {personOrPeople()}</strong> in UTOWN Food Clique
      </p>
    </div>
  );
}

export default FoodClique;

function toggleStatus() {
  const box = document.getElementById("utownFC-status");
  if (box.style.display === "none") {
    box.style.display = "block";
  } else {
    box.style.display = "none";
  }
}
