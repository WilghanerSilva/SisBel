import { Servicos } from "@prisma/client";
import { iServicoRepository } from "../utils/interfaces";
import prisma from "../../client";

class ServicoRepository implements iServicoRepository {
	async create(data: { nome: string; publico: string; categoria: string; }): Promise<Servicos | undefined> {
		const servico = await prisma.servicos.create({
			data: {
				nome: data.nome.toLowerCase(),
				publico: data.publico,
				categoria: data.categoria,
			}
		});

		return servico;
	}

	async getByName(name: string): Promise<Servicos | null> {
		const servico = prisma.servicos.findUnique({
			where: {nome:name.toLocaleLowerCase()}
		});
    
		return servico;
	}

	async listAll(): Promise<Servicos[]> {
		return await prisma.servicos.findMany();
	}

	async listByAudience(audience: string): Promise<Servicos[]> {
		return await prisma.servicos.findMany({
			where: {publico: audience}
		});
	}

	async listByCategory(category: string): Promise<Servicos[]> {
		return await prisma.servicos.findMany({
			where: {categoria: category}
		});
	}
}


export default ServicoRepository;