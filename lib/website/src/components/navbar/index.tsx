import { useContext, useState } from "react";
import {FaUserAlt} from "react-icons/fa";
import "./style.css"
import {GoTriangleDown, GoTriangleUp} from "react-icons/go";
import AuthContext from "../../contexts/auth";

export default function NavBar() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const context = useContext(AuthContext);

  const menuHandle = () => {
    setMenuIsOpen(!menuIsOpen)
  }

  return (
    <div className="navbar-container">
      <img src="/beleza.png" alt="beleza" id="logo"/>
      <ul>
        <li>PAINEL</li>
        <li>LOCALIZAÇÃO</li>
        <li>CONTATO</li>
        <li>TERMOS E SERVIÇOS</li>
      </ul>
      <div className="user-menu" onClick={menuHandle}>
        <div className="img-wrapper">
          <FaUserAlt/>
        </div>
        <p>{context.user?.name}</p>
        {menuIsOpen ? <GoTriangleUp/> : <GoTriangleDown/>}
      </div>
    </div>
  )
}