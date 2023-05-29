import CadastrarFuncionarioCTER from "../controllers/cadastrar-funcionario-controller";
import HttpResponse from "../utils/helpers/htttp-response";
import { iCadastrarFuncionarioService, iEmailValidator } from "../utils/interfaces";
import { HttpReq } from "../utils/types/http-types";

describe("Cadastrar Funcionario Controller", () => {
	const makeEmailValidatorSpy = () => {
		class EmailValidatorSpy implements iEmailValidator {
			public result = true;

			validateEmail(){
				return this.result;
			}
		}

		return new EmailValidatorSpy();
	};

	const makeCadastrarFuncionarioSVCSpy = () => {
		class CadastrarFuncionarioSVCSpy implements iCadastrarFuncionarioService {
			public result = "";

			async cadastrar(): Promise<string> {
				return this.result;
			}
		}

		return new CadastrarFuncionarioSVCSpy();
	};

	const makeSut = () => {
		const emailValidator = makeEmailValidatorSpy();
		const cadastrarFuncionarioService = makeCadastrarFuncionarioSVCSpy();

		const sut = new CadastrarFuncionarioCTER(
			emailValidator,
			cadastrarFuncionarioService
		);

		return {
			emailValidator,
			cadastrarFuncionarioService,
			sut
		};
	};


	test("É esperado que retorne 500 caso o EmailValidator seja inválido", async () => {
		const invalidEmailValidator = {} as iEmailValidator;
		const cadastrarFuncionarioService = makeCadastrarFuncionarioSVCSpy();

		const sut = new CadastrarFuncionarioCTER(
			invalidEmailValidator,
			cadastrarFuncionarioService
		);

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				email: "any_email@mail.com",
				password: "any_password",
				phone: "any_password",
				birthDate: "20/05/2000",
				cpf: "666.222.555-88",
				adress: "Bairro tanto faz, Rua nao importa",
				city: "Tianguá"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 500 caso o CadastrarFuncionarioService seja inválido", async () => {
		const emailValidator = makeEmailValidatorSpy();
		const invalidCadastrarFuncionarioService = {} as iCadastrarFuncionarioService;

		const sut = new CadastrarFuncionarioCTER(
			emailValidator,
			invalidCadastrarFuncionarioService
		);

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				email: "any_email@mail.com",
				password: "any_password",
				phone: "any_password",
				birthDate: "20/05/2000",
				cpf: "666.222.555-88",
				adress: "Bairro tanto faz, Rua nao importa",
				city: "Tianguá"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 400 caso o campo name esteja em falta", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "",
				email: "any_email@mail.com",
				password: "any_password",
				phone: "any_password",
				birthDate: "20/05/2000",
				cpf: "666.222.555-88",
				adress: "Bairro tanto faz, Rua nao importa",
				city: "Tianguá"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);
		expect(httpResponse.statusCode).toEqual(400);
		expect(httpResponse.body)
			.toEqual(HttpResponse.badRequest("Name").body);
    
	});

	test("É esperado que retorne 400 caso o campo email esteja em falta", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				email: "",
				password: "any_password",
				phone: "any_password",
				birthDate: "20/05/2000",
				cpf: "666.222.555-88",
				adress: "Bairro tanto faz, Rua nao importa",
				city: "Tianguá"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);
		expect(httpResponse.statusCode).toEqual(400);
		expect(httpResponse.body)
			.toEqual(HttpResponse.badRequest("Email").body);
    
	});

	test("É esperado que retorne 400 caso o campo password esteja em falta", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				email: "any_email@mail.com",
				password: "",
				phone: "(88) 94002-8922",
				birthDate: "20/05/2000",
				cpf: "666.222.555-88",
				adress: "Bairro tanto faz, Rua nao importa",
				city: "Tianguá"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);
		expect(httpResponse.statusCode).toEqual(400);
		expect(httpResponse.body)
			.toEqual(HttpResponse.badRequest("Password").body);
	});

	test("É esperado que retorne 400 caso o campo phone esteja em falta", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				email: "any_email@mail.com",
				password: "any_password",
				phone: "",
				birthDate: "20/05/2000",
				cpf: "666.222.555-88",
				adress: "Bairro tanto faz, Rua nao importa",
				city: "Tianguá"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);
		expect(httpResponse.statusCode).toEqual(400);
		expect(httpResponse.body)
			.toEqual(HttpResponse.badRequest("Phone").body);
    
	});

	test("É esperado que retorne 400 caso o campo birthDate esteja em falta", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				email: "any_email@mail.com",
				password: "any_password",
				phone: "(88) 94002-8922",
				birthDate: "",
				cpf: "666.222.555-88",
				adress: "Bairro tanto faz, Rua nao importa",
				city: "Tianguá"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);
		expect(httpResponse.statusCode).toEqual(400);
		expect(httpResponse.body)
			.toEqual(HttpResponse.badRequest("Birth Date").body);
    
	});

	test("É esperado que retorne 400 caso o campo cpf esteja em falta", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				email: "any_email@mail.com",
				password: "any_password",
				phone: "(88) 94002-8922",
				birthDate: "20/05/2000",
				cpf: "",
				adress: "Bairro tanto faz, Rua nao importa",
				city: "Tianguá"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);
		expect(httpResponse.statusCode).toEqual(400);
		expect(httpResponse.body)
			.toEqual(HttpResponse.badRequest("CPF").body);
    
	});

	test("É esperado que retorne 400 caso o campo adress esteja em falta", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				email: "any_email@mail.com",
				password: "any_password",
				phone: "(88) 94002-8922",
				birthDate: "20/05/2000",
				cpf: "666.222.555-88",
				adress: "",
				city: "Tianguá"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);
		expect(httpResponse.statusCode).toEqual(400);
		expect(httpResponse.body)
			.toEqual(HttpResponse.badRequest("Adress").body);
    
	});

	test("É esperado que retorne 400 caso o campo city esteja em falta", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				email: "any_email@mail.com",
				password: "any_password",
				phone: "(88) 94002-8922",
				birthDate: "20/05/2000",
				cpf: "666.222.555-88",
				adress: "Bairro tanto faz, Rua não importa",
				city: ""
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);
		expect(httpResponse.statusCode).toEqual(400);
		expect(httpResponse.body)
			.toEqual(HttpResponse.badRequest("City").body);
    
	});

	test("É esperado que retorne 401 caso não haja um userId nos headers", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				email: "any_email@mail.com",
				password: "any_password",
				phone: "(88) 94002-8922",
				birthDate: "20/05/2000",
				cpf: "666.222.555-88",
				adress: "Bairro tanto faz, Rua não importa",
				city: "Tianguá"
			},
			headers: {
				userId: ""
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
		expect(httpResponse.body).toEqual(HttpResponse.unauthorized("Id faltando").body);
	});

	test("É esperado que retorne 401 caso o email seja invalido", async () => {
		const {sut, emailValidator} = makeSut();
		emailValidator.result = false;

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				email: "any_email@mail.com",
				password: "any_password",
				phone: "(88) 94002-8922",
				birthDate: "20/05/2000",
				cpf: "666.222.555-88",
				adress: "Bairro tanto faz, Rua não importa",
				city: "Tianguá"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
		expect(httpResponse.body)
			.toEqual(HttpResponse.unauthorized("Email inválido").body);
	});

	test("É esperado que retorne 401 caso o service detecte que  usuário não é admin", async () => {
		const {sut, cadastrarFuncionarioService} = makeSut();

		cadastrarFuncionarioService.result = "isNotAdmin";

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				email: "any_email@mail.com",
				password: "any_password",
				phone: "(88) 94002-8922",
				birthDate: "20/05/2000",
				cpf: "666.222.555-88",
				adress: "Bairro tanto faz, Rua não importa",
				city: "Tianguá"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
		expect(httpResponse.body)
			.toEqual(HttpResponse.unauthorized("O usuário não é um admin").body);
	});

	test("É esperado que retorne 401 caso o service detecte que o email já está sendo utilizado", async () => {
		const {sut, cadastrarFuncionarioService} = makeSut();

		cadastrarFuncionarioService.result = "emailInUse";

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				email: "any_email@mail.com",
				password: "any_password",
				phone: "(88) 94002-8922",
				birthDate: "20/05/2000",
				cpf: "666.222.555-88",
				adress: "Bairro tanto faz, Rua não importa",
				city: "Tianguá"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
		expect(httpResponse.body)
			.toEqual(HttpResponse.unauthorized("O email já foi utilizado em outra conta").body);
	});

	test("É esperado que retorne 401 caso o service detecte que o cpf é inválido", async () => {
		const {sut, cadastrarFuncionarioService} = makeSut();

		cadastrarFuncionarioService.result = "invalidCPF";

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				email: "any_email@mail.com",
				password: "any_password",
				phone: "(88) 94002-8922",
				birthDate: "20/05/2000",
				cpf: "666.222.555-88",
				adress: "Bairro tanto faz, Rua não importa",
				city: "Tianguá"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
		expect(httpResponse.body)
			.toEqual(HttpResponse.unauthorized("O cpf é inválido").body);
	});

	test("É espero que retorne 200 caso tudo ocorra bem", async ()=> {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				email: "any_email@mail.com",
				password: "any_password",
				phone: "(88) 94002-8922",
				birthDate: "20/05/2000",
				cpf: "666.222.555-88",
				adress: "Bairro tanto faz, Rua não importa",
				city: "Tianguá"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(200);
	});

	test("É esperado que retorne 500 caso o emailValidator ou o service lancem um erro", async () => {
		const serviceWithError = {
			cadastrar: () => {throw new Error();}
		} as iCadastrarFuncionarioService;

		const emailValidator = makeEmailValidatorSpy();
		const sut = new CadastrarFuncionarioCTER(emailValidator, serviceWithError);

		const httpRequest: HttpReq = {
			body: {
				name: "any_name",
				email: "any_email@mail.com",
				password: "any_password",
				phone: "(88) 94002-8922",
				birthDate: "20/05/2000",
				cpf: "666.222.555-88",
				adress: "Bairro tanto faz, Rua não importa",
				city: "Tianguá"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});
});