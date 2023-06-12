import ListarHorariosCTER from "../controllers/listar-horarios-controller";
import HttpResponse from "../utils/helpers/htttp-response";
import { iListarHorariosService } from "../utils/interfaces";
import { HttpReq } from "../utils/types/http-types";

describe("Listar Horarios Controller", () => {
	const makeServiceSpy = () => {
		class ListarHorariosSVCSpy implements iListarHorariosService {
			public listarResult = ["08:00", " 10:00", "12:00", "14:00"];

			async listar(): Promise<string[]> {
				return this.listarResult;
			}
		}

		return new ListarHorariosSVCSpy();
	};

	const makeSut = () => {
		const listarHorariosSVC = makeServiceSpy();
		const sut = new ListarHorariosCTER(listarHorariosSVC);

		return {listarHorariosSVC, sut};
	};

	test("É esperado que retorne 500 caso o service seja inválido", async () => {
		const sut = new ListarHorariosCTER({} as iListarHorariosService);
    
		const httpRequest : HttpReq  = {
			body: {
				date: "2023-06-12",
				funcionarioId: "any_id"
			},
			headers: {
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 400 caso o campo date esteja vazio", async () => {
		const {sut} = makeSut();

		const httpRequest : HttpReq  = {
			body: {
				date: "",
				funcionarioId: "any_id"
			},
			headers: {
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(400);
		expect(httpResponse.body).toEqual(HttpResponse.badRequest("Date").body);
	});

	test("É esperado que retorne 400 caso o campo funcionarioId esteja vazio", async () => {
		const {sut} = makeSut();

		const httpRequest : HttpReq  = {
			body: {
				date: "2023-06-12",
				funcionarioId: ""
			},
			headers: {
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(400);
		expect(httpResponse.body).toEqual(HttpResponse.badRequest("FuncionarioId").body);
	});

	test("É esperado que retorne 200 e os horários caso tudo ocorra bem", async () => {
		const {sut, listarHorariosSVC} = makeSut();

		const httpRequest : HttpReq  = {
			body: {
				date: "2023-06-12",
				funcionarioId: "any_id"
			},
			headers: {
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(200);
		expect(httpResponse.body.data).toEqual(listarHorariosSVC.listarResult);
	});

	test("É esperado que retorne 500 caso o service lance um erro", async () => {
		const serviceWithError = {
			listar: () => {throw new Error();}
		} as iListarHorariosService;

		const sut = new ListarHorariosCTER(serviceWithError);

		const httpRequest : HttpReq  = {
			body: {
				date: "2023-06-12",
				funcionarioId: "any_id"
			},
			headers: {
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
    
	});
});