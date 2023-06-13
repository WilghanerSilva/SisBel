import UserRepository from "../repositories/user-repository";
import DeletarClienteSVC from "../services/deletar-cliente-service";
import DeletarClienteController from "../controllers/deletar-cliente-controller";

class DeletarClienteComposer {
	static compose () {
		const userRepository = new UserRepository();
		const deleteClienteSVC = new DeletarClienteSVC(userRepository);
    
		return new DeletarClienteController(deleteClienteSVC);
	}
}

export default DeletarClienteComposer;