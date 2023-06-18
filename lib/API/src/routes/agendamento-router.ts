import { Router } from "express";
import ExpressControllerAdapter from "../utils/adapter/express-controller-adapter";
import RealizarAgendamentoComposer from "../composers/realizar-agendamento-composer";
import MiddlewareAdapter from "../utils/adapter/middleware-adapter";
import ListarHorariosComposer from "../composers/listar-horarios-composer";
import ListarAgendamentosComposer from "../composers/listar-agendamentos-composer";

const agendamentoRouter = Router();

agendamentoRouter.use(MiddlewareAdapter.adapt);

const ListarAgendamentosController = ListarAgendamentosComposer.compose();
const realizarAgendamentoController = RealizarAgendamentoComposer.compose();
const listarHorariosController = ListarHorariosComposer.compose();

agendamentoRouter.post("/agendamento/cadastrar", ExpressControllerAdapter.adapt(
	realizarAgendamentoController
));

agendamentoRouter.post("/agendamento/listar-horarios", ExpressControllerAdapter.adapt(
	listarHorariosController
));

agendamentoRouter.post("/agendamento/listar-agendamentos", ExpressControllerAdapter.adapt(
	ListarAgendamentosController
));

export default agendamentoRouter;