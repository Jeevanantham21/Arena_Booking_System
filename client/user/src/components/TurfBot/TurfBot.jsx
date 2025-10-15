import React, { useState, useRef, useEffect } from "react";

const TurfBot = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "👋 Hi! I'm TurfBot, your AI assistant for turf bookings. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = {
    booking: {
      keywords: ["book", "booking", "reserve", "slot", "available"],
      response:
        "🏟️ To book a turf:\n1. Select your preferred date and time\n2. Choose the turf type\n3. Complete payment via Razorpay\n4. Receive confirmation via SMS/email\n\nWould you like me to check availability?",
    },
    cancel: {
      keywords: ["cancel", "cancellation", "refund"],
      response:
        "❌ Cancellation Policy:\n• Free cancellation up to 2 hrs before slot\n• 50% refund within 2 hrs\n• No refund for no-shows\n\nGo to 'My Bookings' → Cancel.",
    },
    payment: {
      keywords: ["payment", "razorpay", "pay", "transaction"],
      response:
        "💳 Payment Info:\n• Supports UPI, Cards, Net Banking\n• Secure via Razorpay\n• Instant confirmation\n• Encrypted transactions",
    },
    contact: {
      keywords: ["contact", "help", "support", "phone"],
      response:
        "📞 Support:\n• Phone: +91-9876543210\n• Email: support@turfbooking.com\n• Hours: 6 AM - 11 PM",
    },
    default:
      "I can help with bookings, cancellations, payments, and support. Try asking: 'How do I book a slot?'",
  };

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    for (const [key, config] of Object.entries(botResponses)) {
      if (key !== "default" && config.keywords?.some((kw) => msg.includes(kw))) {
        return config.response;
      }
    }
    return botResponses.default;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);

    setInputText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 btn btn-circle btn-primary shadow-lg z-50"
      >
        🤖
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 card bg-base-100 shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="card-body p-4 bg-primary text-primary-content rounded-t-2xl flex-none">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">TurfBot</h3>
          <button onClick={onToggle} className="btn btn-ghost btn-sm btn-circle">
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat ${msg.sender === "user" ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-bubble text-sm whitespace-pre-line">
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t flex-none flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me about bookings..."
          className="input input-bordered flex-1"
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputText.trim()}
          className="btn btn-primary"
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default TurfBot;
