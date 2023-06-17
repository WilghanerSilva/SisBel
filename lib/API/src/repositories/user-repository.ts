import prisma from "./../../client";
import { iUserRepository } from "../utils/interfaces";
import { CreateClienteData, CreateFuncionarioData, User, UserWithPassword } from "../utils/types/user-types";

class UserRepository implements iUserRepository {
	async createCliente(data: CreateClienteData): Promise<User | undefined> {
		const user = await prisma.cliente.create({
			data
		});


		if(!user)
			return undefined;

		return {
			name: user.nome,
			email: user.email,
			profile: user.perfil,
			id: user.id
		};
	}

	async getUserByEmail(email: string, includePassword: boolean): Promise<User | UserWithPassword | undefined> {
		const [cliente, funcionario, admin] = await Promise.all([
			prisma.cliente.findUnique({where: {email: email}}),
			prisma.funcionario.findUnique({where: {email: email}}),
			prisma.admin.findUnique({where: {email: email}})
		]);

		if(includePassword){
			if(funcionario)
				return {
					id: funcionario.id,
					name: funcionario.nome,
					email: funcionario.email,
					profile: funcionario.perfil,
					password: funcionario.senha
				};
      
			if(cliente)
				return {
					id: cliente.id,
					name: cliente.id,
					email: cliente.email,
					profile: cliente.perfil,
					password: cliente.senha
				};

			if(admin)
				return {
					id: admin.id,
					name: admin.id,
					email: admin.email,
					profile: admin.perfil,
					password: admin.senha
				};

			return undefined;
		
		} else {
			if(funcionario)
				return {
					id: funcionario.id,
					name: funcionario.nome,
					email: funcionario.email,
					profile: funcionario.perfil,
				};
      
			if(cliente)
				return {
					id: cliente.id,
					name: cliente.id,
					email: cliente.email,
					profile: cliente.perfil,
				};

			if(admin)
				return {
					id: admin.id,
					name: admin.nome,
					email: admin.email,
					profile: admin.perfil,
				};

			return undefined;
		}
	}

	async createFuncionario(data: CreateFuncionarioData): Promise<User | undefined> {
		const funcionario = await prisma.funcionario.create({data});

		return {
			name: funcionario.nome,
			email: funcionario.email,
			id: funcionario.id,
			profile: funcionario.perfil
		};
	}

	async getUserById(id: string): Promise<User | undefined> {
		const [cliente, funcionario, admin] = await Promise.all([
			prisma.cliente.findUnique({where: {id: id}}),
			prisma.funcionario.findUnique({where: {id: id}}),
			prisma.admin.findUnique({where: {id: id}}),
		]);

		if(cliente)
			return {
				name: cliente.nome,
				email: cliente.email,
				id: cliente.id,
				profile: cliente.perfil
			};

		if(admin)
			return {
				name: admin.nome,
				email: admin.email,
				id: admin.id,
				profile: admin.perfil
			};

		if(funcionario)
			return {
				name: funcionario.nome,
				email: funcionario.email,
				id: funcionario.id,
				profile: funcionario.perfil
			};

		return undefined;
	}

	async deleteCliente(id: string): Promise<boolean> {
		const result = await prisma.cliente.delete({
			where: {id}
		});

		return !!result;
	}

	async updateCliente(id: string, data: { nome: string; senha: string; telefone: string; }): Promise<User | undefined> {
		const user = await prisma.cliente.update({
			where: {id},
			data
		});

		return {
			name: user.nome,
			email: user.email,
			id: user.id,
			profile: user.perfil,
			phone: user.telefone
		};
	}

	async deleteFuncionario(id: string): Promise<boolean> {
		await prisma.agendamentos.deleteMany({where: {funcionarioId: id}});
		const result = await prisma.funcionario.delete({where: {id}});

		return !!result;
	}
}


export default UserRepository;