import { useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

export default function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post(`${API}/upload`, formData);
    alert("Uploaded + indexed");
  };

  const handleQuery = async () => {
    const res = await axios.post(`${API}/query`, { query });

    setAnswer(res.data.answer);
    setSources(res.data.sources);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>SiftAI</h1>

      {/* Upload */}
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload PDF</button>

      <hr />

      {/* Query */}
      <input
        type="text"
        placeholder="Ask something..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "300px" }}
      />
      <button onClick={handleQuery}>Ask</button>

      <hr />

      {/* Answer */}
      <h3>Answer:</h3>
      <p>{answer}</p>

      {/* Sources */}
      <h3>Sources:</h3>
      {sources.map((s) => (
        <div key={s.id} style={{ marginBottom: 10 }}>
          <b>Chunk {s.id}</b>
          <p>{s.text}</p>
        </div>
      ))}
    </div>
  );
}