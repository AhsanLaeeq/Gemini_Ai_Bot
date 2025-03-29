import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ API Key is missing. Check your .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: ["text"], // Ensure it generates text responses
    responseMimeType: "text/plain",
};

async function run(prompt) {
    try {
        console.log("📡 Sending request with prompt:", prompt);
        
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);

        // Check if response exists
        if (result?.response) {
            const response = await result.response.text();
            
            console.log("💬 Response Text:", response);
            return response;
        } else {
            console.error("⚠️ No response text received!");
        }
    } catch (error) {
        console.error("❌ API Request Failed:", error);
    }
}

export default run;
