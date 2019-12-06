// require('../integration/integration');
const pjson = require('../../lib/prettyjson');

const a = {
  name: {
    age: {
      name: 'name',
      three: 'three',
      next: {
        another: {
          hey: 'hey',
          bye: 'bye'
        }
      }
    }
  }
};

pjson.init({
  depth: 3
});

console.log(pjson.render(a));
console.log('=====================================');
console.log(pjson.render(a, 2, { depth: 2 }));
console.log('=====================================');
console.log(pjson.render(a));
