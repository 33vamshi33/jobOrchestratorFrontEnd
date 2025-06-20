import React, { useState } from 'react';
import Button from './ui/Button';
import type {Job} from '../types/job';

interface RegisterJobModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (job: Partial<Job>, user: string) => Promise<void>;
  loading: boolean;
}

export default function RegisterJobModal({ open, onClose, onSubmit, loading }: RegisterJobModalProps) {
  const [formData, setFormData] = useState<Partial<Job>>({});
  const [user, setUser] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name?.trim()) {
      setError('Job name is required');
      return;
    }

    if (!user?.trim()) {
      setError('User is required');
      return;
    }

    try {
      await onSubmit(formData, user);
      setFormData({});
      setUser('');
    } catch (err: any) {
      setError(err?.message || 'Failed to register job');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm">
      <div className="min-h-screen px-4 flex items-center justify-center">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-8 w-full max-w-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              Register Job
            </h2>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Job Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-zinc-100"
                placeholder="Enter job name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-zinc-100"
                placeholder="Enter job description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Type
              </label>
              <input
                type="text"
                name="type"
                value={formData.type || ''}
                onChange={handleChange}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-zinc-100"
                placeholder="E.g., SHELL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Payload
              </label>
              <textarea
                name="payload"
                value={formData.payload || ''}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-zinc-100"
                placeholder="Enter job payload"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                User *
              </label>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-zinc-100"
                placeholder="Enter your username"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-100 dark:bg-red-900/30 p-4 text-red-700 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-4 mt-8">
              <Button
                variant="secondary"
                onClick={onClose}
                type="button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={loading}
              >
                Register Job
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
