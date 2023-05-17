import { HttpReq, HttpRes } from "../types/http-types";


interface iController {
  run(httpRequest: HttpReq) : Promise<HttpRes>,
}

export default iController;