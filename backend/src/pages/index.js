import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>CodePix Backend API</title>
        <meta name="description" content="CodePix Backend API built with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
        <h1>CodePix Backend API</h1>
        <p>Welcome to the CodePix Backend API built with Next.js</p>
        
        <div style={{ marginTop: '2rem' }}>
          <h2>Available API Endpoints:</h2>
          <ul>
            <li><strong>GET /api/status</strong> - Check API health and status</li>
            <li><strong>POST /api/ai/generate</strong> - Generate code from natural language description</li>
            <li><strong>POST /api/ai/explain</strong> - Explain existing code</li>
            <li><strong>POST /api/ai/translate</strong> - Translate code from one language to another</li>
            <li><strong>POST /api/ai/optimize</strong> - Optimize existing code</li>
          </ul>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h2>Environment Setup:</h2>
          <p>Make sure to set the following environment variables in your <code>.env.local</code> file:</p>
          <ul>
            <li><code>GEMINI_API_KEY</code> - Your Google Gemini API key</li>
            <li><code>GROQ_API_KEY</code> - Your Groq API key</li>
          </ul>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h2>Quick Test:</h2>
          <p>Test the API status: <a href="/api/status" target="_blank" style={{ color: '#0070f3' }}>/api/status</a></p>
        </div>
      </main>
    </>
  )
}
