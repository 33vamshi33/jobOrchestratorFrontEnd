import React from 'react';
import Table from '../ui/Table';
import Badge from '../ui/Badge';
import type { JobExecution } from '../../types/job';

const getJobStatusVariant = (state?: string) => {
  switch (state) {
    case 'SUCCESS': return 'success';
    case 'FAILED': return 'error';
    case 'RUNNING': return 'info';
    case 'WAITING': return 'warning';
    default: return 'default';
  }
};

interface JobExecutionsTableProps {
  executions: JobExecution[];
}

const JobExecutionsTable: React.FC<JobExecutionsTableProps> = ({ executions }) => (
  <Table
    columns={[
      {
        header: 'ID',
        accessor: (exec: JobExecution) => exec.id,
        className: 'font-mono text-sm'
      },
      {
        header: 'Status',
        accessor: (exec: JobExecution) => (
          <Badge variant={getJobStatusVariant(exec.status)} withDot>
            {exec.status}
          </Badge>
        )
      },
      {
        header: 'Started',
        accessor: (exec: JobExecution) => exec.startedAt ? new Date(exec.startedAt).toLocaleString() : '-',
        className: 'text-zinc-500 dark:text-zinc-400'
      },
      {
        header: 'Finished',
        accessor: (exec: JobExecution) => exec.finishedAt ? new Date(exec.finishedAt).toLocaleString() : '-',
        className: 'text-zinc-500 dark:text-zinc-400'
      },
      {
        header: 'Action',
        accessor: (exec: JobExecution) => exec.action || '-',
        className: 'text-zinc-500 dark:text-zinc-400'
      },
      {
        header: 'Triggered By',
        accessor: (exec: JobExecution) => exec.triggeredBy || '-',
        className: 'text-zinc-500 dark:text-zinc-400'
      }
    ]}
    data={executions}
  />
);

export default JobExecutionsTable;

