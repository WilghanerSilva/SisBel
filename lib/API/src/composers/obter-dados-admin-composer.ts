import ObterDadosAdminCTER from "../controllers/obter-dados-admin-controller";
import UserRepository from "../repositories/user-repository";
import ObterDadosAdminService from "../services/obter-dados-admin-service";

class ObterDadosAdminComposer {
	static compose() {
		const userRepository = new UserRepository();
		const obterDadosAdminService = new ObterDadosAdminService(userRepository);

		return new ObterDadosAdminCTER(obterDadosAdminService);
	}
}

export default ObterDadosAdminComposer;