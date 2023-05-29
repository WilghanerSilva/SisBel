interface iCadastrarServicoService {
  cadastrar(adminId: string, nome: string, publico: string, categoria: string): Promise<boolean>
}

export default iCadastrarServicoService;