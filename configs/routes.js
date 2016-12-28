var router = require('koa-router')();

router.get('*',function *(next){
	yield this.render('index.html');
});


module.exports = router;




