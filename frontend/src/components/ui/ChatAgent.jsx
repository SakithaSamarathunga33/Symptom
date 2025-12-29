import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const descriptions = {
    'High': "Our analysis suggests a high probability of cardiovascular issues based on the combination of chest pain and your age group. This is strictly a statistical pattern match.",
    'Moderate': "Your symptoms overlap significantly with viral infections common in your region. The fever and cough are key indicators.",
    'Low': "Your symptoms appear to be non-specific and may be related to general fatigue or stress."
};

const ChatAgent = ({ isOpen, onClose, riskLevel = 'Moderate' }) => {
    const [messages, setMessages] = useState([
        { role: 'bot', text: `Hello! I see your results indicate a ${riskLevel} risk level. Do you have any questions about this assessment?` }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        // Simple rule-based logic
        setTimeout(() => {
            let botResponse = "I'm not sure about that, but relying on professional medical advice is always best.";
            const lowerInput = userMsg.toLowerCase();

            if (lowerInput.includes('why') || lowerInput.includes('reason')) {
                botResponse = descriptions[riskLevel] || descriptions['Moderate'];
            } else if (lowerInput.includes('test') || lowerInput.includes('do')) {
                botResponse = "Common tests for these symptoms include a Full Blood Count (FBC) and checking blood pressure. A doctor can confirm what is necessary.";
            } else if (lowerInput.includes('worry') || lowerInput.includes('scared')) {
                botResponse = "It's natural to be concerned, but remember this is just a screening tool. A doctor can provide a definitive diagnosis and treatment plan.";
            } else if (lowerInput.includes('thank')) {
                botResponse = "You're welcome! Stay safe and healthy.";
            }

            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2000] flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[600px]"
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <Bot className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold">Risk Explanation Agent</h3>
                                    <p className="text-xs text-blue-100">AI Health Assistant</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                            ? 'bg-primary text-white rounded-tr-none'
                                            : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-gray-100 bg-white">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="flex-1 border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder="Ask why..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <button
                                    onClick={handleSend}
                                    className="bg-primary text-white p-2 rounded-xl hover:bg-primary-dark transition-colors"
                                >
                                    <Send className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ChatAgent;
