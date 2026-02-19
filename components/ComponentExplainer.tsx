
import React, { useMemo } from 'react';
import { TransformerComponent } from '../types';
import { COMPONENT_KNOWLEDGE_BASE } from '../constants/explanations';

interface Props {
  activeComponent: TransformerComponent;
}

const ComponentExplainer: React.FC<Props> = ({ activeComponent }) => {
  const data = useMemo(() => COMPONENT_KNOWLEDGE_BASE[activeComponent], [activeComponent]);

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl h-full flex flex-col gap-6 shadow-inner transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
        <h2 className="text-lg font-bold text-white uppercase tracking-wider">{activeComponent}</h2>
      </div>

      <div key={activeComponent} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 ease-out">
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
            <span className="w-4 h-[1px] bg-slate-700"></span>
            Summary
          </h3>
          <p className="text-slate-300 leading-relaxed text-sm antialiased">{data.summary}</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
            <span className="w-4 h-[1px] bg-slate-700"></span>
            Key Concepts
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.keyConcepts.map((concept, i) => (
              <span key={i} className="bg-blue-900/20 text-blue-300 px-2 py-1 rounded text-[10px] font-semibold border border-blue-800/30 hover:border-blue-500/50 transition-colors">
                {concept}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
            <span className="w-4 h-[1px] bg-slate-700"></span>
            Conceptual Math
          </h3>
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-700/50 shadow-inner group">
            <p className="text-xs font-mono text-blue-200/90 leading-relaxed italic group-hover:text-blue-100 transition-colors">
              {data.mathSimplified}
            </p>
          </div>
        </div>
        
        <div className="pt-4 border-t border-slate-700/30">
          <p className="text-[10px] text-slate-500 leading-tight">
            * This component is a critical part of the modern LLM architecture, enabling parallel processing of sequence data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComponentExplainer;
