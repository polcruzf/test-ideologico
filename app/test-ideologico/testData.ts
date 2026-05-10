export type Block =
  | "economia"
  | "nacion"
  | "sociedad"
  | "autoridad"
  | "geopolitica"
  | "identidad";

export type Question = {
  id: number;
  text: string;
  block: Block;
  weights: Record<string, number>;
  info?: {
    meaning: string;
    agree: string;
    disagree: string;
  };
};

export const answerOptions = [
  { label: "Muy en desacuerdo", value: -2 },
  { label: "En desacuerdo", value: -1 },
  { label: "Neutral", value: 0 },
  { label: "De acuerdo", value: 1 },
  { label: "Muy de acuerdo", value: 2 },
];

export const blockLabels: Record<string, string> = {
  "economia": "Economía",
  "nacion": "Nación y soberanía",
  "sociedad": "Sociedad y cultura",
  "autoridad": "Autoridad y Estado",
  "geopolitica": "Geopolítica",
  "identidad": "Identidad cultural y religión"
};

export const ideologyLabels: Record<string, string> = {
  comunista: "Comunista",
  socialista: "Socialista",
  socialdemocrata: "Socialdemócrata",
  liberal: "Liberal económico",
  libertario: "Libertario",
  nacionalista: "Nacionalista",
  soberanista: "Soberanista",
  globalista: "Globalista",
  conservador: "Conservador",
  progresista: "Progresista",
  autoritario: "Autoritario",
  institucionalista: "Institucionalista",
  tradicionalista: "Tradicionalista",
  multiculturalista: "Multiculturalista",
  neutralista: "Neutralista",
  populista: "Populista",
};

export const partyProfiles: Record<string, Record<string, number>> = {
  PSOE: {
    socialdemocrata: 85,
    socialista: 55,
    progresista: 75,
    globalista: 60,
    institucionalista: 70,
    conservador: 20,
    nacionalista: 35,
  },
  PP: {
    liberal: 70,
    conservador: 65,
    institucionalista: 75,
    nacionalista: 50,
    soberanista: 45,
    progresista: 25,
    socialista: 20,
  },
  VOX: {
    nacionalista: 90,
    soberanista: 90,
    conservador: 90,
    tradicionalista: 80,
    autoritario: 70,
    liberal: 60,
    multiculturalista: 5,
    globalista: 10,
  },
  Sumar: {
    socialista: 75,
    socialdemocrata: 65,
    progresista: 90,
    globalista: 75,
    multiculturalista: 85,
    conservador: 10,
    nacionalista: 25,
  },
  Podemos: {
    comunista: 55,
    socialista: 85,
    progresista: 90,
    globalista: 70,
    multiculturalista: 85,
    liberal: 10,
    conservador: 5,
  },
  ERC: {
    socialista: 70,
    socialdemocrata: 55,
    progresista: 80,
    nacionalista: 85,
    soberanista: 85,
    multiculturalista: 65,
    conservador: 20,
  },
  Junts: {
    liberal: 65,
    nacionalista: 90,
    soberanista: 90,
    conservador: 45,
    institucionalista: 45,
    socialista: 20,
    globalista: 35,
  },
  CUP: {
    comunista: 85,
    socialista: 90,
    nacionalista: 80,
    soberanista: 85,
    progresista: 85,
    liberal: 5,
    conservador: 10,
  },
  "Aliança Catalana": {
    nacionalista: 95,
    soberanista: 95,
    conservador: 90,
    tradicionalista: 85,
    autoritario: 65,
    multiculturalista: 5,
    globalista: 5,
    socialista: 15,
  },
  Comuns: {
    socialista: 75,
    socialdemocrata: 65,
    progresista: 90,
    globalista: 75,
    multiculturalista: 85,
    conservador: 10,
    nacionalista: 25,
  },
};

