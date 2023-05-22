import { User } from "@prisma/client";
import { CreateUserData } from "../types/user-types";

interface iUserRepository {
  getUserByEmail(email: string, includePassword: boolean): Promise<Omit<User, "password"> | User |undefined>

  createUser(data: CreateUserData ): Promise<Omit<User, "password"> | undefined> 
}

export default iUserRepository;