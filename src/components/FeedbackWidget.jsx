import { useState, useEffect } from "react";

const FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSeJMiFIva8g7lLbfD1ZdUy6I_XO7sMXrW5jBflIj3zsFv9Rgw/viewform?usp=dialog";

const messages = [
  {
    id: 1,
    from: "bot",
    text: "👋 Hi there! You're using SenseKit — an accessibility toolkit for Deaf, HoH, Blind & Low Vision users.",
    delay: 0,
  },
  {
    id: 2,
    from: "bot",
    text: "We'd love to hear your experience! 🙏 Could you spare 5 minutes to fill out our evaluation form?",
    delay: 900,
  },
  {
    id: 3,
    from: "bot",
    text: "Your feedback helps us improve accessibility for everyone. 💙",
    delay: 1800,
  },
];

export default function FeedbackWidget() {
  const [isOpen, setIsOpen]       = useState(false);
  const [visible, setVisible]     = useState([]);
  const [dismissed, setDismissed] = useState(false);
  const [pulse, setPulse]         = useState(true);

  // Auto-open after 8 seconds on first visit
  useEffect(() => {
    const seen = sessionStorage.getItem("feedbackSeen");
    if (!seen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("feedbackSeen", "true");
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Staggered message reveal when opened
  useEffect(() => {
    if (!isOpen) return;
    setVisible([]);
    setPulse(false);
    messages.forEach((msg) => {
      setTimeout(() => {
        setVisible((prev) => [...prev, msg.id]);
      }, msg.delay);
    });
  }, [isOpen]);

  if (dismissed) return null;

  return (
    <>
      {/* ── FLOATING BUBBLE BUTTON ── */}
      <button
        className={`fb-trigger ${pulse ? "fb-pulse" : ""} 
                    ${isOpen ? "fb-open" : ""}`}
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen 
          ? "Close feedback chat" 
          : "Open feedback form chat"}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 
              0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
        {!isOpen && (
          <span className="fb-badge" aria-hidden="true">1</span>
        )}
      </button>

      {/* ── CHAT WINDOW ── */}
      {isOpen && (
        <div
          className="fb-window"
          role="dialog"
          aria-modal="false"
          aria-label="Evaluation feedback chat"
        >
          {/* Header */}
          <div className="fb-header">
            <div className="fb-avatar" aria-hidden="true">
              SK
            </div>
            <div className="fb-header-info">
              <span className="fb-header-name">SenseKit Team</span>
              <span className="fb-header-status">
                <span className="fb-dot" aria-hidden="true"/>
                Online
              </span>
            </div>
            <button
              className="fb-close"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss feedback widget permanently"
            >
              <svg width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="fb-messages" role="log" 
               aria-live="polite" aria-label="Chat messages">
            {messages.map((msg) =>
              visible.includes(msg.id) ? (
                <div
                  key={msg.id}
                  className={`fb-msg fb-msg-${msg.from} 
                              fb-msg-enter`}
                >
                  {msg.text}
                </div>
              ) : (
                <div key={msg.id} className="fb-typing">
                  <span/><span/><span/>
                </div>
              )
            )}

            {/* CTA Buttons — shown after all messages */}
            {visible.length === messages.length && (
              <div className="fb-actions fb-msg-enter">
                {/* Option 1 — Open inside app (iframe-style) */}
                <a
                  href={FORM_LINK}
                  target="_self"
                  rel="noopener noreferrer"
                  className="fb-btn fb-btn-primary"
                  aria-label="Fill out the evaluation form"
                >
                  📋 Fill Out Form
                </a>

                {/* Option 2 — Open in new tab */}
                <a
                  href={FORM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fb-btn fb-btn-secondary"
                  aria-label="Open evaluation form in a new tab"
                >
                  🔗 Open in New Tab
                </a>

                {/* Dismiss option */}
                <button
                  className="fb-btn fb-btn-ghost"
                  onClick={() => setDismissed(true)}
                  aria-label="Maybe later, dismiss this widget"
                >
                  Maybe Later
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="fb-footer">
            Takes only 5 minutes &nbsp;·&nbsp; Anonymous
          </div>
        </div>
      )}
    </>
  );
}
