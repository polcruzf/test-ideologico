import { createClient } from "@supabase/supabase-js";
import {
  autonomousCommunities,
  ideologyLabels,
  religionProfileDescriptions,
  religionProfileLabels,
} from "../../test-ideologico/testData";
import "../../test-ideologico/test-ideologico.css";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Faltan variables de entorno de Supabase.");
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type StoredIdeology = {
  ideology: string;
  percentage: number;
};

type MainIdeologyAxis = "comunismo" | "nacionalismo" | "liberalismo";

type MainIdeologyDistribution = {
  key: MainIdeologyAxis;
  label: string;
  percentage: number;
};

type CompositeIdeologyResult = {
  id: string;
  label: string;
  percentage: number;
  description: string;
  components: string[];
  isHistoricalCategory?: boolean;
};

type AdvancedAxis = {
  label: string;
  left: string;
  right: string;
  value: number;
};

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function safeArray(value: unknown): StoredIdeology[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is StoredIdeology => {
      if (!item || typeof item !== "object") return false;
      const candidate = item as Record<string, unknown>;
      return (
        typeof candidate.ideology === "string" &&
        typeof candidate.percentage === "number"
      );
    })
    .sort((a, b) => b.percentage - a.percentage);
}

function getIdeologyLabel(ideology: string) {
  return ideologyLabels[ideology] ?? ideology;
}

function getIdeologyPercentage(results: StoredIdeology[], ideology: string) {
  return results.find((item) => item.ideology === ideology)?.percentage ?? 0;
}

function normalizeMainIdeologyScores(scores: Record<MainIdeologyAxis, number>): MainIdeologyDistribution[] {
  const total = scores.comunismo + scores.nacionalismo + scores.liberalismo;

  const raw = [
    {
      key: "comunismo" as const,
      label: "Intervencionista",
      percentage: total > 0 ? Math.round((scores.comunismo / total) * 100) : 0,
    },
    {
      key: "nacionalismo" as const,
      label: "Nacionalista",
      percentage: total > 0 ? Math.round((scores.nacionalismo / total) * 100) : 0,
    },
    {
      key: "liberalismo" as const,
      label: "Liberal",
      percentage: total > 0 ? Math.round((scores.liberalismo / total) * 100) : 0,
    },
  ];

  if (total <= 0) {
    return raw.sort((a, b) => b.percentage - a.percentage);
  }

  const difference = 100 - raw.reduce((sum, item) => sum + item.percentage, 0);
  const strongestIndex = raw.reduce(
    (bestIndex, item, index) =>
      item.percentage > raw[bestIndex].percentage ? index : bestIndex,
    0
  );

  raw[strongestIndex] = {
    ...raw[strongestIndex],
    percentage: clamp(raw[strongestIndex].percentage + difference),
  };

  return raw.sort((a, b) => b.percentage - a.percentage);
}

function calculateMainIdeologyDistributionFromResults(
  results: StoredIdeology[]
): MainIdeologyDistribution[] {
  const value = (ideology: string) => getIdeologyPercentage(results, ideology);

  return normalizeMainIdeologyScores({
    comunismo:
      value("comunista") * 1 +
      value("socialista") * 0.85 +
      value("socialdemocrata") * 0.55 +
      value("ecologista") * 0.2,
    nacionalismo:
      value("nacionalista") * 1 +
      value("soberanista") * 0.9 +
      value("tradicionalista") * 0.45 +
      value("conservador") * 0.35,
    liberalismo:
      value("liberal") * 1 +
      value("libertario") * 0.85,
  });
}

function getIdeologicalMapPosition(distribution: MainIdeologyDistribution[]) {
  const getAxis = (axis: MainIdeologyAxis) =>
    distribution.find((item) => item.key === axis)?.percentage ?? 0;

  const comunismo = getAxis("comunismo") / 100;
  const nacionalismo = getAxis("nacionalismo") / 100;
  const liberalismo = getAxis("liberalismo") / 100;

  return {
    x: Math.round(comunismo * 10 + nacionalismo * 50 + liberalismo * 90),
    y: Math.round(comunismo * 88 + nacionalismo * 14 + liberalismo * 88),
  };
}

