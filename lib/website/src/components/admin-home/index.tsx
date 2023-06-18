import { useEffect, useState } from "react";
import { AgendamentoTable } from "../agendamento-table";
import api from "../../services/api";
import { Funcionario } from "../../types/FuncionarioType";
import "./style.css"

export function AdminHome () {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [funcionarioId, setFuncionarioId] = useState("");

  useEffect(()=>{
    api.post("/funcionario/listar")
      .then(response => {
        const {data} = response.data;
        setFuncionarios(data.funcionarios);
        setFuncionarioId(data.funcionarios[0].id);
      })
  },[])

  return (
    <div className="admin-home-container">
      <h1>Agenda</h1>
      <div className="admin-table-handle">
        <select name="funcionario">
          {funcionarios.map(funcionario => (
            <option key={funcionario.id} value={funcionario.id}>{funcionario.nome}</option>
          ))}
        </select>
        <div className="controls-container">
          <div className="month-control">
            <button>{"<"}</button>
            <p>Abril</p>
            <button>{">"}</button>
          </div>

          <div className="day-control">
            <button>{"<"}</button>
            <p>18</p>
            <button>{">"}</button>
          </div>
        </div>

      </div>
      <AgendamentoTable userId={funcionarioId} mes={5}/>
    </div>
  )
}