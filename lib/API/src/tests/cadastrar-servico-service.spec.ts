import { iServicoRepository, iUserRepository } from "../utils/interfaces";
import CadastrarServicoSVC from "../services/cadastrar-servico-service";
import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import {User, UserWithPassword } from "../utils/types/user-types";
import { Funcionario, Servicos } from "@prisma/client";

describe("Cadastrar Servicos Service", () => {
	const makeUserRepositorySpy = () => {
		class UserRepositorySpy implements iUserRepository {
			public userGet: User| UserWithPassword | undefined = undefined;

			public funcionarioCreate: User | undefined = {
				id: "any_id",
				name: "any_name",
				email: "any_email@mail.com",
				profile: "cliente",
			};

			public getUserId : User | undefined = {
				id: "any_id",
				name: "any_name",
				email: "any_email@mail.com",
				profile: "admin",
			};
    
			async createCliente(): Promise<Omit<User, "password"> | undefined> {
				return undefined;
			}

			async getUserByEmail(): Promise<Omit<User, "password"> | undefined | User> {

				return this.userGet;
			}

			async createFuncionario(): Promise<User | undefined> {
				return this.funcionarioCreate;
			}

			async getUserById(): Promise<User | undefined> {
				return this.getUserId;
			}

			async deleteCliente(): Promise<boolean> {
				return false;
			}

			async updateCliente(): Promise<User | undefined> {
				return undefined;
			}

			async deleteFuncionario(): Promise<boolean> {
				return false;
			}

			async listFuncionarioByService(): Promise<Funcionario[]> {
				return [];
			}

			async listFuncionarios(): Promise<Funcionario[]> {
				return [];
			}
		}

		return  new UserRepositorySpy();
	};

	const makeServicoRepositorySpy = () => {
		class ServicoRepositorySpy implements iServicoRepository {
			public createResult : Servicos | undefined  = {
				id: "any_id",
				nome: "any_name",
				publico: "any_audience",
				categoria: "any_category"
			};

			public getResult : Servicos | null = null;
      
			async create(): Promise<Servicos | undefined> {
				return this.createResult;
			}

			async getByName(): Promise<Servicos | null> {
				return this.getResult;
			}

			async listAll(): Promise<Servicos[]> {
				return [];
			}

			async listByAudience(): Promise<Servicos[]> {
				return [];
			}

			async listByCategory(): Promise<Servicos[]> {
				return [];
			}
		}

		return new ServicoRepositorySpy;
	};

	const makeSut = () => {
		const userRepository = makeUserRepositorySpy();
		const servicoRepository = makeServicoRepositorySpy();

		const sut = new CadastrarServicoSVC(servicoRepository, userRepository);
	
		return {
			userRepository,
			servicoRepository,
			sut
		};
	};

	test("É esperado que lance um erro caso o servicoRepository seja invalido", async () => {
		const invalidRepository = {} as iServicoRepository;
		const userRepository = makeUserRepositorySpy();
		const sut = new CadastrarServicoSVC(
			invalidRepository,
			userRepository
		);

		expect(sut.cadastrar(
			"any_id",
			"any_name",
			"any_public",
			"any_category"
		)).rejects.toThrow(new InvalidDependencyError("Servicos Repository"));
	});

	test("É esperado que lance um erro caso o userRepositoy seja inválido", async () => {
		const servicoRepository = makeServicoRepositorySpy();
		const invalidUserRepository = {} as iUserRepository;

		const sut = new CadastrarServicoSVC(
			servicoRepository,
			invalidUserRepository
		);

		expect(sut.cadastrar(
			"any_id",
			"any_name",
			"any_public",
			"any_category"
		)).rejects.toThrow(new InvalidDependencyError("User Repository"));
	});

	test("É esperado que retorne false caso não exista um usuário com o id fornecido", async () => {
		const {sut, userRepository} = makeSut();

		userRepository.getUserId = undefined;

		const result = await sut.cadastrar(
			"any_id",
			"any_name",
			"any_public",
			"any_category"
		);

		expect(result).toBeFalsy();
	});

	test("É esperado que retorne false caso o id passado não seja de um admin", async () => {
		const {sut, userRepository } = makeSut();
		userRepository.getUserId = {
			id: "any_id",
			name: "any_name",
			email: "any_email@mail.com",
			profile: "funcionario",
		};

		const result = await sut.cadastrar(
			"any_id",
			"any_name",
			"any_public",
			"any_category"
		);

		expect(result).toBeFalsy();
	});

	test("É esperado que retorne false caso já exista um serviço com o mesmo nome cadastrado", async () => {
		const {sut, servicoRepository} = makeSut();

		servicoRepository.getResult = {
			id: "any_id",
			nome: "any_name",
			publico: "any_audience",
			categoria: "any_category"
		};

		const result = await sut.cadastrar(
			"any_id",
			"any_name",
			"any_public",
			"any_category"
		);

		expect(result).toBeFalsy();
	});

	test("É esperado que lance um erro caso o retorno do método de criação seja undefined", async () => {
		const {sut, servicoRepository} = makeSut();

		servicoRepository.createResult = undefined;

		expect(sut.cadastrar(
			"any_id",
			"any_name",
			"any_public",
			"any_category"
		)).rejects.toThrow();
	});

	test("É esperado que retorne true caso tudo ocorra corretamente", async () => {
		const {sut} = makeSut();

		const result = await sut.cadastrar(
			"any_id",
			"any_name",
			"any_public",
			"any_category"
		);

		expect(result).toBeTruthy();
	});
});