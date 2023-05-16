import CadastrarClienteController from "../controllers/cadastrar-cliente-controller";
import HttpResponse from "../utils/helpers/htttp-response";
import { iCadastrarClienteService, iEmailValidator } from "../utils/interfaces";
import { HttpReq } from "../utils/types/http-types";

describe("Cadatrar Cliente Controller", () => {

	const makeEmailValidatorSpy = () => {
		class EmailValidatorSpy implements iEmailValidator {
			public result = true;

			validateEmail(email: string){
				return this.result;
			}
		}

		return new EmailValidatorSpy;
	};


	const makeCadastrarClienteServiceSpy = () => {
		class CadastrarClienteServiceSpy implements iCadastrarClienteService {
			public result = true;
			async cadastrar(email: string, name: string, password: string, phoneNumber: string): Promise<boolean> {
				return this.result;
			}
		}

		return new CadastrarClienteServiceSpy;
	};


	const makeSut = () => {
		const emailValidatorSpy = makeEmailValidatorSpy();
		const cadastrarClienteServiceSpy = makeCadastrarClienteServiceSpy();

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

	it("É esperado que retorne 500 caso o emailValidator seja invalido", async () => {
		const invalidEmailValidator = {} as iEmailValidator;
		const cadastrarClienteService = makeCadastrarClienteServiceSpy();

		const sut = new CadastrarClienteController(invalidEmailValidator, cadastrarClienteService);

		const httpReq: HttpReq = {
			body: {
				name: "Any name",
				phone: "8840028922",
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.route(httpReq);

		expect(httpResponse.statusCode).toEqual(500);
	});

	it("É esperado que retorne 500 caso o CadastrarClienteService seja invalido", async () => {
		const emailValidator = makeEmailValidatorSpy();
		const cadastrarClienteService = {} as iCadastrarClienteService;

		const sut = new CadastrarClienteController(emailValidator, cadastrarClienteService);

		const httpReq: HttpReq = {
			body: {
				name: "Any name",
				phone: "8840028922",
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.route(httpReq);

		expect(httpResponse.statusCode).toEqual(500);
	});
});