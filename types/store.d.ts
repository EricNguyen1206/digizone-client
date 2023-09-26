// CustomTypes.ts

type Reducer<S, A> = (state: S, action: A) => S;

type ReducerMap<S, A> = {
  [K in keyof S]: Reducer<S[K], A>;
};

type CombinedReducer<S, A> = Reducer<S, A> & {
  _reducerMap: ReducerMap<S, A>;
};

type CombinedState<S> = {
  [K in keyof S]: S[K];
};

type Action = {
  type: string;
  payload?: any;
};

type Dispatch = (action: Action) => void;

export {
  Reducer,
  ReducerMap,
  CombinedReducer,
  CombinedState,
  Action,
  Dispatch,
};
