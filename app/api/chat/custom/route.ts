import { Database } from "@/supabase/types"
import { ChatSettings } from "@/types"
import { createClient } from "@supabase/supabase-js"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { ServerRuntime } from "next"
import OpenAI from "openai"
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs"

export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
   const json = await request.json();
  const { messages } = json;

  try {
    const response = await fetch('https://https://alinagobbi.app.n8n.cloud/webhook/0002d066-e5ac-49f7-a8de-fc29048c1bf7/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    const data = await response.json();

    // Assumes n8n returns: { reply: "Hello!" }
    const reply = data.reply || "Sorry, something went wrong.";

    return new Response(
      JSON.stringify({ message: reply }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error("n8n request failed", error);
    return new Response(
      JSON.stringify({ message: "Failed to reach AI agent." }),
      { status: 500 }
    );
  }
}
