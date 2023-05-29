import { Router } from "express";
import MiddlewareAdapter from "../utils/adapter/middleware-adapter";
import ExpressControllerAdapter from "../utils/adapter/express-controller-adapter";
import CadastrarServicoComposer from "../composers/cadastrar-servico-composer";

const servicoRouter = Router();

servicoRouter.use(MiddlewareAdapter.adapt);

servicoRouter.post("/servico/cadastrar", ExpressControllerAdapter.adapt(
	CadastrarServicoComposer.compose()
));

export default servicoRouter;