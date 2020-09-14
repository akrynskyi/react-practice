import * as counterActionTypes from './counterActionTypes';

const initialState = {
  counter: 0
};

export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case counterActionTypes.COUNTER_SET:
      return { counter: action.payload };
    case counterActionTypes.COUNTER_INCREASE:
      return { counter: state.counter + 1 };
    case counterActionTypes.COUNTER_DECREASE:
      return { counter: state.counter - 1 };
    default:
      return state;
  }
};