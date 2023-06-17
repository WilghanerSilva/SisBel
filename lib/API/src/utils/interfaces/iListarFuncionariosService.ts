import { Funcionario } from "@prisma/client";

interface iListarFuncionariosService {
  listar(serviceId: string): Promise<Omit<Funcionario, "senha">[]>
}


export default iListarFuncionariosService;