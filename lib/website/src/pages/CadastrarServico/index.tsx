import { useState } from "react";
import NavBar from "../../components/navbar";
import SideMenu from "../../components/side-menu";
import "./style.css"
import api from "../../services/api";
import { GiConfirmed } from "react-icons/gi";

export function CadastrarServico () {
  const [name, setName] = useState("");
  const [audience, setAudience] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [isFinished, setIsFinished] = useState(false);


  const handleChangeTextInput = (e: React.ChangeEvent<HTMLInputElement>, callback: (value: string) => void) => {
    callback(e.target.value);
  }

  const handleChangeSelectInput = (e: React.ChangeEvent<HTMLSelectElement>, callback: (value: string) => void) => {
    callback(e.target.value);
  }

  const handleChangeRadioInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAudience(e.target.value)
  }

  const handleSubmitForm = () => {
    api.post("/servico/cadastrar", {
      audience,
      name,
      category
    })
      .then(response => {
        setIsFinished(true)
        setError("");
      })
      .catch(error => {
        setError("Verifique se preencheu todos os campos corretamentes ou se o serviço já não foi adicionado")
      })
  }

  return (
    <div className="cadastrar-servico-container">
      <div id="navbar-wrapper">
        <NavBar/>
      </div>
      <div id="sidemenu-wrapper">
        <SideMenu/>
      </div>
      <div id="content-wrapper-cadastrar-servico">
        <h1>Adicionar novo serviço</h1>
        <p>{error}</p>
        {
          isFinished 
            ? 
          <>
            <div className="result-message">
              <GiConfirmed id="result-icon"/>
              <p>Serviço</p>
              <p>cadastrado com sucesso</p>
            </div>
          </> 
            : 
          <>
            <form className="servico-form">
                <div className="input-container-servico">
                <label htmlFor="nome">Nome do serviço</label>
                <input type="text" name="nome" placeholder="Degradê" value={name} onChange={e => handleChangeTextInput(e, setName)}/>
              </div>

              <div className="input-container-servico">
                <label htmlFor="publico">Público</label>
                
                <div className="radio-container">
                  <div className="radio">
                    <input type="radio" name="publico" value="masculino" onChange={handleChangeRadioInput}/>
                    <label htmlFor="publico">Masculino</label>
                  </div>
                  <div className="radio">
                    <input type="radio" name="publico" value="feminino" onChange={handleChangeRadioInput}/>
                    <label htmlFor="publico">Feminino</label>
                  </div>
                  <div className="radio">
                    <input type="radio" name="publico" value="infantil" onChange={handleChangeRadioInput}/>
                    <label htmlFor="publico">Infantil</label>
                  </div>
                </div>
              </div>

              <div className="input-container-servico">
                <label htmlFor="categoria">Categoria</label>
                <select name="categoria" onChange={e => handleChangeSelectInput(e, setCategory)}>
                  <option value="cabelo">Cabelo</option>
                  <option value="barba">Barba</option>
                  <option value="manicure">Manicure</option>
                  <option value="pedicure">Pedicure</option>
                  <option value="spa">SPA</option>
                </select>
              </div>
            </form>
            <button className="finish-button" onClick={handleSubmitForm}>Cadastrar novo serviço</button>
          </>
        }
      </div>
    </div>
  )
}