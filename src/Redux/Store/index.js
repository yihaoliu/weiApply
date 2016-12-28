
let configureStore = require('./configureStore.development');

if (process.env.NODE_ENV === 'development') {
  configureStore = require('./configureStore.development');
} else if(process.env.NODE_ENV === 'test'){
  configureStore = require('./configureStore.test');
}else {
  configureStore = require('./configureStore.production');
}

module.exports = configureStore;




