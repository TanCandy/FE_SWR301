import { useState } from 'react';
import { Star, Send, MessageSquare, Save } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import { Avatar } from '../../components/ui/Cards';
import Badge from '../../components/ui/Badge';

interface EvaluationForm {
  innovation: number;
  technical: number;
  ux: number;
  business: number;
  presentation: number;
  comment: string;
}

export default function JudgeEvaluationScorePage() {
  const [form, setForm] = useState<EvaluationForm>({
    innovation: 0,
    technical: 0,
    ux: 0,
    business: 0,
    presentation: 0,
    comment: '',
  });

  const criteria = [
    { key: 'innovation', label: 'Innovation', desc: 'Creativity and novelty of the solution', weight: 25 },
    { key: 'technical', label: 'Technical Implementation', desc: 'Code quality, architecture, and scalability', weight: 30 },
    { key: 'ux', label: 'User Experience', desc: 'UI/UX design and usability', weight: 20 },
    { key: 'business', label: 'Business Potential', desc: 'Market viability and scalability', weight: 15 },
    { key: 'presentation', label: 'Presentation', desc: 'Clarity of communication and demo', weight: 10 },
  ];

  const handleScoreChange = (key: keyof EvaluationForm, value: number) => {
    setForm({ ...form, [key]: value });
  };

  const calculateTotal = () => {
    let total = 0;
    criteria.forEach((c) => {
      total += (form[c.key as keyof EvaluationForm] as number) * (c.weight / 100) * 10;
    });
    return total.toFixed(1);
  };

  return (
    <SharedLayout
      title="Submit Evaluation Score"
      subtitle="Quantum Coders - Round 2"
      breadcrumbs={[{ label: 'Assigned Projects', href: '/dashboard/assigned-projects' }, { label: 'Evaluate' }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evaluation Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-6">Evaluation Criteria</h3>
            <div className="space-y-6">
              {criteria.map((criterion) => (
                <div key={criterion.key} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-900">{criterion.label}</p>
                      <p className="text-sm text-gray-500">{criterion.desc}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xl font-bold ${
                        (form[criterion.key as keyof EvaluationForm] as number) >= 7 ? 'text-green-600' :
                        (form[criterion.key as keyof EvaluationForm] as number) >= 5 ? 'text-amber-600' :
                        'text-gray-400'
                      }`}>
                        {(form[criterion.key as keyof EvaluationForm] as number) || '-'}
                      </span>
                      <span className="text-gray-400">/10</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={form[criterion.key as keyof EvaluationForm] as number}
                    onChange={(e) => handleScoreChange(criterion.key as keyof EvaluationForm, parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Comments & Feedback</label>
              <textarea
                rows={4}
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                placeholder="Provide constructive feedback for the team..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
            <h3 className="font-semibold text-gray-900 mb-4">Project Summary</h3>
            <div className="flex items-center gap-3 mb-4">
              <Avatar name="Quantum Coders" size="lg" />
              <div>
                <p className="font-medium text-gray-900">Quantum Coders</p>
                <Badge variant="blue">AI/ML Track</Badge>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-4">
              <p className="text-sm text-gray-500 mb-2">Weighted Score</p>
              <div className="text-center py-6 bg-blue-50 rounded-xl">
                <p className="text-5xl font-bold text-blue-600">{calculateTotal()}</p>
                <p className="text-sm text-gray-500">out of 10</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200">
                <Save className="w-4 h-4" />
                Save Draft
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">
                <Send className="w-4 h-4" />
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
}
