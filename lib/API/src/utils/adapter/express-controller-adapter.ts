import {iController} from "../interfaces";
import { Request, Response} from "express";
import { HttpReq, HttpRes } from "../types/http-types";

export default class ExpressControllerAdapter {
	static adapt (controller : iController){
		return  async (req: Request, res: Response) => {
      
			const httpRequest : HttpReq = {
				body: req.body,
				headers: req.headers,
				params: req.params
			};

			const httpResponse : HttpRes = await controller.run(httpRequest);
			res.status(httpResponse.statusCode).send(httpResponse.body);
		};
	}
}