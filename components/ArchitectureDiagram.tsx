
import React from 'react';
import { TransformerComponent } from '../types';

interface Props {
  activeStep: number;
  onComponentClick: (component: TransformerComponent) => void;
}

const ArchitectureDiagram: React.FC<Props> = ({ activeStep, onComponentClick }) => {
  const components = [
    { type: TransformerComponent.EMBEDDING, color: 'bg-indigo-500', step: 1 },
    { type: TransformerComponent.POSITIONAL_ENCODING, color: 'bg-purple-500', step: 2 },
    { type: TransformerComponent.ATTENTION, color: 'bg-blue-500', step: 3 },
    { type: TransformerComponent.NORMALIZATION, color: 'bg-emerald-500', step: 4 },
    { type: TransformerComponent.FEED_FORWARD, color: 'bg-cyan-500', step: 5 },
    { type: TransformerComponent.SOFTMAX, color: 'bg-orange-500', step: 6 },
  ];

  return (
    <div className="flex flex-col items-center gap-4 py-8 relative">
      <div className="absolute top-0 bottom-0 w-1 bg-slate-800 left-1/2 -translate-x-1/2 z-0"></div>
      
      {components.map((comp, i) => (
        <button
          key={comp.type}
          onClick={() => onComponentClick(comp.type)}
          className={`
            relative z-10 w-full max-w-[280px] p-4 rounded-xl border-2 transition-all duration-300
            ${activeStep >= comp.step 
              ? `${comp.color} border-white/20 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-105` 
              : 'bg-slate-900 border-slate-800 text-slate-500 grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
            }
          `}
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-widest">{comp.type}</span>
            <div className={`w-2 h-2 rounded-full ${activeStep >= comp.step ? 'bg-white' : 'bg-slate-700'}`}></div>
          </div>
        </button>
      ))}

      <div className="mt-8 text-center text-slate-500 text-xs italic">
        Click a block to inspect its role
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
