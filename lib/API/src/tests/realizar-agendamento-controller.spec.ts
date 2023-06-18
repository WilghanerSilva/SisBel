import RealizarAgendamentoCTER from "../controllers/realizar-agendamento-controller";
import HttpResponse from "../utils/helpers/htttp-response";
import { iRealizarAgendamentoSVC } from "../utils/interfaces";
import { HttpReq } from "../utils/types/http-types";

describe("Realizar Agendamento Controller", () => {
	const makeServiceSpy = () => {
		class RealizarAgendamentoSVCSpy implements iRealizarAgendamentoSVC {
			public result = "ok";
      
			async agendar(): Promise<string> {
				return this.result;
			}
		}

		return new RealizarAgendamentoSVCSpy();
	};


	const makeSut = () => {
		const service = makeServiceSpy();
		const sut = new RealizarAgendamentoCTER(service);

		return {service, sut};
	};


	test("É esperado que retorne 500 caso o service seja inválido", async () => {
		const invalidService = {} as iRealizarAgendamentoSVC;
		const sut = new RealizarAgendamentoCTER(invalidService);

		const httpRequest: HttpReq = {
			body: {
				servicoId: "any_servico_id",
				funcionarioId: "any_id",
				date: new Date(2000, 5, 6),
				time: "08:00",
				details: ""
			},
			headers: { userId: "any_id"}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 400 caso o campo date não seja passado", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				servicoId: "any_servico_id",
				funcionarioId: "any_id",
				time: "08:00",
				details: ""
			},
			headers: { userId: "any_id"}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(400);
		expect(httpResponse.body).toEqual(HttpResponse.badRequest("Date").body);
	});

	test("É esperado que retorne 400 caso o campo time não seja passado", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				servicoId: "any_servico_id",
				funcionarioId: "any_id",
				date: new Date(2000, 5, 6),
				details: ""
			},
			headers: { userId: "any_id"}
		};
    
		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(400);
		expect(httpResponse.body).toEqual(HttpResponse.badRequest("Time").body);
	});

	test("É esperado que retorne 400 caso o campo funcionarioId não seja passado", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				servicoId: "any_servico_id",
				date: new Date(2000, 5, 6),
				time: "08:00",
				details: ""
			},
			headers: { userId: "any_id"}
		};
    
		const httpResponse = await sut.run(httpRequest);

		console.log(httpResponse.body);
		expect(httpResponse.statusCode).toEqual(400);
		expect(httpResponse.body).toEqual(HttpResponse.badRequest("Funcionario Id").body);
	});

	test("É esperado que retorne 400 caso o campo userId esteja vazio", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				servicoId: "any_servico_id",
				funcionarioId: "any_id",
				date: new Date(2000, 5, 6),
				time: "08:00",
				details: ""
			},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
	});

	test("É esperado que retorne 401 caso o service retorne invalidDate", async () => {
		const {sut, service} = makeSut();

		service.result = ("InvalidDate");

		const httpRequest: HttpReq = {
			body: {
				servicoId: "any_servico_id",
				funcionarioId: "any_id",
				date: new Date(2000, 1, 6),
				time: "08:00",
				details: ""
			},
			headers: { userId: "any_id"}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);

	});

	test("É esperado que retorne 401 caso o service retorne BusyHours", async () => {
		const {sut, service} = makeSut();

		service.result = "BusyHours";

		const httpRequest: HttpReq = {
			body: {
				servicoId: "any_servico_id",
				funcionarioId: "any_id",
				date: new Date(2000, 5, 6),
				time: "08:00",
				details: ""
			},
			headers: { userId: "any_id"}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
	});

	test("É esperado que retorne 500 caso o service lance um erro", async () => {
		const serviceWithError = {
			agendar: () => {throw new Error();}
		} as iRealizarAgendamentoSVC;

		const sut = new RealizarAgendamentoCTER(serviceWithError);

		const httpRequest: HttpReq = {
			body: {
				servicoId: "any_servico_id",
				funcionarioId: "any_id",
				date: new Date(2000, 5, 6),
				time: "08:00",
				details: ""
			},
			headers: { userId: "any_id"}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 200 caso tudo ocorra bem", async () => {
		const {sut} = makeSut();
    
		const httpRequest: HttpReq = {
			body: {
				servicoId: "any_servico_id",
				funcionarioId: "any_id",
				date: new Date(2000, 5, 6),
				time: "08:00",
				details: ""
			},
			headers: { userId: "any_id"}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(200);
	});
});