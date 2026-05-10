
"use client";

import { useEffect, useMemo, useState } from "react";
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
} from "./test-ideologico/testData";
import "./test-ideologico/test-ideologico.css";

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

type CompleteAxis = {
  label: string;
  left: string;
  right: string;
  value: number;
};

type CompleteAnalysis = {
  voterType: string;
  consistency: number;
  deepProfile: string[];
  priorities: { label: string; value: number; description: string }[];
  contradictions: string[];
  partialPartyMatches: PartyMatch[];
  axes: CompleteAxis[];
};

const IMPORTANT_AFFINITY_THRESHOLD = 70;
const IDEOLOGY_BLOCKS_INFO_URL = "#";


const oppositeIdeologyPairs: [string, string][] = [
  ["liberal", "socialista"],
  ["liberal", "comunista"],
  ["conservador", "progresista"],
  ["tradicionalista", "progresista"],
  ["nacionalista", "globalista"],
  ["soberanista", "globalista"],
  ["multiculturalista", "nacionalista"],
  ["libertario", "autoritario"],
];

const partyProgramSummaries: Record<string, string> = {
  PSOE:
    "Comparado con el programa del PSOE, tu resultado se acerca a una socialdemocracia reformista: más peso de los servicios públicos, políticas de igualdad, transición ecológica y una visión institucional y europeísta.",
  PP:
    "Comparado con la ponencia política del PP, tu resultado se acerca a un perfil de centro-derecha reformista: economía social de mercado, defensa de la unidad de España, seguridad jurídica, apoyo a familias, reducción de trabas y menor presión fiscal.",
  VOX:
    "Comparado con el programa de VOX, tu resultado se acerca a una derecha nacional-conservadora: prioridad a la unidad de España, soberanía nacional, control migratorio, seguridad, valores tradicionales y reducción de impuestos y gasto político.",
  Sumar:
    "Comparado con el programa de Sumar, tu resultado se acerca a una izquierda ecosocial: intervención pública en vivienda y energía, derechos laborales, feminismo, transición ecológica, fiscalidad progresiva y protección social amplia.",
  Podemos:
    "Comparado con el espacio de Podemos/Sumar, tu resultado se acerca a una izquierda transformadora: más intervención pública, redistribución, derechos sociales, regulación de mercados y ampliación de servicios públicos.",
};

function IdeologyBlocksInfoCard({ variant }: { variant: "home" | "results" }) {
  const title =
    variant === "home"
      ? "¿Qué bloques definen una ideología?"
      : "Bloques que ayudan a interpretar tu resultado";

  const text =
    variant === "home"
      ? "Una ideología no se define solo por izquierda o derecha. También influyen los servicios públicos, la economía, la cultura, la identidad nacional, la seguridad, la libertad individual, la inmigración, el medio ambiente y la forma de entender el papel del Estado."
      : "Tu resultado se interpreta comparando tus respuestas en varios ámbitos: servicios públicos, economía, cultura, identidad nacional, seguridad, derechos sociales, medio ambiente y papel del Estado. Estos bloques ayudan a entender por qué puedes coincidir con una ideología en unas cosas y con otra en otros temas.";

  return (
    <section
      className={`ideology-blocks-info-card ideology-blocks-info-card--${variant}`}
    >
      <div className="ideology-blocks-info-card__content">
        <h2 className="ideology-blocks-info-card__title">{title}</h2>
        <p className="ideology-blocks-info-card__text">{text}</p>
        <ul className="ideology-blocks-info-card__list">
          <li>Servicios públicos y Estado del bienestar</li>
          <li>Economía, impuestos y mercado laboral</li>
          <li>Cultura, familia, valores e identidad</li>
          <li>Nación, soberanía, inmigración y seguridad</li>
        </ul>
      </div>

      <a
        className="ideology-blocks-info-card__button"
        href={IDEOLOGY_BLOCKS_INFO_URL}
      >
        Más información
      </a>
    </section>
  );
}

function getIdeologyDefinition(ideology: string) {
  const explanation = ideologyExplanations[ideology];
  if (!explanation) {
    return `${ideologyLabels[ideology] ?? ideology}: tendencia política presente en tus respuestas.`;
  }

  return `${explanation.title}: ${explanation.description}`;
}

