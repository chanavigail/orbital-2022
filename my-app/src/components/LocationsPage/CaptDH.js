import React from "react";
import supabase from "../helper";

function CaptDH() {
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
          Currently there's <strong>{vol} people</strong> in CAPT DH
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
