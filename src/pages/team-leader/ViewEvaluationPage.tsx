import { useState } from 'react';
import { Trophy, Download, Star, TrendingUp, FileText, MessageSquare, Radar } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import { Avatar } from '../../components/ui/Cards';
import Badge from '../../components/ui/Badge';

export default function ViewEvaluationPage() {
  const [selectedRound, setSelectedRound] = useState('round1');

  const evaluation = {
    overallScore: 8.5,
    rank: 3,
    criteria: [
      { name: 'Innovation', score: 8.5, weight: 25 },
      { name: 'Technical Implementation', score: 8.0, weight: 30 },
      { name: 'User Experience', score: 9.0, weight: 20 },
      { name: 'Business Potential', score: 8.5, weight: 15 },
      { name: 'Presentation', score: 8.5, weight: 10 },
    ],
    judges: [
      { name: 'Michael Park', track: 'AI/ML', score: 8.5, comment: 'Great technical implementation!' },
      { name: 'Emily Chen', track: 'Product', score: 8.7, comment: 'Excellent user experience design.' },
      { name: 'David Kim', track: 'Business', score: 8.3, comment: 'Strong business potential shown.' },
    ],
  };

  return (
    <SharedLayout
      title="Evaluation Result"
      subtitle="View your team's evaluation feedback"
      breadcrumbs={[{ label: 'Evaluation Result' }]}
      actions={
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
          <Download className="w-4 h-4" />
          Download Report
        </button>
      }
    >
      {/* Overall Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-4 mb-4">
            <Trophy className="w-10 h-10" />
            <div>
              <p className="text-blue-100 text-sm">Overall Score</p>
              <p className="text-4xl font-bold">{evaluation.overallScore}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-blue-100">
            <Star className="w-4 h-4" />
            <span>Out of 10.0</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Current Rank</p>
              <p className="text-3xl font-bold text-gray-900">#{evaluation.rank}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span>+2 from last round</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Judged</p>
              <p className="text-3xl font-bold text-gray-900">3</p>
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            From 3 judges
          </div>
        </div>
      </div>

      {/* Round Selection */}
      <div className="flex gap-2 mb-6">
        {['round1', 'round2'].map((round) => (
          <button
            key={round}
            onClick={() => setSelectedRound(round)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              selectedRound === round
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {round === 'round1' ? 'Round 1' : 'Round 2'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Criteria Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Criteria Breakdown</h3>
          <div className="space-y-4">
            {evaluation.criteria.map((criterion, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{criterion.name}</span>
                  <span className="text-sm font-bold text-gray-900">{criterion.score}/10</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${criterion.score * 10}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">{criterion.weight}% weight</span>
              </div>
            ))}
          </div>
        </div>

        {/* Judge Feedback */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Judge Feedback</h3>
          <div className="space-y-4">
            {evaluation.judges.map((judge, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <Avatar name={judge.name} role="judge" size="md" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{judge.name}</p>
                      <Badge variant="purple" className="mt-1">{judge.track}</Badge>
                    </div>
                    <span className="text-xl font-bold text-blue-600">{judge.score}</span>
                  </div>
                  <div className="flex items-start gap-2 mt-3">
                    <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                    <p className="text-sm text-gray-600">{judge.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SharedLayout>
  );
}
