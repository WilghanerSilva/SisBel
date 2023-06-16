import EditarClienteCTER from "../controllers/editar-cliente-controller";
import HttpResponse from "../utils/helpers/htttp-response";
import iEditarClienteService from "../utils/interfaces/iEditarClienteService";
import { HttpReq } from "../utils/types/http-types";
import { User } from "../utils/types/user-types";

describe("Editar Cliente Controller", () => {
	const makeEditarClienteSVCSpy = () => {
		class EditarClienteService implements iEditarClienteService {
			public editarResult = {
				user: {
					id: "any_id",
					name: "any_name",
					email: "any_email@mail.com",
					profile: "cliente"
				},
				message: "ok"
			};

			async editar(): Promise<{ user: User; message: string; }> {
				return this.editarResult;
			}
		}

		return new EditarClienteService;
	};

	const makeSut = () => {
		const editarClienteService = makeEditarClienteSVCSpy();
		const sut = new EditarClienteCTER(editarClienteService);

		return {
			sut,
			editarClienteService
		};
	};


	test("É esperado que retorne 500 caso o service seja inválido",async () => {
		const invalidService = {} as iEditarClienteService;
		const sut = new EditarClienteCTER(invalidService);

		const httpRequest: HttpReq = {
			body: {
				name: "new name",
				password: "new password",
				phone: "(88) 9963548695"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 500 caso o service lance um erro", async () => {
		const serviceWithError = {
			editar: () => {throw new Error();}
		} as iEditarClienteService;

		const sut = new EditarClienteCTER(serviceWithError);

		const httpRequest: HttpReq = {
			body: {
				name: "new name",
				password: "new password",
				phone: "(88) 9963548695"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 401 caso o service retorne invalidPassword", async () => {
		const {sut, editarClienteService} = makeSut();

		editarClienteService.editarResult.message = "invalidPassword";

		const httpRequest: HttpReq = {
			body: {
				name: "new name",
				password: "password",
				newPassword: "newpassword",
				phone: "(88) 9963548695"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
		expect(httpResponse.body).toEqual(HttpResponse.unauthorized("Senha inválida").body);
	});

	test("É esperado que retorne 401 caso seja enviado uma nova senha sem a senha anterior", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "new name",
				newPassword: "password",
				phone: "(88) 9963548695"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
		expect(httpResponse.body).toEqual(HttpResponse.unauthorized("É necessário enviar a senha atual para alterar a passada").body);
	});

	test("É esperado que retorne 200 caso tudo ocorra bem", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "new name",
				password: "abcd1234",
				newPassword: "dcba4321",
				phone: "(88) 9963548695"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(200);
	});

	test("É esperado que retorne 400 caso nenhum parâmetro a ser editado seja passado", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {

			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(400);
	});

	test("É esperado que retorne 500 caso o service retorne invalidId", async () => {
		const {sut, editarClienteService} = makeSut();

		editarClienteService.editarResult.message = "invalidId";

		const httpRequest: HttpReq = {
			body: {
				name: "new name",
				password: "abcd1234",
				newPassword: "dcba4321",
				phone: "(88) 9963548695"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});
});