import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import JobsPage from './pages/JobsPage';
import JobDetailsPage from './pages/JobDetailsPage';
import ExecutionsPage from './pages/ExecutionsPage';
import { useTheme } from './hooks/useTheme';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Call useTheme here to initialize theme
  useTheme();

  // Example users list, replace with real data as needed
  const users = ['alice', 'bob', 'charlie'];
  const handleSearch = () => {};

  return (
    <div className="min-h-screen min-w-full text-zinc-900 dark:text-zinc-100">
      <SearchBar users={users} onSearch={handleSearch} />
      <div className="flex h-full pt-[64px]">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 overflow-auto p-0">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/jobs" replace />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
          <Route path="/executions" element={<ExecutionsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppWrapper;
