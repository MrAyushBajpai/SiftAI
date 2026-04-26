import { useNavigate, Link } from "react-router-dom";

export default function TopAppBar({ showChangeDoc }) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-[12px] border-b border-white/10">
      <div className="flex justify-between items-center h-16 px-8 max-w-[800px] mx-auto">
        <div
          onClick={() => navigate("/")}
          className="text-lg font-bold text-white flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
        >
          <span className="material-symbols-outlined text-indigo-400">
            description
          </span>
          SiftAI
        </div>

        {showChangeDoc && (
          <Link
            to="/"
            className="px-4 py-1.5 rounded border border-white/20 text-sm text-white hover:bg-white/5"
          >
            Change Document
          </Link>
        )}
      </div>
    </header>
  );
}