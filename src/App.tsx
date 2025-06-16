import { useState } from 'react';
import CreateMatchForm from './components/CreateMatchForm';
import Scoreboard from './components/Scoreboard';
import { MatchSettings, MatchState } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  const [match, setMatch] = useLocalStorage<MatchState | null>('currentMatch', null);
  const handleNewMatch = (settings: MatchSettings) => {
    const newMatch: MatchState = {
      settings,
      points: [],
      gamePoints: [0, 0],
      games: [0, 0],
      sets: [[0, 0]],
      server: settings.startingServer,
      tiebreakPoints: [0, 0],
      inTiebreak: false,
      complete: false,
    };
    setMatch(newMatch);
  };

  if (!match) {
    return <CreateMatchForm onCreate={handleNewMatch} />;
  }

  return <Scoreboard match={match} onUpdate={setMatch} />;
}
