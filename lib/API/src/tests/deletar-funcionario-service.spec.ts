import { iUserRepository } from "../utils/interfaces";
import DeletarFuncionarioSVC from "../services/deletar-funcionario-service";
import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import {User, UserWithPassword } from "../utils/types/user-types";

describe("Deletar Funcionário Service", () => {
	const makeUserRepositorySpy = () => {
		class UserRepositorySpy implements iUserRepository {
			public getUserByEmailResult: User = {
				email: "any_email@mail.com",
				name: "any_name",
				id: "any_id",
				profile: "admin"
			};

			public deleteFuncionarioResult = true;

			async createCliente(): Promise<User | undefined> {
				return undefined;
			}

			async deleteCliente(): Promise<boolean> {
				return false;
			}

			async getUserByEmail(): Promise<User | UserWithPassword | undefined> {
				return undefined;
			}

			async getUserById(): Promise<User | undefined> {
				return this.getUserByEmailResult;
			}

			async createFuncionario(): Promise<User | undefined> {
				return undefined;
			}

			async updateCliente(): Promise<User | undefined> {
				return undefined;
			}

			async deleteFuncionario(): Promise<boolean> {
				return this.deleteFuncionarioResult;
			}
		}

		return new UserRepositorySpy();
	};

	const makeSut = () => {
		const userRepository = makeUserRepositorySpy();
		const sut = new DeletarFuncionarioSVC(userRepository);

		return {
			userRepository,
			sut
		};
	};

	test("É esperado que lance um erro caso o userRepository seja inválido", async ()=>{
		const invalidUserRepository = {} as iUserRepository;
		const sut = new DeletarFuncionarioSVC(invalidUserRepository);

		expect(sut.deletar("admin_id", "func_id"))
			.rejects.toThrow(new InvalidDependencyError("User Repository"));
    
	});

	test("É esperado que retorne wrongFuncId caso o método deleteFuncionario retorne false", async () => {
		const {sut, userRepository} = makeSut();

		userRepository.deleteFuncionarioResult = false;

		const result = await sut.deletar("funcionario_id", "admin_id");

		expect(result).toEqual("wrongFuncId");
	});

	test("É esperado que retorne isNotAdmin caso o não seja encontrado um admin com o id passado", async () => {
		const {sut, userRepository} = makeSut();

		userRepository.getUserByEmailResult.profile = "cliente";

		const result = await sut.deletar("funcionario_id", "admin_id");

		expect(result).toEqual("isNotAdmin");
	});

	test("É esperado que retorne wrongFunc caso o repository retorne false mesmo quando os ids são iguais", async () => {
		const {sut, userRepository} = makeSut();

		userRepository.deleteFuncionarioResult = false;

		const result = await sut.deletar("funcionario_id", "funcionario_id");

		expect(result).toEqual("wrongFuncId");
	});

	test("É esperado que retorne ok caso tudo ocorra bem (id's iguais)", async () => {
		const {sut} = makeSut();

		const result = await sut.deletar("funcionario_id", "funcionario_id");

		expect(result).toEqual("ok");

	});

	test("É esperado que retorne ok caso tudo ocorra bem (id's diferentes)", async () => {
		const {sut} = makeSut();

		const result = await sut.deletar("funcionario_id", "admin_id");

		expect(result).toEqual("ok");

	});
});