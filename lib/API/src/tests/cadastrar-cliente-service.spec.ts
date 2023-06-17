import CadastrarClienteSVC from "../services/cadastrar-cliente-service";
import { iEncrypter, iTokenManager, iUserRepository } from "../utils/interfaces";
import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { User} from "../utils/types/user-types";
import { Funcionario } from "@prisma/client";



describe("Cadastrar Cliente Service", () => {
	const makeEncrypterSpy = () => {
		class EncrypterSpy implements iEncrypter {
			public encryptedPassword = "any_password";
      
			async crypt(): Promise<string> {
				return this.encryptedPassword;
			}

			async compare(): Promise<boolean> {
				return true;
			}
		}

		return new EncrypterSpy;
	};

	const makeUserRepositorySpy = () => {
		class UserRepositorySpy implements iUserRepository {
			public clientCreateResult: User | undefined = {
				id: "any_id",
				name: "any_name",
				email: "any_email@mail.com",
				profile: "cliente",
			};

			public getByEmailResult: Omit<User, "password"> | undefined = undefined;
    
			async createCliente(): Promise<User | undefined> {
				return this.clientCreateResult;
			}

			async getUserByEmail(): Promise<Omit<User, "password"> | undefined> {
				return this.getByEmailResult;
			}

			async createFuncionario(): Promise<User | undefined> {
				return undefined;
			}

			async getUserById(): Promise<User | undefined> {
				return undefined;
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

	const makeTokenManagerSpy = () => {
		class TokenManagerSpy implements iTokenManager {
			public token = "any_token";
		
			verify(): string | { userId: string; } {
				return this.token;
			}

			generate(): string {
				return this.token;
			}
		}

		return new TokenManagerSpy();
	};

	const makeSut = () => {
		const userRepository = makeUserRepositorySpy();
		const tokenManager = makeTokenManagerSpy();
		const encrypter = makeEncrypterSpy();
		
		const sut = new CadastrarClienteSVC(
			userRepository, 
			tokenManager,
			encrypter
		);

		return {userRepository, tokenManager, sut, encrypter};
	};

	test("É esperado que lance um erro caso o UserRepository seja invalido", async () => {
		const invalidUserRepository = {} as iUserRepository;
		const tokenManager = makeTokenManagerSpy();
		const encrypter = makeEncrypterSpy();

		const sut = new CadastrarClienteSVC(
			invalidUserRepository, 
			tokenManager, 
			encrypter
		);
    
		expect(
			sut.cadastrar(
				"any_email@mail.com", 
				"any_name", 
				"8840028922", 
				"any_password"
			)
		).rejects.toThrow(new InvalidDependencyError("UserRepository"));
	});

	test("É esperado que lance um erro caso o TokenManager seja invalido", async () => {
		const userRepository = makeUserRepositorySpy();
		const encrypter = makeEncrypterSpy();
		const tokenManager = {} as iTokenManager;

		const sut = new CadastrarClienteSVC(
			userRepository, 
			tokenManager,
			encrypter
		);
    
		expect(
			sut.cadastrar(
				"any_email@mail.com", 
				"any_name", 
				"8840028922", 
				"any_password"
			)
		).rejects.toThrow(new InvalidDependencyError("TokenManager"));
	});

	test("É esperado que lance um erro caso o Encrypter seja invalido", async () => {
		const userRepository = makeUserRepositorySpy();
		const encrypter = {} as iEncrypter;
		const tokenManager = makeTokenManagerSpy();

		const sut = new CadastrarClienteSVC(
			userRepository, 
			tokenManager,
			encrypter
		);
    
		expect(
			sut.cadastrar(
				"any_email@mail.com", 
				"any_name", 
				"8840028922", 
				"any_password"
			)
		).rejects.toThrow(new InvalidDependencyError("Encrypter"));
	});

	test("É esperado que retorne null caso já exista uma conta com o email fornecido", async () => {
		const {userRepository, sut} = makeSut();

		userRepository.getByEmailResult = {
			name: "any_name",
			id: "any_id",
			email: "any_email",
			profile: "cliente",
		};

		const result = await sut.cadastrar(
			"any_email@mail.com", 
			"any_name", 
			"8840028922", 
			"any_password"
		);

		expect(result).toBeNull();
	});

	test("É esperado que lance um erro caso a função createUser retorne undefined", async () => {
		const {sut, userRepository} = makeSut();
    
		userRepository.clientCreateResult = undefined;

		expect(sut.cadastrar(
			"any_email@mail.com", 
			"any_name", 
			"8840028922", 
			"any_password"
		)).rejects.toThrow();
	});

	test("É esperado que retorne o token corretamente caso tudo ocorra bem", async () => {
		const {sut, tokenManager, userRepository} = makeSut();

		const result = await sut.cadastrar(
			"any_email@mail.com", 
			"any_name", 
			"8840028922", 
			"any_password"
		);

		expect(result).toEqual({
			profile: userRepository.clientCreateResult?.profile,
			token: tokenManager.token
		});
	});
});