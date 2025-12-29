import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, ArrowLeft, MessageCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useState } from 'react';
import ChatAgent from '../components/ui/ChatAgent';

const Results = () => {
    const location = useLocation();
    const { result, inputData } = location.state || {}; // Default to empty if accessed directly

    if (!result) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800">No Data Found</h2>
                    <Link to="/symptom-input" className="text-primary hover:underline mt-2 inline-block">Go back to Input</Link>
                </div>
            </div>
        )
    }

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

    const [isChatOpen, setIsChatOpen] = useState(false);

    // Animation Variants
    const cardVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link to="/symptom-input" className="p-2 rounded-full hover:bg-white transition-colors">
                        <ArrowLeft className="text-slate-600" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Prediction Results</h1>
                        <p className="text-slate-500 text-sm">Based on {inputData.symptoms.length} symptoms provided.</p>
                    </div>
                </div>

                {/* Risk Alert Card */}
                <motion.div
                    initial="hidden" animate="visible" variants={cardVariant}
                    className={`p-6 rounded-2xl border-l-8 shadow-sm ${result.riskLevel === 'High' ? 'bg-red-50 border-red-500 text-red-900' :
                        result.riskLevel === 'Moderate' ? 'bg-yellow-50 border-yellow-500 text-yellow-900' :
                            'bg-green-50 border-green-500 text-green-900'
                        }`}
                >
                    <div className="flex items-start gap-4">
                        <AlertTriangle className="h-8 w-8 shrink-0 opacity-80" />
                        <div>
                            <h3 className="text-xl font-bold uppercase tracking-wide">{result.riskLevel} Risk Detected</h3>
                            <p className="mt-1 opacity-90 text-sm leading-relaxed">
                                Our ML model indicates a <strong>{result.confidence}% confidence</strong> in this assessment.
                                {result.riskLevel === 'High' && " Please consult a doctor immediately."}
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">

                    {/* Top Diseases */}
                    <motion.div
                        initial="hidden" animate="visible" variants={cardVariant}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
                    >
                        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Info className="h-5 w-5 text-primary" /> Potential Conditions
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={result.diseases} layout="vertical" margin={{ left: 40 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                                    <Tooltip cursor={{ fill: 'transparent' }} />
                                    <Bar dataKey="probability" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Chatbot Teaser */}
                    <motion.div
                        initial="hidden" animate="visible" variants={cardVariant}
                        className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-2xl text-white shadow-lg relative overflow-hidden"
                    >
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Confused? Ask AI.</h3>
                                <p className="text-indigo-100 mb-6">Chat with our Medical Logic Agent to understand <b>why</b> you have this risk.</p>
                            </div>
                            <button
                                onClick={() => setIsChatOpen(true)}
                                className="flex items-center justify-center gap-2 bg-white text-indigo-600 py-3 px-6 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg"
                            >
                                <MessageCircle size={20} /> Start Explanation Chat
                            </button>
                        </div>
                        {/* Decorative Circles */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black opacity-10 rounded-full blur-2xl"></div>
                    </motion.div>
                </div>

                {/* Disclaimer */}
                <div className="text-center text-xs text-slate-400 mt-12">
                    Medical Disclaimer: The results provided above are based on machine learning probability models and should not be considered a medical diagnosis.
                </div>

                {/* Chat Agent Modal */}
                <ChatAgent
                    isOpen={isChatOpen}
                    onClose={() => setIsChatOpen(false)}
                    riskLevel={result.riskLevel}
                />
            </div>
        </div>
    );
};

export default Results;
