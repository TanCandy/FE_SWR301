export type UserRole =
  | 'team_leader'
  | 'mentor'
  | 'student'
  | 'judge'
  | 'administrator'
  | 'pdp_staff'
  | 'event_coordinator';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  team?: string;
  organization?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export type Permission =
  | 'dashboard:view'
  | 'team:manage'
  | 'team:view'
  | 'mentor_session:manage'
  | 'mentor_session:view'
  | 'deliverable:submit'
  | 'deliverable:view'
  | 'evaluation:view'
  | 'evaluation:submit'
  | 'ranking:view'
  | 'profile:view'
  | 'profile:edit'
  | 'user:manage'
  | 'participant:manage'
  | 'event:manage'
  | 'event:view'
  | 'track:manage'
  | 'track:view'
  | 'round:manage'
  | 'round:view'
  | 'prize:manage'
  | 'certificate:manage'
  | 'announcement:manage'
  | 'announcement:view'
  | 'schedule:manage'
  | 'reports:view'
  | 'statistics:view'
  | 'system:manage';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  team_leader: [
    'dashboard:view',
    'team:view',
    'mentor_session:view',
    'deliverable:submit',
    'deliverable:view',
    'evaluation:view',
    'ranking:view',
    'profile:view',
    'profile:edit',
  ],
  mentor: [
    'dashboard:view',
    'mentor_session:view',
    'mentor_session:manage',
    'team:view',
    'profile:view',
    'profile:edit',
  ],
  student: [
    'dashboard:view',
    'team:view',
    'deliverable:view',
    'evaluation:view',
    'profile:view',
    'profile:edit',
  ],
  judge: [
    'dashboard:view',
    'team:view',
    'deliverable:view',
    'evaluation:view',
    'evaluation:submit',
    'ranking:view',
    'profile:view',
    'profile:edit',
  ],
  administrator: [
    'dashboard:view',
    'team:manage',
    'team:view',
    'mentor_session:manage',
    'mentor_session:view',
    'deliverable:submit',
    'deliverable:view',
    'evaluation:view',
    'evaluation:submit',
    'ranking:view',
    'profile:view',
    'profile:edit',
    'user:manage',
    'participant:manage',
    'event:manage',
    'track:manage',
    'round:manage',
    'prize:manage',
    'certificate:manage',
    'announcement:manage',
    'system:manage',
    'reports:view',
    'statistics:view',
  ],
  pdp_staff: [
    'dashboard:view',
    'ranking:view',
    'reports:view',
    'statistics:view',
    'certificate:manage',
    'announcement:view',
    'profile:view',
    'profile:edit',
  ],
  event_coordinator: [
    'dashboard:view',
    'event:manage',
    'event:view',
    'track:manage',
    'track:view',
    'round:manage',
    'round:view',
    'participant:manage',
    'announcement:manage',
    'schedule:manage',
    'profile:view',
    'profile:edit',
  ],
};

export const DEMO_ACCOUNTS = [
  { email: 'leader@seal.demo', password: '123456', role: 'team_leader' as UserRole, name: 'Alex Johnson' },
  { email: 'mentor@seal.demo', password: '123456', role: 'mentor' as UserRole, name: 'Dr. Sarah Chen' },
  { email: 'student@seal.demo', password: '123456', role: 'student' as UserRole, name: 'Jamie Rodriguez' },
  { email: 'judge@seal.demo', password: '123456', role: 'judge' as UserRole, name: 'Michael Park' },
  { email: 'admin@seal.demo', password: '123456', role: 'administrator' as UserRole, name: 'Emily Watson' },
  { email: 'pdp@seal.demo', password: '123456', role: 'pdp_staff' as UserRole, name: 'Robert Williams' },
  { email: 'coordinator@seal.demo', password: '123456', role: 'event_coordinator' as UserRole, name: 'Lisa Anderson' },
];

export const ROLE_LABELS: Record<UserRole, string> = {
  team_leader: 'Team Leader',
  mentor: 'Mentor',
  student: 'Student',
  judge: 'Judge',
  administrator: 'Administrator',
  pdp_staff: 'PDP Staff',
  event_coordinator: 'Event Coordinator',
};

export const ROLE_COLORS: Record<UserRole, string> = {
  team_leader: 'bg-blue-500',
  mentor: 'bg-purple-500',
  student: 'bg-green-500',
  judge: 'bg-amber-500',
  administrator: 'bg-red-500',
  pdp_staff: 'bg-indigo-500',
  event_coordinator: 'bg-pink-500',
};