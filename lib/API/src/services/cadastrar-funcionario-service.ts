import InvalidDependencyError from "../utils/erros/invaliddependency-error";
import { iCadastrarFuncionarioService, iEncrypter, iUserRepository } from "../utils/interfaces";
import { FuncData } from "../utils/interfaces/iCadastrarFuncionarioService";

class CadastrarFuncionarioService implements iCadastrarFuncionarioService{
	constructor(
		private encrypter: iEncrypter,
		private userRepository: iUserRepository,
	){}
  
	async cadastrar(adminId: string, funcData: FuncData): Promise<string> {
		if(
			!this.userRepository || 
      !this.userRepository.createFuncionario || 
      !this.userRepository.getUserByEmail
		)
			throw new InvalidDependencyError("UserRepository");

		if(!this.encrypter || !this.encrypter.crypt)
			throw new InvalidDependencyError("Encrypter");

		const admin = await this.userRepository.getUserById(adminId);

		if(!admin || admin.profile !== "admin")
			return "isNotAdmin";

		const emailIsValiable = await this.userRepository.getUserByEmail(funcData.email, false);

		if(emailIsValiable)
			return "emailInUse";

		if(!this.checkCpf(funcData.cpf))
			return "invalidCPF";

		const funcionario = await this.userRepository.createFuncionario(
			{
				cidade: funcData.city,
				cpf: funcData.cpf,
				dataNascimento: funcData.birthDate,
				email: funcData.email,
				nome: funcData.name,
				endereco: funcData.adress,
				telefone: funcData.phone,
				senha: await this.encrypter.crypt(funcData.password),
				perfil: "funcionario"
			}
		);

		if(!funcionario)
			throw new Error("Database error");

		return "";
	}

	private checkCpf(cpf: string) {
		const cpfArray = cpf.split(/[.-]+/);
		const cpfSplited: number[] = [];
    
		cpfArray.forEach(item => {
			item.split("")
				.forEach(digit => {
					cpfSplited.push(parseInt(digit));
				});
		});

		let verificationSum01 = 0;
		let verificationSum02 = 0;

		for (let index = 0, aux = 10; index < 9; index++, aux--) {
			const element = cpfSplited[index];
			verificationSum01 += element * aux;
		}

		for (let index = 0, aux = 11; index < 10; index++, aux--) {
			const element = cpfSplited[index];
			verificationSum02 += element * aux;
		}

		const dig1 = verificationSum01 % 11 < 2 ? 0 : 11 - (verificationSum01 % 11);
		const dig2 = verificationSum02 % 11 < 2 ? 0 : 11 - (verificationSum02 % 11);
	
		return dig1 === cpfSplited[9] && dig2 === cpfSplited[10];
	}
}

export default CadastrarFuncionarioService;