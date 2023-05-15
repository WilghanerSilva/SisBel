import { iEmailValidator, iCadastrarClienteService } from "../utils/interfaces";
import { HttpReq } from "../utils/types/http-types";

class CadastrarClienteController {
	constructor(private emailValidator: iEmailValidator, private cadastrarClienteService: iCadastrarClienteService){}

	route(httpRequest: HttpReq){
		console.log("Olá Mundo");
	}
}



export default CadastrarClienteController;