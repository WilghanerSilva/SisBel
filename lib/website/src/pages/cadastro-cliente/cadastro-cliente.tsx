import "./style.css";
import {FaRegUserCircle} from "react-icons/fa";
import {AiOutlineMail, AiOutlineLock} from "react-icons/ai";
import {MdOutlinePhoneInTalk} from "react-icons/md";


function CadastroCliente () {
  return (
    <div className="login-container">
      <div className="content-container">
        <div className="content-banner">
          <h1>Beleza</h1>
          <h2>Você é novo aqui?</h2>
          <p>
            Cadastre-se e marque um horário com qualquer um dos nossos profissionais.
          </p>
        </div>
        <div className="form-container">
          <form>
            <h1>Cadastre-se</h1>

            <div className="input-container">
              <FaRegUserCircle className="input-icon"/>
              <input type="text" name="name" placeholder="Digite seu nome completo"/>
            </div>
            <div className="input-container">
              <AiOutlineMail className="input-icon"/>
              <input type="email" name="email" placeholder="username@gmail.com"/>
            </div>
            <div className="input-container">
              <MdOutlinePhoneInTalk className="input-icon"/>
              <input type="tel" name="phone-number" placeholder="Telefone"/>
            </div>
            <div className="input-container">
              <AiOutlineLock className="input-icon"/>
              <input type="password" name="password" placeholder="Senha"/>
            </div>
            <div className="input-container">
              <AiOutlineLock className="input-icon"/>
              <input type="password" name="confirm-password" placeholder="Confirmar senha"/>
            </div>
          </form>
          <div className="buttons-container">
            <button id="cadastre-se">Cadastre-se</button>
            <p>ou então</p>
            <button id="entrar">Entrar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CadastroCliente;