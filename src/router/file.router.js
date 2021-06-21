const fileRoute = require('../core/routerConfig');
const fileController = require('../controller/file.controller');
const upload = require('../../utils/uploadr')

fileRoute.post('/', upload, fileController.uploadFile);
fileRoute.post('/send-email', fileController.sendEmail);
fileRoute.get('/:uuid', fileController.downloadFile);
fileRoute.get('/show/:uuid', fileController.showFile);

module.exports = fileRoute;
