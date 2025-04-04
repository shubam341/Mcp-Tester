import { useState } from 'react';
import axios from 'axios';
import ResultCard from './ResultCard';
import { Server } from 'lucide-react'; // Using lucide icon

const MCPServerTester = () => {
  const [mcpUrl, setMcpUrl] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const testServer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/test-mcp`,
        { mcpUrl }
      );
      
      
      setResults(response.data);
    } catch (err) {
      setError({
        message: err.response?.data?.message || 'Connection failed',
        details: JSON.stringify({
          status: err.response?.status,
          error: err.message,
          url: err.config?.url
        }, null, 2)
      });
    }
    finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50 px-6 py-12">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-600/20 mb-8 ring-4 ring-white/50">
          <Server className="text-white w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          MCP Tester
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Test your MCP server endpoints with our advanced testing tool
        </p>
      </header>

    
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12">
         
            <form onSubmit={testServer} className="space-y-8">
              <div className="space-y-4">
                <label htmlFor="mcpUrl" className="block text-lg font-medium text-slate-700">
                  MCP Server URL
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    id="mcpUrl"
                    value={mcpUrl}
                    onChange={(e) => setMcpUrl(e.target.value)}
                    placeholder="Enter MCP Server URL"
                    className="w-full px-6 py-4 bg-white/50 border border-slate-200 rounded-xl
                             shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                             transition-all duration-200 placeholder:text-slate-400
                             group-hover:border-blue-500/50"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-xl text-white font-medium text-lg
                          transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                          ${isLoading 
                            ? 'bg-blue-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-600/20'
                          }`}
              >
                {isLoading ? 'Testing...' : 'Test Server'}
              </button>
            </form>

           
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">Test Results</h2>
              
              {isLoading && (
                <div className="p-6 rounded-xl bg-blue-50 border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-blue-700 font-medium">Testing MCP server...</p>
                  </div>
                </div>
              )}

              {error && <ResultCard type="error" title="Error" {...error} />}
              {results && <ResultCard type="success" title="Results" {...results} />}
              
              {!isLoading && !error && !results && (
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6">
                  <p className="text-slate-600 text-center">
                    No test results yet. Start by testing your server.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCPServerTester;