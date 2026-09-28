import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is missing in your .env.local file." },
        { status: 500 }
      );
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON format in request body." },
        { status: 400 }
      );
    }

    const { inputText, vibe, modificationPrompt, previousOutput } = body;

    if (!inputText && !modificationPrompt) {
      return NextResponse.json(
        { error: "Input text or modification prompt is required." },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    // 1. Fetch currently active models dynamically from your Groq account
    let activeModel = "openai/gpt-oss-20b";
    try {
      const modelsList = await openai.models.list();
      const modelIds = modelsList.data.map((m) => m.id);

      // Preferred active candidates in order
      const preferredCandidates = [
        "openai/gpt-oss-20b",
        "openai/gpt-oss-120b",
        "qwen/qwen3.8-27b",
      ];

      const matched = preferredCandidates.find((cand) => modelIds.includes(cand));
      if (matched) {
        activeModel = matched;
      } else if (modelIds.length > 0) {
        // Fallback to the first available text model if none of the above match
        const textModel = modelIds.find((id) => !id.includes("whisper") && !id.includes("guard"));
        if (textModel) activeModel = textModel;
      }
    } catch (err) {
      console.warn("Could not fetch models dynamically, defaulting to openai/gpt-oss-20b:", err);
    }

    const systemPrompt = `
You are an elite modern social media growth strategist.
Generate 3 high-performing social media posts matching tone style: "${vibe || "Pattern Interrupt"}".

Strict Output Requirement:
You MUST respond with a valid JSON object matching this exact key structure:
{
  "linkedin": "Formatted LinkedIn post text",
  "twitter": "Formatted Twitter post text",
  "instagram": "Formatted Instagram post text"
}
`;

    const userContent = modificationPrompt && previousOutput
      ? `Original context: ${inputText}\nPrevious outputs: ${JSON.stringify(previousOutput)}\nUser modification request: "${modificationPrompt}". Please update all 3 posts according to this instruction.`
      : `Transform this raw content into 3 viral social media posts:\n\n${inputText}`;

    // 2. Generate content using the verified active model ID
    const completion = await openai.chat.completions.create({
      model: activeModel,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
      response_format: { type: "json_object" },
    });

    const responseText = completion.choices[0]?.message?.content || "";

    if (!responseText) {
      return NextResponse.json(
        { error: "Failed to generate content. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(JSON.parse(responseText));

  } catch (error: any) {
    console.error("GROQ BACKEND ERROR:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error occurred." },
      { status: 500 }
    );
  }
}