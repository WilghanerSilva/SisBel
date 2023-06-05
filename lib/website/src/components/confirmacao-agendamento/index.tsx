import "./style.css";

export function ConfirmacaoAgendamento () {
  return (
    <div className="confirmation">
          <div className="informacoes-pessoais">
            <h1>Informações Pessoais</h1>
            <p id="nome">Nome completo do usuário</p>
            <p id="contato">Contato (88) 992064599</p>
          </div>

          <div className="informacoes-agendamento">
            <h1>Informações Agendamento</h1>
            <p>Corte de cabelo masculino</p>
            <p>Agendado para 17 de Abril de 2023, às 08:00am</p>
          </div>
          
          <div className="confirmation-buttons-container">
            <button id="concluir">Concluir</button>
            <button id="cancelar">Cancelar</button>
          </div>
        </div>
  )
}