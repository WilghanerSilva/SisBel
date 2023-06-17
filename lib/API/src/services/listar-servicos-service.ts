import { Servicos } from "@prisma/client";
import { iListarServicosService, iServicoRepository } from "../utils/interfaces";
import InvalidDependencyError from "../utils/erros/invaliddependency-error";

class ListarServicosSVC implements iListarServicosService {
	constructor(
    private servicoRepository: iServicoRepository
	){}

	async listar(field = "", value = ""): Promise<Servicos[]> {
		if(!this.servicoRepository || !this.servicoRepository.listAll || !this.servicoRepository.listByCategory || !this.servicoRepository.listByAudience)
			throw new InvalidDependencyError("Servico Repository");

		if(!field)
			return await this.servicoRepository.listAll();
    
		if(field === "category")
			return await this.servicoRepository.listByCategory(value);
    
		if(field === "audience")
			return await this.servicoRepository.listByAudience(value);

		return [];
	}
}

export default ListarServicosSVC;