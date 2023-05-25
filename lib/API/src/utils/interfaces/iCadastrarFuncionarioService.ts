interface iCadastrarFuncionarioService {
  cadastrar(adminId: string, funcData: FuncData): Promise<string>;
}

export type FuncData = {
  name: string,
  email: string,
  password: string,
  phone: string,
  birthDate: string,
  cpf: string,
  adress: string,
  city: string
}

export default iCadastrarFuncionarioService;