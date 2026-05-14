import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMessages, Message, addMessage } from "@/lib/atsihitany";

export const Route = createFileRoute("/atsihitany_client")({
  component: CitizenChat,
});

function CitizenChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    setMessages(getMessages());

    const interval = setInterval(() => {
      setMessages(getMessages());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
    <div className="flex flex-col h-screen bg-slate-50">
      <div className="p-4 bg-[#3BC1A8] text-white font-bold">
        Atsihitany - Canal Citoyen
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[70%] p-3 rounded-2xl text-sm ${
              m.from === "citizen"
                ? "ml-auto bg-[#3BC1A8] text-white"
                : "mr-auto bg-white border"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="p-3 flex gap-2 border-t bg-white">
        <input
          className="flex-1 border rounded-xl px-3 py-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Écrire une requête..."
        />
        <button
          onClick={sendMessage}
          className="bg-[#3BC1A8] text-white px-4 rounded-xl"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}