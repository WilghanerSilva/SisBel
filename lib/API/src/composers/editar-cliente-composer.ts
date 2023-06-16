import UserRepository from "../repositories/user-repository";
import Encrypter from "../utils/helpers/encrypter";
import EditarClienteSVC from "../services/editar-cliente-service";
import EditarClienteCTER from "../controllers/editar-cliente-controller";

class EditarClienteComposer {
	static compose() {
		const userRepository = new UserRepository();
		const encrypter = new Encrypter();
		const editarClienteSVC = new EditarClienteSVC(userRepository, encrypter);
  
		return new EditarClienteCTER(editarClienteSVC);
	}
}

export default EditarClienteComposer;