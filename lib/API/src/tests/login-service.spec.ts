import LoginSVC from "../services/login-service";
import { iEncrypter, iTokenManager, iUserRepository } from "../utils/interfaces";
import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { User, UserWithPassword } from "../utils/types/user-types";

describe("Login Service", () => {
	const makeTokenManagerSpy = () => {
		class TokenManagerSpy implements iTokenManager {
			public token = "any_token";

			verify(): string | { userId: string; } {
				return "any_token";
			}

			generate(): string {
				return this.token;
			}
		}

		return new TokenManagerSpy();
	};

	const makeEncrypterSpy = () => {
		class EncrypterSpy implements iEncrypter{
			public compareResult = true;

			async compare(): Promise<boolean> {
				return this.compareResult;
			}

			async crypt(): Promise<string> {
				return "encrypted_password";
			}  
		}

		return new EncrypterSpy();
	};

	const makeUserRepositorySpy = () => {
		class UserRepositorySpy implements iUserRepository {
			public userGetResult: User| UserWithPassword | undefined = {
				id: "any_id",
				name: "any_name",
				email: "any_email@mail.com",
				profile: "cliente",
				password: "any_password"
			};
    
			async createCliente(): Promise<Omit<User, "password"> | undefined> {
				return undefined;
			}

			async createFuncionario(): Promise<User | undefined> {
				return undefined;
			}

			async getUserByEmail(): Promise<Omit<User, "password"> | undefined | User> {

				return this.userGetResult;
			}

			async getUserById(): Promise<User | undefined> {
				return undefined;
			}

			async deleteCliente(): Promise<boolean> {
				return false;
			}
		}

		return  new UserRepositorySpy();
	};

	const makeSut = () => {
		const tokenManager = makeTokenManagerSpy();
		const encrypter = makeEncrypterSpy();
		const userRepository = makeUserRepositorySpy();

		const sut = new LoginSVC(
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

		const sut = new LoginSVC(
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

		const sut = new LoginSVC(
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

		const sut = new LoginSVC(
			userRepository,
			encrypter,
			invalidTokenManager
		);

		expect(sut.auth("any_email", "any_password"))
			.rejects.toThrow(new InvalidDependencyError("TokenManager"));
	});
	
	test("É esperado que retorne null caso as senha esteja incorreta", async () => {
		const {sut, encrypter} = makeSut();

		encrypter.compareResult = false;

		const token = await sut.auth("any_email@mail.com", "invalid_password");

		expect(token).toBeNull();
	});

	test("É esperado que retorne null caso não exista um usuário com o email fornecido", async () => {
		const {sut, userRepository} = makeSut();

		userRepository.userGetResult = undefined;

		const token = await sut.auth("invalid_email@mail.com", "any_password");

		expect(token).toBeNull();
	});

	test("É esperado que retorne o token e o perfil caso tudo ocorra bem", async () => {
		const {sut, tokenManager, userRepository} = makeSut();

		const result = await sut.auth("valid_email@mail.com", "valid_password");

		expect(result).toEqual({
			profile: userRepository.userGetResult?.profile,
			token: tokenManager.token
		});
	});

});