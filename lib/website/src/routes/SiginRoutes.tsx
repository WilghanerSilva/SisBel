import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CadastroCliente from "../pages/CadastroCliente";

const SignRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={CadastroCliente} />
      </Routes>
    </BrowserRouter>
  );
};

export default SignRoutes;