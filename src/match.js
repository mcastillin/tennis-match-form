export class TennisMatch {
  constructor(player1, player2, setsToWin = 2, gamesPerSet = 6) {
    this.players = [player1, player2];
    this.setsToWin = setsToWin;
    this.gamesPerSet = gamesPerSet;
    this.reset();
  }

  reset() {
    this.currentSet = 0;
    this.sets = [{ games: [0, 0], points: [0, 0] }];
    this.winner = null;
  }

  pointValue(p) {
    const values = [0, 15, 30, 40];
    return values[p] || 'A';
  }

  recordPoint(winnerName) {
    if (this.winner) return;
    const w = this.players.indexOf(winnerName);
    if (w === -1) return;
    const l = 1 - w;
    const set = this.sets[this.currentSet];
    const points = set.points;
    if (points[w] >= 3 && points[w] - points[l] >= 1) {
      // wins game
      points[0] = points[1] = 0;
      set.games[w] += 1;
      if (set.games[w] >= this.gamesPerSet && set.games[w] - set.games[l] >= 2) {
        // wins set
        this.currentSet += 1;
        this.sets.push({ games: [0, 0], points: [0, 0] });
        const setsWon = this.sets.reduce((acc, s) => acc + (s.games[w] > s.games[l] ? 1 : 0), 0);
        if (setsWon >= this.setsToWin) {
          this.winner = this.players[w];
        }
      }
    } else {
      points[w] += 1;
    }
  }

  formatSet(set) {
    return `${set.games[0]}-${set.games[1]}`;
  }

  getScore() {
    const set = this.sets[this.currentSet];
    const pointScore = `${this.pointValue(set.points[0])}-${this.pointValue(set.points[1])}`;
    const setScores = this.sets.slice(0, this.currentSet).map(s => this.formatSet(s)).join(' ');
    const current = `${setScores} [${pointScore}]`;
    return this.winner ? `${this.winner} wins ${current}` : current;
  }
}
