import { Router } from "express";
import ExpressControllerAdapter from "../utils/adapter/express-controller-adapter";
import LoginComposer from "../composers/login-composer";

const authRouter = Router();

const loginController = LoginComposer.compose();


authRouter.post("/auth/login", 
	ExpressControllerAdapter.adapt(loginController)
);

export default authRouter;