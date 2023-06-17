import { iUserRepository } from "../utils/interfaces";
import ListarFuncionariosSVC from "../services/listar-funcionarios-service";
import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { User, UserWithPassword } from "../utils/types/user-types";
import { Funcionario } from "@prisma/client";

describe("Listar Funcionarios Service", () => {
	const makeUserRepositorySpy = () => {
		class UserRepositorySpy implements iUserRepository {
			
			public listAllResult: Funcionario[] = [
				{
					cidade: "any_city",
					cpf: "888.888.888-86",
					dataNascimento: "2000-08-05",
					email: "any_email@mail.com",
					endereco: "Bairro tanto faz, rua tanto fez",
					id: "any_id",
					nome: "any_name",
					perfil: "funcionario",
					telefone: "(88) 88888888",
					senha: "any_password"
				},
				{
					cidade: "any_city",
					cpf: "888.888.888-86",
					dataNascimento: "2000-08-05",
					email: "any_email@mail.com",
					endereco: "Bairro tanto faz, rua tanto fez",
					id: "any_id",
					nome: "any_name",
					perfil: "funcionario",
					telefone: "(88) 88888888",
					senha: "any_password"
				},
				{
					cidade: "any_city",
					cpf: "888.888.888-86",
					dataNascimento: "2000-08-05",
					email: "any_email@mail.com",
					endereco: "Bairro tanto faz, rua tanto fez",
					id: "any_id",
					nome: "any_name",
					perfil: "funcionario",
					telefone: "(88) 88888888",
					senha: "any_password"
				},
				{
					cidade: "any_city",
					cpf: "888.888.888-86",
					dataNascimento: "2000-08-05",
					email: "any_email@mail.com",
					endereco: "Bairro tanto faz, rua tanto fez",
					id: "any_id",
					nome: "any_name",
					perfil: "funcionario",
					telefone: "(88) 88888888",
					senha: "any_password"
				},
				{
					cidade: "any_city",
					cpf: "888.888.888-86",
					dataNascimento: "2000-08-05",
					email: "any_email@mail.com",
					endereco: "Bairro tanto faz, rua tanto fez",
					id: "any_id",
					nome: "any_name",
					perfil: "funcionario",
					telefone: "(88) 88888888",
					senha: "any_password"
				}
			];

			public listFuncByServiceResult: Funcionario[] = [
				{
					cidade: "any_city",
					cpf: "888.888.888-86",
					dataNascimento: "2000-08-05",
					email: "any_email@mail.com",
					endereco: "Bairro tanto faz, rua tanto fez",
					id: "any_id",
					nome: "any_name",
					perfil: "funcionario",
					telefone: "(88) 88888888",
					senha: "any_password"
				},
				{
					cidade: "any_city",
					cpf: "888.888.888-86",
					dataNascimento: "2000-08-05",
					email: "any_email@mail.com",
					endereco: "Bairro tanto faz, rua tanto fez",
					id: "any_id",
					nome: "any_name",
					perfil: "funcionario",
					telefone: "(88) 88888888",
					senha: "any_password"
				},
				{
					cidade: "any_city",
					cpf: "888.888.888-86",
					dataNascimento: "2000-08-05",
					email: "any_email@mail.com",
					endereco: "Bairro tanto faz, rua tanto fez",
					id: "any_id",
					nome: "any_name",
					perfil: "funcionario",
					telefone: "(88) 88888888",
					senha: "any_password"
				},
				{
					cidade: "any_city",
					cpf: "888.888.888-86",
					dataNascimento: "2000-08-05",
					email: "any_email@mail.com",
					endereco: "Bairro tanto faz, rua tanto fez",
					id: "any_id",
					nome: "any_name",
					perfil: "funcionario",
					telefone: "(88) 88888888",
					senha: "any_password"
				},
				{
					cidade: "any_city",
					cpf: "888.888.888-86",
					dataNascimento: "2000-08-05",
					email: "any_email@mail.com",
					endereco: "Bairro tanto faz, rua tanto fez",
					id: "any_id",
					nome: "any_name",
					perfil: "funcionario",
					telefone: "(88) 88888888",
					senha: "any_password"
				},
				{
					cidade: "any_city",
					cpf: "888.888.888-86",
					dataNascimento: "2000-08-05",
					email: "any_email@mail.com",
					endereco: "Bairro tanto faz, rua tanto fez",
					id: "any_id",
					nome: "any_name",
					perfil: "funcionario",
					telefone: "(88) 88888888",
					senha: "any_password"
				},
				{
					cidade: "any_city",
					cpf: "888.888.888-86",
					dataNascimento: "2000-08-05",
					email: "any_email@mail.com",
					endereco: "Bairro tanto faz, rua tanto fez",
					id: "any_id",
					nome: "any_name",
					perfil: "funcionario",
					telefone: "(88) 88888888",
					senha: "any_password"
				},
			];

			async createCliente(): Promise<User | undefined> {
				return undefined;
			}

			async createFuncionario(): Promise<User | undefined> {
				return undefined;
			}

			async deleteCliente(): Promise<boolean> {
				return true;
			}

			async deleteFuncionario(): Promise<boolean> {
				return true;
			}

			async getUserByEmail(): Promise<User | UserWithPassword | undefined> {
				return undefined;
			}

			async getUserById(): Promise<User | undefined> {
				return undefined;
			}

			async updateCliente(): Promise<User | undefined> {
				return undefined;
			}

			async listFuncionarioByService(): Promise<Funcionario[]> {
				return this.listFuncByServiceResult;
			}

			async listFuncionarios(): Promise<Funcionario[]> {
				return this.listAllResult;
			}
		}

		return new UserRepositorySpy();
	}; 

	test("É esperado que lance um erro caso o userRepository seja inválido", async () => {
		const invalidUserRepository = {} as iUserRepository;
		const sut = new ListarFuncionariosSVC(invalidUserRepository);

		expect(sut.listar()).rejects.toThrow(new InvalidDependencyError("User Repository"));
	});

	test("É esperado que retorne os usuários de acordo com o método listFuncionarios", async () => {
		const userRepository = makeUserRepositorySpy();
		const sut = new ListarFuncionariosSVC(userRepository);
    
		const result = await sut.listar();

		expect(result.length).toEqual(5);
	});

	test("É esperado que retorne os usuários de acordo com o método listFuncionariosByService", async () => {
		const userRepository = makeUserRepositorySpy();
		const sut = new ListarFuncionariosSVC(userRepository);
    
		const result = await sut.listar("degradê");

		expect(result.length).toEqual(7);
	});
});