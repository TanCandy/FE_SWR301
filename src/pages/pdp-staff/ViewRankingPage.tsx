import { useState } from 'react';
import { Trophy, Search, Filter, Medal, Crown, Download, FileText, History, TrendingUp } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import { Avatar } from '../../components/ui/Cards';
import Badge from '../../components/ui/Badge';
import SearchBar from '../../components/ui/SearchBar';
import Pagination from '../../components/ui/Pagination';

interface Team {
  id: string;
  rank: number;
  name: string;
  members: number;
  score: number;
  track: string;
  round: string;
  trend: 'up' | 'down' | 'same';
}

const mockTeams: Team[] = [
  { id: '1', rank: 1, name: 'Team Alpha', members: 5, score: 92.5, track: 'AI/ML', round: 'Round 2', trend: 'up' },
  { id: '2', rank: 2, name: 'Code Warriors', members: 4, score: 89.8, track: 'FinTech', round: 'Round 2', trend: 'same' },
  { id: '3', rank: 3, name: 'Quantum Coders', members: 5, score: 86.5, track: 'AI/ML', round: 'Round 2', trend: 'up' },
  { id: '4', rank: 4, name: 'Cloud Innovators', members: 4, score: 84.2, track: 'Cloud', round: 'Round 2', trend: 'down' },
  { id: '5', rank: 5, name: 'Data Dragons', members: 5, score: 82.1, track: 'Data Science', round: 'Round 2', trend: 'up' },
  { id: '6', rank: 6, name: 'FinTech Wizards', members: 3, score: 81.0, track: 'FinTech', round: 'Round 2', trend: 'same' },
  { id: '7', rank: 7, name: 'Health Tech Heroes', members: 5, score: 79.5, track: 'HealthTech', round: 'Round 2', trend: 'down' },
  { id: '8', rank: 8, name: 'EduLearn Masters', members: 4, score: 77.8, track: 'EdTech', round: 'Round 2', trend: 'up' },
  { id: '9', rank: 9, name: 'Green Tech', members: 3, score: 76.2, track: 'Sustainability', round: 'Round 2', trend: 'same' },
  { id: '10', rank: 10, name: 'Mobile Masters', members: 4, score: 75.1, track: 'Mobile', round: 'Round 2', trend: 'up' },
];

const rankingHistory = [
  { round: 'Round 1', topTeam: 'Code Warriors', topScore: 88.5, teams: 152 },
  { round: 'Round 2', topTeam: 'Team Alpha', topScore: 92.5, teams: 142 },
];

export default function PdpViewRankingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [trackFilter, setTrackFilter] = useState('all');
  const [roundFilter, setRoundFilter] = useState('round2');
  const [currentPage, setCurrentPage] = useState(1);

  const tracks = ['all', ...new Set(mockTeams.map((t) => t.track))];

  const filteredTeams = mockTeams
    .filter((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((t) => trackFilter === 'all' || t.track === trackFilter);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-amber-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-700" />;
    return <span className="w-8 text-center font-medium">{rank}</span>;
  };

  return (
    <SharedLayout
      title="View Ranking"
      subtitle="Live leaderboard standings and ranking history"
      breadcrumbs={[{ label: 'View Ranking' }]}
      actions={
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50">
            <FileText className="w-4 h-4" />
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            <Download className="w-4 h-4" />
            Export Excel
          </button>
        </div>
      }
    >
      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {filteredTeams.slice(0, 3).map((team) => (
          <div
            key={team.id}
            className={`rounded-2xl p-6 border-2 ${
              team.rank === 1 ? 'bg-amber-50 border-amber-200 order-2 md:order-1' :
              team.rank === 2 ? 'bg-gray-50 border-gray-200 order-1 md:order-2' :
              'bg-orange-50 border-orange-200 order-3'
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
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search teams..." className="max-w-md flex-1" />
        <select
          value={trackFilter}
          onChange={(e) => setTrackFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {tracks.map((track) => (
            <option key={track} value={track}>
              {track === 'all' ? 'All Tracks' : track}
            </option>
          ))}
        </select>
        <select
          value={roundFilter}
          onChange={(e) => setRoundFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="round1">Round 1</option>
          <option value="round2">Round 2</option>
          <option value="round3">Round 3</option>
        </select>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">Team</div>
          <div className="col-span-3">Track</div>
          <div className="col-span-2">Members</div>
          <div className="col-span-2 text-right">Score</div>
        </div>
        <div className="divide-y divide-gray-50">
          {filteredTeams.map((team) => (
            <div key={team.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
              <div className="col-span-1">
                <div className="flex items-center">{getRankIcon(team.rank)}</div>
              </div>
              <div className="col-span-4 flex items-center gap-3">
                <Avatar name={team.name} size="sm" />
                <span className="font-medium text-gray-900">{team.name}</span>
              </div>
              <div className="col-span-3">
                <Badge variant="blue">{team.track}</Badge>
              </div>
              <div className="col-span-2 text-gray-500">{team.members} members</div>
              <div className="col-span-2 text-right">
                <span className="text-xl font-bold text-blue-600">{team.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <Pagination currentPage={currentPage} totalPages={3} onPageChange={setCurrentPage} />
      </div>

      {/* Ranking History */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">Ranking History</h3>
            <p className="text-xs text-gray-500 mt-0.5">Past round standings</p>
          </div>
          <History className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          {rankingHistory.map((h, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{h.round}</p>
                  <p className="text-xs text-gray-500">Top: {h.topTeam}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">{h.topScore}</p>
                <p className="text-xs text-gray-500">{h.teams} teams</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SharedLayout>
  );
}