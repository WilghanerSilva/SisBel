import { useContext } from "react";
import "./style.css";
import AuthContext from "../../contexts/auth";
import { useNavigate } from "react-router-dom";


interface Props {
  date: string,
  horario: string,
  servicoId: string,
  buttonFunction: () => void
}

export function ConfirmacaoAgendamento (props: Props) {
  const context = useContext(AuthContext);
  const nav = useNavigate();
  const normalizeDateMessage = () => {
    const date = new Date(props.date)
    const mesesPorExtenso = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    
    return `Agendado para ${date.getDate()+1} de ${mesesPorExtenso[date.getMonth()]} de ${date.getFullYear()}, às ${props.horario}`
  }


  return (
    <div className="confirmation">
          <div className="informacoes-pessoais">
            <h1>Informações Pessoais</h1>
            <p id="nome">{context.user?.name}</p>
            <p id="contato">Contato (88) 992064599</p>
          </div>

          <div className="informacoes-agendamento">
            <h1>Informações Agendamento</h1>
            <p>Corte de cabelo masculino</p>
            <p>{normalizeDateMessage()}</p>
          </div>
          
          <div className="confirmation-buttons-container">
            <button id="concluir" onClick={props.buttonFunction}>Concluir</button>
            <button id="cancelar" onClick={e => nav("/")}>Cancelar</button>
          </div>
        </div>
  )
}