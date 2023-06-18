import "./style.css"
import {BsHouseDoor, BsSearch, BsCalendarPlus, BsThreeDots} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ClienteOptions } from "../cliente-options";
import { useContext } from "react";
import AuthContext from "../../contexts/auth";
import { AdminOptions } from "../admin-options";

export default function SideMenu () {
  const nav = useNavigate();
  const context = useContext(AuthContext);
  
  const navigateHandle = (url: string) => {
    nav(url);
  }

  return (
    <div className="sidemenu-container">
      <ul id="nav-menu">
        <li className="menu-item">
          <BsThreeDots className="menu-icon"/>
        </li>
        <li className="menu-item" onClick={() => {navigateHandle("/")}}>
          <BsHouseDoor className="menu-icon"/>
          <p>Inicio</p>
        </li>
        <li className="menu-item">
          <BsSearch className="menu-icon"/>
          <p>Buscar</p>
        </li>
        <li className="menu-item">
          <BsCalendarPlus className="menu-icon"/>
          <p>Agenda</p>
        </li>
      </ul>
      {context.profile === "cliente" && (<ClienteOptions/>)}
      {context.profile === "admin" && (<AdminOptions/>)}
    </div>
  )
}