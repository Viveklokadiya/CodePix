const { callAiModel } = require('../../../lib/ai-service');
const { 
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
    const validation = validateRequestData(req.body, ['prompt']);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const { prompt, modelProvider = 'gemini' } = req.body;

    const explainPrompt = `Explain this code in clear, concise terms:\n\n${prompt}`;

    const startTime = Date.now();
    const { text: responseText, modelName } = await callAiModel(modelProvider, explainPrompt);

    const elapsedTime = (Date.now() - startTime) / 1000;

    return res.status(200).json({
      model: modelName,
      modelProvider: modelProvider,
      result: responseText,
      time_taken: `${elapsedTime.toFixed(2)} seconds`
    });

  } catch (error) {
    console.error('Error in explain_code endpoint:', error);
    return res.status(500).json({ error: error.message });
  }
}
