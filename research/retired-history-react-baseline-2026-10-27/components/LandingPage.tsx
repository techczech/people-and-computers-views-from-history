import React from 'react';
import { 
  Clock, 
  Video, 
  Quote, 
  Layers, 
  FileText, 
  ArrowRight,
  Code
} from 'lucide-react';

interface Props {
  onStart: () => void;
  onNavigate: (sectionId: string) => void;
}

const FeatureCard: React.FC<{ 
  icon: React.ElementType; 
  title: string; 
  description: string; 
  onClick: () => void;
}> = ({ icon: Icon, title, description, onClick }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-start p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all text-left w-full group"
  >
    <div className="bg-blue-50 p-3 rounded-lg text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    <div className="mt-4 text-blue-600 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      View Section <ArrowRight size={14} />
    </div>
  </button>
);

const LandingPage: React.FC<Props> = ({ onStart, onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              People & Computers: <span className="text-blue-600 block mt-2">Views from History</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Ad hoc research project conducted with Large Language Models in Google AI Studio by Dominik Lukeš to illustrate the multimodal and textual capabilities of current frontier LLMs. 
              Explore how our view of the future of humanity and computing has evolved through historical archives.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onStart}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center gap-2"
              >
                Explore the results and methods <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="flex-1 max-w-5xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What you'll find in this archive</h2>
          <p className="text-slate-600 max-w-2xl">
            This interactive site organizes the raw research data into browsable sections. 
            Click any card below to jump directly to that section.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Clock}
            title="Interactive Timeline"
            description="Trace the evolution of computing sentiments from 1946 to 1983 through key historical events and films."
            onClick={() => onNavigate('timeline')}
          />
          <FeatureCard 
            icon={Video}
            title="Video Archives"
            description="Curated list of 9 historical videos with descriptions and direct links to watch them on YouTube."
            onClick={() => onNavigate('videos')}
          />
          <FeatureCard 
            icon={Quote}
            title="Key Quotes"
            description="Significant quotes extracted from the transcripts that exemplify attitudes towards human replacement."
            onClick={() => onNavigate('quotes')}
          />
          <FeatureCard 
            icon={Layers}
            title="Emerging Themes"
            description="Analysis of recurring sentiments: Efficiency, Human Irreplaceability, and Augmentation."
            onClick={() => onNavigate('themes')}
          />
          <FeatureCard 
            icon={FileText}
            title="Detailed Summaries"
            description="In-depth breakdowns of processes, jobs, and computer usage depicted in each historical film."
            onClick={() => onNavigate('summaries')}
          />
          {/* Methods card removed to avoid duplication as it is the default starting view now */}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <p className="font-semibold text-slate-200">Research by <a href="https://dominiklukes.net" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">Dominik Lukeš</a></p>
            <p className="text-sm mt-1">Generated by Gemini 2.5 Pro via Google AI Studio.</p>
          </div>
          <div className="text-sm text-slate-500">
            <p>Built using Google AI Studio Build function on 27 Nov 2025.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;