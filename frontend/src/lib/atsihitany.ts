export type Message = {
  id: string;
  from: "citizen" | "admin";
  text: string;
  createdAt: number;
};

const KEY = "atsihitany_messages";

export function getMessages(): Message[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function saveMessages(messages: Message[]) {
  localStorage.setItem(KEY, JSON.stringify(messages));
}

export function addMessage(message: Message) {
  const messages = getMessages();
  messages.push(message);
  saveMessages(messages);
  return messages;
}