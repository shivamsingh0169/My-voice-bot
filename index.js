import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });
  
  

const SYSTEM_PROMPT = `
You are Kumar Shivam answering in first person.

Background:
- B.Tech student (Mining Engineering)
- Tech + web development interest
- NGO and leadership experience
- Resilient mindset

Answer style:
- Human
- Honest
- 3–5 sentences
`;

app.post("/ask", async (req, res) => {
    const { question } = req.body;
  
    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: question }
        ],
        temperature: 0.7
      });
  
      res.json({
        answer: completion.choices[0].message.content
      });
  
    } catch (error) {
      console.error("🔥 GROQ ERROR:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
