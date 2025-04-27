import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Upload, CheckCircle, ArrowLeft, AlertCircle, Trash2, Eye, User, Mail, Phone, FileText } from 'lucide-react';

function JobApplication() {
  const navigate = useNavigate();
  const location = useLocation();
  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null
  });

  useEffect(() => {
    const details = location.state?.jobDetails;
    if (details) {
      setJobDetails(details);
    } else {
      setError('Job details not found. Please try applying again.');
    }
  }, [location.state]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFormData(prev => ({
        ...prev,
        resume: acceptedFiles[0]
      }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    noClick: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDeleteFile = () => {
    setFormData(prev => ({
      ...prev,
      resume: null
    }));
  };

  const handlePreviewFile = () => {
    if (formData.resume) {
      const fileUrl = URL.createObjectURL(formData.resume);
      window.open(fileUrl, '_blank');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', { ...formData, jobId: jobDetails?.id });
    // Show success message or redirect
    navigate('/jobs');
  };

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/jobs')}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-semibold">Error</h2>
          </div>
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
          <button
            onClick={() => navigate('/jobs')}
            className="mt-6 w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:shadow-lg"
          >
            Return to Job Listings
          </button>
        </div>
      </div>
    );
  }

  if (!jobDetails) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/jobs')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-semibold">Job Application</h2>
        </div>

        <div className="mb-8 bg-blue-50 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-gray-800">{jobDetails.role}</h3>
          <p className="text-lg text-gray-600">{jobDetails.company}</p>
          <p className="text-sm text-gray-500 mt-2">Posted on {new Date(jobDetails.postedDate).toLocaleDateString()}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white placeholder-gray-400 text-gray-700"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white placeholder-gray-400 text-gray-700"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white focus:bg-white placeholder-gray-400 text-gray-700"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resume <span className="text-red-500">*</span>
              </label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300
                  ${isDragActive ? 'border-blue-500 bg-blue-50 shadow-lg' : 'border-gray-200 hover:border-blue-500 hover:bg-gray-50 hover:shadow-md'}
                  ${formData.resume ? 'cursor-default opacity-75' : 'cursor-pointer'}`}
              >
                <input {...getInputProps()} disabled={!!formData.resume} />
                {formData.resume ? (
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-gray-600">{formData.resume.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreviewFile();
                        }}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Preview file"
                      >
                        <Eye className="w-4 h-4 text-blue-500" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFile();
                        }}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete file"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      {isDragActive
                        ? 'Drop the file here'
                        : 'Drag and drop your resume here, or click to select'}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      PDF, DOC, or DOCX up to 5MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Letter <span className="text-red-500">*</span>
              </label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                className="block w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none bg-gray-50 hover:bg-white focus:bg-white placeholder-gray-400 text-gray-700"
                rows="6"
                placeholder="Write a brief cover letter explaining why you're interested in this position"
                required
              ></textarea>
            </div>
          </div>

          <div className="pt-6 border-t">
            <p className="text-sm text-gray-500 mb-6">
              Application Deadline: {new Date(jobDetails.deadline).toLocaleDateString()}
            </p>
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobApplication; 