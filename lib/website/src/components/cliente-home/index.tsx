import { CardAgendamento } from "../card-agendamento";
import "./style.css";
import {MdAddAlarm} from "react-icons/md";

export default function ClienteHome () {
  return (
    <div className="clientehome-container">
      <div className="lista">
        <div className="header-lista">
          <h1>Seus próximos agendamentos</h1>
          <p>Visualizar agenda completa</p>
        </div>
        <div id="lista-agendamentos">
          <CardAgendamento/>
          <div id="add-agendamento">
            <MdAddAlarm/>
          </div>
        </div>
      </div>

      <div className="lista">
        <div className="header-lista">
          <h1>Conheça nossos profissionais</h1>
          <p>Visualizar todos os colaboladores</p>
        </div>
       <div id="lista-funcionarios">
        <div className="funcionario-card">
          <div className="funcionario-icon"></div>
          <p className="funcionario-name">Délis Passos</p>
          <p className="funcionario-servicos">Manicure, pedicure</p>
        </div>
       </div>
      </div>
      
    </div>
  )
}