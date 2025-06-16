export interface MatchSettings {
  playerA: string;
  playerB: string;
  noAd: boolean;
  thirdSet: 'tiebreak10' | 'set' | 'none';
  startingServer: 'A' | 'B';
}

export interface PointDetail {
  type: 'winner' | 'forced-error' | 'unforced-error' | 'ace' | 'double-fault';
  rallyCount: number;
  firstServeIn: boolean;
}

export interface Point extends PointDetail {
  winner: 'A' | 'B';
}

export interface MatchState {
  settings: MatchSettings;
  points: Point[];
  /** Current game points: 0=0,1=15,2=30,3=40,4=AD */
  gamePoints: [number, number];
  games: [number, number];
  sets: [number, number][];
  server: 'A' | 'B';
  tiebreakPoints: [number, number];
  inTiebreak: boolean;
  complete: boolean;
}
