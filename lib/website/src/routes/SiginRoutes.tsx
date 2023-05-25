import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CadastroCliente from "../pages/CadastroCliente";
import Login from "../pages/Login";

const SignRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login}/>
        <Route path="/cadastro" Component={CadastroCliente} />
      </Routes>
    </BrowserRouter>
  );
};

export default SignRoutes;