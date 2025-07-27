const { callAiModel } = require('../../../lib/ai-service');
const { 
  formatCodeTranslationPrompt, 
  extractCodeBlocks, 
  validateRequestData, 
  createApiResponse, 
  createErrorResponse 
} = require('../../../lib/utils');

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Validate request data
    const validation = validateRequestData(req.body, ['code']);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const { 
      code, 
      sourceLanguage = 'javascript', 
      targetLanguage = 'python', 
      modelProvider = 'gemini' 
    } = req.body;

    const formattedPrompt = formatCodeTranslationPrompt(code, sourceLanguage, targetLanguage);

    const startTime = Date.now();
    const { text: responseText, modelName } = await callAiModel(modelProvider, formattedPrompt);

    // Extract code blocks if they exist
    const translatedCode = extractCodeBlocks(responseText);

    const elapsedTime = (Date.now() - startTime) / 1000;

    return res.status(200).json({
      model: modelName,
      modelProvider: modelProvider,
      sourceLanguage: sourceLanguage,
      targetLanguage: targetLanguage,
      result: translatedCode,
      time_taken: `${elapsedTime.toFixed(2)} seconds`
    });

  } catch (error) {
    console.error('Error in translate_code endpoint:', error);
    return res.status(500).json({ error: error.message });
  }
}
