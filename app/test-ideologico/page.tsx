"use client";

import { useMemo, useState } from "react";
import {
  answerOptions,
  autonomousCommunities,
  blockLabels,
  ideologicalQuestions,
  ideologyExplanations,
  ideologyLabels,
  nationalPartyProfiles,
  quickIdeologicalQuestions,
  regionalPartyProfiles,
  type Question,
} from "./testData";
import "./test-ideologico.css";

type Answers = Record<number, number>;
type TestMode = "selector" | "rapido" | "completo";

type IdeologyResult = {
  ideology: string;
  percentage: number;
};

type PartyMatch = {
  party: string;
  percentage: number;
};

type PracticalInfo = {
  meaning: string;
  agree: string;
  disagree: string;
};

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function calculateResults(
  answers: Answers,
  questions: Question[],
  selectedCommunity: string
) {
  const ideologyScore: Record<string, number> = {};
  const ideologyMax: Record<string, number> = {};
  const blockScore: Record<string, Record<string, number>> = {};
  const blockMax: Record<string, Record<string, number>> = {};

  questions.forEach((question) => {
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

  const regionalProfiles =
    regionalPartyProfiles[selectedCommunity] ?? nationalPartyProfiles;

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
      nationalParty: findClosestParty(ideologies, nationalPartyProfiles),
      regionalParty: findClosestParty(ideologies, regionalProfiles),
    };
  });

  return {
    ideologyPercentages,
    blockResults,
    finalNationalParty: findClosestParty(ideologyPercentages, nationalPartyProfiles),
    finalRegionalParty: findClosestParty(ideologyPercentages, regionalProfiles),
  };
}

function findClosestParty(
  userProfile: IdeologyResult[],
  partyProfiles: Record<string, Record<string, number>>
): PartyMatch {
  let bestParty = "";
  let bestSimilarity = -Infinity;

  Object.entries(partyProfiles).forEach(([party, profile]) => {
    const similarity = calculatePartySimilarity(userProfile, profile);

    if (similarity > bestSimilarity) {
      bestSimilarity = similarity;
      bestParty = party;
    }
  });

  return {
    party: bestParty,
    percentage: Math.round(bestSimilarity),
  };
}

function calculatePartySimilarity(
  userProfile: IdeologyResult[],
  partyProfile: Record<string, number>
) {
  if (userProfile.length === 0) return 0;

  let totalDistance = 0;

  userProfile.forEach((item) => {
    const expected = partyProfile[item.ideology] ?? 50;
    totalDistance += Math.abs(item.percentage - expected);
  });

  const averageDistance = totalDistance / userProfile.length;
  return clamp(100 - averageDistance);
}

