var fs = require('fs');
var request = require('request');
var path = require('path');
var folderPath = path.resolve(__dirname, '../src/configs');

var env = process.env.NODE_ENV;
var baseUrl = 'http://op.krspace.cn';


switch(env){

    case 'prod':{
      baseUrl = 'http://op.krspace.cn';
      break;
    }

    case 'test':{
      baseUrl = 'http://optest.krspace.cn';
      break;
    }

    case 'test01':{
      baseUrl = 'http://optest01.krspace.cn';
      break;
    }

    case 'test02':{
      baseUrl = 'http://optest02.krspace.cn';
      break;
    }

    default:{
      baseUrl = 'http://optest02.krspace.cn';
    }

}


function loadDictionaryData(callback){
    var cityFile = path.resolve(folderPath, 'dictionary.js');
    request(baseUrl+'/api/krspace-finance-web/dict/common', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.writeFileSync(cityFile, 'module.exports = '+JSON.stringify(JSON.parse(body).data))+";";
            callback && callback();
        }
    })
}


loadDictionaryData();
