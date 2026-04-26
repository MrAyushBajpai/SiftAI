import TopAppBar from "../components/TopAppBar";
import { useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const res = await axios.post(`${API}/query`, {
      query: userMsg.text,
    });

    setMessages((prev) => [
      ...prev,
      { role: "ai", text: res.data.answer },
    ]);

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#131313] text-white flex flex-col">

      <TopAppBar showChangeDoc />

      <main className="flex-1 mt-16 max-w-[800px] mx-auto w-full flex flex-col">

        {/* Header */}
        <div className="flex justify-center py-6">
          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <span className="material-symbols-outlined text-indigo-400">
              description
            </span>
            <span className="text-sm">Document Loaded</span>
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 overflow-y-auto px-6 pb-32 space-y-6">

          {messages.map((m, i) => (
            <div key={i} className="flex gap-3">

              {m.role === "ai" && (
                <span className="material-symbols-outlined text-indigo-400">
                  robot_2
                </span>
              )}

              <div
                className={`p-3 rounded-xl ${
                  m.role === "user"
                    ? "ml-auto bg-white/10"
                    : "bg-white/5"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {loading && <p className="text-gray-400">Thinking...</p>}
        </div>

        {/* Input */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#131313]">

          <div className="max-w-[720px] mx-auto flex gap-2">

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about document..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2"
            />

            <button
              onClick={send}
              className="px-4 py-2 rounded bg-gradient-to-r from-indigo-500 to-purple-500"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}