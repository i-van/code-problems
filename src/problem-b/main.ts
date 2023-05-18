import { existsSync, readFileSync } from 'fs';
import { runInstructions } from './index';

let { argv: [_1, _2, input] } = process;
if (existsSync(input)) {
  console.log('reading instructions from file', input);
  input = String(readFileSync(input));
} else {
  console.log('running instructions', input);
}

const context = runInstructions(input);
console.log(context);
console.log(`'a' is`, JSON.stringify(context.get('a')));
