import { User } from "../types/user-types";

interface iObterDadosClienteService{
  obter(id: string): Promise<User | undefined>
}

export default iObterDadosClienteService;