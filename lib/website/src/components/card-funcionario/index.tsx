import { Funcionario } from "../../types/FuncionarioType"
import {FaUser} from "react-icons/fa";
import "./style.css"

interface Props{
  funcionario: Funcionario
}

export function CardFuncionario (props: Props) {
  return (
    <div className="funcionario-card">
      <div className="funcionario-icon">
        <FaUser className="func-icon"/>
      </div>
      <p className="funcionario-name">{props.funcionario.nome}</p>
      <p className="funcionario-servicos">Manicure, pedicure</p>
    </div>
  )
}