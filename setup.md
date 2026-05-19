# Setup Instructions

To set up and run the Chic Boutique Chatbot:

## Prerequisites

1.  **Install Ollama**: Download and install from [ollama.com](https://ollama.com/).
2.  **Pull Llama 3.2**: Open your terminal and run:
    ```bash
    ollama pull llama3.2:3b
    ```
3.  **Install Node.js**: Ensure you have Node.js (v18+) installed.

## Installation

1.  In the project root, install dependencies:
    ```bash
    npm install
    ```

## Running the Chatbot

1.  Ensure the Ollama application is running (check your system tray or menu bar).
2.  Run the chatbot script:
    ```bash
    node chatbot.js
    ```
3.  The responses will be logged to `eval/results.md`.

## Manual Evaluation

1.  Open `eval/results.md`.
2.  Review the responses and assign scores (1-5) for:
    - **Relevance**: How well the response addresses the query.
    - **Coherence**: Grammatical correctness and readability.
    - **Helpfulness**: Usefulness of the answer.
