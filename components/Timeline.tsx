import React from 'react';
import { TimelineEvent } from '../types';
import { Circle, Quote, Calendar } from 'lucide-react';

interface Props {
  events: TimelineEvent[];
}

const Timeline: React.FC<Props> = ({ events }) => {
  return (
    <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 space-y-12 py-4">
      {events.map((event, index) => (
        <div key={index} className="relative pl-8 md:pl-12 group">
          {/* Dot on the line */}
          <div className="absolute -left-[9px] top-1 h-5 w-5 rounded-full border-4 border-white bg-blue-500 shadow-sm group-hover:bg-blue-600 transition-colors" />
          
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md inline-flex items-center gap-1">
              <Calendar size={14} />
              {event.year}
            </span>
            <h3 className="text-xl font-bold text-slate-800">{event.title}</h3>
          </div>
          
          <p className="text-slate-600 mb-4 text-lg leading-relaxed">{event.description}</p>
          
          <div className="relative bg-slate-50 p-4 rounded-lg border-l-4 border-blue-400">
             <Quote className="absolute top-4 left-2 text-blue-200 h-6 w-6 -z-0 opacity-50 transform -scale-x-100" />
             <p className="italic text-slate-700 relative z-10 pl-6 font-serif">
               "{event.quote}"
             </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
