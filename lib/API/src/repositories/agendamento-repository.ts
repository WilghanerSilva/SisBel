import { iAgendamentoRepository } from "../utils/interfaces";
import prisma from "../../client";

class AgendamentoRepository implements iAgendamentoRepository {
	async create(data: { clienteId: string; funcionarioId: string; data: Date; horario: string; detalhes: string; }): Promise<boolean> {
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
}

export default AgendamentoRepository;