
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
  ultraQuickIdeologicalQuestions,
  type Question,
} from "./testData";
import "./test-ideologico.css";

type Answers = Record<number, number>;
type TestMode = "selector" | "ultra" | "rapido" | "completo";
type ConfirmationType = "restart" | "home" | null;

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
        "Esta pregunta habla de cómo se reparte y se gestiona el dinero en la sociedad: impuestos, empresas, salarios, vivienda, ayudas públicas o servicios como sanidad y educación. Ejemplo cotidiano: pagar menos impuestos y contratar un seguro privado, o pagar más impuestos y tener más servicios públicos.",
      agree:
        "Si respondes muy de acuerdo, empujas tu resultado hacia la idea concreta de la pregunta. Por ejemplo, si habla de nacionalizar empresas, aceptarías que sectores como energía, trenes o sanidad dependan más del Estado.",
      disagree:
        "Si respondes muy en desacuerdo, empujas tu resultado hacia el enfoque contrario. Por ejemplo, si la pregunta defiende más intervención pública, tu respuesta indica que prefieres más libertad para empresas, propietarios o consumidores.",
    },
    nacion: {
      meaning:
        "Esta pregunta habla de país, soberanía, fronteras, identidad, lengua, inmigración o quién debe tomar las decisiones importantes. Ejemplo cotidiano: si una norma sobre vivienda, educación o migración debe decidirse más en España, en tu comunidad o en organismos externos.",
      agree:
        "Si respondes muy de acuerdo, das más peso a proteger lo propio y decidir desde dentro. Por ejemplo, priorizar ciudadanos locales, reforzar la lengua propia o limitar decisiones impuestas desde fuera.",
      disagree:
        "Si respondes muy en desacuerdo, das más peso a apertura, cooperación y diversidad. Por ejemplo, aceptar normas comunes con la Unión Europea o facilitar más convivencia entre culturas distintas.",
    },
    sociedad: {
      meaning:
        "Esta pregunta habla de valores, costumbres, igualdad, libertad de expresión, familia, educación o cambios sociales. Ejemplo cotidiano: qué se enseña en clase, qué discursos se permiten en redes o cómo se regulan nuevos modelos familiares.",
      agree:
        "Si respondes muy de acuerdo, apoyas con fuerza la idea de la frase. Si habla de tradición, tiendes a reforzar familia, disciplina o costumbres; si habla de nuevos derechos, tiendes a aceptar cambios legales y sociales.",
      disagree:
        "Si respondes muy en desacuerdo, apoyas el lado contrario. Eso puede significar conservar más estabilidad o abrir más cambios, según lo que diga la pregunta concreta.",
    },
    autoridad: {
      meaning:
        "Esta pregunta habla de seguridad, policía, justicia, privacidad, vigilancia y poder del Estado. Ejemplo cotidiano: más cámaras en la calle, penas más duras, más controles policiales o más límites a lo que el Estado puede hacer.",
      agree:
        "Si respondes muy de acuerdo, aceptas más medidas para imponer orden o seguridad. Por ejemplo, más policía, más vigilancia, castigos más duros o actuación más firme del Estado.",
      disagree:
        "Si respondes muy en desacuerdo, prefieres limitar más el poder público. Por ejemplo, más privacidad, más garantías legales y menos vigilancia aunque eso pueda hacer algunas actuaciones más lentas.",
    },
    geopolitica: {
      meaning:
        "Esta pregunta habla de relaciones con otros países, Unión Europea, defensa, comercio, energía o guerras. Ejemplo cotidiano: comprar energía más barata fuera o producirla aquí aunque cueste más para depender menos de otros países.",
      agree:
        "Si respondes muy de acuerdo, apoyas la idea exterior de la pregunta. Por ejemplo, más independencia internacional puede dar control, pero también puede crear choques con aliados o subir costes.",
      disagree:
        "Si respondes muy en desacuerdo, apoyas el enfoque contrario. Por ejemplo, más cooperación internacional puede dar estabilidad, pero también obliga a aceptar normas o acuerdos externos.",
    },
    identidad: {
      meaning:
        "Esta pregunta habla de cultura, religión, tradiciones, símbolos, diversidad o forma de convivencia. Ejemplo cotidiano: fiestas populares, símbolos en edificios públicos, lengua en la escuela o presencia de distintas religiones y culturas.",
      agree:
        "Si respondes muy de acuerdo, quieres reforzar lo que dice la pregunta. Por ejemplo, proteger tradiciones puede unir a una parte de la sociedad, pero puede incomodar a quien no las comparte.",
      disagree:
        "Si respondes muy en desacuerdo, prefieres reducir ese peso o abrir más espacio a otras formas de vida. Puede dar pluralidad, pero también debilitar referencias comunes.",
    },
  };

  return blockInfo[question.block] ?? {
    meaning:
      "Esta pregunta mide una preferencia política que puede afectar a leyes, impuestos, derechos, servicios públicos o convivencia. Ejemplo cotidiano: pagar impuestos, acceder a vivienda, educar a los hijos o relacionarse con instituciones públicas.",
    agree:
      "Responder muy de acuerdo empuja a aplicar con más fuerza la idea de la pregunta.",
    disagree:
      "Responder muy en desacuerdo empuja a limitar o rechazar la idea de la pregunta.",
  };
}

