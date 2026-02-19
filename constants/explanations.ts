
import { TransformerComponent, ExplainerResponse } from '../types';

export const COMPONENT_KNOWLEDGE_BASE: Record<TransformerComponent, ExplainerResponse> = {
  [TransformerComponent.EMBEDDING]: {
    summary: "Embeddings transform discrete tokens (words or characters) into dense vectors of real numbers. This maps human language into a high-dimensional mathematical space where words with similar meanings are positioned closer together.",
    keyConcepts: ["Vector Space", "Semantic Mapping", "Dimensionality", "Tokenization"],
    mathSimplified: "Word 'Apple' → [0.12, -0.45, 0.88, ...]. These values are learned during training so that 'Apple' and 'Fruit' share similar coordinates."
  },
  [TransformerComponent.POSITIONAL_ENCODING]: {
    summary: "Since Transformers process all tokens in a sequence simultaneously, they have no inherent sense of order. Positional encoding adds unique signals to the embeddings to tell the model where each word is located in the sentence.",
    keyConcepts: ["Sequence Order", "Sinusoidal Functions", "Relative Distance", "Invariance"],
    mathSimplified: "PE(pos, 2i) = sin(pos / 10000^(2i/d_model)). By using sine and cosine waves of different frequencies, the model can 'hear' the position of a word."
  },
  [TransformerComponent.ATTENTION]: {
    summary: "Self-attention allows the model to look at other words in the input sequence to better understand a specific word. It calculates a 'relevance score' between every pair of words, allowing the model to capture context and long-range dependencies.",
    keyConcepts: ["Queries, Keys, Values", "Contextual Scaling", "Dot Product", "Softmax Weights"],
    mathSimplified: "Attention(Q, K, V) = softmax(QKᵀ / √d_k)V. Think of it as a fuzzy lookup: the Query asks a question, the Key says what it has, and the Value provides the content."
  },
  [TransformerComponent.NORMALIZATION]: {
    summary: "The 'Add & Norm' step involves a residual connection (adding the original input back to the processed output) followed by Layer Normalization. This prevents the 'vanishing gradient' problem and keeps the mathematical values stable across many layers.",
    keyConcepts: ["Residual Connection", "LayerNorm", "Gradient Flow", "Internal Covariate Shift"],
    mathSimplified: "Output = LayerNorm(x + Sublayer(x)). The 'Add' lets information skip layers, while 'Norm' rescales the data to have a mean of 0 and variance of 1."
  },
  [TransformerComponent.FEED_FORWARD]: {
    summary: "After attention has gathered context from other words, the Feed-Forward network processes each token individually. It consists of two linear transformations with a non-linear activation (usually ReLU or GELU) in between, allowing the model to learn complex patterns.",
    keyConcepts: ["MLP", "Non-linearity", "GELU Activation", "Point-wise Processing"],
    mathSimplified: "FFN(x) = max(0, xW₁ + b₁)W₂ + b₂. This is where the model 'thinks' about the information gathered during the attention phase."
  },
  [TransformerComponent.SOFTMAX]: {
    summary: "The final layer converts the model's raw internal scores (logits) into a probability distribution. This tells us the likelihood of every possible word in the model's vocabulary being the next token in the sequence.",
    keyConcepts: ["Logits", "Probability Distribution", "Cross-Entropy", "Next-Token Prediction"],
    mathSimplified: "P(y_i) = exp(z_i) / Σ exp(z_j). All probabilities are forced to be between 0 and 1, and they all sum up to exactly 1.0 (100%)."
  }
};
