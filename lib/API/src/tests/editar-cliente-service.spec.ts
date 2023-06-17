import EditarClienteSVC from "../services/editar-cliente-service";
import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { iEncrypter, iUserRepository } from "../utils/interfaces";
import { User, UserWithPassword } from "../utils/types/user-types";

describe("Editar Cliente Service", () => {
	const makeEncrypterSpy = () => {
		class EncrypterSpy implements iEncrypter {
			public compareResult = true;
			public cryptResult = "any_password";

			async compare(): Promise<boolean> {
				return this.compareResult;
			}

			async crypt(): Promise<string> {
				return this.cryptResult;
			}
		}

		return new EncrypterSpy();
	};

	const makeUserRepositorySpy = () => {
		class UserRepositorySpy implements iUserRepository {
			public updateResult: User | undefined = {
				email: "any_email@mail.com",
				id: "any_id",
				name: "any_name",
				phone: "(00) 000000000",
				profile: "cliente",
			};

			public getByIdResult: User | undefined = {
				email: "any_email@mail.com",
				id: "any_id",
				name: "any_name",
				phone: "(00) 000000000",
				profile: "cliente",
			};

			public getByEmailResult: UserWithPassword | undefined = {
				email: "any_email@mail.com",
				id: "any_id",
				name: "any_name",
				profile: "cliente",
				phone: "(00) 000000000",
				password: "any_password"
			};

			async createCliente(): Promise<User | undefined> {
				return undefined;
			}

			async createFuncionario(): Promise<User | undefined> {
				return undefined;
			}

			async deleteCliente(): Promise<boolean> {
				return true;
			}

			async getUserByEmail(): Promise<User | UserWithPassword | undefined> {
				return this.getByEmailResult;
			}

			async getUserById(): Promise<User | undefined> {
				return this.getByIdResult;
			}

			async updateCliente(): Promise<User | undefined> {
				return this.updateResult;
			}

			async deleteFuncionario(): Promise<boolean> {
				return false;
			}
		}

		return new UserRepositorySpy;
	};
  
	const makeSut = () => {
		const userRepository = makeUserRepositorySpy();
		const encrypter = makeEncrypterSpy();
		const sut = new EditarClienteSVC(userRepository, encrypter);


		return {
			sut,
			userRepository,
			encrypter
		};
	};
  
	test("É esperado que retorne um erro caso o User Repository seja inválido", () => {
		const invalidUserRepository = {} as iUserRepository;
		const encrypter = makeEncrypterSpy();
		const sut = new EditarClienteSVC(invalidUserRepository, encrypter);

		expect(sut.editar(
			"any_id",
			{
				name: "new_name",
				password: "old_password",
				newPassword: "new_password",
				phone: "(88) 965648568"
			}
		)).rejects.toThrow(new InvalidDependencyError("User Repository"));
	});

	test("É esperado que retorne um erro caso o User Repository seja inválido", () => {
		const userRepository = makeUserRepositorySpy();
		const invalidEncrypter = {} as iEncrypter;
		const sut = new EditarClienteSVC(userRepository, invalidEncrypter);

		expect(sut.editar(
			"any_id",
			{
				name: "new_name",
				password: "old_password",
				newPassword: "new_password",
				phone: "(88) 965648568"
			}
		)).rejects.toThrow(new InvalidDependencyError("Encrypter"));
	});

	test("É esperado que retorne invalidId caso o user não exista", async () => {
		const {sut, userRepository} = makeSut();

		userRepository.getByIdResult = undefined;

		const result = await sut.editar(
			"any_id",
			{
				name: "new_name",
				password: "old_password",
				newPassword: "new_password",
				phone: "(88) 965648568"
			}
		);

		expect(result.message).toEqual("invalidId");
	});

	test("É esperado que retorne invalidPassword caso a senha fornecida não seja correta", async () => {
		const {sut, encrypter} = makeSut();

		encrypter.compareResult = false;

		const result = await sut.editar(
			"any_id",
			{
				name: "new_name",
				password: "old_password",
				newPassword: "new_password",
				phone: "(88) 965648568"
			}
		);

		expect(result.message).toEqual("invalidPassword");
	});

	test("É esperado que retorne invalidId caso o repository retorne undefined", async () => {
		const {sut, userRepository} = makeSut();

		userRepository.updateResult = undefined;

		const result = await sut.editar(
			"any_id",
			{
				name: "new_name",
				password: "old_password",
				newPassword: "new_password",
				phone: "(88) 965648568"
			}
		);

		expect(result.message).toEqual("invalidId");
	});

	test("É esperado que retorne o usuário e ok caso tudo ocorra bem", async () => {
		const {sut, userRepository} = makeSut();

		const result = await sut.editar(
			"any_id",
			{
				name: "new_name",
				password: "old_password",
				newPassword: "new_password",
				phone: "(88) 965648568"
			}
		);

		expect(result.message).toEqual("ok");
		expect(result.user).toEqual(userRepository.updateResult);
	});
});