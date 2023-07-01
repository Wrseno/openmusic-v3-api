const LikesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'Likes',
  version: '1.0.0',
  register: async (server, { service }) => {
    const likesHandler = new LikesHandler(service);
    server.route(routes(likesHandler));
  },
};
