export interface IUser extends Record<string, string> {}

export interface IUserState {
  data: IUser | null
}