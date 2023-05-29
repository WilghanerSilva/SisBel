import CadastrarServicoControler from "../controllers/cadastrar-servico-controller";
import HttpResponse from "../utils/helpers/htttp-response";
import { iCadastrarServicoService } from "../utils/interfaces";
import { HttpReq } from "../utils/types/http-types";

describe("Cadastrar Serviço Controller", () => {
	const makeCadastrarServicoServiceSpy = () => {
		class CadastrarServicoServSpy implements iCadastrarServicoService {
			public result = true;
			async cadastrar(adminId: string, nome: string, publico: string, categoria: string): Promise<boolean> {
				return this.result;
			}
		}

		return new CadastrarServicoServSpy();
	};

	const makeSut = () => {
		const cadastrarServicoServ = makeCadastrarServicoServiceSpy();
		const sut = new CadastrarServicoControler(cadastrarServicoServ);

		return {sut, cadastrarServicoServ};
	};

	test("É esperado que retorne 500 caso o service seja inválido", async () => {
		const invalidCadastrarServiceServ = {} as iCadastrarServicoService;
		const sut = new CadastrarServicoControler(
			invalidCadastrarServiceServ
		);

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				audience: "any_audience",
				category: "any_category"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);
    
		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 400 caso o campo name esteja vazio ou faltando", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "",
				audience: "any_audience",
				category: "any_category"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(400);
		expect(httpResponse.body).toEqual(HttpResponse.badRequest("Name").body);
	});

	test("É esperado que retorne 400 caso o campo audience esteja vazio ou faltando", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				audience: "",
				category: "any_category"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(400);
		expect(httpResponse.body).toEqual(HttpResponse.badRequest("Audience").body);
	});

	test("É esperado que retorne 400 caso o campo category esteja vazio ou faltando", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				audience: "any_audience",
				category: ""
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(400);
		expect(httpResponse.body).toEqual(HttpResponse.badRequest("Category").body);
	});

	test("É esperado que retorne 401 caso não tenha o campo userId nos headers", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				audience: "any_audience",
				category: "any_category"
			},
			headers: {
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
	});

	test("É esperado que retorne 401 caso o service retorne false", async () => {
		const {sut, cadastrarServicoServ} = makeSut();

		cadastrarServicoServ.result = false;

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				audience: "any_audience",
				category: "any_category"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
    
	});

	test("É esperado que retorne 500 caso o service lance um erro", async () => {
		const serviceWithError = {
			cadastrar: () => {throw new Error();}
		} as iCadastrarServicoService;

		const sut = new CadastrarServicoControler(serviceWithError);

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				audience: "any_audience",
				category: "any_category"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 200 caso o tudo ocorra bem", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				audience: "any_audience",
				category: "any_category"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);
		expect(httpResponse.statusCode).toEqual(200);
	});
});