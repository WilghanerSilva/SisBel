import "./style.css";

import {FaUserAlt} from "react-icons/fa";
import {ImScissors} from "react-icons/im";

export function AdminOptions() {
  return (
    <div className="admin-options">
      <ul className="options">
        <li className="options-container">
          <div className="option-icon">
            <ImScissors className="admin-option-icon"/>
          </div>
          <p>Novo Serviço</p>
        </li>
        <li className="options-container">
          <div className="option-icon">
              <FaUserAlt className="admin-option-icon"/>
          </div>
          <p>Novo Profissional</p>
        </li>
      </ul>
    </div>
  )
}