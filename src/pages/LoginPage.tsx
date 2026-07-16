import { useState, FormEvent, ReactNode } from 'react';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Trophy, Users, BookOpen, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole, ROLE_LABELS, ROLE_COLORS } from '../types/auth';

const roleIcons: Record<UserRole, ReactNode> = {
  team_leader: <Users className="w-5 h-5" />,
  mentor: <BookOpen className="w-5 h-5" />,
  student: <Users className="w-5 h-5" />,
  judge: <Trophy className="w-5 h-5" />,
  administrator: <Shield className="w-5 h-5" />,
};

const roleDescriptions: Record<UserRole, string> = {
  team_leader: 'Lead your team to victory',
  mentor: 'Guide and support teams',
  student: 'Collaborate and deliver',
  judge: 'Evaluate submissions',
  administrator: 'Full system access',
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginAsRole, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login({ email, password, rememberMe });

    setIsLoading(false);
    if (!result.success) {
      setError(result.error || 'Login failed');
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    loginAsRole(role);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl">
              <Trophy className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">SEAL</h1>
              <p className="text-blue-200 text-sm">Hackathon</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Software Engineering<br />Hackathon Management<br />System
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-md">
            Empowering teams, mentors, judges, and administrators to collaborate and succeed in competitive hackathon environments.
          </p>
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
              <p className="text-white text-2xl font-bold">500+</p>
              <p className="text-blue-200 text-sm">Teams</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
              <p className="text-white text-2xl font-bold">50+</p>
              <p className="text-blue-200 text-sm">Mentors</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
              <p className="text-white text-2xl font-bold">25+</p>
              <p className="text-blue-200 text-sm">Judges</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-blue-200 text-sm">
          <p>Secure Role-Based Access Control</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SEAL Hackathon</h1>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-500">Sign in to your account</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50/50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50/50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Forgot Password?
                </button>
                <button type="button" onClick={() => navigate('/register')} className="text-sm text-green-600 hover:text-green-700 font-medium">
                  Register
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>Sign In</>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Quick Demo Login */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center">Quick Demo Login</h3>
              <div className="grid grid-cols-1 gap-3">
                {(['team_leader', 'mentor', 'student', 'judge', 'administrator'] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => handleDemoLogin(role)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200 group`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${ROLE_COLORS[role]} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                      {roleIcons[role]}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900">Login as {ROLE_LABELS[role]}</p>
                      <p className="text-xs text-gray-500">{roleDescriptions[role]}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button type="button" onClick={() => navigate('/register')} className="text-green-600 hover:text-green-700 font-semibold">
                  Register now
                </button>
              </p>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            SEAL Hackathon Management System v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
