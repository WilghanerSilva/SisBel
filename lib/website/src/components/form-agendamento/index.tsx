import "./style.css";

export function FormAgendamento () {
  return (
    <div className="form-agendamento">
          
          <div className="agendamento-input-container"><label htmlFor="servico">Selecione um serviço</label>
            <select name="servico">
              <option value="corte de cabelo">corte de cabelo</option>
            </select>
          </div>
         
          <div className="agendamento-input-container"><label htmlFor="funcionario">Profissional Disponível</label>
            <select name="funcionario">
              <option value="josue"> Josúe Ribeira Campos</option>
            </select>
          </div>
          
          <div className="date-hours-container">
            <div className="agendamento-input-container">
              <label htmlFor="data">Data</label>
              <input type="date" name="date" value={"2023-05-04"}/>
            </div>
            
            <div className="agendamento-input-container">
              <label htmlFor="hora">Hora</label>
              <select name="hora">
                <option value="08:00">08:00</option>
              </select>
            </div>
          </div>
          
          <div className="agendamento-input-container">
            <label htmlFor="detalhes">Descreva algum detalhe</label>
            <textarea name="detalhes" id="" cols={30} rows={5}></textarea>
          </div>


          <button>Continuar</button>
          
        </div>
  )
}