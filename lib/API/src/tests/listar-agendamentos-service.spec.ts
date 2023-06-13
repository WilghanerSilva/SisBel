import { iAgendamentoRepository } from "../utils/interfaces";
import ListarAgendamentosSVC from "../services/listar-agendamentos-service";
import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { Agendamentos } from "@prisma/client";

describe("Listar Agenamento Service", () => {
	class AgendamentoRepositorySpy implements iAgendamentoRepository {
		public listIdResult = [{
			id: "any_id",
			data: new Date(),
			detalhes: "",
			horario: "08:00",
			funcionarioId: "any_id",
			clienteId: "any_id"
		}];
      
		async listByUserId(): Promise<Agendamentos[]> {
			return this.listIdResult; 
		}

		async create(): Promise<boolean> {
			return true;
		}

		async checkHour(): Promise<boolean> {
			return true;
		}

		async listByDay(): Promise<string[]> {
			return ["08:00"];
		}
	}

	test("É esperado que lance um erro caso o AgendamentoRepository seja inválido", async () => {
		const invalidAgendamentoRepository = {} as iAgendamentoRepository;
		const sut = new ListarAgendamentosSVC(invalidAgendamentoRepository);

		expect(sut.listar("any_id")).rejects.toThrow(new InvalidDependencyError("Agendamento Repository"));
	});

	test("É esperado que retorne os agendamentos caso tudo ocorra bem", async () => {
		const agendamentoRepository = new AgendamentoRepositorySpy();
		const sut = new ListarAgendamentosSVC(agendamentoRepository);

		const result = await sut.listar("any_id");

		expect(result).toBe(agendamentoRepository.listIdResult);
	});
});