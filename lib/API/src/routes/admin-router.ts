import { Router } from "express";
import ExpressControllerAdapter from "../utils/adapter/express-controller-adapter";
import ObterDadosAdminComposer from "../composers/obter-dados-admin-composer";
import MiddlewareAdapter from "../utils/adapter/middleware-adapter";

const adminRouter = Router();

adminRouter.use(MiddlewareAdapter.adapt);

adminRouter.get("/admin",
	ExpressControllerAdapter.adapt(
		ObterDadosAdminComposer.compose()
	)
);

export default adminRouter;