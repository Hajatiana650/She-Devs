import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Message, getMessages, addMessage } from "@/lib/atsihitany";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Bell, Clock, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin-bus/atsihitany")({
  component: AdminChat,
});

function AdminChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [reply, setReply] = useState("");
  const [selectedUserMsg, setSelectedUserMsg] = useState<string | null>(null);

  const PRIMARY = "#3BC1A8";
  const PRIMARY_DARK = "#2fa891";

  const stats = {
    total: messages.length,
    new: messages.filter(
      (m) => m.from === "citizen" && Date.now() - m.createdAt < 3600000
    ).length,
    inProgress:
      messages.filter((m) => m.from === "citizen").length -
      messages.filter((m) => m.from === "admin").length,
    responseRate:
      messages.length > 0
        ? Math.round(
            (messages.filter((m) => m.from === "admin").length /
              messages.length) *
              100
          )
        : 0,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(getMessages());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function sendReply() {
    if (!reply.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      from: "admin",
      text: reply,
      createdAt: Date.now(),
    };

    const updated = addMessage(newMsg);
    setMessages(updated);
    setReply("");
  }

  return (
    <div
      className="flex flex-col h-screen bg-gradient-to-br from-white via-[#f4fffc] to-[#f0f9f6]"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* HEADER */}
      <div
        className="text-white font-semibold px-5 py-4 shadow-lg"
        style={{
          background: PRIMARY,
          borderBottomLeftRadius: "28px",
          borderBottomRightRadius: "28px",
        }}
      >
        Atsihitany - Admin Panel
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        <Card className="rounded-xl border-2 border-[#3BC1A8]/30 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:border-[#3BC1A8]/50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#3BC1A8]/10">
                <MessageSquare className="h-5 w-5 text-[#3BC1A8]" />
              </div>
              <CardTitle className="text-sm font-medium text-slate-700">
                Requêtes Totales
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#3BC1A8]">
              {stats.total}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-2 border-[#3BC1A8]/30 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:border-[#3BC1A8]/50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#3BC1A8]/10">
                <Bell className="h-5 w-5 text-[#3BC1A8]" />
              </div>
              <CardTitle className="text-sm font-medium text-slate-700">
                Nouvelles
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#3BC1A8]">
              {stats.new}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-2 border-[#3BC1A8]/30 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:border-[#3BC1A8]/50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#3BC1A8]/10">
                <Clock className="h-5 w-5 text-[#3BC1A8]" />
              </div>
              <CardTitle className="text-sm font-medium text-slate-700">
                En Cours
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#3BC1A8]">
              {stats.inProgress}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-2 border-[#3BC1A8]/30 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:border-[#3BC1A8]/50">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#3BC1A8]/10">
                <TrendingUp className="h-5 w-5 text-[#3BC1A8]" />
              </div>
              <CardTitle className="text-sm font-medium text-slate-700">
                Taux Réponse
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#3BC1A8]">
              {stats.responseRate}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CHAT */}
      <div className="flex-1 flex flex-col border-t border-[#3BC1A8]/15">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.from === "admin" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                onClick={() => setSelectedUserMsg(m.id)}
                className={`
                  max-w-[70%]
                  px-4 py-3
                  text-sm
                  leading-relaxed
                  break-words
                  whitespace-pre-wrap
                  shadow-md
                  cursor-pointer
                  transition-all duration-200
                  rounded-2xl
                  ${
                    m.from === "admin"
                      ? "text-white rounded-br-md hover:shadow-lg"
                      : "bg-white text-slate-900 border border-[#3BC1A8]/30 rounded-bl-md hover:border-[#3BC1A8]/60"
                  }
                `}
                style={{
                  background: m.from === "admin" ? PRIMARY : undefined,
                  boxShadow:
                    m.from === "admin"
                      ? `0 4px 12px rgba(59, 193, 168, 0.25)`
                      : "0 2px 8px rgba(0, 0, 0, 0.08)",
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div
          className="p-4 border-t border-[#3BC1A8]/20 bg-white flex gap-2"
          style={{
            
            
          }}
        >
          <input
            className="flex-1 border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none transition focus:border-[#3BC1A8] placeholder:text-slate-400"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Répondre à la population..."
            style={{
              boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          />

          <button
            onClick={sendReply}
            className="px-6 rounded-2xl text-white font-medium transition active:scale-95 hover:brightness-110 shadow-md"
            style={{
              background: PRIMARY,
              boxShadow: "0 4px 12px rgba(59, 193, 168, 0.3)",
            }}
          >
            Répondre
          </button>
        </div>
      </div>
    </div>
  );
}