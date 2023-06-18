import { BsThreeDotsVertical } from "react-icons/bs";
import "./style.css";
import { Agendamento } from "../../types/AgendamentoType";
import { useState } from "react";


interface Props {
  agendamento: Agendamento
}

export function CardAgendamento (props: Props) {
  const [dateAgendamento, setDateAgendamentp] = useState(new Date(props.agendamento.data))
  const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
  return (
    <div className="card-agendamento">
      <div className="agendamento-icon">
        <img src={`${props.agendamento.servico.categoria}.png`} alt={props.agendamento.servico.categoria} />
      </div>
      <h3 className="agendamento-hora">
        {`${dateAgendamento.getDate()} de ${meses[dateAgendamento.getMonth()]}, ${props.agendamento.horario}`}
      </h3>
      <div className="detalhes-container">
        <p className="servico">{props.agendamento.servico.nome}</p>
        <BsThreeDotsVertical className="menu-icon"/>
      </div>
    </div>
  )
}