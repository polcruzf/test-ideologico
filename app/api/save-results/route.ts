import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Faltan variables de entorno de Supabase en el servidor.");
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

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

    const { data: session, error: sessionError } = await supabase
      .from("test_sessions")
      .insert({
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
      .select("id")
      .single();

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
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}
