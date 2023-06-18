export type HttpReq = {
  body: any;
  headers: any;
  params?: any;
}

export type HttpRes = {
  body: {
    message: string;
    data? : any;
  };

  statusCode: number;
}