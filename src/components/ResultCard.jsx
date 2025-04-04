const ResultCard = ({ 
  type = "info", 
  title, 
  message, 
  details, 
  timestamp,
  isMCPServer,
  status 
}) => (
  <div 
    className={`mt-6 p-5 rounded-lg border shadow-lg transition-transform transform hover:scale-[1.02] ${
      type === "success" ? "bg-green-50 border-green-300 text-green-800" :
      type === "error" ? "bg-red-50 border-red-300 text-red-800" :
      "bg-yellow-50 border-yellow-300 text-yellow-800"
    }`}
  >
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {status && (
          <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded mt-1 inline-block">
            Status: {status}
          </span>
        )}
      </div>
      {isMCPServer && (
        <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-200 text-blue-900">
          ✅ MCP Verified
        </span>
      )}
    </div>

    <p className="my-2 text-sm leading-relaxed">{message}</p>

    {timestamp && (
      <p className="text-xs text-gray-500">
        ⏱ Tested at: {new Date(timestamp).toLocaleString()}
      </p>
    )}

    {details && (
      <details className="mt-3 group">
        <summary className="text-sm font-medium cursor-pointer flex items-center hover:text-blue-600 transition">
          <span>Technical Details</span>
          <svg 
            className="ml-1 w-4 h-4 transition-transform group-open:rotate-180" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <pre className="mt-2 p-4 bg-gray-100 rounded-md overflow-x-auto text-xs border border-gray-300 shadow-inner">
          {typeof details === "string" ? details : JSON.stringify(details, null, 2)}
        </pre>
      </details>
    )}
  </div>
);

export default ResultCard;
