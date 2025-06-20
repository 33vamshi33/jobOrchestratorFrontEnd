import api from './client';
import type {Job, JobExecution} from '../types/job';

export const getJobs = async (): Promise<Job[]> => {
  const res = await api.get('/api/jobs');
  return res.data;
};

export const getJob = async (id: number): Promise<Job> => {
  const res = await api.get(`/api/jobs/${id}`);
  return res.data;
};

export const registerJob = async (job: Partial<Job>, user: string): Promise<Job> => {
  const res = await api.post(`/api/jobs?user=${encodeURIComponent(user)}`, job);
  return res.data;
};

export const runJob = async (id: number, user: string): Promise<Job> => {
  const res = await api.post(`/api/jobs/${id}/run?user=${encodeURIComponent(user)}`);
  return res.data;
};

export const killJob = async (id: number, user: string): Promise<Job> => {
  const res = await api.post(`/api/jobs/${id}/kill?user=${encodeURIComponent(user)}`);
  return res.data;
};

export const cleanJob = async (id: number, user: string): Promise<Job> => {
  const res = await api.post(`/api/jobs/${id}/clean?user=${encodeURIComponent(user)}`);
  return res.data;
};

export const manualJob = async (id: number, user: string): Promise<Job> => {
  const res = await api.post(`/api/jobs/${id}/manual?user=${encodeURIComponent(user)}`);
  return res.data;
};

export const forceRunJob = async (id: number, user: string): Promise<Job> => {
  const res = await api.post(`/api/jobs/${id}/force-run?user=${encodeURIComponent(user)}`);
  return res.data;
};

export const getJobExecutions = async (id: number): Promise<JobExecution[]> => {
  const res = await api.get(`/api/jobs/${id}/executions`);
  return res.data;
};
