import { Agendamentos } from "@prisma/client";
import ListarHorarioSVC from "../services/listar-horarios-service";
import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { iAgendamentoRepository } from "../utils/interfaces";

describe("Listar Horario Service", () => {
	const makeAgendamentoRepositorySpy = () => {
		class AgendamentoRepositorySpy implements iAgendamentoRepository {
			public listResult = ["08:00", "10:00"];
      
			async listByUserId(): Promise<Agendamentos[]> {
				return [{
					id: "any_id",
					data: new Date(),
					detalhes: "",
					horario: "08:00",
					funcionarioId: "any_id",
					clienteId: "any_id",
					servicoId: "any_id"
				}];
			}

			async create(): Promise<boolean> {
				return true;
			}

			async checkHour(): Promise<boolean> {
				return true;
			}

			async listByDay(): Promise<string[]> {
				return this.listResult;
			}
		}

		return new AgendamentoRepositorySpy();
	};

	const makeSut = () => {
		const agendamentoRepository = makeAgendamentoRepositorySpy();
		const sut = new ListarHorarioSVC(agendamentoRepository);

		return {
			sut,
			agendamentoRepository
		};
	};

	test("É esperado que lance um erro caso o agendamentoRepository seja inválido", async () => {
		const invalidAgendamentoRepository = {} as iAgendamentoRepository;
		const sut = new ListarHorarioSVC(invalidAgendamentoRepository);

		expect(sut.listar("2023-06-13", "any_id"))
			.rejects.toThrow(new InvalidDependencyError("Agendamento Repository"));
	});

	test("É esperado que retorne os horários corretamente filtrados", async () => {
		const {sut, agendamentoRepository} = makeSut();

		agendamentoRepository.listResult = ["08:00", "10:00", "13:00"];

		const result = await sut.listar("2023-06-13", "any_id");

		expect(result).toEqual(["09:00", "11:00", "16:00"]);
	});
});