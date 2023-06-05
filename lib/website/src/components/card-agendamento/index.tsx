import { BsThreeDotsVertical } from "react-icons/bs";
import "./style.css";

export function CardAgendamento () {
  return (
    <div className="card-agendamento">
      <div className="agendamento-icon">
      </div>
      <h3 className="agendamento-hora">
        Hoje, 18h
      </h3>
      <div className="detalhes-container">
        <p className="servico">Corte de cabelo feminino</p>
        <BsThreeDotsVertical className="menu-icon"/>
      </div>
    </div>
  )
}