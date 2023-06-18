import { Admin } from "@prisma/client";

interface iObterDadosAdminService {
  obter(id: string): Promise<{message: string, admin?: Omit<Admin, "senha">}>
}

export default iObterDadosAdminService;