const { createServer } = require('http');
const app = require('./server');
const { PORT } = require('./src/core/config');

const server = createServer(app);
server.listen(PORT, () => console.log(`File share Server Started on port ${PORT}`));
