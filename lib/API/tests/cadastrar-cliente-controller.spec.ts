import CadastrarClienteController from "../controllers/cadastrar-cliente-controller";
import HttpResponse from "../utils/helpers/htttp-response";
import { iCadastrarClienteService, iEmailValidator } from "../utils/interfaces";
import { HttpReq } from "../utils/types/http-types";

describe("Cadatrar Cliente Controller", () => {

	class EmailValidatorSpy implements iEmailValidator {
		public result = true;

		validateEmail(email: string){
			return this.result;
		}
	}

	class CadastrarClienteServiceSpy implements iCadastrarClienteService {
		public result = true;
		async cadastrar(email: string, name: string, password: string, phoneNumber: string): Promise<boolean> {
			return this.result;
		}
	}


	const makeSut = () => {
		const emailValidatorSpy = new EmailValidatorSpy();
		const cadastrarClienteServiceSpy = new CadastrarClienteServiceSpy();

		const sut = new CadastrarClienteController(emailValidatorSpy, cadastrarClienteServiceSpy);

		return {
			emailValidatorSpy, 
			cadastrarClienteServiceSpy, 
			sut
		};
	};

	it("É esperado que retorne 400 caso o campo email esteja vazio", async () => {
		const {sut} = makeSut();

		const httpReq: HttpReq = {
			body: {
				name: "any_name",
				phone: "8840028922",
				email: "",
				password: "any_password",
			},
			headers: {}
		};

		const httpRes = await sut.route(httpReq);

		expect(httpRes.statusCode).toEqual(400);
		expect(httpRes.body).toEqual(HttpResponse.badRequest("Email").body);
	});

	it("É esperado que retorne 400 caso o campo name esteja vazio", async ()=> {
		const {sut} = makeSut();

		const httpReq: HttpReq = {
			body: {
				name: "",
				phone: "8840028922",
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpRes = await sut.route(httpReq);

		expect(httpRes.statusCode).toEqual(400);
		expect(httpRes.body).toEqual(HttpResponse.badRequest("Name").body);
	});

	it("É esperado que retorne 400 caso o campe phone esteja vazio", async () => {
		const {sut} = makeSut();

		const httpReq: HttpReq = {
			body: {
				name: "Any name",
				phone: "",
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpRes = await sut.route(httpReq);

		expect(httpRes.statusCode).toEqual(400);
		expect(httpRes.body).toEqual(HttpResponse.badRequest("Phone").body);
	});

	it("É esperado que retorne 400 caso o campo password esteja vazio", async () => {
		const {sut} = makeSut();

		const httpReq: HttpReq = {
			body: {
				name: "Any name",
				phone: "8840028922",
				email: "any_email@mail.com",
				password: ""
			},
			headers: {}
		};

		const httpRes = await sut.route(httpReq);

		expect(httpRes.statusCode).toEqual(400);
		expect(httpRes.body).toEqual(HttpResponse.badRequest("Password").body);
	});
});