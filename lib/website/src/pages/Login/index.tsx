import { AiOutlineLock, AiOutlineMail, AiOutlineUnlock } from "react-icons/ai";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import api from "../../services/api";
import AuthContext from "../../contexts/auth";

function Login () {
  const context = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<string[]>([])
  const [password, setPassword] = useState("");
  const [typePasswordInput, setTypePasswordInput] = useState("password");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?/i;
    
    const result = emailRegex.test(email);

    return result;
  };

  const formVerify = () => {
    let localErrors : string[] = []
    let isMissingField = false;
    let invalidEmail = false;
    let shortPassword = false;

    if(!email)
      isMissingField = true;
    
    if(!password)
      isMissingField = true;

    invalidEmail = !validateEmail(email);
    
    shortPassword = password.length < 8;

    if(isMissingField)
      localErrors.push("Todos os campos precisam ser preenchidos");
    if(shortPassword)
      localErrors.push("A senha fornecida é muito curta");
    if(invalidEmail)
      localErrors.push("O email fornecido é inválido");

    setErrors(localErrors);
    return !(localErrors.length > 0)
  }

  const submitForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    if(formVerify()){
      api.post('/auth/login', {
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type' : 'application/json',
          Accept: '',
        }
      }).then(response => {
        localStorage.setItem("@Sisbel:token", response.data.data.token);
        context.setToken(response.data.data.token);
        context.setSigned(true);
      }).catch(err => {
        console.log(err)
      })
    }
  }

  const changeInputHandle = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.target.value);
  }

  const changePasswordType = () => {
    if(typePasswordInput === "password")
      setTypePasswordInput("text");
    else
      setTypePasswordInput("password");
  }

  const handleNavigate = () => {
    navigate("/cadastro");
  }

  return (
    <div className="login-container">
      <div className="content-container-login">
        <div className="content-banner">
          <h1>Beleza</h1>
          <h2>Seja bem-vindo de volta!</h2>
          <p>Faça login e agende agora mesmo seu próximo corte de cabelo</p>
        </div>
        <div className="form-container">
          <h1>Login</h1>
          <ul className="errors-list-login">
              {
                errors.map((error, index) => {
                  return (
                    <li className="error" key={index}>{error}</li>
                  )
                })
              }
            </ul>
          <form>
            <div className="input-container-login">
              <AiOutlineMail className="input-icon-login"/>
              <input 
                type="text" 
                name="email"
                placeholder="username@gmail.com"
                value={email}
                onChange={e => changeInputHandle(e, setEmail)}
              />
            </div>
            <div className="input-container-login">
              {
                typePasswordInput === "password" ? 
                  <AiOutlineLock className="input-icon-login" onClick={changePasswordType}/> 
                  : 
                  <AiOutlineUnlock className="input-icon-login"  onClick={changePasswordType}/>
              }
              <input 
                type={typePasswordInput} 
                name="password"
                placeholder="*********"
                value={password}
                onChange={e => changeInputHandle(e, setPassword)}
              />
            </div>
            <div id="forgot-password">
              <p >Esqueceu sua senha?</p>
            </div>
          </form>

          <div className="buttons-container">
            <button id="entrar-login" onClick={submitForm}>Entrar</button>
            <p>ou então</p>
            
            <button id="cadastre-se-login" onClick={handleNavigate}>Cadastre-se</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;