import _ from 'underscore';
import common from './common';
import head from './head';
import login from './login';
import server from './server';

import auth from './system/auth';
import dict from './system/dict';
import organ from './system/organ';
import resource from './system/resource';

import userHead from './personal/head';
import myAuth from './personal/myAuth';
import securitySetting from './personal/securitySetting';
import userInfo from './personal/userInfo';

let zh = {};
zh = _.extend(zh, common);
zh = _.extend(zh, head);
zh = _.extend(zh, server);
zh = _.extend(zh, login);

zh = _.extend(zh, auth);
zh = _.extend(zh, dict);
zh = _.extend(zh, organ);
zh = _.extend(zh, resource);

zh = _.extend(zh, userHead);
zh = _.extend(zh, myAuth);
zh = _.extend(zh, securitySetting);
zh = _.extend(zh, userInfo);

export const zh_ = zh;
