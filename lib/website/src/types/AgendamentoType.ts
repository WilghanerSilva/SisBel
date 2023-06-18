type Servico = {
  nome: string;
  categoria: string;
  publico: string;
};

type Funcionario = {
  id: string;
  nome: string;
  email: string;
};

type Cliente = {
  id: string;
  nome: string;
  email: string;
};

export type Agendamento = {
  data: string;
  horario: string;
  id: string;
  detalhes: string;
  clienteId: string;
  servicoId: string;
  servico: Servico;
  funcionarioId: string;
  funcionario: Funcionario;
  cliente: Cliente;
};