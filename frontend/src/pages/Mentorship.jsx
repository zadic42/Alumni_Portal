import React, { useState } from 'react';
import { Star, MessageSquare, Calendar, Award, Upload, FileText, X, Trash2 } from 'lucide-react';

function ResumeUpload({ onCancel }) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (isValidFileType(droppedFile)) {
        setFile(droppedFile);
      } else {
        alert('Please upload a valid file format (PDF, DOC, or DOCX)');
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (isValidFileType(selectedFile)) {
        setFile(selectedFile);
      } else {
        alert('Please upload a valid file format (PDF, DOC, or DOCX)');
      }
    }
  };

  const isValidFileType = (file) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    return validTypes.includes(file.type);
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'application/pdf':
        return '📄';
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return '📝';
      default:
        return '📁';
    }
  };

  const handleFilePreview = () => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const fileType = file.type;
      
      if (fileType === 'application/pdf') {
        // For PDF files, open in new tab
        window.open(fileUrl, '_blank');
      } else if (fileType === 'application/msword' || 
                 fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // For Word documents, download the file
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const handleFileUpload = () => {
    // Handle file upload logic here
    console.log("File to upload:", file);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume</label>
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ease-in-out ${
            dragActive && !file
              ? 'border-blue-500 bg-blue-50 scale-[1.02] shadow-lg' 
              : file
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!file && (
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
            />
          )}
          {!file ? (
            <div className="flex flex-col items-center justify-center text-center">
              <div className={`p-4 rounded-full bg-blue-50 mb-4 transition-colors duration-300 ${
                dragActive ? 'bg-blue-100' : ''
              }`}>
                <Upload className={`w-8 h-8 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`} />
              </div>
              <p className="text-base font-medium text-gray-700 mb-2">
                Drag and drop your resume here
              </p>
              <p className="text-sm text-gray-500 mb-4">
                or <span className="text-blue-500 font-medium">click to browse</span>
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <FileText className="w-4 h-4" />
                <span>Supported formats: PDF, DOC, DOCX</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <span className="text-xl">{getFileIcon(file.type)}</span>
                    </div>
                    <div className="cursor-pointer" onClick={handleFilePreview}>
                      <p className="text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveFile}
                    className="p-2 hover:bg-red-50 rounded-full transition-colors group"
                  >
                    <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                File selected successfully
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
        <textarea 
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out hover:border-gray-400 resize-none" 
          rows="3"
          placeholder="Add any additional information..."
        ></textarea>
      </div>
      <div>
        <button 
          onClick={handleFileUpload}
          className={`w-full px-4 py-3 rounded-lg transition-all duration-300 ${
            file 
              ? 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg hover:scale-[1.02]' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!file}
        >
          Submit for Review
        </button>
      </div>
    </div>
  );
}

function Mentorship({ setModalContent }) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);

  const mentors = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Software Engineer',
      company: 'Google',
      experience: '8 years',
      expertise: ['Web Development', 'System Design', 'Cloud Architecture'],
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'Microsoft',
      experience: '6 years',
      expertise: ['Product Strategy', 'Agile', 'User Research'],
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Data Scientist',
      company: 'Amazon',
      experience: '5 years',
      expertise: ['Machine Learning', 'Data Analytics', 'Python'],
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    },
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    // Handle file upload logic here
    console.log("File to upload:", file);
  };

  const handleMessage = (mentor) => {
    setModalContent(
      <div>
        <h3 className="text-xl font-semibold mb-4">Message {mentor.name}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input 
              type="text" 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out hover:border-gray-400" 
              placeholder="Enter subject"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out hover:border-gray-400 resize-none" 
              rows="4"
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Send Message
          </button>
        </div>
      </div>
    );
  };

  const handleSchedule = (mentor) => {
    setModalContent(
      <div>
        <h3 className="text-xl font-semibold mb-4">Schedule Session with {mentor.name}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input 
              type="date" 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out hover:border-gray-400" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input 
              type="time" 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out hover:border-gray-400" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
            <select 
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out hover:border-gray-400 appearance-none cursor-pointer"
            >
              <option>One-on-one Mentoring</option>
              <option>Mock Interview</option>
              <option>Resume Review</option>
            </select>
          </div>
          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Schedule Session
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Available Mentors</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor, index) => (
            <div key={index} className="border rounded-lg p-6 hover:border-blue-500 transition-colors">
              <div className="flex items-start gap-4">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{mentor.name}</h3>
                  <p className="text-sm text-gray-500">{mentor.role}</p>
                  <p className="text-sm text-gray-500">{mentor.company}</p>
                  <div className="flex items-center mt-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{mentor.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleMessage(mentor)}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Message
                </button>
                <button
                  onClick={() => handleSchedule(mentor)}
                  className="flex-1 border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Mentorship Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 hover:border-blue-500 transition-colors">
            <Award className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="font-semibold mb-2">Career Guidance</h3>
            <p className="text-sm text-gray-600 mb-4">One-on-one sessions with industry experts for career planning and guidance</p>
            <button
              onClick={() => setModalContent(
                <div>
                  <h3 className="text-xl font-semibold mb-4">Join Career Guidance Program</h3>
                  <p className="text-gray-600 mb-4">Get personalized career advice from industry experts</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Career Goals</label>
                      <textarea 
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out hover:border-gray-400 resize-none shadow-sm" 
                        rows="3"
                        placeholder="Share your career aspirations and goals..."
                      ></textarea>
                    </div>
                    <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                      Join Program
                    </button>
                  </div>
                </div>
              )}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Join Program
            </button>
          </div>
          
          <div className="border rounded-lg p-6 hover:border-blue-500 transition-colors">
            <MessageSquare className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="font-semibold mb-2">Mock Interviews</h3>
            <p className="text-sm text-gray-600 mb-4">Practice interviews with experienced professionals from top companies</p>
            <button
              onClick={() => setModalContent(
                <div>
                  <h3 className="text-xl font-semibold mb-4">Schedule Mock Interview</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
                      <select 
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out hover:border-gray-400 appearance-none cursor-pointer"
                      >
                        <option>Technical Interview</option>
                        <option>HR Interview</option>
                        <option>System Design</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                      <input 
                        type="date" 
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out hover:border-gray-400" 
                      />
                    </div>
                    <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                      Schedule Interview
                    </button>
                  </div>
                </div>
              )}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Schedule Session
            </button>
          </div>
          
          <div className="border rounded-lg p-6 hover:border-blue-500 transition-colors">
            <Calendar className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="font-semibold mb-2">Resume Review</h3>
            <p className="text-sm text-gray-600 mb-4">Get your resume reviewed and improved by industry professionals</p>
            <button
              onClick={() => setModalContent(
                <div>
                  <h3 className="text-xl font-semibold mb-4">Submit Resume for Review</h3>
                  <ResumeUpload onCancel={() => setModalContent(null)} />
                </div>
              )}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Submit Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mentorship;