function getPracticalInfo(question: Question): PracticalInfo {
  if (question.info) return question.info;

  const blockInfo: Record<string, PracticalInfo> = {
    economia: {
      meaning:
        "Esta pregunta habla de dinero, impuestos, precios, empresas, trabajo, vivienda o servicios públicos.",
      agree:
        "Si estás muy de acuerdo, en la práctica apoyas con fuerza la idea de la pregunta. Por ejemplo, si habla de controlar precios, eso puede ayudar a quien paga alquiler, pero puede desanimar a propietarios o inversores.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica prefieres el enfoque contrario. Por ejemplo, menos control público puede dar más libertad económica, pero también dejar más diferencias entre ciudadanos.",
    },
    nacion: {
      meaning:
        "Esta pregunta habla de país, fronteras, identidad, lengua, inmigración o quién debe tomar las decisiones importantes.",
      agree:
        "Si estás muy de acuerdo, en la práctica das más peso a proteger lo propio. Por ejemplo, más control migratorio, más prioridad a ciudadanos locales o más protección de lengua y cultura.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica das más peso a apertura, cooperación y diversidad. Por ejemplo, más facilidad para acuerdos internacionales o para que convivan culturas distintas.",
    },
    sociedad: {
      meaning:
        "Esta pregunta habla de valores, familia, igualdad, libertad de expresión, educación o cambios sociales.",
      agree:
        "Si estás muy de acuerdo, en la práctica apoyas la idea de la frase. Por ejemplo, si habla de tradición, puede significar reforzar familia o disciplina; si habla de nuevos derechos, puede significar cambiar leyes y costumbres.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica apoyas el lado contrario. Eso puede conservar estabilidad o abrir cambios, según la pregunta concreta.",
    },
    autoridad: {
      meaning:
        "Esta pregunta habla de seguridad, policía, justicia, privacidad, vigilancia y poder del Estado.",
      agree:
        "Si estás muy de acuerdo, en la práctica aceptas más medidas para imponer orden o seguridad. Por ejemplo, más policía, más cámaras o penas más duras.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica prefieres limitar más el poder público. Por ejemplo, más privacidad, más garantías y menos vigilancia.",
    },
    geopolitica: {
      meaning:
        "Esta pregunta habla de relaciones con otros países, Unión Europea, defensa, comercio, energía o guerras.",
      agree:
        "Si estás muy de acuerdo, en la práctica apoyas la idea de la pregunta. Por ejemplo, más independencia exterior puede dar control, pero también crear choques con aliados.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica apoyas el enfoque contrario. Por ejemplo, más cooperación internacional puede dar estabilidad, pero también obliga a aceptar normas externas.",
    },
    identidad: {
      meaning:
        "Esta pregunta habla de cultura, religión, tradiciones, símbolos, diversidad o forma de convivencia.",
      agree:
        "Si estás muy de acuerdo, en la práctica quieres reforzar lo que dice la pregunta. Por ejemplo, proteger tradiciones puede unir a una parte de la sociedad, pero puede incomodar a quien no las comparte.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica prefieres reducir ese peso o abrir más espacio a otras formas de vida. Puede dar pluralidad, pero también debilitar referencias comunes.",
    },
  };

  return blockInfo[question.block] ?? {
    meaning:
      "Esta pregunta mide una preferencia política que puede afectar a leyes, impuestos, derechos, servicios públicos o convivencia.",
    agree:
      "Responder muy de acuerdo empuja a aplicar con más fuerza la idea de la pregunta.",
    disagree:
      "Responder muy en desacuerdo empuja a limitar o rechazar la idea de la pregunta.",
  };
}

