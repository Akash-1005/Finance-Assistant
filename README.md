
# Personal Finance Advisor Web App

## Overview
This project is a **personal finance advisor** web application built with **TypeScript** and **Express**, leveraging the [Mastra](https://mastra.ai/) framework to power an AI agent. By utilizing GPT-based models (or a free alternative like Gemini), it offers personalized budgeting insights and expense advice. The user interface is styled with **Tailwind CSS** and features smooth animations for a modern, engaging experience.

## Features
- **AI-Driven Finance Advice:** Processes natural language queries to deliver tailored financial tips.
- **Modern, Responsive UI:** Styled with Tailwind CSS and enhanced with custom animations.
- **Full-Stack Architecture:** Backend powered by Node.js, Express, and TypeScript; easily extendable to include a React frontend.
- **Easy Deployment:** Ready for hosting on platforms like Vercel, Render, or Heroku.

## Tech Stack
- **Backend:** Node.js, Express, TypeScript, [Mastra](https://mastra.ai/)
- **Frontend:** Tailwind CSS (optionally React for SPA development)
- **AI Model:** GPT-based (OpenAI, Gemini, etc.)

## Getting Started

### Prerequisites
- **Node.js & npm:** Ensure Node.js (v14+) and npm are installed.
- **Git:** For repository cloning.
- **API Key (Optional):** An OpenAI or Gemini API key if integrating a specific LLM.

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/personal-finance-advisor.git
   cd personal-finance-advisor
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the project root:
   ```env
   OPENAI_API_KEY=sk-YourActualAPIKeyHere
   ```
   *(Replace the placeholder with your actual API key.)*

4. **Run the Application:**
   ```bash
   npm run start
   ```
   Visit [http://localhost:3000](http://localhost:3000) to interact with the app.

## Usage
- **Ask a Finance Question:** Navigate to the homepage and type in your question (e.g., “How can I save money on groceries?”).
- **Receive AI Advice:** The Mastra agent processes your query and returns concise, actionable financial advice.
- **Iterate & Explore:** Ask follow-up questions to refine your strategy.
