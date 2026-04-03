import { useState } from "react";
import CustomCioPlp from "../components/CustomCioPlp";
import "./DevStyles.css";

const API_KEY_STORAGE_KEY = "cio-dev-plp-api-key";

function getInitialParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    key: params.get("key") ?? sessionStorage.getItem(API_KEY_STORAGE_KEY) ?? "",
    q: params.get("q") ?? "",
  };
}

function syncParams(apiKey: string, query: string) {
  sessionStorage.setItem(API_KEY_STORAGE_KEY, apiKey.trim());
  const next = new URLSearchParams(window.location.search);
  if (query.trim()) next.set("q", query.trim());
  else next.delete("q");
  next.delete("key");
  window.history.replaceState(null, "", `?${next.toString()}`);
}

export default function App() {
  const initial = getInitialParams();
  const [apiKey, setApiKey] = useState(initial.key);
  const [query, setQuery] = useState(initial.q);
  const [activeKey, setActiveKey] = useState(initial.key);
  const [activeQuery, setActiveQuery] = useState(initial.q);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!apiKey.trim()) return;
    syncParams(apiKey, query);
    setActiveKey(apiKey.trim());
    setActiveQuery(query.trim());
  }

  // Before first submit — show full-page form
  if (!activeKey) {
    return (
      <div className="dev-form-wrapper">
        <form onSubmit={handleSubmit} className="dev-form">
          <h2>Constructor.io PLP Dev</h2>

          <label>
            <span>
              API Key <span className="required">*</span>
            </span>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Constructor.io API Key"
              required
            />
          </label>

          <label>
            Search Query
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Optional search query"
            />
          </label>

          <button type="submit">Launch PLP</button>
        </form>
      </div>
    );
  }

  // After submit — compact banner + PLP
  return (
    <>
      <form onSubmit={handleSubmit} className="dev-banner">
        <span className="dev-banner-title">CIO PLP Dev</span>

        <label>
          API Key <span className="required">*</span>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="API Key"
            required
          />
        </label>

        <label>
          Query
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search query"
          />
        </label>

        <button type="submit">Apply</button>
        <button
          type="button"
          className="dev-banner-home"
          onClick={() => {
            setActiveKey("");
            setActiveQuery("");
            window.history.replaceState(null, "", window.location.pathname);
          }}
        >
          Home
        </button>
      </form>

      <CustomCioPlp key={`${activeKey}-${activeQuery}`} apiKey={activeKey} />
    </>
  );
}
