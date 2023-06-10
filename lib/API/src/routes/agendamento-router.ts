import { Router } from "express";
import ExpressControllerAdapter from "../utils/adapter/express-controller-adapter";
import RealizarAgendamentoComposer from "../composers/realizar-agendamento-composer";
import MiddlewareAdapter from "../utils/adapter/middleware-adapter";

const agendamentoRouter = Router();

agendamentoRouter.use(MiddlewareAdapter.adapt);

const realizarAgendamentoController = RealizarAgendamentoComposer.compose();

agendamentoRouter.post("/agendamento/cadastrar", ExpressControllerAdapter.adapt(
	realizarAgendamentoController
));

export default agendamentoRouter;