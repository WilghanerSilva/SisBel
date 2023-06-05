import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "../pages/Home";
import { CadastroAgendamento } from "../pages/CadastroAgendamento";

const OtherRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/agendamento/cadastro" Component={CadastroAgendamento}/>
      </Routes>
    </BrowserRouter>
  );
};

export default OtherRoutes;