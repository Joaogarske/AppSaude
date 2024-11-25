import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { HomePage } from "./components/HomePage";
import {MedicamentoForm} from "./components/MedicamentoForm";
import { MedicamentoList } from "./components/MedicamentoList";

export  function  Rotas(){
    return(
    <Router>
        <Routes>
          <Route path="/medicamentoForm" element={<MedicamentoForm/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/medicamentoLista" element={<MedicamentoList/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/" element={<LoginPage/>} /> {/* Página inicial */}
        </Routes>
    </Router>
    )
}