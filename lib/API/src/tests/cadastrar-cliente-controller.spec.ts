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
			public token = "valid_token";

			async cadastrar(email: string, name: string, phone: string, password: string): Promise<string | undefined> {
				return this.token;
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

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				phone: "8840028922",
				email: "",
				password: "any_password",
			},
			headers: {}
		};

		const httpRes = await sut.route(httpRequest);

		expect(httpRes.statusCode).toEqual(400);
		expect(httpRes.body).toEqual(HttpResponse.badRequest("Email").body);
	});

	it("É esperado que retorne 400 caso o campo name esteja vazio", async ()=> {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "",
				phone: "8840028922",
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpRes = await sut.route(httpRequest);

		expect(httpRes.statusCode).toEqual(400);
		expect(httpRes.body).toEqual(HttpResponse.badRequest("Name").body);
	});

	it("É esperado que retorne 400 caso o campe phone esteja vazio", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "Any name",
				phone: "",
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpRes = await sut.route(httpRequest);

		expect(httpRes.statusCode).toEqual(400);
		expect(httpRes.body).toEqual(HttpResponse.badRequest("Phone").body);
	});

	it("É esperado que retorne 400 caso o campo password esteja vazio", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "Any name",
				phone: "8840028922",
				email: "any_email@mail.com",
				password: ""
			},
			headers: {}
		};

		const httpRes = await sut.route(httpRequest);

		expect(httpRes.statusCode).toEqual(400);
		expect(httpRes.body).toEqual(HttpResponse.badRequest("Password").body);
	});

	it("É esperado que retorne 500 caso o emailValidator seja invalido", async () => {
		const invalidEmailValidator = {} as iEmailValidator;
		const cadastrarClienteService = makeCadastrarClienteServiceSpy();

		const sut = new CadastrarClienteController(invalidEmailValidator, cadastrarClienteService);

		const httpRequest: HttpReq = {
			body: {
				name: "Any name",
				phone: "8840028922",
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.route(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	it("É esperado que retorne 500 caso o CadastrarClienteService seja invalido", async () => {
		const emailValidator = makeEmailValidatorSpy();
		const cadastrarClienteService = {} as iCadastrarClienteService;

		const sut = new CadastrarClienteController(emailValidator, cadastrarClienteService);

		const httpRequest: HttpReq = {
			body: {
				name: "Any name",
				phone: "8840028922",
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.route(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	it("É esperado que retorne 500 caso o emailValidator lance um erro", async() => {
		const emailValidatorWithError = {
			validateEmail : (email: string) => {throw new Error();}
		} as iEmailValidator;

		const cadastrarClienteServiceSpy = makeCadastrarClienteServiceSpy();
    
		const sut = new CadastrarClienteController(emailValidatorWithError, cadastrarClienteServiceSpy);

		const httpRequest: HttpReq = {
			body: {
				name: "Any name",
				phone: "8840028922",
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.route(httpRequest);
    
		expect(httpResponse.statusCode).toEqual(500);
	});

	it("É esperado que retorne 500 caso o cadastrarClienteService lance um erro", async() => {
		const emailValidator = makeEmailValidatorSpy();
		const cadastrarClienteServiceWithError = {
			cadastrar: 
        ( email: string, name: string, phone: string, password: string ) => { throw new Error();}
		} as iCadastrarClienteService;
    
		const sut = new CadastrarClienteController(emailValidator, cadastrarClienteServiceWithError);

		const httpRequest: HttpReq = {
			body: {
				name: "Any name",
				phone: "8840028922",
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.route(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	it("É esperado que retorne 401 caso o emailValidator retorne false", async () => {
		const {sut, emailValidatorSpy} = makeSut();

		emailValidatorSpy.result = false;

		const httpRequest: HttpReq = {
			body: {
				name: "Any name",
				phone: "8840028922",
				email: "invalid_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.route(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
		expect(httpResponse.body).toEqual(HttpResponse.unauthorized("Invalid Email").body);

	});

	it("É esperado que retorne 401 caso cadastrarClienteService retorne nulo", async () => {
		const {sut, cadastrarClienteServiceSpy} = makeSut();

		cadastrarClienteServiceSpy.token = "";

		const httpRequest: HttpReq = {
			body: {
				name: "Any name",
				phone: "8840028922",
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.route(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
		expect(httpResponse.body).toEqual(HttpResponse.unauthorized("Email in use").body);
	});

	it("É esperado que retorne 200 e um token caso tudo esteja correto", async () => {
		const {sut, cadastrarClienteServiceSpy} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "Any name",
				phone: "8840028922",
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.route(httpRequest);

		expect(httpResponse.statusCode).toEqual(200);
		expect(httpResponse.body).toEqual(HttpResponse.ok({token: cadastrarClienteServiceSpy.token}).body);
	});

});