import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ApiButton from "./comp/ApiButton"
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./comp/Nav"
import Start from "./comp/Start"
import CharacterCreatorForm from './comp/RaceClassPicker';
import CharInfo from "./comp/CharInfo"
import DM from "./comp/DM"


function App() {


  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Start></Start>}></Route>
        <Route path="api" element={<ApiButton></ApiButton>}></Route>
        <Route path="cc" element={<CharacterCreatorForm></CharacterCreatorForm>}></Route>
        <Route path="adventure" element={<ApiButton></ApiButton>}></Route>
        <Route path="ci" element={<CharInfo></CharInfo>}></Route>
      </Routes>
    
    </BrowserRouter>
    
    
    

  
  );
}

export default App;
