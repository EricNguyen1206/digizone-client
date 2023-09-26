export interface ICart extends Record<string, string> {}

export interface ICartState {
  data: ICart[];
}
