import { Download } from 'lucide-react';
import React from 'react';
import pdfIcon from '@/assets/images/pdf-icon.png'; // Adjust the path as necessary

interface EventItem {
  title: string;
  date: string;
  pdfUrl?: string;
}

interface EventsCardProps {
  events: EventItem[];
}

const EventsCard: React.FC<EventsCardProps> = ({ events }) => {
  return (
    <div className="w-full rounded-xl border bg-white p-5 py-2 shadow-sm">
      <div className="mb-3 flex h-7 items-center justify-between">
        <h3 className="text-xl mt-2 font-semibold text-zinc-800">Events</h3>
        <a
          href="/pages/events"
          className="text-sm font-medium text-yellow-600 hover:underline"
        >
          View all
        </a>
      </div>

    {/* Scrollable Event List */}
      <div className="space-y-3 max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {events.map((event, idx) => (
          <div
            key={idx}
            className="flex gap-3 rounded-md bg-gray-50 p-3 hover:bg-gray-100"
          >
            <img
              src={pdfIcon} // Replace with actual PDF icon path
              alt="PDF"
              className="h-[40px] w-[32px] object-contain"
            />
            <div className="flex flex-col">
                <span className="text-xs text-gray-500">{event.status}</span>
                <p className="text-base font-medium text-gray-800 leading-snug">
                <a href={`/${event.image}`} target="_blank" rel="noopener noreferrer">
                {event.name}
                </a>
                </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsCard;
