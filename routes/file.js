const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mime = require('mime');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

// File Upload router
router.post('/fileUpload', upload.any(), (req, res) => {
  if (!req.body) res.status(400).send('Nol files were uploaded.');
  if (res.statusCode === 200) res.status(200).send('File uploaded');
})

// File Download router
router.get('/fileDownload/:file', (req, res) => {
  let file = req.params.file;
  let fileLocation = `../jquery/uploads/${file}`;
  let mimetype = mime.lookup(fileLocation);
  res.set('Content-disposition', `attachment; filename=${file}`);
  res.set('Content-type', mimetype);
  fs.createReadStream(fileLocation).pipe(res);
})

// File Delete router
router.delete('/fileDelete/:file', (req, res) => {
  let fileLocation = path.join('../jquery/uploads', req.params.file);
  fs.unlinkSync(fileLocation);
  res.end();
})



module.exports = router;