import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/login/login";
import CadastroCliente from "./pages/cadastro-cliente/cadastro-cliente";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Login} path="/"/>
        <Route Component={CadastroCliente} path="/cadastro-cliente"/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
