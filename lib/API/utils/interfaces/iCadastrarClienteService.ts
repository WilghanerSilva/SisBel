interface iCadastrarClienteService {
  cadastrar(email: string, name: string, phoneNumber: string, password: string): Promise<boolean>
}

export default iCadastrarClienteService;