import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ApiButton from "./comp/ApiButton";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./comp/Nav";
import Start from "./comp/Start";
import CharacterCreatorForm from "./comp/RaceClassPicker";
import CharInfo from "./comp/CharInfo";
import DM from "./comp/DM";
import SkillChecker from "./comp/Skillcheck";
import Banner from "./comp/Banner";

function App() {
  const [book, setBook] = useState([]);
  return (
    <div className="background ">
      <div className="d-flex justify-content-center">
        <Banner></Banner>
      </div>
      <div class="container">
        {/* Start with a question that pulls the data from local storage*/}
        <div className="row">
          <Start></Start>
        </div>
      </div>
    </div>
  );
}

export default App;
