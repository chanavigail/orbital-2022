import React from "react";
import { supabase } from "../helper";

function FineFood() {
  const [ vol, setVol ] = React.useState(0)

  async function getVol() {
    const { data: num, error } = await supabase
      .from("locations")
      .select("current_vol")
      .match({name: "utownff"})
      .then( data => setVol(data));
    return vol;
  }

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
        Currently there's <strong>{vol} people</strong> in UTOWN Fine Food
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