function getIdeologyProfileDetail(item: IdeologyResult) {
  const label = ideologyLabels[item.ideology] ?? item.ideology;

  const details: Record<string, string> = {
    socialdemocrata:
      "tiendes a defender una economía de mercado con un Estado fuerte que garantice sanidad, educación, pensiones, derechos laborales y políticas de igualdad.",
    socialista:
      "das prioridad a la redistribución, la protección social y la intervención pública para corregir desigualdades económicas y laborales.",
    comunista:
      "muestras preferencia por una transformación profunda del sistema económico, con mucho más peso de lo público y menor protagonismo del capital privado.",
    liberal:
      "das importancia a la libertad individual, la iniciativa privada, la reducción de trabas y una menor intervención del Estado en la economía y en la vida personal.",
    conservador:
      "valoras el orden institucional, la continuidad, la seguridad jurídica, la familia y los cambios graduales antes que las rupturas políticas rápidas.",
    progresista:
      "priorizas la ampliación de derechos civiles, la igualdad social, los cambios culturales y una política pública activa frente a discriminaciones o desigualdades.",
    tradicionalista:
      "das peso a la familia, la herencia cultural, la religión o las costumbres como referencias importantes para ordenar la vida social.",
    libertario:
      "prefieres que el Estado intervenga lo menos posible y que las personas puedan decidir con libertad en economía, educación, costumbres y vida privada.",
    autoritario:
      "tiendes a aceptar más control, disciplina institucional y medidas firmes cuando lo consideras necesario para mantener orden, seguridad o estabilidad.",
    nacionalista:
      "sitúas la identidad nacional, la soberanía, la unidad del país y la protección de los intereses propios por encima de enfoques más globales o supranacionales.",
    soberanista:
      "das prioridad a que las decisiones importantes se tomen dentro del propio país o territorio, limitando la dependencia de organismos externos.",
    globalista:
      "muestras preferencia por la cooperación internacional, la integración europea, los acuerdos multilaterales y soluciones compartidas ante problemas globales.",
    multiculturalista:
      "valoras la convivencia entre culturas, la integración de minorías y una sociedad abierta a distintas identidades, orígenes y formas de vida.",
    ecologista:
      "das mucha importancia a la transición energética, la protección ambiental, la sostenibilidad y la intervención pública frente al cambio climático.",
  };

  return `${label} (${item.percentage}%): ${details[item.ideology] ?? "esta tendencia aparece de forma destacada en tus respuestas y marca una parte importante de tu orientación política."}`;
}

function getIdeologyPercentage(results: IdeologyResult[], ideology: string) {
  return results.find((item) => item.ideology === ideology)?.percentage ?? 0;
}

