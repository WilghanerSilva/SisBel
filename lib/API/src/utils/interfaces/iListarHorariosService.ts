interface iListarHorariosService {
  listar(date: string, funcionarioId: string): Promise<string[]>;
}

export default iListarHorariosService;