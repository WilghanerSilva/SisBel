import { iListarFuncionariosService } from "../utils/interfaces";
import ListarFuncionariosCTER from "../controllers/listar-funcionarios-controller";
import { HttpReq } from "../utils/types/http-types";
import { Funcionario } from "@prisma/client";

describe("Listar Funcionarios Controller", () => {
	const makeServiceSpy = () => {
		class ListarFuncionariosSVCSpy implements iListarFuncionariosService {
			public listarResult: Omit<Funcionario, "senha">[] = [
				{
					cidade: "any_city",
					cpf: "888.888.888-86",
					dataNascimento: "2000-08-05",
					email: "any_email@mail.com",
					endereco: "Bairro tanto faz, rua tanto fez",
					id: "any_id",
					nome: "any_name",
					perfil: "funcionario",
					telefone: "(88) 88888888" 
				},
				{
					cidade: "any_city",
					cpf: "888.888.888-86",
					dataNascimento: "2000-08-05",
					email: "any_email@mail.com",
					endereco: "Bairro tanto faz, rua tanto fez",
					id: "any_id",
					nome: "any_name",
					perfil: "funcionario",
					telefone: "(88) 88888888" 
				},
				{
					cidade: "any_city",
					cpf: "888.888.888-86",
					dataNascimento: "2000-08-05",
					email: "any_email@mail.com",
					endereco: "Bairro tanto faz, rua tanto fez",
					id: "any_id",
					nome: "any_name",
					perfil: "funcionario",
					telefone: "(88) 88888888" 
				},
				{
					cidade: "any_city",
					cpf: "888.888.888-86",
					dataNascimento: "2000-08-05",
					email: "any_email@mail.com",
					endereco: "Bairro tanto faz, rua tanto fez",
					id: "any_id",
					nome: "any_name",
					perfil: "funcionario",
					telefone: "(88) 88888888" 
				},
			];

			async listar(): Promise<Omit<Funcionario, "senha">[]> {
				return this.listarResult;
			}
		}

		return new ListarFuncionariosSVCSpy();
	};

	test("É esperado que retorne 500 caso o service seja inválido", async () =>{
		const invalidService = {} as iListarFuncionariosService;
		const sut = new ListarFuncionariosCTER(invalidService);

		const httpRequest: HttpReq = {
			body: {},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 500 caso o service lance um erro", async () =>{
		const serviceWithError = {
			listar: () => {throw new Error();}
		};

		const sut = new ListarFuncionariosCTER(serviceWithError);

		const httpRequest: HttpReq = {
			body: {},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 200 e os funcionários caso tudo ocorra bem", async () => {
		const serviceSpy = makeServiceSpy();
		const sut = new ListarFuncionariosCTER(serviceSpy);

		const httpRequest: HttpReq = {
			body: {},
			headers: {}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(200);
		expect(httpResponse.body.data.funcionarios).toEqual(serviceSpy.listarResult);
	});

});