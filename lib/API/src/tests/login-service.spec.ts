import LoginService from "../services/login-service";
import { iEncrypter, iTokenManager, iUserRepository } from "../utils/interfaces";
import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { CreateFuncionarioData, User, UserWithPassword } from "../utils/types/user-types";

describe("LoginService", () => {
	const makeTokenManagerSpy = () => {
		class TokenManagerSpy implements iTokenManager {
			public token = "any_token";

			verify(token: string): string | { userId: string; } {
				return "any_token";
			}

			generate(userId: string): string {
				return this.token;
			}
		}

		return new TokenManagerSpy();
	};

	const makeEncrypterSpy = () => {
		class EncrypterSpy implements iEncrypter{
			public compareResult = true;

			async compare(password: string, hashedPassword: string): Promise<boolean> {
				return this.compareResult;
			}

			async crypt(password: string): Promise<string> {
				return "encrypted_password";
			}  
		}

		return new EncrypterSpy();
	};

	const makeUserRepositorySpy = () => {
		class UserRepositorySpy implements iUserRepository {
			public userGet: User| UserWithPassword | undefined = {
				id: "any_id",
				name: "any_name",
				email: "any_email@mail.com",
				profile: "cliente",
				password: "any_password"
			};
    
			async createCliente(): Promise<Omit<User, "password"> | undefined> {
				return undefined;
			}

			async createFuncionario(data: CreateFuncionarioData): Promise<User | undefined> {
				return undefined;
			}

			async getUserByEmail(email: string, includesPassword: boolean): Promise<Omit<User, "password"> | undefined | User> {

				return this.userGet;
			}

			async getUserById(id: string): Promise<User | undefined> {
				return undefined;
			}
		}

		return  new UserRepositorySpy();
	};

	const makeSut = () => {
		const tokenManager = makeTokenManagerSpy();
		const encrypter = makeEncrypterSpy();
		const userRepository = makeUserRepositorySpy();

		const sut = new LoginService(
			userRepository,
			encrypter,
			tokenManager
		);

		return {
			sut,
			tokenManager,
			encrypter,
			userRepository
		};
	};

	test("É esperado que lance um erro caso o UserRepository seja inválido", async () => {
		const encryper = makeEncrypterSpy();
		const tokenManager = makeTokenManagerSpy();
		const invalidUserRepository = {} as iUserRepository;

		const sut = new LoginService(
			invalidUserRepository,
			encryper,
			tokenManager
		);

		expect(sut.auth("any_email", "any_password"))
			.rejects.toThrow(new InvalidDependencyError("UserService"));
	});

	test("É esperado que lance um erro caso o Encrypter seja inválido", async () => {
		const invalidEncrypter = {} as iEncrypter;
		const tokenManager = makeTokenManagerSpy();
		const userRepository = makeUserRepositorySpy();

		const sut = new LoginService(
			userRepository,
			invalidEncrypter,
			tokenManager
		);

		expect(sut.auth("any_email", "any_password"))
			.rejects.toThrow(new InvalidDependencyError("Encrypter"));
	});

	test("É esperado que lance um erro caso o TokenManager seja inválido", async () => {
		const encrypter = makeEncrypterSpy();
		const invalidTokenManager = {} as iTokenManager;
		const userRepository = makeUserRepositorySpy();

		const sut = new LoginService(
			userRepository,
			encrypter,
			invalidTokenManager
		);

		expect(sut.auth("any_email", "any_password"))
			.rejects.toThrow(new InvalidDependencyError("TokenManager"));
	});
	
	test("É esperado que retorne uma string vazia caso as senha esteja incorreta", async () => {
		const {sut, encrypter} = makeSut();

		encrypter.compareResult = false;

		const token = await sut.auth("any_email@mail.com", "invalid_password");

		expect(token).toEqual("");
	});

	test("É esperado que retorne uma string vazia caso não exista um usuário com o email fornecido", async () => {
		const {sut, userRepository} = makeSut();

		userRepository.userGet = undefined;

		const token = await sut.auth("invalid_email@mail.com", "any_password");

		expect(token).toEqual("");
	});

	test("É esperado que retorne o token caso tudo ocorra bem", async () => {
		const {sut, tokenManager} = makeSut();

		const token = await sut.auth("valid_email@mail.com", "valid_password");

		expect(token).toBe(tokenManager.token);
	});

});