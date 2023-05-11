import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./pages/login/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={Login} path="/"/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
