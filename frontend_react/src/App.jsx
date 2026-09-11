import React, { useState } from "react";
import { marked } from "marked";

const API_BASE = "http://127.0.0.1:8000";

function genThreadId(userId) {
  try {
    const uuid = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
    return `${userId}_${uuid}`;
  } catch (e) {
    return `${userId}_${Math.random().toString(16).slice(2, 10)}`;
  }
}

export default function App() {
  const [userId, setUserId] = useState("demo_user");
  const [threadId, setThreadId] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [waitingForApproval, setWaitingForApproval] = useState(false);
  const [approved, setApproved] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  function ensureThread() {
    if (!threadId) {
      const tid = genThreadId(userId);
      setThreadId(tid);
      return tid;
    }
    return threadId;
  }

  async function createDraft() {
    if (!query.trim()) {
      alert("Enter a travel request first.");
      return;
    }

    setLoading(true);
    const tid = ensureThread();
    const payload = {
      messages: [{ content: query }],
      user_id: userId,
      user_query: query,
      thread_id: tid,
    };

    const res = await fetch(`${API_BASE}/invoke`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setResult(data);
    setWaitingForApproval(!!(data && data.__interrupt__));
    setLoading(false);
  }

  async function submitApproval() {
    setLoading(true);
    const res = await fetch(`${API_BASE}/resume`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ thread_id: threadId, approved: approved, feedback }),
    });
    const data = await res.json();
    setResult(data);
    setWaitingForApproval(false);
    setLoading(false);
  }

  function renderMarkdown(md) {
    if (!md) return null;
    return <div dangerouslySetInnerHTML={{ __html: marked.parse(md) }} />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <aside style={{ width: 300, padding: 20, borderRight: "1px solid #eee" }}>
        <h3>Session</h3>
        <div style={{ marginBottom: 8 }}>
          <label>User ID</label>
          <input
            style={{ width: "100%" }}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <button
            onClick={() => {
              const tid = genThreadId(userId);
              setThreadId(tid);
              setWaitingForApproval(false);
              setResult(null);
            }}
          >
            New Thread
          </button>
        </div>

        <div style={{ marginTop: 12, fontSize: 12 }}>
          <strong>Thread:</strong>
          <div style={{ wordBreak: "break-all" }}>{threadId}</div>
        </div>
      </aside>

      <main style={{ flex: 1, padding: 20 }}>
        <h1>Real-World Multi-Agent Travel Planner</h1>

        <div>
          <textarea
            placeholder="Plan a 7-day Japan trip under Rs. 2 lakh. I prefer budget hotels and no overnight flights."
            style={{ width: "100%", minHeight: 110 }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div style={{ marginTop: 8 }}>
          <button onClick={createDraft} disabled={loading}>
            {loading ? "Agents are planning..." : "Create Draft Plan"}
          </button>
        </div>

        {result && (
          <section style={{ marginTop: 20 }}>
            <h2>Supervisor Plan</h2>
            {result.supervisor_reasoning && renderMarkdown(result.supervisor_reasoning)}
            <div>
              <strong>Selected agents:</strong> {JSON.stringify(result.selected_agents || [])}
            </div>

            <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
              <div style={{ flex: 1 }}>
                <h3>Flight</h3>
                {renderMarkdown(result.flight_results)}
                <h3>Weather</h3>
                {renderMarkdown(result.weather_results)}
              </div>
              <div style={{ flex: 1 }}>
                <h3>Hotels</h3>
                {renderMarkdown(result.hotel_results)}
                <h3>Budget</h3>
                {renderMarkdown(result.budget_results)}
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <h3>Draft Itinerary</h3>
              <div>
                {result.__interrupt__ ? (
                  renderMarkdown(result.__interrupt__[0]?.value?.draft_itinerary || "")
                ) : (
                  renderMarkdown(result.itinerary)
                )}
              </div>
            </div>
          </section>
        )}

        {waitingForApproval && (
          <div style={{ marginTop: 20, borderTop: "1px solid #eee", paddingTop: 12 }}>
            <h3>Human Approval</h3>
            <div>
              <label>
                <input
                  type="radio"
                  checked={approved === true}
                  onChange={() => setApproved(true)}
                />
                Approve
              </label>
              <label style={{ marginLeft: 12 }}>
                <input
                  type="radio"
                  checked={approved === false}
                  onChange={() => setApproved(false)}
                />
                No, revise it
              </label>
            </div>
            <div style={{ marginTop: 8 }}>
              <textarea
                rows={4}
                style={{ width: "100%" }}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                disabled={approved === true}
              />
            </div>
            <div style={{ marginTop: 8 }}>
              <button onClick={submitApproval} disabled={loading}>
                Submit Approval
              </button>
            </div>
          </div>
        )}

        {result && result.final_response && (
          <div style={{ marginTop: 20, borderTop: "1px solid #eee", paddingTop: 12 }}>
            <h2>Final Travel Plan</h2>
            {renderMarkdown(result.final_response)}
          </div>
        )}
      </main>
    </div>
  );
}
