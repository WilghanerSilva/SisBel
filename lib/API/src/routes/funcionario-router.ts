import { Router } from "express";
import ExpressControllerAdapter from "../utils/adapter/express-controller-adapter";
import CadastrarFuncionarioComposer from "../composers/cadastrar-funcionario-composer";
import MiddlewareAdapter from "../utils/adapter/middleware-adapter";
import DeletarFuncionarioComposer from "../composers/deleter-funcionario-composer";

const funcionarioRouter = Router();

const cadastrarFuncionarioController = CadastrarFuncionarioComposer.compose();
const deletarFuncionarioController = DeletarFuncionarioComposer.compose();

funcionarioRouter.use(MiddlewareAdapter.adapt);

funcionarioRouter.post("/funcionario/cadastrar",
	ExpressControllerAdapter.adapt(
		cadastrarFuncionarioController
	)
);

funcionarioRouter.delete("/funcionario", 
	ExpressControllerAdapter.adapt(
		deletarFuncionarioController
	)
);

export default funcionarioRouter;