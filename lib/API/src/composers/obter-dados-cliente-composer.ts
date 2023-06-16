import UserRepository from "../repositories/user-repository";
import ObterDadosClienteSVC from "../services/obter-dados-cliente-service";
import ObterDadosClienteCTER from "../controllers/obter-dados-cliente-controller";

class ObterDadosClienteComposer {
	static compose(){
		const userRepository = new UserRepository();
		const obterDadosClienteService = new ObterDadosClienteSVC(userRepository);

		return new ObterDadosClienteCTER(obterDadosClienteService);
	}
}

export default ObterDadosClienteComposer;