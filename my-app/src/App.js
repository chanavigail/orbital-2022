import React from "react";

import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";

import "./index.css";

export default function App() {
    return (
        <div className="App">
            <Navbar />
            <main>
                <MainPage />
            </main>
        </div>
    );
}