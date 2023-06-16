import { iObterDadosClienteService } from "../utils/interfaces";
import { User } from "../utils/types/user-types";
import ObterDadosClienteCTER from "../controllers/obter-dados-cliente-controller";
import { HttpReq } from "../utils/types/http-types";

describe("Obter Dados Cliente Controller", () => {
	const makeServiceSpy = () => {
		class ObterDadosClienteSVCSpy implements iObterDadosClienteService {
			public obterResult: User | undefined = {
				id: "any_id",
				name: "any_name",
				email: "any_email@mail.com",
				profile: "cliente",
				phone: "(85) 985559895"
			};
      
			async obter(): Promise<User | undefined> {
				return this.obterResult;
			}
		}

		return new ObterDadosClienteSVCSpy();
	};

	const makeSut = () => {
		const obterDadosClienteSVC = makeServiceSpy();
		const sut = new ObterDadosClienteCTER(obterDadosClienteSVC);
	
		return {
			obterDadosClienteSVC,
			sut
		};
	};

	test("É esperado que retorne 500 caso o service seja inválido", async () => {
		const invalidService = {} as iObterDadosClienteService;
		const sut = new ObterDadosClienteCTER(invalidService);

		const httpRequest:HttpReq = {
			body: {},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);

	});

	test("É esperado que retorne 500 caso não tenha um userId nos headers", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 500 caso o service não retorne um usuário", async () => {
		const {sut, obterDadosClienteSVC} = makeSut();

		obterDadosClienteSVC.obterResult = undefined;

		const httpRequest: HttpReq = {
			body: {},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 200 e o usuário se tudo ocorrer bem", async () => {
		const {sut, obterDadosClienteSVC} = makeSut();
    
		const httpRequest: HttpReq = {
			body: {},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(200);
		expect(httpResponse.body.data).toEqual(obterDadosClienteSVC.obterResult);
	});

	test("É esperado que retorne 500 caso o service lance um erro",async () => {
		const serviceWithError = {
			obter: () => {throw new Error();}
		} as iObterDadosClienteService;

		const sut = new ObterDadosClienteCTER(serviceWithError);

		const httpRequest: HttpReq = {
			body: {},
			headers: {
				userId: "any_id"
			}
		};

		const httpReponse = await sut.run(httpRequest);

		expect(httpReponse.statusCode).toEqual(500);

	});
});
