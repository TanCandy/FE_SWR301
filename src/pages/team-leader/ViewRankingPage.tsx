import { useState } from 'react';
import { Trophy, Search, Filter, ChevronUp, ChevronDown, Medal, Crown } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import { Avatar } from '../../components/ui/Cards';
import Badge from '../../components/ui/Badge';
import SearchBar from '../../components/ui/SearchBar';

interface Team {
  id: string;
  rank: number;
  name: string;
  members: number;
  score: number;
  track: string;
}

const mockTeams: Team[] = [
  { id: '1', rank: 1, name: 'Code Warriors', members: 5, score: 9.2, track: 'AI/ML' },
  { id: '2', rank: 2, name: 'Data Dragons', members: 4, score: 9.0, track: 'Data Science' },
  { id: '3', rank: 3, name: 'Quantum Coders', members: 5, score: 8.5, track: 'AI/ML' },
  { id: '4', rank: 4, name: 'Cloud Innovators', members: 4, score: 8.3, track: 'Cloud' },
  { id: '5', rank: 5, name: 'FinTech Wizards', members: 3, score: 8.1, track: 'FinTech' },
  { id: '6', rank: 6, name: 'Health Tech Heroes', members: 5, score: 7.9, track: 'HealthTech' },
  { id: '7', rank: 7, name: 'EduLearn Masters', members: 4, score: 7.6, track: 'EdTech' },
  { id: '8', rank: 8, name: 'Green Tech Warriors', members: 3, score: 7.4, track: 'Sustainability' },
];

export default function ViewRankingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'rank' | 'score'>('rank');
  const [filterTrack, setFilterTrack] = useState('all');

  const filteredTeams = mockTeams
    .filter((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((t) => filterTrack === 'all' || t.track === filterTrack)
    .sort((a, b) => (sortBy === 'rank' ? a.rank - b.rank : b.score - a.score));

  const tracks = ['all', ...new Set(mockTeams.map((t) => t.track))];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-amber-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-700" />;
    return <span className="w-8 text-center font-medium">{rank}</span>;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-amber-50 border-amber-200';
    if (rank === 2) return 'bg-gray-50 border-gray-200';
    if (rank === 3) return 'bg-orange-50 border-orange-200';
    return '';
  };

  return (
    <SharedLayout
      title="View Ranking"
      subtitle="Live leaderboard standings"
      breadcrumbs={[{ label: 'View Ranking' }]}
    >
      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {filteredTeams.slice(0, 3).map((team, idx) => (
          <div
            key={team.id}
            className={`rounded-2xl p-6 border-2 ${getRankBg(team.rank)} ${
              team.rank === 1 ? 'order-2 md:order-1' : team.rank === 2 ? 'order-1 md:order-2' : 'order-3'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                team.rank === 1 ? 'bg-amber-100' : team.rank === 2 ? 'bg-gray-100' : 'bg-orange-100'
              }`}>
                {getRankIcon(team.rank)}
              </div>
              <h3 className="font-bold text-lg text-gray-900">{team.name}</h3>
              <Badge variant="blue" className="mt-2">{team.track}</Badge>
              <div className="mt-4">
                <p className="text-3xl font-bold text-blue-600">{team.score}</p>
                <p className="text-sm text-gray-500">Average Score</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search teams..."
          className="max-w-md"
        />
        <select
          value={filterTrack}
          onChange={(e) => setFilterTrack(e.target.value)}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {tracks.map((track) => (
            <option key={track} value={track}>
              {track === 'all' ? 'All Tracks' : track}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3">
          <span className="text-sm text-gray-500">Sort by:</span>
          <button
            onClick={() => setSortBy('rank')}
            className={`px-3 py-2 text-sm font-medium rounded-lg ${sortBy === 'rank' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}`}
          >
            Rank
          </button>
          <button
            onClick={() => setSortBy('score')}
            className={`px-3 py-2 text-sm font-medium rounded-lg ${sortBy === 'score' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}`}
          >
            Score
          </button>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">Team</div>
          <div className="col-span-3">Track</div>
          <div className="col-span-3 text-right">Score</div>
        </div>
        <div className="divide-y divide-gray-50">
          {filteredTeams.map((team) => (
            <div key={team.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-1">
                <div className="flex items-center">
                  {getRankIcon(team.rank)}
                </div>
              </div>
              <div className="col-span-5">
                <p className="font-medium text-gray-900">{team.name}</p>
                <p className="text-sm text-gray-500">{team.members} members</p>
              </div>
              <div className="col-span-3">
                <Badge variant="blue">{team.track}</Badge>
              </div>
              <div className="col-span-3 text-right">
                <span className="text-xl font-bold text-blue-600">{team.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SharedLayout>
  );
}
