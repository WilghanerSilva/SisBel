import { Servicos } from "@prisma/client";

interface iServicoRepository {
  create(data: {nome: string, publico: string, categoria:string}): Promise<Servicos | undefined>
  getByName(name: string): Promise<Servicos | null>
}

export default iServicoRepository;