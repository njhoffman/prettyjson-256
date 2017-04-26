import { render } from '../lib/prettyjson';
import { outputColorCodes } from '../lib/settings';
import obj1 from './objects/1.json';
import obj2 from './objects/2.json';
import obj3 from './objects/3.json';

// console.log(settings.outputColorCodes());

console.log(render(obj1));
console.log(render(obj2));
console.log(render(obj3));
