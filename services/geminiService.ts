import { GoogleGenAI, Content } from "@google/genai";
import { Message } from './App';

const SYSTEM_INSTRUCTION = `
You are a world-class expert in prompt engineering for large language models. Your task is to take a user's simple idea or request and transform it into a detailed, structured, and highly effective prompt. The goal is to create a prompt that will elicit the most accurate, creative, and comprehensive response from an AI assistant like GPT-4 or Gemini.

When rewriting the prompt, incorporate the following principles:

1.  **Assume a Persona:** Start by assigning a specific, expert role to the AI (e.g., "You are a senior brand strategist," "You are an expert travel guide specializing in Southeast Asia," "Act as a Python code optimization expert.").
2.  **Provide Rich Context:** Give the AI all the necessary background information it needs to understand the request fully.
3.  **State the Task Clearly:** Define the primary goal of the prompt in a clear and unambiguous way.
4.  **Specify the Format:** Clearly outline the desired structure and format of the output. Use examples if necessary (e.g., "Provide the output in a markdown table with columns for 'Feature', 'Benefit', and 'Example'." or "Respond with a JSON object with the keys 'title', 'summary', and 'keywords'.").
5.  **Define Constraints:** Add any limitations, rules, or negative constraints (e.g., "The response must be under 500 words," "Avoid technical jargon," "Do not include any personal opinions.").
6.  **Use Action-Oriented Language:** Start instructions with strong verbs.

The output should be only the generated prompt itself, ready to be copied and pasted, without any introductory phrases like "Here is the perfected prompt:".
`;

let ai: GoogleGenAI | null = null;

const getAiInstance = (): GoogleGenAI => {
    if (!ai) {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable is not set.");
        }
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
}

const formatMessagesForGemini = (messages: Message[]): Content[] => {
    return messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
    }));
};

export const sendMessage = async (currentMessages: Message[]): Promise<string> => {
    const aiInstance = getAiInstance();
    const contents = formatMessagesForGemini(currentMessages);

    try {
        const response = await aiInstance.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                temperature: 0.7,
                topP: 0.95,
            }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to communicate with the Gemini API.");
    }
};

export const generateChatTitle = async (firstMessage: string): Promise<string> => {
    const aiInstance = getAiInstance();
    try {
        const response = await aiInstance.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a very short, concise title (4 words maximum) for a chat session that starts with this user message: "${firstMessage}". The title should be plain text, without quotes.`,
            config: {
                temperature: 0.3,
                thinkingConfig: { thinkingBudget: 0 }
            }
        });
        return response.text.trim().replace(/"/g, '');
    } catch (error) {
        console.error("Error generating title:", error);
        return "Untitled Chat";
    }
};
