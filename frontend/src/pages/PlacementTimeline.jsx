import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

function PlacementTimeline() {
  const timelineEvents = [
    {
      title: 'Resume Submission',
      date: 'January 15, 2024',
      status: 'completed',
      description: 'All students submitted their resumes for review',
    },
    {
      title: 'Resume Screening',
      date: 'February 1, 2024',
      status: 'completed',
      description: 'HR team completed resume screening process',
    },
    {
      title: 'Technical Assessment',
      date: 'March 10, 2024',
      status: 'current',
      description: 'Online coding test and technical evaluation',
    },
    {
      title: 'Technical Interviews',
      date: 'March 20, 2024',
      status: 'upcoming',
      description: 'One-on-one technical interviews with the engineering team',
    },
    {
      title: 'HR Interviews',
      date: 'March 25, 2024',
      status: 'upcoming',
      description: 'Final round of interviews with HR team',
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'current':
        return <Clock className="w-6 h-6 text-blue-500" />;
      case 'upcoming':
        return <AlertCircle className="w-6 h-6 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Placement Process Timeline</h2>
        
        <div className="relative">
          {timelineEvents.map((event, index) => (
            <div key={index} className="mb-8 flex gap-6">
              <div className="flex flex-col items-center">
                {getStatusIcon(event.status)}
                {index < timelineEvents.length - 1 && (
                  <div className={`w-0.5 h-full mt-2 ${
                    event.status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
              
              <div className="flex-1">
                <div className={`p-4 rounded-lg border ${
                  event.status === 'current' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{event.title}</h3>
                    <span className="text-sm text-gray-500">{event.date}</span>
                  </div>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Progress Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium text-gray-500">Total Students</h3>
            <p className="text-2xl font-bold mt-2">450</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium text-gray-500">Cleared Technical</h3>
            <p className="text-2xl font-bold mt-2">285</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium text-gray-500">Final Placements</h3>
            <p className="text-2xl font-bold mt-2">180</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlacementTimeline