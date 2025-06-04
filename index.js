import { TennisMatch } from './src/match.js';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(query) {
  return new Promise(resolve => rl.question(query, ans => resolve(ans)));
}

async function main() {
  const player1 = await ask('Player 1 name: ');
  const player2 = await ask('Player 2 name: ');
  const match = new TennisMatch(player1, player2);
  console.log(`Match start: ${player1} vs ${player2}`);
  console.log('Enter point winner name (or exit):');
  while (true) {
    const ans = await ask('> ');
    if (!ans || ans.toLowerCase() === 'exit') break;
    const winner = ans.trim();
    match.recordPoint(winner);
    console.log(match.getScore());
  }
  rl.close();
}

main();
