import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Brain, Sparkles, User } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import StreamingText from '../components/StreamingText';
import { useApp } from '../lib/store';
import { chatWithAI } from '../lib/ai';

const SUGGESTED_QUESTIONS = [
  'Why do I eat when I\'m bored?',
  'Why do I crave sugar when stressed?',
  'How can I eat healthier?',
  'What are my worst eating patterns?',
  'Why do I eat differently when alone?',
  'How do I break the stress-eating cycle?',
];

export default function AIChat() {
  const { chatMessages, addChatMessage, updateLastChat, entries } = useApp();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  const handleSend = async (text = input) => {
    if (!text.trim() || isTyping) return;

    const userMessage = { role: 'user', content: text.trim() };
    addChatMessage(userMessage);
    setInput('');
    setIsTyping(true);

    // Add placeholder AI message
    addChatMessage({ role: 'ai', content: '', isStreaming: true });

    try {
      const response = await chatWithAI(
        text.trim(),
        [...chatMessages, userMessage],
        entries
      );
      updateLastChat({ content: response, isStreaming: false });
    } catch (err) {
      updateLastChat({
        content: 'I had trouble processing that. Could you rephrase your question?',
        isStreaming: false,
      });
    }
    setIsTyping(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasMessages = chatMessages.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container pt-24 pb-4 px-4 flex flex-col"
      style={{ height: '100vh' }}
    >
      <div className="max-w-3xl mx-auto flex flex-col flex-1 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex-shrink-0"
        >
          <h1 className="font-display text-2xl sm:text-3xl font-bold flex items-center gap-3">
            <div className="relative">
              <Brain className="w-8 h-8 text-neuro-accent" />
              <div className="absolute inset-0 bg-neuro-accent/20 rounded-full blur-lg animate-pulse-glow" />
            </div>
            AI Food <span className="gradient-text">Psychologist</span>
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Ask me anything about your eating patterns, emotional triggers, or behavioral change
          </p>
        </motion.div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pb-4 min-h-0">
          {!hasMessages && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="relative mb-6">
                <Sparkles className="w-16 h-16 text-neuro-accent/30" />
                <div className="absolute inset-0 bg-neuro-accent/10 rounded-full blur-2xl" />
              </div>
              <h2 className="font-display text-xl font-semibold mb-2 text-white/80">
                Start a Conversation
              </h2>
              <p className="text-sm text-white/40 text-center max-w-md mb-8">
                I&apos;ve analyzed your 7-day eating history. Ask me about your
                patterns, triggers, or how to build better habits.
              </p>

              {/* Suggested Questions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg w-full">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <motion.button
                    key={q}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    onClick={() => handleSend(q)}
                    className="glass glass-hover text-left px-4 py-3 text-sm text-white/50 hover:text-white/80 transition-all duration-300"
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {chatMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
            >
              {msg.role === 'ai' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neuro-accent/10 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-neuro-accent" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-neuro-accent/10 border border-neuro-accent/15 text-white'
                    : 'glass text-white/80'
                }`}
              >
                {msg.role === 'ai' && msg.content ? (
                  <StreamingText
                    text={msg.content}
                    speed={15}
                    showThinking={msg.isStreaming}
                    className="text-sm leading-relaxed"
                  />
                ) : msg.role === 'ai' && !msg.content ? (
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(j => (
                        <div
                          key={j}
                          className="w-2 h-2 rounded-full bg-neuro-accent"
                          style={{
                            animation: `pulse-glow 1.4s ease-in-out ${j * 0.2}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-white/40 animate-pulse">
                      Thinking...
                    </span>
                  </div>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neuro-purple/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-neuro-purple" />
                </div>
              )}
            </motion.div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="flex-shrink-0 py-3">
          <div className="glass-strong flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-white/[0.06] focus-within:border-neuro-accent/25 transition-all duration-300">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your eating patterns..."
              disabled={isTyping}
              className="flex-1 bg-transparent text-white placeholder-white/30 focus:outline-none text-sm py-1 disabled:opacity-50"
              autoFocus
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="p-2 rounded-xl bg-gradient-to-r from-neuro-accent to-neuro-purple text-white disabled:opacity-30 hover:shadow-lg hover:shadow-neuro-accent/15 transition-all duration-300"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-center text-xs text-white/20 mt-2">
            NeuroBite AI uses food psychology research to understand your patterns
          </p>
        </div>
      </div>
    </motion.div>
  );
}
