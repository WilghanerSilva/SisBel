import { iUserRepository } from "../utils/interfaces";
import DeletarClienteSVC from "../services/deletar-cliente-service";
import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { User } from "../utils/types/user-types";
import { Funcionario } from "@prisma/client";

describe("Deletar Cliente Service", () => {
	const makeUserRepositorySpy = () => {
		class UserRepositorySpy implements iUserRepository {

			public getUserId : User | undefined = {
				id: "any_id",
				name: "any_name",
				email: "any_email@mail.com",
				profile: "cliente",
			};
    
			async createCliente(): Promise<Omit<User, "password"> | undefined> {
				return undefined;
			}

			async getUserByEmail(): Promise<Omit<User, "password"> | undefined | User> {

				return undefined;
			}

			async createFuncionario(): Promise<User | undefined> {
				return undefined;
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

	const makeSut = () => {
		const userRepository = makeUserRepositorySpy();
		const sut = new DeletarClienteSVC(userRepository);
  
		return {
			userRepository,
			sut
		};
	};

	test("É esperado que lance um erro caso o userRepository seja inválido", async () => {
		const invalidUserRepository = {} as iUserRepository;
		const sut = new DeletarClienteSVC(invalidUserRepository);

		expect(sut.delete("any_id"))
			.rejects.toThrow(new InvalidDependencyError("User Repository"));
	});

	test("É esperado que retorne false se o id não pertencer a um cliente", async () => {
		const {sut, userRepository} = makeSut();
    
		userRepository.getUserId = {
			id: "any_id",
			name: "any_name",
			email: "any_email@mail.com",
			profile: "admin",
		};

		const result = await sut.delete("any_id");

		expect(result).toEqual(false);
	});

	test("É esperado que retorne false caso não seja encontrado um usuário com esse id", async () => {
		const {sut, userRepository} = makeSut();
    
		userRepository.getUserId = undefined;

		const result = await sut.delete("any_id");

		expect(result).toEqual(false);
	});

	test("É esperado que retorne true se tudo ocorrer bem", async () => {
		const {sut} = makeSut();

		const result = await sut.delete("id");

		expect(result).toEqual(true);
	});
});