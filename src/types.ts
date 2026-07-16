/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Expertise = 'AI/ML' | 'FinTech' | 'HealthTech' | 'UI/UX Design';

export interface Judge {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatarUrl?: string;
  expertise: Expertise;
  assignedProjectsCount: number;
  completedEvaluations: number;
  avgScoreGiven: number;
  isOverCapacity?: boolean;
}

export interface Project {
  id: string;
  title: string;
  track: Expertise;
  teamName: string;
  assignedJudgeId?: string;
  evaluationStatus: 'Pending' | 'Completed' | 'In Progress';
  score?: number;
}

export interface EvaluationCriterion {
  id: string;
  name: string;
  weight: number; // e.g. 0.25 for 25%
  description: string;
}
