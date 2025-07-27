// Utility functions for prompt formatting and text processing

/**
 * Format the prompt for code generation
 */
function formatCodeGenerationPrompt(prompt, language = "javascript", complexity = "intermediate") {
  return `
    You are a code generator that produces ONLY code Not anything extra in that like example and much error handling things.
    This response will be pasted to direct code editor, so it should be ready to run without any modifications and user friendly.
    code should be written in a way that it is easy to understand and maintain.
    You will be given a task to generate code in a specific programming language with a certain complexity level.
    You will only return the code in a code block with the appropriate syntax for the specified language.
    Do not include any explanations, comments, or additional text outside of the code block.
    code should be proper and clean, and should follow best practices for the specified language.

    Task: ${prompt}

    Requirements:
    - Language: ${language}
    - Complexity: ${complexity}
    - Include only essential comments that explain complex logic
    - Follow best practices for ${language}
    - Make the code clean and concise
    - Do NOT include usage examples
    - Do NOT include explanatory text outside the code
    - Do NOT include console.log statements unless specifically requested
    - Do NOT include commented out code
    - Do NOT include any text outside of the code block

    Your entire response should be ONLY a code block with the appropriate syntax, nothing else.
  `;
}

/**
 * Format the prompt for code translation
 */
function formatCodeTranslationPrompt(code, sourceLanguage, targetLanguage) {
  return `
    Translate the following code from ${sourceLanguage} to ${targetLanguage}.
    Maintain the same functionality and logic while following ${targetLanguage} conventions and best practices.
    Return only the translated code in a code block with the appropriate syntax for ${targetLanguage}.
    Do not include any explanations or additional text outside the code block.

    Source Code (${sourceLanguage}):
    ${code}

    Translate to ${targetLanguage}:
  `;
}

/**
 * Format the prompt for code optimization
 */
function formatCodeOptimizationPrompt(code, language) {
  return `
    Analyze and optimize the following ${language} code. Provide specific optimization suggestions including:
    1. Performance improvements
    2. Code readability enhancements
    3. Best practices recommendations
    4. Security considerations (if applicable)
    5. Memory usage optimizations

    Provide both the optimized code and a brief explanation of the changes made.

    Original Code:
    ${code}

    Please provide:
    1. The optimized code in a code block
    2. A brief explanation of the optimizations made
  `;
}

/**
 * Extract code blocks from AI response
 */
function extractCodeBlocks(responseText) {
  // First try to find code blocks with language specified
  const codeBlockPattern = /```(\w+)?\n([\s\S]*?)```/g;
  const matches = [...responseText.matchAll(codeBlockPattern)];
  
  if (matches.length > 0) {
    const [, language, code] = matches[0];
    // Return with formatting that frontend expects for parsing
    return `\`\`\`${language || ''}\n${code.trim()}\n\`\`\``;
  }
  
  // If no match with language, try generic code blocks
  const genericCodeBlockPattern = /```([\s\S]*?)```/g;
  const genericMatches = [...responseText.matchAll(genericCodeBlockPattern)];
  
  if (genericMatches.length > 0) {
    // Return with formatting that frontend expects for parsing
    return `\`\`\`\n${genericMatches[0][1].trim()}\n\`\`\``;
  }
  
  // If no code blocks at all
  return responseText.trim();
}

/**
 * Validate request data
 */
function validateRequestData(data, requiredFields) {
  if (!data) {
    return { valid: false, error: 'Request body is required' };
  }
  
  for (const field of requiredFields) {
    if (!(field in data)) {
      return { valid: false, error: `Missing "${field}" in request body` };
    }
  }
  
  return { valid: true };
}

/**
 * Create standardized API response
 */
function createApiResponse(data, statusCode = 200) {
  return new Response(JSON.stringify(data), {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Create error response
 */
function createErrorResponse(error, statusCode = 500) {
  console.error('API Error:', error);
  return createApiResponse({ error: error.message || error }, statusCode);
}

module.exports = {
  formatCodeGenerationPrompt,
  formatCodeTranslationPrompt,
  formatCodeOptimizationPrompt,
  extractCodeBlocks,
  validateRequestData,
  createApiResponse,
  createErrorResponse
};
