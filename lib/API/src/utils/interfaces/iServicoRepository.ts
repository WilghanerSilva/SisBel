import { Servicos } from "@prisma/client";

interface iServicoRepository {
  create(data: {nome: string, publico: string, categoria:string}): Promise<Servicos | undefined>
  getByName(name: string): Promise<Servicos | null>
  listByAudience(audience: string): Promise<Servicos[]>
  listByCategory(category: string): Promise<Servicos[]>
  listAll(): Promise<Servicos[]>

}

export default iServicoRepository;