import { Funcionario } from "@prisma/client";
import { CreateClienteData, UserWithPassword, User, CreateFuncionarioData} from "../types/user-types";

interface iUserRepository {
  getUserByEmail(email: string, includePassword: boolean): Promise<User | UserWithPassword |undefined>

  createCliente(data: CreateClienteData ): Promise<User | undefined>

  createFuncionario(data: CreateFuncionarioData ): Promise<User | undefined> 

  getUserById(id: string): Promise<User | undefined>;

  deleteCliente(id: string): Promise<boolean>;

  deleteFuncionario(id: string): Promise<boolean>;

  updateCliente(id: string, data: {
    nome: string,
    senha: string,
    telefone: string
  }): Promise<User | undefined>;

  listFuncionarios(): Promise<Funcionario[]>
  
  listFuncionarioByService(serviceId: string): Promise<Funcionario[]>
}

export default iUserRepository;