export type TBaseType = {
  id: string
  author_login: string
  createdAt: Date
  updatedAt: Date
}

export type TUserData = {
  id: number
  first_name: string
  second_name: string
  display_name: string | null
  login: string
  avatar: string | null
  email: string
  phone: string
}
