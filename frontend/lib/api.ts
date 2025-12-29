export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://symptom-backend-cws5.onrender.com";

export const fetcher = async (url: string, options: RequestInit = {}) => {
    const res = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "An error occurred");
    }

    return res.json();
};
