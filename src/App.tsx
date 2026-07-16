import { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccessDeniedPage from './pages/AccessDeniedPage';
import ForgotPasswordPage from './pages/common/ForgotPasswordPage';
import NotFoundPage from './pages/common/NotFoundPage';
import ProfilePage from './pages/common/ProfilePage';
import NotificationsPage from './pages/common/NotificationsPage';
import HelpPage from './pages/common/HelpPage';
import AboutPage from './pages/common/AboutPage';
import ProtectedRoute from './components/ProtectedRoute';

// Team Leader Pages
import TeamLeaderDashboard from './pages/dashboards/TeamLeaderDashboard';
import ManageTeamPage from './pages/team-leader/ManageTeamPage';
import MentorSessionPage from './pages/team-leader/MentorSessionPage';
import SubmitDeliverablePage from './pages/team-leader/SubmitDeliverablePage';
import ViewEvaluationPage from './pages/team-leader/ViewEvaluationPage';
import ViewRankingPage from './pages/team-leader/ViewRankingPage';

// Mentor Pages
import MentorDashboard from './pages/dashboards/MentorDashboard';
import AssignedTeamsPage from './pages/mentor/AssignedTeamsPage';
import MentorSessionsPage from './pages/mentor/MentorSessionsPage';
import ReviewProgressPage from './pages/mentor/ReviewProgressPage';

// Student Pages
import StudentDashboard from './pages/dashboards/StudentDashboard';
import MyTeamPage from './pages/student/MyTeamPage';
import TasksPage from './pages/student/TasksPage';
import DeliverablesPage from './pages/student/DeliverablesPage';
import AnnouncementsPage from './pages/student/AnnouncementsPage';

// Judge Pages
import JudgeDashboard from './pages/dashboards/JudgeDashboard';
import AssignedProjectsPage from './pages/judge/AssignedProjectsPage';
import ReviewSubmissionPage from './pages/judge/ReviewSubmissionPage';
import EvaluationScorePage from './pages/judge/EvaluationScorePage';
import RankingPage from './pages/judge/RankingPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import ManageParticipantsPage from './pages/admin/ManageParticipantsPage';
import ManageEventPage from './pages/admin/ManageEventPage';
import ManageTrackPage from './pages/admin/ManageTrackPage';
import ManageRoundPage from './pages/admin/ManageRoundPage';
import ManagePrizePage from './pages/admin/ManagePrizePage';
import ManageEvaluationPage from './pages/admin/ManageEvaluationPage';
import ReportsPage from './pages/admin/ReportsPage';
import SystemSettingsPage from './pages/admin/SystemSettingsPage';

import { UserRole } from './types/auth';

function RoleBasedDashboard() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  const dashboards: Record<UserRole, ReactNode> = {
    team_leader: <TeamLeaderDashboard />,
    mentor: <MentorDashboard />,
    student: <StudentDashboard />,
    judge: <JudgeDashboard />,
    administrator: <AdminDashboardPage />,
  };

  return dashboards[user.role] || <Navigate to="/403" replace />;
}

function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />}
      />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <RoleBasedDashboard />
          </ProtectedRoute>
        }
      />

      {/* Profile */}
      <Route
        path="/dashboard/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Notifications */}
      <Route
        path="/dashboard/notifications"
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />

      {/* Help & About */}
      <Route
        path="/dashboard/help"
        element={
          <ProtectedRoute>
            <HelpPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/about"
        element={
          <ProtectedRoute>
            <AboutPage />
          </ProtectedRoute>
        }
      />

      {/* Team Leader Routes */}
      <Route
        path="/dashboard/manage-team"
        element={
          <ProtectedRoute requiredRoles={['team_leader', 'administrator']}>
            <ManageTeamPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/mentor-session"
        element={
          <ProtectedRoute requiredRoles={['team_leader', 'administrator']}>
            <MentorSessionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/deliverable"
        element={
          <ProtectedRoute requiredRoles={['team_leader', 'administrator']}>
            <SubmitDeliverablePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/evaluation"
        element={
          <ProtectedRoute requiredRoles={['team_leader', 'administrator']}>
            <ViewEvaluationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/ranking"
        element={
          <ProtectedRoute requiredRoles={['team_leader', 'administrator']}>
            <ViewRankingPage />
          </ProtectedRoute>
        }
      />

      {/* Mentor Routes */}
      <Route
        path="/dashboard/assigned-teams"
        element={
          <ProtectedRoute requiredRoles={['mentor', 'administrator']}>
            <AssignedTeamsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/mentor-sessions"
        element={
          <ProtectedRoute requiredRoles={['mentor', 'administrator']}>
            <MentorSessionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/review-progress"
        element={
          <ProtectedRoute requiredRoles={['mentor', 'administrator']}>
            <ReviewProgressPage />
          </ProtectedRoute>
        }
      />

      {/* Student Routes */}
      <Route
        path="/dashboard/my-team"
        element={
          <ProtectedRoute requiredRoles={['student', 'administrator']}>
            <MyTeamPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/tasks"
        element={
          <ProtectedRoute requiredRoles={['student', 'administrator']}>
            <TasksPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/deliverables"
        element={
          <ProtectedRoute requiredRoles={['student', 'administrator']}>
            <DeliverablesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/announcements"
        element={
          <ProtectedRoute requiredRoles={['student', 'administrator']}>
            <AnnouncementsPage />
          </ProtectedRoute>
        }
      />

      {/* Judge Routes */}
      <Route
        path="/dashboard/assigned-projects"
        element={
          <ProtectedRoute requiredRoles={['judge', 'administrator']}>
            <AssignedProjectsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/review-submission"
        element={
          <ProtectedRoute requiredRoles={['judge', 'administrator']}>
            <ReviewSubmissionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/evaluation-score"
        element={
          <ProtectedRoute requiredRoles={['judge', 'administrator']}>
            <EvaluationScorePage />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/dashboard/manage-users"
        element={
          <ProtectedRoute requiredRoles={['administrator']}>
            <ManageUsersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/manage-participants"
        element={
          <ProtectedRoute requiredRoles={['administrator']}>
            <ManageParticipantsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/manage-event"
        element={
          <ProtectedRoute requiredRoles={['administrator']}>
            <ManageEventPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/manage-track"
        element={
          <ProtectedRoute requiredRoles={['administrator']}>
            <ManageTrackPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/manage-round"
        element={
          <ProtectedRoute requiredRoles={['administrator']}>
            <ManageRoundPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/manage-prize"
        element={
          <ProtectedRoute requiredRoles={['administrator']}>
            <ManagePrizePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/manage-evaluation"
        element={
          <ProtectedRoute requiredRoles={['administrator']}>
            <ManageEvaluationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/reports"
        element={
          <ProtectedRoute requiredRoles={['administrator']}>
            <ReportsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/system-settings"
        element={
          <ProtectedRoute requiredRoles={['administrator']}>
            <SystemSettingsPage />
          </ProtectedRoute>
        }
      />

      {/* Error Pages */}
      <Route path="/403" element={<AccessDeniedPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
