/* eslint-disable @typescript-eslint/no-unused-vars */
import CadastrarClienteCTER from "../controllers/cadastrar-cliente-controller";
import HttpResponse from "../utils/helpers/htttp-response";
import { iCadastrarClienteService, iEmailValidator } from "../utils/interfaces";
import { HttpReq } from "../utils/types/http-types";


describe("Cadastrar Cliente Controller", () => {

	const makeEmailValidatorSpy = () => {
		class EmailValidatorSpy implements iEmailValidator {
			public result = true;

			validateEmail(email: string){
				return this.result;
			}
		}

		return new EmailValidatorSpy;
	};


	const makeCadastrarClienteSVCSpy = () => {
		class CadastrarClienteSVCSpy implements iCadastrarClienteService {
			public cadastrarResult : {profile: string, token: string} | null = {
				profile: "any_profile",
				token: "any_token"
			};

			async cadastrar(email: string, name: string, phone: string, password: string): Promise<{profile: string, token: string}| null> {
				return this.cadastrarResult;
			}
		}

		return new CadastrarClienteSVCSpy;
	};


	const makeSut = () => {
		const emailValidatorSpy = makeEmailValidatorSpy();
		const cadastrarClienteSVCSpy = makeCadastrarClienteSVCSpy();

		const sut = new CadastrarClienteCTER(emailValidatorSpy, cadastrarClienteSVCSpy);

		return {
			emailValidatorSpy, 
			cadastrarClienteSVCSpy, 
			sut
		};
	};

	test("É esperado que retorne 400 caso o campo email esteja vazio", async () => {
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

		const httpRes = await sut.run(httpRequest);

		expect(httpRes.statusCode).toEqual(400);
		expect(httpRes.body).toEqual(HttpResponse.badRequest("Email").body);
	});

	test("É esperado que retorne 400 caso o campo name esteja vazio", async ()=> {
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

		const httpRes = await sut.run(httpRequest);

		expect(httpRes.statusCode).toEqual(400);
		expect(httpRes.body).toEqual(HttpResponse.badRequest("Name").body);
	});

	test("É esperado que retorne 400 caso o campe phone esteja vazio", async () => {
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

		const httpRes = await sut.run(httpRequest);

		expect(httpRes.statusCode).toEqual(400);
		expect(httpRes.body).toEqual(HttpResponse.badRequest("Phone").body);
	});

	test("É esperado que retorne 400 caso o campo password esteja vazio", async () => {
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

		const httpRes = await sut.run(httpRequest);

		expect(httpRes.statusCode).toEqual(400);
		expect(httpRes.body).toEqual(HttpResponse.badRequest("Password").body);
	});

	test("É esperado que retorne 500 caso o emailValidator seja invalido", async () => {
		const invalidEmailValidator = {} as iEmailValidator;
		const cadastrarClienteService = makeCadastrarClienteSVCSpy();

		const sut = new CadastrarClienteCTER(invalidEmailValidator, cadastrarClienteService);

		const httpRequest: HttpReq = {
			body: {
				name: "Any name",
				phone: "8840028922",
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 500 caso o CadastrarClienteService seja invalido", async () => {
		const emailValidator = makeEmailValidatorSpy();
		const cadastrarClienteService = {} as iCadastrarClienteService;

		const sut = new CadastrarClienteCTER(emailValidator, cadastrarClienteService);

		const httpRequest: HttpReq = {
			body: {
				name: "Any name",
				phone: "8840028922",
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 500 caso o emailValidator lance um erro", async() => {
		const emailValidatorWithError = {
			validateEmail : (email: string) => {throw new Error();}
		} as iEmailValidator;

		const cadastrarClienteSVCSpy = makeCadastrarClienteSVCSpy();
    
		const sut = new CadastrarClienteCTER(emailValidatorWithError, cadastrarClienteSVCSpy);

		const httpRequest: HttpReq = {
			body: {
				name: "Any name",
				phone: "8840028922",
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);
    
		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 500 caso o cadastrarClienteService lance um erro", async() => {
		const emailValidator = makeEmailValidatorSpy();
		const cadastrarClienteServiceWithError = {
			cadastrar: 
        ( email: string, name: string, phone: string, password: string ) => { throw new Error();}
		} as iCadastrarClienteService;
    
		const sut = new CadastrarClienteCTER(emailValidator, cadastrarClienteServiceWithError);

		const httpRequest: HttpReq = {
			body: {
				name: "Any name",
				phone: "8840028922",
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 401 caso o emailValidator retorne false", async () => {
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

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
		expect(httpResponse.body).toEqual(HttpResponse.unauthorized("O email fornecido é invalido").body);

	});

	test("É esperado que retorne 401 caso cadastrarClienteService retorne nulo", async () => {
		const {sut, cadastrarClienteSVCSpy} = makeSut();

		cadastrarClienteSVCSpy.cadastrarResult = null;

		const httpRequest: HttpReq = {
			body: {
				name: "Any name",
				phone: "8840028922",
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
		expect(httpResponse.body).toEqual(HttpResponse.unauthorized("O email fornecido já foi cadastrado").body);
	});

	test("É esperado que retorne 200 e um token caso tudo esteja correto", async () => {
		const {sut, cadastrarClienteSVCSpy} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "Any name",
				phone: "8840028922",
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(200);
		expect(httpResponse.body).toEqual(HttpResponse.ok({...cadastrarClienteSVCSpy.cadastrarResult}).body);
	});

});