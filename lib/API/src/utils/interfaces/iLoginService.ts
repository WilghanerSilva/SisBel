interface iLoginService {
  auth(email: string, password: string): Promise<{profile: string, token: string} | null>;
}

export default iLoginService;