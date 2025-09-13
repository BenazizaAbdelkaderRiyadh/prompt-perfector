# Prompt Perfector ✨

**Turn your simple ideas into powerful, detailed prompts for any large language model.**

Prompt Perfector is a sleek, conversational web application built with React and the Google Gemini API. It acts as your personal prompt engineering assistant, taking a basic idea and transforming it into a structured, effective prompt designed to get the best possible results from modern AI models.

---

![Logo](./screenshot.png)




## The Problem It Solves

The quality of output from large language models (like Gemini, GPT-4, etc.) is directly proportional to the quality of the input prompt. Writing a good prompt is a skill—it requires providing context, defining a persona, specifying a format, and setting constraints. Most users don't have this expertise.

Prompt Perfector bridges this gap. You provide the core idea, and it handles the engineering.

## Key Features

-   **🤖 Expert Prompt Engineering:** Leverages a sophisticated system instruction to transform simple user requests into detailed, well-structured prompts.
-   **💬 Conversational Interface:** A modern, chat-based UI allows for a natural and iterative workflow.
-   **📚 Automatic Chat History:** Every conversation is automatically saved to your browser's local storage.
-   **🔍 Searchable History:** Quickly find past conversations using the built-in search functionality in the sidebar.
-   **📋 Easy Copy-to-Clipboard:** Hover over any AI-generated response to instantly copy the perfected prompt.
-   **🌙 Sleek, Modern Design:** A beautiful, responsive, and dark-mode-first interface built with Tailwind CSS.
-   **🚀 Zero Build Setup:** Runs directly in the browser using import maps—no `npm install` or build process required for local development.

## Tech Stack

-   **Framework:** [React](https://react.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **AI Model:** [Google Gemini API](https://ai.google.dev/) (`@google/genai`)

## Getting Started

You can run this project locally without any complex setup.

### Prerequisites

-   A modern web browser (like Chrome, Firefox, or Edge).
-   A Google Gemini API Key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/BenazizaAbdelkaderRiyadh/prompt-perfector.git
    cd prompt-perfector
    ```

2.  **Create an environment file:**
    Create a new file named `.env` in the root of the project folder. This file will hold your API key.

3.  **Add your API Key:**
    Open the `.env` file and add your Google Gemini API key as follows:
    ```
    API_KEY=YOUR_GEMINI_API_KEY_GOES_HERE
    ```
    *This is a frontend project, so the key will be exposed in the browser. For a production application, you would typically use a backend proxy to protect the key.*

4.  **Run the application:**
    Because this project uses modern browser features and does not have a build step, you can simply open the `index.html` file in your browser. You may need a simple local server for the browser to correctly handle environment variables. A great tool for this is the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code.

## How It Works
![Logo](./screenshot.png)


The magic behind Prompt Perfector lies in the `SYSTEM_INSTRUCTION` sent to the Gemini API with every request. This detailed meta-prompt instructs the AI to act as a world-class prompt engineering expert. It guides the model to rewrite user input by:

-   Assigning an expert **persona** to the target AI.
-   Providing rich **context**.
-   Clearly stating the **task**.
-   Specifying the output **format**.
-   Defining **constraints**.

This ensures that the output is consistently high-quality and ready to be used.

## Author

This project was built by **Benaziza Abdelkader Riyadh**.

-   **GitHub:** [@BenazizaAbdelkaderRiyadh](https://github.com/BenazizaAbdelkaderRiyadh)

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
"# prompt-perfector" 
"# prompt-perfector" 
