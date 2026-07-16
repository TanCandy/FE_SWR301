import { useState, ReactNode } from 'react';
import { BookOpen, Search, ChevronRight, ExternalLink, MessageCircle, Mail, FileText, Video, Download, Users } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';

interface HelpArticle {
  id: string;
  category: string;
  title: string;
  content: string;
  icon: ReactNode;
}

const articles: HelpArticle[] = [
  {
    id: '1',
    category: 'Getting Started',
    title: 'How to create a team',
    content: 'To create a team, go to the Manage Team page and click the "Create Team" button. You can invite members using their email addresses or share a team invite link.',
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: '2',
    category: 'Getting Started',
    title: 'How to submit a deliverable',
    content: 'Navigate to Submit Deliverable page. You can upload files, provide your GitHub repository link, demo video URL, and documentation. Click Submit when ready.',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: '3',
    category: 'Sessions',
    title: 'Scheduling mentor sessions',
    content: 'Go to Manage Mentor Session and click "Request Session". Select your preferred time slot and add a topic. Your mentor will review and confirm the session.',
    icon: <Video className="w-5 h-5" />,
  },
  {
    id: '4',
    category: 'Evaluation',
    title: 'Understanding evaluation criteria',
    content: 'Projects are evaluated on Innovation, Technical Implementation, User Experience, Business Potential, and Presentation. Each criterion has different weightage.',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    id: '5',
    category: 'Account',
    title: 'Changing your password',
    content: 'Go to Profile > Security tab. Enter your current password and new password. Click Update Password to save changes.',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: '6',
    category: 'Account',
    title: 'Updating notification preferences',
    content: 'Navigate to Profile > Notifications. Toggle the notification types you want to receive. Changes are saved automatically.',
    icon: <Mail className="w-5 h-5" />,
  },
];

const categories = ['All', 'Getting Started', 'Sessions', 'Evaluation', 'Account'];

const faqs = [
  { q: 'How do I reset my password?', a: 'Click "Forgot Password" on the login page and follow the instructions sent to your email.' },
  { q: 'Can I change my team after joining?', a: 'Contact your administrator. Team changes are subject to approval and may affect your project timeline.' },
  { q: 'What file formats are accepted for submissions?', a: 'We accept PDF, ZIP, images (PNG, JPG), and video links (YouTube, Vimeo).' },
  { q: 'How are judges assigned to projects?', a: 'Judges are automatically assigned based on track expertise. Admins can manually reassign if needed.' },
  { q: 'Can I submit after the deadline?', a: 'Late submissions are not accepted. Make sure to submit before the deadline shown in the countdown.' },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SharedLayout
      title="Help Center"
      subtitle="Find answers and get support"
      breadcrumbs={[{ label: 'Help Center' }]}
    >
      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help articles..."
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                {article.icon}
              </div>
              <div className="flex-1">
                <span className="text-xs text-blue-600 font-medium">{article.category}</span>
                <h3 className="font-semibold text-gray-900 mt-1">{article.title}</h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{article.content}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">{faq.q}</span>
                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedFaq === idx ? 'rotate-90' : ''}`} />
              </button>
              {expandedFaq === idx && (
                <div className="px-4 pb-4 pt-0 text-sm text-gray-600">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Still need help?</h3>
            <p className="text-blue-100">Our support team is here to assist you.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-colors">
            <MessageCircle className="w-5 h-5" />
            Contact Support
          </button>
        </div>
      </div>
    </SharedLayout>
  );
}
