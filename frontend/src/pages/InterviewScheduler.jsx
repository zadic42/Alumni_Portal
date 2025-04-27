import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Building, Users, List, Calendar as CalendarView, Plus, Trash2 } from 'lucide-react';
import InterviewCalendar from '../components/InterviewCalendar';

function InterviewScheduler({ setModalContent }) {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [upcomingInterviews, setUpcomingInterviews] = useState([
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      date: '2024-03-15',
      time: '10:00',
      location: 'Main Campus',
    },
    {
      id: 2,
      company: 'Data Analytics Pro',
      date: '2024-03-18',
      time: '14:00',
      location: 'Virtual',
    },
    {
      id: 3,
      company: 'Cloud Systems',
      date: '2024-03-20',
      time: '11:00',
      location: 'Innovation Center',
    },
  ]);

  const calendarEvents = upcomingInterviews.map(interview => ({
    id: interview.id,
    title: interview.company,
    start: `${interview.date}T${interview.time}`,
    end: `${interview.date}T${interview.time}`,
    extendedProps: interview
  }));

  const handleDeleteInterview = (interviewId) => {
    setUpcomingInterviews(upcomingInterviews.filter(interview => interview.id !== interviewId));
    setModalContent(null);
  };

  const handleViewDetails = (interview) => {
    setModalContent(
      <div>
        <h3 className="text-xl font-semibold mb-4">Interview Details</h3>
        <p className="mb-2"><strong>Company:</strong> {interview.company}</p>
        <p className="mb-2"><strong>Date:</strong> {new Date(interview.date).toLocaleDateString()}</p>
        <p className="mb-2"><strong>Time:</strong> {interview.time}</p>
        <p className="mb-4"><strong>Location:</strong> {interview.location}</p>
        <div className="flex gap-2">
          <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Confirm Attendance
          </button>
          <button 
            onClick={() => handleDeleteInterview(interview.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    );
  };

  const handleEventClick = (info) => {
    handleViewDetails(info.event.extendedProps);
  };

  const handleDateClick = (info) => {
    const selectedDate = info.dateStr; // Format: YYYY-MM-DD
    handleAddEvent(selectedDate);
  };

  const handleAddEvent = (selectedDate = null) => {
    setModalContent(
      <div className="bg-white rounded-xl p-6 max-w-md mx-auto relative">
        <button
          onClick={() => setModalContent(null)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Schedule New Interview</h3>
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          const form = e.target;
          const formData = new FormData(form);
          const newInterview = {
            id: upcomingInterviews.length + 1,
            company: formData.get('company'),
            date: formData.get('date'),
            time: formData.get('time'),
            location: formData.get('location'),
          };
          setUpcomingInterviews([...upcomingInterviews, newInterview]);
          setModalContent(null);
        }}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              name="company"
              type="text"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white shadow-sm 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none 
                transition-all duration-200 ease-in-out
                placeholder:text-gray-400
                hover:border-gray-300"
              placeholder="Enter company name"
              required
              minLength="2"
              maxLength="100"
            />
            <p className="mt-2 text-sm text-gray-500">Enter the company name (2-100 characters)</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              name="date"
              type="date"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white shadow-sm 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none 
                transition-all duration-200 ease-in-out
                hover:border-gray-300"
              required
              defaultValue={selectedDate}
              min={new Date().toISOString().split('T')[0]}
            />
            <p className="mt-2 text-sm text-gray-500">Select the interview date</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time <span className="text-red-500">*</span>
            </label>
            <input
              name="time"
              type="time"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white shadow-sm 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none 
                transition-all duration-200 ease-in-out
                hover:border-gray-300"
              required
              min="08:00"
              max="20:00"
            />
            <p className="mt-2 text-sm text-gray-500">Select time between 8:00 AM and 8:00 PM</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              name="location"
              type="text"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white shadow-sm 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none 
                transition-all duration-200 ease-in-out
                placeholder:text-gray-400
                hover:border-gray-300"
              placeholder="Enter location"
              required
              minLength="2"
              maxLength="100"
            />
            <p className="mt-2 text-sm text-gray-500">Enter the interview location (2-100 characters)</p>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Schedule Interview
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Interview Schedule</h2>
          <div className="flex gap-2">
            <button
              onClick={() => handleAddEvent()}
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors relative group"
              title="Add Interview"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'calendar' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <CalendarView className="w-5 h-5" />
            </button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="grid gap-6">
            {upcomingInterviews.map((interview) => (
              <div key={interview.id} className="border rounded-lg p-6 hover:border-blue-500 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{interview.company}</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-gray-600">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        <span>{new Date(interview.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{interview.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Building className="w-4 h-4 mr-2" />
                        <span>{interview.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(interview)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleDeleteInterview(interview.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <InterviewCalendar 
            events={calendarEvents} 
            onEventClick={handleEventClick}
            onDateClick={handleDateClick}
          />
        )}
      </div>
    </div>
  );
}

export default InterviewScheduler;