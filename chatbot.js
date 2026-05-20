const axios = require('axios');
const fs = require('fs');
const path = require('path');

const OLLAMA_ENDPOINT = "http://localhost:11434/api/generate";
const MODEL_NAME = "llama3.2:3b";

// 20 E-commerce queries adapted from Ubuntu Dialogue Corpus style queries
const queries = [
    "My discount code is not working at checkout.",
    "How do I track the shipping status of my recent order?",
    "How do I process a return for an international order?",
    "The 'Add to Cart' button is unresponsive on mobile.",
    "How to resolve a 'Payment Authorization Failed' error?",
    "Can I change my shipping address after placing an order?",
    "How to set up a recurring subscription for monthly deliveries?",
    "The product images are not loading on the detail page.",
    "How to apply a gift card to my current balance?",
    "Where can I find the size guide for this dress?",
    "How to update the saved credit card on my account?",
    "My account login is not working with my email.",
    "How to enable multi-factor authentication for my profile?",
    "The search filter for 'Price: Low to High' is not working.",
    "How to update my delivery preferences for weekend arrivals?",
    "What is your holiday return policy window?",
    "How to fix 'Access Denied' when trying to view my past orders?",
    "How to cancel a pre-order item from my basket?",
    "The packaging I received was damaged during transit.",
    "How to reset my account password using SMS?"
];

async function queryOllama(prompt) {
    const payload = {
        model: MODEL_NAME,
        prompt: prompt,
        stream: false
    };

    try {
        const response = await axios.post(OLLAMA_ENDPOINT, payload);
        return response.data.response.trim();
    } catch (error) {
        console.error(`Error querying Ollama: ${error.message}`);
        return "Error: Could not get a response from the model.";
    }
}

async function main() {
    const zeroShotTemplate = fs.readFileSync(path.join(__dirname, 'prompts', 'zero_shot_template.txt'), 'utf8');
    const oneShotTemplate = fs.readFileSync(path.join(__dirname, 'prompts', 'one_shot_template.txt'), 'utf8');
    const evaluationTemplate = fs.readFileSync(path.join(__dirname, 'prompts', 'evaluation_template.txt'), 'utf8');

    async function evaluateResponse(query, response) {
        const evalPrompt = evaluationTemplate
            .replace("{query}", query)
            .replace("{response}", response);

        const evalPayload = {
            model: MODEL_NAME,
            prompt: evalPrompt,
            stream: false,
            format: "json"
        };

        try {
            const evalRes = await axios.post(OLLAMA_ENDPOINT, evalPayload);
            return JSON.parse(evalRes.data.response);
        } catch (error) {
            console.error(`Error evaluating response: ${error.message}`);
            return { relevance: "N/A", coherence: "N/A", helpfulness: "N/A" };
        }
    }

    const resultsPath = path.join(__dirname, 'eval', 'results.md');
    
    // Initialize results file with header
    let resultsContent = "# Evaluation Results\n\n";
    resultsContent += "| Query # | Customer Query | Prompting Method | Response | Relevance (1-5) | Coherence (1-5) | Helpfulness (1-5) |\n";
    resultsContent += "|---|---|---|---|---|---|---|\n";
    
    fs.writeFileSync(resultsPath, resultsContent);

    console.log("Starting Chatbot Evaluation...");

    for (let i = 0; i < queries.length; i++) {
        const query = queries[i];
        console.log(`Processing Query #${i + 1}: ${query}`);

        // Zero-Shot
        const zeroShotPrompt = zeroShotTemplate.replace("{query}", query);
        const zeroShotResponse = await queryOllama(zeroShotPrompt);
        const zeroShotEval = await evaluateResponse(query, zeroShotResponse);
        const zeroShotRow = `| ${i + 1} | "${query}" | Zero-Shot | ${zeroShotResponse.replace(/\n/g, '<br>')} | ${zeroShotEval.relevance} | ${zeroShotEval.coherence} | ${zeroShotEval.helpfulness} |\n`;
        fs.appendFileSync(resultsPath, zeroShotRow);

        // One-Shot
        const oneShotPrompt = oneShotTemplate.replace("{query}", query);
        const oneShotResponse = await queryOllama(oneShotPrompt);
        const oneShotEval = await evaluateResponse(query, oneShotResponse);
        const oneShotRow = `| ${i + 1} | "${query}" | One-Shot | ${oneShotResponse.replace(/\n/g, '<br>')} | ${oneShotEval.relevance} | ${oneShotEval.coherence} | ${oneShotEval.helpfulness} |\n`;
        fs.appendFileSync(resultsPath, oneShotRow);
    }

    console.log(`Evaluation complete. Results saved to ${resultsPath}`);
}

main().catch(console.error);
