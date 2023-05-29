import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { iCadastrarServicoService, iServicoRepository, iUserRepository } from "../utils/interfaces";

class CadastrarServicoSVC implements iCadastrarServicoService {
	constructor(
    private servicosRepository: iServicoRepository,
    private userRepository: iUserRepository
	){}
	
	async cadastrar(adminId: string, nome: string, publico: string, categoria: string): Promise<boolean> {
		if(!this.servicosRepository || !this.servicosRepository.create || !this.servicosRepository.getByName)
			throw new InvalidDependencyError("Servicos Repository");
    
		if(!this.userRepository || !this.userRepository.getUserById)
			throw new InvalidDependencyError("User Repository");

		const admin = await this.userRepository.getUserById(adminId);

		if(!admin)
			return false;

		if(admin.profile !== "admin")
			return false;

		if(await this.servicosRepository.getByName(nome))
			return false;

		const servico = await this.servicosRepository.create({
			nome,
			publico, 
			categoria
		});

		if(!servico)
			throw new Error("Ocorreu um erro na criação de um novo serviço");
      
		return true;
	}
}

export default CadastrarServicoSVC;