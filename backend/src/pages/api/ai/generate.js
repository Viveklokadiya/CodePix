const { callAiModel } = require('../../../lib/ai-service');
const { 
  formatCodeGenerationPrompt, 
  extractCodeBlocks, 
  validateRequestData, 
  createApiResponse, 
  createErrorResponse 
} = require('../../../lib/utils');
import cors from '../../../../lib/cors-middleware';

export default async function handler(req, res) {
  // Apply CORS middleware
  await cors(req, res);
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate request data
    const validation = validateRequestData(req.body, ['prompt']);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const { prompt, modelProvider = 'gemini', language = 'javascript', complexity = 'intermediate' } = req.body;

    // Format the prompt with our helper function
    const formattedPrompt = formatCodeGenerationPrompt(prompt, language, complexity);

    const startTime = Date.now();
    const { text: responseText, modelName } = await callAiModel(modelProvider, formattedPrompt);

    // Extract code blocks if they exist
    const cleanCode = extractCodeBlocks(responseText);

    const elapsedTime = (Date.now() - startTime) / 1000;

    return res.status(200).json({
      model: modelName,
      modelProvider: modelProvider,
      result: cleanCode,
      time_taken: `${elapsedTime.toFixed(2)} seconds`
    });

  } catch (error) {
    console.error('Error in generate_code endpoint:', error);
    return res.status(500).json({ error: error.message });
  }
}
