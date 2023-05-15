interface iCadastrarClienteService {
  cadastrar(email: string, name: string, password: string): Promise<boolean>
}

export default iCadastrarClienteService;