const { sendError, sendSuccess } = require('../../utils/responseHandler');
const { throwError } = require('../../utils/handleErrors');
const { v4: uuidv4 } = require('uuid');
const File = require('../models/file');
const sendMail = require('../../utils/email')
const template = require('../../utils/emailTemplate');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file && req.file.path) {
      throwError('Upload a file', 401);
    }

    const response = await File.create({
      filename: req.file.filename,
      uuid: uuidv4(),
      path: req.file.path,
      size: req.file.size
    });

    return sendSuccess(res, { url: `${process.env.BASE_URL}/api/v1/file/show/${response.uuid}`, uuid: `${response.uuid}` });
  } catch (err) {
    return sendError(res, err);
  }
};

exports.sendEmail = async (req, res) => {
  try {
    const { uuid, emailTo } = req.body;

    if(!uuid, !emailTo){
      throwError('All fields are required')
    }
    
    const file = await File.findOne({ uuid });

    if(!file){
      throwError('File not found', 404);
    }

    const Etemplate = template('InShare', `${process.env.BASE_URL}/api/v1/file/${file.uuid}`, parseInt(file.size/1000) + 'KB', '24 hours');

    await sendMail(emailTo, 'InShare File Share', Etemplate);

    return sendSuccess(res, {}, 'Email sent');
  } catch (err) {
    return sendError(res, err);
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const { uuid } = req.params;

    if(!uuid){
      throwError('missing uuid', 401);
    }
    
    const file = await File.findOne({ uuid });

    if(!file){
      throwError('File not found', 404);
    }
    const filePath = `${__dirname}/../../${file.path}`;
    res.download(filePath);
  } catch (err) {
    return sendError(res, err);
  }
};

exports.showFile = async (req, res) => {
  try {
    const { uuid } = req.params;
    const file = await File.findOne({ uuid });

    if(!file){
      return res.render('download', { error: 'Link has been expired' });
    }
    return res.render('download', {
      uuid: file.uuid, 
      fileName: file.filename, 
      fileSize: file.size, 
      downloadLink: `${process.env.BASE_URL}/api/v1/file/${file.uuid}`
    });
  } catch (err) {
    return res.render('download', {error: 'Something went wrong'})
  }
};

