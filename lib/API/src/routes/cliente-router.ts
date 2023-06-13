import { Router } from "express";
import ExpressControllerAdapter from "../utils/adapter/express-controller-adapter";
import CadastrarClienteComposer from "../composers/cadastrar-client-composer";
import DeletarClienteComposer from "../composers/deletar-cliente-composer";
import MiddlewareAdapter from "../utils/adapter/middleware-adapter";

const clienteRouter = Router();

const cadastrarClienteController = CadastrarClienteComposer.compose();
const deletarClienteController = DeletarClienteComposer.compose();

clienteRouter.post("/cliente/cadastrar", ExpressControllerAdapter.adapt(
	cadastrarClienteController
));

clienteRouter.use(MiddlewareAdapter.adapt);

clienteRouter.delete("/cliente", ExpressControllerAdapter.adapt(
	deletarClienteController
));

export default clienteRouter;