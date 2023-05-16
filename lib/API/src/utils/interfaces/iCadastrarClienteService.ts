import { User } from "../types/user-types";

interface iCadastrarClienteService {
  cadastrar(email: string, name: string, phone: string, password: string): Promise<string | undefined>
}

export default iCadastrarClienteService;