function detectInconsistencies(results: IdeologyResult[]) {
  return oppositeIdeologyPairs
    .map(([first, second]) => {
      const firstPercentage = getIdeologyPercentage(results, first);
      const secondPercentage = getIdeologyPercentage(results, second);

      if (firstPercentage >= 65 && secondPercentage >= 65) {
        return {
          first,
          second,
          firstPercentage,
          secondPercentage,
        };
      }

      return null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}

function getProfileIntro(testMode: TestMode) {
  if (testMode === "ultra") {
    return "Perfil orientativo muy breve. Este test tiene solo 8 preguntas, por lo que sirve para detectar una tendencia general, pero no permite leer con precisión todos los matices de economía, sociedad, nación o autoridad.";
  }

  if (testMode === "rapido") {
    return "Perfil resumido. El test rápido permite ver tus tendencias principales y algunos matices por bloques, aunque puede simplificar posiciones complejas.";
  }

  return "Perfil ideológico detallado. El test completo cruza muchas más respuestas, por eso permite detectar mejor prioridades, matices, tensiones internas y afinidades políticas concretas.";
}

function generateIdeologicalProfile(
  results: ReturnType<typeof calculateResults>,
  testMode: TestMode
) {
  const relevantIdeologies = results.ideologyPercentages
    .filter((item) => item.percentage >= IMPORTANT_AFFINITY_THRESHOLD)
    .slice(0, 2);

  const topIdeologies =
    relevantIdeologies.length > 0
      ? relevantIdeologies
      : results.ideologyPercentages.slice(0, 2);

  const inconsistencies = detectInconsistencies(results.ideologyPercentages);
  const partySummary = partyProgramSummaries[results.finalNationalParty.party];

  return {
    intro: getProfileIntro(testMode),
    ideologies: topIdeologies,
    profileDetails: topIdeologies.map((item) => getIdeologyProfileDetail(item)),
    inconsistencies,
    partySummary,
  };
}


function getVoterType(topIdeologies: IdeologyResult[]) {
  const first = topIdeologies[0]?.ideology;
  const second = topIdeologies[1]?.ideology;

  if (!first) return "Perfil político mixto";

  if (first === "nacionalista" || first === "soberanista") {
    if (second === "conservador" || second === "tradicionalista") {
      return "Nacional-conservador";
    }
    return "Soberanista pragmático";
  }

  if (first === "liberal" || first === "libertario") {
    if (second === "conservador") return "Liberal-conservador";
    return "Liberal económico";
  }

  if (first === "socialdemocrata") return "Socialdemócrata institucional";
  if (first === "socialista") return "Progresista intervencionista";
  if (first === "comunista") return "Izquierda transformadora";
  if (first === "conservador") return "Conservador institucional";
  if (first === "progresista") return "Progresista social";
  if (first === "tradicionalista") return "Tradicionalista cultural";
  if (first === "globalista") return "Europeísta/globalista";
  if (first === "multiculturalista") return "Pluralista multicultural";
  if (first === "autoritario") return "Ordenista/autoritario";

  return "Perfil político mixto";
}

function getPriorityDescription(ideology: string) {
  const descriptions: Record<string, string> = {
    economia:
      "Priorizas cómo se reparten impuestos, salarios, empresa privada, ayudas públicas y servicios esenciales.",
    nacion:
      "Priorizas soberanía, unidad territorial, autogobierno, lengua, fronteras e identidad política.",
    sociedad:
      "Priorizas valores sociales, familia, igualdad, derechos civiles, educación y cambios culturales.",
    autoridad:
      "Priorizas seguridad, orden público, justicia, control estatal, privacidad y límites al poder político.",
    geopolitica:
      "Priorizas relaciones internacionales, Unión Europea, defensa, comercio exterior, energía y alianzas.",
    identidad:
      "Priorizas cultura, tradición, religión, símbolos, costumbres y convivencia entre formas de vida distintas.",
  };

  return descriptions[ideology] ?? "Este bloque tiene un peso importante en la forma en que interpretas la política.";
}

function getBlockAverages(results: ReturnType<typeof calculateResults>) {
  return results.blockResults
    .map((block) => {
      const average =
        block.ideologies.reduce((sum, item) => sum + item.percentage, 0) /
        Math.max(block.ideologies.length, 1);

      return {
        block: block.block,
        label: blockLabels[block.block] ?? block.block,
        value: Math.round(average),
        description: getPriorityDescription(block.block),
      };
    })
    .sort((a, b) => b.value - a.value);
}

function getCompleteDeepProfile(
  results: ReturnType<typeof calculateResults>,
  priorities: { label: string; value: number; description: string }[]
) {
  const topIdeologies = results.ideologyPercentages.slice(0, 3);
  const mainLabels = topIdeologies
    .map((item) => `${ideologyLabels[item.ideology] ?? item.ideology} (${item.percentage}%)`)
    .join(", ");

  const mainPriority = priorities[0]?.label ?? "los bloques principales";
  const secondPriority = priorities[1]?.label ?? "los temas secundarios";

  return [
    `Tu perfil completo combina principalmente ${mainLabels}. Esto no significa que encajes al 100% en una sola etiqueta, sino que tus respuestas dibujan una mezcla concreta de prioridades políticas.`,
    `El bloque con más peso en tu resultado es ${mainPriority}. Esto indica que, al valorar propuestas políticas, probablemente das mucha importancia a ese ámbito antes de decidir si una medida te parece aceptable o no.`,
    `El segundo bloque más relevante es ${secondPriority}. Esta combinación ayuda a explicar por qué puedes coincidir con un partido en unas áreas y alejarte de él en otras.`,
    `A diferencia del test ultra rápido y del test rápido, este análisis completo no se limita a decir qué ideologías aparecen con más porcentaje: también interpreta prioridades, tensiones internas, consistencia y coincidencias parciales con partidos.`
  ];
}

function getCompleteConsistency(inconsistencyCount: number, results: IdeologyResult[]) {
  const top = results[0]?.percentage ?? 0;
  const second = results[1]?.percentage ?? 0;
  const dominance = Math.max(0, top - second);
  const base = 82 + Math.min(10, Math.round(dominance / 2));
  return clamp(base - inconsistencyCount * 12, 35, 96);
}

function getCompleteContradictions(results: ReturnType<typeof calculateResults>) {
  const tensions = detectInconsistencies(results.ideologyPercentages);

  if (tensions.length === 0) {
    return [
      "No se detectan contradicciones fuertes entre tus principales respuestas. Tu perfil mantiene una línea ideológica relativamente consistente.",
    ];
  }

  return tensions.map((item) => {
    const first = ideologyLabels[item.first] ?? item.first;
    const second = ideologyLabels[item.second] ?? item.second;

    return `Aparece una tensión entre ${first} (${item.firstPercentage}%) y ${second} (${item.secondPercentage}%). Esto suele ocurrir cuando una persona quiere libertad o apertura en algunos ámbitos, pero también más control, protección o intervención en otros.`;
  });
}

function getCompleteAxes(results: IdeologyResult[]): CompleteAxis[] {
  const axisValue = (leftIdeology: string, rightIdeology: string) => {
    const left = getIdeologyPercentage(results, leftIdeology);
    const right = getIdeologyPercentage(results, rightIdeology);
    if (left + right === 0) return 50;
    return clamp(Math.round((right / (left + right)) * 100));
  };

  return [
    {
      label: "Economía",
      left: "Más Estado",
      right: "Más mercado",
      value: axisValue("socialista", "liberal"),
    },
    {
      label: "Soberanía",
      left: "Globalismo",
      right: "Soberanismo",
      value: axisValue("globalista", "soberanista"),
    },
    {
      label: "Valores sociales",
      left: "Tradición",
      right: "Progresismo",
      value: axisValue("tradicionalista", "progresista"),
    },
    {
      label: "Poder del Estado",
      left: "Libertad individual",
      right: "Autoridad",
      value: axisValue("libertario", "autoritario"),
    },
  ];
}

function generateCompleteAnalysis(results: ReturnType<typeof calculateResults>): CompleteAnalysis {
  const priorities = getBlockAverages(results).slice(0, 5);
  const contradictions = getCompleteContradictions(results);
  const realContradictionCount = contradictions[0]?.startsWith("No se detectan") ? 0 : contradictions.length;
  const partialPartyMatches = Object.entries(nationalPartyProfiles)
    .map(([party, profile]) => ({
      party,
      percentage: Math.round(calculatePartySimilarity(results.ideologyPercentages, profile)),
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 4);

  return {
    voterType: getVoterType(results.ideologyPercentages.slice(0, 3)),
    consistency: getCompleteConsistency(realContradictionCount, results.ideologyPercentages),
    deepProfile: getCompleteDeepProfile(results, priorities),
    priorities,
    contradictions,
    partialPartyMatches,
    axes: getCompleteAxes(results.ideologyPercentages),
  };
}

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
  if (testMode === "ultra") return "Test Rápido";
  if (testMode === "rapido") return "Test Ideológico";
  return "Test Completo";
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
  const [isAdvancingQuestion, setIsAdvancingQuestion] = useState(false);

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

  useEffect(() => {
    if (testMode === "selector" || showResults) return;

    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });
  }, [testMode, showResults]);

  useEffect(() => {
    if (testMode === "selector" || showResults) return;
    if (totalQuestions <= 0) return;

    if (currentQuestionIndex > totalQuestions - 1) {
      setCurrentQuestionIndex(totalQuestions - 1);
      setIsAdvancingQuestion(false);
    }
  }, [currentQuestionIndex, showResults, testMode, totalQuestions]);

  function startTest(mode: "ultra" | "rapido" | "completo") {
    setTestMode(mode);
    setAnswers({});
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setInfoOpen(false);
    setOpenIdeology(null);
    setConfirmationType(null);
    setIsAdvancingQuestion(false);

    window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }, 0);
  }

