import { User } from "@prisma/client";
import CadastrarClienteService from "../services/cadastrar-cliente-service";
import { iEncrypter, iTokenManager, iUserRepository } from "../utils/interfaces";
import { CreateUserData } from "../utils/types/user-types";
import InvalidDependencyError from "../utils/erros/invaliddependency-error";



describe("Cadastrar Usuário Service", () => {
	const makeEncrypterSpy = () => {
		class EncrypterSpy implements iEncrypter {
			public encryptedPassword = "any_password";
      
			async crypt(password: string): Promise<string> {
				return this.encryptedPassword;
			}

			async compare(password: string, hashedPassword: string): Promise<boolean> {
				return true;
			}
		}

		return new EncrypterSpy;
	};

	const makeUserRepositorySpy = () => {
		class UserRepositorySpy implements iUserRepository {
			public userCreate: Omit<User, "password"> | undefined = {
				id: "any_id",
				name: "any_name",
				email: "any_email@mail.com",
				phone: "8840028922",
				profile: "cliente",
			};

			public userGet: Omit<User, "password"> | undefined = undefined;
    
			async createUser( data: CreateUserData ): Promise<Omit<User, "password"> | undefined> {
				return this.userCreate;
			}

			async getUserByEmail(email: string): Promise<Omit<User, "password"> | undefined> {
				return this.userGet;
			}
		}

		return  new UserRepositorySpy();
	};

	const makeTokenManagerSpy = () => {
		class TokenManagerSpy implements iTokenManager {
			public token = "any_token";
		
			verify(token: string): string | { userId: string; } {
				return this.token;
			}

			generate(userId: string): string {
				return this.token;
			}
		}

		return new TokenManagerSpy();
	};

	const makeSut = () => {
		const userRepository = makeUserRepositorySpy();
		const tokenManager = makeTokenManagerSpy();
		const encrypter = makeEncrypterSpy();
		
		const sut = new CadastrarClienteService(
			userRepository, 
			tokenManager,
			encrypter
		);

		return {userRepository, tokenManager, sut, encrypter};
	};

	it("É esperado que lance um erro caso o UserRepository seja invalido", async () => {
		const invalidUserRepository = {} as iUserRepository;
		const tokenManager = makeTokenManagerSpy();
		const encrypter = makeEncrypterSpy();

		const sut = new CadastrarClienteService(
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

	it("É esperado que lance um erro caso o TokenManager seja invalido", async () => {
		const userRepository = makeUserRepositorySpy();
		const encrypter = makeEncrypterSpy();
		const tokenManager = {} as iTokenManager;

		const sut = new CadastrarClienteService(
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

	it("É esperado que lance um erro caso o Encrypter seja invalido", async () => {
		const userRepository = makeUserRepositorySpy();
		const encrypter = {} as iEncrypter;
		const tokenManager = makeTokenManagerSpy();

		const sut = new CadastrarClienteService(
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

	it("É esperado que retorne undefined caso já exista uma conta com o email fornecido", async () => {
		const {userRepository, sut} = makeSut();

		userRepository.userGet = {
			name: "any_name",
			id: "any_id",
			email: "any_email",
			profile: "cliente",
			phone: "8840028922"
		};

		const result = await sut.cadastrar(
			"any_email@mail.com", 
			"any_name", 
			"8840028922", 
			"any_password"
		);

		expect(result).toBeUndefined();
	});

	it("É esperado que lance um erro caso a função createUser retorne undefined", async () => {
		const {sut, userRepository} = makeSut();
    
		userRepository.userCreate = undefined;

		expect(sut.cadastrar(
			"any_email@mail.com", 
			"any_name", 
			"8840028922", 
			"any_password"
		)).rejects.toThrow();
	});

	it("É esperado que retorne o token corretamente caso tudo ocorra bem", async () => {
		const {sut, tokenManager} = makeSut();

		const result = await sut.cadastrar(
			"any_email@mail.com", 
			"any_name", 
			"8840028922", 
			"any_password"
		);

		expect(result).toBe(tokenManager.token);
	});
});