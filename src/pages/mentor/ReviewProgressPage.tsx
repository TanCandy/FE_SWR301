import { useState } from 'react';
import { Clock, FileText, MessageSquare, Send, CheckCircle } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import { Avatar } from '../../components/ui/Cards';
import Badge from '../../components/ui/Badge';

interface ReviewItem {
  id: string;
  team: string;
  deliverable: string;
  submittedAt: string;
  status: 'pending' | 'in_progress' | 'completed';
  feedback?: string;
}

const mockReviews: ReviewItem[] = [
  { id: '1', team: 'Quantum Coders', deliverable: 'Sprint 1 Deliverables', submittedAt: '2 hours ago', status: 'in_progress' },
  { id: '2', team: 'Cloud Innovators', deliverable: 'Architecture Design', submittedAt: '1 day ago', status: 'completed', feedback: 'Great architecture! Consider adding more error handling.' },
  { id: '3', team: 'Data Wizards', deliverable: 'Data Pipeline', submittedAt: '3 days ago', status: 'completed', feedback: 'Excellent work on the ETL process.' },
];

export default function MentorReviewProgressPage() {
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);

  return (
    <SharedLayout
      title="Review Progress"
      subtitle="Review team deliverables and progress"
      breadcrumbs={[{ label: 'Review Progress' }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reviews List */}
        <div className="lg:col-span-1 space-y-4">
          {mockReviews.map((review) => (
            <div
              key={review.id}
              onClick={() => setSelectedReview(review)}
              className={`bg-white rounded-xl p-4 border cursor-pointer transition-all ${
                selectedReview?.id === review.id ? 'border-blue-500 shadow-md' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Avatar name={review.team} size="sm" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{review.team}</p>
                  <p className="text-sm text-gray-500">{review.deliverable}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {review.submittedAt}
                </span>
                <Badge variant={review.status === 'completed' ? 'green' : review.status === 'in_progress' ? 'blue' : 'amber'}>
                  {review.status.replace('_', ' ')}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Review Details */}
        <div className="lg:col-span-2">
          {selectedReview ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedReview.deliverable}</h3>
                  <p className="text-gray-500">{selectedReview.team}</p>
                </div>
                <Badge variant={selectedReview.status === 'completed' ? 'green' : selectedReview.status === 'in_progress' ? 'blue' : 'amber'}>
                  {selectedReview.status.replace('_', ' ')}
                </Badge>
              </div>

              {/* Timeline */}
              <div className="border-l-2 border-gray-100 pl-6 space-y-6 mb-6">
                {[
                  { title: 'Submitted', desc: 'Deliverable submitted for review', time: selectedReview.submittedAt, done: true },
                  { title: 'In Review', desc: 'Currently being reviewed', time: 'In progress', done: selectedReview.status !== 'pending' },
                  { title: 'Feedback Given', desc: 'Feedback sent to team', time: selectedReview.status === 'completed' ? 'Completed' : 'Pending', done: selectedReview.status === 'completed' },
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-6 w-3 h-3 rounded-full ${item.done ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                  </div>
                ))}
              </div>

              {/* Feedback */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Your Feedback
                </h4>
                {selectedReview.feedback ? (
                  <p className="text-gray-600">{selectedReview.feedback}</p>
                ) : (
                  <textarea
                    rows={4}
                    placeholder="Write your feedback here..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                )}
              </div>

              {selectedReview.status !== 'completed' && (
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">
                  <Send className="w-4 h-4" />
                  Submit Feedback
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select a deliverable to review</p>
            </div>
          )}
        </div>
      </div>
    </SharedLayout>
  );
}
