import assert from 'assert';
import { TennisMatch } from './src/match.js';

const match = new TennisMatch('A', 'B');
match.recordPoint('A');
match.recordPoint('A');
match.recordPoint('A');
match.recordPoint('A'); // game
assert.strictEqual(match.sets[0].games[0], 1);
assert.strictEqual(match.sets[0].games[1], 0);
console.log('Tests passed');
