import { iAgendamentoRepository } from "../utils/interfaces";
import RealizarAgendamentoSVC from "../services/realizar-agendamento-service";
import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { Agendamentos } from "@prisma/client";

describe("Realizar Agendamento Service", () => {
	const makeAgendamentoRepositorySpy = () => {
		class AgendamentoRepositorySpy implements iAgendamentoRepository {
			public createResult = true;
			public checkHourResult = true;
      
			async create(): Promise<boolean> {
				return this.createResult;
			}

			async checkHour(): Promise<boolean> {
				return this.checkHourResult;
			}

			async listByDay(): Promise<string[]> {
				return [""];
			}

			async listByUserId(): Promise<Agendamentos[]> {
				return [{
					id: "any_id",
					data: new Date(),
					detalhes: "",
					horario: "08:00",
					funcionarioId: "any_id",
					clienteId: "any_id"
				}];
			}
		}

		return new AgendamentoRepositorySpy();
	};

	const makeSut = () => {
		const agendamentoRepository = makeAgendamentoRepositorySpy();
		const sut = new RealizarAgendamentoSVC(agendamentoRepository);
	
		return {sut, agendamentoRepository};
	};

	const getCorrectDate = () => {
		const date = new Date();
		date.setDate(date.getDate() + 1);

		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");



		return `${date.getFullYear()}-${month}-${day}`;
	};


	test("É esperado que lance um erro caso o agendamentoRepository seja inválido", async () => {
		const invalidAgendamentoRepository = {} as iAgendamentoRepository;
		const sut = new RealizarAgendamentoSVC(invalidAgendamentoRepository);

		expect(sut.agendar(
			getCorrectDate(),
			"08:00",
			"any_funcioanrio_id",
			"any_cliente_id",
			""
		)).rejects.toThrow(new InvalidDependencyError("Agendamento Repository"));
	});

	test("É esperado que retorne InvalidDate caso a data passada seja anterior a data atual", async () => {
		const {sut} = makeSut();

		const result = await sut.agendar(
			"2023-06-09",
			"08:00",
			"any_funcioanrio_id",
			"any_cliente_id",
			""
		);

		expect(result).toEqual("InvalidDate");
	});

	test("É esperado que retorne BusyHours caso o horário selecionado esteja ocupado", async () => {
		const {sut, agendamentoRepository} = makeSut();

		agendamentoRepository.checkHourResult = false;

		const result = await sut.agendar(
			getCorrectDate(),
			"08:00",
			"any_funcioanrio_id",
			"any_cliente_id",
			""
		);

		expect(result).toEqual("BusyHours");
	});

	test("É esperado que lance um erro caso o método create retorne um false", async () => {
		const {sut, agendamentoRepository} = makeSut();

		agendamentoRepository.createResult = false;

		expect(
			sut.agendar(
				getCorrectDate(),
				"08:00",
				"any_funcioanrio_id",
				"any_cliente_id",
				""
			)
		).rejects.toThrowError();
	});

	test("É esperado que retorne ok caso tudo ocorra bem", async () => {
		const {sut} = makeSut();

		const result = await sut.agendar(
			getCorrectDate(),
			"08:00",
			"any_funcioanrio_id",
			"any_cliente_id",
			""
		);

		expect(result).toEqual("ok");
	});
});