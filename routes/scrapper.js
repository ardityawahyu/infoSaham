var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
var prevLast = '0';

router.get('/saham', function(req, res) {

    console.log(req.query.code);
    //if file exist
    fs.access(pathFileSaham, fs.constants.R_OK, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log("Do Nothing" + err);
            } else {
                throw "error " + err;
            }
        } else {
            //read the file
            fs.readFile(pathFileSaham, 'utf8', function(err, dataSaham){
                if (err) throw 'error reading file: ' + err;
                console.log(dataSaham);
                if(dataSaham != '') {
                    try {
                        dataSaham = JSON.parse(dataSaham);
                        prevLast = dataSaham.last;
                    } catch (error) {
                        console.log("file contains error");
                    }
                }
            });
        }
    });

    options = {
        url: 'https://www.indopremier.com/ipotstock/newsSmartSearch.php?code='+req.query.code,
        // proxy: '172.18.104.8:1707'
    }
    console.log('requesting...');
    request(options, function(error, response, html){
        if(!error) {
            var resultArr = new Array();
            var resultObj = new Object();
            var $ = cheerio.load(html);
            var newLast = $("div.panel-toolbar.pull-right > table > tbody > tr > td").next().text().trim();
            console.log(prevLast+ " --- "+newLast);
            if(prevLast == newLast) {
                console.log("Update: NO, last value still same");
                res.send(JSON.stringify({"status": 200, "error": null, "response": "no update"}));
            } else {
                console.log("Update: YES, processing");
                resultArr.push({'field' : 'last', 'theval' : newLast});
                resultObj.last = newLast;
                
                var others = $("div.pr5.pt5 > table > tbody > tr > td");
                var j = 0;
                var field, theval = '';
                others.each(function(i,elem){
                    if($(this).text().trim() !== '') {
                        if (j % 2 == 0) {
                            field = $(this).text().trim();
                        } else if (j % 2 == 1) {
                            theval = $(this).text().trim();
                            resultArr.push({'field' : field.toLowerCase(), 'theval' : theval});
                            resultObj[field.toLowerCase()] = theval;
                        } 
                        j++;
                    }
                });
                var currentdate = new Date(); 
                var datetime = currentdate.getFullYear() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getDate() + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
                resultArr.push({'field' : 'last_update', 'theval' : datetime});
                resultObj.last_update = datetime;
                console.log(JSON.stringify(resultObj));
                
                fs.writeFile(pathFileSaham, JSON.stringify(resultObj), function(err){
                    if (err) throw 'error writing file: ' + err;
                });

                res.send(JSON.stringify({"status": 200, "error": null, "response": "updated"}));
            }
        } else {
            console.log('error:',error);
            res.send(JSON.stringify({"status": 500, "error": error, "response": response.statusCode}));
        }
    });
});
module.exports = router;