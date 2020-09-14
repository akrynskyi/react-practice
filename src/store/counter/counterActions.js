import * as counterActionTypes from './counterActionTypes';

export const setCounter = (payload) => ({ type: counterActionTypes.COUNTER_SET, payload });
export const increaseCounter = () => ({ type: counterActionTypes.COUNTER_INCREASE });
export const decreaseCounter = () => ({ type: counterActionTypes.COUNTER_DECREASE });