function getTestTitle(testMode: TestMode) {
  if (testMode === "ultra") return "Test ideológico ultra rápido";
  if (testMode === "rapido") return "Test ideológico rápido";
  return "Test ideológico completo";
}

export default function IdeologicalTestPage() {
  const [testMode, setTestMode] = useState<TestMode>("selector");
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState("cataluna");
  const [openIdeology, setOpenIdeology] = useState<string | null>(null);
  const [confirmationType, setConfirmationType] = useState<ConfirmationType>(null);

  const activeQuestions =
    testMode === "ultra"
      ? ultraQuickIdeologicalQuestions
      : testMode === "rapido"
        ? quickIdeologicalQuestions
        : ideologicalQuestions;

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
  const progress = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  function startTest(mode: "ultra" | "rapido" | "completo") {
    setTestMode(mode);
    setAnswers({});
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setInfoOpen(false);
    setOpenIdeology(null);
    setConfirmationType(null);
  }

  function goBackToSelector() {
    setTestMode("selector");
    setAnswers({});
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setInfoOpen(false);
    setOpenIdeology(null);
    setConfirmationType(null);
  }

  function confirmAction() {
    if (confirmationType === "restart" || confirmationType === "home") {
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

  const confirmationTitle =
    confirmationType === "restart"
      ? "¿Volver a empezar?"
      : "¿Volver a la selección de tests?";

  const confirmationText =
    confirmationType === "restart"
      ? "Se perderán las respuestas actuales y volverás a la página principal de selección de tests."
      : "Se perderán las respuestas de este test y volverás a la página principal de selección.";

  if (testMode === "selector") {
    return (
      <main className="ideology-test">
        <section className="test-selector">
          <div className="test-selector__intro">
            <h1>Test ideológico</h1>
            <p>
              Elige el nivel de profundidad del test. Cuantas más preguntas
              respondas, más detallado será el resultado.
            </p>
          </div>

          <div className="test-selector__grid test-selector__grid--three">
            <button
              type="button"
              className="test-option-card"
              onClick={() => startTest("ultra")}
            >
              <span>Test ultra rápido</span>
              <strong>{ultraQuickIdeologicalQuestions.length} preguntas</strong>
              <p>
                Ideal si quieres una orientación inmediata. Obtendrás solo tu
                porcentaje ideológico general, sin bloques ni partidos afines.
              </p>
            </button>

            <button
              type="button"
              className="test-option-card"
              onClick={() => startTest("rapido")}
            >
              <span>Test rápido</span>
              <strong>{quickIdeologicalQuestions.length} preguntas</strong>
              <p>
                Versión equilibrada. Obtendrás porcentaje ideológico, bloques
                temáticos y partidos más afines a nivel estatal y autonómico.
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
                Versión más precisa. Analiza más matices para afinar resultados
                por economía, sociedad, nación, autoridad, geopolítica e identidad.
              </p>
            </button>
          </div>

          <p className="method-note">
            Los resultados se calculan comparando tus respuestas con una base de
            programas electorales, decisiones públicas y declaraciones políticas
            de los partidos disponibles en la app.
          </p>
        </section>
      </main>
    );
  }

  if (showResults) {
    const isUltraTest = testMode === "ultra";

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

          <h1>Resultado del {getTestTitle(testMode).toLowerCase()}</h1>

          {!isUltraTest && (
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
          )}

          {!isUltraTest && (
            <>
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
            </>
          )}

          <h2>Porcentaje ideológico</h2>

          <p className="results-help">
            Cada tendencia incluye una explicación sencilla. Pulsa “Más información”.
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

          {isUltraTest && (
            <div className="upgrade-result-card">
              <h2>¿Quieres un resultado mucho más completo?</h2>
              <p>
                El test ultra rápido te da una orientación general. Si haces el
                Test rápido o el Test completo, también podrás ver tu afinidad
                por bloques: economía, sociedad, nación, autoridad, geopolítica
                e identidad cultural. Así sabrás no solo “dónde encajas”, sino
                en qué temas concretos coincides más o menos con cada tendencia.
              </p>
            </div>
          )}

          {!isUltraTest && (
            <>
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
                        {selectedCommunityName}: <strong>{block.regionalParty.party}</strong>
                        <em>{block.regionalParty.percentage}% de coincidencia</em>
                      </p>
                    </div>

                    <div className="ideology-bars">
                      {block.ideologies.map((item) => (
                        <div key={item.ideology} className="ideology-bar">
                          <div className="ideology-bar__top">
                            <span>{ideologyLabels[item.ideology] ?? item.ideology}</span>
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
            </>
          )}

          <button
            type="button"
            className="primary-button primary-button--home"
            onClick={() => setConfirmationType("home")}
          >
            Volver a la selección de tests
          </button>
        </section>

        {confirmationType && (
          <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="confirmation-modal">
              <button
                type="button"
                className="modal-close-button"
                onClick={() => setConfirmationType(null)}
                aria-label="Cerrar confirmación"
              >
                ×
              </button>
              <h2>{confirmationTitle}</h2>
              <p>{confirmationText}</p>
              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setConfirmationType(null)}
                >
                  Cancelar
                </button>
                <button type="button" className="primary-button" onClick={confirmAction}>
                  Sí, continuar
                </button>
              </div>
            </div>
          </div>
        )}
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
            onClick={() => setConfirmationType("restart")}
          >
            Volver a empezar
          </button>
        </div>

        <h1>{getTestTitle(testMode)}</h1>

        {currentQuestionIndex === 0 && (
          <p>
            Responde una pregunta cada vez. Puedes usar el botón de información
            para entender ejemplos y consecuencias prácticas antes de responder.
          </p>
        )}

        <div className="progress">
          <div className="progress__bar">
            <span style={{ width: `${progress}%` }} />
          </div>
          <p>
            Pregunta {currentQuestionIndex + 1}/{totalQuestions} · {progress}%
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
              onClick={() => setInfoOpen(true)}
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

      {infoOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="question-info question-info--popup">
            <button
              type="button"
              className="modal-close-button"
              onClick={() => setInfoOpen(false)}
              aria-label="Cerrar información"
            >
              ×
            </button>
            <h3>¿Qué significa esta pregunta?</h3>
            <p>{practicalInfo.meaning}</p>

            <h4>Si respondes “Muy de acuerdo”</h4>
            <p>{practicalInfo.agree}</p>

            <h4>Si respondes “Muy en desacuerdo”</h4>
            <p>{practicalInfo.disagree}</p>
          </div>
        </div>
      )}

      {confirmationType && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="confirmation-modal">
            <button
              type="button"
              className="modal-close-button"
              onClick={() => setConfirmationType(null)}
              aria-label="Cerrar confirmación"
            >
              ×
            </button>
            <h2>{confirmationTitle}</h2>
            <p>{confirmationText}</p>
            <div className="modal-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setConfirmationType(null)}
              >
                Cancelar
              </button>
              <button type="button" className="primary-button" onClick={confirmAction}>
                Sí, continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
