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
