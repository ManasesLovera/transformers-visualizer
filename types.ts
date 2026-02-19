
export enum TransformerComponent {
  EMBEDDING = 'Embedding',
  POSITIONAL_ENCODING = 'Positional Encoding',
  ATTENTION = 'Self-Attention',
  NORMALIZATION = 'Add & Norm',
  FEED_FORWARD = 'Feed Forward',
  SOFTMAX = 'Output (Softmax)'
}

export interface TokenData {
  id: number;
  text: string;
  vector: number[];
  attentionWeights: number[];
}

export interface ExplainerResponse {
  summary: string;
  keyConcepts: string[];
  mathSimplified: string;
}
