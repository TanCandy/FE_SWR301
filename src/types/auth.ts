export type UserRole = 'team_leader' | 'mentor' | 'student' | 'judge' | 'administrator';

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
  | 'track:manage'
  | 'round:manage'
  | 'prize:manage'
  | 'system:manage'
  | 'reports:view';

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
    'system:manage',
    'reports:view',
  ],
};

export const DEMO_ACCOUNTS = [
  { email: 'leader@seal.demo', password: '123456', role: 'team_leader' as UserRole, name: 'Alex Johnson' },
  { email: 'mentor@seal.demo', password: '123456', role: 'mentor' as UserRole, name: 'Dr. Sarah Chen' },
  { email: 'student@seal.demo', password: '123456', role: 'student' as UserRole, name: 'Jamie Rodriguez' },
  { email: 'judge@seal.demo', password: '123456', role: 'judge' as UserRole, name: 'Michael Park' },
  { email: 'admin@seal.demo', password: '123456', role: 'administrator' as UserRole, name: 'Emily Watson' },
];

export const ROLE_LABELS: Record<UserRole, string> = {
  team_leader: 'Team Leader',
  mentor: 'Mentor',
  student: 'Student',
  judge: 'Judge',
  administrator: 'Administrator',
};

export const ROLE_COLORS: Record<UserRole, string> = {
  team_leader: 'bg-blue-500',
  mentor: 'bg-purple-500',
  student: 'bg-green-500',
  judge: 'bg-amber-500',
  administrator: 'bg-red-500',
};
