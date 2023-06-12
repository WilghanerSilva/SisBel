type criarAgendamentoData = {
  clienteId: string,
  funcionarioId: string,
  data: Date,
  horario: string,
  detalhes: string,
}

interface iAgendamentoRepository {
  create(data: criarAgendamentoData): Promise<boolean>
  checkHour(date: Date, funcionarioId: string, hours: string): Promise<boolean>
  listByDay(date: Date, funcionaroId: string): Promise<string[]>;
}

export default iAgendamentoRepository;