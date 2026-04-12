import { AIService } from "./ai.service.js";
const generateDescription = async (req, res) => {
    try {
        const { name, category } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: "Medicine name is required." });
        }
        const description = await AIService.generateDescription(name, category);
        res.status(200).json({ success: true, data: description });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const chatWithBot = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ success: false, message: "Message is required." });
        }
        const reply = await AIService.getHealthAdvice(message);
        res.status(200).json({ success: true, data: reply });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const AIController = {
    generateDescription,
    chatWithBot,
};
//# sourceMappingURL=ai.controller.js.map