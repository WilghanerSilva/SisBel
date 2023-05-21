/* eslint-disable @typescript-eslint/no-unused-vars */
import LoginController from "../controllers/login-controller";
import HttpResponse from "../utils/helpers/htttp-response";
import { iLoginService, iEmailValidator } from "../utils/interfaces";
import { HttpReq } from "../utils/types/http-types";


describe("LoginController", () => {
  
	const makeLoginServiceSpy = () => {
		class LoginServiceSpy implements iLoginService {
			public token = "any_token";
      
			async auth(email: string, password: string) {
				return this.token;
			}
		}

		return new LoginServiceSpy();
	};

	const makeEmailValidatorSpy = () => {
		class EmailValidatorSpy implements iEmailValidator {
			public result = true;

			validateEmail(email: string){
				return this.result;
			}
		}

		return new EmailValidatorSpy;
	};

	const makeSut = () => {
		const emailValidator = makeEmailValidatorSpy();
		const loginService = makeLoginServiceSpy();

		const sut = new LoginController(loginService, emailValidator);
	
		return {
			emailValidator,
			loginService,
			sut
		};
	};

  
  
	test("É esperado que retorne 500 caso o emailValidator seja inválido", async () => {
		const loginService = makeLoginServiceSpy();
		const sut = new LoginController(loginService, {} as iEmailValidator);

		const httpRequest: HttpReq = {
			body: {
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toBe(500);
	});

	test("É esperado que retorne 500 caso o loginService seja inválido", async () => {
		const emailValidator = makeEmailValidatorSpy();
		const sut = new LoginController({} as iLoginService, emailValidator);

		const httpRequest: HttpReq = {
			body: {
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toBe(500);
	});

	test("É esperado que retorne 400 caso o campo email não seja passado", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				email: "",
				password: "any_password"
			},
			headers: {}
		};  

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(400);
		expect(httpResponse.body).toEqual(HttpResponse.badRequest("Email").body);
	});

	test("É esperado que retorne 400 caso o campo password não seja passado", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				email: "any_email@mail.com",
				password: ""
			},
			headers: {}
		};  

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(400);
		expect(httpResponse.body).toEqual(HttpResponse.badRequest("Password").body);
	});

	test("É esperado que retorne 500 caso o loginService lance um erro", async () => {
		const loginServiceWithError = {
			auth: (email: string, password: string) => {throw new Error("");}
		} as iLoginService;
		const emailValidator = makeEmailValidatorSpy();

		const sut = new LoginController(loginServiceWithError, emailValidator);

		const httpRequest: HttpReq = {
			body: {
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 500 caso o emailValidator lance um erro", async () => {
		const emailValidatorWithError = {
			validateEmail: (email: string) => {throw new Error();}
		} as iEmailValidator;
		const loginService = makeLoginServiceSpy();

		const sut = new LoginController(loginService, emailValidatorWithError);

		const httpRequest: HttpReq = {
			body: {
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 401 caso o email seja invalido", async () => {
		const {sut, emailValidator} = makeSut();
		emailValidator.result = false;

		const httpRequest: HttpReq = {
			body: {
				email: "invalid_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);
		expect(httpResponse.statusCode).toEqual(401);
		expect(httpResponse.body).toEqual(HttpResponse.unauthorized("O email fornecido é inválido").body);
	});

	test("É esperado que retorne 401 caso o LoginService não retorne nada", async () => {
		const {sut, loginService} = makeSut();

		loginService.token = "";

		const httpRequest: HttpReq = {
			body: {
				email: "any_email@mail.com",
				password: "wrong_password"
			},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
		expect(httpResponse.body).toEqual(HttpResponse.unauthorized("Senha ou email errados").body);
	});

	test("É esperado que retorne 200 se tudo ocorrer bem", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				email: "correct_email@mail.com",
				password: "correct_password"
			},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(200);
	});

});