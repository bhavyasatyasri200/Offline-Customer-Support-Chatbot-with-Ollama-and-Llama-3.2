# Customer Support Chatbot Evaluation Report

## Introduction

This project evaluates the feasibility of using a local LLM (Llama 3.2 3B via Ollama) for e-commerce customer support. We specifically compare **Zero-Shot** vs. **One-Shot** prompting techniques to see how a single example influences response quality.

## Methodology

- **Model**: Llama 3.2 3B (Quantized).
- **Dataset**: 20 queries adapted from technical Ubuntu Dialogue Corpus samples into e-commerce scenarios.
- **Scoring Rubric**: Relevance, Coherence, and Helpfulness are scored from 1 to 5.
- **Prompts**:
    - Zero-Shot: Role definition + query.
    - One-Shot: Role definition + 1 return policy example + query.

## Results & Analysis

| Metric | Zero-Shot (Avg) | One-Shot (Avg) |
|---|---|---|
| Relevance | 4.7 | 5.0 |
| Coherence | 5.0 | 5.0 |
| Helpfulness | 4.3 | 4.8 |

### Observations

- **Zero-Shot Performance**: The model performed exceptionally well in understanding the role. It provided accurate, although sometimes slightly more generic, advice. It correctly followed the instruction to avoid making up policies.
- **One-Shot Performance**: Providing a single example significantly improved the "helpfulness" score. The model tended to include more encouraging language ("Your satisfaction is our priority!") and more specific instructions (e.g., "message us your order number right away").

### Comparison

The One-Shot approach consistently produced more professional and "agent-like" responses. While Zero-Shot was perfectly functional, the one-shot example served as a stylistic anchor that made the outputs feel more consistent with a premium brand's voice.

## Conclusion & Limitations

### Suitability
- Llama 3.2 3B is highly capable for its size, offering low-latency responses on consumer hardware while maintaining privacy.

### Limitations
- **No Real-time Data**: The model cannot access live order databases or shipping APIs.
- **Hallucination**: Smaller models may occasionally fabricate policies or details.
- **Context Window**: Long conversations might strain the 3B model's ability to maintain complex context compared to larger models.

### Next Steps
- Integrate with a Retrieval-Augmented Generation (RAG) system to provide the model with up-to-date policy documents and product info.
- Fine-tune on specific-ecommerce chat logs.
