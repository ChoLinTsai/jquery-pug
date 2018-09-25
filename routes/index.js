let express = require("express");
let router = express.Router();
let fs = require('fs');


router.get('/', (req, res) => {

  if (req.session.user) {
    return res.redirect('/manager');
  } else {
    return res.render('index')
  }

})


router.get('/manager', (req, res) => {
  userCheck(req, res, () => {
    let filePath = '../jquery/uploads';
    let fileName = [];
    let db = req.con;
    let getAllUsers = `
      SELECT
        id, first_name, last_name, email,
        UNIX_TIMESTAMP(created_time) as created_time,
        UNIX_TIMESTAMP(updated_time) as updated_time
      FROM
        users;
    `;

    fs.readdir(filePath, (err, data) => {
      return data.map(file => {
        fileName.push(file)
      });
    })



    db.query(getAllUsers, (err, result) => {
      let view = {
        result: result,
        user: req.session.user,
        fileName: fileName,
      }
      res.render('manager', { view });
    })
  })
})

// user login check
function userCheck(req, res, cb) {
  if (req.session.user === undefined) {
    return res.redirect('/');
  }
  cb();
}

module.exports = router;
