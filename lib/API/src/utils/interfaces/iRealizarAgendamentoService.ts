interface iRealizarAgendamentoSVC {
  agendar(
    date: string, 
    hours: string, 
    funcionarioId: string, 
    clienteId: string, 
    details: string
  ): Promise<string>;
}

export default iRealizarAgendamentoSVC;