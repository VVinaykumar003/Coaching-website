import React, { useState } from 'react';

const AIStudyPartner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([
    { sender: 'ai', text: "Hi there! I'm your AI Study Partner. What can I help you learn today?" }
  ]);

  const suggestions = [
    "When is my next mock test?",
    "Explain Gauss's Law derivation",
    "Practice problems for Differentiation",
    "What are the most important NEET topics?"
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // 1. Add User Message
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInputValue('');
    setIsThinking(true);

    // 2. Simulate AI "Thinking" and Response
    setTimeout(() => {
      setIsThinking(false);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: `Here is the information you requested regarding "${text}". Let me know if you need me to break it down further!` }
      ]);
    }, 1800);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans">
      {/* Floating Action Button (Closed State) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-circle btn-lg btn-primary shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-105 transition-transform duration-300"
          aria-label="Open AI Study Partner"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
          </svg>
        </button>
      )}

      {/* Chat Window (Open State) */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[400px] h-[550px] bg-base-100 rounded-[24px] shadow-2xl flex flex-col border border-base-200 overflow-hidden animate-fade-in-up origin-bottom-right transition-all">
          
          {/* Header */}
          <div className="bg-primary text-primary-content p-4 flex justify-between items-center shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0112 2.753a3.375 3.375 0 015.432 3.997h3.193c1.036 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 100-3.75H9.375zM12.75 12.75h7.875a1.875 1.875 0 011.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5zM3.375 12.75h7.875v4.5H3.375A1.875 1.875 0 011.5 15.375v-.75c0-1.036.84-1.875 1.875-1.875z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight text-base-100">AI Mentor</h3>
                <p className="text-xs opacity-80">Online & ready to help</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="btn btn-sm btn-circle btn-ghost text-primary-content hover:bg-white/20" aria-label="Close Chat">
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-base-200/50 flex flex-col gap-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat ${msg.sender === 'user' ? 'chat-end' : 'chat-start'}`}>
                <div className={`chat-bubble ${msg.sender === 'user' ? 'chat-bubble-primary text-primary-content' : 'chat-bubble-base-100 bg-base-100 text-base-content shadow-sm border border-base-200'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* "Thinking" Micro-Animation State */}
            {isThinking && (
              <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-base-100 bg-base-100 shadow-sm border border-base-200 flex items-center gap-1.5 h-12 px-4">
                  <div className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Questions Pills (Only visible when AI is not thinking to prevent mis-clicks) */}
          {!isThinking && (
            <div className="px-4 py-3 bg-base-200/30 flex gap-2 overflow-x-auto whitespace-nowrap border-t border-base-200 custom-scrollbar">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion)}
                  className="btn btn-sm btn-outline btn-primary rounded-full text-xs hover:scale-105 transition-transform"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-base-100 border-t border-base-200">
            <form onSubmit={(e: React.FormEvent) => { e.preventDefault(); handleSend(inputValue); }} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything..."
                className="input input-bordered w-full rounded-full focus:outline-primary min-h-[44px]"
                disabled={isThinking}
              />
              <button
                type="submit"
                disabled={isThinking || !inputValue.trim()}
                className="btn btn-circle btn-primary min-h-[44px] min-w-[44px] shadow-md disabled:bg-base-300 disabled:text-base-content/30"
                aria-label="Send Message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -mr-1">
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIStudyPartner;