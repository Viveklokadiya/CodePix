// Test script for all API endpoints
// Run with: node test-api.js

const API_BASE_URL = 'http://localhost:3000/api/ai';

async function testEndpoint(endpoint, data) {
  try {
    console.log(`\n🧪 Testing ${endpoint}...`);
    console.log('Request data:', JSON.stringify(data, null, 2));
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Success!');
      console.log('Response:', JSON.stringify(result, null, 2));
    } else {
      console.log('❌ Error!');
      console.log('Error:', JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.log('❌ Network Error!');
    console.log('Error:', error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting API tests...');
  console.log('Make sure the Next.js server is running on http://localhost:3000');

  // Test status endpoint first
  console.log('\n🔍 Testing status endpoint...');
  try {
    const response = await fetch(`${API_BASE_URL.replace('/ai', '')}/status`);
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Status endpoint working!');
      console.log('Server status:', result.status);
      console.log('Uptime:', result.uptime);
      console.log('Services:', JSON.stringify(result.services, null, 2));
    } else {
      console.log('❌ Status endpoint error!');
      console.log('Error:', JSON.stringify(result, null, 2));
    }
  } catch (error) {
    console.log('❌ Status endpoint network error!');
    console.log('Error:', error.message);
  }

  // Test code generation
  await testEndpoint('/generate', {
    prompt: 'Create a simple function to add two numbers',
    language: 'javascript',
    complexity: 'beginner',
    modelProvider: 'gemini'
  });

  // Test code explanation
  await testEndpoint('/explain', {
    prompt: 'function add(a, b) { return a + b; }',
    modelProvider: 'gemini'
  });

  // Test code translation
  await testEndpoint('/translate', {
    code: 'def greet(name): return f"Hello, {name}!"',
    sourceLanguage: 'python',
    targetLanguage: 'javascript',
    modelProvider: 'gemini'
  });

  // Test code optimization
  await testEndpoint('/optimize', {
    code: 'let sum = 0; for(let i = 0; i < array.length; i++) { sum = sum + array[i]; }',
    language: 'javascript',
    modelProvider: 'gemini'
  });

  console.log('\n✨ All tests completed!');
}

// Run tests
runTests().catch(console.error);
