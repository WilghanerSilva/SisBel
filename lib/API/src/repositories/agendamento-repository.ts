import { iAgendamentoRepository } from "../utils/interfaces";
import prisma from "../../client";
import { Agendamentos } from "@prisma/client";

class AgendamentoRepository implements iAgendamentoRepository {
	async create(data: { clienteId: string; funcionarioId: string; servicoId: string; data: Date; horario: string; detalhes: string}): Promise<boolean> {
		const agendamento = await prisma.agendamentos.create({data});

		if(!agendamento)
			return false;

		await Promise.all([
			prisma.cliente.update({
				where: {id: data.clienteId},
				data: {
					agendamentos: {
						connect: {
							id: agendamento.id
						}
					}
				}
			}),
			prisma.funcionario.update({
				where: {
					id: data.funcionarioId
				},
				data: {
					agendamentos: {
						connect: {
							id: agendamento.id
						}
					}
				}
			}),
			prisma.servicos.update({
				where: {
					id: data.servicoId
				},
				data: {
					agendamentos: {
						connect: {
							id: agendamento.id
						}
					}
				}
			})
		]);

		return true;
	}

	async checkHour(date: Date, funcionarioId: string, hours: string): Promise<boolean> {
		const agendamento = await prisma.agendamentos.findFirst({
			where: {
				data: date,
				funcionarioId: funcionarioId,
				horario: hours
			}
		});

		if(agendamento)
			return false;
		
    
		return true;
	}

	async listByDay(date: Date, funcionaroId: string): Promise<string[]> {
		const agendamentos = await prisma.agendamentos.findMany({
			where: {
				funcionarioId: funcionaroId,
				data: date
			}
		});

		const schedules: string[] = [];

		if(!agendamentos)
			return schedules;
    
		agendamentos.forEach(agendamento => {
			schedules.push(agendamento.horario);
		});

		return schedules;
	}

	async listByUserId(id: string): Promise<Agendamentos[]> {
		const [cliente, funcionario] = await Promise.all([
			prisma.cliente.findUnique({where: {id}}),
			prisma.funcionario.findUnique({where: {id}})
		]);

		let agendamentos: Agendamentos[] = [];

		if(cliente){
			agendamentos = await prisma.agendamentos.findMany({
				where:{clienteId: id},
				orderBy: [
					{data: "asc"},
					{horario: "asc"}
				],
				select: {
					data: true,
					horario: true,
					id: true,
					detalhes: true,
					clienteId: true,
					servicoId: true,
					servico: {
						select: {
							nome: true,
							categoria: true,
							publico: true
						}
					},
					funcionarioId: true,
					funcionario: {
						select: {
							id: true,
							nome: true,
							email: true
						}
					},
					cliente: {
						select: {
							id: true,
							nome: true,
							email: true
						}
					}
				}
			});
		}

		if(funcionario){
			agendamentos = await prisma.agendamentos.findMany({
				where: {funcionarioId: id},
				orderBy: [
					{data: "asc"},
					{horario: "asc"}
				],
				select: {
					data: true,
					horario: true,
					id: true,
					detalhes: true,
					clienteId: true,
					servicoId: true,
					servico: {
						select: {
							nome: true,
							categoria: true,
							publico: true
						}
					},
					funcionarioId: true,
					funcionario: {
						select: {
							id: true,
							nome: true,
							email: true
						}
					},
					cliente: {
						select: {
							id: true,
							nome: true,
							email: true
						}
					}
				}
			});
		}

		return agendamentos;
	}
}

export default AgendamentoRepository;