import { iServicoRepository } from "../utils/interfaces";
import ListarServicosSVC from "../services/listar-servicos-service";
import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { Servicos } from "@prisma/client";

describe("Listar Servico Service", () => {
	const makeRepositorySpy = () => {
		class ServicoRepositorySpy implements iServicoRepository {
			public listAllResult: Servicos[] = [
				{
					categoria: "any_category",
					id: "any_id",
					nome: "any_name",
					publico: "any_audience"
				},
				{
					categoria: "any_category",
					id: "any_id",
					nome: "any_name",
					publico: "any_audience"
				},
				{
					categoria: "any_category",
					id: "any_id",
					nome: "any_name",
					publico: "any_audience"
				},
			];

			public listByAudienceResult: Servicos[] = [
				{
					categoria: "any_category",
					id: "any_id",
					nome: "any_name",
					publico: "masculino"
				},
				{
					categoria: "any_category",
					id: "any_id",
					nome: "any_name",
					publico: "masculino"
				},
				{
					categoria: "any_category",
					id: "any_id",
					nome: "any_name",
					publico: "masculino"
				},
			];

			public listByCategoryResult: Servicos[] = [
				{
					categoria: "cabelo",
					id: "any_id",
					nome: "any_name",
					publico: "any_audience"
				},
				{
					categoria: "cabelo",
					id: "any_id",
					nome: "any_name",
					publico: "any_audience"
				},
				{
					categoria: "cabelo",
					id: "any_id",
					nome: "any_name",
					publico: "any_audience"
				},
			];
      
      
			async create(): Promise<Servicos | undefined> {
				return undefined;
			}

			async getByName(): Promise<Servicos | null> {
				return null;
			}

			async listAll(): Promise<Servicos[]> {
				return this.listAllResult;
			}

			async listByAudience(): Promise<Servicos[]> {
				return this.listByAudienceResult;
			}

			async listByCategory(): Promise<Servicos[]> {
				return this.listByCategoryResult;
			}
		}

		return new ServicoRepositorySpy;
	};

	const makeSut = () => {
		const servicoRepository = makeRepositorySpy();
		const sut = new ListarServicosSVC(servicoRepository);

		return {
			sut,
			servicoRepository
		};
	};

	test("É esperado que lance um erro caso o servicoRepository seja inváliido", async () => {
		const invalidServicoRepository = {} as iServicoRepository;
		const sut = new ListarServicosSVC(invalidServicoRepository);

		expect(sut.listar()).rejects.toThrow(new InvalidDependencyError("Servico Repository"));
	});

	test("É esperado que retorne todos os servicos de acordo com o método listAll do repository", async () => {
		const {sut, servicoRepository} = makeSut();

		const result = await sut.listar();
    
		expect(result).toEqual(servicoRepository.listAllResult);
	});

	test("É esperado que retorne todos os servicos de acordo com o método listByCategory do repository", async () => {
		const {sut, servicoRepository} = makeSut();

		const result = await sut.listar("category", "cabelo");
    
		expect(result).toEqual(servicoRepository.listByCategoryResult);
	});

	test("É esperado que retorne todos os servicos de acordo com o método listByCategory do repository", async () => {
		const {sut, servicoRepository} = makeSut();

		const result = await sut.listar("audience", "masculino");
    
		expect(result).toEqual(servicoRepository.listByAudienceResult);
	});

	test("É esperado que retorne um array vazio caso o valor de field não seja audience nem category", async () => {
		const {sut} = makeSut();

		const result = await sut.listar("wrondField", "masculino");
    
		expect(result).toEqual([]);
	});
});