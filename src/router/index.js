const baseRoute = require('../core/routerConfig');

baseRoute.get('/', (req, res) => res.status(200).send('<code>File Share Backend Running....</code>'));

module.exports = baseRoute;
