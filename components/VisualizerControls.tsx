
import React, { useState } from 'react';

interface Props {
  onInputSubmit: (text: string) => void;
  currentStep: number;
  totalSteps: number;
  onStepChange: (step: number) => void;
}

const VisualizerControls: React.FC<Props> = ({ onInputSubmit, currentStep, totalSteps, onStepChange }) => {
  const [inputText, setInputText] = useState("Transformer models are revolutionary.");

  return (
    <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-2xl flex flex-col gap-6 shadow-xl">
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Model Input</label>
        <div className="flex gap-2">
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            placeholder="Type a sentence..."
          />
          <button 
            onClick={() => onInputSubmit(inputText)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-lg active:scale-95"
          >
            Tokenize
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Step Through Layers</label>
          <span className="text-xs font-mono text-blue-400">Layer {currentStep + 1} / {totalSteps}</span>
        </div>
        <input 
          type="range"
          min="0"
          max={totalSteps - 1}
          value={currentStep}
          onChange={(e) => onStepChange(parseInt(e.target.value))}
          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-medium">
          <span>INPUT</span>
          <span>EMBEDDING</span>
          <span>ATTENTION</span>
          <span>OUTPUT</span>
        </div>
      </div>
    </div>
  );
};

export default VisualizerControls;
