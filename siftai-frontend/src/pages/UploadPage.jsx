import TopAppBar from "../components/TopAppBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const API = "http://127.0.0.1:8000";

export default function UploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const upload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await axios.post(`${API}/upload`, formData);

    navigate("/chat");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#131313] text-white">
      <TopAppBar />

      <main className="flex-grow flex items-center justify-center pt-24">
        <div className="text-center w-full max-w-[640px]">

          <p className="text-xs tracking-widest text-indigo-400 mb-2">
            INITIALIZATION
          </p>

          <h1 className="text-3xl mb-8">
            Provide Context source
          </h1>

          <div className="border border-white/10 rounded-xl p-10">

            <p className="text-lg mb-2">Drop your PDF here</p>
            <p className="text-sm text-gray-400 mb-4">
              Drag and drop or select manually
            </p>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-4"
            />

            <button
              onClick={upload}
              className="px-6 py-2 rounded bg-gradient-to-r from-indigo-500 to-purple-500"
            >
              Browse Files
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Secure, single-session processing
          </p>
        </div>
      </main>
    </div>
  );
}