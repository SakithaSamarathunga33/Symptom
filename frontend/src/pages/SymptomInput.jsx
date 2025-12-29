import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, AlertCircle, Check } from 'lucide-react';
import { mockPredictRisk } from '../utils/helpers';

const SymptomInput = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        symptoms: [],
        age: '',
        gender: '',
        duration: '',
        district: ''
    });

    const commonSymptoms = [
        "fever", "cough", "headache", "chest_pain", "fatigue",
        "nausea", "dizziness", "shortness_of_breath", "joint_pain"
    ];

    const handleSymptomToggle = (sym) => {
        setFormData(prev => ({
            ...prev,
            symptoms: prev.symptoms.includes(sym)
                ? prev.symptoms.filter(s => s !== sym)
                : [...prev.symptoms, sym]
        }));
    };

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSubmit = async () => {
        setLoading(true);
        // Simulate processing
        try {
            const result = await mockPredictRisk(formData.symptoms, parseInt(formData.age), formData.gender);
            // In a real app, use Context or State Management to pass data
            // For this demo, we'll navigate and pass state via router
            navigate('/results', { state: { result, inputData: formData } });
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-12 bg-slate-50">
            <div className="max-w-2xl mx-auto px-4">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-xs font-semibold uppercase text-slate-400 mb-2">
                        <span className={step >= 1 ? "text-primary" : ""}>Symptoms</span>
                        <span className={step >= 2 ? "text-primary" : ""}>Details</span>
                        <span className={step >= 3 ? "text-primary" : ""}>Region</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / 3) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-6 md:p-10"
                >
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
                            <h3 className="text-xl font-bold text-slate-800 animate-pulse">Analyzing Symptoms...</h3>
                            <p className="text-slate-500 mt-2">Running ML Prediction Model</p>
                        </div>
                    ) : (
                        <>
                            {step === 1 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-slate-800">What are your symptoms?</h2>
                                    <p className="text-slate-500 text-sm">Select all that apply.</p>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {commonSymptoms.map(sym => (
                                            <button
                                                key={sym}
                                                onClick={() => handleSymptomToggle(sym)}
                                                className={`p-3 rounded-xl border text-sm font-medium transition-all ${formData.symptoms.includes(sym)
                                                        ? 'border-primary bg-primary/5 text-primary shadow-sm'
                                                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    {sym.replace(/_/g, ' ')}
                                                    {formData.symptoms.includes(sym) && <Check size={16} />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button
                                            onClick={handleNext}
                                            disabled={formData.symptoms.length === 0}
                                            className="flex items-center gap-2 bg-primary disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors"
                                        >
                                            Next Step <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-slate-800">Basic Information</h2>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                                            <input
                                                type="number"
                                                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                placeholder="e.g. 25"
                                                value={formData.age}
                                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                                            <select
                                                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                                value={formData.gender}
                                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="scy-fi">Non-binary</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Duration of Symptoms</label>
                                            <select
                                                className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                                value={formData.duration}
                                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            >
                                                <option value="">Select Duration</option>
                                                <option value="1">Less than 24 hours</option>
                                                <option value="3">1-3 Days</option>
                                                <option value="7">One Week</option>
                                                <option value="14">More than a week</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-4">
                                        <button onClick={handleBack} className="text-slate-500 font-medium hover:text-slate-800 px-4">Back</button>
                                        <button
                                            onClick={handleNext}
                                            disabled={!formData.age || !formData.gender || !formData.duration}
                                            className="flex items-center gap-2 bg-primary disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors"
                                        >
                                            Next Step <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-slate-800">Region</h2>
                                    <p className="text-slate-500 text-sm">Used for anonymous community health mapping.</p>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">District</label>
                                        <select
                                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                            value={formData.district}
                                            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                        >
                                            <option value="">Select District</option>
                                            <option value="colombo">Colombo</option>
                                            <option value="gampaha">Gampaha</option>
                                            <option value="kandy">Kandy</option>
                                            <option value="galle">Galle</option>
                                            <option value="jaffna">Jaffna</option>
                                        </select>
                                    </div>

                                    <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex gap-3 text-sm text-yellow-800">
                                        <AlertCircle className="shrink-0 h-5 w-5 text-yellow-600" />
                                        <p>All data is anonymized. We do not store your exact location or personal identity.</p>
                                    </div>

                                    <div className="flex justify-between pt-4">
                                        <button onClick={handleBack} className="text-slate-500 font-medium hover:text-slate-800 px-4">Back</button>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!formData.district}
                                            className="flex items-center gap-2 bg-primary disabled:opacity-50 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-dark shadow-lg shadow-primary/25 transition-all"
                                        >
                                            See Predictions
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default SymptomInput;
