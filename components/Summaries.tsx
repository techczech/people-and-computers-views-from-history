import React, { useState } from 'react';
import { SummaryItem } from '../types';
import { ChevronDown, ChevronUp, Link as LinkIcon, FileText } from 'lucide-react';

interface Props {
  summaries: SummaryItem[];
}

const SummaryCard: React.FC<{ summary: SummaryItem; startExpanded?: boolean }> = ({ summary, startExpanded = false }) => {
  const [expanded, setExpanded] = useState(startExpanded);

  return (
    <article className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8 transition-all duration-300">
      <header 
        className="p-6 cursor-pointer hover:bg-slate-50 flex items-start justify-between gap-4 select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
           <h3 className="text-2xl font-bold text-slate-900 mb-2">{summary.title}</h3>
           <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
             <span>{summary.metadata.date}</span>
             <span className="text-slate-300">|</span>
             <span>{summary.metadata.commissioningAgency}</span>
           </div>
        </div>
        <button className="text-slate-400 p-1 rounded-full hover:bg-slate-200 transition-colors">
          {expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </header>

      {expanded && (
        <div className="p-6 pt-0 border-t border-slate-100">
          {/* Metadata Block */}
          <div className="bg-slate-50 rounded-lg p-4 my-6 text-sm space-y-2 text-slate-600">
            <div className="flex gap-2">
               <span className="font-semibold w-24 flex-shrink-0">Original Title:</span>
               <span>{summary.metadata.originalTitle}</span>
            </div>
            <div className="flex gap-2">
               <span className="font-semibold w-24 flex-shrink-0">Authors:</span>
               <span>{summary.metadata.authors}</span>
            </div>
            <div className="flex gap-2 items-center">
               <span className="font-semibold w-24 flex-shrink-0">Link:</span>
               <a href={summary.metadata.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                 View Source <LinkIcon size={12} />
               </a>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {summary.sections.map((section, idx) => (
              <section key={idx}>
                <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <FileText size={18} className="text-blue-400" />
                  {section.title}
                </h4>
                <div 
                  className="prose prose-slate max-w-none prose-ul:list-disc prose-ol:list-decimal prose-li:my-1 text-slate-700"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </section>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

const Summaries: React.FC<Props> = ({ summaries }) => {
  return (
    <div>
      {summaries.map((summary) => (
        <SummaryCard key={summary.id} summary={summary} />
      ))}
    </div>
  );
};

export default Summaries;
