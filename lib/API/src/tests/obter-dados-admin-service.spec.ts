import { Funcionario } from "@prisma/client";
import ObterDadosAdminService from "../services/obter-dados-admin-service";
import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { iUserRepository } from "../utils/interfaces";
import { User} from "../utils/types/user-types";

describe("Obter Dados Admin Service", () => {
	const makeUserRepositorySpy = () => {
		class UserRepositorySpy implements iUserRepository {
			public userGetResult: User= {
				id: "any_id",
				name: "any_name",
				email: "any_email@mail.com",
				profile: "admin",
			};
    
			async createCliente(): Promise<Omit<User, "password"> | undefined> {
				return undefined;
			}

			async createFuncionario(): Promise<User | undefined> {
				return undefined;
			}

			async getUserByEmail(): Promise<Omit<User, "password"> | undefined | User> {

				return undefined;
			}

			async getUserById(): Promise<User | undefined> {
				return this.userGetResult;
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

	test("É esperado que lance um erro caso o user repository seja inválido", async () => {
		const invalidUserRepository = {} as iUserRepository;
		const sut = new ObterDadosAdminService(invalidUserRepository);

		expect(sut.obter("any_id"))
			.rejects.toThrow(new InvalidDependencyError("User Repository"));
	});

	test("É esperado que retorne isNotAdmin caso o usuário não tenha admin como perfil", async () => {
		const userRepository = makeUserRepositorySpy();
		userRepository.userGetResult.profile = "cliente";

		const sut = new ObterDadosAdminService(userRepository);

		const result = await sut.obter("any_id");

		expect(result.message).toEqual("isNotAdmin");
		expect(result.admin).toBeFalsy();
	});

	test("É esperado que retorne ok e o admin caso tudo ocorra bem", async () => {
		const userRepository = makeUserRepositorySpy();

		const sut = new ObterDadosAdminService(userRepository);

		const result = await sut.obter("any_id");

		expect(result.message).toEqual("ok");
		expect(result.admin).toEqual(result.admin);
	});
});