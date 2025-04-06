const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();


app.use(express.json());


app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://mcp-tester-six.vercel.app'
  ],
  methods: ['GET', 'POST'],
  credentials: true 
}));


const validateMCPUrl = (url) => {
  return /^https:\/\/smithery\.ai\/server(@|\/@)[\w-]+\/[\w-]+$/.test(url);
};


app.get("/", (req, res) => {
  res.send(" MCP Backend is running!");
});


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

    // ⛓️ Real API Call
    const response = await axios.post(mcpUrl, {
      input: "test"
    });

    res.json({
      success: true,
      isMCPServer: true,
      message: 'MCP server validated successfully',
      details: response.data,
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



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 MCP Backend running on port ${PORT}`);
});
