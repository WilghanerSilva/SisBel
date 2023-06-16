import { User } from "../types/user-types";

interface iEditarClienteService {
  editar(
    userId: string,
		data: {
      name?: string,
      password?: string,
      newPassword?: string,
      phone?: string
    }
  ): Promise<{user?: User, message:string}>
}

export default iEditarClienteService;