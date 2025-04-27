import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, Calendar, TrendingUp, MapPin, Clock, GraduationCap, DollarSign } from 'lucide-react';

function Dashboard({ setModalContent }) {
  const navigate = useNavigate();
  const stats = [
    { label: 'Active Job Postings', value: '156', icon: Briefcase, trend: '+12%' },
    { label: 'Scheduled Interviews', value: '48', icon: Calendar, trend: '+8%' },
    { label: 'Placed Students', value: '892', icon: Users, trend: '+15%' },
    { label: 'Average Package', value: '₹8.5L', icon: TrendingUp, trend: '+10%' },
  ];

  const jobs = [
    { 
      id: 1, 
      company: 'Tech Corp', 
      role: 'Software Engineer', 
      package: '12 LPA',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'We are looking for a skilled Software Engineer to join our team. The ideal candidate should have strong programming skills and experience with modern web technologies.',
      requirements: ['React', 'Node.js', 'MongoDB', 'AWS'],
      postedDate: '2024-03-15',
      deadline: '2024-04-15'
    },
    { 
      id: 2, 
      company: 'Data Systems', 
      role: 'Data Analyst', 
      package: '8 LPA',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '1-3 years',
      description: 'Join our data team to analyze complex datasets and provide insights that drive business decisions.',
      requirements: ['Python', 'SQL', 'Tableau', 'Statistics'],
      postedDate: '2024-03-14',
      deadline: '2024-04-14'
    },
    { 
      id: 3, 
      company: 'Cloud Solutions', 
      role: 'DevOps Engineer', 
      package: '14 LPA',
      location: 'Mumbai, India',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Looking for an experienced DevOps Engineer to help us build and maintain our cloud infrastructure.',
      requirements: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      postedDate: '2024-03-13',
      deadline: '2024-04-13'
    },
  ];

  const handleApply = (job) => {
    navigate(`/apply/${job.id}`, { 
      state: { jobDetails: job },
      replace: true
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                <span className="text-green-500 text-sm font-medium">{stat.trend}</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <stat.icon className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Job Postings</h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div>
                  <h3 className="font-medium">{job.company}</h3>
                  <p className="text-sm text-gray-500">{job.role}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-600 font-medium">{job.package}</span>
                  <button
                    onClick={() => handleApply(job)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Interviews</h2>
          <div className="space-y-4">
            {[
              { company: 'Innovation Labs', date: 'Mar 15', candidates: 25 },
              { company: 'Future Tech', date: 'Mar 18', candidates: 30 },
              { company: 'Smart Systems', date: 'Mar 20', candidates: 15 },
            ].map((interview, index) => (
              <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div>
                  <h3 className="font-medium">{interview.company}</h3>
                  <p className="text-sm text-gray-500">{interview.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-blue-600 font-medium">{interview.candidates} candidates</span>
                  <button
                    onClick={() => setModalContent(
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Interview Details</h3>
                        <p className="mb-2"><strong>Company:</strong> {interview.company}</p>
                        <p className="mb-2"><strong>Date:</strong> {interview.date}</p>
                        <p className="mb-2"><strong>Participants:</strong> {interview.candidates}</p>
                        <p className="mb-4"><strong>Location:</strong> Main Campus, Room 301</p>
                        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                          Confirm Attendance
                        </button>
                      </div>
                    )}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;