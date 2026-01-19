import React from 'react';
import { QuoteItem } from '../types';
import { Quote } from 'lucide-react';

interface Props {
  quotesData: QuoteItem[];
}

const Quotes: React.FC<Props> = ({ quotesData }) => {
  return (
    <div className="space-y-12">
      {quotesData.map((item, idx) => (
        <div key={idx} className="border-b border-slate-200 pb-8 last:border-0">
          <div className="flex items-baseline gap-3 mb-4">
             <h3 className="text-xl font-bold text-slate-800">{item.videoTitle}</h3>
             <span className="text-sm text-slate-500 font-medium">({item.year})</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {item.quotes.map((q, qIdx) => (
              <div key={qIdx} className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm relative group">
                <Quote className="absolute top-4 left-4 text-blue-100 h-8 w-8 -z-0" />
                <blockquote className="relative z-10 mb-3 text-slate-700 font-serif leading-relaxed italic">
                  "{q.text}"
                </blockquote>
                <div className="text-right">
                  <a 
                    href={q.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                  >
                    [{q.timecode}]
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Quotes;
