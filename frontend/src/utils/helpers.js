import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Mock ML Prediction Service
export const mockPredictRisk = (symptoms, age, gender) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simple rule-based mock logic
            const hasChestPain = symptoms.includes('chest_pain');
            const hasFever = symptoms.includes('fever');
            const hasCough = symptoms.includes('cough');

            let riskLevel = 'Low';
            let confidence = 85;
            let diseases = [];

            if (hasChestPain && age > 40) {
                riskLevel = 'High';
                diseases.push({ name: 'Coronary Artery Disease', probability: 78 });
                diseases.push({ name: 'Hypertension', probability: 45 });
            } else if (hasFever && hasCough) {
                riskLevel = 'Moderate';
                diseases.push({ name: 'Viral Influenza', probability: 92 });
                diseases.push({ name: 'Pneumonia', probability: 30 });
            } else {
                diseases.push({ name: 'General Fatigue', probability: 60 });
            }

            resolve({
                riskLevel,
                confidence,
                diseases,
                timestamp: new Date().toISOString()
            });
        }, 2000); // Simulate processing delay
    });
};
