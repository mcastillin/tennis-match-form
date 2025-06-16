import { useState } from 'react';
import { MatchState, PointDetail } from '../types';

interface Props {
  match: MatchState;
  onUpdate: (match: MatchState) => void;
}

const POINT_LABELS = ['0', '15', '30', '40', 'AD'];

export default function Scoreboard({ match, onUpdate }: Props) {
  const { settings } = match;

  const addPoint = (winner: 'A' | 'B', detail: PointDetail) => {
    if (match.complete) return;
    const next = { ...match } as MatchState;
    next.points = [...next.points, { winner, ...detail }];

    if (next.inTiebreak) {
      const idx = winner === 'A' ? 0 : 1;
      next.tiebreakPoints[idx] += 1;
      const target = settings.thirdSet === 'tiebreak10' && next.sets.length === 3 ? 10 : 7;
      if (next.tiebreakPoints[idx] >= target &&
          next.tiebreakPoints[idx] - next.tiebreakPoints[1 - idx] >= 2) {
        // win tiebreak
        next.games[idx] += 1;
        next.sets[next.sets.length - 1][idx] += 1;
        next.tiebreakPoints = [0, 0];
        next.inTiebreak = false;
        next.gamePoints = [0, 0];
        checkSetOver(next);
      }
    } else {
      const idx = winner === 'A' ? 0 : 1;
      const opp = 1 - idx;
      next.gamePoints[idx] += 1;

      if (next.gamePoints[idx] >= 4 && next.gamePoints[idx] - next.gamePoints[opp] >= 2) {
        next.games[idx] += 1;
        next.sets[next.sets.length - 1][idx] += 1;
        next.gamePoints = [0, 0];
        checkSetOver(next);
      } else if (settings.noAd && next.gamePoints[idx] === 4) {
        next.games[idx] += 1;
        next.sets[next.sets.length - 1][idx] += 1;
        next.gamePoints = [0, 0];
        checkSetOver(next);
      }
    }

    next.server = next.server === 'A' ? 'B' : 'A';
    onUpdate(next);
  };

  function checkSetOver(state: MatchState) {
    const [aGames, bGames] = state.sets[state.sets.length - 1];
    if (aGames >= 6 || bGames >= 6) {
      if (Math.abs(aGames - bGames) >= 2) {
        startNewSet(state);
      } else if (aGames === 6 && bGames === 6) {
        state.inTiebreak = true;
      }
    }
  }

  function startNewSet(state: MatchState) {
    if (state.sets.length === 3 || (state.sets.length === 2 && settings.thirdSet === 'none')) {
      state.complete = true;
      return;
    }
    state.sets.push([0, 0]);
  }

  const recordPoint = (winner: 'A' | 'B') => {
    const detail: PointDetail = { type: 'winner', rallyCount: 0, firstServeIn: true };
    addPoint(winner, detail);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>
        {settings.playerA} vs {settings.playerB}
      </h1>
      {match.sets.map((set, idx) => (
        <div key={idx}>
          Set {idx + 1}: {set[0]} - {set[1]}
        </div>
      ))}
      {!match.complete && (
        <div>
          <h2>Game: {POINT_LABELS[match.gamePoints[0]]} - {POINT_LABELS[match.gamePoints[1]]}</h2>
          {match.inTiebreak && (
            <p>Tiebreak: {match.tiebreakPoints[0]} - {match.tiebreakPoints[1]}</p>
          )}
          <p>Server: {match.server === 'A' ? settings.playerA : settings.playerB}</p>
          <button onClick={() => recordPoint('A')}>Point {settings.playerA}</button>
          <button onClick={() => recordPoint('B')}>Point {settings.playerB}</button>
        </div>
      )}
      {match.complete && <h2>Match Finished</h2>}
    </div>
  );
}
