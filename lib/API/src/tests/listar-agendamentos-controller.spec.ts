import { Agendamentos } from "@prisma/client";
import ListarAgendamentosCTER from "../controllers/listar-agendamentos-controller";
import { iListarAgendamentosService } from "../utils/interfaces";
import { HttpReq } from "../utils/types/http-types";
import HttpResponse from "../utils/helpers/htttp-response";

describe("Listar Agendamentos Controller", () => {
	const makeListarAgendamentoSVCSpy = () => {
		class ListarAgendamentoSVCSpy implements iListarAgendamentosService {      
			public listarResult = [
				{
					id: "any_id",
					data: new Date(),
					detalhes: "",
					horario: "08:00",
					funcionarioId: "any_id",
					clienteId: "any_id",
					servicoId: "any_id"
				},
				{
					id: "any_id",
					data: new Date(),
					detalhes: "",
					horario: "08:00",
					funcionarioId: "any_id",
					clienteId: "any_id",
					servicoId: "any_id"
				},
				{
					id: "any_id",
					data: new Date(),
					detalhes: "",
					horario: "08:00",
					funcionarioId: "any_id",
					clienteId: "any_id",
					servicoId: "any_id"
				}
			];
      
			async listar(): Promise<Agendamentos[]> {
				return this.listarResult;
			}
		}

		return new ListarAgendamentoSVCSpy();
	};

	const makeSut = () => {
		const listarAgendamentosSVC = makeListarAgendamentoSVCSpy();
		const sut = new ListarAgendamentosCTER(listarAgendamentosSVC);
    
		return  {
			sut, listarAgendamentosSVC
		};
	};

	test("É esperado que retorne 500 caso o service seja inválido", async () => {
		const sut = new ListarAgendamentosCTER({} as iListarAgendamentosService);

		const httpRequest: HttpReq = {
			body: {
				id: "any_id"
			},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 400 caso o valor id seja vazio", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				id: ""
			},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(400);
		expect(httpResponse.body).toEqual(HttpResponse.badRequest("ID").body);
	});

	test("É esperado que retorne 200 caso tudo ocorra bem", async () => {
		const {sut, listarAgendamentosSVC} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				id: "any_id"
			},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(200);
		expect(httpResponse.body.data).toEqual(listarAgendamentosSVC.listarResult);  
	});

	test("É esperado que retorne 500 caso o service lance um erro", async () => {
		const serviceWithError = {
			listar: () => {throw new Error();}
		} as iListarAgendamentosService;

		const sut = new ListarAgendamentosCTER(serviceWithError);

		const httpRequest: HttpReq = {
			body: {
				id: "any_id"
			},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});
});