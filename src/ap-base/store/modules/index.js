import _ from 'underscore';
import { baseStates, baseMutation } from './base';
import { loginState, loginMutation } from './login';
import { resourceState, resourceMutation } from './resource';
import { dictState, dictMutation } from './dict';

let states = {};
states = _.extend(states, baseStates);
states = _.extend(states, loginState);
states = _.extend(states, resourceState);
states = _.extend(states, dictState);

let mutation = {};
mutation = _.extend(mutation, baseMutation);
mutation = _.extend(mutation, loginMutation);
mutation = _.extend(mutation, resourceMutation);
mutation = _.extend(mutation, dictMutation);

export const baseState = states;
export const baseMutations = mutation;
