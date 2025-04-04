const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ CORS setup for Vercel + local dev
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://mcp-tester-six.vercel.app'
  ],
  methods: ['GET', 'POST'],
  credentials: true // No need for cookies unless using sessions/auth
}));

// ✅ MCP URL validation
const validateMCPUrl = (url) => {
  return /^https:\/\/smithery\.ai\/server(@|\/@)[\w-]+\/[\w-]+$/.test(url);
};

// ✅ Root route (optional, helps check Render health)
app.get("/", (req, res) => {
  res.send("✅ MCP Backend is running!");
});

// ✅ Test MCP server route
app.post('/api/test-mcp', async (req, res) => {
  try {
    const { mcpUrl } = req.body;

    if (!validateMCPUrl(mcpUrl)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid MCP URL format',
        example: 'https://smithery.ai/server@smithery-ai/server-sequential-thinking'
      });
    }

    // Optional: replace with real fetch from mcpUrl if needed
    const mockResponse = {
      mcp_version: "1.0.0",
      capabilities: ["sequential_thinking"],
      status: "active"
    };

    res.json({
      success: true,
      isMCPServer: true,
      message: 'MCP server validated successfully',
      details: mockResponse,
      testedAt: new Date().toISOString()
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || 'MCP Server Test Failed',
      details: {
        error: error.message,
        statusCode: error.response?.status,
        responseData: error.response?.data
      }
    });
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 MCP Backend running on port ${PORT}`);
});
