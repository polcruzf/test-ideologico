
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
type PartyInfoTarget = "national" | "regional" | null;

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

const TERRITORIALLY_SENSITIVE_COMMUNITIES = new Set([
  "cataluna",
  "pais-vasco",
  "galicia",
  "navarra",
  "baleares",
  "comunidad-valenciana",
  "canarias",
  "andalucia",
  "aragon",
]);

const HARD_TERRITORIAL_CONFLICT_COMMUNITIES = new Set([
  "cataluna",
  "pais-vasco",
  "galicia",
  "navarra",
]);

const SPANISH_UNIONIST_PARTY_KEYWORDS = [
  "vox",
  "pp",
  "ciudadanos",
  "falange",
  "upn",
  "psoe",
  "psc",
  "pse-ee",
  "psn",
  "psib",
  "pspv",
  "psdeg",
];

const REGIONAL_SOVEREIGNIST_PARTY_KEYWORDS = [
  "erc",
  "junts",
  "cup",
  "aliança",
  "alianca",
  "pdecat",
  "pnv",
  "eh bildu",
  "bildu",
  "bng",
  "compromís",
  "compromis",
  "més",
  "mes",
  "geroa bai",
  "nueva canarias",
  "coalición canaria",
  "coalicion canaria",
  "cha",
  "adelante andalucía",
  "adelante andalucia",
];

const REGIONAL_AUTONOMIST_PARTY_KEYWORDS = [
  "teruel existe",
  "aragón existe",
  "aragon existe",
  "foro asturias",
  "prc",
  "upl",
  "soria ya",
  "par",
];

const COMMON_GENERAL_ELECTION_PARTIES = [
  "PSOE",
  "PP",
  "VOX",
  "Sumar",
  "Podemos",
  "Ciudadanos",
];

const INDEPENDENTIST_OR_SEPARATIST_PARTY_KEYWORDS = [
  "aliança",
  "alianca",
  "junts",
  "erc",
  "cup",
  "eh bildu",
  "bildu",
  "bng",
];

const HARD_SPANISH_UNIONIST_GENERAL_PARTIES = new Set([
  "VOX",
  "Ciudadanos",
]);

const MODERATE_SPANISH_UNIONIST_GENERAL_PARTIES = new Set([
  "PP",
]);

const LEFT_TRANSFORMATIVE_GENERAL_PARTIES = new Set([
  "Sumar",
  "Podemos",
  "PCTE",
  "PCPE",
]);

const COMMUNIST_GENERAL_PARTIES = new Set([
  "PCTE",
  "PCPE",
]);

const CONSERVATIVE_GENERAL_PARTIES = new Set([
  "PP",
  "VOX",
  "Ciudadanos",
]);

type PartyIdeologicalFamily =
  | "territorial_identitarian_conservative"
  | "territorial_liberal_conservative"
  | "territorial_progressive"
  | "territorial_anticapitalist"
  | "regional_autonomist"
  | "unionist_conservative"
  | "unionist_socialdemocrat"
  | "state_left_transformative"
  | "state_communist"
  | "state_liberal"
  | "state_other";

function getPartyIdeologicalFamily(partyName?: string): PartyIdeologicalFamily {
  if (!partyName) return "state_other";

  const normalizedPartyName = normalizePartyName(partyName);

  // Independentismo o separatismo territorial fuerte.
  // Estos partidos sí pueden provocar incompatibilidades territoriales duras
  // en generales, porque su proyecto de soberanía choca con partidos
  // centralistas o unionistas estatales.
  if (normalizedPartyName.includes("alianca") || normalizedPartyName.includes("alianza")) {
    return "territorial_identitarian_conservative";
  }

  if (
    normalizedPartyName.includes("junts") ||
    normalizedPartyName.includes("pdecat")
  ) {
    return "territorial_liberal_conservative";
  }

  if (
    normalizedPartyName.includes("cup") ||
    normalizedPartyName.includes("eh bildu") ||
    normalizedPartyName.includes("bildu")
  ) {
    return "territorial_anticapitalist";
  }

  if (
    normalizedPartyName.includes("erc") ||
    normalizedPartyName.includes("bng")
  ) {
    return "territorial_progressive";
  }

  // Regionalismo, autonomismo o nacionalismo no necesariamente independentista.
  // Estos partidos pueden ser muy territorialistas, pero no deben bloquear
  // automáticamente el resultado de generales ni tratarse como separatistas.
  if (
    normalizedPartyName.includes("pnv") ||
    normalizedPartyName.includes("compromis") ||
    normalizedPartyName.includes("mes") ||
    normalizedPartyName.includes("geroa bai") ||
    normalizedPartyName.includes("nueva canarias") ||
    normalizedPartyName.includes("coalicion canaria") ||
    normalizedPartyName.includes("teruel existe") ||
    normalizedPartyName.includes("aragon existe") ||
    normalizedPartyName.includes("foro asturias") ||
    normalizedPartyName.includes("prc") ||
    normalizedPartyName.includes("upl") ||
    normalizedPartyName.includes("soria ya") ||
    normalizedPartyName.includes("par") ||
    normalizedPartyName.includes("cha") ||
    normalizedPartyName.includes("adelante andalucia")
  ) {
    return "regional_autonomist";
  }

  if (normalizedPartyName === "vox" || normalizedPartyName.includes("falange")) {
    return "unionist_conservative";
  }

  if (normalizedPartyName === "pp" || normalizedPartyName.includes("ciudadanos")) {
    return "state_liberal";
  }

  if (normalizedPartyName === "psoe") {
    return "unionist_socialdemocrat";
  }

  if (normalizedPartyName === "sumar" || normalizedPartyName === "podemos") {
    return "state_left_transformative";
  }

  if (normalizedPartyName === "pcte" || normalizedPartyName === "pcpe") {
    return "state_communist";
  }

  return "state_other";
}

