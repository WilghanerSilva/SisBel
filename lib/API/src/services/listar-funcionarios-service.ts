import { Funcionario } from "@prisma/client";
import iListarFuncionariosService from "../utils/interfaces/iListarFuncionariosService";
import { iUserRepository } from "../utils/interfaces";
import InvalidDependencyError from "../utils/erros/invaliddependency-error";

class ListarFuncionariosSVC implements iListarFuncionariosService {
	constructor(
    private userRepository: iUserRepository
	){}
  
	async listar(serviceId = ""): Promise<Omit<Funcionario, "senha">[]> {
		if(!this.userRepository || !this.userRepository.listFuncionarios || !this.userRepository.listFuncionarioByService)
			throw new InvalidDependencyError("User Repository");

		const funcionarios: Omit<Funcionario, "senha">[] = [];

		if(serviceId){
			const funcionarioList = await this.userRepository.listFuncionarioByService(serviceId);

			funcionarioList.forEach(funcionario => {
				funcionarios.push({
					cidade: funcionario.cidade,
					cpf: funcionario.cpf,
					dataNascimento: funcionario.dataNascimento,
					email: funcionario.email,
					endereco: funcionario.endereco,
					id: funcionario.id,
					nome: funcionario.nome,
					perfil: funcionario.perfil,
					telefone: funcionario.telefone
				});
			});

		} else {
			const funcionarioList = await this.userRepository.listFuncionarios();

			funcionarioList.forEach(funcionario => {
				funcionarios.push({
					cidade: funcionario.cidade,
					cpf: funcionario.cpf,
					dataNascimento: funcionario.dataNascimento,
					email: funcionario.email,
					endereco: funcionario.endereco,
					id: funcionario.id,
					nome: funcionario.nome,
					perfil: funcionario.perfil,
					telefone: funcionario.telefone
				});
			});
		}


		return funcionarios;
	}
}

export default ListarFuncionariosSVC;