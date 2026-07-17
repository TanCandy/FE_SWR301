import { useState } from 'react';
import { Award, Search, Download, Printer, Plus, Filter } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import { Avatar } from '../../components/ui/Cards';
import Badge from '../../components/ui/Badge';
import SearchBar from '../../components/ui/SearchBar';
import Modal from '../../components/ui/Modal';

interface Certificate {
  id: string;
  recipientName: string;
  teamName: string;
  type: 'winner' | 'participant' | 'mentor' | 'judge';
  position?: string;
  track: string;
  issuedAt: string;
  status: 'issued' | 'pending' | 'revoked';
}

const mockCertificates: Certificate[] = [
  { id: '1', recipientName: 'Alex Johnson', teamName: 'Quantum Coders', type: 'winner', position: '1st Place', track: 'AI/ML', issuedAt: '2026-03-20', status: 'issued' },
  { id: '2', recipientName: 'Jamie Rodriguez', teamName: 'Quantum Coders', type: 'winner', position: '1st Place', track: 'AI/ML', issuedAt: '2026-03-20', status: 'issued' },
  { id: '3', recipientName: 'Code Warriors Team', teamName: 'Code Warriors', type: 'winner', position: '2nd Place', track: 'FinTech', issuedAt: '2026-03-20', status: 'issued' },
  { id: '4', recipientName: 'Data Dragons', teamName: 'Data Dragons', type: 'winner', position: '3rd Place', track: 'Data Science', issuedAt: '2026-03-20', status: 'pending' },
  { id: '5', recipientName: 'Dr. Sarah Chen', teamName: '-', type: 'mentor', track: 'AI/ML', issuedAt: '2026-03-15', status: 'issued' },
  { id: '6', recipientName: 'Michael Park', teamName: '-', type: 'judge', track: 'All', issuedAt: '2026-03-15', status: 'issued' },
  { id: '7', recipientName: 'All Participants', teamName: '-', type: 'participant', track: 'All', issuedAt: '2026-03-25', status: 'pending' },
];

const typeConfig: Record<Certificate['type'], { label: string; color: string; variant: 'amber' | 'blue' | 'purple' | 'gray' }> = {
  winner: { label: 'Winner', color: 'bg-amber-100 text-amber-600', variant: 'amber' },
  participant: { label: 'Participant', color: 'bg-blue-100 text-blue-600', variant: 'blue' },
  mentor: { label: 'Mentor', color: 'bg-purple-100 text-purple-600', variant: 'purple' },
  judge: { label: 'Judge', color: 'bg-gray-100 text-gray-600', variant: 'gray' },
};

export default function PdpCertificatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);

  const filtered = mockCertificates
    .filter((c) => c.recipientName.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((c) => filterType === 'all' || c.type === filterType);

  return (
    <SharedLayout
      title="Certificates"
      subtitle="Generate and manage certificates for winners and participants"
      breadcrumbs={[{ label: 'Certificates' }]}
      actions={
        <button
          onClick={() => setIsGenerateOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Generate Certificate
        </button>
      }
    >
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search certificates..." className="max-w-md flex-1" />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="all">All Types</option>
          <option value="winner">Winners</option>
          <option value="participant">Participants</option>
          <option value="mentor">Mentors</option>
          <option value="judge">Judges</option>
        </select>
        <select className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none">
          <option>All Status</option>
          <option>Issued</option>
          <option>Pending</option>
          <option>Revoked</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Certificates', value: 120, color: 'blue' },
          { label: 'Winners', value: 24, color: 'amber' },
          { label: 'Participants', value: 75, color: 'green' },
          { label: 'Pending', value: 21, color: 'red' },
        ].map((s) => (
          <div key={s.label} className={`bg-${s.color}-50 border border-${s.color}-100 rounded-xl p-4`}>
            <p className={`text-2xl font-bold text-${s.color}-600`}>{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {filtered.map((cert) => {
          const config = typeConfig[cert.type];
          return (
            <div key={cert.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${config.color} rounded-xl flex items-center justify-center`}>
                  <Award className="w-6 h-6" />
                </div>
                <Badge variant={cert.status === 'issued' ? 'green' : cert.status === 'pending' ? 'amber' : 'red'}>
                  {cert.status}
                </Badge>
              </div>
              <h4 className="font-semibold text-gray-900 truncate">{cert.recipientName}</h4>
              <p className="text-sm text-gray-500 mt-0.5">{cert.teamName}</p>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant={config.variant}>{config.label}</Badge>
                {cert.position && <Badge variant="amber">{cert.position}</Badge>}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">{cert.track}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Issued: {cert.issuedAt}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setPreviewCert(cert)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Award className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg">
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Generate Modal */}
      <Modal isOpen={isGenerateOpen} onClose={() => setIsGenerateOpen(false)} title="Generate Certificate"
        footer={
          <div className="flex gap-3 justify-end">
            <button onClick={() => setIsGenerateOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">Cancel</button>
            <button onClick={() => setIsGenerateOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Generate</button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Name</label>
            <input type="text" placeholder="Enter recipient name" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Type</label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl">
              <option>Winner</option>
              <option>Participant</option>
              <option>Mentor</option>
              <option>Judge</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Track</label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl">
              <option>AI/ML</option>
              <option>FinTech</option>
              <option>HealthTech</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Position (optional)</label>
            <input type="text" placeholder="e.g., 1st Place" className="w-full px-4 py-3 border border-gray-200 rounded-xl" />
          </div>
        </div>
      </Modal>

      {/* Preview Modal */}
      <Modal isOpen={!!previewCert} onClose={() => setPreviewCert(null)} title="Certificate Preview" size="lg">
        {previewCert && (
          <div className="bg-gradient-to-br from-blue-50 via-white to-amber-50 border-4 border-amber-200 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Award className="w-12 h-12 text-white" />
            </div>
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Certificate of {previewCert.type === 'winner' ? 'Achievement' : 'Participation'}</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{previewCert.recipientName}</h2>
            {previewCert.position && (
              <p className="text-xl text-amber-600 font-semibold mb-2">{previewCert.position}</p>
            )}
            <p className="text-gray-600 mb-6">{previewCert.track} Track</p>
            <p className="text-sm text-gray-500">SEAL Hackathon 2026 · Issued {previewCert.issuedAt}</p>
          </div>
        )}
      </Modal>
    </SharedLayout>
  );
}