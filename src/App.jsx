import React, { useState, useEffect, useRef } from 'react';

// Icons as simple SVG components
const Icons = {
  Dashboard: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  Clients: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Sales: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  Recruitment: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>,
  VirtualAssistants: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Messaging: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  FileHub: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  LeaveRequests: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Tasks: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
  Announcements: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  KnowledgeHub: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Billing: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  Email: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  Analytics: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  UserManagement: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Sun: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  Moon: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  Bell: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Send: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  ChevronRight: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  TrendUp: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  TrendDown: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
  Lock: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Star: () => <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Download: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Eye: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Search: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
};

// Mock Data - Rich data showing healthy client account
const mockVAs = [
  { id: 1, name: 'Maria Santos', role: 'Executive Assistant', status: 'online', initials: 'MS', rating: 4.9, tasksCompleted: 247, hoursThisWeek: 38, email: 'maria@outsourceteams.com' },
  { id: 2, name: 'James Chen', role: 'Marketing Specialist', status: 'online', initials: 'JC', rating: 4.8, tasksCompleted: 189, hoursThisWeek: 40, email: 'james@outsourceteams.com' },
  { id: 3, name: 'Sofia Rodriguez', role: 'Customer Support Lead', status: 'online', initials: 'SR', rating: 5.0, tasksCompleted: 312, hoursThisWeek: 35, email: 'sofia@outsourceteams.com' },
  { id: 4, name: 'David Park', role: 'Data Entry Specialist', status: 'away', initials: 'DP', rating: 4.7, tasksCompleted: 156, hoursThisWeek: 32, email: 'david@outsourceteams.com' },
  { id: 5, name: 'Grace Liu', role: 'Social Media Manager', status: 'online', initials: 'GL', rating: 4.9, tasksCompleted: 203, hoursThisWeek: 36, email: 'grace@outsourceteams.com' },
  { id: 6, name: 'Lilian Banh', role: 'Bookkeeper', status: 'online', initials: 'LB', rating: 4.8, tasksCompleted: 178, hoursThisWeek: 38, email: 'lilian@outsourceteams.com' },
];

const mockConversations = [
  { id: 1, name: 'Maria Santos', preview: "I'll have the draft ready by 3 PM...", time: '9:51 AM', badge: 'va', status: 'online', unread: 0 },
  { id: 2, name: 'James Chen', preview: 'The social media report is complete', time: '2h ago', badge: 'va', status: 'online', unread: 2 },
  { id: 3, name: 'Brad Thompson', preview: 'Thanks for the update on the project', time: '5h ago', badge: 'client', status: 'offline', unread: 0 },
  { id: 4, name: 'Grace Liu', preview: 'Posted the new content schedule', time: '1d ago', badge: 'va', status: 'online', unread: 0 },
  { id: 5, name: 'Sofia Rodriguez', preview: 'All support tickets resolved!', time: '1d ago', badge: 'va', status: 'online', unread: 0 },
  { id: 6, name: 'Lilian Banh', preview: 'Invoice processing completed', time: '2d ago', badge: 'va', status: 'online', unread: 0 },
];

const mockTasks = [
  { id: 1, title: 'Complete Q1 Financial Report', assignee: 'Maria Santos', status: 'completed', priority: 'high', dueDate: 'Jan 15', progress: 100 },
  { id: 2, title: 'Update CRM Database', assignee: 'David Park', status: 'in-progress', priority: 'medium', dueDate: 'Jan 17', progress: 65 },
  { id: 3, title: 'Social Media Campaign - January', assignee: 'Grace Liu', status: 'in-progress', priority: 'high', dueDate: 'Jan 20', progress: 80 },
  { id: 4, title: 'Customer Support Tickets Review', assignee: 'Sofia Rodriguez', status: 'completed', priority: 'medium', dueDate: 'Jan 14', progress: 100 },
  { id: 5, title: 'Email Newsletter Draft', assignee: 'James Chen', status: 'in-progress', priority: 'medium', dueDate: 'Jan 22', progress: 45 },
  { id: 6, title: 'Competitor Analysis Report', assignee: 'Maria Santos', status: 'in-progress', priority: 'high', dueDate: 'Jan 18', progress: 70 },
  { id: 7, title: 'Monthly Invoicing', assignee: 'Lilian Banh', status: 'completed', priority: 'high', dueDate: 'Jan 10', progress: 100 },
  { id: 8, title: 'Client Onboarding - TechStart', assignee: 'Sofia Rodriguez', status: 'pending', priority: 'high', dueDate: 'Jan 25', progress: 0 },
];

