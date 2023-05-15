import "./style.css";

function CadastroCliente () {
  return (
    <div className="container">
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

            <input type="text" name="name" placeholder="Digite seu nome completo"/>
            <input type="email" name="email" placeholder="username@gmail.com"/>
            <input type="tel" name="phone-number" placeholder="Telefone"/>
            <input type="password" name="password" placeholder="Senha"/>
            <input type="password" name="confirm-password" placeholder="Confirmar senha"/>
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