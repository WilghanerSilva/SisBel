import {GiConfirmed} from "react-icons/gi";
import "./style.css";

export function ResultadoAgendamento (){
  return (
    <div className="result-message">
          <GiConfirmed id="result-icon"/>
          <p>Agendamento</p>
          <p>realizado com sucesso</p>
          <p id="id">ID: #102546554</p>
        </div>
  )
}