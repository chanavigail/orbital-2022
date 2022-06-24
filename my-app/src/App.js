import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { AuthProvider } from "./contexts/Auth";
import NavBar from "./components/Navbar";
import MainPage from "./components/MainPage";
import Locations from "./components/LocationsPage/Locations";
import Friends from "./components/FriendsPage/Friends";
import Profile from "./components/Profile";
import Invitations from "./components/InvitationsPage/Invitations";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

import "./index.css";

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/Home" element={<MainPage />} />
        <Route path="/Locations" element={<Locations />} />
        <Route path="/Friends" element={<Friends />} />
        <Route path="/Invitations" element={<Invitations />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Sign%20Up" element={<SignUp />} />
        <Route path="/Log%20In" element={<LogIn />} />
      </Routes>
    </div>
  );
}
