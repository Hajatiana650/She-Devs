import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { getMessages, Message, addMessage } from "@/lib/atsihitany";

export const Route = createFileRoute("/app/atsihitany")({
  component: CitizenChat,
});

function CitizenChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const PRIMARY = "#3BC1A8";

  useEffect(() => {
    setMessages(getMessages());

    const interval = setInterval(() => {
      setMessages(getMessages());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  function sendMessage() {
    if (!text.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      from: "citizen",
      text,
      createdAt: Date.now(),
    };

    const updated = addMessage(newMsg);

    setMessages(updated);
    setText("");
  }

  return (
    <div
      className="flex h-screen flex-col bg-white"
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        className="px-6 py-5 text-white"
        style={{
          background: PRIMARY,
        }}
      >
        <h1 className="text-lg font-semibold">
          Atsihitany — Canal Citoyen
        </h1>

        <p className="mt-1 text-xs text-white/80">
          Envoyez vos requêtes en français ou en malgache
        </p>
      </div>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-white">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${
              m.from === "citizen"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm break-words whitespace-pre-wrap ${
                m.from === "citizen"
                  ? "text-white rounded-br-md"
                  : "text-slate-800 rounded-bl-md border"
              }`}
              style={{
                background:
                  m.from === "citizen"
                    ? PRIMARY
                    : "#ffffff",
                borderColor:
                  m.from === "citizen"
                    ? PRIMARY
                    : "#3BC1A8",
              }}
            >
              {m.text}

              <div
                className={`mt-2 text-[10px] ${
                  m.from === "citizen"
                    ? "text-right text-white/80"
                    : "text-left text-slate-500"
                }`}
              >
                {new Date(m.createdAt).toLocaleTimeString(
                  "fr-FR",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </div>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div
        className="border-t bg-white p-4"
        style={{
          borderColor: PRIMARY,
        }}
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && sendMessage()
            }
            placeholder="Écrivez votre message..."
            className="flex-1 rounded-xl border px-4 py-3 text-sm focus:outline-none"
            style={{
              borderColor: PRIMARY,
            }}
          />

          <button
            onClick={sendMessage}
            className="rounded-xl px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            style={{
              background: PRIMARY,
            }}
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}