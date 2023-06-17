interface iDeletarFuncionarioService {
  deletar(funcId: string, adminId: string): Promise<string>
}

export default iDeletarFuncionarioService;