function isHardGeneralIdeologicalIncompatibility(
  generalPartyName: string,
  regionalPartyName?: string
) {
  const regionalFamily = getPartyIdeologicalFamily(regionalPartyName);

  if (regionalFamily === "territorial_identitarian_conservative") {
    return LEFT_TRANSFORMATIVE_GENERAL_PARTIES.has(generalPartyName);
  }

  if (regionalFamily === "territorial_liberal_conservative") {
    return COMMUNIST_GENERAL_PARTIES.has(generalPartyName);
  }

  if (regionalFamily === "territorial_anticapitalist") {
    return CONSERVATIVE_GENERAL_PARTIES.has(generalPartyName);
  }

  if (regionalFamily === "unionist_conservative" || regionalFamily === "state_liberal") {
    return LEFT_TRANSFORMATIVE_GENERAL_PARTIES.has(generalPartyName) || COMMUNIST_GENERAL_PARTIES.has(generalPartyName);
  }

  return false;
}

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
      "sitúas la identidad nacional, la soberanía y la protección de los intereses propios por encima de enfoques más globales. En comunidades con nacionalismo territorial, este resultado se interpreta según la referencia territorial elegida: España o la comunidad seleccionada.",
    soberanista:
      "das prioridad a que las decisiones importantes se tomen dentro del propio país o territorio. En comunidades con partidos soberanistas, el cálculo distingue si esa soberanía la interpretas como española, autonómica o independentista.",
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

