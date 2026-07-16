import { Trophy, Users, Calendar, Award, ExternalLink, Github, Twitter, Linkedin } from 'lucide-react';
import SharedLayout from '../../components/layout/SharedLayout';
import Badge from '../../components/ui/Badge';

export default function AboutPage() {
  return (
    <SharedLayout
      title="About"
      subtitle="Learn more about SEAL Hackathon Management System"
      breadcrumbs={[{ label: 'About' }]}
    >
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-6 text-white">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
            <Trophy className="w-14 h-14" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">SEAL Hackathon</h1>
            <p className="text-xl text-blue-100 mb-4">Software Engineering Hackathon Management System</p>
            <Badge variant="blue" className="bg-white/20 text-white">Version 1.0.0</Badge>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          SEAL Hackathon is designed to empower teams, mentors, judges, and administrators to collaborate and succeed in competitive hackathon environments. Our platform streamlines the entire hackathon lifecycle from team formation to final judging, ensuring a seamless and productive experience for all participants.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {[
          { icon: <Users className="w-6 h-6" />, title: 'Team Management', desc: 'Create teams, invite members, and collaborate effectively' },
          { icon: <Calendar className="w-6 h-6" />, title: 'Mentor Sessions', desc: 'Schedule and conduct mentor sessions with ease' },
          { icon: <Award className="w-6 h-6" />, title: 'Fair Judging', desc: 'Comprehensive evaluation system with multiple criteria' },
          { icon: <Trophy className="w-6 h-6" />, title: 'Live Rankings', desc: 'Real-time leaderboard with transparent scoring' },
          { icon: <Calendar className="w-6 h-6" />, title: 'Event Management', desc: 'Manage multiple tracks, rounds, and deadlines' },
          { icon: <Award className="w-6 h-6" />, title: 'Prize Management', desc: 'Configure and award prizes for winners' },
        ].map((feature, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-500">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Platform Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '500+', label: 'Teams' },
            { value: '2,500+', label: 'Participants' },
            { value: '50+', label: 'Mentors' },
            { value: '25+', label: 'Judges' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Technology Stack</h2>
        <div className="flex flex-wrap gap-3">
          {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'].map((tech) => (
            <span key={tech} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-gray-900 rounded-2xl p-8 text-white">
        <h2 className="text-xl font-bold mb-6">Connect With Us</h2>
        <div className="flex gap-4">
          <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
        <div className="mt-8 pt-6 border-t border-white/10 text-sm text-gray-400">
          <p>&copy; 2024 SEAL Hackathon Management System. All rights reserved.</p>
        </div>
      </div>
    </SharedLayout>
  );
}
