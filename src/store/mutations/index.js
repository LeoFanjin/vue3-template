import { sysStates, sysMutations } from '../../ap-base/store/index';

let states = Object.assign({}, sysStates);
let mutation = Object.assign({}, sysMutations);

export const baseState = states;
export const baseMutations = mutation;
