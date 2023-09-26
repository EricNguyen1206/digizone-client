import { CombinedReducer, CombinedState, ReducerMap } from "@/types/store";

function combineReducers<S, A>(
  reducers: ReducerMap<S, A>
): CombinedReducer<S, A> {
  return ((
    state: CombinedState<S> = {} as CombinedState<S>,
    action: A
  ): CombinedState<S> => {
    const nextState: CombinedState<S> = {} as CombinedState<S>;
    for (const key in reducers) {
      nextState[key] = reducers[key](state[key], action);
    }
    return nextState;
  }) as CombinedReducer<S, A>;
}

export { combineReducers };
