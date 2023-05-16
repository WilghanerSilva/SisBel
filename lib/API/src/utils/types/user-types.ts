export type User = {
  name: string,
  email: string,
  password?: string,
  phone: string
}

export type CreateUserData = {
  email: string,
  name: string,
  phone: string,
  password: string,
  profile: string
}