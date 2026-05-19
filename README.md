# Chic Boutique Chatbot

An offline customer support chatbot for "Chic Boutique", built using Ollama, Llama 3.2, and Node.js.

## Overview

This project demonstrates the power of local LLMs for handling sensitive customer data with privacy. It compares two prompting techniques:
- **Zero-Shot**: No examples provided.
- **One-Shot**: One high-quality example provided to guide the model.

## Technologies Used

- **Ollama**: A powerful engine for running large language models locally.
- **Llama 3.2 3B**: Meta's state-of-the-art small language model, optimized for local efficiency.
- **Node.js**: The high-performance JavaScript runtime used for the chatbot client.
- **Axios**: A promise-based HTTP client for making requests to the Ollama API.

## How to Run

### 1. Prerequisites
- Install **Ollama** from [ollama.com](https://ollama.com/).
- Pull the model: `ollama pull llama3.2:3b`.
- Ensure **Node.js** is installed on your system.

### 2. Setup
Clone the repository and install the required dependencies:
```bash
npm install
```

### 3. Execution
Start the Ollama application and then run the chatbot client:
```bash
node chatbot.js
```
The results will be automatically updated in `eval/results.md`.

## Folder Structure

- `prompts/`: Contains the templates for zero-shot and one-shot prompting.
- `eval/`: Contains the evaluation results log.
- `chatbot.js`: Main script to query Ollama and log responses.
- `setup.md`: Instructions to set up and run.
- `report.md`: Detailed analysis of the experiment.