function goBackToSelector() {
  setTestMode("selector");
  setAnswers({});
  setShowResults(false);
  setCurrentQuestionIndex(0);
  setInfoOpen(false);
  setOpenIdeology(null);
  setConfirmationType(null);
  setIsAdvancingQuestion(false);

  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, 0);
}

  function confirmAction() {
    if (confirmationType === "restart" || confirmationType === "home") {
      goBackToSelector();
    }
  }

  function goToPreviousQuestion() {
    setCurrentQuestionIndex((current) => Math.max(0, current - 1));
    setInfoOpen(false);
    setIsAdvancingQuestion(false);
  }

  function goToNextQuestion() {
    if (currentAnswer === undefined) return;

    if (currentQuestionIndex >= totalQuestions - 1) {
      setShowResults(true);
      setInfoOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrentQuestionIndex((current) => Math.min(current + 1, totalQuestions - 1));
    setInfoOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const confirmationTitle =
    confirmationType === "restart"
      ? "¿Volver a la selección de tests?"
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
            <h1>Match Político</h1>
            <div className="test-selector__subintro">
              <h2>Descubre tu perfil ideológico</h2>
            </div>
            
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
              <span>Test Rápido</span>
              <strong>{ultraQuickIdeologicalQuestions.length} preguntas</strong>
              <p>
                Ideal si quieres una orientación inmediata. Obtendrás tu
                porcentaje ideológico general y el partido que más encaja con tu
                resultado.
              </p>
            </button>

            <button
              type="button"
              className="test-option-card"
              onClick={() => startTest("rapido")}
            >
              <span>Test Ideológico</span>
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
              <span>Test Completo</span>
              <strong>{ideologicalQuestions.length} preguntas</strong>
              <p>
                Versión más precisa. Analiza más matices para afinar resultados
                por economía, sociedad, nación, autoridad, geopolítica e identidad.
              </p>
            </button>
          </div>

          <IdeologyBlocksInfoCard variant="home" />

          <p className="method-note">
            El resultado se obtiene cruzando tus respuestas con los perfiles ideológicos
            de la app. Estos perfiles se han elaborado a partir de programas
            electorales, medidas públicas y declaraciones políticas de los partidos
            incluidos.
          </p>
        </section>
      </main>
    );
  }

  if (showResults) {
    const isUltraTest = testMode === "ultra";
    const isCompleteTest = testMode === "completo";
    const ideologicalProfile = generateIdeologicalProfile(results, testMode);
    const completeAnalysis = isCompleteTest ? generateCompleteAnalysis(results) : null;

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

          <div className="community-selector">
              <label htmlFor="community">Selecciona una comunidad autónoma</label>
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

          <h2>Partido político más afín</h2>

          <div className="party-results">
                <div className="party-card">
                  <div className="party-card_title"><span>Elecciones generales en España</span></div>
                  <div className="party-card_results"><div className="party-card_finalresult"><strong>{results.finalNationalParty.party}</strong></div>
                  <div className="party-card_percentatge"><em>{results.finalNationalParty.percentage}% de coincidencia</em></div>
                </div></div>

                <div className="party-card">
                  <div className="party-card_title"><span>Elecciones autonómicas en {selectedCommunityName}</span></div>
                  <div className="party-card_results"><div className="party-card_finalresult"><strong>{results.finalRegionalParty.party}</strong></div>
                  <div className="party-card_percentatge"><em>{results.finalRegionalParty.percentage}% de coincidencia</em></div>
                </div></div>
          </div>

          <section className="ideological-profile-card results-profile-card">
            <h2 className="results-profile-title">Perfil ideológico resumido</h2>
            <p className="results-profile-intro">{ideologicalProfile.intro}</p>

            <div className="profile-highlight-list results-profile-highlight-list">
              {ideologicalProfile.ideologies.map((item) => (
                <span key={item.ideology} className="results-profile-highlight-item">
                  {ideologyLabels[item.ideology] ?? item.ideology}: {item.percentage}%
                </span>
              ))}
            </div>

            <div className="profile-definition-list results-profile-detail-list">
              {ideologicalProfile.profileDetails.map((detail) => (
                <p key={detail} className="results-profile-detail-item">{detail}</p>
              ))}
            </div>

            {ideologicalProfile.partySummary && (
              <p className="profile-party-context results-profile-party-context">{ideologicalProfile.partySummary}</p>
            )}

            {ideologicalProfile.inconsistencies.length > 0 ? (
              <div className="profile-inconsistencies">
                <h3>Posibles incoherencias o tensiones internas</h3>
                {ideologicalProfile.inconsistencies.map((item) => (
                  <p key={`${item.first}-${item.second}`}>
                    Aparece una tensión entre <strong>{ideologyLabels[item.first] ?? item.first}</strong> ({item.firstPercentage}%) y <strong>{ideologyLabels[item.second] ?? item.second}</strong> ({item.secondPercentage}%). Esto suele pasar cuando una persona defiende libertad o apertura en unos temas, pero prefiere más control, protección o intervención en otros. No significa que el resultado sea inválido; indica que tu perfil mezcla prioridades distintas según el asunto.
                  </p>
                ))}
              </div>
            ) : (
              <p className="profile-no-inconsistencies">
                No se detectan incoherencias fuertes entre las respuestas. Tu perfil muestra una orientación bastante coherente dentro de las tendencias principales.
              </p>
            )}
          </section>

          {completeAnalysis && (
            <section className="complete-analysis-card">
              <div className="complete-analysis-card__intro">
                <span className="complete-analysis-card__eyebrow">Solo en el Test Completo</span>
                <h2>Análisis político avanzado</h2>
                <p>
                  Este apartado interpreta tu resultado con más profundidad que los
                  otros tests: tipo de votante, consistencia, prioridades, tensiones
                  internas, ejes políticos y coincidencias parciales con partidos.
                </p>
              </div>

              <div className="complete-analysis-grid">
                <article className="complete-analysis-panel voter-type-card">
                  <span className="complete-analysis-panel__label">Tipo de votante</span>
                  <strong>{completeAnalysis.voterType}</strong>
                  <p>
                    Esta etiqueta resume la combinación dominante de tus respuestas,
                    no pretende encasillarte en una sola ideología cerrada.
                  </p>
                </article>

                <article className="complete-analysis-panel consistency-card">
                  <span className="complete-analysis-panel__label">Consistencia ideológica</span>
                  <strong className="consistency-score">{completeAnalysis.consistency}%</strong>
                  <p>
                    Mide si tus respuestas siguen una línea política estable o si
                    mezclan posiciones que normalmente aparecen separadas.
                  </p>
                </article>
              </div>

              <article className="complete-analysis-panel">
                <h3>Perfil político profundo</h3>
                {completeAnalysis.deepProfile.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>

              <article className="complete-analysis-panel">
                <h3>Tus prioridades ideológicas</h3>
                <div className="priority-list">
                  {completeAnalysis.priorities.map((priority, index) => (
                    <div key={priority.label} className="priority-item">
                      <span className="priority-pill">{index + 1}</span>
                      <div>
                        <strong>{priority.label}</strong>
                        <em>{priority.value}% de peso aproximado</em>
                        <p>{priority.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="complete-analysis-panel">
                <h3>Contradicciones o tensiones internas</h3>
                <div className="contradiction-list">
                  {completeAnalysis.contradictions.map((contradiction) => (
                    <p key={contradiction} className="contradiction-warning">
                      {contradiction}
                    </p>
                  ))}
                </div>
              </article>

              <article className="complete-analysis-panel">
                <h3>Coincidencias parciales con partidos</h3>
                <p>
                  Un partido puede ser el más afín en conjunto, pero tu resultado
                  puede coincidir parcialmente con otros en economía, cultura,
                  soberanía o derechos sociales.
                </p>
                <div className="partial-party-match-list">
                  {completeAnalysis.partialPartyMatches.map((match) => (
                    <div key={match.party} className="partial-party-match">
                      <strong>{match.party}</strong>
                      <span>{match.percentage}% de coincidencia global aproximada</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="complete-analysis-panel">
                <h3>Mapa ideológico avanzado</h3>
                <div className="advanced-axis-list">
                  {completeAnalysis.axes.map((axis) => (
                    <div key={axis.label} className="advanced-axis">
                      <div className="advanced-axis__header">
                        <strong>{axis.label}</strong>
                        <span>{axis.value}%</span>
                      </div>
                      <div className="advanced-axis__track">
                        <span style={{ left: `${axis.value}%` }} />
                      </div>
                      <div className="advanced-axis__labels">
                        <em>{axis.left}</em>
                        <em>{axis.right}</em>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          )}

          <div className="Percentatge_ideo"><h2>Porcentaje ideológico</h2>

          <p className="results-help">
            Cada tendencia incluye una explicación sencilla. Pulsa “Más información”.
          </p>

          <div className="results-grid">
            {results.ideologyPercentages.slice(0, 12).map((item) => {
              const isRelevant = item.percentage >= IMPORTANT_AFFINITY_THRESHOLD;

              return (
                <article
                  key={item.ideology}
                  className={`result-card result-ideology-card ${isRelevant ? "is-relevant" : "is-secondary"}`}
                >
                  <div className="result-card__top result-ideology-card__top">
                    <span className="result-ideology-card__title">{ideologyLabels[item.ideology] ?? item.ideology}</span>
                    <strong className="result-ideology-card__percentage">{item.percentage}%</strong>
                  </div>

                  {isRelevant && (
                    <span className="result-ideology-card__badge">Afinidad relevante</span>
                  )}

                  <button
                    type="button"
                    className="more-info-button result-ideology-card__more-button"
                    onClick={() =>
                      setOpenIdeology((current) =>
                        current === item.ideology ? null : item.ideology
                      )
                    }
                  >
                    Más información
                  </button>
                </article>
              );
            })}
          </div></div>

          <IdeologyBlocksInfoCard variant="results" />

          {isUltraTest && (
            <div className="upgrade-result-card">
              <h2>¿Quieres un resultado mucho más completo?</h2>
              <p>
                El test Rápido te da una orientación general. Si haces el
                Test Ideológico o el Test Completo, también podrás ver tu afinidad
                por bloques: economía, sociedad, nación, autoridad, geopolítica
                e identidad cultural. Así sabrás no solo “dónde encajas”, sino
                en qué temas concretos coincides más o menos con cada tendencia.
              </p>
              <button
                type="button"
                className="primary-button primary-button--home primary-button--inside-dark"
                onClick={() => setConfirmationType("home")}
              >
                Volver a la selección de tests
              </button>
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

          {!isUltraTest && (
            <div className="upgrade-result-card">
              <h2>¿Quieres volver a elegir otro test?</h2>
              <p>
                Puedes volver a la página inicial para hacer el test Rápido,
                repetir el test Ideológico o realizar el test Completo si quieres un
                análisis más detallado.
              </p>
              <button
                type="button"
                className="primary-button primary-button--home primary-button--inside-dark"
                onClick={() => setConfirmationType("home")}
              >
                Volver a la selección de tests
              </button>
            </div>
          )}
        </section>

        {openIdeology && ideologyExplanations[openIdeology] && (
          <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="ideology-explanation ideology-explanation--popup">
              <button
                type="button"
                className="modal-close-button"
                onClick={() => setOpenIdeology(null)}
                aria-label="Cerrar información ideológica"
              >
                ×
              </button>
              <h3>{ideologyExplanations[openIdeology].title}</h3>
              <p>{ideologyExplanations[openIdeology].description}</p>
              <p>
                <strong>Ejemplo:</strong> {ideologyExplanations[openIdeology].example}
              </p>
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

  if (!currentQuestion) {
    return (
      <main className="ideology-test">
        <section className="single-question">
          <article className="question-card question-card--single">
            <h2>No se ha podido cargar esta pregunta</h2>
            <p>
              Ha ocurrido un desfase al avanzar entre preguntas. Puedes volver a la
              selección de tests y empezar de nuevo.
            </p>
            <button
              type="button"
              className="restart-button"
              onClick={goBackToSelector}
            >
              Volver a la selección de tests
            </button>
          </article>
        </section>
      </main>
    );
  }

  const practicalInfo = getPracticalInfo(currentQuestion);

  return (
    <main className="ideology-test">
      <header className="ideology-test__header">
        

        <h1>{getTestTitle(testMode)}</h1>

        {/* {currentQuestionIndex === 0 && (
          <p>
            Responde una pregunta cada vez. Puedes usar el botón de información
            para entender ejemplos y consecuencias prácticas antes de responder.
          </p>
        )} */}

        <div className="progress">
          <div className="progress__bar">
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="progress__meta">
            <span>Pregunta {currentQuestionIndex + 1}/{totalQuestions}</span>
            <span>{progress}%</span>
          </div>
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
                disabled={isAdvancingQuestion}
                onClick={() => {
                  if (isAdvancingQuestion) return;

                  setIsAdvancingQuestion(true);
                  setAnswers((prev) => ({
                    ...prev,
                    [currentQuestion.id]: option.value,
                  }));

                  window.setTimeout(() => {
                    if (currentQuestionIndex >= totalQuestions - 1) {
                      setShowResults(true);
                      setInfoOpen(false);
                      setIsAdvancingQuestion(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      return;
                    }

                    setCurrentQuestionIndex((current) =>
                      Math.min(current + 1, totalQuestions - 1)
                    );
                    setInfoOpen(false);
                    setIsAdvancingQuestion(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }, 220);
                }}
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
<div className="question-header-actions">
          <button
            type="button"
            className="restart-button"
            onClick={() => setConfirmationType("restart")}
          >
            Volver a la selección de tests
          </button>
        </div>
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
