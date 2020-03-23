var passport = require('passport');
var strategy = require('passport-local');
//let sql = require("mssql/msnodesqlv8");
var config = require('../config');
let jwt = require('jsonwebtoken');
//let Master = require('../connection/master');
const axios = require('axios');

passport.use(new strategy({ session: false }, function (username, password, callback) {

    var userdata = [{
        paramName: "Username",
        dataType: sql.VarChar(50),
        value: username
    }];

    console.log(userdata);
    //     callback({ user: userdata, token: userdata, status: '200' });
    // axios.post('http://localhost:8989/api/login/login',{


    //})

    // //Get Data From Database
    // new Master().executeQuery(query, userdata, function (data, err) {

    //     if (err) {
    //         callback(null, err);
    //     } else {
    //         console.log(data);
    //         var result = data.recordset;

    //         if (result.length > 0) {
    //             var encodedHash = data.recordset[0].Password;
    //             var upassword = new Buffer.from(userpassword);
    //             crypto.randomBytes(32, function (err, salt) {
    //                 if (err) throw err;
    //                 argon2i.verify(encodedHash, upassword).then(correct => {
    //                     if (correct) {
    //                         // res.status(200).json('Correct password!');
    //                         let token = jwt.sign(result[0], config.secretKey, {
    //                             algorithm: config.algorithm,
    //                             expiresIn: '15m'
    //                         });

    //                         callback({
    //                             user: {
    //                                 userName: result[0].userName,
    //                                 firstName: result[0].FirstName,
    //                                 lastName: result[0].LastName,
    //                                 userType: result[0].usertype,
    //                                 userId: result[0].userId
    //                             }, token: token, status: '200'
    //                         });

    //                     }
    //                     else {

    //                         callback({ user: null, token: null, status: '403' });
    //                     }
    //                 });
    //             });

    //         }

    //         else {

    //             callback({ user: null, token: null, status: '402' });
    //         }
    //     }

    // });
}));

module.exports = passport;