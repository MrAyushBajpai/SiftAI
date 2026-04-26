import { useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

export default function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    await axios.post(`${API}/upload`, formData);
    alert("Indexed");
  };

  const handleQuery = async () => {
    setLoading(true);
    const res = await axios.post(`${API}/query`, { query });

    setAnswer(res.data.answer);
    setSources(res.data.sources);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white p-6">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">SiftAI</h1>
        <p className="text-gray-400">AI Document Chat</p>
      </div>

      {/* Upload Card */}
      <div className="glass p-4 mb-6 flex gap-3 items-center">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-sm"
        />
        <button
          onClick={handleUpload}
          className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg"
        >
          Upload
        </button>
      </div>

      {/* Query Card */}
      <div className="glass p-4 mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Ask your document..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white"
        />
        <button
          onClick={handleQuery}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
        >
          Ask
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-gray-400">Thinking...</p>}

      {/* Answer */}
      {answer && (
        <div className="glass p-4 mb-6">
          <h2 className="text-lg font-medium mb-2">Answer</h2>
          <p className="whitespace-pre-wrap text-gray-200">{answer}</p>
        </div>
      )}

      {/* Sources */}
      {sources.length > 0 && (
        <div className="glass p-4">
          <h2 className="text-lg font-medium mb-3">Sources</h2>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {sources.map((s) => (
              <div
                key={s.id}
                className="p-3 bg-white/5 rounded-lg text-sm text-gray-300"
              >
                <span className="text-xs text-gray-500">
                  Chunk {s.id}
                </span>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}