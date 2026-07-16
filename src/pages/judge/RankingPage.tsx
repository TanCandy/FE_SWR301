import { useState } from 'react';
import { Trophy, Search, Medal, Crown } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import { Avatar } from '../../components/ui/Cards';
import Badge from '../../components/ui/Badge';
import SearchBar from '../../components/ui/SearchBar';

interface Team {
  id: string;
  rank: number;
  name: string;
  track: string;
  score: number;
  trend: 'up' | 'down' | 'same';
}

const mockRanking: Team[] = [
  { id: '1', rank: 1, name: 'Code Warriors', track: 'AI/ML', score: 9.2, trend: 'up' },
  { id: '2', rank: 2, name: 'Data Dragons', track: 'Data Science', score: 9.0, trend: 'same' },
  { id: '3', rank: 3, name: 'Quantum Coders', track: 'AI/ML', score: 8.5, trend: 'up' },
  { id: '4', rank: 4, name: 'Cloud Innovators', track: 'Cloud', score: 8.3, trend: 'down' },
  { id: '5', rank: 5, name: 'FinTech Wizards', track: 'FinTech', score: 8.1, trend: 'same' },
];

export default function JudgeRankingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const ranking = mockRanking.filter((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-amber-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-700" />;
    return <span className="w-8 text-center font-bold text-gray-500">{rank}</span>;
  };

  return (
    <SharedLayout
      title="Ranking"
      subtitle="Current leaderboard standings"
      breadcrumbs={[{ label: 'Ranking' }]}
    >
      <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search teams..." className="max-w-md mb-6" />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
          <div className="col-span-1">Rank</div>
          <div className="col-span-6">Team</div>
          <div className="col-span-3">Track</div>
          <div className="col-span-2 text-right">Score</div>
        </div>
        {ranking.map((team) => (
          <div key={team.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <div className="col-span-1">{getRankIcon(team.rank)}</div>
            <div className="col-span-6 flex items-center gap-3">
              <Avatar name={team.name} size="sm" />
              <span className="font-medium text-gray-900">{team.name}</span>
            </div>
            <div className="col-span-3">
              <Badge variant="blue">{team.track}</Badge>
            </div>
            <div className="col-span-2 text-right">
              <span className="text-xl font-bold text-blue-600">{team.score}</span>
            </div>
          </div>
        ))}
      </div>
    </SharedLayout>
  );
}
