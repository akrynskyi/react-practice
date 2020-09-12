import { Timer } from './Timer';

export const format = (val) => (val < 10 ? `0${val}` : `${val}`);

export default Timer;