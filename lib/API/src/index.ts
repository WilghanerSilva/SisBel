import Server from "./server";
import clienteRouter from "./routes/cliente-router";


const app = new Server(3000, [clienteRouter]);


app.initServer();