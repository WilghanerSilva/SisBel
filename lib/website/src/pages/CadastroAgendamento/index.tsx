import {useState } from "react";
import { CardAgendamento } from "../../components/card-agendamento";
import NavBar from "../../components/navbar";
import SideMenu from "../../components/side-menu";
import {BsChevronRight, BsChevronLeft} from "react-icons/bs"
import "./style.css";
import { FormAgendamento } from "../../components/form-agendamento";
import { ConfirmacaoAgendamento } from "../../components/confirmacao-agendamento";
import { ResultadoAgendamento } from "../../components/resultado-agendamento";
import api from "../../services/api";

export function CadastroAgendamento () {
  const [currentPage, setCurrentPage] = useState(1);
  const [funcionarioId, setFuncionarioId] = useState("");
  const [servicoId, setServicoId] = useState("");
  const [date, setDate] = useState("");
  const [detalhes, setDetalhes] = useState("");
  const [horario, setHorario] = useState("");
  const [error, setError] = useState("")

  const incrementPage = () => {
    const newPage = (currentPage + 1) < 3 ? currentPage + 1 : 3
    setCurrentPage(newPage);
  }

  const decrementPage = () => {
    const newPage = (currentPage - 1) > 1 ? currentPage - 1: 1
    setCurrentPage(newPage)
  }

  const handleSubmitForm = () => {
    api.post("/agendamento/cadastrar", {
      date,
      time: horario,
      details: detalhes,
      funcionarioId,
      servicoId
    })
      .then( response => {
        incrementPage();
        setError("");
      })
      .catch(error => {
        decrementPage();
        setError("Verifique se você preencheu todas as informações corretamente")
      })
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
          <button id="left" onClick={decrementPage}><BsChevronLeft/></button>
          <button id="right"><BsChevronRight/></button>
          <h1>
            {currentPage === 1 && ("Realizar Agendamento")}
            {currentPage === 2 && ("Confirmar Agendamento")}
            {currentPage === 3 && ("Agendamento Concluído")}
          </h1>
        </div>
        
        <div className="lista-agendamentos">
          <h2>Seus próximos agendamentos</h2>
          <div className="lista-cadastro">
            <CardAgendamento/>
          </div>
        </div>
        
        {currentPage === 1 && (
          <FormAgendamento
            date={date}
            detalhes={detalhes}
            funcionarioId={funcionarioId}
            horario={horario}
            servicoId={servicoId}
            setDate={setDate}
            setDetalhes={setDetalhes}
            setFuncionarioId={setFuncionarioId}
            setHorario={setHorario}
            setServicoId={setServicoId}
            buttonFunction={incrementPage}
            error={error}
          />
        )}
        {
          currentPage === 2 && (
            <ConfirmacaoAgendamento
              date={date}
              horario={horario}
              servicoId={servicoId}
              buttonFunction={handleSubmitForm}
            />
        )}
        {
          currentPage === 3 && (
            <ResultadoAgendamento/>
        )}

      </div>
    </div>
  )
}