import "./style.css";

import {FaUserAlt} from "react-icons/fa";
import {ImScissors} from "react-icons/im";
import { useNavigate } from "react-router-dom";

export function AdminOptions() {
  const nav = useNavigate();

  return (
    <div className="admin-options">
      <ul className="options">
        <li className="options-container" onClick={e => nav("/cadastrar-servico")}>
          <div className="option-icon">
            <ImScissors className="admin-option-icon"/>
          </div>
          <p>Novo Serviço</p>
        </li>
        <li className="options-container" onClick={e => nav("/cadastrar-funcionario")}>
          <div className="option-icon">
              <FaUserAlt className="admin-option-icon"/>
          </div>
          <p>Novo Profissional</p>
        </li>
      </ul>
    </div>
  )
}