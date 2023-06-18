import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "../pages/Home";
import { CadastroAgendamento } from "../pages/CadastroAgendamento";
import { CadastrarFuncionario } from "../pages/CadastrarFuncionario";

const OtherRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/agendamento/cadastro" Component={CadastroAgendamento}/>
        <Route path="/cadastrar-funcionario" Component={CadastrarFuncionario}/>
      </Routes>
    </BrowserRouter>
  );
};

export default OtherRoutes;