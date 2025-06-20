import React from 'react';
import Badge from '../ui/Badge';
import type { Job } from '../../types/job';

const getJobStatusVariant = (state?: string) => {
  switch (state) {
    case 'SUCCESS': return 'success';
    case 'FAILED': return 'error';
    case 'RUNNING': return 'info';
    case 'WAITING': return 'warning';
    default: return 'default';
  }
};

interface JobDetailsCardProps {
  job: Job;
}

const JobDetailsCard: React.FC<JobDetailsCardProps> = ({ job }) => (
  <div className="bg-white/90 dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-8 space-y-6">
    <h2 className="text-xl font-bold text-primary-600 dark:text-primary-400">Details</h2>
    <div className="grid gap-4">
      <div>
        <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Type</div>
        <Badge variant="default">{job.type}</Badge>
      </div>
      <div>
        <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">State</div>
        <Badge variant={getJobStatusVariant(job.state)} withDot>
          {job.state}
        </Badge>
      </div>
      <div>
        <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Description</div>
        <div className="text-zinc-700 dark:text-zinc-300">{job.description || '-'}</div>
      </div>
      <div>
        <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Payload</div>
        <pre className="mt-1 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-sm font-mono overflow-x-auto">
          {job.payload || '-'}
        </pre>
      </div>
    </div>
  </div>
);

export default JobDetailsCard;

