import _ from 'underscore';
import * as resourceGetters from './resource';
import * as baseGetters from './base';
import * as loginGetters from './login';

var getters = {};

getters = _.extend(getters, baseGetters);
getters = _.extend(getters, resourceGetters);
getters = _.extend(getters, loginGetters);

export default getters;
