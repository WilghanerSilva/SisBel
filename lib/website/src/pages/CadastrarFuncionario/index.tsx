import { useState } from "react";
import NavBar from "../../components/navbar";
import SideMenu from "../../components/side-menu";
import "./style.css";
import api from "../../services/api";
import { GiConfirmed } from "react-icons/gi";

export function CadastrarFuncionario() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [cpf, setCPF] = useState("");
  const [adress, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState("");

  const changeInputValueHandle = (e: React.ChangeEvent<HTMLInputElement>, callback: (value:string) => void) => {
    callback(e.target.value);
  }

  const submitForm = () => {
    api.post("/funcionario/cadastrar", {
      name,
      email,
      password,
      phone,
      birthDate,
      cpf,
      adress,
      city
    })
      .then(response => {
        setIsFinished(true);
        setError("");
      })
      .catch(error => {
        if(error.response.status === 401)
        setError("Verifique se preencheu todos os campos corretamente ou se o funcionário já existe")
      })
  }

  return (
    <div className="cadastrar-funcionario-container">
      <div id="navbar-wrapper">
        <NavBar/>
      </div>
      <div id="sidemenu-wrapper">
        <SideMenu/>
      </div>
      <div id="content-wrapper-cadastrar-funcionario">{
        isFinished 
        ?
        <>
          <div className="result-message">
            <GiConfirmed id="result-icon"/>
            <p>Funcionário</p>
            <p>cadastrado com sucesso</p>
          </div>
        </>
        :
        <>
          <h1>Cadastrar Profissional</h1>
        <p>{error}</p>
        <form>
          <div className="row">
            <div className="input-container-funcionario">
              <label htmlFor="name">Nome completo</label>
              <input 
                type="text" 
                name="nome" 
                placeholder="Geovane Matia Oliveira" 
                value={name}
                onChange={e => changeInputValueHandle(e, setName)}
              />
            </div>

            <div className="input-container-funcionario">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email" 
                placeholder="geovane@salãodebeleza.com.br"
                value={email}
                onChange={e => changeInputValueHandle(e, setEmail)}
              />
            </div>
          </div>

          <div className="row">
            <div className="input-container-funcionario">
              <label htmlFor="cpf">CPF</label>
              <input 
                type="text" 
                name="cpf" 
                placeholder="888.888.888-88"
                value={cpf}
                onChange={e => changeInputValueHandle(e, setCPF)}
              />
            </div>

            <div className="input-container-funcionario">
              <label htmlFor="nascimento">Nascimento</label>
              <input 
                type="date" 
                name="nascimento"
                value={birthDate}
                onChange={e => changeInputValueHandle(e,setBirthDate)}
              />
            </div>

            <div className="input-container-funcionario">
              <label htmlFor="telefone">Telefone</label>
              <input 
                type="text" 
                name="telefone" 
                placeholder="(88) 88888-8888"
                value={phone}
                onChange={e => changeInputValueHandle(e, setPhone)}
              />
            </div>
          </div>
          
          <div className="row">
            <div className="input-container-funcionario">
              <label htmlFor="endereco">Rua e Bairro</label>
              <input 
                type="text" 
                name="endereco" 
                placeholder="Zeca Teles Menezes, Cruzeiro"
                value={adress}
                onChange={e => changeInputValueHandle(e, setAdress)}
              />
            </div>

            <div className="input-container-funcionario">
              <label htmlFor="cidade">Cidade</label>
              <input 
                type="text" 
                name="cidade" 
                placeholder="Tianguá"
                value={city}
                onChange={e => changeInputValueHandle(e,setCity)}
              />
            </div>
          </div>
          <div className="row">
            <div className="input-container-funcionario">
              <label htmlFor="senha">Senha</label>
              <input 
                type="password" 
                name="senha" 
                placeholder="*************"
                value={password}
                onChange={e => changeInputValueHandle(e, setPassword)}
              />
            </div>
          </div>
        </form>
        <button className="finish-button" onClick={submitForm}>Cadastrar novo profissional</button>
        </>
      }
        
      </div>
    </div>
  )
}