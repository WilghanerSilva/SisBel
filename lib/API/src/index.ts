import Server from "./server";
import clienteRouter from "./routes/cliente-router";
import authRouter from "./routes/auth-router";


const app = new Server(3005, [clienteRouter, authRouter]);


app.initServer();