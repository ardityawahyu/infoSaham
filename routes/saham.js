var express = require('express');
var fs = require('fs');
var router = express.Router();

/**
 * @api {get} /api/v1/saham Get Informasi saham dari web BRI
 * @apiName GetSaham
 * @apiGroup Saham
 *
 * @apiSuccess {int} id Primary Key ID
 * @apiSuccess {int} date_time  
 * @apiSuccess {decimal} last  
 * @apiSuccess {string} plus_minus_persen  
 * @apiSuccess {string} hight_low  
 * @apiSuccess {string} open_close  
 * @apiSuccess {decimal} volume  
 * @apiSuccess {timestamp} updated  
 */
router.get('/', function(req, res, next) {//dbconn
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'bri'
  });
  connection.connect();

  connection.query("SELECT * FROM tbl_site_saham", function(error, results, fields){
    if (error) {
      res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
      //If there is error, we send the error in the error section with 500 status
    } else {
		  res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    };
  });
});

/**
 * @api {get} /api/v1/saham/file Get Informasi saham dari IndoPremier
 * @apiName GetSahamFile
 * @apiGroup Saham
 *
 * @apiSuccess {string} last
 * @apiSuccess {string} prev
 * @apiSuccess {string} open
 * @apiSuccess {string} lot
 * @apiSuccess {string} chg
 * @apiSuccess {string} high
 * @apiSuccess {string} val
 * @apiSuccess {string} %
 * @apiSuccess {string} low
 * @apiSuccess {string} avg
 * @apiSuccess {string} last_update
 */
router.get('/file', function(req, res){
  var responseStatus = false;
  var responseData = '';
  fs.readFile(pathFileSaham, 'utf8', function(err, dataSaham){
    if (err) responseData = err;
    if (dataSaham != '') {
      try {
        JSON.parse(dataSaham);
        responseStatus = true;
        responseData = dataSaham;
        // console.log(responseStatus);
      } catch (err) {
        responseData = err;
      }
    } else {
      responseData = "data empty";
    }
    if(responseStatus)
      res.send(JSON.stringify({"status": 200, "error": null, "response": responseData}));
    else res.send(JSON.stringify({"status": 500, "error": responseData, "response": null}));
  });

  // if(responseStatus) res.send(JSON.stringify({"status": 200, "error": null, "response": responseData}));
  // else res.send(JSON.stringify({"status": 500, "error": responseData, "response": null}));
});

module.exports = router;
