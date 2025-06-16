import { useState } from 'react';
import { MatchSettings } from '../types';

type Props = {
  onCreate: (settings: MatchSettings) => void;
};

export default function CreateMatchForm({ onCreate }: Props) {
  const [playerA, setPlayerA] = useState('');
  const [playerB, setPlayerB] = useState('');
  const [noAd, setNoAd] = useState(false);
  const [thirdSet, setThirdSet] = useState<'tiebreak10' | 'set' | 'none'>('tiebreak10');
  const [startingServer, setStartingServer] = useState<'A' | 'B'>('A');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ playerA, playerB, noAd, thirdSet, startingServer });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem' }}>
      <h1>New Match</h1>
      <div>
        <label>
          Player A
          <input value={playerA} onChange={(e) => setPlayerA(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Player B
          <input value={playerB} onChange={(e) => setPlayerB(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          No-Ad
          <input type="checkbox" checked={noAd} onChange={(e) => setNoAd(e.target.checked)} />
        </label>
      </div>
      <div>
        <label>
          Third Set
          <select value={thirdSet} onChange={(e) => setThirdSet(e.target.value as any)}>
            <option value="tiebreak10">Match Tiebreak</option>
            <option value="set">Normal Set</option>
            <option value="none">Disabled</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Starting Server
          <select value={startingServer} onChange={(e) => setStartingServer(e.target.value as any)}>
            <option value="A">Player A</option>
            <option value="B">Player B</option>
          </select>
        </label>
      </div>
      <button type="submit">Create Match</button>
    </form>
  );
}
