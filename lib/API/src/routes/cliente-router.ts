import { Router } from "express";
import ExpressControllerAdapter from "../utils/adapter/express-controller-adapter";
import CadastrarClienteComposer from "../composers/cadastrar-client-composer";

const clienteRouter = Router();

const cadastrarClienteController = CadastrarClienteComposer.compose();

clienteRouter.post("/cliente/cadastrar", ExpressControllerAdapter.adapt(
	cadastrarClienteController
));

export default clienteRouter;