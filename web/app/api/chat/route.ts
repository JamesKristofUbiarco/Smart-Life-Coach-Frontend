// web/app/api/chat/route.ts
import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Parse request body
        const body = await req.json();
        const { messages } = body;

        // Validate messages
        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Invalid request format" },
                { status: 400 }
            );
        }

        // Convert UI messages to model messages using AI SDK utility
        const modelMessages = await convertToModelMessages(messages); // await añadido para evitar errores con Promise

        // Check if we have any valid messages
        if (modelMessages.length === 0) {
            return NextResponse.json(
                { error: "No valid messages provided" },
                { status: 400 }
            );
        }

        // Add system prompt to prevent hallucination and guide the model
        const systemPrompt = {
            role: "system" as const,
            content: `# Role: Elite Life Coach & Strategic Goal Architect

Act as a world-class Life Coach and High-Performance Strategist. You specialize in behavioral science, the psychology of achievement, and agile project management applied to personal development. Your mission is to transform [USER_GOAL] into a surgical, realistic, and highly motivating roadmap.

## Core Identity & Tone:
- **Professional & Insightful:** You provide the wisdom of a mentor with the precision of a consultant.
- **Empathetic yet Direct:** You validate the user's ambition but challenge their excuses and lack of clarity.
- **Action-Oriented:** Every piece of advice must be grounded in a "Next Step" logic. Avoid fluff; prioritize execution.

## Operational Framework:
1. **The Diagnostic Phase:** Before building the roadmap, you must assess the user's current status. Ask 3 targeted questions about their:
   - [RESOURCES_AVAILABLE] (Time, money, tools).
   - [PAST_OBSTACLES] (Why haven't they achieved this yet?).
   - [COMMITMENT_LEVEL] (Scale of 1-10).
2. **The SMART+ Mapping:** Define the goal using SMART criteria (Specific, Measurable, Achievable, Relevant, Time-bound) and add a "Stretch Goal" to push their limits.
3. **Phased Roadmap (The Sprint Method):** Break the goal into 3 logical phases:
   - **Phase 1: Foundation (Days 1-7)** - Immediate wins and habit setting.
   - **Phase 2: Momentum (Month 1)** - Scaling efforts and core skill acquisition.
   - **Phase 3: Mastery/Completion (Target Date)** - Refining and finishing.

## Response Structure:
- **Executive Summary:** A 2-sentence vision of why this goal is transformative.
- **The Roadmap Table:** A structured breakdown of phases, milestones, and deadlines.
- **The 24-Hour Kickstart:** One singular, non-negotiable task to complete today.
- **Risk Mitigation:** Identify the top 2 "Success Saboteurs" (e.g., procrastination, burnout) and provide a "If-Then" strategy for each.
- **KPIs (Key Performance Indicators):** 3 metrics the user must track weekly.

## Constraints & Rules:
- If the goal is vague, do not provide a full plan. Instead, guide the user to clarify it first.
- Only provide evidence-based advice (`
        };

        // Prepend system message if not already present
        const hasSystemMessage = modelMessages.some(msg => msg.role === 'system');
        if (!hasSystemMessage) {
            modelMessages.unshift(systemPrompt);
        }

        // Load fine-tuned model ID from environment variable
        // const fineTunedModelId = process.env.FINE_TUNED_MODEL;

        // Ensure we have a valid model ID
        // if (!fineTunedModelId) {
        //     throw new Error("No fine-tuned model ID available");
        // }

        // Call Google Gemini with streaming using the new AI SDK
        const result = streamText({
            model: google('gemini-3-flash-preview'),
            messages: modelMessages,
            temperature: 0.1, // Lower temperature for more deterministic, factual responses
        });

        // Log stream start
        console.log(`Stream started`);

        // Return UI message stream response for useChat compatibility
        return result.toUIMessageStreamResponse({
            headers: {
                "Cache-Control": "no-cache, no-transform",
                "X-Accel-Buffering": "no",
            },
        });
    } catch (error: unknown) {
        console.error("Chat API Error:", error);

        // Handle specific errors
        if (error && typeof error === "object" && "status" in error) {
            const errorWithStatus = error as { status: number };

            if (errorWithStatus.status === 401) {
                return NextResponse.json(
                    {
                        error: "Authentication failed. Check API key configuration.",
                    },
                    { status: 401 }
                );
            }

            if (errorWithStatus.status === 404) {
                return NextResponse.json(
                    {
                        error: "Model not found. Check your fine-tuned model ID.",
                    },
                    { status: 404 }
                );
            }

            if (errorWithStatus.status === 429) {
                return NextResponse.json(
                    {
                        error: "Gemini rate limit reached. Please try again later.",
                    },
                    { status: 429 }
                );
            }
        }

        // Generic error
        return NextResponse.json(
            { error: "An error occurred. Please try again." },
            { status: 500 }
        );
    }}