import {AiOutlinePlus, AiOutlineHeart} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./style.css";

export function ClienteOptions() {
  const nav = useNavigate();
  
  const navigateHandle = (url: string) => {
    nav(url);
  }

  return (
    <div className="cliente-options">
        <div className="options-1">
          <div className="options-item" onClick={() => {navigateHandle("/agendamento/cadastro")}}>
            <div className="item-icon" id="NovoAgendamento">
              <AiOutlinePlus className="icon"/>
            </div>
            <p>Novo Agendamento</p>
          </div>
          <div className="options-item">
            <div className="item-icon" id="Favoritos">
              <AiOutlineHeart className="icon"/>
            </div>
            <p>Favoritos</p>
          </div>
        </div>
        <div className="options-2">
          <ul className="servicos-menu">
            <li className="servico-item">Corte</li>
            <li className="servico-item">Escova</li>
            <li className="servico-item">Coloração</li>
            <li className="servico-item">Hidratação</li>
            <li className="servico-item">Progressiva</li>
            <li className="servico-item">Luzes</li>
            <li className="servico-item">Mais Categorias</li>
          </ul>
        </div>
      </div>
  )
}