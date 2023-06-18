import { useEffect, useState } from "react";
import { Servico } from "../../types/ServicoType";
import "./style.css";
import api from "../../services/api";
import { Funcionario } from "../../types/FuncionarioType";

interface Props {
  servicoId: string,
  funcionarioId: string,
  date: string,
  horario: string,
  detalhes: string,
  error: string,
  setServicoId: (value: string) => void
  setFuncionarioId: (value: string) => void
  setDate: (value: string) => void
  setHorario: (value: string) => void
  setDetalhes: (value: string) => void
  buttonFunction: () => void
}

export function FormAgendamento (props: Props) {

  const currentDate = new Date().toISOString().split('T')[0];
  const [servicoArray, setServicos] = useState<Servico[]>([]);
  const [funcionarioArray, setFuncionarios] = useState<Funcionario[]>([]);
  const [horariosArray, setHorariosArray] = useState<string[]>([]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, callback: (value:string) => void) => {
    callback(e.target.value);
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.setDetalhes(e.target.value);
  }

  const handleDateChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;

    if(selectedValue >= currentDate)
      props.setDate(selectedValue);
  }

  useEffect(() => {
    api.post('/funcionario/listar', {category: props.servicoId})
      .then(response => {
        const {funcionarios} = response.data.data;
        setFuncionarios(funcionarios);
        props.setFuncionarioId(funcionarios[0].id);
      }).catch(error => {
        console.error(error);
      })
  }, [props.servicoId])

  useEffect(() => {
    api.post("/agendamento/listar-horarios", {date: props.date, funcionarioId: props.funcionarioId})
      .then(response => {
        const {data} = response.data
        setHorariosArray(data);
      })
      .catch(error => {
        console.error(error);
      })
  }, [props.date, props.funcionarioId])

  useEffect(() => {
    props.setDate(currentDate);
    api.get('/servico')
      .then(response => {
        const {servicos} = response.data.data;
        setServicos(servicos);
      })
      .catch(error => {
        console.log(error)
      });
  }, [])

  return (
    <div className="form-agendamento">
          <p>{props.error}</p>
          <div className="agendamento-input-container">
            <label htmlFor="servico">Selecione um serviço</label>
            <select name="servico" onChange={e => handleSelectChange(e, props.setServicoId)}>
              {servicoArray.map(servico => (
                <option value={servico.id} key={servico.id}>{servico.nome}</option>
              ))}
            </select>
          </div>
         
          <div className="agendamento-input-container">
            <label htmlFor="funcionario">Profissional Disponível</label>
            <select name="funcionario" onChange={e=> handleSelectChange(e, props.setFuncionarioId)}>
              {funcionarioArray.map(funcionario => (<option value={funcionario.id} key={funcionario.id}>{funcionario.nome}</option>))}
            </select>
          </div>
          
          <div className="date-hours-container">
            <div className="agendamento-input-container">
              <label htmlFor="data">Data</label>
              <input type="date" name="date" value={props.date} onChange={handleDateChange}/>
            </div>
            
            <div className="agendamento-input-container">
              <label htmlFor="hora">Hora</label>
              <select name="hora" onChange={e => handleSelectChange(e, props.setHorario)}>
                {horariosArray.map((horario, index) => (<option value={horario} key={index}>{horario}</option>))}
              </select>
            </div>
          </div>
          
          <div className="agendamento-input-container">
            <label htmlFor="detalhes">Descreva algum detalhe</label>
            <textarea name="detalhes" id="" cols={30} rows={5} value={props.detalhes} onChange={handleTextChange}></textarea>
          </div>


          <button onClick={props.buttonFunction}>Continuar</button>
          
        </div>
  )
}