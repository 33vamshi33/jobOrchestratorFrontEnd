import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {cleanJob, getJobs, killJob, registerJob, runJob} from '../api/jobs';
import type { Job } from '../types/job';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import RegisterJobModal from '../components/RegisterJobModal';

const getJobStatusVariant = (state?: string) => {
  switch (state) {
    case 'SUCCESS': return 'success';
    case 'FAILED': return 'error';
    case 'RUNNING': return 'info';
    case 'WAITING': return 'warning';
    default: return 'default';
  }
};

function NameCell({ job }: { job: Job }) {
  return (
    <Link to={`/jobs/${job.id}`} className="font-semibold hover:text-primary-600 transition">
      {job.name}
    </Link>
  );
}

function TypeCell({ job }: { job: Job }) {
  return <Badge variant="default">{job.type}</Badge>;
}

function StateCell({ job }: { job: Job }) {
  return (
    <Badge variant={getJobStatusVariant(job.state)} withDot>
      {job.state}
    </Badge>
  );
}

function ActionsCell({ job, handleAction, actionLoading }: { job: Job, handleAction: any, actionLoading: any }) {
  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        onClick={() => handleAction('run', job.id)}
        isLoading={actionLoading?.id === job.id && actionLoading?.action === 'run'}
      >
        Run
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => handleAction('kill', job.id)}
        isLoading={actionLoading?.id === job.id && actionLoading?.action === 'kill'}
      >
        Kill
      </Button>
      <Button
        size="sm"
        variant="accent"
        onClick={() => handleAction('clean', job.id)}
        isLoading={actionLoading?.id === job.id && actionLoading?.action === 'clean'}
      >
        Clean
      </Button>
    </div>
  );
}

function JobsTable({ jobs, columns, loading }: { jobs: Job[], columns: any, loading: boolean }) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      <Table
        columns={columns}
        data={jobs}
        isLoading={loading}
        emptyMessage="No jobs found. Click Register Job to create one."
      />
    </div>
  );
}

function JobsLoading() {
  return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
      <p className="text-zinc-500 dark:text-zinc-400">Loading jobs...</p>
    </div>
  );
}

function JobsEmpty({ onRegister }: { onRegister: () => void }) {
  return (
    <div className="text-center py-12 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700">
      <div className="max-w-sm mx-auto">
        <div className="text-zinc-400 dark:text-zinc-500 mb-4">
          No jobs found
        </div>
        <Button onClick={onRegister}>Register your first job</Button>
      </div>
    </div>
  );
}

function JobsError({ error }: { error: string }) {
  return (
    <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-4 text-red-700 dark:text-red-400">
      {error}
    </div>
  );
}

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<{id: number, action: string} | null>(null);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getJobs();
      console.log('Jobs fetched:', response);
      setJobs(response || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleAction = async (action: 'run' | 'kill' | 'clean', jobId: number) => {
    setActionLoading({ id: jobId, action });
    setError(null);
    try {
      const user = 'admin'; // For demo, replace with actual user management
      switch (action) {
        case 'run':
          await runJob(jobId, user);
          break;
        case 'kill':
          await killJob(jobId, user);
          break;
        case 'clean':
          await cleanJob(jobId, user);
          break;
      }
      await fetchJobs();
    } catch (err) {
      setError(`Failed to ${action} job`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRegister = async (job: Partial<Job>, user: string) => {
    setRegisterLoading(true);
    try {
      await registerJob(job, user);
      await fetchJobs();
      setRegisterOpen(false);
    } catch (err) {
      throw err;
    } finally {
      setRegisterLoading(false);
    }
  };

  const columns = [
    {
      header: 'Name',
      accessor: (job: Job) => <NameCell job={job} />
    },
    {
      header: 'Type',
      accessor: (job: Job) => <TypeCell job={job} />
    },
    {
      header: 'State',
      accessor: (job: Job) => <StateCell job={job} />
    },
    {
      header: 'Last Run',
      accessor: (job: Job) => job.lastActionTime || '-'
    },
    {
      header: 'Actions',
      accessor: (job: Job) => <ActionsCell job={job} handleAction={handleAction} actionLoading={actionLoading} />
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-primary-600 dark:text-primary-400 tracking-tight">
            Jobs
          </h1>
          <Button onClick={() => setRegisterOpen(true)}>
            + Register Job
          </Button>
        </div>
        {error && <JobsError error={error} />}
        {loading ? (
          <JobsLoading />
        ) : jobs.length === 0 ? (
          <JobsEmpty onRegister={() => setRegisterOpen(true)} />
        ) : (
          <JobsTable jobs={jobs} columns={columns} loading={loading} />
        )}
        <RegisterJobModal
          open={registerOpen}
          onClose={() => setRegisterOpen(false)}
          onSubmit={handleRegister}
          loading={registerLoading}
        />
      </div>
    </div>
  );
};

export default JobsPage;
