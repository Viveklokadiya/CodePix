// AI Service for handling different AI providers
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Groq = require('groq-sdk');

// Initialize AI clients
let genaiClient = null;
let groqClient = null;

// Initialize Google Gemini
try {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (geminiApiKey) {
    genaiClient = new GoogleGenerativeAI(geminiApiKey);
    console.log('Gemini client initialized successfully');
  } else {
    console.warn('GEMINI_API_KEY not found in environment variables');
  }
} catch (error) {
  console.warn('Error initializing Gemini client:', error.message);
}

// Initialize Groq
try {
  const groqApiKey = process.env.GROQ_API_KEY;
  if (groqApiKey) {
    groqClient = new Groq({ apiKey: groqApiKey });
    console.log('Groq client initialized successfully');
  } else {
    console.warn('GROQ_API_KEY not found in environment variables');
  }
} catch (error) {
  console.warn('Error initializing Groq client:', error.message);
}

/**
 * Generic function to call AI models
 */
async function callAiModel(
  modelProvider, 
  prompt, 
  modelNameGemini = "gemini-2.5-flash", 
  modelNameGroq = "llama-3.3-70b-versatile"
) {
  if (modelProvider.toLowerCase() === 'gemini') {
    if (!genaiClient) {
      throw new Error('Gemini client not available. Please check GEMINI_API_KEY environment variable.');
    }
    
    const model = genaiClient.getGenerativeModel({ model: modelNameGemini });
    const response = await model.generateContent(prompt);
    return {
      text: response.response.text(),
      modelName: modelNameGemini
    };
  } 
  else if (modelProvider.toLowerCase() === 'groq') {
    if (!groqClient) {
      throw new Error('Groq client not available. Please check GROQ_API_KEY environment variable.');
    }
    
    const completion = await groqClient.chat.completions.create({
      model: modelNameGroq,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 1,
      stop: null,
    });
    
    return {
      text: completion.choices[0].message.content,
      modelName: modelNameGroq
    };
  } 
  else {
    throw new Error(`Unsupported model provider: ${modelProvider}. Supported providers are 'gemini' and 'groq'.`);
  }
}

module.exports = { callAiModel };
