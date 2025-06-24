import { useState } from "react";
import sendIC from '../assets/Images/send.png';
import Logo from '../assets/Images/robot.png';
import user from '../assets/Images/user.png';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      message: "What's up! 🔥 I'm Preee, your AI companion powered by Mistral AI. Ready to tackle anything you throw at me!",
      role: 'ai'
    }
  ]);
  const [userInput, setUserInput] = useState('');

  async function sendMessage() {
    if (userInput.trim() === '') return;

    // Add user message
    const newUserMsg = { role: 'user', message: userInput };
    const updatedMessages = [...messages, newUserMsg];

    // Add loading placeholder
    setMessages([...updatedMessages, { role: 'ai', message: '...' }]);
    setUserInput('');

    try {
      const token = import.meta.env.VITE_GITHUB_TOKEN;
      const endpoint = "https://models.github.ai/inference";
      const model = "mistral-ai/mistral-medium-2505";

      const response = await fetch(`${endpoint}/chat/completions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", 
              content: `
              You are a helpful and friendly AI assistant named Pree. 
              - Always address the user as "Pre" in your replies (e.g., "Sure, Pre," or "I'm sorry, Pre, but..."). 
              - If the user says exactly "Pre", "Pree", or "Preeee", reply with: "Say Katag diha Pree?".
              - For all other inputs, answer naturally and informatively on any topic.
              - Keep the tone polite, clear, and engaging.
              - Avoid answering questions about illegal or harmful activities.
              `
            },
            { role: "user", content: userInput }
          ],
          temperature: 1,
          max_tokens: 2048,
          top_p: 1
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const reply = data.choices?.[0]?.message?.content || "No response";

      // Replace loading with AI reply
      setMessages([...updatedMessages, { role: 'ai', message: reply }]);
    } catch (error) {
      console.error("Error fetching GitHub AI:", error);
      setMessages([...updatedMessages, { role: 'ai', message: "I'm really sorry Pre, but I can't answer that question right now." }]);
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center p-5">
      <div className="rounded-md p-1 w-full md:w-[60%] min-h-60 max-h-130 overflow-auto">
        <div className="flex flex-col w-full space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "self-end flex-row-reverse" : "self-start"
              } items-start gap-1`}
            >
              <img
                src={msg.role === "user" ? user : Logo}
                className="w-8 mt-1.5"
                alt=""
              />
              <div
                className={`${
                  msg.role === "user" ? "text-white" : "text-accent"
                } bg-neutral p-3 rounded-xl max-w-lg`}
              >
                {msg.message === "..." ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  msg.message
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 w-full md:w-[60%] flex items-center justify-between gap-3">
        <input
          type="text"
          placeholder="Ask something..."
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          value={userInput}
          className="placeholder:text-white text-white bg-neutral w-full rounded-lg p-3 outline-0"
        />
        <button
          onClick={sendMessage}
          className="bg-neutral rounded-lg py-3 px-7"
        >
          <img src={sendIC} className="w-7" alt="" />
        </button>
      </div>
    </div>
  );
}
