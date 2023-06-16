import { Router } from "express";
import ExpressControllerAdapter from "../utils/adapter/express-controller-adapter";
import CadastrarClienteComposer from "../composers/cadastrar-client-composer";
import DeletarClienteComposer from "../composers/deletar-cliente-composer";
import MiddlewareAdapter from "../utils/adapter/middleware-adapter";
import EditarClienteComposer from "../composers/editar-cliente-composer";

const clienteRouter = Router();

const cadastrarClienteController = CadastrarClienteComposer.compose();
const deletarClienteController = DeletarClienteComposer.compose();
const editarClienteController = EditarClienteComposer.compose();

clienteRouter.post("/cliente/cadastrar", ExpressControllerAdapter.adapt(
	cadastrarClienteController
));

clienteRouter.use(MiddlewareAdapter.adapt);

clienteRouter.delete("/cliente", ExpressControllerAdapter.adapt(
	deletarClienteController
));

clienteRouter.put("/cliente", ExpressControllerAdapter.adapt(
	editarClienteController
));

export default clienteRouter;