const releaseMessage = (resolve) => require(['./main'], resolve);

module.exports = {
  path: '/releaseMessage',
  component: releaseMessage
};
