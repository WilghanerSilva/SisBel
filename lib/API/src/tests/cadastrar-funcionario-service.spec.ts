import CadastrarFuncionarioSVC from "../services/cadastrar-funcionario-service";
import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { iUserRepository, iEncrypter } from "../utils/interfaces";
import { User, UserWithPassword } from "../utils/types/user-types";

describe("Cadastrar Funcionario Service", () => {
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
		}

		return  new UserRepositorySpy();
	};

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

	const makeSut = () => {
		const userRepository = makeUserRepositorySpy();
		const encrypter = makeEncrypterSpy();
		const sut = new CadastrarFuncionarioSVC(
			encrypter,
			userRepository
		);

		return {
			userRepository,
			encrypter,
			sut
		};
	};

	test("É esperado que lance um erro caso o UserRepository seja inválido", async () => {
		const invalidUserRepository = {} as iUserRepository;
		const encrypter = makeEncrypterSpy();
		
		const sut = new CadastrarFuncionarioSVC(
			encrypter,
			invalidUserRepository
		);

		expect(
			sut.cadastrar(
				"any_id",
				{
					name: "any_name",
					email: "any_email@mail.com",
					password: "any_password",
					phone: "any_password",
					birthDate: "20/05/2000",
					cpf: "666.222.555-88",
					adress: "Bairro tanto faz, Rua nao importa",
					city: "Tianguá"
				}
			)
		).rejects.toThrow(new InvalidDependencyError("UserRepository"));
	});

	test("É esperado que lance um erro caso o Encrypter seja inválido", async () => {
		const userRepository = makeUserRepositorySpy();
		const invalidEncrypter = {} as iEncrypter;
		
		const sut = new CadastrarFuncionarioSVC(
			invalidEncrypter,
			userRepository
		);

		expect(
			sut.cadastrar(
				"any_id",
				{
					name: "any_name",
					email: "any_email@mail.com",
					password: "any_password",
					phone: "any_password",
					birthDate: "20/05/2000",
					cpf: "666.222.555-88",
					adress: "Bairro tanto faz, Rua nao importa",
					city: "Tianguá"
				}
			)
		).rejects.toThrow(new InvalidDependencyError("Encrypter"));
	});

	test("É esperado que retorne emailInUse caso o email já esteja sendo utilizado", async () => {
		const {sut, userRepository} = makeSut();

		userRepository.userGet = {
			id: "any_id",
			name: "any_name",
			email: "any_email@mail.com",
			profile: "funcionario",
		};

		const serviceResult = await sut.cadastrar(
			"any_id",
			{
				name: "any_name",
				email: "any_email@mail.com",
				password: "any_password",
				phone: "any_password",
				birthDate: "20/05/2000",
				cpf: "666.222.555-88",
				adress: "Bairro tanto faz, Rua nao importa",
				city: "Tianguá"
			}
		);

		expect(serviceResult).toEqual("emailInUse");
	});

	test("É esperado que retorne isNotAdmin caso o id passado não seja de um admin", async () => {
		const {sut, userRepository} = makeSut();

		userRepository.getUserId = {
			id: "any_id",
			name: "any_name",
			email: "any_email@mail.com",
			profile: "cliente",
		};

		const serviceResult = await sut.cadastrar(
			"any_id",
			{
				name: "any_name",
				email: "any_email@mail.com",
				password: "any_password",
				phone: "any_password",
				birthDate: "20/05/2000",
				cpf: "666.222.555-88",
				adress: "Bairro tanto faz, Rua nao importa",
				city: "Tianguá"
			}
		);

		expect(serviceResult).toEqual("isNotAdmin");
	});

	test("É esperado que retorne invalidCPF caso o cpf seja inválido", async () => {
		const {sut} = makeSut();

		const result = await sut.cadastrar(
			"any_id",
			{
				name: "any_name",
				email: "any_email@mail.com",
				password: "any_password",
				phone: "any_password",
				birthDate: "20/05/2000",
				cpf: "111.444.777-38",
				adress: "Bairro tanto faz, Rua nao importa",
				city: "Tianguá"
			}
		);

		expect(result).toEqual("invalidCPF");

	});

	test("É esperado que lance um erro caso não seja retornado um funcionário pelo repository", async () => {
		const {sut, userRepository} = makeSut();

		userRepository.funcionarioCreate = undefined;

		expect(async () => {
			await sut.cadastrar(
				"any_id",
				{
					name: "any_name",
					email: "any_email@mail.com",
					password: "any_password",
					phone: "any_password",
					birthDate: "20/05/2000",
					cpf: "111-444-777.35",
					adress: "Bairro tanto faz, Rua nao importa",
					city: "Tianguá"
				}
			);
		}).rejects.toThrow();
	});

	test("É esperado que não retorne nada caso tudo ocorra bem", async () => {
		const {sut} = makeSut();

		const serviceResult = await sut.cadastrar(
			"any_id",
			{
				name: "any_name",
				email: "any_email@mail.com",
				password: "any_password",
				phone: "any_password",
				birthDate: "20/05/2000",
				cpf: "111-444-777.35",
				adress: "Bairro tanto faz, Rua nao importa",
				city: "Tianguá"
			}
		);

		expect(!serviceResult).toBeTruthy();

	});
});