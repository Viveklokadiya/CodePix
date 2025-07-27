import cors from '../../../lib/cors-middleware'

export default async function handler(req, res) {
  // Apply CORS middleware
  await cors(req, res);
  
  // Allow both GET and POST requests for flexibility
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get current timestamp
    const timestamp = new Date().toISOString();
    
    // Check environment variables availability
    const hasGeminiKey = !!process.env.GEMINI_API_KEY;
    const hasGroqKey = !!process.env.GROQ_API_KEY;
    
    // Get Node.js and Next.js versions
    const nodeVersion = process.version;
    const nextVersion = require('next/package.json').version;
    
    // Calculate uptime (approximate since server start)
    const uptime = process.uptime();
    const uptimeFormatted = `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`;

    return res.status(200).json({
      status: 'OK',
      message: 'CodePix Backend API is running',
      timestamp: timestamp,
      uptime: uptimeFormatted,
      uptimeSeconds: Math.floor(uptime),
      version: '1.0.0',
      environment: {
        node: nodeVersion,
        nextjs: nextVersion,
        platform: process.platform,
        arch: process.arch
      },
      services: {
        gemini: hasGeminiKey ? 'configured' : 'not configured',
        groq: hasGroqKey ? 'configured' : 'not configured'
      },
      endpoints: [
        'GET /api/status',
        'POST /api/ai/generate',
        'POST /api/ai/explain', 
        'POST /api/ai/translate',
        'POST /api/ai/optimize'
      ],
      health: {
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
        },
        pid: process.pid
      }
    });

  } catch (error) {
    console.error('Error in status endpoint:', error);
    return res.status(500).json({ 
      status: 'ERROR',
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
      error: error.message 
    });
  }
}
