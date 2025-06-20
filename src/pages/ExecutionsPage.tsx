import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getJobExecutions } from '../api/jobs';
import type { JobExecution } from '../types/job';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const getStatusVariant = (status?: string) => {
  switch (status?.toUpperCase()) {
    case 'SUCCESS': return 'success';
    case 'FAILED': return 'error';
    case 'RUNNING': return 'info';
    case 'WAITING': return 'warning';
    case 'CANCELLED': return 'default';
    default: return 'default';
  }
};

const ExecutionsPage: React.FC = () => {
  const [executions, setExecutions] = useState<JobExecution[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExecutions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // For demo, we'll fetch executions for job ID 1
      // In a real app, you might want to fetch all executions or add job selection
      const data = await getJobExecutions(1);
      setExecutions(data);
    } catch (err) {
      setError('Failed to fetch executions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExecutions();
  }, [fetchExecutions]);

  const columns = [
    {
      header: 'ID',
      accessor: (exec: JobExecution) => exec.id,
      className: 'font-mono text-sm'
    },
    {
      header: 'Job',
      accessor: (exec: JobExecution) => (
        exec.job ? (
          <Link
            to={`/jobs/${exec.job.id}`}
            className="font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition"
          >
            {exec.job.name}
          </Link>
        ) : '-'
      )
    },
    {
      header: 'Status',
      accessor: (exec: JobExecution) => (
        <Badge variant={getStatusVariant(exec.status)} withDot>
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
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-primary-600 dark:text-primary-400 tracking-tight">
          Execution History
        </h1>
        <Button onClick={fetchExecutions} isLoading={loading}>
          Refresh
        </Button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-4 text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <Table
        columns={columns}
        data={executions}
        isLoading={loading}
        emptyMessage="No executions found."
      />
    </div>
  );
};

export default ExecutionsPage;
