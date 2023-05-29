import {iTokenManager} from "../utils/interfaces";
import { HttpRes } from "../utils/types/http-types";
import AuthMiddleware from "../middlewares/auth-middleware";

class TokenManagerSpy implements iTokenManager {
	public verifyReturns : string | { userId: string} = { userId: "any_id"};
	public token = "";

	verify(token: string): string | { userId: string; } {
		this.token = token;
		return this.verifyReturns;
	}

	generate(userId: string): string {
		return userId;
	}
}

const makeSut = () => {
	const tokenManager = new TokenManagerSpy();
	const sut = new AuthMiddleware(tokenManager);

	return {sut, tokenManager};
};


describe("Auth Middleware", () => {
	test("É esperado que retorne 500 caso o TokenManager seja inválido", () => {
		const tokenManager = {} as iTokenManager;
		const sut = new AuthMiddleware(tokenManager);

		const httpReq = {
			body: {},
			headers: {
				authorization: "Bearer any_token"
			}
		};

		const httpResponse = sut.verifyToken(httpReq) as HttpRes;

		expect(httpResponse.statusCode).toEqual(500);
	});

	test("É esperado que retorne 401 e a mensagem \"token inválido\" caso o token seja inválido", () => {
		const {sut} = makeSut();

		const httpReq = {
			body: {},
			headers: {
				authorization: "invalid any_token"
			}
		};

		const httpResponse = sut.verifyToken(httpReq) as HttpRes;
    
		expect(httpResponse.body.message).toBe("Invalid token");
		expect(httpResponse.statusCode).toBe(401);
	});

	test("É esperado que retorne 401 e a mensagem \"token faltando\" caso o token não seja fornecido", () => {
		const {sut} = makeSut();

		const httpReq = {
			body: {},
			headers: {
			}
		};

		const httpResponse = sut.verifyToken(httpReq) as HttpRes;

		expect(httpResponse.statusCode).toBe(401);
		expect(httpResponse.body.message).toBe("Missing token");
	});

	test("É esperado que retorne 401 caso não exista do campo 'authorization' no header", () => {
		const {sut} = makeSut();

		const httpReq = {
			body: {},
			headers: {
				authorization: 1
			}
		};

		const httpResponse = sut.verifyToken(httpReq) as HttpRes;

		expect(httpResponse.statusCode).toBe(401);
		expect(httpResponse.body.message).toBe("Unauthorized");
	});

	test("É esperado que retorne 401 caso o token seja inválido ou tenha expirado", () => {
		const {sut, tokenManager} = makeSut();

		tokenManager.verifyReturns = "Expired token";

		const httpReq = {
			body: {},
			headers: {
				authorization: "Bearer invalid_invalid token"
			}
		};
 
		const httpResponse = sut.verifyToken(httpReq) as HttpRes;

		expect(httpResponse.statusCode).toBe(401);
		expect(httpResponse.body.message).toBe("Expired token");
	});

	test("É esperado que retorne o id do usuário caso tudo ocorra bem", () => {
		const {sut} = makeSut();

		const httpReq = {
			body: {},
			headers: {
				authorization: "Bearer any_token"
			}
		};

		const userId = sut.verifyToken(httpReq);

		console.log(userId);

		expect(typeof userId === "string").toBe(true);
	});

	test("É esperado que passe os parâmetros corretamente para o token manager", () => {
		const { sut, tokenManager} = makeSut();

		const httpReq = {
			body: {},
			headers: {
				authorization: "Bearer any_token"
			}
		};

		sut.verifyToken(httpReq);

		expect(tokenManager.token).toEqual("any_token");
	});
});