import LoginCTER from "../controllers/login-controller";
import HttpResponse from "../utils/helpers/htttp-response";
import { iLoginService, iEmailValidator } from "../utils/interfaces";
import { HttpReq } from "../utils/types/http-types";


describe("Login Controller", () => {  //Definição do suite de teste, nesse caso o teste está relacioando ao Login Controller
  
	//Função que retorna uma instância de uma classe que simula as dependências da classe testada
	const makeLoginSVCSpy = () => {

		//definição da classe false
		class LoginSVCSpy implements iLoginService {
      
			//atributo que será usado como retorno na função simulada
			//a definição desse atributo permite que nos testes o retorno da função false seja manipulado
			public token: {profile: string, token: string} | null = {profile: "any_profile", token: "any_token"};
      
			async auth() {
				return this.token;
			}
		}


		//retorno de uma nova instância da classe simulada
		return new LoginSVCSpy();
	};

	//Outra dependência simulada
	const makeEmailValidatorSpy = () => {
		class EmailValidatorSpy implements iEmailValidator {
			public result = true;

			validateEmail(){
				return this.result;
			}
		}

		return new EmailValidatorSpy;
	};

	//função que retorna todas as dependências simuladas e uma nova instância da classe que está sendo testada
	//Essa instancia da classe testada é chamada de SUT (System Under Test)
	//As falsas dependências são criadas para que possamos testar como a classe testada se comporta de acordo com os possíveis
	//retornos de cada dependência
	const makeSut = () => {
		const emailValidator = makeEmailValidatorSpy();
		const loginService = makeLoginSVCSpy();

		const sut = new LoginCTER(loginService, emailValidator);
	
		return {
			emailValidator,
			loginService,
			sut
		};
	};

  
	//Aqui temos um caso de teste, o teste é realizado pela função test que recebe dois parâmetros,
	//o primeiro é a descrição do teste, no caso deste é esperado um código http 500 caso a classe seja montada
	//com uma dependência inválida. No segundo parâmetro é passado uma arrow function assíncrona onde o teste de fato será realizado
	test("É esperado que retorne 500 caso o emailValidator seja inválido", async () => {
		const loginService = makeLoginSVCSpy(); //instanciação da dependencia falsa


		//criação de uma nova instância da classe que está sendo testada, porém com a dependência emailValidator inválida
		const sut = new LoginCTER(loginService, {} as iEmailValidator);
                                                                    

		//criação do objeto httpRequest que será passado como parâmetro na chamada do método run da classe testada
		const httpRequest: HttpReq = {
			body: {
				email: "any_email@mail.com",
				password: "any_password"
			},
			headers: {}
		};

		//criação de uma variável que guardará o retorno do método testado
		const httpResponse = await sut.run(httpRequest);


		//teste de fato, a função expect irá testar se o retorno está de acordo com o esperado
		//Nesse caso, é esperado que o statusCode do response seja igual 500
		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 500 caso o loginService seja inválido", async () => {
		const emailValidator = makeEmailValidatorSpy();
		const sut = new LoginCTER({} as iLoginService, emailValidator);

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
			auth: () => {throw new Error("");}
		} as iLoginService;
		const emailValidator = makeEmailValidatorSpy();

		const sut = new LoginCTER(loginServiceWithError, emailValidator);

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
			validateEmail: () => {throw new Error();}
		} as iEmailValidator;
		const loginService = makeLoginSVCSpy();

		const sut = new LoginCTER(loginService, emailValidatorWithError);

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

		loginService.token = null;

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