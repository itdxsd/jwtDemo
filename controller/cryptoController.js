var express = require('express');
var router = express.Router();
let custService = require('../dataServices/userAdminService1');
let verifyToken = require('../auth/verifytoken');
//const mybatisMapper = require('mybatis-mapper');


/* GET customers listing. */
router.get('/:username', function (req, res, next) {

    let status = req.query.status;
    let decoded =[req.params.username];
    //let decoded = req.decoded.ClientNumber;
    //Service Call
   
    new custService().getDatabyID(decoded, req, res, function (data, err) {
        if (err) {
            console.log('Error Loading Data!!');
        } else {
            // res.render('customers', { customerdata: data.recordset, message: status });
            res.status(200).json(data);
        }
    });

});

/* GET customers listing. */
router.post('/', function (req, res, next) {

    let status = req.query.status;
    let decoded = [req.body.username];
    //let decoded = req.decoded.ClientNumber;
    //Service Call

   
    new custService().getDatabyID(decoded, req, res, function (data, err) {
        if (err) {
            console.log('Error Loading Data!!');
        } else {
            // res.render('customers', { customerdata: data.recordset, message: status });
            res.status(200).json(data);
        }
    });

});



module.exports = router;