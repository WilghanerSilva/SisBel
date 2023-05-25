export type User = {
  id: string,
  name: string,
  email: string,
  profile: string
}

export type UserWithPassword = {
  id: string,
  name: string,
  email: string,
  profile: string,
  password: string
}


export type CreateClienteData = {
  email: string,
  nome: string,
  telefone: string,
  senha: string,
  perfil: string
}

export type CreateFuncionarioData = {
  nome: string,
  email: string,
  senha: string,
  telefone: string,
  dataNascimento: string,
  cpf: string,
  endereco: string,
  cidade: string
}