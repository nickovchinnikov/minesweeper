interface Action {
  type: string;
}

export const initialState = 0;

const INCREMENT = 'examples/Redux/counter/increment';
const DECREMENT = 'examples/Redux/counter/decrement';

export function reducer(state: number, action: Action): number {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      throw new Error();
  }
}

export const increment = (): Action => ({ type: INCREMENT });
export const decrement = (): Action => ({ type: DECREMENT });