const mockFiles = [
  { id: 1, name: 'Q4 Financial Report.pdf', type: 'pdf', size: '2.4 MB', uploadedBy: 'Maria Santos', date: 'Jan 15, 2026' },
  { id: 2, name: 'Marketing Strategy 2026.pptx', type: 'pptx', size: '8.1 MB', uploadedBy: 'James Chen', date: 'Jan 14, 2026' },
  { id: 3, name: 'Customer Database.xlsx', type: 'xlsx', size: '1.2 MB', uploadedBy: 'David Park', date: 'Jan 13, 2026' },
  { id: 4, name: 'Brand Guidelines.pdf', type: 'pdf', size: '5.7 MB', uploadedBy: 'Grace Liu', date: 'Jan 10, 2026' },
  { id: 5, name: 'Meeting Notes - Jan 12.docx', type: 'docx', size: '156 KB', uploadedBy: 'Maria Santos', date: 'Jan 12, 2026' },
  { id: 6, name: 'Invoice Template.xlsx', type: 'xlsx', size: '89 KB', uploadedBy: 'Lilian Banh', date: 'Jan 8, 2026' },
];

const mockLeaveRequests = [
  { id: 1, employee: 'Maria Santos', type: 'Annual Leave', startDate: 'Feb 10', endDate: 'Feb 14', status: 'pending', days: 5 },
  { id: 2, employee: 'James Chen', type: 'Sick Leave', startDate: 'Jan 8', endDate: 'Jan 9', status: 'approved', days: 2 },
  { id: 3, employee: 'Grace Liu', type: 'Personal Leave', startDate: 'Jan 25', endDate: 'Jan 25', status: 'approved', days: 1 },
  { id: 4, employee: 'David Park', type: 'Annual Leave', startDate: 'Mar 1', endDate: 'Mar 5', status: 'pending', days: 5 },
];

const mockAnnouncements = [
  { id: 1, title: 'New Client Portal Features Released', date: 'Jan 16, 2026', content: "We've added new task management features and improved the messaging system. Check out the updates!", important: true },
  { id: 2, title: 'Holiday Schedule Reminder', date: 'Jan 14, 2026', content: 'Please submit all leave requests for February by January 25th.', important: false },
  { id: 3, title: 'Training Session: Advanced Excel', date: 'Jan 12, 2026', content: 'Join us for an advanced Excel training session on January 20th at 2 PM.', important: false },
  { id: 4, title: 'Welcome New Team Member!', date: 'Jan 10, 2026', content: 'Please welcome Lilian Banh to our team as our new Bookkeeper!', important: false },
];

const mockClients = [
  { id: 1, company: 'TechStart Inc', contact: 'John Williams', vas: 3, status: 'active', value: 4500, since: 'Aug 2024' },
  { id: 2, company: 'GrowthCo', contact: 'Emily Davis', vas: 2, status: 'active', value: 3200, since: 'Sep 2024' },
  { id: 3, company: 'InnovateLab', contact: 'Michael Brown', vas: 4, status: 'active', value: 5800, since: 'Jul 2024' },
  { id: 4, company: 'ScaleUp Solutions', contact: 'Lisa Anderson', vas: 1, status: 'active', value: 1500, since: 'Nov 2024' },
  { id: 5, company: 'Digital Dynamics', contact: 'Robert Taylor', vas: 2, status: 'onboarding', value: 2800, since: 'Jan 2026' },
];

const mockInvoices = [
  { id: 'INV-2026-001', date: 'Jan 15, 2026', amount: 4850.00, status: 'paid', dueDate: 'Jan 30, 2026' },
  { id: 'INV-2025-012', date: 'Dec 15, 2025', amount: 4650.00, status: 'paid', dueDate: 'Dec 30, 2025' },
  { id: 'INV-2025-011', date: 'Nov 15, 2025', amount: 4200.00, status: 'paid', dueDate: 'Nov 30, 2025' },
  { id: 'INV-2025-010', date: 'Oct 15, 2025', amount: 3800.00, status: 'paid', dueDate: 'Oct 30, 2025' },
];

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Icons.Dashboard },
  { id: 'clients', label: 'Clients', icon: Icons.Clients },
  { id: 'sales', label: 'Sales', icon: Icons.Sales },
  { id: 'recruitment', label: 'Recruitment', icon: Icons.Recruitment },
  { id: 'virtual-assistants', label: 'Virtual Assistants', icon: Icons.VirtualAssistants },
  { id: 'messaging', label: 'Messaging', icon: Icons.Messaging, badge: 2 },
  { id: 'file-hub', label: 'File Hub', icon: Icons.FileHub },
  { id: 'leave-requests', label: 'Leave Requests', icon: Icons.LeaveRequests },
  { id: 'tasks', label: 'Tasks Overview', icon: Icons.Tasks },
  { id: 'announcements', label: 'Announcements', icon: Icons.Announcements },
  { id: 'knowledge-hub', label: 'Knowledge Hub', icon: Icons.KnowledgeHub },
  { id: 'billing', label: 'Billing', icon: Icons.Billing },
  { id: 'email', label: 'Email Management', icon: Icons.Email },
  { id: 'analytics', label: 'Analytics', icon: Icons.Analytics },
  { id: 'user-management', label: 'User Management', icon: Icons.UserManagement },
];

