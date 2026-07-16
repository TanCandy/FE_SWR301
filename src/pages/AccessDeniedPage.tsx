import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldX, ArrowLeft, Home, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function AccessDeniedPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <ShieldX className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-600 mb-2">
          You don't have permission to access this page.
        </p>
        <p className="text-gray-500 mb-8">
          {user ? (
            <>
              Your current role: <span className="font-semibold text-gray-700">{user.role}</span>
            </>
          ) : (
            'Please log in to continue.'
          )}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          {isAuthenticated ? (
            <button
              onClick={() => navigate(from)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 rounded-xl text-white font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
            >
              <Home className="w-4 h-4" />
              Back to Dashboard
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 rounded-xl text-white font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
            >
              <LogIn className="w-4 h-4" />
              Go to Login
            </button>
          )}
        </div>

        {/* Help text */}
        <p className="mt-8 text-sm text-gray-400">
          If you believe this is an error, please contact your administrator.
        </p>
      </div>
    </div>
  );
}
