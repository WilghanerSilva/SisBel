import Server from "./server";
import clienteRouter from "./routes/cliente-router";
import authRouter from "./routes/auth-router";
import funcionarioRouter from "./routes/funcionario-router";


const app = new Server(3005, [
	clienteRouter, 
	authRouter,
	funcionarioRouter
]);


app.initServer();