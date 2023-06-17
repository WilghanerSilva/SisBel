import { Servicos } from "@prisma/client";

interface iListarServicosService {
  listar(field: string, value: string): Promise<Servicos[]>;
}

export default iListarServicosService;