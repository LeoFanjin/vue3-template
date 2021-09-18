import _ from 'underscore';
import * as baseActions from './base';
import * as loginActions from './login';
import * as authActions from './auth';
import * as resourceActions from './resource';

import * as systemOrganAction from './system/organ/organ';
import * as systemResourceAction from './system/resource/resource';
import * as systemOperationAction from './system/resource/operation';
import * as systemDictAction from './system/dict/dict';
import * as systemAuthAction from './system/auth/auth';
import * as systemPermissionAction from './system/auth/permission';
import * as systemRoleAction from './system/auth/role';
import * as systemUserAction from './system/user/user';

var actions = {};

actions = _.extend(actions, baseActions);
actions = _.extend(actions, loginActions);
actions = _.extend(actions, authActions);
actions = _.extend(actions, resourceActions);

actions = _.extend(actions, systemOrganAction);
actions = _.extend(actions, systemResourceAction);
actions = _.extend(actions, systemOperationAction);
actions = _.extend(actions, systemDictAction);
actions = _.extend(actions, systemAuthAction);
actions = _.extend(actions, systemPermissionAction);
actions = _.extend(actions, systemRoleAction);
actions = _.extend(actions, systemUserAction);

export default actions;
