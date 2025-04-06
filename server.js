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

    // Real API Call
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
