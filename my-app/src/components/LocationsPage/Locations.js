import React from "react";

import "./Locations.css";

import CaptDH from "./CaptDH";
import FineFood from "./FineFood";
import FoodClique from "./FoodClique";

function Locations() {
  return (
    <div className="locations">
      <h1>All locations</h1>
      <CaptDH />
      <FineFood />
      <FoodClique />
    </div>
  );
}

export default Locations;
