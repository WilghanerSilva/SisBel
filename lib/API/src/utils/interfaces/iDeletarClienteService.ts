interface iDeletarClienteService {
  delete(id: string): Promise<boolean>;
}

export default iDeletarClienteService;