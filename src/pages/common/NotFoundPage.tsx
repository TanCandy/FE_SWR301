import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldX, ArrowLeft, Home, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-6xl font-bold text-gray-400">404</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-2">
          The page you're looking for doesn't exist.
        </p>
        <p className="text-gray-500 mb-8">
          Please check the URL or navigate back to the dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <button
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 rounded-xl text-white font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
          >
            {isAuthenticated ? (
              <>
                <Home className="w-4 h-4" />
                Back to Dashboard
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Go to Login
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
