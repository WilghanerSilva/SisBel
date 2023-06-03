import "./style.css"
import {BsHouseDoor, BsSearch, BsCalendarPlus, BsThreeDots} from "react-icons/bs";
import {AiOutlinePlus, AiOutlineHeart} from "react-icons/ai";


export default function SideMenu () {
  return (
    <div className="sidemenu-container">
      <ul id="nav-menu">
        <li className="menu-item">
          <BsThreeDots className="menu-icon"/>
        </li>
        <li className="menu-item">
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
      <div className="cliente-options">
        <div className="options-1">
          <div className="options-item">
            <div className="item-icon" id="NovoAgendamento">
              <AiOutlinePlus className="icon"/>
            </div>
            <p>Novo Agendamento</p>
          </div>
          <div className="options-item">
            <div className="item-icon" id="Favoritos">
              <AiOutlineHeart className="icon"/>
            </div>
            <p>Favoritos</p>
          </div>
        </div>
        <div className="options-2">
          <ul className="servicos-menu">
            <li className="servico-item">Corte</li>
            <li className="servico-item">Escova</li>
            <li className="servico-item">Coloração</li>
            <li className="servico-item">Hidratação</li>
            <li className="servico-item">Progressiva</li>
            <li className="servico-item">Luzes</li>
            <li className="servico-item">Mais Categorias</li>
          </ul>
        </div>
      </div>
    </div>
  )
}