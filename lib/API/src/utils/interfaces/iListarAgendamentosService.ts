import { Agendamentos } from "@prisma/client";

interface iListarAgendamentosService {
  listar(userId: string): Promise<Agendamentos[]>
}

export default iListarAgendamentosService;