export const ideologicalQuestions: Question[] = [
  {
    "id": 1,
    "text": "¿El Estado debería nacionalizar empresas estratégicas?",
    "block": "economia",
    "weights": {
      "comunista": 3,
      "socialista": 2,
      "socialdemocrata": 1,
      "liberal": -2,
      "libertario": -3
    }
  },
  {
    "id": 2,
    "text": "¿El libre mercado genera más prosperidad que la intervención estatal?",
    "block": "economia",
    "weights": {
      "liberal": 3,
      "libertario": 2,
      "socialdemocrata": -1,
      "socialista": -2,
      "comunista": -3
    }
  },
  {
    "id": 3,
    "text": "¿Los impuestos a las grandes fortunas deberían ser más altos?",
    "block": "economia",
    "weights": {
      "socialista": 3,
      "comunista": 2,
      "socialdemocrata": 2,
      "liberal": -2,
      "libertario": -3
    }
  },
  {
    "id": 4,
    "text": "¿La propiedad privada es un derecho fundamental que el Estado debe proteger?",
    "block": "economia",
    "weights": {
      "liberal": 3,
      "libertario": 2,
      "conservador": 1,
      "socialista": -2,
      "comunista": -3
    }
  },
  {
    "id": 5,
    "text": "¿La sanidad debería ser completamente pública?",
    "block": "economia",
    "weights": {
      "socialista": 3,
      "socialdemocrata": 3,
      "comunista": 2,
      "liberal": -2
    }
  },
  {
    "id": 6,
    "text": "¿La educación privada debería tener más límites legales?",
    "block": "economia",
    "weights": {
      "socialista": 2,
      "comunista": 2,
      "socialdemocrata": 1,
      "liberal": -2,
      "libertario": -2
    }
  },
  {
    "id": 7,
    "text": "¿Las ayudas sociales demasiado amplias generan dependencia?",
    "block": "economia",
    "weights": {
      "liberal": 2,
      "conservador": 2,
      "libertario": 2,
      "socialista": -2,
      "socialdemocrata": -1
    }
  },
  {
    "id": 8,
    "text": "¿El Estado debería garantizar empleo a todo ciudadano?",
    "block": "economia",
    "weights": {
      "comunista": 3,
      "socialista": 3,
      "socialdemocrata": 1,
      "liberal": -2
    }
  },
  {
    "id": 9,
    "text": "¿Las empresas deberían pagar más impuestos aunque reduzcan beneficios?",
    "block": "economia",
    "weights": {
      "socialista": 3,
      "socialdemocrata": 2,
      "comunista": 2,
      "liberal": -2,
      "libertario": -3
    }
  },
  {
    "id": 10,
    "text": "¿Los sindicatos deberían tener más poder en las empresas?",
    "block": "economia",
    "weights": {
      "socialista": 3,
      "comunista": 2,
      "socialdemocrata": 2,
      "liberal": -2
    }
  },
  {
    "id": 11,
    "text": "¿La vivienda debería regularse con precios máximos?",
    "block": "economia",
    "weights": {
      "socialista": 3,
      "comunista": 2,
      "socialdemocrata": 2,
      "liberal": -2,
      "libertario": -3
    }
  },
  {
    "id": 12,
    "text": "¿Los emprendedores deberían tener menos cargas fiscales?",
    "block": "economia",
    "weights": {
      "liberal": 3,
      "libertario": 2,
      "conservador": 1,
      "socialista": -2
    }
  },
  {
    "id": 13,
    "text": "¿El salario mínimo debería subir de forma obligatoria cada año?",
    "block": "economia",
    "weights": {
      "socialista": 2,
      "socialdemocrata": 3,
      "comunista": 1,
      "liberal": -2
    }
  },
  {
    "id": 14,
    "text": "¿La banca debería estar mucho más controlada por el Estado?",
    "block": "economia",
    "weights": {
      "socialista": 3,
      "comunista": 3,
      "socialdemocrata": 1,
      "liberal": -2
    }
  },
  {
    "id": 15,
    "text": "¿La desigualdad económica es aceptable si aumenta la riqueza general?",
    "block": "economia",
    "weights": {
      "liberal": 3,
      "libertario": 2,
      "socialista": -3,
      "comunista": -3
    }
  },
  {
    "id": 16,
    "text": "¿Las grandes herencias deberían pagar más impuestos?",
    "block": "economia",
    "weights": {
      "socialista": 3,
      "socialdemocrata": 2,
      "comunista": 2,
      "liberal": -2
    }
  },
  {
    "id": 17,
    "text": "¿La competencia privada mejora los servicios públicos?",
    "block": "economia",
    "weights": {
      "liberal": 3,
      "libertario": 2,
      "socialdemocrata": -1,
      "socialista": -2
    }
  },
  {
    "id": 18,
    "text": "¿El Estado debería limitar los beneficios de sectores esenciales?",
    "block": "economia",
    "weights": {
      "socialista": 3,
      "comunista": 2,
      "socialdemocrata": 2,
      "liberal": -2
    }
  },
  {
    "id": 19,
    "text": "¿Los trabajadores deberían participar en la dirección de las empresas?",
    "block": "economia",
    "weights": {
      "socialista": 3,
      "comunista": 3,
      "socialdemocrata": 1,
      "liberal": -1
    }
  },
  {
    "id": 20,
    "text": "¿La economía planificada es más justa que el mercado libre?",
    "block": "economia",
    "weights": {
      "comunista": 3,
      "socialista": 2,
      "liberal": -3,
      "libertario": -3
    }
  },
  {
    "id": 21,
    "text": "¿Reducir impuestos suele mejorar la economía?",
    "block": "economia",
    "weights": {
      "liberal": 3,
      "libertario": 3,
      "conservador": 1,
      "socialista": -2
    }
  },
  {
    "id": 22,
    "text": "¿El Estado debería rescatar empresas privadas en crisis?",
    "block": "economia",
    "weights": {
      "socialdemocrata": 2,
      "socialista": 1,
      "liberal": -1,
      "libertario": -2
    }
  },
  {
    "id": 23,
    "text": "¿Las multinacionales tienen demasiado poder sobre los gobiernos?",
    "block": "economia",
    "weights": {
      "socialista": 2,
      "comunista": 2,
      "soberanista": 1,
      "liberal": -1
    }
  },
  {
    "id": 24,
    "text": "¿La economía debería priorizar la igualdad sobre el crecimiento?",
    "block": "economia",
    "weights": {
      "socialista": 3,
      "comunista": 3,
      "socialdemocrata": 1,
      "liberal": -2
    }
  },
  {
    "id": 25,
    "text": "¿El pequeño comercio debería recibir protección frente a grandes cadenas?",
    "block": "economia",
    "weights": {
      "soberanista": 2,
      "conservador": 1,
      "socialdemocrata": 1,
      "liberal": -1
    }
  },
  {
    "id": 26,
    "text": "¿El mercado laboral debería ser más flexible para contratar y despedir?",
    "block": "economia",
    "weights": {
      "liberal": 3,
      "libertario": 2,
      "socialista": -2,
      "socialdemocrata": -1
    }
  },
  {
    "id": 27,
    "text": "¿El Estado debería controlar el precio de la energía?",
    "block": "economia",
    "weights": {
      "socialista": 3,
      "comunista": 2,
      "socialdemocrata": 2,
      "liberal": -2
    }
  },
  {
    "id": 28,
    "text": "¿Las privatizaciones suelen empeorar los servicios esenciales?",
    "block": "economia",
    "weights": {
      "socialista": 3,
      "comunista": 2,
      "socialdemocrata": 2,
      "liberal": -2
    }
  },
  {
    "id": 29,
    "text": "¿La inversión extranjera es positiva aunque reduzca control nacional?",
    "block": "economia",
    "weights": {
      "liberal": 2,
      "globalista": 2,
      "soberanista": -2,
      "nacionalista": -2
    }
  },
  {
    "id": 30,
    "text": "¿El déficit público es aceptable para financiar derechos sociales?",
    "block": "economia",
    "weights": {
      "socialista": 2,
      "socialdemocrata": 3,
      "liberal": -2,
      "libertario": -2
    }
  },
  {
    "id": 31,
    "text": "¿La economía debe estar al servicio de la nación antes que del mercado global?",
    "block": "economia",
    "weights": {
      "soberanista": 3,
      "nacionalista": 3,
      "liberal": -1,
      "globalista": -2
    }
  },
  {
    "id": 32,
    "text": "¿Los impuestos bajos son una forma de libertad individual?",
    "block": "economia",
    "weights": {
      "liberal": 3,
      "libertario": 3,
      "socialista": -2
    }
  },
  {
    "id": 33,
    "text": "¿Las pensiones deberían depender más del ahorro privado?",
    "block": "economia",
    "weights": {
      "liberal": 3,
      "libertario": 2,
      "socialdemocrata": -2,
      "socialista": -2
    }
  },
  {
    "id": 34,
    "text": "¿La riqueza acumulada por grandes fortunas es moralmente sospechosa?",
    "block": "economia",
    "weights": {
      "comunista": 3,
      "socialista": 2,
      "liberal": -2,
      "libertario": -3
    }
  },
  {
    "id": 35,
    "text": "¿La propiedad pública es preferible en sectores básicos?",
    "block": "economia",
    "weights": {
      "comunista": 3,
      "socialista": 3,
      "socialdemocrata": 2,
      "liberal": -2
    }
  },
  {
    "id": 36,
    "text": "¿La libertad empresarial debe prevalecer sobre la regulación laboral?",
    "block": "economia",
    "weights": {
      "liberal": 3,
      "libertario": 3,
      "socialista": -3,
      "socialdemocrata": -2
    }
  },
  {
    "id": 37,
    "text": "¿La soberanía nacional debe estar por encima de organismos internacionales?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "soberanista": 3,
      "globalista": -3
    }
  },
  {
    "id": 38,
    "text": "¿La inmigración debería limitarse para proteger la identidad cultural?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "soberanista": 2,
      "conservador": 2,
      "multiculturalista": -3,
      "globalista": -2
    }
  },
  {
    "id": 39,
    "text": "¿La globalización debilita la identidad de los pueblos?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "soberanista": 2,
      "tradicionalista": 2,
      "globalista": -3
    }
  },
  {
    "id": 40,
    "text": "¿La nación es más importante que la clase social?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "soberanista": 2,
      "comunista": -2,
      "socialista": -1
    }
  },
  {
    "id": 41,
    "text": "¿Las fronteras deberían ser más estrictas?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "soberanista": 2,
      "conservador": 2,
      "globalista": -2
    }
  },
  {
    "id": 42,
    "text": "¿El patriotismo es una virtud política positiva?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "conservador": 2,
      "soberanista": 2,
      "globalista": -1
    }
  },
  {
    "id": 43,
    "text": "¿La ciudadanía debería ser más difícil de obtener?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "soberanista": 2,
      "conservador": 2,
      "multiculturalista": -2
    }
  },
  {
    "id": 44,
    "text": "¿Los ciudadanos nacionales deberían tener prioridad laboral?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "soberanista": 2,
      "socialdemocrata": 1,
      "globalista": -2
    }
  },
  {
    "id": 45,
    "text": "¿La lengua nacional debe tener protección preferente?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "tradicionalista": 2,
      "soberanista": 2,
      "globalista": -1
    }
  },
  {
    "id": 46,
    "text": "¿Las regiones con identidad propia deberían poder independizarse?",
    "block": "nacion",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "institucionalista": -1
    }
  },
  {
    "id": 47,
    "text": "¿El multiculturalismo debilita la cohesión social?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "conservador": 2,
      "multiculturalista": -3,
      "globalista": -2
    }
  },
  {
    "id": 48,
    "text": "¿La Unión Europea tiene demasiado poder sobre España?",
    "block": "nacion",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -3
    }
  },
  {
    "id": 49,
    "text": "¿La prioridad política debe ser proteger al pueblo propio?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "soberanista": 2,
      "conservador": 1,
      "globalista": -2
    }
  },
  {
    "id": 50,
    "text": "¿Los tratados internacionales reducen la democracia nacional?",
    "block": "nacion",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -2
    }
  },
  {
    "id": 51,
    "text": "¿La identidad cultural debe enseñarse más en la escuela?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "tradicionalista": 2,
      "conservador": 1,
      "multiculturalista": -1
    }
  },
  {
    "id": 52,
    "text": "¿Las políticas migratorias actuales son demasiado permisivas?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "conservador": 2,
      "soberanista": 2,
      "globalista": -2
    }
  },
  {
    "id": 53,
    "text": "¿Un país debe anteponer sus intereses a los intereses globales?",
    "block": "nacion",
    "weights": {
      "soberanista": 3,
      "nacionalista": 3,
      "globalista": -3
    }
  },
  {
    "id": 54,
    "text": "¿La cultura propia puede perderse por exceso de inmigración?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "conservador": 2,
      "multiculturalista": -3
    }
  },
  {
    "id": 55,
    "text": "¿Las élites globales perjudican a las naciones pequeñas?",
    "block": "nacion",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -2
    }
  },
  {
    "id": 56,
    "text": "¿La bandera y los símbolos nacionales son políticamente importantes?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "conservador": 2,
      "soberanista": 1
    }
  },
  {
    "id": 57,
    "text": "¿El nacionalismo puede ser una defensa legítima de un pueblo?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "soberanista": 2,
      "globalista": -2
    }
  },
  {
    "id": 58,
    "text": "¿El internacionalismo suele ignorar las identidades reales?",
    "block": "nacion",
    "weights": {
      "nacionalista": 2,
      "soberanista": 2,
      "globalista": -3
    }
  },
  {
    "id": 59,
    "text": "¿El control fronterizo es imprescindible para la seguridad?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "conservador": 2,
      "autoritario": 1,
      "globalista": -2
    }
  },
  {
    "id": 60,
    "text": "¿Las ayudas públicas deberían priorizar a ciudadanos nacionales?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "soberanista": 2,
      "socialdemocrata": 1,
      "globalista": -2
    }
  },
  {
    "id": 61,
    "text": "¿La nación debe protegerse incluso frente a intereses económicos externos?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "soberanista": 3,
      "liberal": -1
    }
  },
  {
    "id": 62,
    "text": "¿La descentralización territorial mejora la convivencia?",
    "block": "nacion",
    "weights": {
      "institucionalista": 2,
      "soberanista": 1,
      "nacionalista": 1
    }
  },
  {
    "id": 63,
    "text": "¿El centralismo protege mejor la unidad nacional?",
    "block": "nacion",
    "weights": {
      "nacionalista": 2,
      "conservador": 2,
      "soberanista": 1
    }
  },
  {
    "id": 64,
    "text": "¿Una nación sin soberanía económica no es plenamente libre?",
    "block": "nacion",
    "weights": {
      "soberanista": 3,
      "nacionalista": 3,
      "globalista": -2
    }
  },
  {
    "id": 65,
    "text": "¿Las fronteras abiertas son una amenaza para el Estado del bienestar?",
    "block": "nacion",
    "weights": {
      "nacionalista": 2,
      "soberanista": 2,
      "conservador": 1,
      "globalista": -2
    }
  },
  {
    "id": 66,
    "text": "¿La identidad nacional debe estar por encima de identidades individuales?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "conservador": 2,
      "libertario": -2
    }
  },
  {
    "id": 67,
    "text": "¿El turismo masivo puede dañar la identidad local?",
    "block": "nacion",
    "weights": {
      "nacionalista": 2,
      "soberanista": 1,
      "conservador": 1,
      "globalista": -1
    }
  },
  {
    "id": 68,
    "text": "¿Los organismos supranacionales deben tener menos poder?",
    "block": "nacion",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -3
    }
  },
  {
    "id": 69,
    "text": "¿Una comunidad política necesita una cultura común fuerte?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "conservador": 2,
      "multiculturalista": -2
    }
  },
  {
    "id": 70,
    "text": "¿La inmigración debe adaptarse culturalmente al país receptor?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "conservador": 2,
      "multiculturalista": -2
    }
  },
  {
    "id": 71,
    "text": "¿El patriotismo económico es necesario para proteger empleo local?",
    "block": "nacion",
    "weights": {
      "nacionalista": 2,
      "soberanista": 3,
      "socialdemocrata": 1,
      "globalista": -2
    }
  },
  {
    "id": 72,
    "text": "¿La nación debe ser el marco principal de la democracia?",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "soberanista": 3,
      "globalista": -2
    }
  },
  {
    "id": 73,
    "text": "¿La sociedad actual ha perdido valores tradicionales importantes?",
    "block": "sociedad",
    "weights": {
      "conservador": 3,
      "tradicionalista": 3,
      "progresista": -3
    }
  },
  {
    "id": 74,
    "text": "¿El cambio social rápido suele ser positivo?",
    "block": "sociedad",
    "weights": {
      "progresista": 3,
      "multiculturalista": 1,
      "conservador": -2,
      "tradicionalista": -3
    }
  },
  {
    "id": 75,
    "text": "¿La familia tradicional debería protegerse especialmente?",
    "block": "sociedad",
    "weights": {
      "conservador": 3,
      "tradicionalista": 3,
      "progresista": -2
    }
  },
  {
    "id": 76,
    "text": "¿La corrección política limita la libertad de expresión?",
    "block": "sociedad",
    "weights": {
      "conservador": 2,
      "libertario": 2,
      "tradicionalista": 1,
      "progresista": -2
    }
  },
  {
    "id": 77,
    "text": "¿El feminismo actual ha ido demasiado lejos?",
    "block": "sociedad",
    "weights": {
      "conservador": 3,
      "tradicionalista": 2,
      "progresista": -3
    }
  },
  {
    "id": 78,
    "text": "¿La religión debería mantenerse fuera de las instituciones públicas?",
    "block": "sociedad",
    "weights": {
      "progresista": 2,
      "liberal": 1,
      "tradicionalista": -3,
      "conservador": -2
    }
  },
  {
    "id": 79,
    "text": "¿La escuela debería transmitir valores tradicionales?",
    "block": "sociedad",
    "weights": {
      "conservador": 3,
      "tradicionalista": 3,
      "progresista": -2
    }
  },
  {
    "id": 80,
    "text": "¿La libertad individual debe estar por encima de normas morales colectivas?",
    "block": "sociedad",
    "weights": {
      "libertario": 3,
      "liberal": 2,
      "tradicionalista": -2,
      "conservador": -1
    }
  },
  {
    "id": 81,
    "text": "¿La sociedad necesita más disciplina y menos permisividad?",
    "block": "sociedad",
    "weights": {
      "conservador": 3,
      "autoritario": 2,
      "tradicionalista": 2,
      "progresista": -2
    }
  },
  {
    "id": 82,
    "text": "¿La cultura moderna es demasiado individualista?",
    "block": "sociedad",
    "weights": {
      "conservador": 2,
      "tradicionalista": 2,
      "socialista": 1,
      "liberal": -1
    }
  },
  {
    "id": 83,
    "text": "¿Las nuevas generaciones han perdido respeto por la autoridad?",
    "block": "sociedad",
    "weights": {
      "conservador": 3,
      "autoritario": 2,
      "tradicionalista": 2,
      "progresista": -1
    }
  },
  {
    "id": 84,
    "text": "¿La igualdad de género debería ser una prioridad política central?",
    "block": "sociedad",
    "weights": {
      "progresista": 3,
      "socialdemocrata": 1,
      "conservador": -2,
      "tradicionalista": -2
    }
  },
  {
    "id": 85,
    "text": "¿Las políticas identitarias fragmentan la sociedad?",
    "block": "sociedad",
    "weights": {
      "conservador": 2,
      "nacionalista": 1,
      "progresista": -2,
      "multiculturalista": -2
    }
  },
  {
    "id": 86,
    "text": "¿La tradición suele contener sabiduría acumulada?",
    "block": "sociedad",
    "weights": {
      "tradicionalista": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 87,
    "text": "¿La moral pública debería tener ciertos límites legales?",
    "block": "sociedad",
    "weights": {
      "conservador": 3,
      "autoritario": 2,
      "libertario": -3
    }
  },
  {
    "id": 88,
    "text": "¿La sociedad debería ser más tolerante con estilos de vida diversos?",
    "block": "sociedad",
    "weights": {
      "progresista": 3,
      "multiculturalista": 2,
      "libertario": 1,
      "tradicionalista": -2
    }
  },
  {
    "id": 89,
    "text": "¿Los medios promueven valores demasiado progresistas?",
    "block": "sociedad",
    "weights": {
      "conservador": 3,
      "tradicionalista": 2,
      "progresista": -2
    }
  },
  {
    "id": 90,
    "text": "¿La educación sexual debería ampliarse en las escuelas?",
    "block": "sociedad",
    "weights": {
      "progresista": 3,
      "multiculturalista": 1,
      "conservador": -2,
      "tradicionalista": -3
    }
  },
  {
    "id": 91,
    "text": "¿El mérito individual es más importante que la igualdad de resultados?",
    "block": "sociedad",
    "weights": {
      "liberal": 3,
      "conservador": 2,
      "socialista": -2
    }
  },
  {
    "id": 92,
    "text": "¿La sociedad debe proteger especialmente a minorías discriminadas?",
    "block": "sociedad",
    "weights": {
      "progresista": 3,
      "socialdemocrata": 2,
      "conservador": -1
    }
  },
  {
    "id": 93,
    "text": "¿El matrimonio y la familia son pilares centrales de la sociedad?",
    "block": "sociedad",
    "weights": {
      "conservador": 3,
      "tradicionalista": 3,
      "progresista": -1
    }
  },
  {
    "id": 94,
    "text": "¿El Estado no debería imponer una visión moral concreta?",
    "block": "sociedad",
    "weights": {
      "libertario": 3,
      "liberal": 2,
      "autoritario": -2,
      "tradicionalista": -1
    }
  },
  {
    "id": 95,
    "text": "¿La cultura occidental está en decadencia?",
    "block": "sociedad",
    "weights": {
      "conservador": 3,
      "tradicionalista": 3,
      "nacionalista": 1,
      "progresista": -2
    }
  },
  {
    "id": 96,
    "text": "¿Las reformas sociales deberían hacerse lentamente?",
    "block": "sociedad",
    "weights": {
      "conservador": 2,
      "institucionalista": 2,
      "progresista": -1
    }
  },
  {
    "id": 97,
    "text": "¿La libertad de expresión debe incluir opiniones ofensivas?",
    "block": "sociedad",
    "weights": {
      "libertario": 3,
      "liberal": 2,
      "progresista": -1
    }
  },
  {
    "id": 98,
    "text": "¿La protección de animales debería tener más peso legal?",
    "block": "sociedad",
    "weights": {
      "progresista": 2,
      "socialdemocrata": 1,
      "conservador": -1
    }
  },
  {
    "id": 99,
    "text": "¿La religión aporta estabilidad social?",
    "block": "sociedad",
    "weights": {
      "tradicionalista": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 100,
    "text": "¿El secularismo estricto es necesario en una democracia moderna?",
    "block": "sociedad",
    "weights": {
      "progresista": 2,
      "liberal": 2,
      "tradicionalista": -3
    }
  },
  {
    "id": 101,
    "text": "¿El arte y la cultura deberían ser más libres de límites morales?",
    "block": "sociedad",
    "weights": {
      "libertario": 2,
      "progresista": 2,
      "tradicionalista": -2
    }
  },
  {
    "id": 102,
    "text": "¿La escuela debería ser neutral en debates culturales?",
    "block": "sociedad",
    "weights": {
      "liberal": 2,
      "institucionalista": 2,
      "progresista": -1,
      "tradicionalista": -1
    }
  },
  {
    "id": 103,
    "text": "¿Las cuotas por género o identidad son justas?",
    "block": "sociedad",
    "weights": {
      "progresista": 3,
      "socialista": 1,
      "liberal": -1,
      "conservador": -2
    }
  },
  {
    "id": 104,
    "text": "¿La sociedad necesita recuperar respeto por la tradición?",
    "block": "sociedad",
    "weights": {
      "tradicionalista": 3,
      "conservador": 3,
      "progresista": -2
    }
  },
  {
    "id": 105,
    "text": "¿La cultura popular actual perjudica a los jóvenes?",
    "block": "sociedad",
    "weights": {
      "conservador": 2,
      "tradicionalista": 2,
      "progresista": -1
    }
  },
  {
    "id": 106,
    "text": "¿Las familias deberían tener más libertad para elegir educación moral?",
    "block": "sociedad",
    "weights": {
      "liberal": 2,
      "conservador": 2,
      "tradicionalista": 2,
      "progresista": -1
    }
  },
  {
    "id": 107,
    "text": "¿El progreso social suele traer más derechos y bienestar?",
    "block": "sociedad",
    "weights": {
      "progresista": 3,
      "socialdemocrata": 1,
      "conservador": -2
    }
  },
  {
    "id": 108,
    "text": "¿La estabilidad cultural es más importante que la innovación social?",
    "block": "sociedad",
    "weights": {
      "conservador": 3,
      "tradicionalista": 2,
      "progresista": -2
    }
  },
  {
    "id": 109,
    "text": "¿La seguridad debe priorizarse sobre ciertas libertades individuales?",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "institucionalista": 1,
      "libertario": -3
    }
  },
  {
    "id": 110,
    "text": "¿La policía necesita más autoridad para mantener el orden?",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "conservador": 2,
      "libertario": -2
    }
  },
  {
    "id": 111,
    "text": "¿El Estado debería tener el menor poder posible sobre la vida privada?",
    "block": "autoridad",
    "weights": {
      "libertario": 3,
      "liberal": 2,
      "autoritario": -3
    }
  },
  {
    "id": 112,
    "text": "¿Las penas judiciales deberían endurecerse?",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 113,
    "text": "¿La vigilancia digital es aceptable para prevenir delitos graves?",
    "block": "autoridad",
    "weights": {
      "autoritario": 2,
      "institucionalista": 1,
      "libertario": -3
    }
  },
  {
    "id": 114,
    "text": "¿Las protestas radicales deberían reprimirse con firmeza?",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 115,
    "text": "¿El orden público es más importante que el derecho a protestar?",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "conservador": 2,
      "libertario": -2
    }
  },
  {
    "id": 116,
    "text": "¿El Estado suele abusar de su poder?",
    "block": "autoridad",
    "weights": {
      "libertario": 3,
      "liberal": 2,
      "autoritario": -3
    }
  },
  {
    "id": 117,
    "text": "¿El ejército debería tener más presupuesto?",
    "block": "autoridad",
    "weights": {
      "nacionalista": 2,
      "conservador": 2,
      "autoritario": 1,
      "globalista": -1
    }
  },
  {
    "id": 118,
    "text": "¿El servicio militar obligatorio sería positivo?",
    "block": "autoridad",
    "weights": {
      "autoritario": 2,
      "nacionalista": 2,
      "conservador": 2,
      "libertario": -3
    }
  },
  {
    "id": 119,
    "text": "¿La desobediencia civil puede estar justificada?",
    "block": "autoridad",
    "weights": {
      "progresista": 2,
      "libertario": 2,
      "autoritario": -2
    }
  },
  {
    "id": 120,
    "text": "¿La ley debe cumplirse aunque parezca injusta?",
    "block": "autoridad",
    "weights": {
      "institucionalista": 3,
      "autoritario": 2,
      "libertario": -1
    }
  },
  {
    "id": 121,
    "text": "¿Los jueces deberían ser más duros con delincuentes reincidentes?",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "conservador": 2,
      "progresista": -1
    }
  },
  {
    "id": 122,
    "text": "¿La prisión debería centrarse más en castigo que en reinserción?",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 123,
    "text": "¿La reinserción social debe ser prioritaria en justicia penal?",
    "block": "autoridad",
    "weights": {
      "progresista": 2,
      "socialdemocrata": 2,
      "autoritario": -2
    }
  },
  {
    "id": 124,
    "text": "¿La censura puede ser aceptable para evitar desorden social?",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "libertario": -3,
      "liberal": -2
    }
  },
  {
    "id": 125,
    "text": "¿Las armas deberían estar más reguladas?",
    "block": "autoridad",
    "weights": {
      "institucionalista": 2,
      "progresista": 1,
      "libertario": -2
    }
  },
  {
    "id": 126,
    "text": "¿Los estados de emergencia se usan demasiado fácilmente?",
    "block": "autoridad",
    "weights": {
      "libertario": 2,
      "liberal": 1,
      "autoritario": -2
    }
  },
  {
    "id": 127,
    "text": "¿Un gobierno fuerte es necesario en tiempos de crisis?",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "institucionalista": 2,
      "libertario": -2
    }
  },
  {
    "id": 128,
    "text": "¿La democracia debe limitar a partidos que amenacen el sistema?",
    "block": "autoridad",
    "weights": {
      "institucionalista": 3,
      "autoritario": 1,
      "libertario": -2
    }
  },
  {
    "id": 129,
    "text": "¿La libertad individual debe tener muy pocos límites?",
    "block": "autoridad",
    "weights": {
      "libertario": 3,
      "liberal": 2,
      "autoritario": -3,
      "conservador": -1
    }
  },
  {
    "id": 130,
    "text": "¿La autoridad de profesores y padres debería reforzarse?",
    "block": "autoridad",
    "weights": {
      "conservador": 3,
      "autoritario": 2,
      "tradicionalista": 2,
      "progresista": -1
    }
  },
  {
    "id": 131,
    "text": "¿El Estado debería poder prohibir organizaciones extremistas?",
    "block": "autoridad",
    "weights": {
      "autoritario": 2,
      "institucionalista": 2,
      "libertario": -2
    }
  },
  {
    "id": 132,
    "text": "¿La policía recibe demasiadas críticas injustas?",
    "block": "autoridad",
    "weights": {
      "conservador": 2,
      "autoritario": 2,
      "progresista": -2
    }
  },
  {
    "id": 133,
    "text": "¿El derecho a la privacidad debe pesar más que la seguridad?",
    "block": "autoridad",
    "weights": {
      "libertario": 3,
      "liberal": 2,
      "autoritario": -2
    }
  },
  {
    "id": 134,
    "text": "¿Los delitos contra la nación deberían castigarse con especial dureza?",
    "block": "autoridad",
    "weights": {
      "nacionalista": 3,
      "autoritario": 2,
      "soberanista": 2,
      "libertario": -2
    }
  },
  {
    "id": 135,
    "text": "¿El sistema judicial es demasiado blando?",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "conservador": 2,
      "progresista": -1
    }
  },
  {
    "id": 136,
    "text": "¿La autoridad política debe estar fuertemente limitada por la Constitución?",
    "block": "autoridad",
    "weights": {
      "institucionalista": 3,
      "liberal": 2,
      "autoritario": -1
    }
  },
  {
    "id": 137,
    "text": "¿La población debería votar más decisiones mediante referéndum?",
    "block": "autoridad",
    "weights": {
      "soberanista": 2,
      "libertario": 1,
      "institucionalista": -1
    }
  },
  {
    "id": 138,
    "text": "¿La tecnocracia puede ser mejor que la política partidista?",
    "block": "autoridad",
    "weights": {
      "institucionalista": 2,
      "liberal": 1,
      "populista": -1
    }
  },
  {
    "id": 139,
    "text": "¿El Estado debería controlar más los contenidos peligrosos en internet?",
    "block": "autoridad",
    "weights": {
      "autoritario": 2,
      "institucionalista": 1,
      "libertario": -3
    }
  },
  {
    "id": 140,
    "text": "¿La seguridad nacional justifica secretos de Estado?",
    "block": "autoridad",
    "weights": {
      "autoritario": 2,
      "institucionalista": 2,
      "libertario": -2
    }
  },
  {
    "id": 141,
    "text": "¿Las fuerzas de seguridad deben tener presunción de autoridad?",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "conservador": 2,
      "libertario": -1
    }
  },
  {
    "id": 142,
    "text": "¿La libertad de manifestación debe prevalecer aunque cause molestias?",
    "block": "autoridad",
    "weights": {
      "libertario": 2,
      "progresista": 2,
      "autoritario": -2
    }
  },
  {
    "id": 143,
    "text": "¿La estabilidad social es más importante que el cambio político?",
    "block": "autoridad",
    "weights": {
      "conservador": 2,
      "autoritario": 1,
      "institucionalista": 2,
      "progresista": -2
    }
  },
  {
    "id": 144,
    "text": "¿El poder político debería estar mucho más descentralizado?",
    "block": "autoridad",
    "weights": {
      "libertario": 2,
      "soberanista": 2,
      "autoritario": -2
    }
  },
  {
    "id": 145,
    "text": "¿La política exterior debe centrarse primero en los intereses nacionales?",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -2
    }
  },
  {
    "id": 146,
    "text": "¿La integración europea debería ampliarse?",
    "block": "geopolitica",
    "weights": {
      "globalista": 3,
      "progresista": 1,
      "soberanista": -2,
      "nacionalista": -2
    }
  },
  {
    "id": 147,
    "text": "¿Las organizaciones internacionales tienen demasiado poder?",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -3
    }
  },
  {
    "id": 148,
    "text": "¿La cooperación internacional es más importante que la soberanía nacional?",
    "block": "geopolitica",
    "weights": {
      "globalista": 3,
      "progresista": 1,
      "nacionalista": -3,
      "soberanista": -3
    }
  },
  {
    "id": 149,
    "text": "¿La OTAN es necesaria para la seguridad de España?",
    "block": "geopolitica",
    "weights": {
      "institucionalista": 2,
      "liberal": 1,
      "soberanista": -1
    }
  },
  {
    "id": 150,
    "text": "¿Las guerras modernas suelen estar motivadas por intereses económicos ocultos?",
    "block": "geopolitica",
    "weights": {
      "socialista": 2,
      "comunista": 2,
      "soberanista": 1,
      "liberal": -1
    }
  },
  {
    "id": 151,
    "text": "¿España debería ser más neutral en conflictos internacionales?",
    "block": "geopolitica",
    "weights": {
      "soberanista": 2,
      "neutralista": 3,
      "globalista": -1
    }
  },
  {
    "id": 152,
    "text": "¿Los países occidentales intervienen demasiado en otros países?",
    "block": "geopolitica",
    "weights": {
      "soberanista": 2,
      "socialista": 1,
      "globalista": -1
    }
  },
  {
    "id": 153,
    "text": "¿La independencia energética es una prioridad nacional?",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "conservador": 1
    }
  },
  {
    "id": 154,
    "text": "¿El comercio internacional perjudica a industrias locales?",
    "block": "geopolitica",
    "weights": {
      "soberanista": 2,
      "nacionalista": 2,
      "socialista": 1,
      "globalista": -2
    }
  },
  {
    "id": 155,
    "text": "¿Las sanciones económicas son una herramienta legítima?",
    "block": "geopolitica",
    "weights": {
      "institucionalista": 2,
      "globalista": 1,
      "soberanista": -1
    }
  },
  {
    "id": 156,
    "text": "¿Los derechos humanos justifican intervenir en otros países?",
    "block": "geopolitica",
    "weights": {
      "globalista": 2,
      "progresista": 2,
      "soberanista": -2
    }
  },
  {
    "id": 157,
    "text": "¿Los tratados de libre comercio benefician a la economía?",
    "block": "geopolitica",
    "weights": {
      "liberal": 3,
      "globalista": 2,
      "soberanista": -1
    }
  },
  {
    "id": 158,
    "text": "¿La soberanía militar es esencial para ser un país libre?",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -2
    }
  },
  {
    "id": 159,
    "text": "¿La ONU debería tener más capacidad de decisión?",
    "block": "geopolitica",
    "weights": {
      "globalista": 3,
      "progresista": 1,
      "soberanista": -3
    }
  },
  {
    "id": 160,
    "text": "¿Los bloques económicos reducen independencia nacional?",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -2
    }
  },
  {
    "id": 161,
    "text": "¿La diplomacia debe prevalecer casi siempre sobre la fuerza militar?",
    "block": "geopolitica",
    "weights": {
      "globalista": 2,
      "progresista": 2,
      "autoritario": -1
    }
  },
  {
    "id": 162,
    "text": "¿Un país debe proteger su industria aunque encarezca productos?",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "liberal": -2
    }
  },
  {
    "id": 163,
    "text": "¿La política exterior debería defender valores universales?",
    "block": "geopolitica",
    "weights": {
      "globalista": 2,
      "progresista": 2,
      "soberanista": -1
    }
  },
  {
    "id": 164,
    "text": "¿Las fronteras nacionales siguen siendo esenciales en el siglo XXI?",
    "block": "geopolitica",
    "weights": {
      "nacionalista": 3,
      "soberanista": 3,
      "globalista": -3
    }
  },
  {
    "id": 165,
    "text": "¿España debería reducir su dependencia de la UE?",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -3
    }
  },
  {
    "id": 166,
    "text": "¿Las instituciones europeas protegen mejor los derechos que los Estados?",
    "block": "geopolitica",
    "weights": {
      "globalista": 2,
      "progresista": 1,
      "soberanista": -2
    }
  },
  {
    "id": 167,
    "text": "¿La inmigración debe gestionarse con acuerdos internacionales?",
    "block": "geopolitica",
    "weights": {
      "globalista": 2,
      "multiculturalista": 1,
      "soberanista": -1
    }
  },
  {
    "id": 168,
    "text": "¿La ayuda exterior debe reducirse si hay problemas internos?",
    "block": "geopolitica",
    "weights": {
      "nacionalista": 2,
      "soberanista": 2,
      "conservador": 1,
      "globalista": -2
    }
  },
  {
    "id": 169,
    "text": "¿La globalización beneficia principalmente a élites económicas?",
    "block": "geopolitica",
    "weights": {
      "socialista": 2,
      "soberanista": 2,
      "nacionalista": 1,
      "globalista": -2
    }
  },
  {
    "id": 170,
    "text": "¿Los países deben poder ignorar normas internacionales injustas?",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -2
    }
  },
  {
    "id": 171,
    "text": "¿La defensa común europea sería positiva?",
    "block": "geopolitica",
    "weights": {
      "globalista": 2,
      "institucionalista": 2,
      "soberanista": -1
    }
  },
  {
    "id": 172,
    "text": "¿La seguridad nacional debe condicionar la política económica?",
    "block": "geopolitica",
    "weights": {
      "soberanista": 2,
      "nacionalista": 2,
      "autoritario": 1,
      "liberal": -1
    }
  },
  {
    "id": 173,
    "text": "¿Los refugiados de guerra deberían ser acogidos ampliamente?",
    "block": "geopolitica",
    "weights": {
      "progresista": 2,
      "globalista": 2,
      "multiculturalista": 2,
      "nacionalista": -2
    }
  },
  {
    "id": 174,
    "text": "¿El realismo político es más importante que el idealismo moral?",
    "block": "geopolitica",
    "weights": {
      "soberanista": 2,
      "conservador": 1,
      "globalista": -1
    }
  },
  {
    "id": 175,
    "text": "¿Los organismos globales limitan la voluntad popular?",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -3
    }
  },
  {
    "id": 176,
    "text": "¿La política exterior debe proteger a comunidades culturales afines?",
    "block": "geopolitica",
    "weights": {
      "nacionalista": 2,
      "soberanista": 2,
      "globalista": -1
    }
  },
  {
    "id": 177,
    "text": "¿La cooperación internacional ayuda a resolver problemas climáticos?",
    "block": "geopolitica",
    "weights": {
      "globalista": 3,
      "progresista": 2,
      "soberanista": -1
    }
  },
  {
    "id": 178,
    "text": "¿El ejército debe ser una herramienta central de soberanía?",
    "block": "geopolitica",
    "weights": {
      "nacionalista": 2,
      "soberanista": 3,
      "conservador": 1
    }
  },
  {
    "id": 179,
    "text": "¿La política exterior española debería ser más independiente de EE. UU.?",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "socialista": 1,
      "globalista": -1
    }
  },
  {
    "id": 180,
    "text": "¿El internacionalismo debilita la democracia nacional?",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -3
    }
  },
  {
    "id": 181,
    "text": "¿La identidad cultural propia debe protegerse activamente desde el Estado?",
    "block": "identidad",
    "weights": {
      "nacionalista": 3,
      "tradicionalista": 2,
      "conservador": 2,
      "multiculturalista": -2
    }
  },
  {
    "id": 182,
    "text": "¿Una sociedad multicultural es preferible a una sociedad culturalmente homogénea?",
    "block": "identidad",
    "weights": {
      "multiculturalista": 3,
      "globalista": 2,
      "progresista": 2,
      "nacionalista": -3
    }
  },
  {
    "id": 183,
    "text": "¿La lengua y la cultura propias deberían tener prioridad institucional?",
    "block": "identidad",
    "weights": {
      "nacionalista": 3,
      "soberanista": 2,
      "tradicionalista": 2,
      "globalista": -2
    }
  },
  {
    "id": 184,
    "text": "¿La tradición cultural debe adaptarse a los valores modernos?",
    "block": "identidad",
    "weights": {
      "progresista": 3,
      "multiculturalista": 2,
      "tradicionalista": -3,
      "conservador": -2
    }
  },
  {
    "id": 185,
    "text": "¿La religión forma parte importante de la identidad de un pueblo?",
    "block": "identidad",
    "weights": {
      "tradicionalista": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 186,
    "text": "¿La diversidad cultural debería ser una prioridad política?",
    "block": "identidad",
    "weights": {
      "multiculturalista": 3,
      "progresista": 2,
      "globalista": 2,
      "nacionalista": -2
    }
  },
  {
    "id": 187,
    "text": "¿La escuela debe enseñar más historia nacional?",
    "block": "identidad",
    "weights": {
      "nacionalista": 3,
      "tradicionalista": 2,
      "conservador": 1
    }
  },
  {
    "id": 188,
    "text": "¿La cultura de origen debe prevalecer sobre influencias externas?",
    "block": "identidad",
    "weights": {
      "nacionalista": 3,
      "tradicionalista": 2,
      "soberanista": 2,
      "globalista": -2
    }
  },
  {
    "id": 189,
    "text": "¿La religión debe quedar en el ámbito estrictamente privado?",
    "block": "identidad",
    "weights": {
      "progresista": 2,
      "liberal": 2,
      "tradicionalista": -3
    }
  },
  {
    "id": 190,
    "text": "¿La identidad cultural es más importante que la diversidad?",
    "block": "identidad",
    "weights": {
      "nacionalista": 3,
      "tradicionalista": 2,
      "multiculturalista": -3
    }
  },
  {
    "id": 191,
    "text": "¿Los símbolos religiosos deberían permitirse en espacios públicos?",
    "block": "identidad",
    "weights": {
      "tradicionalista": 2,
      "conservador": 1,
      "progresista": -1
    }
  },
  {
    "id": 192,
    "text": "¿Las fiestas tradicionales deberían recibir más apoyo institucional?",
    "block": "identidad",
    "weights": {
      "tradicionalista": 3,
      "nacionalista": 2,
      "conservador": 1
    }
  },
  {
    "id": 193,
    "text": "¿La cultura nacional debería protegerse frente a modas globales?",
    "block": "identidad",
    "weights": {
      "nacionalista": 3,
      "tradicionalista": 2,
      "soberanista": 2,
      "globalista": -2
    }
  },
  {
    "id": 194,
    "text": "¿La identidad de una nación se basa principalmente en cultura compartida?",
    "block": "identidad",
    "weights": {
      "nacionalista": 3,
      "tradicionalista": 2,
      "multiculturalista": -2
    }
  },
  {
    "id": 195,
    "text": "¿La identidad de una nación se basa principalmente en ciudadanía legal?",
    "block": "identidad",
    "weights": {
      "institucionalista": 2,
      "liberal": 1,
      "nacionalista": -1
    }
  },
  {
    "id": 196,
    "text": "¿El pluralismo cultural fortalece una sociedad?",
    "block": "identidad",
    "weights": {
      "multiculturalista": 3,
      "globalista": 2,
      "progresista": 2,
      "nacionalista": -1
    }
  },
  {
    "id": 197,
    "text": "¿La inmigración debe integrarse en la cultura mayoritaria?",
    "block": "identidad",
    "weights": {
      "nacionalista": 3,
      "conservador": 2,
      "multiculturalista": -2
    }
  },
  {
    "id": 198,
    "text": "¿La cultura occidental debe defenderse políticamente?",
    "block": "identidad",
    "weights": {
      "conservador": 3,
      "tradicionalista": 2,
      "nacionalista": 2,
      "progresista": -1
    }
  },
  {
    "id": 199,
    "text": "¿Las raíces religiosas de Europa deberían reconocerse oficialmente?",
    "block": "identidad",
    "weights": {
      "tradicionalista": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 200,
    "text": "¿La identidad personal debe estar por encima de la identidad nacional?",
    "block": "identidad",
    "weights": {
      "libertario": 2,
      "progresista": 2,
      "nacionalista": -3
    }
  },
  {
    "id": 201,
    "text": "¿El mestizaje cultural es positivo para una sociedad?",
    "block": "identidad",
    "weights": {
      "multiculturalista": 3,
      "globalista": 2,
      "progresista": 2,
      "nacionalista": -2
    }
  },
  {
    "id": 202,
    "text": "¿Las instituciones deben ser neutrales ante todas las culturas?",
    "block": "identidad",
    "weights": {
      "liberal": 2,
      "institucionalista": 2,
      "multiculturalista": 1,
      "nacionalista": -1
    }
  },
  {
    "id": 203,
    "text": "¿Una cultura común fuerte mejora la confianza social?",
    "block": "identidad",
    "weights": {
      "nacionalista": 2,
      "conservador": 2,
      "tradicionalista": 1,
      "multiculturalista": -2
    }
  },
  {
    "id": 204,
    "text": "¿La secularización ha debilitado la sociedad?",
    "block": "identidad",
    "weights": {
      "tradicionalista": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 205,
    "text": "¿El arte nacional debe recibir prioridad frente a productos culturales globales?",
    "block": "identidad",
    "weights": {
      "nacionalista": 2,
      "soberanista": 1,
      "globalista": -1
    }
  },
  {
    "id": 206,
    "text": "¿La identidad cultural debe influir en las leyes migratorias?",
    "block": "identidad",
    "weights": {
      "nacionalista": 3,
      "conservador": 2,
      "multiculturalista": -2
    }
  },
  {
    "id": 207,
    "text": "¿El Estado debe financiar expresiones culturales minoritarias?",
    "block": "identidad",
    "weights": {
      "multiculturalista": 2,
      "progresista": 2,
      "socialdemocrata": 1,
      "nacionalista": -1
    }
  },
  {
    "id": 208,
    "text": "¿La religión ayuda a conservar valores comunitarios?",
    "block": "identidad",
    "weights": {
      "tradicionalista": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 209,
    "text": "¿La identidad nacional puede convivir con una visión abierta del mundo?",
    "block": "identidad",
    "weights": {
      "institucionalista": 2,
      "nacionalista": 1,
      "globalista": 1
    }
  },
  {
    "id": 210,
    "text": "¿La cultura propia debe tener preferencia en medios públicos?",
    "block": "identidad",
    "weights": {
      "nacionalista": 3,
      "soberanista": 2,
      "multiculturalista": -1
    }
  },
  {
    "id": 211,
    "text": "¿La sociedad debería celebrar más la diversidad religiosa?",
    "block": "identidad",
    "weights": {
      "multiculturalista": 3,
      "progresista": 2,
      "tradicionalista": -1
    }
  },
  {
    "id": 212,
    "text": "¿La pertenencia cultural debe implicar deberes sociales?",
    "block": "identidad",
    "weights": {
      "nacionalista": 2,
      "conservador": 2,
      "tradicionalista": 2,
      "libertario": -2
    }
  },
  {
    "id": 213,
    "text": "¿La tradición es más importante que la innovación cultural?",
    "block": "identidad",
    "weights": {
      "tradicionalista": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 214,
    "text": "¿La identidad cultural debe decidirse individualmente y no colectivamente?",
    "block": "identidad",
    "weights": {
      "libertario": 2,
      "progresista": 2,
      "nacionalista": -2
    }
  },
  {
    "id": 215,
    "text": "¿La cultura local debería protegerse frente al turismo masivo?",
    "block": "identidad",
    "weights": {
      "nacionalista": 2,
      "soberanista": 1,
      "conservador": 1
    }
  },
  {
    "id": 216,
    "text": "¿La diversidad cultural excesiva puede dificultar la convivencia?",
    "block": "identidad",
    "weights": {
      "nacionalista": 2,
      "conservador": 2,
      "multiculturalista": -3
    }
  }
];


export const ultraQuickIdeologicalQuestions: Question[] = [
  {
    id: 1,
    text: "¿Prefieres pagar más impuestos si eso permite tener mejores servicios públicos?",
    block: "economia",
    weights: {
      comunista: 3,
      socialista: 3,
      socialdemocrata: 2,
      liberal: -2,
      libertario: -3,
    },
    info: {
      meaning:
        "Esta pregunta mide si priorizas servicios públicos financiados entre todos o si prefieres que cada persona conserve más dinero y elija por su cuenta. Ejemplo cotidiano: pagar más impuestos para mejorar sanidad, becas o transporte público.",
      agree:
        "Si estás muy de acuerdo, en la práctica aceptas más impuestos para reforzar servicios comunes. Puede ayudar a quien tiene menos recursos, pero también aumenta la carga fiscal de trabajadores, autónomos y empresas.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica prefieres menos impuestos y más decisión individual. Puede dar más libertad económica, pero también puede dejar peor cubiertas algunas necesidades sociales.",
    },
  },
  {
    id: 2,
    text: "¿Crees que las empresas y autónomos deberían tener menos trabas para crecer?",
    block: "economia",
    weights: {
      liberal: 3,
      libertario: 3,
      conservador: 1,
      socialista: -2,
      comunista: -3,
    },
    info: {
      meaning:
        "Esta pregunta mide si das más importancia a facilitar la actividad económica o a regularla más. Ejemplo cotidiano: abrir un negocio con menos papeleo, contratar con menos costes o pagar menos impuestos empresariales.",
      agree:
        "Si estás muy de acuerdo, en la práctica favoreces menos burocracia y más libertad para emprender. Puede crear actividad y empleo, pero también reducir controles laborales o fiscales.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica aceptas más normas para evitar abusos o repartir mejor la riqueza. Puede proteger más, pero también hacer más difícil emprender o contratar.",
    },
  },
  {
    id: 3,
    text: "¿España debería tomar más decisiones por sí misma aunque choque con la Unión Europea?",
    block: "nacion",
    weights: {
      nacionalista: 3,
      soberanista: 3,
      globalista: -3,
      institucionalista: -1,
    },
    info: {
      meaning:
        "Esta pregunta mide si prefieres más soberanía nacional o más coordinación con instituciones externas. Ejemplo cotidiano: aceptar o rechazar normas europeas sobre fronteras, agricultura, energía o ayudas públicas.",
      agree:
        "Si estás muy de acuerdo, en la práctica quieres que España tenga más margen para decidir aunque haya conflictos con organismos externos.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica valoras más la cooperación internacional y las reglas comunes, aunque algunas decisiones se tomen lejos del voto directo nacional.",
    },
  },
  {
    id: 4,
    text: "¿La inmigración debería controlarse más para proteger empleo, vivienda y convivencia?",
    block: "nacion",
    weights: {
      nacionalista: 3,
      soberanista: 2,
      conservador: 2,
      multiculturalista: -3,
      globalista: -2,
    },
    info: {
      meaning:
        "Esta pregunta mide tu posición sobre fronteras, integración y presión sobre servicios. Ejemplo cotidiano: acceso a vivienda, empleo, ayudas, idioma, seguridad o convivencia en barrios y escuelas.",
      agree:
        "Si estás muy de acuerdo, en la práctica quieres más requisitos, más control y más prioridad para la población local. Puede reducir presión social, pero también limitar llegada de trabajadores o personas que necesitan acogida.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica prefieres una sociedad más abierta. Puede aportar diversidad y población activa, pero necesita buena gestión para evitar problemas reales de integración.",
    },
  },
  {
    id: 5,
    text: "¿Se han perdido valores como respeto, familia, esfuerzo o disciplina?",
    block: "sociedad",
    weights: {
      conservador: 3,
      tradicionalista: 3,
      progresista: -3,
    },
    info: {
      meaning:
        "Esta pregunta mide si ves los cambios sociales como pérdida de valores o como evolución normal. Ejemplo cotidiano: educación de los hijos, respeto a profesores, normas de convivencia o importancia de la familia.",
      agree:
        "Si estás muy de acuerdo, en la práctica tiendes a valorar más autoridad, tradición, disciplina y continuidad cultural.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica tiendes a ver los cambios sociales como positivos o necesarios, aunque puedan incomodar a sectores más tradicionales.",
    },
  },
  {
    id: 6,
    text: "¿Para mejorar la seguridad aceptarías más policía, vigilancia o penas más duras?",
    block: "autoridad",
    weights: {
      autoritario: 3,
      conservador: 2,
      institucionalista: 1,
      libertario: -3,
      progresista: -1,
    },
    info: {
      meaning:
        "Esta pregunta mide cuánto poder debe tener el Estado para mantener el orden. Ejemplo cotidiano: cámaras en la calle, más controles policiales, más cárcel para reincidentes o más vigilancia digital.",
      agree:
        "Si estás muy de acuerdo, en la práctica priorizas seguridad y orden aunque haya menos privacidad o más poder policial.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica priorizas garantías, privacidad y límites al Estado, aunque algunas respuestas contra el delito sean más lentas.",
    },
  },
  {
    id: 7,
    text: "¿Los problemas globales se resuelven mejor con acuerdos internacionales?",
    block: "geopolitica",
    weights: {
      globalista: 3,
      progresista: 2,
      soberanista: -3,
      nacionalista: -2,
    },
    info: {
      meaning:
        "Esta pregunta mide si prefieres cooperación internacional o soluciones decididas por cada país. Ejemplo cotidiano: cambio climático, guerras, comercio, pandemias o inmigración.",
      agree:
        "Si estás muy de acuerdo, en la práctica apoyas normas comunes y acuerdos entre países. Puede coordinar mejor grandes problemas, pero reduce libertad de actuación nacional.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica prefieres que cada país actúe según sus propios intereses. Da más control interno, pero dificulta soluciones coordinadas.",
    },
  },
  {
    id: 8,
    text: "¿Las instituciones deberían proteger más la cultura, tradiciones y símbolos propios?",
    block: "identidad",
    weights: {
      nacionalista: 3,
      tradicionalista: 2,
      conservador: 2,
      multiculturalista: -2,
      globalista: -1,
    },
    info: {
      meaning:
        "Esta pregunta mide si das más importancia a una identidad cultural común o a una sociedad más plural. Ejemplo cotidiano: lengua, fiestas populares, símbolos públicos, religión, historia o tradiciones locales.",
      agree:
        "Si estás muy de acuerdo, en la práctica quieres reforzar la cultura propia desde las instituciones. Puede aumentar cohesión, pero dejar menos espacio a otras identidades.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica prefieres instituciones más neutrales o multiculturales. Puede favorecer pluralidad, pero debilitar referencias comunes.",
    },
  },
];

export const quickIdeologicalQuestions: Question[] = [
  {
    id: 1,
    text: "¿Prefieres que el Estado cobre más impuestos para pagar mejores servicios públicos y ayudas?",
    block: "economia",
    weights: {
      comunista: 3,
      socialista: 3,
      socialdemocrata: 2,
      liberal: -2,
      libertario: -3,
    },
    info: {
      meaning:
        "Esta pregunta trata sobre dinero público. Por ejemplo: sanidad, colegios, ayudas al alquiler, becas, pensiones o transporte público.",
      agree:
        "Si estás muy de acuerdo, en la práctica aceptas pagar más impuestos si eso permite tener más servicios y ayudas. Puede beneficiar a personas con menos ingresos, pero también puede hacer que trabajadores, autónomos y empresas paguen más.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica prefieres pagar menos impuestos y que cada persona decida más con su dinero. Puede dar más libertad económica, pero también puede dejar peor cubiertas cosas como sanidad, vivienda o ayudas sociales.",
    },
  },
  {
    id: 2,
    text: "¿Crees que abrir empresas, invertir y ganar dinero debería tener pocas trabas del Estado?",
    block: "economia",
    weights: {
      liberal: 3,
      libertario: 3,
      conservador: 1,
      socialista: -3,
      comunista: -3,
    },
    info: {
      meaning:
        "Esta pregunta trata sobre facilidad para emprender, contratar, vender, comprar vivienda, invertir o conservar patrimonio.",
      agree:
        "Si estás muy de acuerdo, en la práctica quieres menos papeleo, menos impuestos y menos límites para empresas y propietarios. Puede crear más actividad económica, pero también puede aumentar diferencias entre quien tiene mucho y quien tiene poco.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica aceptas más normas para repartir mejor la riqueza o controlar abusos. Por ejemplo, limitar alquileres o subir impuestos a grandes fortunas. Puede proteger más, pero también puede frenar inversión o crear más burocracia.",
    },
  },
  {
    id: 3,
    text: "¿Sanidad, educación y pensiones deberían depender sobre todo del Estado?",
    block: "economia",
    weights: {
      socialista: 3,
      socialdemocrata: 3,
      comunista: 2,
      liberal: -2,
      libertario: -3,
    },
    info: {
      meaning:
        "Esta pregunta habla de servicios básicos que casi todos usamos: médico, hospital, escuela, universidad, pensión o dependencia.",
      agree:
        "Si estás muy de acuerdo, en la práctica quieres que esos servicios estén garantizados aunque una persona tenga poco dinero. El coste es que hacen falta más impuestos y puede haber listas de espera o gestión lenta.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica quieres más peso de opciones privadas y elección personal. Puede dar más rapidez a quien puede pagar, pero también puede crear diferencias entre ciudadanos.",
    },
  },

  {
    id: 4,
    text: "¿España debería decidir más por sí misma aunque la Unión Europea u otros organismos digan otra cosa?",
    block: "nacion",
    weights: {
      nacionalista: 3,
      soberanista: 3,
      globalista: -3,
    },
    info: {
      meaning:
        "Esta pregunta trata sobre quién debe mandar más: el país o instituciones externas como la UE. Afecta a leyes, fronteras, ayudas europeas, energía o comercio.",
      agree:
        "Si estás muy de acuerdo, en la práctica quieres más independencia para tomar decisiones propias. Puede dar más control al país, pero también puede traer choques con Europa, pérdida de fondos o menos influencia fuera.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica aceptas más normas comunes y cooperación internacional. Puede dar estabilidad y acuerdos, pero algunas decisiones quedan más lejos del voto directo de los ciudadanos.",
    },
  },
  {
    id: 5,
    text: "¿La inmigración debería controlarse más para evitar problemas de vivienda, empleo o integración?",
    block: "nacion",
    weights: {
      nacionalista: 3,
      soberanista: 2,
      conservador: 2,
      multiculturalista: -3,
      globalista: -2,
    },
    info: {
      meaning:
        "Esta pregunta no va solo de fronteras. También trata de vivienda, trabajo, servicios públicos, seguridad, idioma e integración cultural.",
      agree:
        "Si estás muy de acuerdo, en la práctica quieres más requisitos de entrada, más control y más prioridad para la población local. Puede reducir presión sobre vivienda o servicios, pero también puede faltar mano de obra y limitar acogida de personas que necesitan ayuda.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica prefieres una sociedad más abierta. Puede aportar trabajadores, diversidad y población joven, pero necesita buena gestión para evitar problemas de convivencia, empleo o vivienda.",
    },
  },
  {
    id: 6,
    text: "¿La escuela debería enseñar más historia, lengua y cultura propias?",
    block: "nacion",
    weights: {
      nacionalista: 3,
      soberanista: 2,
      tradicionalista: 2,
      globalista: -2,
      multiculturalista: -2,
    },
    info: {
      meaning:
        "Esta pregunta trata sobre si una comunidad necesita una base común: historia, lengua, símbolos, fiestas y cultura compartida.",
      agree:
        "Si estás muy de acuerdo, en la práctica quieres que la escuela refuerce más la identidad común. Puede aumentar sentimiento de pertenencia, pero algunas familias pueden sentir que se impone una visión concreta.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica prefieres una escuela más neutral o más abierta a muchas identidades. Puede ser más plural, pero puede debilitar los vínculos comunes.",
    },
  },

  {
    id: 7,
    text: "¿Crees que se han perdido valores como respeto, familia, esfuerzo o disciplina?",
    block: "sociedad",
    weights: {
      conservador: 3,
      tradicionalista: 3,
      progresista: -3,
    },
    info: {
      meaning:
        "Esta pregunta trata sobre cambios sociales del día a día: familia, educación, respeto a profesores, normas, formas de hablar o convivencia.",
      agree:
        "Si estás muy de acuerdo, en la práctica sueles querer reforzar autoridad, familia, disciplina y costumbres. Puede dar más orden, pero también puede frenar cambios que otros consideran necesarios.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica ves los cambios sociales como algo normal o positivo. Puede abrir más libertad personal, pero también puede generar sensación de falta de límites.",
    },
  },
  {
    id: 8,
    text: "¿Los nuevos derechos y formas de vida deberían avanzar aunque choquen con costumbres antiguas?",
    block: "sociedad",
    weights: {
      progresista: 3,
      multiculturalista: 2,
      conservador: -2,
      tradicionalista: -3,
    },
    info: {
      meaning:
        "Esta pregunta trata sobre temas como modelos de familia, igualdad, identidad, costumbres, lenguaje público o cambios en la educación.",
      agree:
        "Si estás muy de acuerdo, en la práctica apoyas adaptar leyes y normas sociales a nuevas realidades. Puede ampliar derechos, pero también puede molestar a quienes sienten que sus valores quedan apartados.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica prefieres conservar más las costumbres existentes. Puede dar estabilidad, pero puede dejar sin respuesta a personas que piden reconocimiento o igualdad.",
    },
  },
  {
    id: 9,
    text: "¿La gente debería poder decir opiniones duras u ofensivas sin miedo a multas o censura?",
    block: "sociedad",
    weights: {
      libertario: 3,
      liberal: 2,
      conservador: 1,
      progresista: -1,
      autoritario: -2,
    },
    info: {
      meaning:
        "Esta pregunta trata sobre libertad de expresión. Por ejemplo: bromas polémicas, críticas al gobierno, opiniones sobre religión, inmigración o género.",
      agree:
        "Si estás muy de acuerdo, en la práctica proteges más el debate abierto y la crítica. El riesgo es que circulen mensajes hirientes, insultos o discursos que generen tensión.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica aceptas más límites para evitar daño o discriminación. El riesgo es que se use para censurar opiniones incómodas.",
    },
  },

  {
    id: 10,
    text: "¿Para mejorar la seguridad, aceptarías más vigilancia, más policía o penas más duras?",
    block: "autoridad",
    weights: {
      autoritario: 3,
      conservador: 2,
      institucionalista: 1,
      libertario: -3,
    },
    info: {
      meaning:
        "Esta pregunta trata sobre seguridad cotidiana: robos, okupación, disturbios, delitos graves, cámaras, policía y justicia.",
      agree:
        "Si estás muy de acuerdo, en la práctica quieres más herramientas contra el delito. Puede aumentar la sensación de seguridad, pero también puede reducir privacidad o aumentar abusos si no hay controles.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica prefieres proteger más derechos y límites al poder. Puede evitar abusos, pero puede hacer que el Estado actúe más lento contra algunos problemas.",
    },
  },
  {
    id: 11,
    text: "¿El Estado debería meterse lo menos posible en la vida privada de las personas?",
    block: "autoridad",
    weights: {
      libertario: 3,
      liberal: 2,
      autoritario: -3,
    },
    info: {
      meaning:
        "Esta pregunta trata sobre decisiones personales: privacidad, familia, consumo, educación, redes sociales o forma de vivir.",
      agree:
        "Si estás muy de acuerdo, en la práctica quieres que cada persona decida más por sí misma. Puede dar libertad, pero también reduce la capacidad del Estado para prevenir ciertos problemas.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica aceptas que el Estado regule más para proteger, ordenar o evitar riesgos. Puede dar más control social, pero también puede resultar invasivo.",
    },
  },
  {
    id: 12,
    text: "¿Los delitos graves o repetidos deberían castigarse con más dureza?",
    block: "autoridad",
    weights: {
      autoritario: 3,
      conservador: 2,
      progresista: -2,
      libertario: -1,
    },
    info: {
      meaning:
        "Esta pregunta trata sobre justicia penal: cárcel, multas, reincidencia, protección a víctimas y reinserción.",
      agree:
        "Si estás muy de acuerdo, en la práctica quieres castigos más duros para dar seguridad y sensación de justicia. Puede proteger más a víctimas, pero también llenar cárceles y dificultar segundas oportunidades.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica das más peso a reinserción y proporcionalidad. Puede ayudar a recuperar personas, pero puede generar sensación de impunidad si la respuesta parece blanda.",
    },
  },

  {
    id: 13,
    text: "¿España debería pensar primero en sus propios intereses aunque moleste a sus aliados?",
    block: "geopolitica",
    weights: {
      soberanista: 3,
      nacionalista: 2,
      globalista: -3,
      institucionalista: -1,
    },
    info: {
      meaning:
        "Esta pregunta trata sobre política exterior: UE, OTAN, comercio, energía, guerras, acuerdos y relaciones con otros países.",
      agree:
        "Si estás muy de acuerdo, en la práctica quieres más independencia exterior. Puede proteger intereses propios, pero también puede aislar o reducir apoyos internacionales.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica prefieres coordinación con aliados. Puede dar estabilidad y apoyo, pero a veces obliga a aceptar decisiones que no gustan dentro del país.",
    },
  },
  {
    id: 14,
    text: "¿Problemas como clima, guerras o migración se resuelven mejor con acuerdos internacionales?",
    block: "geopolitica",
    weights: {
      globalista: 3,
      progresista: 2,
      soberanista: -3,
      nacionalista: -2,
    },
    info: {
      meaning:
        "Esta pregunta trata sobre problemas que cruzan fronteras. Por ejemplo: cambio climático, refugiados, comercio, pandemias o guerras.",
      agree:
        "Si estás muy de acuerdo, en la práctica apoyas normas comunes y cooperación entre países. Puede resolver mejor problemas globales, pero reduce la libertad de cada país para actuar solo.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica prefieres que cada país decida por su cuenta. Da más control interno, pero dificulta coordinar soluciones amplias.",
    },
  },
  {
    id: 15,
    text: "¿España debería depender menos de otros países en energía, comida y defensa aunque sea más caro?",
    block: "geopolitica",
    weights: {
      soberanista: 3,
      nacionalista: 2,
      conservador: 1,
      globalista: -2,
      liberal: -1,
    },
    info: {
      meaning:
        "Esta pregunta trata sobre autosuficiencia. Por ejemplo: producir más energía aquí, proteger agricultura local o reforzar defensa.",
      agree:
        "Si estás muy de acuerdo, en la práctica quieres más independencia en sectores básicos. Puede proteger en crisis, pero puede subir precios o gasto público.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica aceptas depender más del comercio internacional si es más barato. Puede bajar costes, pero aumenta dependencia de otros países.",
    },
  },

  {
    id: 16,
    text: "¿Las instituciones deberían proteger más la cultura, tradiciones y símbolos propios?",
    block: "identidad",
    weights: {
      nacionalista: 3,
      tradicionalista: 2,
      conservador: 2,
      multiculturalista: -2,
    },
    info: {
      meaning:
        "Esta pregunta trata sobre fiestas, lengua, símbolos, historia, religión, tradiciones y cultura local o nacional.",
      agree:
        "Si estás muy de acuerdo, en la práctica quieres más apoyo público a la cultura propia. Puede reforzar pertenencia, pero puede dejar menos espacio a otras culturas.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica prefieres instituciones más neutrales. Puede favorecer pluralidad, pero también hacer que la cultura propia pierda presencia.",
    },
  },
  {
    id: 17,
    text: "¿Es mejor una sociedad con muchas culturas conviviendo que una con una cultura común fuerte?",
    block: "identidad",
    weights: {
      multiculturalista: 3,
      globalista: 2,
      progresista: 2,
      nacionalista: -3,
      tradicionalista: -2,
    },
    info: {
      meaning:
        "Esta pregunta trata sobre diversidad cultural frente a una identidad común compartida.",
      agree:
        "Si estás muy de acuerdo, en la práctica valoras diversidad, mezcla cultural y apertura. Puede enriquecer la sociedad, pero necesita buena integración para evitar separación entre grupos.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica prefieres una cultura común fuerte. Puede mejorar cohesión, pero puede dificultar que personas distintas se sientan plenamente incluidas.",
    },
  },
  {
    id: 18,
    text: "¿La religión y las tradiciones ayudan a mantener una sociedad más unida?",
    block: "identidad",
    weights: {
      tradicionalista: 3,
      conservador: 2,
      progresista: -2,
      multiculturalista: -1,
    },
    info: {
      meaning:
        "Esta pregunta trata sobre si religión y tradición siguen dando normas, comunidad y sentido compartido.",
      agree:
        "Si estás muy de acuerdo, en la práctica valoras más conservar celebraciones, creencias y costumbres. Puede unir a parte de la sociedad, pero puede excluir a quienes no comparten esa tradición.",
      disagree:
        "Si estás muy en desacuerdo, en la práctica prefieres una sociedad más secular y flexible. Puede dar más libertad individual, pero puede reducir referencias comunes.",
    },
  },
];

export const nationalPartyProfiles: Record<string, Record<string, number>> = {
  PSOE: {
    socialdemocrata: 85,
    socialista: 55,
    progresista: 75,
    globalista: 60,
    institucionalista: 70,
    conservador: 20,
    nacionalista: 35,
  },
  PP: {
    liberal: 70,
    conservador: 65,
    institucionalista: 75,
    nacionalista: 50,
    soberanista: 45,
    progresista: 25,
    socialista: 20,
  },
  VOX: {
    nacionalista: 90,
    soberanista: 90,
    conservador: 90,
    tradicionalista: 80,
    autoritario: 70,
    liberal: 60,
    multiculturalista: 5,
    globalista: 10,
  },
  Sumar: {
    socialista: 75,
    socialdemocrata: 65,
    progresista: 90,
    globalista: 75,
    multiculturalista: 85,
    conservador: 10,
    nacionalista: 25,
  },
  Podemos: {
    comunista: 55,
    socialista: 85,
    progresista: 90,
    globalista: 70,
    multiculturalista: 85,
    liberal: 10,
    conservador: 5,
  },
};

export const autonomousCommunities = [
  { id: "andalucia", name: "Andalucía" },
  { id: "aragon", name: "Aragón" },
  { id: "asturias", name: "Asturias" },
  { id: "baleares", name: "Islas Baleares" },
  { id: "canarias", name: "Canarias" },
  { id: "cantabria", name: "Cantabria" },
  { id: "castilla-la-mancha", name: "Castilla-La Mancha" },
  { id: "castilla-y-leon", name: "Castilla y León" },
  { id: "cataluna", name: "Cataluña" },
  { id: "comunidad-valenciana", name: "Comunidad Valenciana" },
  { id: "extremadura", name: "Extremadura" },
  { id: "galicia", name: "Galicia" },
  { id: "la-rioja", name: "La Rioja" },
  { id: "madrid", name: "Comunidad de Madrid" },
  { id: "murcia", name: "Región de Murcia" },
  { id: "navarra", name: "Navarra" },
  { id: "pais-vasco", name: "País Vasco" },
] as const;

export const regionalPartyProfiles: Record<string, Record<string, Record<string, number>>> = {
  andalucia: {
    "PP-A": { liberal: 70, conservador: 65, institucionalista: 70, nacionalista: 45, socialista: 20, progresista: 25 },
    "PSOE-A": { socialdemocrata: 85, socialista: 55, progresista: 70, institucionalista: 70, conservador: 20 },
    "Vox Andalucía": { nacionalista: 90, soberanista: 85, conservador: 90, tradicionalista: 80, autoritario: 70, multiculturalista: 5 },
    "Por Andalucía": { socialista: 75, progresista: 85, globalista: 70, multiculturalista: 80, conservador: 10 },
    "Adelante Andalucía": { socialista: 80, progresista: 80, soberanista: 65, nacionalista: 55, multiculturalista: 75 },
  },
  aragon: {
    "PP Aragón": { liberal: 70, conservador: 65, institucionalista: 70, nacionalista: 45 },
    "PSOE Aragón": { socialdemocrata: 85, socialista: 55, progresista: 70, institucionalista: 70 },
    "Vox Aragón": { nacionalista: 90, soberanista: 85, conservador: 90, autoritario: 70 },
    "CHA": { socialdemocrata: 65, progresista: 70, nacionalista: 70, soberanista: 60 },
    "Aragón Existe": { institucionalista: 65, soberanista: 55, socialdemocrata: 50, conservador: 35 },
  },
  asturias: {
    "PSOE Asturias": { socialdemocrata: 85, socialista: 55, progresista: 70, institucionalista: 70 },
    "PP Asturias": { liberal: 70, conservador: 65, institucionalista: 70, nacionalista: 45 },
    "Vox Asturias": { nacionalista: 90, soberanista: 85, conservador: 90, autoritario: 70 },
    "IU-Convocatoria por Asturias": { socialista: 80, comunista: 45, progresista: 80, multiculturalista: 75 },
    "Foro Asturias": { conservador: 65, liberal: 55, soberanista: 50, institucionalista: 55 },
  },
  baleares: {
    "PP Balears": { liberal: 70, conservador: 65, institucionalista: 70, nacionalista: 45 },
    "PSIB-PSOE": { socialdemocrata: 85, socialista: 55, progresista: 75, institucionalista: 70 },
    "Vox Baleares": { nacionalista: 90, soberanista: 85, conservador: 90, autoritario: 70 },
    "Més per Mallorca": { socialdemocrata: 65, progresista: 75, nacionalista: 75, soberanista: 70, multiculturalista: 70 },
    "Unidas Podemos Baleares": { socialista: 80, progresista: 90, globalista: 70, multiculturalista: 85 },
  },
  canarias: {
    "Coalición Canaria": { nacionalista: 75, soberanista: 65, socialdemocrata: 50, conservador: 35, institucionalista: 60 },
    "PSOE Canarias": { socialdemocrata: 85, socialista: 55, progresista: 70, institucionalista: 70 },
    "PP Canarias": { liberal: 70, conservador: 65, institucionalista: 70 },
    "Vox Canarias": { nacionalista: 90, soberanista: 85, conservador: 90, autoritario: 70 },
    "Nueva Canarias": { socialdemocrata: 65, progresista: 70, nacionalista: 70, soberanista: 65 },
  },
  cantabria: {
    "PP Cantabria": { liberal: 70, conservador: 65, institucionalista: 70 },
    "PRC": { institucionalista: 65, conservador: 45, socialdemocrata: 50, soberanista: 45 },
    "PSOE Cantabria": { socialdemocrata: 85, socialista: 55, progresista: 70 },
    "Vox Cantabria": { nacionalista: 90, soberanista: 85, conservador: 90, autoritario: 70 },
  },
  "castilla-la-mancha": {
    "PSOE Castilla-La Mancha": { socialdemocrata: 85, socialista: 55, progresista: 65, institucionalista: 70 },
    "PP Castilla-La Mancha": { liberal: 70, conservador: 70, institucionalista: 70 },
    "Vox Castilla-La Mancha": { nacionalista: 90, soberanista: 85, conservador: 90, autoritario: 70 },
  },
  "castilla-y-leon": {
    "PP Castilla y León": { liberal: 70, conservador: 70, institucionalista: 70 },
    "PSOE Castilla y León": { socialdemocrata: 85, socialista: 55, progresista: 65 },
    "Vox Castilla y León": { nacionalista: 90, soberanista: 85, conservador: 90, autoritario: 70 },
    "UPL": { nacionalista: 65, soberanista: 60, conservador: 45, socialdemocrata: 45 },
    "Soria ¡Ya!": { institucionalista: 65, socialdemocrata: 50, soberanista: 50 },
  },
  cataluna: {
    "PSC": { socialdemocrata: 85, socialista: 55, progresista: 75, institucionalista: 70, nacionalista: 35 },
    "Junts": { liberal: 65, nacionalista: 90, soberanista: 90, conservador: 45 },
    "ERC": { socialista: 70, socialdemocrata: 55, progresista: 80, nacionalista: 85, soberanista: 85 },
    "Vox Cataluña": { nacionalista: 90, soberanista: 85, conservador: 90, autoritario: 70 },
    "PP Cataluña": { liberal: 70, conservador: 65, institucionalista: 75, nacionalista: 50 },
    "Comuns": { socialista: 75, progresista: 90, globalista: 75, multiculturalista: 85 },
    "CUP": { comunista: 85, socialista: 90, nacionalista: 80, soberanista: 85, progresista: 85 },
    "Aliança Catalana": { nacionalista: 95, soberanista: 95, conservador: 90, tradicionalista: 85, multiculturalista: 5 },
  },
  "comunidad-valenciana": {
    "PP Comunitat Valenciana": { liberal: 70, conservador: 65, institucionalista: 70 },
    "PSPV-PSOE": { socialdemocrata: 85, socialista: 55, progresista: 75, institucionalista: 70 },
    "Vox Comunidad Valenciana": { nacionalista: 90, soberanista: 85, conservador: 90, autoritario: 70 },
    "Compromís": { socialdemocrata: 65, socialista: 55, progresista: 80, nacionalista: 70, multiculturalista: 75 },
  },
  extremadura: {
    "PP Extremadura": { liberal: 70, conservador: 65, institucionalista: 70 },
    "PSOE Extremadura": { socialdemocrata: 85, socialista: 55, progresista: 65 },
    "Vox Extremadura": { nacionalista: 90, soberanista: 85, conservador: 90, autoritario: 70 },
    "Unidas por Extremadura": { socialista: 80, progresista: 85, multiculturalista: 80 },
  },
  galicia: {
    "PPdeG": { liberal: 70, conservador: 65, institucionalista: 75, nacionalista: 45 },
    "PSdeG-PSOE": { socialdemocrata: 85, socialista: 55, progresista: 70 },
    "BNG": { socialista: 70, progresista: 75, nacionalista: 85, soberanista: 85 },
    "Vox Galicia": { nacionalista: 90, soberanista: 85, conservador: 90, autoritario: 70 },
  },
  "la-rioja": {
    "PP La Rioja": { liberal: 70, conservador: 65, institucionalista: 70 },
    "PSOE La Rioja": { socialdemocrata: 85, socialista: 55, progresista: 70 },
    "Vox La Rioja": { nacionalista: 90, soberanista: 85, conservador: 90, autoritario: 70 },
  },
  madrid: {
    "PP Madrid": { liberal: 80, conservador: 65, institucionalista: 70, nacionalista: 50 },
    "Más Madrid": { socialdemocrata: 65, socialista: 60, progresista: 90, globalista: 75, multiculturalista: 85 },
    "PSOE Madrid": { socialdemocrata: 85, socialista: 55, progresista: 75 },
    "Vox Madrid": { nacionalista: 90, soberanista: 85, conservador: 90, autoritario: 70 },
  },
  murcia: {
    "PP Región de Murcia": { liberal: 70, conservador: 70, institucionalista: 70 },
    "PSOE Murcia": { socialdemocrata: 85, socialista: 55, progresista: 65 },
    "Vox Murcia": { nacionalista: 90, soberanista: 85, conservador: 90, autoritario: 70 },
    "Podemos-IU Murcia": { socialista: 80, progresista: 85, multiculturalista: 80 },
  },
  navarra: {
    "UPN": { conservador: 70, institucionalista: 70, nacionalista: 55, liberal: 55 },
    "PSN-PSOE": { socialdemocrata: 85, socialista: 55, progresista: 70 },
    "EH Bildu Navarra": { socialista: 80, progresista: 80, nacionalista: 85, soberanista: 85 },
    "Geroa Bai": { socialdemocrata: 60, progresista: 65, nacionalista: 75, soberanista: 70 },
    "PP Navarra": { liberal: 70, conservador: 65, institucionalista: 75 },
    "Vox Navarra": { nacionalista: 90, soberanista: 85, conservador: 90, autoritario: 70 },
  },
  "pais-vasco": {
    "PNV": { liberal: 55, socialdemocrata: 50, nacionalista: 85, soberanista: 75, institucionalista: 65 },
    "EH Bildu": { socialista: 85, comunista: 45, progresista: 85, nacionalista: 90, soberanista: 90 },
    "PSE-EE": { socialdemocrata: 85, socialista: 55, progresista: 70, institucionalista: 70 },
    "PP País Vasco": { liberal: 70, conservador: 65, institucionalista: 75 },
    "Vox País Vasco": { nacionalista: 90, soberanista: 85, conservador: 90, autoritario: 70 },
  },
};

export const ideologyExplanations: Record<string, { title: string; description: string; example: string }> = {
  comunista: {
    title: "Comunista",
    description:
      "Da mucho peso a que la economía esté controlada por lo público o por la comunidad. Busca reducir al máximo las diferencias entre ricos y pobres.",
    example:
      "Por ejemplo: nacionalizar grandes empresas, limitar grandes fortunas o hacer que vivienda, energía y banca estén muy controladas por el Estado.",
  },
  socialista: {
    title: "Socialista",
    description:
      "Quiere que el Estado intervenga bastante para repartir mejor la riqueza y proteger a trabajadores, personas con menos ingresos y servicios públicos.",
    example:
      "Por ejemplo: impuestos más altos a rentas altas, ayudas al alquiler, sanidad pública fuerte y más regulación de empresas.",
  },
  socialdemocrata: {
    title: "Socialdemócrata",
    description:
      "Acepta el mercado y la empresa privada, pero quiere corregir sus excesos con impuestos, derechos laborales y servicios públicos fuertes.",
    example:
      "Por ejemplo: economía privada, pero con sanidad, educación, pensiones y ayudas públicas financiadas con impuestos.",
  },
  liberal: {
    title: "Liberal económico",
    description:
      "Prefiere menos impuestos, menos trabas para empresas y más libertad para comprar, vender, invertir o emprender.",
    example:
      "Por ejemplo: facilitar abrir negocios, bajar impuestos o permitir más competencia privada en servicios.",
  },
  libertario: {
    title: "Libertario",
    description:
      "Quiere que el Estado se meta lo mínimo posible tanto en la economía como en la vida privada de las personas.",
    example:
      "Por ejemplo: menos impuestos, menos regulación, más privacidad y más libertad individual para decidir.",
  },
  nacionalista: {
    title: "Nacionalista",
    description:
      "Da mucha importancia a la nación, la cultura propia, la lengua, los símbolos y la prioridad de la comunidad nacional.",
    example:
      "Por ejemplo: proteger la lengua propia, controlar más la inmigración o priorizar los intereses del país o territorio.",
  },
  soberanista: {
    title: "Soberanista",
    description:
      "Quiere que las decisiones importantes se tomen dentro del país o territorio, sin depender tanto de organismos externos.",
    example:
      "Por ejemplo: que España, Cataluña, Euskadi u otra comunidad tenga más capacidad para decidir leyes, economía o fronteras.",
  },
  globalista: {
    title: "Globalista",
    description:
      "Prefiere cooperación entre países, normas internacionales y soluciones comunes para problemas que superan fronteras.",
    example:
      "Por ejemplo: más coordinación europea, acuerdos climáticos, acogida internacional o tratados comunes.",
  },
  conservador: {
    title: "Conservador",
    description:
      "Prefiere mantener valores, costumbres e instituciones que considera importantes para la estabilidad social.",
    example:
      "Por ejemplo: dar más importancia a familia, orden, disciplina, autoridad, tradición o seguridad.",
  },
  progresista: {
    title: "Progresista",
    description:
      "Quiere cambios sociales para ampliar derechos, igualdad y reconocimiento de nuevas formas de vida.",
    example:
      "Por ejemplo: políticas de igualdad, derechos de minorías, nuevos modelos familiares o educación más inclusiva.",
  },
  autoritario: {
    title: "Autoritario",
    description:
      "Da mucho peso al orden, la seguridad y la autoridad del Estado, aunque eso limite algunas libertades.",
    example:
      "Por ejemplo: más policía, penas más duras, más vigilancia o menos tolerancia con disturbios.",
  },
  institucionalista: {
    title: "Institucionalista",
    description:
      "Confía en normas, instituciones, jueces, administración y acuerdos estables para mantener el sistema funcionando.",
    example:
      "Por ejemplo: respetar la Constitución, pactos de Estado, tribunales y procedimientos legales.",
  },
  tradicionalista: {
    title: "Tradicionalista",
    description:
      "Da mucha importancia a costumbres heredadas, religión, historia, familia tradicional y continuidad cultural.",
    example:
      "Por ejemplo: proteger fiestas tradicionales, símbolos religiosos, educación clásica o valores familiares.",
  },
  multiculturalista: {
    title: "Multiculturalista",
    description:
      "Ve positivo que convivan varias culturas, religiones y formas de vida dentro de una misma sociedad.",
    example:
      "Por ejemplo: apoyar diversidad cultural, integración de inmigrantes, pluralidad religiosa y políticas antidiscriminación.",
  },
  neutralista: {
    title: "Neutralista",
    description:
      "Prefiere que el país no se implique demasiado en bloques militares o conflictos internacionales.",
    example:
      "Por ejemplo: evitar alinearse automáticamente con potencias extranjeras o reducir participación en guerras.",
  },
  populista: {
    title: "Populista",
    description:
      "Suele enfrentar al pueblo común contra unas élites políticas, económicas o mediáticas que considera alejadas de la gente.",
    example:
      "Por ejemplo: criticar a partidos tradicionales, grandes medios o instituciones por no escuchar a la ciudadanía.",
  },
};

/* Ajuste de duración del test rápido:
   - Ultra rápido: 8 preguntas
   - Rápido: 30 preguntas
   - Completo: 216 preguntas
   Se añaden 12 preguntas del test completo para que el test rápido tenga más diferencia real respecto al ultra rápido. */
quickIdeologicalQuestions.push(...ideologicalQuestions.slice(18, 30));

/* Selección final de preguntas:
   - Test Rápido: se amplía a 10 preguntas.
   - Test Ideológico: se mantiene en 30 preguntas.
   - Test Completo: se reduce a 60 preguntas seleccionadas desde el banco completo de 216.
   No se elimina el banco completo original para poder reutilizarlo en futuras versiones o analíticas. */
function cloneQuestionByOriginalId(sourceId: number, newId: number): Question {
  const question = ideologicalQuestions.find((item) => item.id === sourceId);

  if (!question) {
    throw new Error(`No se ha encontrado la pregunta original ${sourceId}`);
  }

  return {
    ...question,
    id: newId,
  };
}

ultraQuickIdeologicalQuestions.push(
  cloneQuestionByOriginalId(11, 9),
  cloneQuestionByOriginalId(129, 10)
);

const completeIdeologicalQuestionIds = [
  1, 2, 3, 4, 5, 7, 11, 12, 15, 21,
  37, 38, 40, 41, 46, 48, 52, 53, 60, 72,
  73, 74, 75, 76, 78, 84, 88, 91, 93, 97,
  109, 110, 111, 112, 116, 120, 123, 127, 129, 144,
  145, 146, 148, 151, 153, 157, 164, 165, 173, 177,
  181, 182, 183, 184, 185, 186, 190, 196, 200, 216,
];

export const completeIdeologicalQuestions: Question[] = completeIdeologicalQuestionIds.map(
  (sourceId, index) => cloneQuestionByOriginalId(sourceId, index + 1)
);
