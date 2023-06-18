import { useContext, useEffect, useState } from "react";
import { Agendamento } from "../../types/AgendamentoType";
import { CardAgendamento } from "../card-agendamento";
import "./style.css";
import {MdAddAlarm} from "react-icons/md";
import api from "../../services/api";
import AuthContext from "../../contexts/auth";
import { CardFuncionario } from "../card-funcionario";
import { Funcionario } from "../../types/FuncionarioType";

export default function ClienteHome () {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const context=  useContext(AuthContext);

  useEffect(() => {
    api.post("/agendamento/listar-agendamentos",{
      id:context.user?.id
    })
      .then(response => {
        const {data} = response.data;
        setAgendamentos(data);
      })
      .catch(error => {
        console.error(error);
      })

    api.post("/funcionario/listar")
      .then(response => {
        const {funcionarios} = response.data.data;
        setFuncionarios(funcionarios)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])


  return (
    <div className="clientehome-container">
      <div className="lista">
        <div className="header-lista">
          <h1>Seus próximos agendamentos</h1>
          <p>Visualizar agenda completa</p>
        </div>
        <div id="lista-agendamentos">
          {agendamentos.map(agendamento => (<CardAgendamento agendamento={agendamento}/>))}
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
        {funcionarios.map((funcionario, index) => {
          if(index <= 5)
            return <CardFuncionario funcionario={funcionario}/>
          else
            return <></>
        })}
       </div>
      </div>
      
    </div>
  )
}