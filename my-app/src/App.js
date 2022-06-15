import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { AuthProvider } from "./contexts/Auth";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import Locations from "./components/LocationsPage/Locations";
import Friends from "./components/Friends";
import Profile from "./components/Profile";
import Invitations from "./components/InvitationsPage/Invitations";

import "./index.css";

export default function App() {
  return (
    <Router className="App">
      <Navbar />
      <Routes>
        <Route path="/welcome" element={<MainPage />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/invitations" element={<Invitations />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
