import { User } from "@prisma/client";
import prisma from "./../../client";
import { iUserRepository } from "../utils/interfaces";
import { CreateUserData } from "../utils/types/user-types";

class UserRepository implements iUserRepository {
	async createUser(data: CreateUserData): Promise<Omit<User, "password"> | undefined> {
		const user = await prisma.user.create({
			data
		});


		if(!user)
			return undefined;

		return {
			name: user.name,
			email: user.email,
			profile: user.profile,
			phone: user.phone,
			id: user.id
		};
	}

	async getUserByEmail(email: string): Promise<Omit<User, "password"> | undefined> {
		const user = await prisma.user.findUnique({
			where: {email:email}
		});

		if(!user)
			return undefined;

		return {
			name: user.name,
			email: user.email,
			profile: user.profile,
			phone: user.phone,
			id: user.id
		};
	}
}


export default UserRepository;