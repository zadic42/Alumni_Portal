import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

function InterviewCalendar({ events, onEventClick, onDateClick }) {
  return (
    <div className="h-[600px] bg-white rounded-xl shadow-sm p-4 md:p-6">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        eventClick={onEventClick}
        dateClick={onDateClick}
        height="100%"
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }}
        eventClassNames="bg-blue-500 hover:bg-blue-600 border-none rounded-lg shadow-sm cursor-pointer transition-all duration-200"
        buttonClassNames="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
        buttonText={{
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day'
        }}
        dayCellClassNames="text-gray-700 hover:bg-blue-50 transition-colors duration-200"
        headerToolbarClassNames="mb-4 flex flex-wrap gap-2 items-center justify-between"
        titleFormat={{ year: 'numeric', month: 'long' }}
        titleClassNames="text-xl font-semibold text-gray-800"
        dayHeaderClassNames="text-sm font-medium text-gray-600 uppercase"
        todayClassNames="bg-blue-50"
        moreLinkClassNames="text-blue-500 hover:text-blue-600"
        moreLinkText="+{count} more"
        noEventsClassNames="text-gray-500 text-center py-4"
        noEventsText="No interviews scheduled"
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        allDaySlot={false}
        slotDuration="01:00:00"
        expandRows={true}
        stickyHeaderDates={true}
        handleWindowResize={true}
        windowResizeDelay={100}
        responsive={true}
      />
    </div>
  );
}

export default InterviewCalendar;