var express = require('express');
var router = express.Router();
let jwt = require('jsonwebtoken');
const aesCrypto = require('./aesCrypto');
const aesDecrypto = require('./decrypto');
const config = require("../config");
const passport = require("../auth/passport");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/*/* Post users Login. */
router.get('/login/:username/:password', async (req, res, next) => {
  let userdata = {
    username: req.body.username,
    password: req.body.password
  };
  let userparams = {
    username: req.params.username,
    password: req.params.password
  };


  //Go to server for user varificarion
  if (userparams.username == 'admin' && userparams.password == 'admin') {

    let token = jwt.sign(userdata, config.secretKey, {
      algorithm: config.algorithm,
      expiresIn: '5m'
    });
    debugger;

    //Crypto.encrypt('admin'); aes256ctrEncrypt,
    // aes256ctrDecrypt
    //var hw = Crypto.encrypt(userdata.username);
    let encryptedMsg = await aesCrypto.aes256ctrEncrypt(userparams.username, config.secretKey);
    console.log("Successfully encryptedMsg:", encryptedMsg);
    let decryptedPlainText = await aesDecrypto.aes256ctrDecrypt(encryptedMsg, 'pass');
    console.log("Successfully decrypted:", decryptedPlainText);
    //var decrypt = Crypto.decrypt(hw);
    // res.cookie('jwtoken', data.token);
    // res.cookie('loggeduser', data.user);
    res.status(200).json({
      message: 'Login Successfully',
      jwtoken: token,
      // encrypt: hw,
      // decrypt: decrypt,
      aesCrypto: encryptedMsg
      // decrypted: decryptedPlainText
    });
  }
  else {
    res.status(401).json({
      message: 'Login Failed'
    });
  }
  try {
    await aesCrypto.aes256ctrDecrypt(aesCrypto.encryptedMsg, "wrong!Pass");
  } catch (error) {
    console.log(error.message);
  }
});

/* Post users Login. */
router.post('/login/x', function (req, res, next) {
  passport.authenticate('local', function (data, err) {

    if (err) {
      //res.redirect('/users?status=' + encodeURIComponent('Error Login!!'));
      console.log(err.name + ':' + err.message);
    }
    else {
      console.log('x');
      // if (data.user != null) {
      //   console.log(data.user);
      //   res.cookie('jwtoken', data.token, { httpOnly: false });
      //   res.cookie('loggeduser', data.user, { httpOnly: true });
      //   res.status(200).json(data);
      // }
      // else if (data.status == 402) {
      //   res.clearCookie('jwtoken');
      //   res.clearCookie('loggeduser');
      //   console.log('Incorect Username');
      //   res.status(402).json({ status: '402' });
      // }
      // else if (data.status == 403) {
      //   res.clearCookie('jwtoken');
      //   res.clearCookie('loggeduser');
      //   console.log('Incorrect Details!!');
      //   res.status(403).json({ status: '403' });
      // }
      // else {
      //   res.clearCookie('jwtoken');
      //   res.clearCookie('loggeduser');
      //   console.log('Incorrect login details!!');
      //   res.status(401).json({
      //     message: 'Login Failed'
      //   });
      // }
    }
  })(req, res, next);
});




module.exports = router;
