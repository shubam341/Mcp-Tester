const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000', 'https://mcp-tester-six.vercel.app'],
  methods: ['GET', 'POST'],
  credentials: true
}));

const validateMCPUrl = (url) => {
  return /^https:\/\/smithery\.ai\/server(@|\/@)[\w-]+\/[\w-]+$/.test(url);
};

app.get("/", (req, res) => {
  res.send(" MCP Backend is Live!");
});

app.post('/api/test-mcp', async (req, res) => {
  const { mcpUrl } = req.body;

  if (!validateMCPUrl(mcpUrl)) {
    return res.status(400).json({
      success: false,
      message: ' Invalid MCP URL format',
      example: 'https://smithery.ai/server@smithery-ai/server-sequential-thinking'
    });
  }

  try {
    // Actual POST to MCP URL with test payload
    const response = await axios.post(mcpUrl, {
      messages: [{ role: 'user', content: 'Hello from MCP Tester' }]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.json({
      success: true,
      isMCPServer: true,
      message: ' MCP server validated successfully',
      details: response.data,
      testedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error(" MCP Test Error:", error.message);

    res.status(500).json({
      success: false,
      message: ' MCP Server Test Failed',
      details: {
        error: error.message,
        statusCode: error.response?.status,
        responseData: error.response?.data
      }
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` MCP Backend running on port ${PORT}`);
});
