interface iLoginService {
  auth(email: string, password: string): Promise<string>;
}

export default iLoginService;