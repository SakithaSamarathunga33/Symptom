import { useNavigate } from 'react-router-dom';
import { ArrowRight, Activity, Cpu, Map, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const navigate = useNavigate();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 overflow-hidden">
            {/* Hero Section */}
            <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="text-center lg:text-left z-10"
                    >
                        <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            University Research Project
                        </motion.div>

                        <motion.h1 variants={item} className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                            Understand Your Symptoms. <br />
                            <span className="text-primary text-gradient">Predict Risks Early.</span>
                        </motion.h1>

                        <motion.p variants={item} className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            An AI-powered system designed to analyze your health symptoms, predict potential disease risks, and visualize community health trends.
                            <span className="block mt-2 text-sm text-slate-500 italic">*Advisory only. Not a medical diagnosis tool.</span>
                        </motion.p>

                        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button
                                onClick={() => navigate('/symptom-input')}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1"
                            >
                                Check Symptoms <Activity className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-semibold transition-all hover:shadow-md"
                            >
                                How It Works
                            </button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                        <div className="relative glass-card p-8 rounded-3xl border border-white/50 shadow-2xl">
                            <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <ShieldCheck className="text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">Health Status Analysis</h3>
                                    <p className="text-sm text-slate-500">System Ready</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-2 bg-slate-100 rounded-full w-full overflow-hidden">
                                    <div className="h-full bg-primary w-3/4"></div>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Symptom Accuracy</span>
                                    <span className="font-bold text-slate-700">92%</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="bg-slate-50 p-4 rounded-xl text-center">
                                        <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                                        <div className="text-xs text-slate-500">Availability</div>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-xl text-center">
                                        <div className="text-2xl font-bold text-secondary mb-1">0s</div>
                                        <div className="text-xs text-slate-500">Wait Time</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* How it Works / Components */}
            <section id="how-it-works" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Core System Components</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">This research project integrates four key technologies to provide comprehensive health insights.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Activity,
                                title: "Symptom Engine",
                                desc: "Multilingual capability to understand raw symptoms via feature mapping."
                            },
                            {
                                icon: Cpu,
                                title: "Prediction Model",
                                desc: "Machine Learning model aimed at early multi-disease risk prediction."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Risk Agent",
                                desc: "Conversational agent explaining 'Why' behind the risk in friendly terms."
                            },
                            {
                                icon: Map,
                                title: "Geo-Health Map",
                                desc: "Interactive map visualizing real-time district-level health trends."
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all"
                            >
                                <div className="h-12 w-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-primary">
                                    <feature.icon />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-slate-800">{feature.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
