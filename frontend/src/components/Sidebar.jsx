import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Activity, Users, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';

function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Briefcase, label: 'Job Postings', path: '/jobs' },
    { icon: Calendar, label: 'Interview Scheduler', path: '/scheduler' },
    { icon: Activity, label: 'Placement Timeline', path: '/timeline' },
    { icon: Users, label: 'Mentorship', path: '/mentorship' },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-[#002147] shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      } pt-20`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute right-0 top-24 bg-blue-500 text-white p-2 rounded-l-none rounded-r-lg transform translate-x-full"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <div className="flex flex-col gap-2 p-3">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-white/10 text-white'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            } ${
              isOpen ? 'justify-start' : 'justify-center'
            }`}
          >
            <item.icon className={`w-6 h-6 ${!isOpen && 'text-white'}`} />
            {isOpen && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar