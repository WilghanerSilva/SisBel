interface iCadastrarClienteService {
  cadastrar(email: string, name: string, phone: string, password: string): Promise<{profile: string, token: string} | null>
}

export default iCadastrarClienteService;