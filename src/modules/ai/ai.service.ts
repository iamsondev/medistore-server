import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY?.trim();
if (!apiKey) {
  console.warn("GROQ_API_KEY is not defined in the environment variables. AI features will not work.");
}

const groq = new Groq({
  apiKey: apiKey || "dummy_key",
});

const generateDescription = async (medicineName: string, categoryName?: string) => {
  if (!apiKey) throw new Error("GROQ_API_KEY is missing. Please check your .env file.");
  
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Act as an expert clinical pharmacist and copywriter. Provide factual, concise medical descriptions. Format as plain text with bold labels. Limit to 150 words.",
        },
        {
          role: "user",
          content: `Write a professional description for a medicine named "${medicineName}" ${categoryName ? `in the category "${categoryName}"` : ""}. Include: Description, Uses, Dosage, and Side Effects.`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    return chatCompletion.choices[0]?.message?.content || "No description generated.";
  } catch (err: any) {
    console.error("Groq AI Error:", err?.message || err);
    throw new Error("Failed to generate description via Groq.");
  }
};

const checkReviewToxicity = async (reviewText: string): Promise<boolean> => {
  if (!apiKey) return false;
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: 'Analyze reviews for toxicity. Reply with ONLY "TOXIC" or "SAFE".',
        },
        {
          role: "user",
          content: `Analyze this review: "${reviewText}"`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const result = chatCompletion.choices[0]?.message?.content?.trim().toUpperCase();
    return result?.includes("TOXIC") || false;
  } catch (err) {
    console.error("Groq Toxicity Check Error:", err);
    return false;
  }
};

const getHealthAdvice = async (userMessage: string) => {
  if (!apiKey) throw new Error("GROQ_API_KEY is missing.");
  
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: 'You are "MediBot", a helpful virtual health assistant for "Medistore". Keep responses under 60 words and always advise to consult a doctor.',
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    return chatCompletion.choices[0]?.message?.content || "I am here to help!";
  } catch (err: any) {
    console.error("Groq Chat Error:", err?.message || err);
    throw new Error(`Groq Error: ${err?.message || "Something went wrong"}`);
  }
};

export const AIService = {
  generateDescription,
  checkReviewToxicity,
  getHealthAdvice,
};
