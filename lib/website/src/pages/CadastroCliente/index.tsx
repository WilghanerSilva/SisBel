import "./style.css";
import {FaRegUserCircle} from "react-icons/fa";
import {AiOutlineMail, AiOutlineLock} from "react-icons/ai";
import {MdOutlinePhoneInTalk} from "react-icons/md";
import { useContext, useState } from "react";
import api from "../../services/api";
import AuthContext from "../../contexts/auth";
import InputMask from "react-input-mask";


function CadastroCliente () {
  const [erros, setErrors] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const context = useContext(AuthContext);

  const changeInputHandle = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.target.value);
  }

  const validateEmail = (email: string) => {
    const emailRegex = /[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?/i;
    
    const result = emailRegex.test(email);

    return result;
  };


  const formVerify = () => {
    let localErrors : string[] = []
    let isMissingField = false;
    let differentPasswords = false;
    let passwordIsShort = false;
    let emailIsInvalid = false;
    let phoneNumberIsShort = false;

    if(!email)
      isMissingField = true;

    if(!name)
      isMissingField = true;
    
    if(!phone)
      isMissingField = true;
    
    if(!password)
      isMissingField = true;
    
    if(!confirmPassword)
      isMissingField = true;

    if(confirmPassword !== password)
      differentPasswords = true;

    if(password.length > 0 && password.length < 8)
      passwordIsShort = true;
    
    console.log(phone.length)
    if(phone.length > 0 && (phone.length - 4) < 11){
      phoneNumberIsShort = true;
    }
    
    emailIsInvalid = !validateEmail(email) && email ? true : false;

    if(isMissingField)
      localErrors.push("Todos os campos são obrigatórios");
    
    if(differentPasswords)
      localErrors.push("As senhas devem ser iguais");

    if(passwordIsShort)
      localErrors.push("A senha digitada é muito pequena, o tamanho minímo é 12");
    
    if(phoneNumberIsShort)
      localErrors.push("O telefone digitado é invalido");

    if(emailIsInvalid)
      localErrors.push("O email digitado é invalido")
    
    console.log(localErrors.length <= 0);
    setErrors(localErrors);

    return localErrors.length <= 0;
  }

  const submitForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    if(formVerify()){
      api.post('/cliente/cadastrar', {
        name: name,
        email: email,
        phone: phone,
        password: password,
      }, {
        headers: {
          'Content-Type' : 'application/json',
          Accept: '',
        }
      }).then(response => {
        context.setToken(response.data.data.token);
        context.setSigned(true);
      }).catch((err) => { 
        console.log(err.response)

        if(err.response.status === 401)
          setErrors([err.response.data.message]);
      });
    }
    
  }

  return (
    <div className="cadastro-container">
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
            <ul className="errors-list">
              {
                erros.map((error, index) => {
                  return (
                    <li className="error" key={index}>{error}</li>
                  )
                })
              }
            </ul>
            <div className="input-container">
              <FaRegUserCircle className="input-icon"/>
              <input 
                type="text" 
                name="name" 
                placeholder="Digite seu nome completo"
                value={name}
                onChange={e => changeInputHandle(e, setName)}
              />
            </div>
            <div className="input-container">
              <AiOutlineMail className="input-icon"/>
              <input 
                type="email" 
                name="email" 
                placeholder="username@gmail.com"
                value={email}
                onChange={e => {changeInputHandle(e, setEmail)}}
              />
            </div>
            <div className="input-container">
              <MdOutlinePhoneInTalk className="input-icon"/>
              <InputMask
                mask={"(99) 99999-9999"}
                maskChar={''}
                placeholder="Telefone"
                value={phone}
                onChange={e => {changeInputHandle(e, setPhone)}}
              />
            </div>
            <div className="input-container">
              <AiOutlineLock className="input-icon"/>
              <input 
                type="password" 
                name="password" 
                placeholder="Senha"
                value = {password}
                onChange={e => {changeInputHandle(e, setPassword)}}
              />
            </div>
            <div className="input-container">
              <AiOutlineLock className="input-icon"/>
              <input 
                type="password" 
                name="confirm-password" 
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChange={e => {changeInputHandle(e, setConfirmPassword)}}
              />
            </div>
          </form>
          <div className="buttons-container">
            <button id="cadastre-se" onClick={submitForm}>Cadastre-se</button>
            <p>ou então</p>
            <button id="entrar">Entrar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CadastroCliente;