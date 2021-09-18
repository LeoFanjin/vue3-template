import _ from 'underscore';
import common from './common';
import head from './head';
import login from './login';
import server from './server';

import auth from './system/auth';
import dict from './system/dict';
import organ from './system/organ';
import resource from './system/resource';

var zh = {};
zh = _.extend(zh, common);
zh = _.extend(zh, head);
zh = _.extend(zh, server);
zh = _.extend(zh, login);

zh = _.extend(zh, auth);
zh = _.extend(zh, dict);
zh = _.extend(zh, organ);
zh = _.extend(zh, resource);

export const ug_ = zh;
