import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Calendar, Pencil, Check, X } from 'lucide-react';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'User',
    title: 'Software Engineer at Tech Corp',
    email: 'User@User.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    position: 'Software Engineer',
    degree: 'Computer Science',
    graduationYear: '2020',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker']
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset the form to original data
    setProfileData({
      name: 'User',
      title: 'Software Engineer at Tech Corp',
      email: 'User@User.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      position: 'Software Engineer',
      degree: 'Computer Science',
      graduationYear: '2020',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker']
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mt-3 relative">
        {/* Edit Button */}
        <div className="absolute top-6 right-6">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="w-10 h-10 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition-all duration-300 flex items-center justify-center hover:shadow-lg hover:scale-110"
              title="Save Changes"
            >
              <Check className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-10 h-10 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 flex items-center justify-center hover:shadow-lg hover:scale-110"
              title="Edit Profile"
            >
              <Pencil className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-200"
            />
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></span>
          </div>
          <div>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-2xl font-bold text-gray-800 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={profileData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="text-gray-600 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-800">{profileData.name}</h1>
                <p className="text-gray-600">{profileData.title}</p>
              </>
            )}
          </div>
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="text-gray-700 border-b border-gray-300 focus:border-blue-500 focus:outline-none w-full"
                  />
                ) : (
                  <span className="text-gray-700">{profileData.email}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-500" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="text-gray-700 border-b border-gray-300 focus:border-blue-500 focus:outline-none w-full"
                  />
                ) : (
                  <span className="text-gray-700">{profileData.phone}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="text-gray-700 border-b border-gray-300 focus:border-blue-500 focus:outline-none w-full"
                  />
                ) : (
                  <span className="text-gray-700">{profileData.location}</span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Professional Information</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-gray-500" />
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    className="text-gray-700 border-b border-gray-300 focus:border-blue-500 focus:outline-none w-full"
                  />
                ) : (
                  <span className="text-gray-700">{profileData.position}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-gray-500" />
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.degree}
                    onChange={(e) => handleInputChange('degree', e.target.value)}
                    className="text-gray-700 border-b border-gray-300 focus:border-blue-500 focus:outline-none w-full"
                  />
                ) : (
                  <span className="text-gray-700">{profileData.degree}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.graduationYear}
                    onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                    className="text-gray-700 border-b border-gray-300 focus:border-blue-500 focus:outline-none w-full"
                  />
                ) : (
                  <span className="text-gray-700">Graduated: {profileData.graduationYear}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {skill}
                {isEditing && (
                  <button
                    onClick={() => {
                      setProfileData(prev => ({
                        ...prev,
                        skills: prev.skills.filter((_, i) => i !== index)
                      }));
                    }}
                    className="ml-1 text-blue-800 hover:text-red-600"
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
            {isEditing && (
              <button
                onClick={() => {
                  const newSkill = prompt('Enter new skill:');
                  if (newSkill) {
                    setProfileData(prev => ({
                      ...prev,
                      skills: [...prev.skills, newSkill]
                    }));
                  }
                }}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200"
              >
                + Add Skill
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 