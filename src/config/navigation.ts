import { useState } from 'react';
import { UserRole } from '../types/auth';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  permission?: string;
  badge?: string | number;
}

export const NAV_ITEMS: Record<string, NavItem[]> = {
  team_leader: [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout' },
    { id: 'manage-team', label: 'Manage Team', icon: 'users' },
    { id: 'mentor-session', label: 'Manage Mentor Session', icon: 'calendar' },
    { id: 'deliverable', label: 'Submit Deliverable', icon: 'upload' },
    { id: 'evaluation', label: 'View Evaluation Result', icon: 'clipboard-check' },
    { id: 'ranking', label: 'View Ranking', icon: 'trophy' },
    { id: 'profile', label: 'Profile', icon: 'user' },
  ],
  mentor: [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout' },
    { id: 'mentor-sessions', label: 'Mentor Sessions', icon: 'calendar-check' },
    { id: 'assigned-teams', label: 'Assigned Teams', icon: 'users' },
    { id: 'review-progress', label: 'Review Progress', icon: 'clipboard-list' },
    { id: 'profile', label: 'Profile', icon: 'user' },
  ],
  student: [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout' },
    { id: 'my-team', label: 'My Team', icon: 'users' },
    { id: 'tasks', label: 'Tasks', icon: 'check-square' },
    { id: 'deliverables', label: 'Deliverables', icon: 'file' },
    { id: 'announcements', label: 'Announcements', icon: 'bell' },
    { id: 'profile', label: 'Profile', icon: 'user' },
  ],
  judge: [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout' },
    { id: 'assigned-projects', label: 'Assigned Projects', icon: 'folder' },
    { id: 'review-submission', label: 'Review Submission', icon: 'file-search' },
    { id: 'evaluation-score', label: 'Submit Evaluation Score', icon: 'clipboard-check' },
    { id: 'ranking', label: 'Ranking', icon: 'trophy' },
    { id: 'profile', label: 'Profile', icon: 'user' },
  ],
  administrator: [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout' },
    { id: 'manage-users', label: 'Manage Users', icon: 'users-cog' },
    { id: 'manage-participants', label: 'Manage Participants', icon: 'user-plus' },
    { id: 'manage-event', label: 'Manage Hackathon Event', icon: 'calendar' },
    { id: 'manage-track', label: 'Manage Track', icon: 'layers' },
    { id: 'manage-round', label: 'Manage Round', icon: 'flag' },
    { id: 'manage-prize', label: 'Manage Prize', icon: 'gift' },
    { id: 'manage-evaluation', label: 'Manage Evaluation', icon: 'clipboard-check' },
    { id: 'reports', label: 'Reports', icon: 'bar-chart' },
    { id: 'system-settings', label: 'System Settings', icon: 'settings' },
    { id: 'profile', label: 'Profile', icon: 'user' },
  ],
  pdp_staff: [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout' },
    { id: 'view-ranking', label: 'View Ranking', icon: 'trophy' },
    { id: 'reports', label: 'Reports', icon: 'bar-chart' },
    { id: 'statistics', label: 'Hackathon Statistics', icon: 'trending-up' },
    { id: 'certificates', label: 'Certificates', icon: 'award' },
    { id: 'announcements', label: 'Announcements', icon: 'bell' },
    { id: 'profile', label: 'Profile', icon: 'user' },
  ],
  event_coordinator: [
    { id: 'dashboard', label: 'Dashboard', icon: 'layout' },
    { id: 'manage-event', label: 'Manage Hackathon Event', icon: 'calendar' },
    { id: 'manage-track', label: 'Manage Track', icon: 'layers' },
    { id: 'manage-round', label: 'Manage Round', icon: 'flag' },
    { id: 'manage-participants', label: 'Manage Participants', icon: 'user-plus' },
    { id: 'announcements', label: 'Announcements', icon: 'megaphone' },
    { id: 'schedule', label: 'Schedule', icon: 'calendar-clock' },
    { id: 'profile', label: 'Profile', icon: 'user' },
  ],
};

export const PAGE_COMPONENTS: Record<string, string> = {
  dashboard: 'Dashboard',
  'manage-team': 'Manage Team',
  'mentor-session': 'Mentor Session',
  'deliverable': 'Submit Deliverable',
  'evaluation': 'Evaluation Result',
  'ranking': 'Ranking',
  'profile': 'Profile',
  'mentor-sessions': 'Mentor Sessions',
  'assigned-teams': 'Assigned Teams',
  'review-progress': 'Review Progress',
  'my-team': 'My Team',
  'tasks': 'Tasks',
  'deliverables': 'Deliverables',
  'announcements': 'Announcements',
  'assigned-projects': 'Assigned Projects',
  'review-submission': 'Review Submission',
  'evaluation-score': 'Evaluation Score',
  'manage-users': 'Manage Users',
  'manage-participants': 'Manage Participants',
  'manage-event': 'Hackathon Event',
  'manage-track': 'Manage Track',
  'manage-round': 'Manage Round',
  'manage-prize': 'Manage Prize',
  'manage-evaluation': 'Manage Evaluation',
  'reports': 'Reports',
  'system-settings': 'System Settings',
  'view-ranking': 'View Ranking',
  'statistics': 'Hackathon Statistics',
  'certificates': 'Certificates',
  'schedule': 'Schedule',
};