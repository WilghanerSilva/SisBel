import { iListarServicosService } from "../utils/interfaces";
import ListarServicosCTER from "../controllers/listar-servicos.controller";
import { Servicos } from "@prisma/client";

describe("Listar Servicos Controller", () => {
	const makeServiceSpy = () => {
		class ListarServicosSVCSpy implements iListarServicosService {
			public listarServicosResult: Servicos[] = [
				{
					categoria: "cabelo",
					id: "any_id",
					nome: "degradê",
					publico: "masculino"
				},
				{
					categoria: "cabelo",
					id: "any_id",
					nome: "degradê",
					publico: "masculino"
				},
				{
					categoria: "cabelo",
					id: "any_id",
					nome: "degradê",
					publico: "masculino"
				},
				{
					categoria: "cabelo",
					id: "any_id",
					nome: "degradê",
					publico: "masculino"
				},
			];

			async listar(): Promise<Servicos[]> {
				return this.listarServicosResult;
			}
		}

		return new ListarServicosSVCSpy();
	};


	test("É esperado que retorne 500 caso o service seja inválido", async () => {
		const invalidService = {} as iListarServicosService;
		const sut = new ListarServicosCTER(invalidService);

		const httpRequest = {
			body: {},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É espearo que retorne 500 caso o service lance um erro", async () => {
		const serviceWithError = {
			listar: () => {throw new Error();}
		};

		const sut = new ListarServicosCTER(serviceWithError);
    
		const httpRequest = {
			body: {},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 200 e todos os servicos caso tudo ocorra bem", async () => {
		const service = makeServiceSpy();
		const sut = new ListarServicosCTER(service);

		const httpRequest = {
			body: {},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(200);
		expect(httpResponse.body.data.servicos).toEqual(service.listarServicosResult); 
	});
});