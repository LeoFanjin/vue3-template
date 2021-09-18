/* ap-system */
// const _ = require('underscore');
const systemRouter = require('./system/index.js');
// const projectSystem = require('../views/router');

// router
let router = systemRouter;
// router.children = _.union(router.children, projectSystem.children);

// // store
// let store = {
//   state: apSystem.store.state,
//   mutations: apSystem.store.mutations,
//   getters: apSystem.store.getters,
//   actions: apSystem.store.actions
// };

module.exports = { router };
