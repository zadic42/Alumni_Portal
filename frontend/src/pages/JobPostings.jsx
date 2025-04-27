import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Clock, Building2, Search, Filter, GraduationCap, DollarSign } from 'lucide-react';

function JobPostings({ setModalContent }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');

  const roles = ['all', 'Software Engineer', 'Data Analyst', 'DevOps Engineer', 'Product Manager', 'UI/UX Designer'];
  const experienceLevels = ['all', 'Entry Level', 'Mid Level', 'Senior Level', 'Lead'];

  const jobs = [
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      role: 'Software Engineer',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: '2-4 years',
      package: '12-15 LPA',
      description: 'We are looking for a skilled Software Engineer to join our team. The ideal candidate should have strong programming skills and experience with modern web technologies.',
      requirements: ['React', 'Node.js', 'MongoDB', 'AWS'],
      postedDate: '2024-03-15',
      deadline: '2024-04-15',
    },
    {
      id: 2,
      company: 'Data Analytics Pro',
      role: 'Data Analyst',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: '1-3 years',
      package: '8-10 LPA',
      description: 'Join our data team to analyze complex datasets and provide insights that drive business decisions.',
      requirements: ['Python', 'SQL', 'Tableau', 'Statistics'],
      postedDate: '2024-03-14',
      deadline: '2024-04-14',
    },
    {
      id: 3,
      company: 'Cloud Systems',
      role: 'DevOps Engineer',
      location: 'Mumbai, India',
      type: 'Full-time',
      experience: '3-5 years',
      package: '15-20 LPA',
      description: 'Looking for an experienced DevOps Engineer to help us build and maintain our cloud infrastructure.',
      requirements: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      postedDate: '2024-03-13',
      deadline: '2024-04-13',
    },
    {
      id: 4,
      company: 'Innovation Labs',
      role: 'Product Manager',
      location: 'Delhi, India',
      type: 'Full-time',
      experience: '4-6 years',
      package: '20-25 LPA',
      description: 'Seeking a Product Manager to drive product strategy and development for our innovative solutions.',
      requirements: ['Product Strategy', 'Agile', 'User Research', 'Analytics'],
      postedDate: '2024-03-12',
      deadline: '2024-04-12',
    },
    {
      id: 5,
      company: 'Design Studio',
      role: 'UI/UX Designer',
      location: 'Remote',
      type: 'Full-time',
      experience: '2-4 years',
      package: '10-15 LPA',
      description: 'Join our creative team to design beautiful and intuitive user interfaces for our products.',
      requirements: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      postedDate: '2024-03-11',
      deadline: '2024-04-11',
    },
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || job.role === selectedRole;
    const matchesExperience = selectedExperience === 'all' || 
                            (selectedExperience === 'Entry Level' && job.experience.includes('1-3')) ||
                            (selectedExperience === 'Mid Level' && job.experience.includes('2-4')) ||
                            (selectedExperience === 'Senior Level' && job.experience.includes('3-5')) ||
                            (selectedExperience === 'Lead' && job.experience.includes('4-6'));
    return matchesSearch && matchesRole && matchesExperience;
  });

  const handleApply = (job) => {
    const jobDetails = {
      id: job.id,
      company: job.company,
      role: job.role,
      location: job.location,
      type: job.type,
      experience: job.experience,
      package: job.package,
      description: job.description,
      requirements: job.requirements,
      postedDate: job.postedDate,
      deadline: job.deadline
    };
    navigate(`/apply/${job.id}`, { 
      state: { jobDetails },
      replace: true
    });
  };

  const handleViewDetails = (job) => {
    setModalContent(
      <div className="bg-white rounded-xl p-6 max-w-2xl mx-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{job.role}</h3>
            <p className="text-lg text-gray-600">{job.company}</p>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-blue-600 font-semibold">{job.package}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <GraduationCap className="w-5 h-5" />
            <span>{job.experience}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="w-5 h-5" />
            <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Job Description</h4>
            <p className="text-gray-600">{job.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Requirements</h4>
            <div className="flex flex-wrap gap-2">
              {job.requirements.map((req, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {req}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-4">
              Application Deadline: {new Date(job.deadline).toLocaleDateString()}
            </p>
            <button 
              onClick={() => handleApply(job)}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs by company, role, or location..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role === 'all' ? 'All Roles' : role}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
              >
                {experienceLevels.map(level => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'All Experience' : level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="border rounded-xl p-6 hover:border-blue-500 transition-all duration-200 hover:shadow-md">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-5 h-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-800">{job.company}</h3>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{job.role}</h4>
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.package}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button
                    onClick={() => handleViewDetails(job)}
                    className="flex-1 md:flex-none bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleApply(job)}
                    className="flex-1 md:flex-none bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobPostings; 