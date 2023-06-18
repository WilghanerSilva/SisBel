import { Admin } from "@prisma/client";
import ObterDadosAdminCTER from "../controllers/obter-dados-admin-controller";
import iObterDadosAdminService from "../utils/interfaces/iObterDadosAdminService";
import { HttpReq } from "../utils/types/http-types";

describe("Obter Dados Admin Controller", () => {
	const makeServiceSpy = () => {
		class ObterDadosAdminSVCSpy implements iObterDadosAdminService {
			public obterResult = {
				message: "ok",
				admin: {
					id: "admin_id",
					nome: "any_name",
					email: "any_email@mail.com",
					perfil: "admin"
				}
			};
      
			async obter(): Promise<{ message: string; admin: Omit<Admin, "senha">; }> {
				return this.obterResult;
			}
		}

		return new ObterDadosAdminSVCSpy();
	};

	test("É esperado que retorne 500 caso o service seja inválido", async () => {
		const invalidService = {} as iObterDadosAdminService;
		const sut = new ObterDadosAdminCTER(invalidService);

		const httpRequest: HttpReq = {
			body: {},
			headers: {userId: "any_id"}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 500 caso o service lance um erro", async () => {
		const serviceWithError = {
			obter: () => {throw new Error();}
		};
		
		const sut = new ObterDadosAdminCTER(serviceWithError);

		const httpRequest: HttpReq = {
			body: {},
			headers: {userId: "any_id"}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 401 caso o service retorne um isNotAdmin", async () => {
		const serviceSpy = makeServiceSpy();
		serviceSpy.obterResult.message = "isNotAdmin";

		const sut = new ObterDadosAdminCTER(serviceSpy);
    
		const httpRequest: HttpReq = {
			body: {},
			headers: {userId: "any_id"}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
	});

	test("É esperado que retorne 200 e os dados do admin caso tudo ocorra bem", async () => {
		const serviceSpy = makeServiceSpy();
		const sut = new ObterDadosAdminCTER(serviceSpy);
    
		const httpRequest: HttpReq = {
			body: {},
			headers: {userId: "any_id"}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(200);
		expect(httpResponse.body.data).toEqual(serviceSpy.obterResult.admin);
	});
});