function generateCompleteAnalysis(
  results: ReturnType<typeof calculateResults>,
  selectedCommunity: string,
  territorialReference: TerritorialReference
): CompleteAnalysis {
  const priorities = getBlockAverages(results).slice(0, 5);
  const contradictions = getCompleteContradictions(results);
  const realContradictionCount = contradictions[0]?.startsWith("No se detectan") ? 0 : contradictions.length;
  const partialPartyMatches = Object.entries(
    getEligibleNationalPartyProfiles(selectedCommunity, results.finalRegionalParty.party)
  )
    .map(([party, profile]) => ({
      party,
      percentage: Math.round(
        calculatePartySimilarity(
          results.ideologyPercentages,
          profile,
          party,
          selectedCommunity,
          territorialReference,
          results.finalRegionalParty.party
        )
      ),
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

function calculateResults(
  answers: Answers,
  questions: Question[],
  selectedCommunity: string,
  territorialReference: TerritorialReference
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

  const baseNationalProfiles = getEligibleNationalPartyProfiles(selectedCommunity);
  const regionalProfiles =
    regionalPartyProfiles[selectedCommunity] ?? baseNationalProfiles;

  const finalRegionalParty = findClosestParty(
    ideologyPercentages,
    regionalProfiles,
    selectedCommunity,
    territorialReference
  );

  const nationalProfiles = getEligibleNationalPartyProfiles(
    selectedCommunity,
    finalRegionalParty.party
  );
  const blockNationalProfiles = getGeneralElectionPartyProfilesForBlock();

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
        blockNationalProfiles
      ),
      regionalParty: findClosestParty(
        ideologies,
        regionalProfiles,
        selectedCommunity,
        territorialReference
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
      territorialReference,
      finalRegionalParty.party
    ),
    finalRegionalParty,
  };
}

function isIndependentistOrSeparatistParty(partyName?: string) {
  if (!partyName || partyName === "Sin partido claramente afín") return false;

  return partyNameIncludes(partyName, INDEPENDENTIST_OR_SEPARATIST_PARTY_KEYWORDS);
}

function getEligibleNationalPartyProfiles(
  selectedCommunity: string,
  regionalPartyName?: string
) {
  // Para el resultado de generales solo se comparan partidos de ámbito estatal.
  // Los partidos territoriales se reservan para la caja autonómica.
  // Además de la compatibilidad territorial, se aplican familias ideológicas para
  // evitar cruces incoherentes: por ejemplo, un partido autonómico nacionalista
  // identitario/conservador no debe derivar en una opción comunista o de izquierda
  // transformadora en generales.
  const regionalPartyIsIndependentist = isIndependentistOrSeparatistParty(regionalPartyName);

  const eligiblePartyNames = COMMON_GENERAL_ELECTION_PARTIES.filter((party) => {
    if (regionalPartyIsIndependentist && HARD_SPANISH_UNIONIST_GENERAL_PARTIES.has(party)) {
      return false;
    }

    if (isHardGeneralIdeologicalIncompatibility(party, regionalPartyName)) {
      return false;
    }

    return true;
  });

  return Object.fromEntries(
    Object.entries(nationalPartyProfiles).filter(([party]) =>
      eligiblePartyNames.includes(party)
    )
  );
}

function getGeneralElectionPartyProfilesForBlock() {
  // Para alternativas por bloques no se aplican bloqueos territoriales fuertes.
  // La finalidad es mostrar qué partido estatal se acerca más en ese bloque concreto
  // aunque exista incompatibilidad global en el resultado general.
  return Object.fromEntries(
    Object.entries(nationalPartyProfiles).filter(([party]) =>
      COMMON_GENERAL_ELECTION_PARTIES.includes(party)
    )
  );
}

function getPartyProfileForInfo(
  partyName: string,
  scope: Exclude<PartyInfoTarget, null>,
  selectedCommunity: string
) {
  if (!partyName || partyName === "Sin partido claramente afín") return null;

  if (scope === "regional") {
    return regionalPartyProfiles[selectedCommunity]?.[partyName] ?? null;
  }

  return getEligibleNationalPartyProfiles(selectedCommunity)[partyName] ?? null;
}

function getTopPartyTraits(partyProfile: Record<string, number> | null) {
  if (!partyProfile) return [];

  return Object.entries(partyProfile)
    .sort(([, firstValue], [, secondValue]) => secondValue - firstValue)
    .slice(0, 4)
    .map(([ideology, value]) => ({
      label: ideologyLabels[ideology] ?? ideology,
      value,
    }));
}

function getSharedPartyTraits(
  userProfile: IdeologyResult[],
  partyProfile: Record<string, number> | null
) {
  if (!partyProfile) return [];

  return userProfile
    .slice(0, 8)
    .map((item) => {
      const expected = partyProfile[item.ideology] ?? 50;
      return {
        label: ideologyLabels[item.ideology] ?? item.ideology,
        userValue: item.percentage,
        partyValue: expected,
        distance: Math.abs(item.percentage - expected),
      };
    })
    .filter((item) => item.distance <= 18)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 4);
}

const partyShortSummaries: Record<string, string> = {
  PSOE:
    "Partido socialdemócrata y progresista de ámbito estatal. Suele defender servicios públicos fuertes, políticas de igualdad, europeísmo, transición ecológica y reformas dentro del marco institucional.",
  PP:
    "Partido de centro-derecha y derecha institucional. Suele combinar economía de mercado, bajadas o moderación fiscal, defensa de la unidad de España, seguridad jurídica y posiciones sociales moderadamente conservadoras.",
  VOX:
    "Partido de derecha nacional-conservadora. Su perfil se centra en unidad de España, control migratorio, seguridad, crítica al globalismo, valores tradicionales y reducción del peso político-administrativo del Estado.",
  Sumar:
    "Espacio de izquierda progresista y ecosocial. Suele priorizar derechos laborales, feminismo, ecologismo, intervención pública en vivienda y energía, redistribución y cooperación internacional.",
  Podemos:
    "Partido de izquierda transformadora. Suele defender más intervención pública, redistribución, derechos sociales, crítica a las élites económicas y ampliación de servicios públicos.",
  Ciudadanos:
    "Partido liberal e institucionalista. Su perfil combina economía de mercado, reformas administrativas, europeísmo, derechos civiles y defensa de un marco territorial común en España.",
  PACMA:
    "Partido centrado en la protección animal y el ecologismo. Su perfil se acerca a posiciones progresistas, animalistas, medioambientales y de sensibilidad social.",
  "Recortes Cero":
    "Formación de izquierdas con énfasis en redistribución, soberanía económica, defensa de servicios públicos y crítica a la concentración de riqueza y poder.",
  "Frente Obrero":
    "Formación obrerista y soberanista. Combina discurso social y de clase con posiciones críticas hacia el globalismo, la inmigración masiva y las élites políticas.",
  "Falange Española":
    "Formación nacionalista y tradicionalista. Su perfil se basa en soberanía nacional, unidad política, valores tradicionales, autoridad y una visión crítica del liberalismo y del globalismo.",
  PCTE:
    "Partido comunista de orientación marxista-leninista. Prioriza clase trabajadora, propiedad pública, planificación económica, soberanía popular y crítica al capitalismo.",
  PCPE:
    "Partido comunista centrado en socialización económica, defensa de la clase trabajadora, antiimperialismo y ruptura con el modelo capitalista.",
  PDeCAT:
    "Formación catalanista liberal y soberanista. Combina autogobierno o soberanía catalana con economía de mercado, institucionalismo y posiciones de centro o centro-derecha.",
  ERC:
    "Partido independentista catalán de izquierdas. Combina soberanismo catalán, republicanismo, políticas sociales, progresismo, lengua y cultura catalanas.",
  Junts:
    "Partido independentista catalán de perfil transversal, liberal y soberanista. Prioriza la autodeterminación, el autogobierno catalán, identidad nacional catalana y economía de mercado.",
  CUP:
    "Formación independentista catalana anticapitalista. Combina soberanismo, municipalismo, socialismo, ecologismo, feminismo y ruptura con el marco estatal español.",
  PNV:
    "Partido nacionalista vasco de perfil institucional y pragmático. Combina autogobierno vasco, economía social de mercado, gestión institucional y defensa de identidad vasca.",
  "EH Bildu":
    "Coalición soberanista vasca de izquierdas. Prioriza autogobierno o independencia, políticas sociales, progresismo, ecologismo y reconocimiento nacional vasco.",
  BNG:
    "Formación nacionalista gallega de izquierdas. Defiende autogobierno, identidad y lengua gallega, políticas sociales, ecologismo y soberanía política para Galicia.",
  "Coalición Canaria":
    "Partido nacionalista canario de perfil autonomista y pragmático. Prioriza los intereses de Canarias, financiación territorial, autogobierno, servicios públicos y singularidad insular.",
  "Nueva Canarias":
    "Formación canarista de centro-izquierda. Defiende autogobierno, financiación justa para Canarias, políticas sociales, sostenibilidad y reconocimiento de la realidad insular.",
  UPN:
    "Partido navarro de derecha regionalista y constitucionalista. Combina defensa del régimen foral navarro, unidad de España, conservadurismo e institucionalismo.",
  "Compromís":
    "Coalición valencianista, progresista y ecologista. Prioriza autogobierno valenciano, políticas sociales, lengua y cultura valencianas, sostenibilidad y transparencia.",
  "Teruel Existe":
    "Formación territorial centrada en la España interior. Su perfil se basa en descentralización, infraestructuras, equilibrio territorial y defensa de servicios públicos en zonas despobladas.",
  "Por Un Mundo Más Justo":
    "Partido de orientación social, humanitaria y globalista. Prioriza justicia social, cooperación internacional, derechos humanos, migración e igualdad de oportunidades.",
};

function getPartyShortSummary(partyName: string) {
  return partyShortSummaries[partyName] ?? "Partido o candidatura incluida en el cálculo del test. Su resumen específico todavía no está cargado, pero la afinidad se calcula comparando tus respuestas con su perfil ideológico dentro del sistema.";
}

function getPartyInfoIntro(
  partyMatch: PartyMatch,
  scope: Exclude<PartyInfoTarget, null>,
  selectedCommunityName: string
) {
  if (!partyMatch.isClearMatch) {
    return partyMatch.explanation ?? "No hay una afinidad suficientemente clara con ningún partido incluido en este ámbito.";
  }

  if (scope === "regional") {
    return `Es el partido autonómico que más se acerca a tus respuestas dentro de ${selectedCommunityName}. El cálculo compara tu perfil con los partidos disponibles en esa comunidad.`;
  }

  return "Es el partido de ámbito estatal que más se acerca a tus respuestas. Los partidos territoriales se reservan para el resultado autonómico. Las penalizaciones territoriales fuertes solo se aplican cuando el resultado autonómico es independentista o separatista, no cuando es regionalista o autonomista no independentista.";
}

function getPartyInfoPopupData(
  partyMatch: PartyMatch,
  scope: Exclude<PartyInfoTarget, null>,
  userProfile: IdeologyResult[],
  selectedCommunity: string,
  selectedCommunityName: string,
  territorialReferenceLabel: string
) {
  const partyProfile = getPartyProfileForInfo(partyMatch.party, scope, selectedCommunity);
  const partyTraits = getTopPartyTraits(partyProfile);
  const sharedTraits = getSharedPartyTraits(userProfile, partyProfile);
  const scopeLabel = scope === "regional" ? `autonómicas en ${selectedCommunityName}` : "generales";

  return {
    title:
      partyMatch.party === "Sin partido claramente afín"
        ? "Sin partido claramente afín"
        : `${partyMatch.party} · ${partyMatch.percentage}%`,
    scopeLabel,
    intro: getPartyInfoIntro(partyMatch, scope, selectedCommunityName),
    partySummary: getPartyShortSummary(partyMatch.party),
    partyTraits,
    sharedTraits,
    territorialNote:
      scope === "national"
        ? `Para las generales se muestran partidos de ámbito estatal. Los partidos territoriales se reservan para el resultado autonómico. Las penalizaciones territoriales fuertes solo se aplican si el resultado autonómico es independentista o separatista; el regionalismo o autonomismo no independentista no bloquea automáticamente partidos estatales. La referencia territorial del test es: ${territorialReferenceLabel}.`
        : `Para las autonómicas se ha comparado tu resultado con los partidos cargados para ${selectedCommunityName}. La referencia territorial del test es: ${territorialReferenceLabel}.`,
  };
}

function findClosestParty(
  userProfile: IdeologyResult[],
  partyProfiles: Record<string, Record<string, number>>,
  selectedCommunity: string,
  territorialReference: TerritorialReference,
  regionalPartyName?: string
): PartyMatch {
  let bestParty = "";
  let bestSimilarity = -Infinity;

  Object.entries(partyProfiles).forEach(([party, profile]) => {
    const similarity = calculatePartySimilarity(
      userProfile,
      profile,
      party,
      selectedCommunity,
      territorialReference,
      regionalPartyName
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
  partyProfiles: Record<string, Record<string, number>>
): PartyMatch {
  let bestParty = "";
  let bestSimilarity = -Infinity;

  Object.entries(partyProfiles).forEach(([party, profile]) => {
    const similarity = calculatePartySimilarityPure(userProfile, profile);

    if (similarity > bestSimilarity) {
      bestSimilarity = similarity;
      bestParty = party;
    }
  });

  const percentage = Math.round(bestSimilarity);

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
  partyName?: string,
  selectedCommunity?: string,
  territorialReference: TerritorialReference = "spain",
  regionalPartyName?: string
) {
  if (userProfile.length === 0) return 0;

  let totalDistance = 0;

  userProfile.forEach((item) => {
    const expected = partyProfile[item.ideology] ?? 50;
    totalDistance += Math.abs(item.percentage - expected);
  });

  const averageDistance = totalDistance / userProfile.length;
  const baseSimilarity = 100 - averageDistance;
  const territorialAdjustment = calculateTerritorialPartyAdjustment(
    userProfile,
    partyName,
    selectedCommunity,
    territorialReference
  );

  const nationalCompatibilityAdjustment = calculateNationalTerritorialCompatibilityAdjustment(
    partyName,
    regionalPartyName
  );

  const ideologicalCompatibilityAdjustment = calculateNationalIdeologicalCompatibilityAdjustment(
    partyName,
    regionalPartyName,
    userProfile
  );

  return clamp(
    baseSimilarity +
      territorialAdjustment +
      nationalCompatibilityAdjustment +
      ideologicalCompatibilityAdjustment
  );
}

function calculateNationalTerritorialCompatibilityAdjustment(
  partyName?: string,
  regionalPartyName?: string
) {
  if (!partyName || !isIndependentistOrSeparatistParty(regionalPartyName)) return 0;

  if (HARD_SPANISH_UNIONIST_GENERAL_PARTIES.has(partyName)) {
    return -100;
  }

  if (MODERATE_SPANISH_UNIONIST_GENERAL_PARTIES.has(partyName)) {
    return -24;
  }

  return 0;
}

function calculateNationalIdeologicalCompatibilityAdjustment(
  partyName?: string,
  regionalPartyName?: string,
  userProfile: IdeologyResult[] = []
) {
  if (!partyName || !regionalPartyName) return 0;

  const regionalFamily = getPartyIdeologicalFamily(regionalPartyName);

  // Un resultado autonómico regionalista/autonomista no debe tratarse como
  // independentista. En estos casos el partido estatal se elige por afinidad
  // ideológica normal, sin bloqueos territoriales ni penalizaciones fuertes.
  if (regionalFamily === "regional_autonomist") return 0;

  const communism = getIdeologyValue(userProfile, "comunista");
  const socialism = getIdeologyValue(userProfile, "socialista");
  const progressivism = getIdeologyValue(userProfile, "progresista");
  const conservatism = getIdeologyValue(userProfile, "conservador");
  const traditionalism = getIdeologyValue(userProfile, "tradicionalista");
  const liberalism = getIdeologyValue(userProfile, "liberal");

  if (regionalFamily === "territorial_identitarian_conservative") {
    if (partyName === "PSOE") return -22;
    if (partyName === "PP") return -8;
    if (LEFT_TRANSFORMATIVE_GENERAL_PARTIES.has(partyName)) return -80;
  }

  if (regionalFamily === "territorial_liberal_conservative") {
    if (LEFT_TRANSFORMATIVE_GENERAL_PARTIES.has(partyName)) return -26;
    if (partyName === "PSOE" && conservatism + liberalism > socialism + progressivism) return -14;
  }

  if (regionalFamily === "territorial_progressive") {
    if (partyName === "PP" && progressivism + socialism > conservatism + liberalism) return -18;
    if (LEFT_TRANSFORMATIVE_GENERAL_PARTIES.has(partyName) && conservatism + traditionalism > progressivism + socialism) return -22;
  }

  if (regionalFamily === "territorial_anticapitalist") {
    if (partyName === "PP" || partyName === "Ciudadanos" || partyName === "VOX") return -80;
    if (partyName === "PSOE" && communism >= 70) return -18;
  }

  if ((regionalFamily === "unionist_conservative" || regionalFamily === "state_liberal") && LEFT_TRANSFORMATIVE_GENERAL_PARTIES.has(partyName)) {
    return -60;
  }

  return 0;
}

function getIdeologyValue(userProfile: IdeologyResult[], ideology: string) {
  return userProfile.find((item) => item.ideology === ideology)?.percentage ?? 50;
}

function normalizePartyName(partyName: string) {
  return partyName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function partyNameIncludes(partyName: string, keywords: string[]) {
  const normalizedPartyName = normalizePartyName(partyName);

  return keywords.some((keyword) =>
    normalizedPartyName.includes(normalizePartyName(keyword))
  );
}

function getTerritorialReferenceLabel(
  territorialReference: TerritorialReference,
  selectedCommunityName: string
) {
  if (territorialReference === "selectedCommunity") {
    return selectedCommunityName;
  }

  if (territorialReference === "mixed") {
    return "España y la comunidad seleccionada";
  }

  return "España";
}

function calculateTerritorialPartyAdjustment(
  userProfile: IdeologyResult[],
  partyName?: string,
  selectedCommunity?: string,
  territorialReference: TerritorialReference = "spain"
) {
  if (!partyName || !selectedCommunity) return 0;

  // El ajuste territorial fuerte solo se aplica en comunidades donde el eje
  // soberanismo/independencia puede chocar de forma estructural con partidos
  // estatales centralistas o unionistas. En comunidades con regionalismo o
  // autonomismo no independentista, como Andalucía, Aragón, Canarias, Baleares
  // o Comunidad Valenciana, no se penalizan automáticamente los partidos
  // estatales por un resultado nacionalista/autonomista alto.
  if (!HARD_TERRITORIAL_CONFLICT_COMMUNITIES.has(selectedCommunity)) return 0;

  const nationalism = Math.max(
    getIdeologyValue(userProfile, "nacionalista"),
    getIdeologyValue(userProfile, "soberanista")
  );

  const isStrongNationalOrSovereignist = nationalism >= 64;
  const isSpanishUnionist = partyNameIncludes(partyName, SPANISH_UNIONIST_PARTY_KEYWORDS);
  const isRegionalSovereignist = partyNameIncludes(partyName, REGIONAL_SOVEREIGNIST_PARTY_KEYWORDS);
  const isRegionalAutonomist = partyNameIncludes(partyName, REGIONAL_AUTONOMIST_PARTY_KEYWORDS);

  if (!isStrongNationalOrSovereignist) return 0;

  if (territorialReference === "selectedCommunity") {
    if (isSpanishUnionist) return -34;
    if (isRegionalSovereignist) return 14;
    if (isRegionalAutonomist) return 6;
  }

  if (territorialReference === "spain") {
    if (isRegionalSovereignist) return -30;
    if (isRegionalAutonomist) return -8;
    if (isSpanishUnionist) return 8;
  }

  if (territorialReference === "mixed") {
    if (isRegionalSovereignist || isRegionalAutonomist) return 4;
    if (isSpanishUnionist) return -4;
  }

  return 0;
}

function cleanIdeologyExample(example: string) {
  return example.replace(/^Por ejemplo:\s*/i, "");
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
  const [territorialReference, setTerritorialReference] = useState<TerritorialReference>("selectedCommunity");
  const [openIdeology, setOpenIdeology] = useState<string | null>(null);
  const [openPartyInfo, setOpenPartyInfo] = useState<PartyInfoTarget>(null);
  const [selectedNationalAlternativeBlock, setSelectedNationalAlternativeBlock] = useState("economia");
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

  const isTerritoriallySensitiveCommunity = HARD_TERRITORIAL_CONFLICT_COMMUNITIES.has(selectedCommunity);
  const territorialReferenceLabel = getTerritorialReferenceLabel(
    isTerritoriallySensitiveCommunity ? territorialReference : "spain",
    selectedCommunityName
  );

  const results = useMemo(
    () => calculateResults(answers, activeQuestions, selectedCommunity, territorialReference),
    [answers, activeQuestions, selectedCommunity, territorialReference]
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
    setOpenPartyInfo(null);
    setSelectedNationalAlternativeBlock("economia");
    setTerritorialReference(HARD_TERRITORIAL_CONFLICT_COMMUNITIES.has(selectedCommunity) ? "selectedCommunity" : "spain");
    setConfirmationType(null);
    setIsAdvancingQuestion(false);
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

function goBackToSelector() {
  setTestMode("selector");
  setAnswers({});
  setShowResults(false);
  setCurrentQuestionIndex(0);
  setInfoOpen(false);
  setOpenIdeology(null);
  setOpenPartyInfo(null);
  setSelectedNationalAlternativeBlock("economia");
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
    if (!showResults || testMode === "selector") return;
    if (activeQuestions.length === 0) return;

    const answeredQuestionCount = activeQuestions.filter(
      (question) => answers[question.id] !== undefined
    ).length;

    if (answeredQuestionCount !== activeQuestions.length) return;

    const completeAnalysisForSave =
      testMode === "completo" ? generateCompleteAnalysis(results, selectedCommunity, territorialReference) : null;

    const resultSignature = `${testMode}-${selectedCommunity}-${activeQuestions
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
        territorialReference: isTerritoriallySensitiveCommunity ? territorialReference : "spain",
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
  }, [showResults, testMode, selectedCommunity, activeQuestions, answers, results]);

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
    const completeAnalysis = isCompleteTest ? generateCompleteAnalysis(results, selectedCommunity, territorialReference) : null;
    const visibleIdeologies = results.ideologyPercentages.slice(0, 12);
    const relevantVisibleIdeologies = visibleIdeologies.filter(
      (item) => item.percentage >= IMPORTANT_AFFINITY_THRESHOLD
    );
    const highlightedIdeologies =
      relevantVisibleIdeologies.length >= 3
        ? relevantVisibleIdeologies
        : visibleIdeologies.slice(0, 3);
    const highlightedIdeologyIds = new Set(
      highlightedIdeologies.map((item) => item.ideology)
    );
    const nationalBlockAlternatives = results.blockResults.filter(
      (block) => block.nationalParty.party !== "Sin partido claramente afín"
    );
    const selectedNationalBlockAlternative =
      nationalBlockAlternatives.find(
        (block) => block.block === selectedNationalAlternativeBlock
      ) ?? nationalBlockAlternatives[0] ?? null;
    const openPartyMatch =
      openPartyInfo === "national"
        ? results.finalNationalParty
        : openPartyInfo === "regional"
          ? results.finalRegionalParty
          : null;
    const openPartyInfoData = openPartyInfo && openPartyMatch
      ? getPartyInfoPopupData(
          openPartyMatch,
          openPartyInfo,
          results.ideologyPercentages,
          selectedCommunity,
          selectedCommunityName,
          territorialReferenceLabel
        )
      : null;

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
                  const nextCommunity = event.target.value;
                  setSelectedCommunity(nextCommunity);
                  setOpenPartyInfo(null);
                  setSelectedNationalAlternativeBlock("economia");
                  setTerritorialReference(
                    HARD_TERRITORIAL_CONFLICT_COMMUNITIES.has(nextCommunity)
                      ? "selectedCommunity"
                      : "spain"
                  );
                }}
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

          {isTerritoriallySensitiveCommunity && (
            <div className="territorial-reference-selector">
              <label htmlFor="territorial-reference">
                ¿Cómo interpretaste las preguntas sobre nación, soberanía e identidad?
              </label>
              <select
                id="territorial-reference"
                value={territorialReference}
                onChange={(event) => {
                  setOpenPartyInfo(null);
                  setTerritorialReference(event.target.value as TerritorialReference);
                }}
              >
                <option value="selectedCommunity">
                  Pensando principalmente en {selectedCommunityName}
                </option>
                <option value="spain">Pensando principalmente en España</option>
                <option value="mixed">Como una mezcla de ambas referencias</option>
              </select>
              <p>
                Este ajuste solo aparece en comunidades donde el eje territorial puede generar
                incompatibilidades fuertes entre soberanía española y soberanía territorial. Tu resultado se está interpretando con referencia a
                <strong> {territorialReferenceLabel}</strong>.
              </p>
            </div>
          )}

          <h2>Partido político más afín</h2>

          <div className="party-results">
            <div className="party-card">
              <div className="party-card_title">
                <span>Elecciones generales en España</span>
              </div>

              <div className="party-card_results">
                <div className="party-card_finalresult">
                  <strong>{results.finalNationalParty.party}</strong>
                </div>
                <div className="party-card_percentatge">
                  <em>{results.finalNationalParty.percentage}% de coincidencia</em>
                </div>
              </div>

              {!results.finalNationalParty.isClearMatch && (
                <div className="party-card_no-clear-match">
                  <p className="party-card_explanation">
                    {results.finalNationalParty.explanation} El partido estatal más cercano sería {results.finalNationalParty.closestParty}, pero la coincidencia no es lo bastante alta para considerarlo una afinidad clara.
                  </p>

                  {nationalBlockAlternatives.length > 0 && (
                    <div className="party-block-alternatives">
                      <div className="party-block-alternatives__intro">
                        <strong>Alternativa estatal por bloques</strong>
                        <p>
                          Aunque no haya un partido estatal claramente afín en conjunto,
                          puedes elegir un bloque concreto para ver qué partido se acerca
                          más en ese tema. En esta alternativa no se aplican los bloqueos
                          territoriales fuertes del resultado general.
                        </p>
                      </div>

                      <label
                        className="party-block-alternatives__label"
                        htmlFor="national-block-alternative"
                      >
                        Elige el bloque que quieras priorizar
                      </label>

                      <select
                        id="national-block-alternative"
                        className="party-block-alternatives__select"
                        value={selectedNationalBlockAlternative?.block ?? ""}
                        onChange={(event) =>
                          setSelectedNationalAlternativeBlock(event.target.value)
                        }
                      >
                        {nationalBlockAlternatives.map((block) => (
                          <option key={block.block} value={block.block}>
                            {blockLabels[block.block] ?? block.block}
                          </option>
                        ))}
                      </select>

                      {selectedNationalBlockAlternative && (
                        <div className="party-block-alternative-featured">
                          <span>
                            Si priorizas {blockLabels[selectedNationalBlockAlternative.block] ?? selectedNationalBlockAlternative.block}
                          </span>
                          <strong>{selectedNationalBlockAlternative.nationalParty.party}</strong>
                          <em>{selectedNationalBlockAlternative.nationalParty.percentage}% de coincidencia</em>
                        </div>
                      )}

                      <div className="party-block-alternatives__grid">
                        {nationalBlockAlternatives.map((block) => (
                          <button
                            key={block.block}
                            type="button"
                            className={
                              block.block === selectedNationalBlockAlternative?.block
                                ? "party-block-alternative-card is-active"
                                : "party-block-alternative-card"
                            }
                            onClick={() => setSelectedNationalAlternativeBlock(block.block)}
                          >
                            <span>{blockLabels[block.block] ?? block.block}</span>
                            <strong>{block.nationalParty.party}</strong>
                            <em>{block.nationalParty.percentage}%</em>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                type="button"
                className="party-card__more-button"
                onClick={() => setOpenPartyInfo("national")}
              >
                Más información
              </button>
            </div>

            <div className="party-card">
              <div className="party-card_title">
                <span>Elecciones autonómicas en {selectedCommunityName}</span>
              </div>

              <div className="party-card_results">
                <div className="party-card_finalresult">
                  <strong>{results.finalRegionalParty.party}</strong>
                </div>
                <div className="party-card_percentatge">
                  <em>{results.finalRegionalParty.percentage}% de coincidencia</em>
                </div>
              </div>

              {!results.finalRegionalParty.isClearMatch && (
                <p className="party-card_explanation">
                  {results.finalRegionalParty.explanation} El partido autonómico más cercano sería {results.finalRegionalParty.closestParty}, pero la coincidencia no es lo bastante alta para considerarlo una afinidad clara.
                </p>
              )}

              <button
                type="button"
                className="party-card__more-button"
                onClick={() => setOpenPartyInfo("regional")}
              >
                Más información
              </button>
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

          <div className="Percentatge_ideo"><h2>Porcentaje ideológico</h2>

          <p className="results-help">
            Cada tendencia incluye una explicación sencilla. Pulsa “Más información”.
          </p>

          <div className="results-grid">
            {highlightedIdeologies.map((item) => {
              const isRelevant = highlightedIdeologyIds.has(item.ideology);

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
                    Esta etiqueta cruza tus ideologías dominantes con la consistencia
                    del resultado y el partido nacional más afín, para evitar un
                    arquetipo político desconectado de la coincidencia electoral.
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

          {isUltraTest && <IdeologyBlocksInfoCard variant="results" />}

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
                <strong>Ejemplo:</strong> {cleanIdeologyExample(ideologyExplanations[openIdeology].example)}
              </p>
            </div>
          </div>
        )}

        {openPartyInfoData && (
          <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="party-info-popup">
              <button
                type="button"
                className="modal-close-button"
                onClick={() => setOpenPartyInfo(null)}
                aria-label="Cerrar información del partido"
              >
                ×
              </button>
              <span className="party-info-popup__eyebrow">{openPartyInfoData.scopeLabel}</span>
              <h3>{openPartyInfoData.title}</h3>
              <p>{openPartyInfoData.intro}</p>

              <div className="party-info-popup__section party-info-popup__summary">
                <h4>Resumen del partido</h4>
                <p>{openPartyInfoData.partySummary}</p>
              </div>

              {openPartyInfoData.sharedTraits.length > 0 && (
                <div className="party-info-popup__section">
                  <h4>Por qué encaja con tu perfil</h4>
                  <ul className="party-info-popup__list">
                    {openPartyInfoData.sharedTraits.map((trait) => (
                      <li key={trait.label}>
                        <strong>{trait.label}</strong>
                        <span>Tu resultado: {trait.userValue}% · Perfil del partido: {trait.partyValue}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {openPartyInfoData.partyTraits.length > 0 && (
                <div className="party-info-popup__section">
                  <h4>Rasgos principales del partido</h4>
                  <ul className="party-info-popup__pill-list">
                    {openPartyInfoData.partyTraits.map((trait) => (
                      <li key={trait.label}>
                        {trait.label}: {trait.value}%
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="party-info-popup__note">{openPartyInfoData.territorialNote}</p>
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
