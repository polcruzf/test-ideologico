"use client";

import { useMemo, useState } from "react";
import {
  answerOptions,
  blockLabels,
  ideologicalQuestions,
  ideologyLabels,
  partyProfiles,
} from "./testData";
import "./test-ideologico.css";

type Answers = Record<number, number>;

type IdeologyResult = {
  ideology: string;
  percentage: number;
};

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function calculateResults(answers: Answers) {
  const ideologyScore: Record<string, number> = {};
  const ideologyMax: Record<string, number> = {};
  const blockScore: Record<string, Record<string, number>> = {};
  const blockMax: Record<string, Record<string, number>> = {};

  ideologicalQuestions.forEach((question) => {
    const answer = answers[question.id];

    if (answer === undefined) return;

    if (!blockScore[question.block]) blockScore[question.block] = {};
    if (!blockMax[question.block]) blockMax[question.block] = {};

    Object.entries(question.weights).forEach(([ideology, weight]) => {
      const points = answer * weight;
      const maxPoints = Math.abs(weight * 2);

      ideologyScore[ideology] = (ideologyScore[ideology] || 0) + points;
      ideologyMax[ideology] = (ideologyMax[ideology] || 0) + maxPoints;

      blockScore[question.block][ideology] =
        (blockScore[question.block][ideology] || 0) + points;

      blockMax[question.block][ideology] =
        (blockMax[question.block][ideology] || 0) + maxPoints;
    });
  });

  const ideologyPercentages: IdeologyResult[] = Object.entries(ideologyMax)
    .map(([ideology, max]) => {
      const score = ideologyScore[ideology] || 0;
      const percentage = Math.round(((score + max) / (max * 2)) * 100);

      return {
        ideology,
        percentage: clamp(percentage),
      };
    })
    .sort((a, b) => b.percentage - a.percentage);

  const blockResults = Object.entries(blockScore).map(([block, scores]) => {
    const ideologies = Object.entries(scores)
      .map(([ideology, score]) => {
        const max = blockMax[block]?.[ideology] || 1;
        const percentage = Math.round(((score + max) / (max * 2)) * 100);

        return {
          ideology,
          percentage: clamp(percentage),
        };
      })
      .sort((a, b) => b.percentage - a.percentage);

    return {
      block,
      ideologies: ideologies.slice(0, 6),
      party: findClosestParty(ideologies),
    };
  });

  return {
    ideologyPercentages,
    blockResults,
    finalParty: findClosestParty(ideologyPercentages),
  };
}

function findClosestParty(userProfile: IdeologyResult[]) {
  let bestParty = "";
  let bestDistance = Infinity;

  Object.entries(partyProfiles).forEach(([party, profile]) => {
    let distance = 0;

    userProfile.forEach((item) => {
      const expected = profile[item.ideology] ?? 50;
      distance += Math.abs(item.percentage - expected);
    });

    if (distance < bestDistance) {
      bestDistance = distance;
      bestParty = party;
    }
  });

  return bestParty;
}

export default function IdeologicalTestPage() {
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => calculateResults(answers), [answers]);

  const totalQuestions = ideologicalQuestions.length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = Math.round((answeredQuestions / totalQuestions) * 100);

  return (
    <main className="ideology-test">
      <header className="ideology-test__header">
        <h1>Test ideológico</h1>
        <p>
          Responde las {totalQuestions} preguntas para obtener un resultado
          ideológico general, un resultado por bloques y el partido político
          más cercano en cada bloque.
        </p>

        <div className="progress">
          <div className="progress__bar">
            <span style={{ width: `${progress}%` }} />
          </div>
          <p>
            {answeredQuestions}/{totalQuestions} preguntas respondidas ·{" "}
            {progress}%
          </p>
        </div>
      </header>

      {!showResults && (
        <>
          <section className="questions">
            {ideologicalQuestions.map((question) => (
              <article key={question.id} className="question-card">
                <span className="question-card__block">
                  {blockLabels[question.block]}
                </span>

                <h2>
                  {question.id}. {question.text}
                </h2>

                <div className="answer-options">
                  {answerOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={
                        answers[question.id] === option.value
                          ? "answer-options__button is-active"
                          : "answer-options__button"
                      }
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          [question.id]: option.value,
                        }))
                      }
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <button
            type="button"
            className="primary-button"
            disabled={answeredQuestions < totalQuestions}
            onClick={() => setShowResults(true)}
          >
            Ver resultado
          </button>
        </>
      )}

      {showResults && (
        <section className="results">
          <h2>Resultado general</h2>

          <div className="final-result">
            <p>Partido más cercano en conjunto:</p>
            <strong>{results.finalParty}</strong>
          </div>

          <div className="results-grid">
            {results.ideologyPercentages.slice(0, 12).map((item) => (
              <div key={item.ideology} className="result-card">
                <span>{ideologyLabels[item.ideology] ?? item.ideology}</span>
                <strong>{item.percentage}%</strong>
              </div>
            ))}
          </div>

          <h2>Resultado por bloques</h2>

          <div className="block-results">
            {results.blockResults.map((block) => (
              <article key={block.block} className="block-result-card">
                <div className="block-result-card__header">
                  <h3>{blockLabels[block.block]}</h3>
                  <p>
                    Partido más cercano: <strong>{block.party}</strong>
                  </p>
                </div>

                <div className="ideology-bars">
                  {block.ideologies.map((item) => (
                    <div key={item.ideology} className="ideology-bar">
                      <div className="ideology-bar__top">
                        <span>
                          {ideologyLabels[item.ideology] ?? item.ideology}
                        </span>
                        <strong>{item.percentage}%</strong>
                      </div>

                      <div className="ideology-bar__track">
                        <span style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="secondary-button"
            onClick={() => setShowResults(false)}
          >
            Volver al test
          </button>
        </section>
      )}
    </main>
  );
}
