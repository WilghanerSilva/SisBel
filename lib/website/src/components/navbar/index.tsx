import { useState } from "react";
import "./style.css"
import {GoTriangleDown, GoTriangleUp} from "react-icons/go";

export default function NavBar() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const menuHandle = () => {
    setMenuIsOpen(!menuIsOpen)
  }

  return (
    <div className="navbar-container">
      <img src="./beleza.png" alt="beleza" id="logo"/>
      <ul>
        <li>PAINEL</li>
        <li>LOCALIZAÇÃO</li>
        <li>CONTATO</li>
        <li>TERMOS E SERVIÇOS</li>
      </ul>
      <div className="user-menu" onClick={menuHandle}>
        <div className="img-wrapper">
        </div>
        <p>Usuário</p>
        {menuIsOpen ? <GoTriangleUp/> : <GoTriangleDown/>}
      </div>
    </div>
  )
}