// Page Components
const DashboardPage = ({ darkMode }) => (
  <div className="content-area">
    <div className="stats-grid">
      {[
        { label: 'Active VAs', value: '6', change: '+2 this month', positive: true, icon: 'primary' },
        { label: 'Tasks Completed', value: '847', change: '+23.5%', positive: true, icon: 'success' },
        { label: 'Hours Logged', value: '219', change: 'This week', positive: true, icon: 'warning' },
        { label: 'Satisfaction', value: '4.9', change: '+0.2 pts', positive: true, icon: 'danger' },
      ].map((stat, i) => (
        <div key={i} className="stat-card animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="stat-card-header">
            <span className="stat-label">{stat.label}</span>
            <div className={`stat-icon ${stat.icon}`}>
              {stat.icon === 'primary' && <Icons.VirtualAssistants />}
              {stat.icon === 'success' && <Icons.Tasks />}
              {stat.icon === 'warning' && <Icons.Analytics />}
              {stat.icon === 'danger' && <Icons.Star />}
            </div>
          </div>
          <div className="stat-value">{stat.value}</div>
          <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
            <Icons.TrendUp />
            <span>{stat.change}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="charts-grid">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title"><Icons.Analytics /> Task Completion Trend</h3>
          <select className="select"><option>Last 7 days</option></select>
        </div>
        <div className="card-body">
          <div className="chart-area">
            <svg viewBox="0 0 400 140" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#35797b" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#35797b" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 0 110 Q 60 90 120 75 T 240 55 T 360 35 L 400 25 L 400 140 L 0 140 Z" fill="url(#gradient)" />
              <path d="M 0 110 Q 60 90 120 75 T 240 55 T 360 35 L 400 25" fill="none" stroke="#35797b" strokeWidth="3" />
              <circle cx="120" cy="75" r="4" fill="#35797b" />
              <circle cx="240" cy="55" r="4" fill="#35797b" />
              <circle cx="360" cy="35" r="4" fill="#35797b" />
            </svg>
          </div>
          <div className="chart-labels">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
          <div className="chart-legend">
            <span className="legend-item"><span className="legend-dot completed"></span> Completed</span>
            <span className="legend-item"><span className="legend-dot created"></span> Created</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title"><Icons.VirtualAssistants /> Team Workload</h3>
        </div>
        <div className="card-body">
          <div className="donut-container">
            <svg viewBox="0 0 100 100" className="donut-chart">
              <circle cx="50" cy="50" r="35" fill="none" stroke={darkMode ? '#374151' : '#e5e7eb'} strokeWidth="12" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#35797b" strokeWidth="12" strokeDasharray="110 220" strokeDashoffset="0" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="66 220" strokeDashoffset="-110" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="44 220" strokeDashoffset="-176" transform="rotate(-90 50 50)" />
            </svg>
            <div className="donut-legend">
              <div className="donut-legend-item"><span className="legend-dot" style={{background: '#35797b'}}></span> Admin <strong>50%</strong></div>
              <div className="donut-legend-item"><span className="legend-dot" style={{background: '#10b981'}}></span> Marketing <strong>30%</strong></div>
              <div className="donut-legend-item"><span className="legend-dot" style={{background: '#f59e0b'}}></span> Support <strong>20%</strong></div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title"><Icons.Sales /> Monthly Spend</h3>
        </div>
        <div className="card-body">
          <div className="revenue-amount">$4,850</div>
          <div className="revenue-change"><Icons.TrendUp /> +4.3% from last month</div>
          <div className="bar-chart">
            {[65, 72, 68, 78, 85, 82, 90].map((h, i) => (
              <div key={i} className="bar-wrapper">
                <div className="bar" style={{ height: `${h}px` }}></div>
                <span className="bar-label">{['J','A','S','O','N','D','J'][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="quick-actions">
      <h3>Quick Actions</h3>
      <div className="actions-grid">
        {[
          { label: 'Create New Task', color: '#35797b' },
          { label: 'Message VA', color: '#10b981' },
          { label: 'Upload Files', color: '#35797b' },
          { label: 'View Reports', color: '#f59e0b' },
        ].map((action, i) => (
          <button key={i} className="action-btn">
            <span className="action-dot" style={{ background: action.color }}></span>
            {action.label}
            <Icons.ChevronRight />
          </button>
        ))}
      </div>
    </div>
  </div>
);

const ClientsPage = () => (
  <div className="content-area">
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">All Clients</h3>
        <button className="btn btn-primary"><Icons.Plus /> Add Client</button>
      </div>
      <div className="card-body" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>VAs Assigned</th>
              <th>Status</th>
              <th>Monthly Value</th>
              <th>Client Since</th>
            </tr>
          </thead>
          <tbody>
            {mockClients.map(client => (
              <tr key={client.id}>
                <td style={{ fontWeight: 600 }}>{client.company}</td>
                <td>{client.contact}</td>
                <td>{client.vas}</td>
                <td><span className={`status-badge ${client.status}`}><span className="status-dot"></span>{client.status}</span></td>
                <td style={{ fontWeight: 600 }}>${client.value.toLocaleString()}</td>
                <td style={{ color: 'var(--gray-500)' }}>{client.since}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const SalesPage = () => (
  <div className="content-area">
    <div className="stats-grid" style={{ marginBottom: 24 }}>
      {[
        { label: 'Pipeline Value', value: '$127,500', change: '+18%', positive: true },
        { label: 'Won This Month', value: '$42,300', change: '+32%', positive: true },
        { label: 'Active Deals', value: '18', change: '+5', positive: true },
        { label: 'Conversion Rate', value: '34%', change: '+8%', positive: true },
      ].map((stat, i) => (
        <div key={i} className="stat-card">
          <span className="stat-label">{stat.label}</span>
          <div className="stat-value">{stat.value}</div>
          <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
            <Icons.TrendUp />
            <span>{stat.change}</span>
          </div>
        </div>
      ))}
    </div>
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Sales Pipeline</h3>
        <button className="btn btn-primary"><Icons.Plus /> Add Lead</button>
      </div>
      <div className="card-body" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr><th>Company</th><th>Contact</th><th>Value</th><th>Stage</th><th>Probability</th></tr>
          </thead>
          <tbody>
            {[
              { company: 'Apex Industries', contact: 'Sarah Mitchell', value: 15000, stage: 'proposal', probability: 75 },
              { company: 'Nova Tech', contact: 'David Lee', value: 8500, stage: 'negotiation', probability: 85 },
              { company: 'Summit Corp', contact: 'Jennifer White', value: 22000, stage: 'discovery', probability: 40 },
              { company: 'Velocity Partners', contact: 'Mark Johnson', value: 6000, stage: 'closed-won', probability: 100 },
              { company: 'Horizon Labs', contact: 'Amanda Chen', value: 12500, stage: 'proposal', probability: 60 },
            ].map((lead, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{lead.company}</td>
                <td>{lead.contact}</td>
                <td style={{ fontWeight: 600 }}>${lead.value.toLocaleString()}</td>
                <td><span className={`status-badge ${lead.stage === 'closed-won' ? 'completed' : 'in-progress'}`}>{lead.stage}</span></td>
                <td>{lead.probability}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const RecruitmentPage = () => (
  <div className="content-area">
    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 24 }}>
      {[
        { label: 'Active Candidates', value: '24', change: '+8 this week' },
        { label: 'Interviews Scheduled', value: '7', change: 'Next 5 days' },
        { label: 'Offers Pending', value: '3', change: 'Awaiting response' },
      ].map((stat, i) => (
        <div key={i} className="stat-card">
          <span className="stat-label">{stat.label}</span>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-change positive"><Icons.TrendUp /><span>{stat.change}</span></div>
        </div>
      ))}
    </div>
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Candidate Pipeline</h3>
        <button className="btn btn-primary"><Icons.Plus /> Add Candidate</button>
      </div>
      <div className="card-body" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr><th>Name</th><th>Role</th><th>Experience</th><th>Status</th><th>Rating</th></tr>
          </thead>
          <tbody>
            {[
              { name: 'Anna Martinez', role: 'Virtual Assistant', experience: '5 years', status: 'interview', rating: 4.8 },
              { name: 'Michael Thompson', role: 'Marketing Assistant', experience: '3 years', status: 'screening', rating: 4.6 },
              { name: 'Sarah Kim', role: 'Customer Support', experience: '4 years', status: 'offer', rating: 4.9 },
              { name: 'Daniel Wilson', role: 'Data Entry', experience: '2 years', status: 'interview', rating: 4.5 },
              { name: 'Emma Rodriguez', role: 'Executive Assistant', experience: '6 years', status: 'screening', rating: 4.7 },
            ].map((c, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{c.name}</td>
                <td>{c.role}</td>
                <td>{c.experience}</td>
                <td><span className={`status-badge ${c.status === 'offer' ? 'completed' : 'in-progress'}`}>{c.status}</span></td>
                <td><div className="rating"><Icons.Star /><span>{c.rating}</span></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const VirtualAssistantsPage = () => (
  <div className="content-area">
    <div className="va-grid">
      {mockVAs.map((va, i) => (
        <div key={va.id} className="va-card animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="va-header">
            <div className="avatar-container">
              <div className="avatar gradient">{va.initials}</div>
              {va.status === 'online' && <div className="online-indicator"></div>}
            </div>
            <div className="va-info">
              <h4>{va.name}</h4>
              <p>{va.role}</p>
            </div>
          </div>
          <div className="rating" style={{ marginBottom: 16 }}>
            <Icons.Star /><Icons.Star /><Icons.Star /><Icons.Star /><Icons.Star />
            <span>{va.rating}</span>
          </div>
          <div className="va-stats">
            <div className="va-stat">
              <div className="va-stat-value">{va.tasksCompleted}</div>
              <div className="va-stat-label">Tasks Done</div>
            </div>
            <div className="va-stat">
              <div className="va-stat-value">{va.hoursThisWeek}h</div>
              <div className="va-stat-label">This Week</div>
            </div>
            <div className="va-stat">
              <div className="va-stat-value" style={{ color: va.status === 'online' ? 'var(--success-500)' : 'var(--warning-500)' }}>●</div>
              <div className="va-stat-label">{va.status}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MessagingPage = ({ darkMode }) => {
  const [activeConversation, setActiveConversation] = useState(mockConversations[0]);
  const [messages, setMessages] = useState([
    { id: 1, text: "Good morning! I've completed the quarterly report and sent it to the team. The financials look great this quarter!", sent: false, time: '9:32 AM' },
    { id: 2, text: 'Thanks Maria! That was fast. Could you also prepare the client presentation for tomorrow?', sent: true, time: '9:45 AM' },
    { id: 3, text: "Of course! I'll have the draft ready by 3 PM for your review. Should I include the latest sales figures and customer testimonials?", sent: false, time: '9:47 AM' },
    { id: 4, text: 'Yes please, and add the customer testimonials from last month. Also include the growth metrics.', sent: true, time: '9:50 AM' },
    { id: 5, text: "Perfect, I'll include everything. I'll send you a notification when it's ready for review! 📊", sent: false, time: '9:51 AM' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        "Got it! I'll get started on that right away. You can expect an update within the hour! 👍",
        "Absolutely! I'll prioritize this and have it ready for you shortly. Is there anything specific you'd like me to focus on?",
        "No problem at all! I'll make sure to include all the details. Should I also prepare a summary document?",
        "Sure thing! I'll send you a notification once it's complete. Let me know if anything changes!",
        "Perfect, I'm on it! I'll keep you posted on the progress. Thanks for the clear instructions! 🙌"
      ];
      const reply = {
        id: messages.length + 2,
        text: replies[Math.floor(Math.random() * replies.length)],
        sent: false,
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  return (
    <div className="content-area" style={{ padding: 0, height: 'calc(100% - 64px)' }}>
      <div className="messaging-container" style={{ height: '100%', borderRadius: 0, border: 'none' }}>
        <div className="conversations-list">
          <div className="conversations-header">
            <h2>Messages</h2>
            <button className="new-chat-btn"><Icons.Plus /></button>
          </div>
          <input type="text" className="search-input" placeholder="Search conversations..." />
          <div className="filter-tabs">
            <button className="filter-tab active">All <span className="filter-count">6</span></button>
            <button className="filter-tab">VAs <span className="filter-count">5</span></button>
            <button className="filter-tab">Clients <span className="filter-count">1</span></button>
          </div>
          <div className="conversations-scroll">
            {mockConversations.map(conv => (
              <div 
                key={conv.id} 
                className={`conversation-item ${activeConversation.id === conv.id ? 'active' : ''}`}
                onClick={() => setActiveConversation(conv)}
              >
                <div className="avatar-container">
                  <div className="avatar gradient">{conv.name.split(' ').map(n => n[0]).join('')}</div>
                  {conv.status === 'online' && <div className="online-indicator"></div>}
                </div>
                <div className="conversation-info">
                  <div className="conversation-name">{conv.name}</div>
                  <div className="conversation-preview">{conv.preview}</div>
                </div>
                <div className="conversation-meta">
                  <div className="conversation-time">{conv.time}</div>
                  <span className={`conversation-badge ${conv.badge}`}>{conv.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-area">
          <div className="chat-header">
            <div className="avatar-container">
              <div className="avatar gradient">{activeConversation.name.split(' ').map(n => n[0]).join('')}</div>
              {activeConversation.status === 'online' && <div className="online-indicator"></div>}
            </div>
            <div className="chat-user-info">
              <h3>{activeConversation.name}</h3>
              <p>{activeConversation.status === 'online' ? 'Online' : 'Offline'}</p>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.sent ? 'sent' : 'received'}`}>
                {!msg.sent && <div className="avatar gradient" style={{ width: 36, height: 36, fontSize: 12 }}>{activeConversation.name.split(' ').map(n => n[0]).join('')}</div>}
                <div>
                  <div className="message-content">{msg.text}</div>
                  <div className="message-time">{msg.time}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message received">
                <div className="avatar gradient" style={{ width: 36, height: 36, fontSize: 12 }}>{activeConversation.name.split(' ').map(n => n[0]).join('')}</div>
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <input
                type="text"
                className="chat-input"
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
            </div>
            <button className="send-btn" onClick={handleSend} disabled={!inputValue.trim()}>
              <Icons.Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FileHubPage = () => (
  <div className="content-area">
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Recent Files</h3>
        <button className="btn btn-primary"><Icons.Plus /> Upload File</button>
      </div>
      <div className="card-body">
        {mockFiles.map((file, i) => (
          <div key={file.id} className="list-item animate-in" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className={`file-icon ${file.type}`}>{file.type}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, marginBottom: 2 }}>{file.name}</div>
              <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{file.size} • Uploaded by {file.uploadedBy}</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--gray-400)' }}>{file.date}</div>
            <button className="btn btn-secondary" style={{ padding: '8px 12px' }}><Icons.Download /></button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const LeaveRequestsPage = () => (
  <div className="content-area">
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Leave Requests</h3>
        <button className="btn btn-primary"><Icons.Plus /> New Request</button>
      </div>
      <div className="card-body" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr><th>Employee</th><th>Type</th><th>Dates</th><th>Days</th><th>Status</th></tr>
          </thead>
          <tbody>
            {mockLeaveRequests.map(req => (
              <tr key={req.id}>
                <td style={{ fontWeight: 600 }}>{req.employee}</td>
                <td>{req.type}</td>
                <td>{req.startDate} - {req.endDate}</td>
                <td>{req.days}</td>
                <td><span className={`status-badge ${req.status === 'approved' ? 'approved' : 'pending'}`}>{req.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const TasksPage = () => (
  <div className="content-area">
    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
      {[
        { label: 'Total Tasks', value: '8', change: 'Active' },
        { label: 'Completed', value: '3', change: '37.5%' },
        { label: 'In Progress', value: '4', change: '50%' },
        { label: 'Pending', value: '1', change: '12.5%' },
      ].map((stat, i) => (
        <div key={i} className="stat-card">
          <span className="stat-label">{stat.label}</span>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-change positive"><span>{stat.change}</span></div>
        </div>
      ))}
    </div>
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">All Tasks</h3>
        <button className="btn btn-primary"><Icons.Plus /> Add Task</button>
      </div>
      <div className="card-body" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr><th>Task</th><th>Assignee</th><th>Due Date</th><th>Priority</th><th>Status</th><th>Progress</th></tr>
          </thead>
          <tbody>
            {mockTasks.map(task => (
              <tr key={task.id}>
                <td style={{ fontWeight: 600 }}>{task.title}</td>
                <td>{task.assignee}</td>
                <td>{task.dueDate}</td>
                <td><span className={`status-badge ${task.priority}`}>{task.priority}</span></td>
                <td><span className={`status-badge ${task.status}`}>{task.status}</span></td>
                <td style={{ width: 120 }}>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const AnnouncementsPage = () => (
  <div className="content-area">
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Announcements</h3>
        <button className="btn btn-primary"><Icons.Plus /> New Announcement</button>
      </div>
      <div className="card-body">
        {mockAnnouncements.map((ann, i) => (
          <div key={ann.id} className="list-item animate-in" style={{ animationDelay: `${i * 0.05}s`, flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
              <h4 style={{ fontWeight: 600, flex: 1, fontSize: 15 }}>{ann.title}</h4>
              {ann.important && <span className="status-badge high">Important</span>}
              <span style={{ fontSize: 13, color: 'var(--gray-400)' }}>{ann.date}</span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.5 }}>{ann.content}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const KnowledgeHubPage = () => (
  <div className="content-area">
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Knowledge Base</h3>
        <div className="search-bar" style={{ width: 280 }}>
          <Icons.Search />
          <input type="text" placeholder="Search articles..." />
        </div>
      </div>
      <div className="card-body">
        {[
          { title: 'Getting Started with Your VA', category: 'Onboarding', views: 1247, updated: '2 days ago' },
          { title: 'Best Practices for Task Delegation', category: 'Productivity', views: 892, updated: '1 week ago' },
          { title: 'Communication Guidelines', category: 'Communication', views: 756, updated: '3 days ago' },
          { title: 'Using the File Hub Effectively', category: 'Features', views: 534, updated: '5 days ago' },
          { title: 'Setting Up Automated Reports', category: 'Features', views: 423, updated: '1 week ago' },
          { title: 'Security Best Practices', category: 'Security', views: 312, updated: '2 weeks ago' },
        ].map((article, i) => (
          <div key={i} className="list-item animate-in" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="stat-icon primary" style={{ width: 44, height: 44 }}><Icons.KnowledgeHub /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{article.title}</div>
              <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{article.category} • Updated {article.updated}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--gray-400)' }}>
              <Icons.Eye /> {article.views}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BillingPage = () => (
  <div className="content-area">
    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 24 }}>
      {[
        { label: 'Current Balance', value: '$0.00', change: 'All invoices paid', icon: 'check' },
        { label: 'This Month', value: '$4,850', change: 'Due Jan 30', icon: 'calendar' },
        { label: 'Total Spent', value: '$58,200', change: 'Since Aug 2024', icon: 'trend' },
      ].map((stat, i) => (
        <div key={i} className="stat-card">
          <span className="stat-label">{stat.label}</span>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-change positive"><Icons.Check /><span>{stat.change}</span></div>
        </div>
      ))}
    </div>
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Invoice History</h3>
        <button className="btn btn-secondary"><Icons.Download /> Export</button>
      </div>
      <div className="card-body" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Due Date</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {mockInvoices.map(inv => (
              <tr key={inv.id}>
                <td style={{ fontWeight: 600 }}>{inv.id}</td>
                <td>{inv.date}</td>
                <td style={{ fontWeight: 600 }}>${inv.amount.toLocaleString()}</td>
                <td>{inv.dueDate}</td>
                <td><span className="status-badge completed">{inv.status}</span></td>
                <td><button className="btn btn-secondary" style={{ padding: '6px 10px' }}><Icons.Download /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const EmailPage = () => (
  <div className="content-area">
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Email Templates</h3>
        <button className="btn btn-primary"><Icons.Plus /> New Template</button>
      </div>
      <div className="card-body">
        {[
          { name: 'Welcome Email', uses: 156, lastUsed: 'Jan 15', category: 'Onboarding' },
          { name: 'Invoice Reminder', uses: 89, lastUsed: 'Jan 14', category: 'Billing' },
          { name: 'Weekly Update', uses: 234, lastUsed: 'Jan 13', category: 'Reports' },
          { name: 'Task Assignment', uses: 312, lastUsed: 'Jan 16', category: 'Tasks' },
          { name: 'Meeting Invitation', uses: 178, lastUsed: 'Jan 12', category: 'Scheduling' },
        ].map((template, i) => (
          <div key={i} className="list-item animate-in" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="stat-icon primary" style={{ width: 44, height: 44 }}><Icons.Email /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{template.name}</div>
              <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{template.category} • Used {template.uses} times</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--gray-400)' }}>Last used: {template.lastUsed}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AnalyticsPage = ({ darkMode }) => (
  <div className="content-area">
    <div className="stats-grid" style={{ marginBottom: 24 }}>
      {[
        { label: 'Total Hours', value: '1,247', change: '+12% this month' },
        { label: 'Tasks Completed', value: '892', change: '+18% this month' },
        { label: 'Avg Response Time', value: '12m', change: '-24% improvement' },
        { label: 'Client Satisfaction', value: '4.9', change: '+0.2 pts' },
      ].map((stat, i) => (
        <div key={i} className="stat-card">
          <span className="stat-label">{stat.label}</span>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-change positive"><Icons.TrendUp /><span>{stat.change}</span></div>
        </div>
      ))}
    </div>
    <div className="charts-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
      <div className="card">
        <div className="card-header"><h3 className="card-title">Productivity Trends</h3></div>
        <div className="card-body">
          <div className="chart-area">
            <svg viewBox="0 0 400 140" style={{ width: '100%', height: '100%' }}>
              <path d="M 0 100 Q 80 80 160 65 T 320 45 L 400 35" fill="none" stroke="#35797b" strokeWidth="3" />
              <path d="M 0 110 Q 80 100 160 85 T 320 70 L 400 60" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" />
            </svg>
          </div>
          <div className="chart-legend">
            <span className="legend-item"><span className="legend-dot" style={{background: '#35797b'}}></span> Hours Logged</span>
            <span className="legend-item"><span className="legend-dot" style={{background: '#10b981'}}></span> Tasks Completed</span>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">Task Distribution by VA</h3></div>
        <div className="card-body">
          <div className="donut-container">
            <svg viewBox="0 0 100 100" className="donut-chart">
              <circle cx="50" cy="50" r="35" fill="none" stroke={darkMode ? '#374151' : '#e5e7eb'} strokeWidth="12" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#35797b" strokeWidth="12" strokeDasharray="55 220" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="44 220" strokeDashoffset="-55" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="44 220" strokeDashoffset="-99" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#ef4444" strokeWidth="12" strokeDasharray="33 220" strokeDashoffset="-143" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="#8b5cf6" strokeWidth="12" strokeDasharray="44 220" strokeDashoffset="-176" transform="rotate(-90 50 50)" />
            </svg>
            <div className="donut-legend">
              <div className="donut-legend-item"><span className="legend-dot" style={{background: '#35797b'}}></span> Maria <strong>25%</strong></div>
              <div className="donut-legend-item"><span className="legend-dot" style={{background: '#10b981'}}></span> James <strong>20%</strong></div>
              <div className="donut-legend-item"><span className="legend-dot" style={{background: '#f59e0b'}}></span> Sofia <strong>20%</strong></div>
              <div className="donut-legend-item"><span className="legend-dot" style={{background: '#ef4444'}}></span> David <strong>15%</strong></div>
              <div className="donut-legend-item"><span className="legend-dot" style={{background: '#8b5cf6'}}></span> Grace <strong>20%</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const UserManagementPage = () => (
  <div className="content-area">
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Team Members</h3>
        <button className="btn btn-primary"><Icons.Plus /> Add User</button>
      </div>
      <div className="card-body" style={{ padding: 0 }}>
        <table className="data-table">
          <thead>
            <tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Last Active</th></tr>
          </thead>
          <tbody>
            {[
              { name: 'Richard Parr', email: 'richard@company.com', role: 'Admin', status: 'active', lastActive: 'Now' },
              { name: 'Jamaica Santos', email: 'jamaica@outsourceteams.com', role: 'Manager', status: 'active', lastActive: '2h ago' },
              ...mockVAs.slice(0, 4).map(va => ({
                name: va.name,
                email: va.email,
                role: 'VA',
                status: va.status === 'online' ? 'active' : 'away',
                lastActive: va.status === 'online' ? 'Now' : '3h ago'
              }))
            ].map((user, i) => (
              <tr key={i}>
                <td><div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="avatar gradient" style={{ width: 36, height: 36, fontSize: 12 }}>{user.name.split(' ').map(n => n[0]).join('')}</div>
                  <span style={{ fontWeight: 600 }}>{user.name}</span>
                </div></td>
                <td>{user.email}</td>
                <td><span className={`status-badge ${user.role === 'Admin' ? 'high' : user.role === 'Manager' ? 'medium' : 'active'}`}>{user.role}</span></td>
                <td><span className={`status-badge ${user.status === 'active' ? 'completed' : 'pending'}`}>{user.status}</span></td>
                <td style={{ color: 'var(--gray-500)' }}>{user.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// Main App
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardPage darkMode={darkMode} />;
      case 'clients': return <ClientsPage />;
      case 'sales': return <SalesPage />;
      case 'recruitment': return <RecruitmentPage />;
      case 'virtual-assistants': return <VirtualAssistantsPage />;
      case 'messaging': return <MessagingPage darkMode={darkMode} />;
      case 'file-hub': return <FileHubPage />;
      case 'leave-requests': return <LeaveRequestsPage />;
      case 'tasks': return <TasksPage />;
      case 'announcements': return <AnnouncementsPage />;
      case 'knowledge-hub': return <KnowledgeHubPage />;
      case 'billing': return <BillingPage />;
      case 'email': return <EmailPage />;
      case 'analytics': return <AnalyticsPage darkMode={darkMode} />;
      case 'user-management': return <UserManagementPage />;
      default: return <DashboardPage darkMode={darkMode} />;
    }
  };

  const getPageTitle = () => {
    const item = navItems.find(n => n.id === activePage);
    return item ? item.label : 'Dashboard';
  };

  return (
    <div className={`browser-frame ${darkMode ? 'dark' : ''}`}>
      {/* Browser Chrome */}
      <div className="browser-header">
        <div className="browser-controls">
          <div className="browser-dot red"></div>
          <div className="browser-dot yellow"></div>
          <div className="browser-dot green"></div>
        </div>
        <div className="address-bar">
          <span className="lock-icon"><Icons.Lock /></span>
          <span>dashboard.outsourceteams.com</span>
        </div>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} title={darkMode ? 'Light mode' : 'Dark mode'}>
          {darkMode ? <Icons.Sun /> : <Icons.Moon />}
        </button>
      </div>

      {/* Dashboard */}
      <div className="dashboard-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="logo">
              <div className="logo-icon">OT</div>
              <div className="logo-text">
                outsource
                <span>teams</span>
              </div>
            </div>
          </div>
          <nav className="sidebar-nav">
            {navItems.map(item => (
              <div
                key={item.id}
                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => setActivePage(item.id)}
              >
                <item.icon />
                <span>{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}
          </nav>
        </div>

        {/* Main */}
        <div className="main-content">
          <header className="content-header">
            <div className="header-left">
              <h1 className="page-title">{getPageTitle()}</h1>
            </div>
            <div className="header-right">
              <div className="search-bar">
                <Icons.Search />
                <input type="text" placeholder="Search..." />
              </div>
              <button className="notification-btn">
                <Icons.Bell />
                <span className="notification-badge">3</span>
              </button>
              <div className="user-avatar">RP</div>
            </div>
          </header>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
