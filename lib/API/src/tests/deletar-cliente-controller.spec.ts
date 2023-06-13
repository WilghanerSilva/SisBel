import DeletarClienteController from "../controllers/deletar-cliente-controller";
import HttpResponse from "../utils/helpers/htttp-response";
import { iDeletarClienteService } from "../utils/interfaces";
import { HttpReq } from "../utils/types/http-types";

describe("Deletar Cliente Controller", () => {
	const makeDeletarClienteSVCSpy = () => {
		class DeletarClienteSVC implements iDeletarClienteService {
			public deleteResult = true;

			async delete(): Promise<boolean> {
				return this.deleteResult;  
			}
		}

		return new DeletarClienteSVC();
	};

	const makeSut = () => {
		const deletarClienteService = makeDeletarClienteSVCSpy();
		const sut = new DeletarClienteController(deletarClienteService);

		return {
			deletarClienteService,
			sut
		};
	};


	test("É esperado que retorne 500 caso o service seja inválido", async () => {
		const invalidService = {} as iDeletarClienteService;
		const sut = new DeletarClienteController(invalidService);

		const httpRequest: HttpReq = {
			body: {},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 500 caso o service lance um erro", async () => {
		const serviceWithError = {
			delete: () => {throw new Error();}
		} as iDeletarClienteService;

		const sut = new DeletarClienteController(serviceWithError);
	
		const httpRequest: HttpReq = {
			body: {},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 401 caso o campo userId não esteja nos headers", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {},
			headers: {
				userId: ""
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
		expect(httpResponse.body).toEqual(HttpResponse.unauthorized("Você não pode realizar essa ação").body);
	});

	test("É esperado que reotorne 401 caso o service retorne false", async () => {
		const {sut, deletarClienteService} = makeSut();

		deletarClienteService.deleteResult = false;

		const httpRequest: HttpReq = {
			body: {},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
		expect(httpResponse.body).toEqual(HttpResponse.unauthorized("Não foi possível deletar sua conta").body);
	});

	test("É esperado que retorne 200 se tudo ocorrer bem", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(200);
	});
});