// Job and JobExecution types based on OpenAPI spec
export type JobState = 'WAITING' | 'RUNNING' | 'SUCCESS' | 'FAILED' | 'CANCELLED' | 'MANUAL';
export type JobAction = 'NONE' | 'CANCEL' | 'MANUAL' | 'FORCE_RUN' | 'RUN' | 'CLEAN';

export interface JobExecution {
  id: number;
  job?: Job;
  status: string;
  logs?: string;
  startedAt?: string;
  finishedAt?: string;
  triggeredBy?: string;
  action?: string;
}

export interface Job {
  id: number;
  name: string;
  description?: string;
  type?: string;
  payload?: string;
  createdAt?: string;
  updatedAt?: string;
  executions?: JobExecution[];
  dependency?: Job;
  state?: JobState;
  action?: JobAction;
  submittedBy?: string;
  lastModifiedBy?: string;
  lastAction?: string;
  lastActionTime?: string;
  hostPool?: string[];
  assignedHost?: string;
}

