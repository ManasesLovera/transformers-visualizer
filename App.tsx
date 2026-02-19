
import React, { useState, useEffect } from 'react';
import { TransformerComponent, TokenData } from './types';
import VisualizerControls from './components/VisualizerControls';
import AttentionHeatmap from './components/AttentionHeatmap';
import ComponentExplainer from './components/ComponentExplainer';
import ArchitectureDiagram from './components/ArchitectureDiagram';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputText, setInputText] = useState("Explain the world with attention.");
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<TransformerComponent>(TransformerComponent.EMBEDDING);

  // Generate mock data based on input text
  const processInput = (text: string) => {
    const rawTokens = text.split(/\s+/).filter(t => t.length > 0);
    const mockTokens: TokenData[] = rawTokens.map((word, idx) => ({
      id: idx,
      text: word,
      vector: Array.from({ length: 8 }, () => Math.random()),
      // Mock attention weights: current token focuses slightly more on itself and nearby
      attentionWeights: rawTokens.map((_, j) => {
        const dist = Math.abs(idx - j);
        return Math.max(0.1, 1 / (dist + 1)) * Math.random();
      })
    }));

    // Normalize attention weights
    mockTokens.forEach(t => {
      const sum = t.attentionWeights.reduce((a, b) => a + b, 0);
      t.attentionWeights = t.attentionWeights.map(w => w / sum);
    });

    setTokens(mockTokens);
    setInputText(text);
    setCurrentStep(0);
  };

  useEffect(() => {
    processInput(inputText);
  }, []);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    // Automatically select the component associated with the step for learning
    const mapping = [
      TransformerComponent.EMBEDDING,
      TransformerComponent.EMBEDDING, // Layer 1-2
      TransformerComponent.ATTENTION, // Layer 3
      TransformerComponent.NORMALIZATION, // Layer 4
      TransformerComponent.FEED_FORWARD, // Layer 5
      TransformerComponent.SOFTMAX // Layer 6
    ];
    setSelectedComponent(mapping[step] || TransformerComponent.EMBEDDING);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-900/20">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight">Transformer <span className="text-blue-500">Insight</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono bg-slate-800 px-3 py-1 rounded-full text-slate-400 border border-slate-700">gemini-3-flash-preview active</span>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 overflow-hidden">
        {/* Left Column: Input & Architecture Diagram */}
        <div className="lg:col-span-3 flex flex-col gap-6 overflow-y-auto pr-2">
          <VisualizerControls 
            onInputSubmit={processInput}
            currentStep={currentStep}
            totalSteps={7}
            onStepChange={handleStepChange}
          />
          <ArchitectureDiagram 
            activeStep={currentStep} 
            onComponentClick={(comp) => setSelectedComponent(comp)}
          />
        </div>

        {/* Center Column: Visualizations */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex-1 flex flex-col shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Representation</h2>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
            </div>

            {currentStep === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center gap-8 animate-in zoom-in duration-500">
                <h3 className="text-xl font-medium text-slate-300">Raw Tokens</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {tokens.map((token, i) => (
                    <div key={i} className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg font-mono text-blue-400 shadow-lg">
                      {token.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="flex-1 flex flex-col gap-6 animate-in slide-in-from-right duration-500">
                <h3 className="text-lg font-medium text-slate-300">Embedding Vectors</h3>
                <div className="space-y-4">
                  {tokens.map((token, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-20 text-xs font-mono text-slate-500 truncate">{token.text}</div>
                      <div className="flex-1 h-4 bg-slate-800 rounded-full flex overflow-hidden border border-slate-700">
                        {token.vector.map((v, j) => (
                          <div 
                            key={j} 
                            className="h-full transition-all duration-500" 
                            style={{ 
                              width: `${100 / token.vector.length}%`, 
                              backgroundColor: `rgba(59, 130, 246, ${v})`,
                              borderRight: '1px solid rgba(15, 23, 42, 0.2)'
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep >= 2 && currentStep <= 4 && (
              <div className="flex-1 flex flex-col justify-center animate-in fade-in duration-700">
                <AttentionHeatmap tokens={tokens} />
                <p className="text-[10px] text-center text-slate-500 mt-4 uppercase tracking-[0.2em]">Matrix Representation of Token Relationships</p>
              </div>
            )}

            {currentStep >= 5 && (
              <div className="flex-1 flex flex-col items-center justify-center gap-8 animate-in zoom-in duration-500">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-medium text-white">Probability Distribution</h3>
                  <p className="text-xs text-slate-500">Softmax outputs for the next token prediction</p>
                </div>
                <div className="w-full max-w-md space-y-4">
                  {[
                    { word: 'future', prob: 0.45 },
                    { word: 'data', prob: 0.25 },
                    { word: 'science', prob: 0.15 },
                    { word: 'model', prob: 0.10 },
                    { word: 'logic', prob: 0.05 }
                  ].map((p, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-blue-400">"{p.word}"</span>
                        <span className="text-slate-500">{(p.prob * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all duration-1000 delay-300" 
                          style={{ width: `${p.prob * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Explainer */}
        <div className="lg:col-span-4 overflow-y-auto">
          <ComponentExplainer activeComponent={selectedComponent} />
        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="bg-slate-900 border-t border-slate-800 px-8 py-3 flex justify-between items-center text-[10px] uppercase tracking-widest text-slate-500 font-bold">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            SYSTEM READY
          </div>
          <div className="flex items-center gap-2">
            MODEL: GPT-TYPE TRANSFORMER
          </div>
        </div>
        <div>
          &copy; {new Date().getFullYear()} TRANSFORMER INSIGHT EDUCATIONAL TOOLS
        </div>
      </footer>
    </div>
  );
};

export default App;
