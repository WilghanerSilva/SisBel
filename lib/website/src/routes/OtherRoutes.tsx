import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "../pages/Home";
import { CadastroAgendamento } from "../pages/CadastroAgendamento";
import { CadastrarFuncionario } from "../pages/CadastrarFuncionario";
import { CadastrarServico } from "../pages/CadastrarServico";

const OtherRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/agendamento/cadastro" Component={CadastroAgendamento}/>
        <Route path="/cadastrar-funcionario" Component={CadastrarFuncionario}/>
        <Route path="/cadastrar-servico" Component={CadastrarServico}/>
      </Routes>
    </BrowserRouter>
  );
};

export default OtherRoutes;