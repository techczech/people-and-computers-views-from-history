import React from 'react';
import { VideoItem } from '../types';
import { ExternalLink, PlayCircle } from 'lucide-react';

interface Props {
  videos: VideoItem[];
}

const VideoList: React.FC<Props> = ({ videos }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {videos.map((video) => (
        <div key={video.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{video.year}</span>
            <a 
              href={video.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 transition-colors"
              title="Watch on YouTube"
            >
              <ExternalLink size={18} />
            </a>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight">{video.title}</h3>
          <p className="text-slate-600 text-sm flex-grow leading-relaxed mb-4">{video.description}</p>
          <a 
            href={video.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 self-start mt-auto"
          >
            <PlayCircle size={16} />
            Watch Video
          </a>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
