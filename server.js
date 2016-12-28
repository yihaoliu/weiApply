var Koa = new require('koa');
var app = new Koa();
var path = require('path');
var router = require('koa-router')();
var onerror = require('koa-onerror');
var convert = require('koa-convert');
var compress = require('koa-compress');
var logger = require('koa-logger');
var json = require('koa-json');
var views = require("koa-views");
var bodyparser = require('koa-bodyparser');
var staticDir = require('koa-static');
var open = require('open');

var webpack = require('webpack');
var webpackDevMiddleware = require('koa-webpack-dev-middleware');
var webpackHotMiddleware = require('koa-webpack-hot-middleware');

var config = require('./configs/config');
var webpackConfig = require('./webpack/webpack-'+process.env.NODE_ENV+'.config');
webpackConfig.entry.development = [];
webpackConfig.entry.development.unshift("webpack/hot/dev-server");
webpackConfig.entry.development.unshift("webpack/hot/only-dev-server");
//webpackConfig.entry.development.unshift('webpack-hot-middleware/client?path=/__webpack_hmr');
//webpackConfig.entry.unshift("webpack-dev-server/client?http://127.0.0.1:8001");

var compiler = webpack(webpackConfig);


app.use(convert(compress()));

app.use(convert(staticDir(path.join(__dirname,'static'))));

app.use(convert(bodyparser()));

app.use(convert(json()));

app.use(convert(logger()));

app.use(convert(function* (next){

	var start = new Date();
	yield next;
	var ms = new Date - start;
	console.log('%s-%s-%s',this.mothed,this.url,ms);
}));

app.use(convert(views(__dirname + '/static')));

app.use(convert(webpackDevMiddleware(compiler,{
	hot: true,
	inline: true,
	quiet: false,
	noInfo: true,
	watchOptions:{
		aggregateTimeout:300,
		poll:true
	},
	host:'optest.krspace.cn',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
	},
	contentBase:'./static/',
	publicPath:webpackConfig.output.publicPath,
	stats: {
		colors: true,
		hash: false,
		version: false,
		chunks: false,
		children: false,
	},
})));

app.use(convert(webpackHotMiddleware(compiler),{
	log: console.log,
	path: '/__webpack_hmr',
	heartbeat: 10 * 1000
}));

//var indexRouter = require('./configs/routes');

var router = require('koa-router')();

router.get('*',function *(next){
	yield this.render('index.html');
});

//router.use('/',indexRouter.routes(),indexRouter.allowedMethods());

app.use(convert(router.routes()));

app.on('error',function(err,ctx){
	console.log('service error',err,ctx);
});

app.listen(config.app.port,'127.0.0.1',function(){
	console.log('正在启动......');
	//open('http://localhost:' + config.app.port);
});


module.exports = app;
