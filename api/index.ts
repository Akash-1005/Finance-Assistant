import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import serverless from 'serverless-http';
import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a Personal Finance Advisor Agent
const financeAdvisor = new Agent({
  name: 'Personal Finance Advisor',
  instructions: "You are a friendly and practical personal finance advisor. Provide clear, concise advice on budgeting, saving, investing, and financial planning. Ask clarifying questions if needed.",
  model: openai("gpt-4o-mini"),
});

// Homepage route using Tailwind CSS with animations
app.get('/', (req, res) => {
  // Explicitly set the Content-Type to text/html
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Personal Finance Advisor</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-in { animation: fadeIn 0.8s ease-out forwards; }
        </style>
      </head>
      <body class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div class="bg-black/50 backdrop-blur-sm rounded-lg shadow-2xl p-8 w-full max-w-xl text-center fade-in">
          <h1 class="text-4xl font-bold text-white mb-6 animate-pulse">Personal Finance Advisor</h1>
          <p class="text-lg text-gray-200 mb-6">Ask your personal finance question below:</p>
          <form action="/ask" method="post" class="space-y-4">
            <input 
              type="text" 
              name="question" 
              placeholder="Enter your finance question" 
              required
              class="w-full px-4 py-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            />
            <button 
              type="submit"
              class="w-full py-3 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold transform hover:scale-105 transition duration-200"
            >
              Ask
            </button>
          </form>
        </div>
      </body>
    </html>
  `);
});

// Form submission route with Tailwind CSS and animations for the response
app.post('/ask', async (req, res) => {
  const question = req.body.question;
  try {
    const response = await financeAdvisor.generate([
      { role: "user", content: question }
    ]);
    const answer = response.text;
    
    // Explicitly set the Content-Type to text/html
    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Response - Personal Finance Advisor</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .fade-in { animation: fadeIn 0.8s ease-out forwards; }
          </style>
        </head>
        <body class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
          <div class="bg-black/50 backdrop-blur-sm rounded-lg shadow-2xl p-8 w-full max-w-xl text-center fade-in">
            <h1 class="text-4xl font-bold text-white mb-6">Personal Finance Advisor</h1>
            <div class="mb-4">
              <strong class="block text-cyan-400 text-xl mb-2">Your Question:</strong>
              <p class="text-lg text-gray-200">${question}</p>
            </div>
            <div class="mb-6">
              <strong class="block text-cyan-400 text-xl mb-2">Advice:</strong>
              <p class="text-lg text-gray-200">${answer}</p>
            </div>
            <a href="/" class="inline-block py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-md hover:scale-105 transition transform duration-200">Ask another question</a>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Error processing question:", error);
    res.status(500).send("An error occurred while processing your request. Please try again.");
  }
});

// Wrap the Express app as a serverless function for Vercel
export default serverless(app);
