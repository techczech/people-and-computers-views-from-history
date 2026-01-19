import React from 'react';
import { METHOD_PROMPTS, INTRO_TEXT } from '../constants';
import { Copy, Check, Info, Link as LinkIcon, AlertCircle } from 'lucide-react';

interface Props {
  onNavigate: (sectionId: string) => void;
}

const PromptBlock: React.FC<{ label: string; text: string }> = ({ label, text }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-6 last:mb-0">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
        <button 
          onClick={handleCopy}
          className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors font-medium"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy Prompt'}
        </button>
      </div>
      <div className="bg-slate-800 rounded-lg p-4 overflow-x-auto border border-slate-700 shadow-inner">
        <pre className="text-slate-200 font-mono text-sm whitespace-pre-wrap leading-relaxed">{text}</pre>
      </div>
    </div>
  );
};

const SectionBlock: React.FC<{ 
  id: string; 
  title: string; 
  prompts: { label: string; text: string }[]; 
  note?: string;
  onNavigate: () => void;
}> = ({ id, title, prompts, note, onNavigate }) => (
  <section id={`method-${id}`} className="scroll-mt-32 border-b border-slate-200 pb-12 last:border-0 last:pb-0">
    <div className="flex items-center gap-4 mb-6">
      <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
      <button 
        onClick={onNavigate}
        className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline bg-blue-50 px-3 py-1 rounded-full transition-colors"
      >
        <LinkIcon size={14} /> View Result
      </button>
    </div>
    
    {note && (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md mb-8 flex gap-3 text-slate-700 text-sm">
        <Info className="flex-shrink-0 text-yellow-500 mt-0.5" size={18} />
        <p>{note}</p>
      </div>
    )}

    <div className="space-y-4">
      {prompts.map((p, idx) => (
        <PromptBlock key={idx} label={p.label} text={p.text} />
      ))}
    </div>
  </section>
);

const Methods: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 max-w-4xl">
      {/* Introduction & Methodology */}
      <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
           <h3 className="text-2xl font-bold text-slate-900 mb-4">About this Project</h3>
           <p className="mb-6 text-lg">{INTRO_TEXT}</p>
           
           <h4 className="text-lg font-bold text-slate-900 mt-8 mb-4">Methodology</h4>
           <p>
              The content for this explorer was generated using <strong>Gemini 2.5 Pro</strong> via <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google AI Studio</a>. The specific prompts used to extract the timelines, quotes, themes, and summaries from the video transcripts are listed below.
           </p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl border border-slate-200 p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">Prompts Used</h3>
        
        <SectionBlock 
          id="timeline"
          title="Timeline Generation"
          prompts={METHOD_PROMPTS.timeline}
          note="Note: This selection is mostly opportunistic and does not mean to imply that it represents the actual evolution of attitudes. Most of these sentiments would have been found in parallel in all eras."
          onNavigate={() => onNavigate('timeline')}
        />

        <div className="mt-12"></div>

        <SectionBlock 
          id="videos"
          title="List of Videos Generation"
          prompts={METHOD_PROMPTS.videos}
          onNavigate={() => onNavigate('videos')}
        />

        <div className="mt-12"></div>

        <SectionBlock 
          id="quotes"
          title="Key Quotes Generation"
          prompts={METHOD_PROMPTS.quotes}
          onNavigate={() => onNavigate('quotes')}
        />

        <div className="mt-12"></div>

        <SectionBlock 
          id="themes"
          title="Key Themes Generation"
          prompts={METHOD_PROMPTS.themes}
          onNavigate={() => onNavigate('themes')}
        />

        <div className="mt-12"></div>

        <SectionBlock 
          id="summaries"
          title="Video Summaries Generation"
          prompts={METHOD_PROMPTS.summaries}
          note="Note: Because the link pasted into Google AI Studio is used to pull the video, the titles were generated based on the contents, not the actual title of the video. The links were not available to the model initially, so the prompt was rerun to correct the format."
          onNavigate={() => onNavigate('summaries')}
        />
      </div>

    </div>
  );
};

export default Methods;