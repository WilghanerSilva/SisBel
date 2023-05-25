import { Router } from "express";
import ExpressControllerAdapter from "../utils/adapter/express-controller-adapter";
import CadastrarFuncionarioComposer from "../composers/cadastrar-funcionario-composer";
import MiddlewareAdapter from "../utils/adapter/middleware-adapter";

const funcionarioRouter = Router();

const cadastrarFuncionarioController = CadastrarFuncionarioComposer.compose();

funcionarioRouter.use(MiddlewareAdapter.adapt);

funcionarioRouter.post("/funcionario/cadastrar",
	ExpressControllerAdapter.adapt(
		cadastrarFuncionarioController
	)
);

export default funcionarioRouter;