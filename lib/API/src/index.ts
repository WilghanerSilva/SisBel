import Server from "./server";
import clienteRouter from "./routes/cliente-router";
import authRouter from "./routes/auth-router";
import funcionarioRouter from "./routes/funcionario-router";
import servicoRouter from "./routes/servico-router";
import agendamentoRouter from "./routes/agendamento-router";


const app = new Server(3005, [
	authRouter,
	clienteRouter, 
	funcionarioRouter,
	servicoRouter,
	agendamentoRouter
]);


app.initServer();