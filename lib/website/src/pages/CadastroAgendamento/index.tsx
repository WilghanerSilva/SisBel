import {useState } from "react";
import { CardAgendamento } from "../../components/card-agendamento";
import NavBar from "../../components/navbar";
import SideMenu from "../../components/side-menu";
import {BsChevronRight, BsChevronLeft} from "react-icons/bs"
import {GiConfirmed} from "react-icons/gi";
import "./style.css";
import { FormAgendamento } from "../../components/form-agendamento";
import { ConfirmacaoAgendamento } from "../../components/confirmacao-agendamento";

export function CadastroAgendamento () {
  const getCurrentDate = () => {
    const timeElapsed = Date.now();
    return new Date(timeElapsed);
  }


  const [currentDate, setCurrentDate] = useState<Date>(getCurrentDate());

  const parseDate = (date: Date) => {
    console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }

  return (
    <div className="agendamento-container">
      <div id="navbar-wrapper">
        <NavBar/>
      </div>
      <div id="sidemenu-wrapper">
        <SideMenu/>
      </div>
      <div id="content-wrapper">
        <div className="navigation-container">
          <button id="left"><BsChevronLeft/></button>
          <button id="right"><BsChevronRight/></button>
          <h1>Confirmar agendamento</h1>
        </div>
        
        <div className="lista-agendamentos">
          <h2>Seus próximos agendamentos</h2>
          <div className="lista-cadastro">
            <CardAgendamento/>
          </div>
        </div>

        <div className="result-message">
          <GiConfirmed id="result-icon"/>
          <p>Agendamento</p>
          <p>realizado com sucesso</p>
          <p id="id">ID: #102546554</p>
        </div>
        
      </div>
    </div>
  )
}