import { iDeletarFuncionarioService } from "../utils/interfaces";
import DeletarFuncionarioCTER from "../controllers/deletar-funcionario-controller";
import { HttpReq } from "../utils/types/http-types";

describe("Deletar Funcionario Controller", () => {
	const makeServiceSpy = () => {
		class DeletarFuncionarioSVCSpy implements iDeletarFuncionarioService {
			public deletarResult = "ok";
			public id1 = "funcId";
			public id2 = "adminId";
      
			async deletar(funcId: string, adminId: string): Promise<string> {
				this.id1 = funcId;
				this.id2 = adminId;
				return this.deletarResult;
			}
		}

		return new DeletarFuncionarioSVCSpy;
	};

	const makeSut = () => {
		const deletarFuncionarioSerivce = makeServiceSpy();
		const sut = new DeletarFuncionarioCTER(deletarFuncionarioSerivce);
	
		return {
			deletarFuncionarioSerivce,
			sut
		};
	};


	test("É esperado que retorne 500 caso o service seja inválido", async ()=>{
		const invalidService = {} as iDeletarFuncionarioService;
		const sut = new DeletarFuncionarioCTER(invalidService);

		const httpRequest: HttpReq = {
			body: {
				funcionarioId: "any_id"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 500 caso não haja um userId nos headers", async ()=>{
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				funcionarioId: "any_id"
			},
			headers: {
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 500 caso o service retorne um erro", async ()=>{
		const serviceWithError = {
			deletar: () => {throw new Error();}
		};

		const sut = new DeletarFuncionarioCTER(serviceWithError);

		const httpRequest: HttpReq = {
			body: {
				funcionarioId: "any_id"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 401 caso o service retorne isNotAdmin", async ()=>{
		const {sut, deletarFuncionarioSerivce} = makeSut();
    
		deletarFuncionarioSerivce.deletarResult = "isNotAdmin";

		const httpRequest: HttpReq = {
			body: {
				funcionarioId: "any_id"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
		expect(httpResponse.body).toEqual({
			message: "É preciso ser um funcionário ou admin para deletar funcionários"
		});
	});

	test("É esperado que retorne 401 caso o service retorne missingFunc", async ()=>{
		const {sut, deletarFuncionarioSerivce} = makeSut();
    
		deletarFuncionarioSerivce.deletarResult = "missingFunc";

		const httpRequest: HttpReq = {
			body: {
				funcionarioId: "any_id"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
		expect(httpResponse.body).toEqual({
			message:"O funcionário não foi encontrado"
		});
	});

	test("É esperado que retorne 401 caso o service retorne wrongFuncId", async ()=>{
		const {sut, deletarFuncionarioSerivce} = makeSut();
    
		deletarFuncionarioSerivce.deletarResult = "wrongFuncId";

		const httpRequest: HttpReq = {
			body: {
				funcionarioId: "any_id"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(401);
		expect(httpResponse.body).toEqual({
			message:"Um funcionário só pode deletar a própria conta"
		});
	});

	test("É esperado que retorne 200 caso tudo ocorra bem", async () => {
		const {sut} = makeSut();

		const httpRequest: HttpReq = {
			body: {
				funcionarioId: "any_id"
			},
			headers: {
				userId: "any_id"
			}
		};

		const httpResponse = await sut.run(httpRequest);

		expect(httpResponse.statusCode).toEqual(200);
	});

	test("É esperado que ids iguais sejam passados para o service caso não seja passado um id no body", async () => {
		const {sut, deletarFuncionarioSerivce} = makeSut();
    
		const httpRequest: HttpReq = {
			body: {
			},
			headers: {
				userId: "any_id"
			}
		};

		await sut.run(httpRequest);

		expect(deletarFuncionarioSerivce.id1).toEqual(deletarFuncionarioSerivce.id2);
	});
});