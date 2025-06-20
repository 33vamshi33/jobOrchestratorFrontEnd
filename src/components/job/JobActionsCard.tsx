import React from 'react';
import Button from '../ui/Button';
import type { Job } from '../../types/job';

interface JobActionsCardProps {
  job: Job;
  actionLoading: string | null;
  onAction: (action: 'run' | 'kill' | 'clean' | 'manual' | 'force-run') => void;
}

const JobActionsCard: React.FC<JobActionsCardProps> = ({ job, actionLoading, onAction }) => (
  <div className="bg-white/90 dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-8 space-y-6">
    <h2 className="text-xl font-bold text-primary-600 dark:text-primary-400">Actions</h2>
    <div className="grid gap-4">
      <div>
        <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">Job Control</div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => onAction('run')} isLoading={actionLoading === 'run'}>Run</Button>
          <Button variant="secondary" onClick={() => onAction('kill')} isLoading={actionLoading === 'kill'}>Kill</Button>
          <Button variant="accent" onClick={() => onAction('clean')} isLoading={actionLoading === 'clean'}>Clean</Button>
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">Advanced</div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => onAction('manual')} isLoading={actionLoading === 'manual'}>Manual</Button>
          <Button variant="accent" onClick={() => onAction('force-run')} isLoading={actionLoading === 'force-run'}>Force Run</Button>
        </div>
      </div>
    </div>
    <div className="border-t border-zinc-200 dark:border-zinc-700 pt-6">
      <div className="text-sm text-zinc-500 dark:text-zinc-400 space-y-2">
        <div>Last Modified: {job.lastActionTime || '-'}</div>
        <div>Modified By: {job.lastModifiedBy || '-'}</div>
        <div>Last Action: {job.lastAction || '-'}</div>
      </div>
    </div>
  </div>
);

export default JobActionsCard;

