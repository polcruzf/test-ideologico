import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Faltan variables de entorno de Supabase en el servidor.");
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

function normalizeSlugText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function createShortId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  }

  return Math.random().toString(36).slice(2, 10);
}

function createPublicSlug(body: any) {
  const shortId = createShortId();
  const topIdeology = body.ideologyPercentages?.[0]?.ideology ?? "resultado";
  const normalizedTopIdeology = normalizeSlugText(topIdeology) || "resultado";

  return `${shortId}-${normalizedTopIdeology}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      anonymousUserId,
      startedAt,
      completedAt,
      durationSeconds,
      testMode,
      selectedCommunity,
      finalNationalParty,
      finalRegionalParty,
      ideologyPercentages,
      voterType,
      consistency,
      answers,
      questions,
    } = body;

    if (!testMode || !answers || !Array.isArray(questions)) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios para guardar el resultado" },
        { status: 400 }
      );
    }

    let session = null;
    let sessionError = null;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const publicSlug = createPublicSlug(body);

      const insertResult = await supabase
        .from("test_sessions")
        .insert({
          public_slug: publicSlug,

          anonymous_user_id: anonymousUserId ?? null,
          started_at: startedAt ?? null,
          completed_at: completedAt ?? null,
          duration_seconds: durationSeconds ?? null,

          test_mode: testMode,
          community: selectedCommunity,

          national_party: finalNationalParty?.party,
          national_party_percentage: finalNationalParty?.percentage,

          regional_party: finalRegionalParty?.party,
          regional_party_percentage: finalRegionalParty?.percentage,

          voter_type: voterType,
          consistency,

          top_ideologies: ideologyPercentages,
          raw_results: body,
        })
        .select("id, public_slug")
        .single();

      session = insertResult.data;
      sessionError = insertResult.error;

      if (!sessionError && session) break;

      const errorCode = sessionError?.code;
      if (errorCode !== "23505") break;
    }

    if (sessionError || !session) {
      console.error(sessionError);
      return NextResponse.json(
        { error: "Error guardando sesión" },
        { status: 500 }
      );
    }

    const formattedAnswers = questions.map((question: any) => ({
      session_id: session.id,

      question_id: question.id,
      question_text: question.text,
      question_block: question.block,

      answer_value: answers[question.id],

      weights: question.weights,
    }));

    const { error: answersError } = await supabase
      .from("test_answers")
      .insert(formattedAnswers);

    if (answersError) {
      console.error(answersError);
      return NextResponse.json(
        { error: "Sesión guardada, pero error guardando respuestas" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      publicSlug: session.public_slug,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}
