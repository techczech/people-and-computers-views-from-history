import React from 'react';
import { ThemeItem } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  themes: ThemeItem[];
}

const Themes: React.FC<Props> = ({ themes }) => {
  return (
    <div className="space-y-16">
      {themes.map((theme, idx) => (
        <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">{theme.title}</h3>
          <p className="text-slate-600 mb-8 text-lg leading-relaxed border-l-4 border-blue-500 pl-4">{theme.description}</p>
          
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Examples from History</h4>
            {theme.examples.map((ex, exIdx) => (
              <div key={exIdx} className="flex gap-4 group">
                <div className="mt-1 flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-blue-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">{ex.context}</p>
                  <blockquote className="text-slate-600 italic mb-1">"{ex.quote}"</blockquote>
                  <p className="text-sm text-slate-400">— {ex.source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Themes;