function MainIdeologyPills({ distribution }: { distribution: MainIdeologyDistribution[] }) {
  return (
    <div className="main-ideology-pills main-ideology-pills--light">
      {distribution.map((item) => (
        <div key={item.key} className="main-ideology-pill">
          <strong>{item.percentage}%</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function IdeologicalAxesMap({ distribution }: { distribution: MainIdeologyDistribution[] }) {
  const position = getIdeologicalMapPosition(distribution);

  return (
    <section className="ideological-axes-card">
      <div className="ideological-axes-card__intro">
        <h2>Mapa de ejes ideológicos</h2>
        <p>
          Este mapa resume la posición entre los tres ejes principales: intervención económica,
          nacionalismo y liberalismo económico. Cuanto más cerca esté el punto de un vértice,
          más peso tiene ese eje en el resultado.
        </p>
      </div>

      <div
        className="ideological-triangle-map"
        style={
          {
            "--axis-x": `${position.x}%`,
            "--axis-y": `${position.y}%`,
          } as React.CSSProperties
        }
      >
        <span className="ideological-triangle-map__label ideological-triangle-map__label--top">
          Nacionalismo
        </span>
        <span className="ideological-triangle-map__label ideological-triangle-map__label--left">
          Intervención
        </span>
        <span className="ideological-triangle-map__label ideological-triangle-map__label--right">
          Liberalismo
        </span>
        <span className="ideological-triangle-map__dot" />
      </div>

      <MainIdeologyPills distribution={distribution} />
    </section>
  );
}

function getSpecificIdeologyLabel(topIdeologies: StoredIdeology[]) {
  if (topIdeologies.length === 0) return "Perfil ideológico mixto";

  return topIdeologies
    .slice(0, 2)
    .map((item) => getIdeologyLabel(item.ideology))
    .join("-");
}

function getIdeologyDescription(ideology: string) {
  const descriptions: Record<string, string> = {
    socialdemocrata:
      "tiende a defender una economía de mercado con un Estado fuerte que garantice sanidad, educación, pensiones, derechos laborales y políticas de igualdad.",
    socialista:
      "da prioridad a la redistribución, la protección social y la intervención pública para corregir desigualdades económicas y laborales.",
    comunista:
      "muestra preferencia por una transformación profunda del sistema económico, con mucho más peso de lo público y menor protagonismo del capital privado.",
    liberal:
      "da importancia a la libertad individual, la iniciativa privada, la reducción de trabas y una menor intervención del Estado.",
    conservador:
      "valora el orden institucional, la continuidad, la seguridad jurídica, la familia y los cambios graduales.",
    progresista:
      "prioriza la ampliación de derechos civiles, la igualdad social, los cambios culturales y una política pública activa frente a desigualdades.",
    tradicionalista:
      "da peso a la familia, la herencia cultural, la religión o las costumbres como referencias importantes para ordenar la vida social.",
    libertario:
      "prefiere que el Estado intervenga lo menos posible y que las personas puedan decidir con libertad en economía, educación, costumbres y vida privada.",
    autoritario:
      "tiende a aceptar más control, disciplina institucional y medidas firmes cuando se consideran necesarias para mantener orden, seguridad o estabilidad.",
    nacionalista:
      "sitúa la identidad nacional, la soberanía y la protección de los intereses propios por encima de enfoques más globales.",
    soberanista:
      "da prioridad a que las decisiones importantes se tomen dentro del propio país o territorio, limitando la dependencia de organismos externos.",
    globalista:
      "muestra preferencia por la cooperación internacional, la integración europea y soluciones compartidas ante problemas globales.",
    multiculturalista:
      "valora la convivencia entre culturas, la integración de minorías y una sociedad abierta a distintas identidades y formas de vida.",
    institucionalista:
      "da importancia a la estabilidad del sistema, el respeto a las normas, las instituciones y los procedimientos legales.",
    neutralista:
      "prefiere una política exterior prudente, con menos dependencia de bloques internacionales o alianzas automáticas.",
    populista:
      "tiende a desconfiar de élites políticas, económicas o mediáticas y valora propuestas que dicen representar directamente a la gente común.",
    ecologista:
      "da mucha importancia a la transición energética, la protección ambiental, la sostenibilidad y la intervención pública frente al cambio climático.",
  };

  return descriptions[ideology] ?? "esta orientación influye en la forma de entender la política, aunque no tenga por qué definir el perfil por completo.";
}

const compositeIdeologyDefinitions = [
  {
    id: "socialdemocracia",
    label: "Socialdemocracia",
    description:
      "Corriente reformista que combina economía de mercado, servicios públicos fuertes, redistribución moderada, derechos sociales e institucionalismo democrático.",
    positive: { socialdemocrata: 3, progresista: 1.4, institucionalista: 1.2, ecologista: 0.7 },
    negative: { libertario: 0.8, comunista: 0.5 },
    components: ["socialdemocrata", "progresista", "institucionalista"],
  },
  {
    id: "liberalismo_clasico",
    label: "Liberalismo clásico",
    description:
      "Corriente centrada en libertad individual, propiedad privada, mercado, límites al poder estatal y seguridad jurídica.",
    positive: { liberal: 3, libertario: 1.8, institucionalista: 1, globalista: 0.5 },
    negative: { comunista: 1.4, socialista: 1.1, autoritario: 0.8 },
    components: ["liberal", "libertario", "institucionalista"],
  },
  {
    id: "nacional_conservadurismo",
    label: "Nacional-conservadurismo",
    description:
      "Corriente que combina identidad nacional, soberanía, orden, tradición, control migratorio y una visión conservadora de la sociedad.",
    positive: { nacionalista: 2.5, soberanista: 1.8, conservador: 2, tradicionalista: 1.4, autoritario: 0.8 },
    negative: { globalista: 1.5, multiculturalista: 1.4, progresista: 0.9 },
    components: ["nacionalista", "soberanista", "conservador", "tradicionalista"],
  },
  {
    id: "marxismo",
    label: "Marxismo",
    description:
      "Corriente socialista centrada en crítica al capitalismo, conflicto de clases, propiedad colectiva o pública, redistribución profunda e intervención estructural en la economía.",
    positive: { comunista: 2.6, socialista: 2.2, progresista: 0.8, soberanista: 0.5 },
    negative: { liberal: 1.8, libertario: 1.1, conservador: 0.7 },
    components: ["comunista", "socialista", "antiliberalismo económico"],
  },
  {
    id: "ecosocialismo",
    label: "Ecosocialismo",
    description:
      "Corriente que une ecologismo, redistribución, derechos sociales, intervención pública y transformación del modelo productivo.",
    positive: { ecologista: 2.4, socialista: 1.8, progresista: 1.6, socialdemocrata: 0.9, multiculturalista: 0.6 },
    negative: { liberal: 1.1, conservador: 1.1, tradicionalista: 0.6 },
    components: ["ecologista", "socialista", "progresista"],
  },
  {
    id: "soberanismo_identitario",
    label: "Soberanismo identitario",
    description:
      "Corriente que prioriza autogobierno, identidad cultural, protección de la comunidad política propia y resistencia a poderes externos.",
    positive: { soberanista: 2.5, nacionalista: 2.2, tradicionalista: 0.9, conservador: 0.8 },
    negative: { globalista: 1.8, multiculturalista: 1.1 },
    components: ["soberanista", "nacionalista", "identidad cultural"],
  },
];

function calculateCompositeIdeologies(userProfile: StoredIdeology[]): CompositeIdeologyResult[] {
  const value = (ideology: string) => getIdeologyPercentage(userProfile, ideology);

  return compositeIdeologyDefinitions
    .map((definition) => {
      let weightedScore = 0;
      let totalWeight = 0;

      Object.entries(definition.positive).forEach(([ideology, weight]) => {
        weightedScore += value(ideology) * weight;
        totalWeight += weight;
      });

      Object.entries(definition.negative ?? {}).forEach(([ideology, weight]) => {
        weightedScore += (100 - value(ideology)) * weight;
        totalWeight += weight;
      });

      const percentage = totalWeight > 0 ? Math.round(weightedScore / totalWeight) : 0;

      return {
        id: definition.id,
        label: definition.label,
        percentage: clamp(percentage),
        description: definition.description,
        components: definition.components,
      };
    })
    .filter((item) => item.percentage >= 50)
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 8);
}

function getCompositeIdeologyLevel(percentage: number) {
  if (percentage >= 75) return "Afinidad alta";
  if (percentage >= 62) return "Afinidad media";
  if (percentage >= 50) return "Afinidad parcial";
  return "Afinidad baja";
}

function calculateAdvancedAxes(results: StoredIdeology[]): AdvancedAxis[] {
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

function getCommunityName(communityId: string | null) {
  if (!communityId) return "";
  return autonomousCommunities.find((community) => community.id === communityId)?.name ?? communityId;
}

type SharedReligionProfileKey =
  | "tradicional_religiosa"
  | "laicidad"
  | "apertura_religiosa"
  | "identitaria_cultural";

function isSharedReligionProfileKey(value: unknown): value is SharedReligionProfileKey {
  return (
    value === "tradicional_religiosa" ||
    value === "laicidad" ||
    value === "apertura_religiosa" ||
    value === "identitaria_cultural"
  );
}

function SharedPartyReligionBlock({ rawResults }: { rawResults: any }) {
  const religionAffinity = rawResults?.religionAffinity;
  const religionKey = religionAffinity?.key;

  if (!isSharedReligionProfileKey(religionKey)) return null;

  const label =
    religionAffinity.label ??
    religionProfileLabels[religionKey] ??
    "Religión";

  const description =
    religionAffinity.description ??
    religionProfileDescriptions[religionKey] ??
    "";

  return (
    <div className="party-card_religion">
      <span className="party-card_religion-label">Valores religiosos</span>
      <strong className="party-card_religion-value">{label}</strong>
      {description && (
        <p className="party-card_religion-description">{description}</p>
      )}
    </div>
  );
}
export default async function SharedResultPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: result, error } = await supabase
    .from("test_sessions")
    .select("*")
    .eq("public_slug", slug)
    .single();

  if (error || !result) {
    return (
      <main className="ideology-test">
        <section className="results">
          <h1>Resultado no encontrado</h1>
          <p>Este resultado no existe o ya no está disponible.</p>
          <a className="shared-result-cta" href="/">
            Realizar mi propio test
          </a>
        </section>
      </main>
    );
  }

  const rawResults = result.raw_results ?? {};
  const ideologyPercentages = safeArray(result.top_ideologies ?? rawResults.ideologyPercentages);
  const topIdeologies = ideologyPercentages.slice(0, 3);
  const mainIdeologyDistribution = calculateMainIdeologyDistributionFromResults(ideologyPercentages);
  const compositeIdeologies = calculateCompositeIdeologies(ideologyPercentages);
  const advancedAxes = calculateAdvancedAxes(ideologyPercentages);
  const communityName = getCommunityName(result.community ?? rawResults.selectedCommunity ?? null);
  const specificIdeologyLabel = getSpecificIdeologyLabel(topIdeologies);

  return (
    <>
      <header className="shared-result-header">
        <div className="shared-result-header__inner">
          <a className="shared-result-logo" href="/">
            Match Político
          </a>

<div className="shared-result-header__actions">
  <a className="shared-result-header__button" href="/">
    Realizar mi propio test
  </a>
</div>
        </div>
      </header>

      <main className="ideology-test shared-result-layout">
        <section className="results shared-result-page">
        <div className="resultadodiv">
          <h1>Resultado del test</h1>
        </div>

        <section className="party-results-share-section">
          <div className="party-results-share-header">
            <h2>Partido político más afín</h2>
          </div>

          <div className="party-results">
            <div className="party-card">
              <div className="party-card_title">
                <span>Elecciones generales en España</span>
              </div>

              <div className="party-card_results">
                <div className="party-card_finalresult">
                  <strong>{result.national_party}</strong>
                </div>
                
<details className="party-card_ideologies party-card_ideologies-toggle">
  <summary className="party-card_ideologies-button">
    Ver ideologías del partido
  </summary>

  <SharedPartyReligionBlock rawResults={rawResults} />
</details>
                <div className="party-card_percentatge">
                  <em>{result.national_party_percentage}% de coincidencia</em>
                </div>
              </div>
            </div>

            <div className="party-card">
              <div className="party-card_title">
                <span>
                  Elecciones autonómicas{communityName ? ` en ${communityName}` : ""}
                </span>
              </div>

              <div className="party-card_results">
                <div className="party-card_finalresult">
                  <strong>{result.regional_party}</strong>
                </div>
<details className="party-card_ideologies party-card_ideologies-toggle">
  <summary className="party-card_ideologies-button">
    Ver ideologías del partido
  </summary>

  <SharedPartyReligionBlock rawResults={rawResults} />
</details>
                <div className="party-card_percentatge">
                  <em>{result.regional_party_percentage}% de coincidencia</em>
                </div>
              </div>
            </div>
          </div>
        </section>

        {topIdeologies.length > 0 && (
          <section className="ideological-profile-card results-profile-card">
            <h2 className="results-profile-title">Perfil ideológico resumido</h2>

            <div className="results-profile-summary-head">
              <div className="results-profile-specific-title">
                {specificIdeologyLabel}
              </div>

              <div className="profile-highlight-list results-profile-highlight-list">
                {topIdeologies.map((item) => (
                  <span key={item.ideology} className="results-profile-highlight-item">
                    {getIdeologyLabel(item.ideology)} ({item.percentage}%)
                  </span>
                ))}
              </div>
            </div>

            <div className="profile-definition-list results-profile-detail-list">
              {topIdeologies.map((item) => (
                <div key={item.ideology} className="results-profile-detail-item">
                  <div className="results-profile-detail-item__title">
                    {getIdeologyLabel(item.ideology)} ({item.percentage}%)
                  </div>
                  <div className="results-profile-detail-item__description">
                    {getIdeologyDescription(item.ideology)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <IdeologicalAxesMap distribution={mainIdeologyDistribution} />

        {compositeIdeologies.length > 0 && (
          <section className="composite-ideology-card">
            <div className="composite-ideology-card__intro">
              <span>Lectura avanzada</span>
              <h2>Corrientes ideológicas compuestas</h2>
              <p>
                Estas corrientes agrupan varias señales del resultado para detectar familias políticas amplias.
              </p>
            </div>

            <div className="composite-ideology-grid">
              {compositeIdeologies.map((item) => (
                <article
                  key={item.id}
                  className="composite-ideology-item result-card result-ideology-card"
                >
                  <div className="result-card__top result-ideology-card__top composite-ideology-item__top">
                    <span className="result-ideology-card__title">{item.label}</span>
                    <strong className="result-ideology-card__percentage">{item.percentage}%</strong>
                  </div>

                  <span className="result-ideology-card__badge">
                    {getCompositeIdeologyLevel(item.percentage)}
                  </span>

                  <p>{item.description}</p>

                  <div className="composite-ideology-item__traits">
                    <h3>Rasgos detectados</h3>
                    <div className="composite-ideology-item__components">
                      {item.components.map((component) => (
                        <em key={component}>{getIdeologyLabel(component)}</em>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {(result.voter_type || result.consistency !== null) && (
          <section className="complete-analysis-card shared-result-advanced-card">
            <div className="complete-analysis-card__intro">
              <span className="complete-analysis-card__eyebrow">Lectura avanzada</span>
              <h2>Análisis político avanzado</h2>
              <p>
                Este apartado resume el tipo de votante, la consistencia ideológica y los principales ejes políticos detectados.
              </p>
            </div>

            <div className="complete-analysis-grid">
              {result.voter_type && (
                <article className="complete-analysis-panel1 voter-type-card">
                  <span className="complete-analysis-panel__label">Tipo de votante</span>
                  <strong>{result.voter_type}</strong>
                </article>
              )}

              {result.consistency !== null && (
                <article className="complete-analysis-panel2 consistency-card">
                  <span className="complete-analysis-panel__label">Consistencia ideológica</span>
                  <strong className="consistency-score">{result.consistency}%</strong>
                </article>
              )}
            </div>

            <article className="complete-analysis-panel7">
              <h3>Mapa ideológico avanzado</h3>
              <div className="advanced-axis-list">
                {advancedAxes.map((axis) => (
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

        <div className="shared-result-footer-cta">
          <a className="shared-result-cta" href="/">
            Realizar mi propio test
          </a>
        </div>
        </section>
      </main>
    </>
  );
}
