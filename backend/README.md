# CodePix Backend - Next.js

This is the Next.js backend for CodePix, converted from the original Flask backend. It provides the same AI-powered code generation, explanation, translation, and optimization features.

## Features

- **Code Generation**: Generate code from natural language descriptions
- **Code Explanation**: Get clear explanations of existing code
- **Code Translation**: Translate code between different programming languages
- **Code Optimization**: Get optimization suggestions and improved code

## Supported AI Providers

- **Google Gemini** (gemini-2.0-flash-exp)
- **Groq** (llama-3.3-70b-versatile)

## API Endpoints

All endpoints are accessible under `/api/ai/`:

### POST /api/ai/generate
Generate code from natural language description.

**Request Body:**
```json
{
  "prompt": "Create a function to sort an array",
  "language": "javascript",
  "complexity": "intermediate",
  "modelProvider": "gemini"
}
```

### POST /api/ai/explain
Explain existing code.

**Request Body:**
```json
{
  "prompt": "const arr = [3,1,4,1,5]; arr.sort((a,b) => a-b);",
  "modelProvider": "gemini"
}
```

### POST /api/ai/translate
Translate code from one language to another.

**Request Body:**
```json
{
  "code": "def hello(): print('Hello World')",
  "sourceLanguage": "python",
  "targetLanguage": "javascript",
  "modelProvider": "gemini"
}
```

### POST /api/ai/optimize
Optimize existing code.

**Request Body:**
```json
{
  "code": "let sum = 0; for(let i = 0; i < arr.length; i++) { sum += arr[i]; }",
  "language": "javascript",
  "modelProvider": "gemini"
}
```

## Environment Setup

Create a `.env.local` file with your API keys:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here
```

## Installation and Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env.local`

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

## Docker Setup

Build and run with Docker:

```bash
docker-compose up --build
```

The application will be available at `http://localhost:3000`

## Migration from Flask

This Next.js backend provides identical functionality to the original Flask backend:

- All API endpoints maintain the same request/response formats
- Same AI model integrations (Gemini and Groq)
- Same prompt formatting and response processing
- CORS is properly configured for frontend integration

## Frontend Integration

Update your frontend to point to the new backend URL:
- Development: `http://localhost:3000`
- Production: Your deployed Next.js backend URL

No changes are needed to the frontend code - all API contracts remain the same.
