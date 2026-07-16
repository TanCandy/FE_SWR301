import { useState } from 'react';
import { Folder, Github, Video, FileText, ExternalLink, Download, Code } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import { Avatar } from '../../components/ui/Cards';
import Badge from '../../components/ui/Badge';

interface Submission {
  id: string;
  title: string;
  team: string;
  description: string;
  githubUrl: string;
  videoUrl: string;
  files: { name: string; size: string }[];
}

const mockSubmission: Submission = {
  id: '1',
  title: 'Sprint 2 Deliverables',
  team: 'Quantum Coders',
  description: 'This submission includes our progress on the ML model implementation, API endpoints, and user interface components.',
  githubUrl: 'https://github.com/quantum-coders/project',
  videoUrl: 'https://youtube.com/watch?v=abc123',
  files: [
    { name: 'technical_report.pdf', size: '2.4 MB' },
    { name: 'demo_recording.mp4', size: '45 MB' },
    { name: 'source_code.zip', size: '12 MB' },
  ],
};

export default function JudgeReviewSubmissionPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'github' | 'files'>('overview');

  return (
    <SharedLayout
      title="Review Submission"
      subtitle={mockSubmission.title}
      breadcrumbs={[{ label: 'Assigned Projects', href: '/dashboard/assigned-projects' }, { label: 'Review' }]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div className="flex border-b border-gray-100">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'github', label: 'GitHub Preview' },
                { id: 'files', label: 'Files' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-6">
              {activeTab === 'overview' && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Project Description</h3>
                  <p className="text-gray-600 leading-relaxed">{mockSubmission.description}</p>
                </div>
              )}
              {activeTab === 'github' && (
                <div className="text-center py-12">
                  <Github className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Click to view the GitHub repository</p>
                  <a href={mockSubmission.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl">
                    <ExternalLink className="w-4 h-4" />
                    Open GitHub
                  </a>
                </div>
              )}
              {activeTab === 'files' && (
                <div className="space-y-3">
                  {mockSubmission.files.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-500">{file.size}</p>
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-blue-600">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Video */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Demo Video</h3>
            <a href={mockSubmission.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Watch Demo Video</p>
                <p className="text-sm text-gray-500">Opens in YouTube</p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 ml-auto" />
            </a>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Project Team</h3>
            <div className="flex items-center gap-3 mb-4">
              <Avatar name={mockSubmission.team} size="lg" />
              <div>
                <p className="font-medium text-gray-900">{mockSubmission.team}</p>
                <Badge variant="blue">AI/ML Track</Badge>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Submitted</span>
                <span className="text-gray-900">Mar 18, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Round</span>
                <Badge variant="blue">Round 2</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
}