export default function IdeologicalTestPage() {
  const [testMode, setTestMode] = useState<TestMode>("selector");
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState("cataluna");
  const [openIdeology, setOpenIdeology] = useState<string | null>(null);

  const activeQuestions =
    testMode === "rapido" ? quickIdeologicalQuestions : ideologicalQuestions;

  const currentQuestion = activeQuestions[currentQuestionIndex];
  const currentAnswer =
    currentQuestion !== undefined ? answers[currentQuestion.id] : undefined;

  const selectedCommunityName =
    autonomousCommunities.find((item) => item.id === selectedCommunity)?.name ??
    "la comunidad elegida";

  const results = useMemo(
    () => calculateResults(answers, activeQuestions, selectedCommunity),
    [answers, activeQuestions, selectedCommunity]
  );

  const totalQuestions = activeQuestions.length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = Math.round((answeredQuestions / totalQuestions) * 100);

  function startTest(mode: "rapido" | "completo") {
    setTestMode(mode);
    setAnswers({});
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setInfoOpen(false);
    setOpenIdeology(null);
  }

  function goBackToSelector() {
    setTestMode("selector");
    setAnswers({});
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setInfoOpen(false);
    setOpenIdeology(null);
  }

  function confirmGoBackToSelector() {
    const confirmed = window.confirm(
      "¿Seguro que quieres volver al inicio? Se perderán las respuestas de este test."
    );

    if (confirmed) {
      goBackToSelector();
    }
  }

  function confirmRestartTest() {
    const confirmed = window.confirm(
      "¿Seguro que quieres volver a empezar? Se perderán las respuestas actuales."
    );

    if (confirmed) {
      goBackToSelector();
    }
  }

  function goToPreviousQuestion() {
    setCurrentQuestionIndex((current) => Math.max(0, current - 1));
    setInfoOpen(false);
  }

  function goToNextQuestion() {
    if (currentAnswer === undefined) return;

    if (currentQuestionIndex >= totalQuestions - 1) {
      setShowResults(true);
      setInfoOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrentQuestionIndex((current) => current + 1);
    setInfoOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (testMode === "selector") {
    return (
      <main className="ideology-test">
        <section className="test-selector">
          <div className="test-selector__intro">
            <h1>Test ideológico</h1>
            <p>
              Elige entre una versión rápida o el test completo para obtener tu
              perfil ideológico por porcentajes, bloques y partido político más
              cercano.
            </p>
          </div>

          <div className="test-selector__grid">
            <button
              type="button"
              className="test-option-card"
              onClick={() => startTest("rapido")}
            >
              <span>Test rápido</span>
              <strong>{quickIdeologicalQuestions.length} preguntas</strong>
              <p>
                Versión resumida con las preguntas más importantes. Se muestra
                una pregunta por pantalla.
              </p>
            </button>

            <button
              type="button"
              className="test-option-card"
              onClick={() => startTest("completo")}
            >
              <span>Test completo</span>
              <strong>{ideologicalQuestions.length} preguntas</strong>
              <p>
                Versión completa con resultado general, bloques ideológicos y
                partido más cercano.
              </p>
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (showResults) {
    return (
      <main className="ideology-test">
        <section className="results">
          <button
            type="button"
            className="back-button"
            onClick={() => {
              setShowResults(false);
              setCurrentQuestionIndex(totalQuestions - 1);
            }}
          >
            ← Volver a la última pregunta
          </button>

          <h1>
            Resultado del{" "}
            {testMode === "rapido" ? "test rápido" : "test completo"}
          </h1>

          <div className="community-selector">
            <label htmlFor="community">Comunidad autónoma</label>
            <select
              id="community"
              value={selectedCommunity}
              onChange={(event) => setSelectedCommunity(event.target.value)}
            >
              {autonomousCommunities.map((community) => (
                <option key={community.id} value={community.id}>
                  {community.name}
                </option>
              ))}
            </select>
            <p>
              Al cambiar la comunidad, el partido autonómico más afín se
              actualiza automáticamente.
            </p>
          </div>

          <h2>Partido más afín</h2>

          <div className="party-results">
            <div className="party-card">
              <span>Elecciones generales en España</span>
              <strong>{results.finalNationalParty.party}</strong>
              <em>{results.finalNationalParty.percentage}% de coincidencia</em>
            </div>

            <div className="party-card">
              <span>Elecciones autonómicas en {selectedCommunityName}</span>
              <strong>{results.finalRegionalParty.party}</strong>
              <em>{results.finalRegionalParty.percentage}% de coincidencia</em>
            </div>
          </div>

          <h2>Porcentaje ideológico</h2>

          <p className="results-help">
            Cada bloque incluye una explicación sencilla. Pulsa “Más información”.
          </p>

          <div className="results-grid">
            {results.ideologyPercentages.slice(0, 12).map((item) => {
              const explanation = ideologyExplanations[item.ideology];
              const isOpen = openIdeology === item.ideology;

              return (
                <article
                  key={item.ideology}
                  className={isOpen ? "result-card is-open" : "result-card"}
                >
                  <div className="result-card__top">
                    <span>{ideologyLabels[item.ideology] ?? item.ideology}</span>
                    <strong>{item.percentage}%</strong>
                  </div>

                  {isOpen && explanation && (
                    <div className="ideology-explanation">
                      <h3>{explanation.title}</h3>
                      <p>{explanation.description}</p>
                      <p>
                        <strong>Ejemplo:</strong> {explanation.example}
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    className="more-info-button"
                    onClick={() =>
                      setOpenIdeology((current) =>
                        current === item.ideology ? null : item.ideology
                      )
                    }
                  >
                    {isOpen ? "Ocultar información" : "Más información"}
                  </button>
                </article>
              );
            })}
          </div>

          <h2>Resultado por bloques</h2>

          <div className="block-results">
            {results.blockResults.map((block) => (
              <article key={block.block} className="block-result-card">
                <div className="block-result-card__header">
                  <h3>{blockLabels[block.block]}</h3>
                </div>

                <div className="block-party-results">
                  <p>
                    España: <strong>{block.nationalParty.party}</strong>
                    <em>{block.nationalParty.percentage}% de coincidencia</em>
                  </p>
                  <p>
                    {selectedCommunityName}:{" "}
                    <strong>{block.regionalParty.party}</strong>
                    <em>{block.regionalParty.percentage}% de coincidencia</em>
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
            className="primary-button primary-button--home"
            onClick={confirmGoBackToSelector}
          >
            Volver a la selección de tests
          </button>
        </section>
      </main>
    );
  }

  if (!currentQuestion) return null;

  const practicalInfo = getPracticalInfo(currentQuestion);

  return (
    <main className="ideology-test">
      <header className="ideology-test__header">
        <div className="question-header-actions">
          <button
            type="button"
            className="back-button"
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            ← Volver
          </button>

          <button
            type="button"
            className="restart-button"
            onClick={confirmRestartTest}
          >
            Volver a empezar
          </button>
        </div>

        <h1>
          {testMode === "rapido"
            ? "Test ideológico rápido"
            : "Test ideológico completo"}
        </h1>

        <p>
          Responde una pregunta cada vez. Puedes usar el botón de información
          para entender ejemplos y consecuencias prácticas antes de responder.
        </p>

        <div className="progress">
          <div className="progress__bar">
            <span style={{ width: `${progress}%` }} />
          </div>
          <p>
            Pregunta {currentQuestionIndex + 1}/{totalQuestions} ·{" "}
            {answeredQuestions}/{totalQuestions} respondidas · {progress}%
          </p>
        </div>
      </header>

      <section className="single-question">
        <article className="question-card question-card--single">
          <div className="question-card__top">
            <span className="question-card__block">
              {blockLabels[currentQuestion.block]}
            </span>

            <button
              type="button"
              className="info-button"
              onClick={() => setInfoOpen((current) => !current)}
              aria-expanded={infoOpen}
              aria-label="Ver información de la pregunta"
            >
              i
            </button>
          </div>

          <h2>
            {currentQuestion.id}. {currentQuestion.text}
          </h2>

          <div className="answer-options answer-options--single">
            {answerOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={
                  currentAnswer === option.value
                    ? "answer-options__button is-active"
                    : "answer-options__button"
                }
                onClick={() =>
                  setAnswers((prev) => ({
                    ...prev,
                    [currentQuestion.id]: option.value,
                  }))
                }
              >
                {option.label}
              </button>
            ))}
          </div>

          {infoOpen && (
            <div className="question-info">
              <h3>¿Qué significa esta pregunta?</h3>
              <p>{practicalInfo.meaning}</p>

              <h4>Si respondes “Muy de acuerdo”</h4>
              <p>{practicalInfo.agree}</p>

              <h4>Si respondes “Muy en desacuerdo”</h4>
              <p>{practicalInfo.disagree}</p>
            </div>
          )}
        </article>

        <div className="question-navigation">
          <button
            type="button"
            className="secondary-button"
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Anterior
          </button>

          <button
            type="button"
            className="primary-button"
            onClick={goToNextQuestion}
            disabled={currentAnswer === undefined}
          >
            {currentQuestionIndex >= totalQuestions - 1
              ? "Ver resultado"
              : "Seguir"}
          </button>
        </div>
      </section>
    </main>
  );
}
