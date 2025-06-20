import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJob, getJobExecutions, runJob, killJob, cleanJob, manualJob, forceRunJob } from '../api/jobs';
import type { Job, JobExecution } from '../types/job';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import JobDetailsCard from '../components/job/JobDetailsCard';
import JobActionsCard from '../components/job/JobActionsCard';
import JobExecutionsTable from '../components/job/JobExecutionsTable';

const getJobStatusVariant = (state?: string) => {
  switch (state) {
    case 'SUCCESS': return 'success';
    case 'FAILED': return 'error';
    case 'RUNNING': return 'info';
    case 'WAITING': return 'warning';
    default: return 'default';
  }
};

const JobDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [executions, setExecutions] = useState<JobExecution[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const [jobData, executionsData] = await Promise.all([
        getJob(Number(id)),
        getJobExecutions(Number(id))
      ]);
      setJob(jobData);
      setExecutions(executionsData);
    } catch (err) {
      setError('Failed to fetch job details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAction = async (action: 'run' | 'kill' | 'clean' | 'manual' | 'force-run') => {
    if (!job) return;
    setActionLoading(action);
    setError(null);
    try {
      const user = 'admin'; // For demo, replace with actual user management
      switch (action) {
        case 'run':
          await runJob(job.id, user);
          break;
        case 'kill':
          await killJob(job.id, user);
          break;
        case 'clean':
          await cleanJob(job.id, user);
          break;
        case 'manual':
          await manualJob(job.id, user);
          break;
        case 'force-run':
          await forceRunJob(job.id, user);
          break;
      }
      await fetchData();
    } catch (err) {
      setError(`Failed to ${action} job`);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <div className="text-primary-500 font-bold text-lg">Loading job details...</div>;
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-4 text-red-700 dark:text-red-400">
          {error}
        </div>
        <Button variant="secondary" onClick={() => navigate('/jobs')}>
          Back to Jobs
        </Button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="space-y-4">
        <div className="text-zinc-500">Job not found.</div>
        <Button variant="secondary" onClick={() => navigate('/jobs')}>
          Back to Jobs
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={() => navigate('/jobs')}>
          ← Back
        </Button>
        <h1 className="text-3xl font-extrabold text-primary-600 dark:text-primary-400 tracking-tight">
          {job.name}
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <JobDetailsCard job={job} />
        <JobActionsCard job={job} actionLoading={actionLoading} onAction={handleAction} />
      </div>

      <div className="bg-white/90 dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-primary-600 dark:text-primary-400">
            Execution History
          </h2>
          <Button onClick={fetchData} isLoading={loading}>
            Refresh
          </Button>
        </div>

        <JobExecutionsTable executions={executions} />
      </div>
    </div>
  );
};

export default JobDetailsPage;
