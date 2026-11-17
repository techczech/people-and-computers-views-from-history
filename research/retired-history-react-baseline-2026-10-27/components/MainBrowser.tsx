import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Video, 
  Quote, 
  Layers, 
  FileText, 
  Info,
  Menu,
  X,
  Search,
  ArrowLeft,
  Code
} from 'lucide-react';
import Timeline from './Timeline';
import VideoList from './VideoList';
import Quotes from './Quotes';
import Themes from './Themes';
import Summaries from './Summaries';
import Methods from './Methods';
import { 
  TIMELINE_DATA, 
  VIDEO_LIST, 
  QUOTES_DATA, 
  THEMES_DATA, 
  SUMMARIES_DATA
} from '../constants';

const SECTIONS = [
  { id: 'methods', label: 'Introduction & Methods', icon: Info },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'videos', label: 'List of Videos', icon: Video },
  { id: 'quotes', label: 'Key Quotes', icon: Quote },
  { id: 'themes', label: 'Key Themes', icon: Layers },
  { id: 'summaries', label: 'Full Summaries', icon: FileText },
];

interface Props {
  initialSection?: string;
  onBack: () => void;
}

export default function MainBrowser({ initialSection = 'methods', onBack }: Props) {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to section on mount if initialSection provided
  useEffect(() => {
    if (initialSection) {
      scrollToSection(initialSection);
    }
  }, [initialSection]);

  // Scroll handling
  const scrollToSection = (id: string) => {
    // Check if it's a sub-section link (e.g., 'methods-timeline')
    let targetSectionId = id;
    let targetElementId = id;

    if (id.startsWith('methods-')) {
      targetSectionId = 'methods';
      targetElementId = id.replace('methods-', 'method-'); // Mapping to ID in Methods.tsx
    } else if (id.startsWith('method-')) {
       targetSectionId = 'methods';
       // Element ID is same as passed ID
    }

    setActiveSection(targetSectionId);
    setIsSidebarOpen(false);
    
    // Small timeout to ensure render if switching views
    setTimeout(() => {
      const element = document.getElementById(targetElementId);
      if (element) {
        // Calculate offset position
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const filteredTimeline = TIMELINE_DATA.filter(i => 
    i.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredVideos = VIDEO_LIST.filter(i => 
    i.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredQuotes = QUOTES_DATA.filter(i => 
    i.videoTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.quotes.some(q => q.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 text-slate-500 hover:bg-slate-100 rounded">
                <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-slate-900 truncate pr-4">People & Computers</h1>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:sticky md:top-0 md:h-screen overflow-y-auto border-r border-slate-800
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <h1 className="text-xl font-bold text-white mb-2 leading-tight">People & Computers: <span className="text-blue-400 block font-normal text-lg">Views from History</span></h1>
          <p className="text-xs text-slate-500 mt-2">Research by Dominik Lukeš</p>
        </div>

        <div className="px-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Filter content..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 text-sm text-white rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-slate-500"
            />
          </div>
        </div>

        <nav className="px-3 space-y-1 pb-20">
          {SECTIONS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors
                ${activeSection === item.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'hover:bg-slate-800 hover:text-white'
                }
              `}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        
        <div className="max-w-5xl mx-auto px-4 md:px-12 py-12 space-y-24">
          
          {/* Methods Section (Now First) */}
          <section id="methods" className="scroll-mt-24">
            <div className="mb-8 border-b border-slate-200 pb-4">
              <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Info className="text-blue-500" /> Introduction & Methodology
              </h2>
            </div>
            <Methods onNavigate={scrollToSection} />
          </section>

          {/* Timeline Section */}
          <section id="timeline" className="scroll-mt-24">
            <div className="mb-8 border-b border-slate-200 pb-4 flex justify-between items-end">
              <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Clock className="text-blue-500" /> Timeline
              </h2>
              <button 
                onClick={() => scrollToSection('methods-timeline')} 
                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              >
                <Code size={14} /> View Prompt
              </button>
            </div>
            {filteredTimeline.length > 0 ? (
              <Timeline events={filteredTimeline} />
            ) : (
              <p className="text-slate-500 italic">No timeline events match your search.</p>
            )}
          </section>

          {/* Video List Section */}
          <section id="videos" className="scroll-mt-24">
            <div className="mb-8 border-b border-slate-200 pb-4 flex justify-between items-end">
              <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Video className="text-blue-500" /> List of Videos
              </h2>
              <button 
                onClick={() => scrollToSection('methods-videos')} 
                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              >
                <Code size={14} /> View Prompt
              </button>
            </div>
            {filteredVideos.length > 0 ? (
              <VideoList videos={filteredVideos} />
            ) : (
               <p className="text-slate-500 italic">No videos match your search.</p>
            )}
          </section>

          {/* Key Quotes Section */}
          <section id="quotes" className="scroll-mt-24">
            <div className="mb-8 border-b border-slate-200 pb-4 flex justify-between items-end">
              <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Quote className="text-blue-500" /> Key Quotes
              </h2>
              <button 
                onClick={() => scrollToSection('methods-quotes')} 
                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              >
                <Code size={14} /> View Prompt
              </button>
            </div>
            {filteredQuotes.length > 0 ? (
              <Quotes quotesData={filteredQuotes} />
            ) : (
              <p className="text-slate-500 italic">No quotes match your search.</p>
            )}
          </section>

          {/* Key Themes Section */}
          <section id="themes" className="scroll-mt-24">
            <div className="mb-8 border-b border-slate-200 pb-4 flex justify-between items-end">
              <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <Layers className="text-blue-500" /> Key Themes
              </h2>
              <button 
                onClick={() => scrollToSection('methods-themes')} 
                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              >
                <Code size={14} /> View Prompt
              </button>
            </div>
            <Themes themes={THEMES_DATA} />
          </section>

          {/* Full Summaries Section */}
          <section id="summaries" className="scroll-mt-24 pb-24">
            <div className="mb-8 border-b border-slate-200 pb-4">
              <div className="flex justify-between items-end mb-2">
                 <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                  <FileText className="text-blue-500" /> Full Video Summaries
                </h2>
                <button 
                  onClick={() => scrollToSection('methods-summaries')} 
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                  <Code size={14} /> View Prompt
                </button>
              </div>
              <p className="text-slate-500 mt-2">Detailed breakdowns of processes, jobs, and computer usage for each film.</p>
            </div>
            <Summaries summaries={searchQuery ? SUMMARIES_DATA.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase())) : SUMMARIES_DATA} />
          </section>

        </div>
        
        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12 px-4 text-center">
          <p className="mb-2">Ad hoc research project conducted with Large Language Models in Google AI Studio by Dominik Lukeš on 3 August 2025.</p>
          <p className="text-sm">Interface generated by AI.</p>
        </footer>
      </main>
    </div>
  );
}