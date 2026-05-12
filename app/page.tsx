
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  answerOptions,
  autonomousCommunities,
  blockLabels,
  ideologyExplanations,
  ideologyLabels,
  completeIdeologicalQuestions,
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
type TerritorialReference = "spain" | "selectedCommunity" | "mixed";
type IndependencePosition =
  | "independence"
  | "right_to_decide"
  | "autonomy_inside_spain"
  | "against_independence"
  | "unclear";

type CompositeIdeologyResult = {
  id: string;
  label: string;
  percentage: number;
  description: string;
  components: string[];
  isHistoricalCategory?: boolean;
};

type IdeologyResult = {
  ideology: string;
  percentage: number;
};

type PartyMatch = {
  party: string;
  percentage: number;
  isClearMatch?: boolean;
  closestParty?: string;
  explanation?: string;
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
const MIN_CLEAR_PARTY_MATCH = 58;
const MIN_BLOCK_PARTY_MATCH = 55;
const IDEOLOGY_BLOCKS_INFO_URL = "#";

const INDEPENDENCE_QUESTION_COMMUNITIES = new Set([
  "cataluna",
  "pais-vasco",
  "navarra",
  "galicia",
]);

const COMMON_GENERAL_ELECTION_PARTIES = [
  "PSOE",
  "PP",
  "VOX",
  "Sumar",
  "Podemos",
  "Ciudadanos",
];

const HARD_SPANISH_UNIONIST_GENERAL_PARTIES = new Set([
  "VOX",
  "Ciudadanos",
]);

const MODERATE_SPANISH_UNIONIST_GENERAL_PARTIES = new Set([
  "PP",
]);

const independencePositionOptions: {
  value: IndependencePosition;
  label: string;
  description: string;
}[] = [
  {
    value: "independence",
    label: "A favor de la independencia",
    description:
      "El resultado interpretará el nacionalismo como soberanía de la comunidad seleccionada y penalizará partidos estatales incompatibles con esa posición.",
  },
  {
    value: "right_to_decide",
    label: "Derecho a decidir",
    description:
      "El resultado dará peso al autogobierno y reducirá la afinidad con partidos muy centralistas.",
  },
  {
    value: "autonomy_inside_spain",
    label: "Más autogobierno",
    description:
      "El resultado interpretará tu posición como autonomista o federalizante, no como independentista.",
  },
  {
    value: "against_independence",
    label: "En contra",
    description:
      "El resultado permitirá partidos estatales constitucionalistas o unionistas si encajan con el resto de tu perfil.",
  },
  {
    value: "unclear",
    label: "No lo tengo claro",
    description:
      "El resultado aplicará un ajuste territorial suave para evitar conclusiones demasiado tajantes.",
  },
];

const ANONYMOUS_USER_STORAGE_KEY = "matchpolitico_anonymous_user_id";

function createAnonymousUserId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `anon_${crypto.randomUUID()}`;
  }

  return `anon_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
}

function getOrCreateAnonymousUserId() {
  if (typeof window === "undefined") return null;

  const existingUserId = window.localStorage.getItem(ANONYMOUS_USER_STORAGE_KEY);

  if (existingUserId) {
    return existingUserId;
  }

  const newUserId = createAnonymousUserId();
  window.localStorage.setItem(ANONYMOUS_USER_STORAGE_KEY, newUserId);

  return newUserId;
}


type ElectoralProgramFile = {
  label: string;
  href: string;
};

const nationalElectoralProgramFiles: ElectoralProgramFile[] = [
  { label: "Generales_PSOE.pdf", href: "/programas-electorales/Generales_PSOE.pdf" },
  { label: "Generales_PP.pdf", href: "/programas-electorales/Generales_PP.pdf" },
  { label: "Generales_VOX.pdf", href: "/programas-electorales/Generales_VOX.pdf" },
  { label: "Generales_SUMAR.pdf", href: "/programas-electorales/Generales_SUMAR.pdf" },
  { label: "Generales_PODEMOS.pdf", href: "/programas-electorales/Generales_PODEMOS.pdf" },
  { label: "Generales_CIUDADANOS.pdf", href: "/programas-electorales/Generales_CIUDADANOS.pdf" },
  { label: "Generales_PACMA.pdf", href: "/programas-electorales/Generales_PACMA.pdf" },
  { label: "Generales_RECORTE_CERO.pdf", href: "/programas-electorales/Generales_RECORTE_CERO.pdf" },
  { label: "Generales_FRENTE_OBRERO.pdf", href: "/programas-electorales/Generales_FRENTE_OBRERO.pdf" },
  { label: "Generales_FALANGE_ESPANOLA.pdf", href: "/programas-electorales/Generales_FALANGE_ESPANOLA.pdf" },
  { label: "Generales_PCTE.pdf", href: "/programas-electorales/Generales_PCTE.pdf" },
  { label: "Generales_PCPE.pdf", href: "/programas-electorales/Generales_PCPE.pdf" },
  { label: "Generales_ERC.pdf", href: "/programas-electorales/Generales_ERC.pdf" },
  { label: "Generales_JUNTS.pdf", href: "/programas-electorales/Generales_JUNTS.pdf" },
  { label: "Generales_CUP.pdf", href: "/programas-electorales/Generales_CUP.pdf" },
  { label: "Generales_PNV.pdf", href: "/programas-electorales/Generales_PNV.pdf" },
  { label: "Generales_EH_BILDU.pdf", href: "/programas-electorales/Generales_EH_BILDU.pdf" },
  { label: "Generales_BNG.pdf", href: "/programas-electorales/Generales_BNG.pdf" },
  { label: "Generales_COALICION_CANARIA.pdf", href: "/programas-electorales/Generales_COALICION_CANARIA.pdf" },
  { label: "Generales_UPN.pdf", href: "/programas-electorales/Generales_UPN.pdf" },
  { label: "Generales_COMPROMIS.pdf", href: "/programas-electorales/Generales_COMPROMIS.pdf" },
];

const regionalElectoralProgramFiles: ElectoralProgramFile[] = [
  { label: "Autonomicas_Andalucia_PP-A.pdf", href: "/programas-electorales/Autonomicas_Andalucia_PP-A.pdf" },
  { label: "Autonomicas_Andalucia_PSOE-A.pdf", href: "/programas-electorales/Autonomicas_Andalucia_PSOE-A.pdf" },
  { label: "Autonomicas_Andalucia_VOX_ANDALUCIA.pdf", href: "/programas-electorales/Autonomicas_Andalucia_VOX_ANDALUCIA.pdf" },
  { label: "Autonomicas_Andalucia_POR_ANDALUCIA.pdf", href: "/programas-electorales/Autonomicas_Andalucia_POR_ANDALUCIA.pdf" },
  { label: "Autonomicas_Andalucia_ADELANTE_ANDALUCIA.pdf", href: "/programas-electorales/Autonomicas_Andalucia_ADELANTE_ANDALUCIA.pdf" },
  { label: "Autonomicas_Aragon_PP_ARAGON.pdf", href: "/programas-electorales/Autonomicas_Aragon_PP_ARAGON.pdf" },
  { label: "Autonomicas_Aragon_PSOE_ARAGON.pdf", href: "/programas-electorales/Autonomicas_Aragon_PSOE_ARAGON.pdf" },
  { label: "Autonomicas_Aragon_VOX_ARAGON.pdf", href: "/programas-electorales/Autonomicas_Aragon_VOX_ARAGON.pdf" },
  { label: "Autonomicas_Aragon_CHA.pdf", href: "/programas-electorales/Autonomicas_Aragon_CHA.pdf" },
  { label: "Autonomicas_Aragon_ARAGON_EXISTE.pdf", href: "/programas-electorales/Autonomicas_Aragon_ARAGON_EXISTE.pdf" },
  { label: "Autonomicas_Asturias_PSOE_ASTURIAS.pdf", href: "/programas-electorales/Autonomicas_Asturias_PSOE_ASTURIAS.pdf" },
  { label: "Autonomicas_Asturias_PP_ASTURIAS.pdf", href: "/programas-electorales/Autonomicas_Asturias_PP_ASTURIAS.pdf" },
  { label: "Autonomicas_Asturias_VOX_ASTURIAS.pdf", href: "/programas-electorales/Autonomicas_Asturias_VOX_ASTURIAS.pdf" },
  { label: "Autonomicas_Asturias_IU_CONVOCATORIA_POR_ASTURIAS.pdf", href: "/programas-electorales/Autonomicas_Asturias_IU_CONVOCATORIA_POR_ASTURIAS.pdf" },
  { label: "Autonomicas_Asturias_FORO_ASTURIAS.pdf", href: "/programas-electorales/Autonomicas_Asturias_FORO_ASTURIAS.pdf" },
  { label: "Autonomicas_Baleares_PP_BALEARS.pdf", href: "/programas-electorales/Autonomicas_Baleares_PP_BALEARS.pdf" },
  { label: "Autonomicas_Baleares_PSIB-PSOE.pdf", href: "/programas-electorales/Autonomicas_Baleares_PSIB-PSOE.pdf" },
  { label: "Autonomicas_Baleares_VOX_BALEARES.pdf", href: "/programas-electorales/Autonomicas_Baleares_VOX_BALEARES.pdf" },
  { label: "Autonomicas_Baleares_MES_PER_MALLORCA.pdf", href: "/programas-electorales/Autonomicas_Baleares_MES_PER_MALLORCA.pdf" },
  { label: "Autonomicas_Baleares_UNIDAS_PODEMOS_BALEARES.pdf", href: "/programas-electorales/Autonomicas_Baleares_UNIDAS_PODEMOS_BALEARES.pdf" },
  { label: "Autonomicas_Canarias_COALICION_CANARIA.pdf", href: "/programas-electorales/Autonomicas_Canarias_COALICION_CANARIA.pdf" },
  { label: "Autonomicas_Canarias_PSOE_CANARIAS.pdf", href: "/programas-electorales/Autonomicas_Canarias_PSOE_CANARIAS.pdf" },
  { label: "Autonomicas_Canarias_PP_CANARIAS.pdf", href: "/programas-electorales/Autonomicas_Canarias_PP_CANARIAS.pdf" },
  { label: "Autonomicas_Canarias_VOX_CANARIAS.pdf", href: "/programas-electorales/Autonomicas_Canarias_VOX_CANARIAS.pdf" },
  { label: "Autonomicas_Canarias_NUEVA_CANARIAS.pdf", href: "/programas-electorales/Autonomicas_Canarias_NUEVA_CANARIAS.pdf" },
  { label: "Autonomicas_Cantabria_PP_CANTABRIA.pdf", href: "/programas-electorales/Autonomicas_Cantabria_PP_CANTABRIA.pdf" },
  { label: "Autonomicas_Cantabria_PRC.pdf", href: "/programas-electorales/Autonomicas_Cantabria_PRC.pdf" },
  { label: "Autonomicas_Cantabria_PSOE_CANTABRIA.pdf", href: "/programas-electorales/Autonomicas_Cantabria_PSOE_CANTABRIA.pdf" },
  { label: "Autonomicas_Cantabria_VOX_CANTABRIA.pdf", href: "/programas-electorales/Autonomicas_Cantabria_VOX_CANTABRIA.pdf" },
  { label: "Autonomicas_Castilla-La_Mancha_PSOE_CASTILLA-LA_MANCHA.pdf", href: "/programas-electorales/Autonomicas_Castilla-La_Mancha_PSOE_CASTILLA-LA_MANCHA.pdf" },
  { label: "Autonomicas_Castilla-La_Mancha_PP_CASTILLA-LA_MANCHA.pdf", href: "/programas-electorales/Autonomicas_Castilla-La_Mancha_PP_CASTILLA-LA_MANCHA.pdf" },
  { label: "Autonomicas_Castilla-La_Mancha_VOX_CASTILLA-LA_MANCHA.pdf", href: "/programas-electorales/Autonomicas_Castilla-La_Mancha_VOX_CASTILLA-LA_MANCHA.pdf" },
  { label: "Autonomicas_Castilla_y_Leon_PP_CASTILLA_Y_LEON.pdf", href: "/programas-electorales/Autonomicas_Castilla_y_Leon_PP_CASTILLA_Y_LEON.pdf" },
  { label: "Autonomicas_Castilla_y_Leon_PSOE_CASTILLA_Y_LEON.pdf", href: "/programas-electorales/Autonomicas_Castilla_y_Leon_PSOE_CASTILLA_Y_LEON.pdf" },
  { label: "Autonomicas_Castilla_y_Leon_VOX_CASTILLA_Y_LEON.pdf", href: "/programas-electorales/Autonomicas_Castilla_y_Leon_VOX_CASTILLA_Y_LEON.pdf" },
  { label: "Autonomicas_Castilla_y_Leon_UPL.pdf", href: "/programas-electorales/Autonomicas_Castilla_y_Leon_UPL.pdf" },
  { label: "Autonomicas_Castilla_y_Leon_SORIA_YA.pdf", href: "/programas-electorales/Autonomicas_Castilla_y_Leon_SORIA_YA.pdf" },
  { label: "Autonomicas_Cataluna_PSC.pdf", href: "/programas-electorales/Autonomicas_Cataluna_PSC.pdf" },
  { label: "Autonomicas_Cataluna_JUNTS.pdf", href: "/programas-electorales/Autonomicas_Cataluna_JUNTS.pdf" },
  { label: "Autonomicas_Cataluna_ERC.pdf", href: "/programas-electorales/Autonomicas_Cataluna_ERC.pdf" },
  { label: "Autonomicas_Cataluna_VOX_CATALUNA.pdf", href: "/programas-electorales/Autonomicas_Cataluna_VOX_CATALUNA.pdf" },
  { label: "Autonomicas_Cataluna_PP_CATALUNA.pdf", href: "/programas-electorales/Autonomicas_Cataluna_PP_CATALUNA.pdf" },
  { label: "Autonomicas_Cataluna_COMUNS.pdf", href: "/programas-electorales/Autonomicas_Cataluna_COMUNS.pdf" },
  { label: "Autonomicas_Cataluna_CUP.pdf", href: "/programas-electorales/Autonomicas_Cataluna_CUP.pdf" },
  { label: "Autonomicas_Cataluna_ALIANCA_CATALANA.pdf", href: "/programas-electorales/Autonomicas_Cataluna_ALIANCA_CATALANA.pdf" },
  { label: "Autonomicas_Comunidad_Valenciana_PP_COMUNITAT_VALENCIANA.pdf", href: "/programas-electorales/Autonomicas_Comunidad_Valenciana_PP_COMUNITAT_VALENCIANA.pdf" },
  { label: "Autonomicas_Comunidad_Valenciana_PSPV-PSOE.pdf", href: "/programas-electorales/Autonomicas_Comunidad_Valenciana_PSPV-PSOE.pdf" },
  { label: "Autonomicas_Comunidad_Valenciana_VOX_COMUNIDAD_VALENCIANA.pdf", href: "/programas-electorales/Autonomicas_Comunidad_Valenciana_VOX_COMUNIDAD_VALENCIANA.pdf" },
  { label: "Autonomicas_Comunidad_Valenciana_COMPROMIS.pdf", href: "/programas-electorales/Autonomicas_Comunidad_Valenciana_COMPROMIS.pdf" },
  { label: "Autonomicas_Extremadura_PP_EXTREMADURA.pdf", href: "/programas-electorales/Autonomicas_Extremadura_PP_EXTREMADURA.pdf" },
  { label: "Autonomicas_Extremadura_PSOE_EXTREMADURA.pdf", href: "/programas-electorales/Autonomicas_Extremadura_PSOE_EXTREMADURA.pdf" },
  { label: "Autonomicas_Extremadura_VOX_EXTREMADURA.pdf", href: "/programas-electorales/Autonomicas_Extremadura_VOX_EXTREMADURA.pdf" },
  { label: "Autonomicas_Extremadura_UNIDAS_POR_EXTREMADURA.pdf", href: "/programas-electorales/Autonomicas_Extremadura_UNIDAS_POR_EXTREMADURA.pdf" },
  { label: "Autonomicas_Galicia_PPDEG.pdf", href: "/programas-electorales/Autonomicas_Galicia_PPDEG.pdf" },
  { label: "Autonomicas_Galicia_PSDEG-PSOE.pdf", href: "/programas-electorales/Autonomicas_Galicia_PSDEG-PSOE.pdf" },
  { label: "Autonomicas_Galicia_BNG.pdf", href: "/programas-electorales/Autonomicas_Galicia_BNG.pdf" },
  { label: "Autonomicas_Galicia_VOX_GALICIA.pdf", href: "/programas-electorales/Autonomicas_Galicia_VOX_GALICIA.pdf" },
  { label: "Autonomicas_La_Rioja_PP_LA_RIOJA.pdf", href: "/programas-electorales/Autonomicas_La_Rioja_PP_LA_RIOJA.pdf" },
  { label: "Autonomicas_La_Rioja_PSOE_LA_RIOJA.pdf", href: "/programas-electorales/Autonomicas_La_Rioja_PSOE_LA_RIOJA.pdf" },
  { label: "Autonomicas_La_Rioja_VOX_LA_RIOJA.pdf", href: "/programas-electorales/Autonomicas_La_Rioja_VOX_LA_RIOJA.pdf" },
  { label: "Autonomicas_Madrid_PP_MADRID.pdf", href: "/programas-electorales/Autonomicas_Madrid_PP_MADRID.pdf" },
  { label: "Autonomicas_Madrid_MAS_MADRID.pdf", href: "/programas-electorales/Autonomicas_Madrid_MAS_MADRID.pdf" },
  { label: "Autonomicas_Madrid_PSOE_MADRID.pdf", href: "/programas-electorales/Autonomicas_Madrid_PSOE_MADRID.pdf" },
  { label: "Autonomicas_Madrid_VOX_MADRID.pdf", href: "/programas-electorales/Autonomicas_Madrid_VOX_MADRID.pdf" },
  { label: "Autonomicas_Murcia_PP_REGION_DE_MURCIA.pdf", href: "/programas-electorales/Autonomicas_Murcia_PP_REGION_DE_MURCIA.pdf" },
  { label: "Autonomicas_Murcia_PSOE_MURCIA.pdf", href: "/programas-electorales/Autonomicas_Murcia_PSOE_MURCIA.pdf" },
  { label: "Autonomicas_Murcia_VOX_MURCIA.pdf", href: "/programas-electorales/Autonomicas_Murcia_VOX_MURCIA.pdf" },
  { label: "Autonomicas_Murcia_PODEMOS-IU_MURCIA.pdf", href: "/programas-electorales/Autonomicas_Murcia_PODEMOS-IU_MURCIA.pdf" },
  { label: "Autonomicas_Navarra_UPN.pdf", href: "/programas-electorales/Autonomicas_Navarra_UPN.pdf" },
  { label: "Autonomicas_Navarra_PSN-PSOE.pdf", href: "/programas-electorales/Autonomicas_Navarra_PSN-PSOE.pdf" },
  { label: "Autonomicas_Navarra_EH_BILDU_NAVARRA.pdf", href: "/programas-electorales/Autonomicas_Navarra_EH_BILDU_NAVARRA.pdf" },
  { label: "Autonomicas_Navarra_GEROA_BAI.pdf", href: "/programas-electorales/Autonomicas_Navarra_GEROA_BAI.pdf" },
  { label: "Autonomicas_Navarra_PP_NAVARRA.pdf", href: "/programas-electorales/Autonomicas_Navarra_PP_NAVARRA.pdf" },
  { label: "Autonomicas_Navarra_VOX_NAVARRA.pdf", href: "/programas-electorales/Autonomicas_Navarra_VOX_NAVARRA.pdf" },
  { label: "Autonomicas_Pais_Vasco_PNV.pdf", href: "/programas-electorales/Autonomicas_Pais_Vasco_PNV.pdf" },
  { label: "Autonomicas_Pais_Vasco_EH_BILDU.pdf", href: "/programas-electorales/Autonomicas_Pais_Vasco_EH_BILDU.pdf" },
  { label: "Autonomicas_Pais_Vasco_PSE-EE.pdf", href: "/programas-electorales/Autonomicas_Pais_Vasco_PSE-EE.pdf" },
  { label: "Autonomicas_Pais_Vasco_PP_PAIS_VASCO.pdf", href: "/programas-electorales/Autonomicas_Pais_Vasco_PP_PAIS_VASCO.pdf" },
  { label: "Autonomicas_Pais_Vasco_VOX_PAIS_VASCO.pdf", href: "/programas-electorales/Autonomicas_Pais_Vasco_VOX_PAIS_VASCO.pdf" },
];

function ElectoralProgramsCard() {
  return (
    <section className="electoral-programs-card">
      <div className="electoral-programs-card__intro">
        <h2>Programas electorales utilizados como referencia</h2>
        <p>
          Puedes consultar los programas electorales que sirven como base documental
          para ajustar la afinidad política del test.
        </p>
      </div>

      <details className="electoral-programs-card__details">
        <summary>Ver programas electorales generales</summary>
        <ul className="electoral-programs-card__list">
          {nationalElectoralProgramFiles.map((file) => (
            <li key={file.href}>
              <a href={file.href} target="_blank" rel="noreferrer">
                {file.label}
              </a>
            </li>
          ))}
        </ul>
      </details>

      <details className="electoral-programs-card__details">
        <summary>Ver programas autonómicos</summary>
        <ul className="electoral-programs-card__list electoral-programs-card__list--regional">
          {regionalElectoralProgramFiles.map((file) => (
            <li key={file.href}>
              <a href={file.href} target="_blank" rel="noreferrer">
                {file.label}
              </a>
            </li>
          ))}
        </ul>
      </details>

      <p className="electoral-programs-card__legal-note">
        Nota de transparencia: el resultado es orientativo. El algoritmo compara tus
        respuestas con perfiles ideológicos elaborados a partir de programas
        electorales, medidas públicas y posicionamientos políticos generales. Esta
        web no representa a ningún partido político ni implica afiliación,
        recomendación oficial o verificación por parte de las formaciones citadas.
      </p>
    </section>
  );
}


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
    institucionalista:
      "das importancia a la estabilidad del sistema, el respeto a las normas, las instituciones, los procedimientos legales y los acuerdos que evitan cambios bruscos o decisiones improvisadas.",
    neutralista:
      "prefieres una política exterior prudente, con menos dependencia de bloques internacionales o alianzas automáticas. Este perfil suele dar prioridad a evitar conflictos externos y mantener margen propio de decisión.",
    populista:
      "tiendes a desconfiar de élites políticas, económicas o mediáticas y a valorar propuestas que dicen representar de forma directa a la gente común frente al sistema establecido.",
    ecologista:
      "das mucha importancia a la transición energética, la protección ambiental, la sostenibilidad y la intervención pública frente al cambio climático.",
  };

  return `${label} (${item.percentage}%): ${details[item.ideology] ?? "tu resultado muestra que esta orientación influye en tu forma de entender la política. Significa que varias de tus respuestas coinciden con las ideas centrales de este perfil, aunque no tenga por qué definirte por completo."}`;
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
    return "Perfil orientativo muy breve. Este test tiene solo 10 preguntas, por lo que sirve para detectar una tendencia general, pero no permite leer con precisión todos los matices de economía, sociedad, nación o autoridad.";
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


function getPartyAlignedVoterType(
  topIdeologies: IdeologyResult[],
  consistency: number,
  nationalParty: PartyMatch
) {
  if (!nationalParty.isClearMatch || consistency < 60 || nationalParty.percentage < 64) return null;

  const has = (ideology: string, minimum = 55) =>
    topIdeologies.some((item) => item.ideology === ideology && item.percentage >= minimum);

  const party = nationalParty.party;

  if (party === "VOX") {
    if (has("liberal") || has("libertario")) return "Nacional-liberal conservador";
    if (has("autoritario")) return "Nacional-conservador de orden";
    return "Nacional-conservador";
  }

  if (party === "PP") {
    if (has("liberal") && has("conservador")) return "Liberal-conservador institucional";
    if (has("nacionalista") || has("soberanista")) return "Conservador nacional institucional";
    if (has("socialdemocrata")) return "Centro reformista institucional";
    return "Conservador institucional";
  }

  if (party === "PSOE") {
    if (has("progresista") && has("globalista")) return "Socialdemócrata progresista europeísta";
    if (has("institucionalista")) return "Socialdemócrata institucional";
    if (has("soberanista") || has("nacionalista")) return "Socialdemócrata soberanista";
    return "Socialdemócrata reformista";
  }

  if (party === "Sumar") {
    if (has("ecologista")) return "Ecosocial progresista";
    if (has("multiculturalista") || has("globalista")) return "Progresista ecosocial cosmopolita";
    return "Izquierda progresista";
  }

  if (party === "Podemos") {
    if (has("comunista")) return "Izquierda transformadora";
    if (has("soberanista") || has("nacionalista")) return "Izquierda soberanista";
    return "Izquierda intervencionista progresista";
  }

  return null;
}

function getVoterType(
  topIdeologies: IdeologyResult[],
  consistency: number,
  nationalParty: PartyMatch
) {
  const top = topIdeologies.slice(0, 5);
  const first = top[0];
  const second = top[1];

  if (!first) return "Perfil político no determinado";

  const partyAlignedType = getPartyAlignedVoterType(top, consistency, nationalParty);
  if (partyAlignedType) return partyAlignedType;

  const has = (ideology: string, minimum = 55) =>
    top.some((item) => item.ideology === ideology && item.percentage >= minimum);

  const firstIdeology = first.ideology;
  const secondIdeology = second?.ideology;
  const firstLabel = ideologyLabels[firstIdeology] ?? firstIdeology;

  if (consistency < 60) {
    return "Perfil ideológico transversal";
  }

  if (has("nacionalista") || has("soberanista")) {
    if (has("progresista") || has("socialista") || has("socialdemocrata")) {
      return has("nacionalista") ? "Nacional-progresista" : "Soberanista progresista";
    }

    if (has("conservador") || has("tradicionalista")) {
      return "Nacional-conservador";
    }

    if (has("liberal") || has("libertario")) {
      return "Liberal soberanista";
    }

    if (has("autoritario")) {
      return "Nacional-ordenista";
    }

    if (has("neutralista")) {
      return "Soberanista neutralista";
    }

    return "Soberanista pragmático";
  }

  if (has("socialdemocrata")) {
    if (has("globalista") || has("institucionalista")) return "Socialdemócrata institucional";
    if (has("progresista")) return "Socialdemócrata progresista";
    if (has("conservador")) return "Socialdemócrata moderado";
    return "Socialdemócrata reformista";
  }

  if (has("socialista")) {
    if (has("progresista") || has("multiculturalista")) return "Socialista progresista";
    if (has("comunista")) return "Izquierda transformadora";
    if (has("institucionalista")) return "Socialista institucional";
    return "Socialista intervencionista";
  }

  if (has("comunista")) {
    if (has("progresista")) return "Izquierda transformadora progresista";
    if (has("soberanista")) return "Izquierda soberanista";
    return "Izquierda transformadora";
  }

  if (has("liberal") || has("libertario")) {
    if (has("conservador")) return "Liberal-conservador";
    if (has("globalista")) return "Liberal cosmopolita";
    if (has("progresista")) return "Liberal progresista";
    if (has("institucionalista")) return "Liberal institucional";
    return has("libertario") ? "Libertario liberal" : "Liberal económico";
  }

  if (has("conservador") || has("tradicionalista")) {
    if (has("autoritario")) return "Conservador de orden";
    if (has("institucionalista")) return "Conservador institucional";
    return has("tradicionalista") ? "Tradicionalista cultural" : "Conservador social";
  }

  if (has("progresista")) {
    if (has("globalista") || has("multiculturalista")) return "Progresista cosmopolita";
    if (has("institucionalista")) return "Progresista institucional";
    return "Progresista social";
  }

  if (has("globalista")) {
    if (has("multiculturalista")) return "Cosmopolita multicultural";
    if (has("institucionalista")) return "Europeísta institucional";
    return "Europeísta/globalista";
  }

  if (has("multiculturalista")) {
    return "Pluralista multicultural";
  }

  if (has("autoritario")) {
    if (has("institucionalista")) return "Ordenista institucional";
    return "Ordenista/autoritario";
  }

  if (has("institucionalista")) {
    return "Reformista institucional";
  }

  if (has("neutralista")) {
    return "Neutralista pragmático";
  }

  if (has("populista")) {
    if (secondIdeology === "socialista" || secondIdeology === "socialdemocrata") return "Populista social";
    if (secondIdeology === "nacionalista" || secondIdeology === "soberanista") return "Populista nacional";
    return "Populista anti-élite";
  }

  if (second && Math.abs(first.percentage - second.percentage) <= 6) {
    const secondLabel = ideologyLabels[second.ideology] ?? second.ideology;
    return `${firstLabel}-${secondLabel}`;
  }

  return `${firstLabel} pragmático`;
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
        nationalParty: block.nationalParty,
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
      percentage: Math.round(calculatePartySimilarityPure(results.ideologyPercentages, profile)),
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 4);

  const consistency = getCompleteConsistency(realContradictionCount, results.ideologyPercentages);

  return {
    voterType: getVoterType(results.ideologyPercentages.slice(0, 5), consistency, results.finalNationalParty),
    consistency,
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


function isIndependenceQuestionCommunity(selectedCommunity: string) {
  return INDEPENDENCE_QUESTION_COMMUNITIES.has(selectedCommunity);
}

function getEffectiveIndependencePosition(
  selectedCommunity: string,
  independencePosition: IndependencePosition
): IndependencePosition {
  if (!isIndependenceQuestionCommunity(selectedCommunity)) return "unclear";
  return independencePosition;
}

function getTerritorialReferenceFromIndependence(
  selectedCommunity: string,
  independencePosition: IndependencePosition
): TerritorialReference {
  if (!isIndependenceQuestionCommunity(selectedCommunity)) return "spain";

  if (independencePosition === "independence" || independencePosition === "right_to_decide") {
    return "selectedCommunity";
  }

  if (independencePosition === "autonomy_inside_spain") {
    return "mixed";
  }

  if (independencePosition === "against_independence") {
    return "spain";
  }

  return "mixed";
}

function getTerritorialReferenceLabel(
  territorialReference: TerritorialReference,
  selectedCommunityName: string
) {
  if (territorialReference === "selectedCommunity") return selectedCommunityName;
  if (territorialReference === "mixed") return `España y ${selectedCommunityName}`;
  return "España";
}

function getIndependencePositionLabel(independencePosition: IndependencePosition) {
  return (
    independencePositionOptions.find((option) => option.value === independencePosition)?.label ??
    "No tengo una posición clara"
  );
}

function getIdeologyValue(userProfile: IdeologyResult[], ideology: string) {
  return userProfile.find((item) => item.ideology === ideology)?.percentage ?? 50;
}

type CompositeIdeologyDefinition = {
  id: string;
  label: string;
  description: string;
  positive: Record<string, number>;
  negative?: Record<string, number>;
  minimumSignals?: Record<string, number>;
  components: string[];
  isHistoricalCategory?: boolean;
};

const compositeIdeologyDefinitions: CompositeIdeologyDefinition[] = [
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
    minimumSignals: { comunista: 55, socialista: 58 },
    components: ["comunista", "socialista", "antiliberalismo económico"],
  },
  {
    id: "bolchevismo",
    label: "Bolchevismo",
    description:
      "Categoría histórica derivada del marxismo revolucionario: combina comunismo, economía planificada, centralización política, partido de vanguardia y autoridad estatal fuerte.",
    positive: { comunista: 2.4, socialista: 1.8, autoritario: 1.8, soberanista: 0.8, populista: 0.6 },
    negative: { liberal: 1.8, libertario: 1.5, globalista: 0.5 },
    minimumSignals: { comunista: 62, autoritario: 55 },
    components: ["comunista", "socialista", "autoritario", "centralista"],
    isHistoricalCategory: true,
  },
  {
    id: "nacional_socialismo",
    label: "Nacional-socialismo (categoría histórica)",
    description:
      "Categoría histórica extremadamente específica. No equivale a nacionalismo + socialismo: exige autoritarismo fuerte, ultranacionalismo, identitarismo excluyente, antiliberalismo, antiglobalismo y rechazo del pluralismo.",
    positive: {
      nacionalista: 2.8,
      autoritario: 2.3,
      tradicionalista: 1.6,
      conservador: 1.5,
      soberanista: 1.4,
      populista: 0.8,
      socialista: 0.4,
    },
    negative: { globalista: 2.2, multiculturalista: 2.4, liberal: 1.2, libertario: 1.7, progresista: 1.5, comunista: 1.0 },
    minimumSignals: { nacionalista: 72, autoritario: 62, multiculturalista: 0, globalista: 0 },
    components: ["ultranacionalismo", "autoritarismo", "identitarismo excluyente", "antiglobalismo"],
    isHistoricalCategory: true,
  },
  {
    id: "tercera_posicion",
    label: "Tercera posición",
    description:
      "Categoría político-histórica específica que rechaza tanto el liberalismo económico puro como el socialismo internacionalista. Solo debe aparecer cuando se combinan con mucha intensidad soberanismo, nacionalismo, anti-globalismo, populismo e intervencionismo económico.",
    positive: { nacionalista: 2.2, soberanista: 2.2, populista: 1.6, conservador: 1, socialista: 0.6 },
    negative: { globalista: 2, liberal: 1, multiculturalista: 1.4 },
    minimumSignals: { nacionalista: 72, soberanista: 72, globalista: 0, multiculturalista: 0 },
    components: ["nacionalista", "soberanista", "populista", "intervencionismo"],
    isHistoricalCategory: true,
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

function calculateCompositeIdeologies(userProfile: IdeologyResult[]): CompositeIdeologyResult[] {
  const value = (ideology: string) => getIdeologyValue(userProfile, ideology);

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

      let percentage = totalWeight > 0 ? Math.round(weightedScore / totalWeight) : 0;
      let passesMinimumSignals = true;

      if (definition.minimumSignals) {
        Object.entries(definition.minimumSignals).forEach(([ideology, minimum]) => {
          if (minimum > 0 && value(ideology) < minimum) {
            passesMinimumSignals = false;
            percentage = Math.min(percentage, Math.max(0, value(ideology) - 12));
          }

          if (minimum === 0 && value(ideology) > 28) {
            passesMinimumSignals = false;
            percentage = Math.min(percentage, 52);
          }
        });
      }

      if (definition.isHistoricalCategory && (!passesMinimumSignals || percentage < 85)) {
        percentage = Math.min(percentage, 49);
      }

      return {
        id: definition.id,
        label: definition.label,
        percentage: clamp(percentage),
        description: definition.description,
        components: definition.components,
        isHistoricalCategory: definition.isHistoricalCategory,
      };
    })
    .filter((item) => (item.isHistoricalCategory ? item.percentage >= 85 : item.percentage >= 50))
    .sort((a, b) => b.percentage - a.percentage);
}

function getCompositeIdeologyLevel(percentage: number) {
  if (percentage >= 75) return "Afinidad alta";
  if (percentage >= 62) return "Afinidad media";
  if (percentage >= 50) return "Afinidad parcial";
  return "Afinidad baja";
}
function getCompositeComponentPercentage(userProfile: IdeologyResult[], component: string) {
  const exactValue = userProfile.find((item) => item.ideology === component)?.percentage;

  if (exactValue !== undefined) {
    return `${ideologyLabels[component] ?? component}: ${exactValue}%`;
  }

  return component;
}

function getCompositeIdeologyInfo(item: CompositeIdeologyResult | undefined) {
  if (!item) return null;

  return {
    title: item.label,
    description: item.description,
    percentage: item.percentage,
    level: getCompositeIdeologyLevel(item.percentage),
    components: item.components,
    isHistoricalCategory: item.isHistoricalCategory,
  };
}
function calculateResults(
  answers: Answers,
  questions: Question[],
  selectedCommunity: string,
  independencePosition: IndependencePosition
) {
  const ideologyScore: Record<string, number> = {};
  const ideologyMax: Record<string, number> = {};
  const blockScore: Record<string, Record<string, number>> = {};
  const blockMax: Record<string, Record<string, number>> = {};
  const territorialReference = getTerritorialReferenceFromIndependence(
    selectedCommunity,
    independencePosition
  );

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
  const nationalProfiles = getEligibleNationalPartyProfiles();

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
      nationalParty: findClosestPartyByBlock(
        ideologies,
        nationalProfiles,
        block,
        selectedCommunity,
        independencePosition
      ),
      regionalParty: findClosestParty(
        ideologies,
        regionalProfiles,
        selectedCommunity,
        independencePosition,
        false
      ),
    };
  });

  return {
    ideologyPercentages,
    blockResults,
    finalNationalParty: findClosestParty(
      ideologyPercentages,
      nationalProfiles,
      selectedCommunity,
      independencePosition,
      true
    ),
    finalRegionalParty: findClosestParty(
      ideologyPercentages,
      regionalProfiles,
      selectedCommunity,
      independencePosition,
      false
    ),
  };
}

function getEligibleNationalPartyProfiles() {
  return Object.fromEntries(
    Object.entries(nationalPartyProfiles).filter(([party]) =>
      COMMON_GENERAL_ELECTION_PARTIES.includes(party)
    )
  );
}

function findClosestParty(
  userProfile: IdeologyResult[],
  partyProfiles: Record<string, Record<string, number>>,
  selectedCommunity: string,
  independencePosition: IndependencePosition,
  isNationalResult: boolean
): PartyMatch {
  let bestParty = "";
  let bestSimilarity = -Infinity;

  Object.entries(partyProfiles).forEach(([party, profile]) => {
    const similarity = calculatePartySimilarity(
      userProfile,
      profile,
      party,
      selectedCommunity,
      independencePosition,
      isNationalResult
    );

    if (similarity > bestSimilarity) {
      bestSimilarity = similarity;
      bestParty = party;
    }
  });

  const percentage = Math.round(bestSimilarity);

  if (percentage < MIN_CLEAR_PARTY_MATCH) {
    return {
      party: "Sin partido claramente afín",
      percentage,
      isClearMatch: false,
      closestParty: bestParty,
      explanation:
        "Tu perfil ideológico no encaja de forma suficientemente clara con ningún partido incluido. Esto puede ocurrir cuando combinas posiciones que los programas electorales actuales no suelen reunir en una misma candidatura.",
    };
  }

  return {
    party: bestParty,
    percentage,
    isClearMatch: true,
  };
}

function findClosestPartyByBlock(
  userProfile: IdeologyResult[],
  partyProfiles: Record<string, Record<string, number>>,
  block: string,
  selectedCommunity: string,
  independencePosition: IndependencePosition
): PartyMatch {
  let bestParty = "";
  let bestSimilarity = -Infinity;

  Object.entries(partyProfiles).forEach(([party, profile]) => {
    const similarity =
      calculatePartySimilarityPure(userProfile, profile) +
      calculateBlockTerritorialCompatibilityAdjustment(
        party,
        block,
        selectedCommunity,
        independencePosition
      );

    if (similarity > bestSimilarity) {
      bestSimilarity = similarity;
      bestParty = party;
    }
  });

  const percentage = Math.round(clamp(bestSimilarity));

  if (percentage < MIN_BLOCK_PARTY_MATCH) {
    return {
      party: "Sin partido claramente afín",
      percentage,
      isClearMatch: false,
      closestParty: bestParty,
      explanation:
        "En este bloque no hay una coincidencia suficientemente clara con los partidos estatales incluidos.",
    };
  }

  return {
    party: bestParty,
    percentage,
    isClearMatch: true,
  };
}

function calculatePartySimilarityPure(
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

function calculatePartySimilarity(
  userProfile: IdeologyResult[],
  partyProfile: Record<string, number>,
  partyName: string,
  selectedCommunity: string,
  independencePosition: IndependencePosition,
  isNationalResult: boolean
) {
  const baseSimilarity = calculatePartySimilarityPure(userProfile, partyProfile);

  if (isNationalResult) {
    return clamp(
      baseSimilarity +
        calculateNationalTerritorialCompatibilityAdjustment(
          partyName,
          selectedCommunity,
          independencePosition
        )
    );
  }

  return clamp(
    baseSimilarity +
      calculateRegionalTerritorialCompatibilityAdjustment(
        partyName,
        selectedCommunity,
        independencePosition
      )
  );
}

function calculateNationalTerritorialCompatibilityAdjustment(
  partyName: string,
  selectedCommunity: string,
  independencePosition: IndependencePosition
) {
  const effectivePosition = getEffectiveIndependencePosition(selectedCommunity, independencePosition);

  if (effectivePosition === "independence") {
    if (HARD_SPANISH_UNIONIST_GENERAL_PARTIES.has(partyName)) return -100;
    if (MODERATE_SPANISH_UNIONIST_GENERAL_PARTIES.has(partyName)) return -45;
    if (partyName === "PSOE") return -8;
    return 0;
  }

  if (effectivePosition === "right_to_decide") {
    if (HARD_SPANISH_UNIONIST_GENERAL_PARTIES.has(partyName)) return -70;
    if (MODERATE_SPANISH_UNIONIST_GENERAL_PARTIES.has(partyName)) return -25;
    return 0;
  }

  if (effectivePosition === "autonomy_inside_spain") {
    if (partyName === "VOX" || partyName === "Ciudadanos") return -12;
    return 0;
  }

  if (effectivePosition === "against_independence") {
    if (partyName === "PP" || partyName === "VOX" || partyName === "Ciudadanos") return 6;
    return 0;
  }

  return 0;
}

function isHardSpanishUnionistRegionalParty(partyName: string) {
  const normalizedPartyName = partyName.toLowerCase();
  return (
    normalizedPartyName.includes("vox") ||
    normalizedPartyName.includes("ciudadanos")
  );
}

function isModerateSpanishUnionistRegionalParty(partyName: string) {
  const normalizedPartyName = partyName.toLowerCase();
  return normalizedPartyName.includes("pp");
}

function isSoftSpanishUnionistRegionalParty(partyName: string) {
  const normalizedPartyName = partyName.toLowerCase();
  return (
    normalizedPartyName.includes("psoe") ||
    normalizedPartyName.includes("psc") ||
    normalizedPartyName.includes("pse") ||
    normalizedPartyName.includes("psn") ||
    normalizedPartyName.includes("psdeg") ||
    normalizedPartyName.includes("pspv") ||
    normalizedPartyName.includes("psib")
  );
}

function calculateRegionalTerritorialCompatibilityAdjustment(
  partyName: string,
  selectedCommunity: string,
  independencePosition: IndependencePosition
) {
  const effectivePosition = getEffectiveIndependencePosition(selectedCommunity, independencePosition);

  if (effectivePosition === "independence") {
    if (isHardSpanishUnionistRegionalParty(partyName)) return -100;
    if (isModerateSpanishUnionistRegionalParty(partyName)) return -45;
    if (isSoftSpanishUnionistRegionalParty(partyName)) return -8;
    return 0;
  }

  if (effectivePosition === "right_to_decide") {
    if (isHardSpanishUnionistRegionalParty(partyName)) return -70;
    if (isModerateSpanishUnionistRegionalParty(partyName)) return -25;
    return 0;
  }

  if (effectivePosition === "autonomy_inside_spain") {
    if (isHardSpanishUnionistRegionalParty(partyName)) return -12;
    return 0;
  }

  if (effectivePosition === "against_independence") {
    if (
      isHardSpanishUnionistRegionalParty(partyName) ||
      isModerateSpanishUnionistRegionalParty(partyName)
    ) {
      return 6;
    }

    if (isSoftSpanishUnionistRegionalParty(partyName)) return 3;
  }

  return 0;
}


function calculateBlockTerritorialCompatibilityAdjustment(
  partyName: string,
  block: string,
  selectedCommunity: string,
  independencePosition: IndependencePosition
) {
  const effectivePosition = getEffectiveIndependencePosition(selectedCommunity, independencePosition);

  if (effectivePosition !== "independence" && effectivePosition !== "right_to_decide") {
    return 0;
  }

  if (block !== "nacion" && block !== "identidad" && block !== "geopolitica") {
    return 0;
  }

  if (effectivePosition === "independence") {
    if (partyName === "VOX" || partyName === "Ciudadanos") return -100;
    if (partyName === "PP") return -45;
    if (partyName === "PSOE") return -10;
  }

  if (effectivePosition === "right_to_decide") {
    if (partyName === "VOX" || partyName === "Ciudadanos") return -70;
    if (partyName === "PP") return -25;
  }

  return 0;
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
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [independencePosition, setIndependencePosition] = useState<IndependencePosition | null>(null);
  const [isPreTestSetup, setIsPreTestSetup] = useState(false);
  const [openIdeology, setOpenIdeology] = useState<string | null>(null);
  const [openCompositeIdeology, setOpenCompositeIdeology] = useState<string | null>(null);
  const [confirmationType, setConfirmationType] = useState<ConfirmationType>(null);
  const [isAdvancingQuestion, setIsAdvancingQuestion] = useState(false);
  const savedResultSignatureRef = useRef<string | null>(null);
  const testStartedAtRef = useRef<string | null>(null);

  const activeQuestions =
    testMode === "ultra"
      ? ultraQuickIdeologicalQuestions
      : testMode === "rapido"
        ? quickIdeologicalQuestions
        : completeIdeologicalQuestions;

  const currentQuestion = activeQuestions[currentQuestionIndex];
  const currentAnswer =
    currentQuestion !== undefined ? answers[currentQuestion.id] : undefined;

  const selectedCommunityName =
    autonomousCommunities.find((item) => item.id === selectedCommunity)?.name ??
    "la comunidad elegida";

  const hasSelectedCommunity = selectedCommunity !== "";
  const isIndependenceSetupRequired = hasSelectedCommunity && isIndependenceQuestionCommunity(selectedCommunity);
  const effectiveIndependencePosition = getEffectiveIndependencePosition(
    selectedCommunity,
    independencePosition ?? "unclear"
  );
  const canShowPoliticalResults = hasSelectedCommunity &&
    (!isIndependenceSetupRequired || independencePosition !== null);
  const territorialReference = getTerritorialReferenceFromIndependence(
    selectedCommunity,
    effectiveIndependencePosition
  );
  const territorialReferenceLabel = getTerritorialReferenceLabel(
    territorialReference,
    selectedCommunityName
  );

  const results = useMemo(
    () => calculateResults(
      answers,
      activeQuestions,
      selectedCommunity,
      effectiveIndependencePosition
    ),
    [answers, activeQuestions, selectedCommunity, effectiveIndependencePosition]
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
    setOpenCompositeIdeology(null);
    setSelectedCommunity("");
    setIndependencePosition(null);
    setConfirmationType(null);
    setIsAdvancingQuestion(false);
    setIsPreTestSetup(false);
    savedResultSignatureRef.current = null;
    testStartedAtRef.current = new Date().toISOString();

    window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    }, 0);
  }

  function beginTestAfterSetup() {
    setIsPreTestSetup(false);
    setAnswers({});
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setInfoOpen(false);
    setOpenIdeology(null);
    setConfirmationType(null);
    setIsAdvancingQuestion(false);
    savedResultSignatureRef.current = null;
    testStartedAtRef.current = new Date().toISOString();

    window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 0);
  }

function goBackToSelector() {
  setTestMode("selector");
  setAnswers({});
  setShowResults(false);
  setCurrentQuestionIndex(0);
  setInfoOpen(false);
  setOpenIdeology(null);
  setOpenCompositeIdeology(null);
  setSelectedCommunity("");
  setIndependencePosition(null);
  setIsPreTestSetup(false);
  setConfirmationType(null);
  setIsAdvancingQuestion(false);
  savedResultSignatureRef.current = null;
  testStartedAtRef.current = null;

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

  useEffect(() => {
    if (!showResults || testMode === "selector" || !canShowPoliticalResults) return;
    if (activeQuestions.length === 0) return;

    const answeredQuestionCount = activeQuestions.filter(
      (question) => answers[question.id] !== undefined
    ).length;

    if (answeredQuestionCount !== activeQuestions.length) return;

    const completeAnalysisForSave =
      testMode === "completo" ? generateCompleteAnalysis(results) : null;

    const resultSignature = `${testMode}-${selectedCommunity}-${effectiveIndependencePosition}-${activeQuestions
      .map((question) => `${question.id}:${answers[question.id]}`)
      .join("|")}`;

    if (savedResultSignatureRef.current === resultSignature) return;

    savedResultSignatureRef.current = resultSignature;

    const anonymousUserId = getOrCreateAnonymousUserId();
    const completedAt = new Date().toISOString();
    const startedAt = testStartedAtRef.current ?? completedAt;
    const durationSeconds = Math.max(
      0,
      Math.round((new Date(completedAt).getTime() - new Date(startedAt).getTime()) / 1000)
    );

    fetch("/api/save-results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        anonymousUserId,
        startedAt,
        completedAt,
        durationSeconds,
        testMode,
        selectedCommunity,
        independencePosition: effectiveIndependencePosition,
        territorialReference,
        finalNationalParty: results.finalNationalParty,
        finalRegionalParty: results.finalRegionalParty,
        ideologyPercentages: results.ideologyPercentages,
        voterType: completeAnalysisForSave?.voterType ?? null,
        consistency: completeAnalysisForSave?.consistency ?? null,
        answers,
        questions: activeQuestions,
      }),
    }).catch((error) => {
      console.error("Error guardando resultado del test", error);
      savedResultSignatureRef.current = null;
    });
  }, [showResults, testMode, selectedCommunity, effectiveIndependencePosition, territorialReference, activeQuestions, answers, results, canShowPoliticalResults]);

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
              <strong>{completeIdeologicalQuestions.length} preguntas</strong>
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

          <ElectoralProgramsCard />
        </section>
      </main>
    );
  }

  if (showResults) {
    const isUltraTest = testMode === "ultra";
    const isCompleteTest = testMode === "completo";
    const ideologicalProfile = generateIdeologicalProfile(results, testMode);
    const completeAnalysis = isCompleteTest ? generateCompleteAnalysis(results) : null;
    const compositeIdeologies = calculateCompositeIdeologies(results.ideologyPercentages);
    const highlightedCompositeIdeologies = compositeIdeologies
      .filter((item) => item.percentage >= 50)
      .slice(0, 8);
    const blockAffinityAlternatives = getBlockAverages(results).slice(0, 4);
    const openCompositeIdeologyData = getCompositeIdeologyInfo(
      compositeIdeologies.find((item) => item.id === openCompositeIdeology)
    );

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

          <h1>Resultado del {getTestTitle(testMode)}</h1>

          <div className="community-selector">
            <label htmlFor="community">Selecciona una comunidad autónoma</label>
            <select
              id="community"
              value={selectedCommunity}
              onChange={(event) => {
                setSelectedCommunity(event.target.value);
                setIndependencePosition(null);
              }}
            >
              <option value="">Selecciona tu comunidad</option>
              {autonomousCommunities.map((community) => (
                <option key={community.id} value={community.id}>
                  {community.name}
                </option>
              ))}
            </select>
            <p>
              El resultado de partido se mostrará cuando selecciones una comunidad autónoma.
            </p>
          </div>

          {hasSelectedCommunity && isIndependenceSetupRequired && independencePosition === null && (
            <article className="question-card question-card--single territorial-question-card--results">
              <div className="question-card__top">
                <span className="question-card__block">Pregunta territorial</span>
              </div>

              <h2>¿Qué posición tienes sobre la independencia o el autogobierno de {selectedCommunityName}?</h2>

              <div className="answer-options answer-options--single territorial-answer-options">
                {independencePositionOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className="answer-options__button"
                    onClick={() => setIndependencePosition(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </article>
          )}

          {!hasSelectedCommunity && (
            <section className="results-pending-card">
              <h2>Selecciona tu comunidad para ver partidos afines</h2>
              <p>
                Los porcentajes ideológicos ya se han calculado, pero los resultados de partido dependen de la comunidad autónoma y, en algunos territorios, de tu posición sobre autodeterminación.
              </p>
            </section>
          )}

          {hasSelectedCommunity && isIndependenceSetupRequired && independencePosition === null && (
            <section className="results-pending-card">
              <h2>Responde la pregunta territorial para ver los resultados</h2>
              <p>
                En {selectedCommunityName}, esta respuesta evita confundir nacionalismo español con nacionalismo territorial o independentista.
              </p>
            </section>
          )}

          {canShowPoliticalResults && (
            <>
              <h2>Partido político más afín</h2>

              <div className="party-results">
                <div className="party-card">
                  <div className="party-card_title"><span>Elecciones generales en España</span></div>
                  <div className="party-card_results">
                    <div className="party-card_finalresult"><strong>{results.finalNationalParty.party}</strong></div>
                    <div className="party-card_percentatge"><em>{results.finalNationalParty.percentage}% de coincidencia</em></div>
                  </div>
                  {!results.finalNationalParty.isClearMatch && (
                    <>
                      <p className="party-card_explanation">
                        {results.finalNationalParty.explanation} El partido estatal más cercano sería {results.finalNationalParty.closestParty}, pero la coincidencia no es lo bastante alta para considerarlo una afinidad clara.
                      </p>

                      {blockAffinityAlternatives.length > 0 && (
                        <div className="party-card_alternatives">
                          <strong>Bloques más afines</strong>
                          <p>
                            Aunque no haya un partido estatal claramente afín en conjunto,
                            estos son los bloques ideológicos con más afinidad en tu resultado.
                          </p>

                          <div className="party-card_alternatives-grid">
                            {blockAffinityAlternatives.map((block) => (
                              <div key={block.block} className="party-card_alternative-item">
                                <span>{block.label}</span>
                                <strong>{block.value}%</strong>
                                <em>
                                  Partido más afín: {block.nationalParty.isClearMatch
                                    ? block.nationalParty.party
                                    : block.nationalParty.closestParty ?? block.nationalParty.party}
                                </em>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="party-card">
                  <div className="party-card_title"><span>Elecciones autonómicas en {selectedCommunityName}</span></div>
                  <div className="party-card_results">
                    <div className="party-card_finalresult"><strong>{results.finalRegionalParty.party}</strong></div>
                    <div className="party-card_percentatge"><em>{results.finalRegionalParty.percentage}% de coincidencia</em></div>
                  </div>
                  {!results.finalRegionalParty.isClearMatch && (
                    <p className="party-card_explanation">
                      {results.finalRegionalParty.explanation} El partido autonómico más cercano sería {results.finalRegionalParty.closestParty}, pero la coincidencia no es lo bastante alta para considerarlo una afinidad clara.
                    </p>
                  )}
                </div>
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
            </>
          )}

          {highlightedCompositeIdeologies.length > 0 && (
            <section className="composite-ideology-card">
              <div className="composite-ideology-card__intro">
                <span>Lectura avanzada</span>
                <h2>Corrientes ideológicas compuestas</h2>
                <p>
                  Estas corrientes agrupan varias señales de tu resultado para detectar familias políticas amplias y categorías históricas cuando el patrón es suficientemente marcado.
                </p>
              </div>

              <div className="composite-ideology-grid">
                {highlightedCompositeIdeologies.map((item) => (
                  <article
                    key={item.id}
                    className={
                      item.isHistoricalCategory
                        ? "composite-ideology-item result-card result-ideology-card is-historical"
                        : "composite-ideology-item result-card result-ideology-card"
                    }
                  >
                    <div className="result-card__top result-ideology-card__top composite-ideology-item__top">
                      <span className="result-ideology-card__title">{item.label}</span>
                      <strong className="result-ideology-card__percentage">{item.percentage}%</strong>
                    </div>

                    <span className="result-ideology-card__badge">{getCompositeIdeologyLevel(item.percentage)}</span>

                    <div className="composite-ideology-item__traits">
                      <h3>Rasgos detectados</h3>
                      <div className="composite-ideology-item__components">
                        {item.components.map((component) => (
                          <em key={component}>
                            {getCompositeComponentPercentage(results.ideologyPercentages, component)}
                          </em>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="more-info-button result-ideology-card__more-button"
                      onClick={() => setOpenCompositeIdeology(item.id)}
                    >
                      Más información
                    </button>
                  </article>
                ))}
              </div>
            </section>
          )}

          {canShowPoliticalResults && completeAnalysis && (
            <section className="complete-analysis-card">
              <div className="complete-analysis-card__intro">
                <span className="complete-analysis-card__eyebrow">Solo en el Test Completo</span>
                <h2>Análisis político avanzado</h2>
                <p>
                  Este apartado interpreta tu resultado con más profundidad que los otros tests: tipo de votante, consistencia, prioridades, tensiones internas, ejes políticos y coincidencias parciales con partidos.
                </p>
              </div>

              <div className="complete-analysis-grid">
                <article className="complete-analysis-panel voter-type-card">
                  <span className="complete-analysis-panel__label">Tipo de votante</span>
                  <strong>{completeAnalysis.voterType}</strong>
                  <p>
                    Esta etiqueta cruza tus ideologías dominantes con la consistencia del resultado y el partido nacional más afín, para evitar un arquetipo político desconectado de la coincidencia electoral.
                  </p>
                </article>

                <article className="complete-analysis-panel consistency-card">
                  <span className="complete-analysis-panel__label">Consistencia ideológica</span>
                  <strong className="consistency-score">{completeAnalysis.consistency}%</strong>
                  <p>
                    Mide si tus respuestas siguen una línea política estable o si mezclan posiciones que normalmente aparecen separadas.
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
                  Un partido puede ser el más afín en conjunto, pero tu resultado puede coincidir parcialmente con otros en economía, cultura, soberanía o derechos sociales.
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

          {isUltraTest && <IdeologyBlocksInfoCard variant="results" />}

          {isUltraTest && (
            <div className="upgrade-result-card">
              <h2>¿Quieres un resultado mucho más completo?</h2>
              <p>
                El test Rápido te da una orientación general. Si haces el Test Ideológico o el Test Completo, también podrás ver tu afinidad por bloques: economía, sociedad, nación, autoridad, geopolítica e identidad cultural. Así sabrás no solo “dónde encajas”, sino en qué temas concretos coincides más o menos con cada tendencia.
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

          {canShowPoliticalResults && !isUltraTest && (
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
                Puedes volver a la página inicial para hacer el test Rápido, repetir el test Ideológico o realizar el test Completo si quieres un análisis más detallado.
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

        {openCompositeIdeologyData && (
          <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="ideology-explanation ideology-explanation--popup">
              <button
                type="button"
                className="modal-close-button"
                onClick={() => setOpenCompositeIdeology(null)}
                aria-label="Cerrar información ideológica"
              >
                ×
              </button>
              <h3>{openCompositeIdeologyData.title}</h3>
              <p>{openCompositeIdeologyData.description}</p>
              <p>
                <strong>Resultado:</strong> {openCompositeIdeologyData.percentage}% · {openCompositeIdeologyData.level}
              </p>
              <div className="composite-ideology-popup__traits">
                <h4>Rasgos detectados</h4>
                <p>{openCompositeIdeologyData.components.join(", ")}</p>
              </div>
              {openCompositeIdeologyData.isHistoricalCategory && (
                <p>
                  <strong>Nota:</strong> categoría histórica/analítica. No implica recomendación política ni afiliación.
                </p>
              )}
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

            <h4 className="question-info__response-title">Si respondes “Muy de acuerdo”</h4>
            <p>{practicalInfo.agree}</p>

            <h4 className="question-info__response-title">Si respondes “Muy en desacuerdo”</h4>
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
