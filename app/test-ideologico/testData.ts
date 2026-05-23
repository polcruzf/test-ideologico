export type Block =
  | "economia"
  | "nacion"
  | "sociedad"
  | "autoridad"
  | "geopolitica"
  | "identidad";

export type ReligionProfileKey =
  | "tradicional_religiosa"
  | "laicidad"
  | "apertura_religiosa"
  | "identitaria_cultural";

export type ReligionWeights = Partial<Record<ReligionProfileKey, number>>;

export type Question = {
  id: number;
  text: string;
  block: Block;
  weights: Record<string, number>;
  religionWeights?: ReligionWeights;
  info?: {
    meaning: string;
    agree: string;
    disagree: string;
  };
};

export type PartyPromiseStatus = "fulfilled" | "partial" | "not_fulfilled" | "not_applicable";

export type PartyPromiseItem = {
  title: string;
  status: PartyPromiseStatus;
  sourceLabel?: string;
  sourceHref?: string;
  evidence?: string;
};

export type PartyPromiseFulfillment = {
  percentage: number;
  fulfilled: number;
  partial: number;
  notFulfilled: number;
  total: number;
  updatedAt: string;
  methodology: string;
  promises: PartyPromiseItem[];
};

export type PartyReligionProfile = Partial<Record<ReligionProfileKey, number>>;

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

export const religionProfileLabels: Record<ReligionProfileKey, string> = {
  tradicional_religiosa: "Religión: Tradicional",
  laicidad: "Religión: Laica",
  apertura_religiosa: "Religión: Abierta",
  identitaria_cultural: "Religión: Identitaria",
};

export const religionProfileDescriptions: Record<ReligionProfileKey, string> = {
  tradicional_religiosa:
    "Valora que la religión y las tradiciones tengan presencia social y puedan ayudar a conservar valores comunitarios.",
  laicidad:
    "Prefiere instituciones públicas neutrales y una separación clara entre religión, Estado y vida pública institucional.",
  apertura_religiosa:
    "Valora que distintas religiones puedan expresarse públicamente y convivir con reconocimiento equilibrado dentro del marco legal común.",
  identitaria_cultural:
    "Da prioridad a la tradición religiosa vinculada a la cultura histórica del país como parte de la identidad colectiva y de la cohesión social.",
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
  ecologista: "Ecologista",
  marxismo: "Marxismo",
  bolchevismo: "Bolchevismo",
  nacionalSocialismo: "Nacional-socialismo (categoría histórica)",
  terceraPosicion: "Tercera posición",
  nacionalConservadurismo: "Nacional-conservadurismo",
  liberalismoClasico: "Liberalismo clásico",
  ecosocialismo: "Ecosocialismo",
};

export const partyProfiles: Record<string, Record<string, number>> = {
PSOE: {
  socialdemocrata: 86,
  socialista: 58,
  progresista: 78,
  globalista: 68,
  institucionalista: 76,
  multiculturalista: 62,
  ecologista: 62,
  liberal: 32,
  conservador: 22,
  nacionalista: 36,
  soberanista: 32,
  tradicionalista: 18,
  autoritario: 35
},
PP: {
  liberal: 74,
  conservador: 68,
  institucionalista: 78,
  nacionalista: 56,
  soberanista: 48,
  globalista: 48,
  socialdemocrata: 42,
  progresista: 28,
  socialista: 20,
  tradicionalista: 45,
  autoritario: 46,
  multiculturalista: 26
},
VOX: {
  nacionalista: 92,
  soberanista: 88,
  conservador: 91,
  tradicionalista: 84,
  autoritario: 74,
  liberal: 62,
  globalista: 8,
  multiculturalista: 4,
  progresista: 8,
  socialista: 14,
  institucionalista: 44
},
Sumar: {
  socialista: 78,
  socialdemocrata: 70,
  progresista: 92,
  globalista: 76,
  multiculturalista: 88,
  ecologista: 86,
  liberal: 12,
  conservador: 8,
  nacionalista: 26,
  soberanista: 42,
  institucionalista: 55
},
Podemos: {
  comunista: 58,
  socialista: 86,
  socialdemocrata: 62,
  progresista: 91,
  globalista: 66,
  multiculturalista: 88,
  ecologista: 82,
  soberanista: 48,
  liberal: 8,
  conservador: 5,
  institucionalista: 42
},
Ciudadanos: {
  liberal: 80,
  institucionalista: 78,
  globalista: 70,
  progresista: 48,
  conservador: 36,
  nacionalista: 34,
  socialdemocrata: 36,
  socialista: 14,
  multiculturalista: 48,
  autoritario: 34
},
PACMA: {
  progresista: 80,
  multiculturalista: 72,
  socialdemocrata: 58,
  globalista: 58,
  ecologista: 95,
  liberal: 22,
  conservador: 8,
  autoritario: 12,
  nacionalista: 18
},
"Recortes Cero": {
  socialista: 74,
  socialdemocrata: 58,
  progresista: 62,
  soberanista: 58,
  nacionalista: 48,
  populista: 50,
  liberal: 14,
  conservador: 22,
  globalista: 36
},
"Frente Obrero": {
  socialista: 72,
  comunista: 48,
  soberanista: 68,
  nacionalista: 64,
  conservador: 48,
  populista: 72,
  multiculturalista: 12,
  globalista: 12,
  liberal: 18,
  progresista: 34
},
"Falange Española": {
  nacionalista: 94,
  soberanista: 84,
  tradicionalista: 88,
  conservador: 84,
  autoritario: 78,
  socialista: 38,
  populista: 58,
  liberal: 22,
  globalista: 4,
  multiculturalista: 2
},
PCTE: {
  comunista: 92,
  socialista: 88,
  soberanista: 62,
  progresista: 58,
  populista: 48,
  liberal: 4,
  conservador: 8,
  globalista: 18,
  multiculturalista: 42
},
PCPE: {
  comunista: 93,
  socialista: 88,
  soberanista: 62,
  progresista: 56,
  populista: 50,
  liberal: 4,
  conservador: 8,
  globalista: 18,
  multiculturalista: 40
},
PDeCAT: {
  liberal: 68,
  nacionalista: 82,
  soberanista: 82,
  institucionalista: 55,
  conservador: 44,
  globalista: 45,
  socialdemocrata: 34,
  progresista: 38
},
PNV: {
  liberal: 56,
  socialdemocrata: 52,
  nacionalista: 86,
  soberanista: 76,
  institucionalista: 68,
  conservador: 42,
  progresista: 46,
  globalista: 48
},
"EH Bildu": {
  socialista: 86,
  comunista: 48,
  progresista: 86,
  nacionalista: 90,
  soberanista: 90,
  multiculturalista: 72,
  ecologista: 72,
  liberal: 8,
  conservador: 10
},
BNG: {
  socialista: 72,
  socialdemocrata: 58,
  progresista: 78,
  nacionalista: 86,
  soberanista: 86,
  multiculturalista: 62,
  ecologista: 70,
  liberal: 12,
  conservador: 12
},
"Coalición Canaria": {
  nacionalista: 76,
  soberanista: 66,
  socialdemocrata: 54,
  institucionalista: 62,
  liberal: 46,
  conservador: 38,
  progresista: 42,
  globalista: 36
},
"Nueva Canarias": {
  nacionalista: 72,
  soberanista: 68,
  socialdemocrata: 62,
  progresista: 66,
  ecologista: 58,
  institucionalista: 56,
  liberal: 28,
  conservador: 24
},
UPN: {
  conservador: 72,
  institucionalista: 72,
  nacionalista: 58,
  liberal: 56,
  soberanista: 36,
  tradicionalista: 58,
  progresista: 18,
  socialista: 14
},
"Compromís": {
  socialdemocrata: 66,
  socialista: 58,
  progresista: 82,
  nacionalista: 72,
  soberanista: 62,
  multiculturalista: 76,
  ecologista: 78,
  conservador: 8,
  liberal: 16
},
ERC: {
  socialista: 72,
  socialdemocrata: 58,
  progresista: 82,
  nacionalista: 86,
  soberanista: 88,
  multiculturalista: 68,
  ecologista: 68,
  liberal: 12,
  conservador: 14
},
Junts: {
  liberal: 66,
  nacionalista: 90,
  soberanista: 90,
  conservador: 46,
  institucionalista: 48,
  globalista: 38,
  socialdemocrata: 34,
  socialista: 18,
  progresista: 38
},
CUP: {
  comunista: 86,
  socialista: 92,
  nacionalista: 82,
  soberanista: 88,
  progresista: 88,
  multiculturalista: 76,
  ecologista: 82,
  liberal: 4,
  conservador: 6
},
"Teruel Existe": {
  institucionalista: 68,
  socialdemocrata: 54,
  soberanista: 56,
  nacionalista: 44,
  conservador: 34,
  progresista: 42,
  liberal: 34
},
"Por Un Mundo Más Justo": {
  socialdemocrata: 60,
  progresista: 70,
  globalista: 72,
  multiculturalista: 82,
  ecologista: 58,
  socialista: 54,
  conservador: 10,
  liberal: 18
}
};

export const ideologicalQuestions: Question[] = [
  {
    "id": 1,
    "text": "El Estado debería nacionalizar empresas estratégicas.",
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
    "text": "El libre mercado genera más prosperidad que la intervención estatal.",
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
    "text": "Los impuestos a las grandes fortunas deberían ser más altos.",
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
    "text": "La propiedad privada es un derecho fundamental que el Estado debe proteger.",
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
    "text": "La sanidad debería ser completamente pública.",
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
    "text": "La educación privada debería tener más límites legales.",
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
    "text": "Las ayudas sociales demasiado amplias generan dependencia.",
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
    "text": "El Estado debería garantizar empleo a todo ciudadano.",
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
    "text": "Las empresas deberían pagar más impuestos aunque reduzcan beneficios.",
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
    "text": "Los sindicatos deberían tener más poder en las empresas.",
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
    "text": "El Estado debería intervenir en la economía para controlar precios en sectores importantes.",
    "block": "economia",
    "weights": {
      "socialista": 3,
      "socialdemocrata": 3,
      "comunista": 1,
      "liberal": -2,
      "libertario": -3
    }
  },
  {
    "id": 12,
    "text": "Los emprendedores deberían tener menos cargas fiscales.",
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
    "text": "El salario mínimo debería subir de forma obligatoria cada año.",
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
    "text": "La banca debería estar mucho más controlada por el Estado.",
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
    "text": "La desigualdad económica es aceptable si aumenta la riqueza general.",
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
    "text": "Las grandes herencias deberían pagar más impuestos.",
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
    "text": "La competencia privada mejora los servicios públicos.",
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
    "text": "El Estado debería limitar los beneficios de sectores esenciales.",
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
    "text": "Los trabajadores deberían participar en la dirección de las empresas.",
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
    "text": "La economía planificada es más justa que el mercado libre.",
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
    "text": "Reducir impuestos suele mejorar la economía.",
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
    "text": "El Estado debería rescatar empresas privadas en crisis.",
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
    "text": "Las multinacionales tienen demasiado poder sobre los gobiernos.",
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
    "text": "La economía debería priorizar la igualdad sobre el crecimiento.",
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
    "text": "El pequeño comercio debería recibir protección frente a grandes cadenas.",
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
    "text": "El mercado laboral debería ser más flexible para contratar y despedir.",
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
    "text": "El Estado debería controlar el precio de la energía.",
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
    "text": "Las privatizaciones suelen empeorar los servicios esenciales.",
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
    "text": "La inversión extranjera es positiva aunque reduzca control nacional.",
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
    "text": "El déficit público es aceptable para financiar derechos sociales.",
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
    "text": "La economía debe estar al servicio de la nación antes que del mercado global.",
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
    "text": "Los impuestos bajos son una forma de libertad individual.",
    "block": "economia",
    "weights": {
      "liberal": 3,
      "libertario": 3,
      "socialista": -2
    }
  },
  {
    "id": 33,
    "text": "Las pensiones deberían depender más del ahorro privado.",
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
    "text": "La riqueza acumulada por grandes fortunas es moralmente sospechosa.",
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
    "text": "La propiedad pública es preferible en sectores básicos.",
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
    "text": "La libertad empresarial debe prevalecer sobre la regulación laboral.",
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
    "text": "La soberanía nacional debe estar por encima de organismos internacionales.",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "soberanista": 3,
      "globalista": -3
    }
  },
  {
    "id": 38,
    "text": "La inmigración debería limitarse para proteger la identidad cultural.",
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
    "text": "La globalización debilita la identidad de los pueblos.",
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
    "text": "La nación es más importante que la clase social.",
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
    "text": "Las fronteras deberían ser más estrictas.",
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
    "text": "El patriotismo es una virtud política positiva.",
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
    "text": "La ciudadanía debería ser más difícil de obtener.",
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
    "text": "Los ciudadanos nacionales deberían tener prioridad laboral.",
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
    "text": "La lengua nacional debe tener protección preferente.",
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
    "text": "Las regiones con identidad propia deberían poder independizarse.",
    "block": "nacion",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "institucionalista": -1
    }
  },
  {
    "id": 47,
    "text": "El multiculturalismo debilita la cohesión social.",
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
    "text": "La Unión Europea tiene demasiado poder sobre España.",
    "block": "nacion",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -3
    }
  },
  {
    "id": 49,
    "text": "La prioridad política debe ser proteger al pueblo propio.",
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
    "text": "Los tratados internacionales reducen la democracia nacional.",
    "block": "nacion",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -2
    }
  },
  {
    "id": 51,
    "text": "La identidad cultural debe enseñarse más en la escuela.",
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
    "text": "Las políticas migratorias actuales son demasiado permisivas.",
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
    "text": "Un país debe anteponer sus intereses a los intereses globales.",
    "block": "nacion",
    "weights": {
      "soberanista": 3,
      "nacionalista": 3,
      "globalista": -3
    }
  },
  {
    "id": 54,
    "text": "La cultura propia puede perderse por exceso de inmigración.",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "conservador": 2,
      "multiculturalista": -3
    }
  },
  {
    "id": 55,
    "text": "Las élites globales perjudican a las naciones pequeñas.",
    "block": "nacion",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -2
    }
  },
  {
    "id": 56,
    "text": "La bandera y los símbolos nacionales son políticamente importantes.",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "conservador": 2,
      "soberanista": 1
    }
  },
  {
    "id": 57,
    "text": "El nacionalismo puede ser una defensa legítima de un pueblo.",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "soberanista": 2,
      "globalista": -2
    }
  },
  {
    "id": 58,
    "text": "El internacionalismo suele ignorar las identidades reales.",
    "block": "nacion",
    "weights": {
      "nacionalista": 2,
      "soberanista": 2,
      "globalista": -3
    }
  },
  {
    "id": 59,
    "text": "El control fronterizo es imprescindible para la seguridad.",
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
    "text": "Las ayudas públicas deberían priorizar a ciudadanos nacionales.",
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
    "text": "La nación debe protegerse incluso frente a intereses económicos externos.",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "soberanista": 3,
      "liberal": -1
    }
  },
  {
    "id": 62,
    "text": "La descentralización territorial mejora la convivencia.",
    "block": "nacion",
    "weights": {
      "institucionalista": 2,
      "soberanista": 1,
      "nacionalista": 1
    }
  },
  {
    "id": 63,
    "text": "El centralismo protege mejor la unidad nacional.",
    "block": "nacion",
    "weights": {
      "nacionalista": 2,
      "conservador": 2,
      "soberanista": 1
    }
  },
  {
    "id": 64,
    "text": "Una nación sin soberanía económica no es plenamente libre.",
    "block": "nacion",
    "weights": {
      "soberanista": 3,
      "nacionalista": 3,
      "globalista": -2
    }
  },
  {
    "id": 65,
    "text": "Las fronteras abiertas son una amenaza para el Estado del bienestar.",
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
    "text": "La identidad nacional debe estar por encima de identidades individuales.",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "conservador": 2,
      "libertario": -2
    }
  },
  {
    "id": 67,
    "text": "El turismo masivo puede dañar la identidad local.",
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
    "text": "Los organismos supranacionales deben tener menos poder.",
    "block": "nacion",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -3
    }
  },
  {
    "id": 69,
    "text": "Una comunidad política necesita una cultura común fuerte.",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "conservador": 2,
      "multiculturalista": -2
    }
  },
  {
    "id": 70,
    "text": "La inmigración debe adaptarse culturalmente al país receptor.",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "conservador": 2,
      "multiculturalista": -2
    }
  },
  {
    "id": 71,
    "text": "El patriotismo económico es necesario para proteger empleo local.",
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
    "text": "La nación debe ser el marco principal de la democracia.",
    "block": "nacion",
    "weights": {
      "nacionalista": 3,
      "soberanista": 3,
      "globalista": -2
    }
  },
  {
    "id": 73,
    "text": "La sociedad actual ha perdido valores tradicionales importantes.",
    "block": "sociedad",
    "weights": {
      "conservador": 3,
      "tradicionalista": 3,
      "progresista": -3
    }
  },
  {
    "id": 74,
    "text": "El cambio social rápido suele ser positivo.",
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
    "text": "La familia tradicional debería protegerse especialmente.",
    "block": "sociedad",
    "weights": {
      "conservador": 3,
      "tradicionalista": 3,
      "progresista": -2
    }
  },
  {
    "id": 76,
    "text": "La corrección política limita la libertad de expresión.",
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
    "text": "El feminismo actual ha ido demasiado lejos.",
    "block": "sociedad",
    "weights": {
      "conservador": 3,
      "tradicionalista": 2,
      "progresista": -3
    }
  },
  {
    "id": 78,
    "text": "La religión debería mantenerse fuera de las instituciones públicas.",
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
    "text": "La escuela debería transmitir valores tradicionales.",
    "block": "sociedad",
    "weights": {
      "conservador": 3,
      "tradicionalista": 3,
      "progresista": -2
    }
  },
  {
    "id": 80,
    "text": "La libertad individual debe estar por encima de normas morales colectivas.",
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
    "text": "La sociedad necesita más disciplina y menos permisividad.",
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
    "text": "La cultura moderna es demasiado individualista.",
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
    "text": "Las nuevas generaciones han perdido respeto por la autoridad.",
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
    "text": "La igualdad de género debería ser una prioridad política central.",
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
    "text": "Las políticas identitarias fragmentan la sociedad.",
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
    "text": "La tradición suele contener sabiduría acumulada.",
    "block": "sociedad",
    "weights": {
      "tradicionalista": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 87,
    "text": "La moral pública debería tener ciertos límites legales.",
    "block": "sociedad",
    "weights": {
      "conservador": 3,
      "autoritario": 2,
      "libertario": -3
    }
  },
  {
    "id": 88,
    "text": "La sociedad debería ser más tolerante con estilos de vida diversos.",
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
    "text": "Los medios promueven valores demasiado progresistas.",
    "block": "sociedad",
    "weights": {
      "conservador": 3,
      "tradicionalista": 2,
      "progresista": -2
    }
  },
  {
    "id": 90,
    "text": "La educación sexual debería ampliarse en las escuelas.",
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
    "text": "El mérito individual es más importante que la igualdad de resultados.",
    "block": "sociedad",
    "weights": {
      "liberal": 3,
      "conservador": 2,
      "socialista": -2
    }
  },
  {
    "id": 92,
    "text": "La sociedad debe proteger especialmente a minorías discriminadas.",
    "block": "sociedad",
    "weights": {
      "progresista": 3,
      "socialdemocrata": 2,
      "conservador": -1
    }
  },
  {
    "id": 93,
    "text": "El matrimonio y la familia son pilares centrales de la sociedad.",
    "block": "sociedad",
    "weights": {
      "conservador": 3,
      "tradicionalista": 3,
      "progresista": -1
    }
  },
  {
    "id": 94,
    "text": "El Estado no debería imponer una visión moral concreta.",
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
    "text": "La cultura occidental está en decadencia.",
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
    "text": "Las reformas sociales deberían hacerse lentamente.",
    "block": "sociedad",
    "weights": {
      "conservador": 2,
      "institucionalista": 2,
      "progresista": -1
    }
  },
  {
    "id": 97,
    "text": "La libertad de expresión debe incluir opiniones ofensivas.",
    "block": "sociedad",
    "weights": {
      "libertario": 3,
      "liberal": 2,
      "progresista": -1
    }
  },
  {
    "id": 98,
    "text": "La protección de animales debería tener más peso legal.",
    "block": "sociedad",
    "weights": {
      "progresista": 2,
      "socialdemocrata": 1,
      "conservador": -1
    }
  },
  {
    "id": 99,
    "text": "La religión aporta estabilidad social.",
    "block": "sociedad",
    "weights": {
      "tradicionalista": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 100,
    "text": "El secularismo estricto es necesario en una democracia moderna.",
    "block": "sociedad",
    "weights": {
      "progresista": 2,
      "liberal": 2,
      "tradicionalista": -3
    }
  },
  {
    "id": 101,
    "text": "El arte y la cultura deberían ser más libres de límites morales.",
    "block": "sociedad",
    "weights": {
      "libertario": 2,
      "progresista": 2,
      "tradicionalista": -2
    }
  },
  {
    "id": 102,
    "text": "La escuela debería ser neutral en debates culturales.",
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
    "text": "Las cuotas por género o identidad son justas.",
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
    "text": "La sociedad necesita recuperar respeto por la tradición.",
    "block": "sociedad",
    "weights": {
      "tradicionalista": 3,
      "conservador": 3,
      "progresista": -2
    }
  },
  {
    "id": 105,
    "text": "La cultura popular actual perjudica a los jóvenes.",
    "block": "sociedad",
    "weights": {
      "conservador": 2,
      "tradicionalista": 2,
      "progresista": -1
    }
  },
  {
    "id": 106,
    "text": "Las familias deberían tener más libertad para elegir educación moral.",
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
    "text": "El progreso social suele traer más derechos y bienestar.",
    "block": "sociedad",
    "weights": {
      "progresista": 3,
      "socialdemocrata": 1,
      "conservador": -2
    }
  },
  {
    "id": 108,
    "text": "La estabilidad cultural es más importante que la innovación social.",
    "block": "sociedad",
    "weights": {
      "conservador": 3,
      "tradicionalista": 2,
      "progresista": -2
    }
  },
  {
    "id": 109,
    "text": "La seguridad debe priorizarse sobre ciertas libertades individuales.",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "institucionalista": 1,
      "libertario": -3
    }
  },
  {
    "id": 110,
    "text": "La policía necesita más autoridad para mantener el orden.",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "conservador": 2,
      "libertario": -2
    }
  },
  {
    "id": 111,
    "text": "El Estado debería tener el menor poder posible sobre la vida privada.",
    "block": "autoridad",
    "weights": {
      "libertario": 3,
      "liberal": 2,
      "autoritario": -3
    }
  },
  {
    "id": 112,
    "text": "Las penas judiciales deberían endurecerse.",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 113,
    "text": "La vigilancia digital es aceptable para prevenir delitos graves.",
    "block": "autoridad",
    "weights": {
      "autoritario": 2,
      "institucionalista": 1,
      "libertario": -3
    }
  },
  {
    "id": 114,
    "text": "Las protestas radicales deberían reprimirse con firmeza.",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 115,
    "text": "El orden público es más importante que el derecho a protestar.",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "conservador": 2,
      "libertario": -2
    }
  },
  {
    "id": 116,
    "text": "El Estado suele abusar de su poder.",
    "block": "autoridad",
    "weights": {
      "libertario": 3,
      "liberal": 2,
      "autoritario": -3
    }
  },
  {
    "id": 117,
    "text": "El ejército debería tener más presupuesto.",
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
    "text": "El servicio militar obligatorio sería positivo.",
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
    "text": "La desobediencia civil puede estar justificada.",
    "block": "autoridad",
    "weights": {
      "progresista": 2,
      "libertario": 2,
      "autoritario": -2
    }
  },
  {
    "id": 120,
    "text": "La ley debe cumplirse aunque parezca injusta.",
    "block": "autoridad",
    "weights": {
      "institucionalista": 3,
      "autoritario": 2,
      "libertario": -1
    }
  },
  {
    "id": 121,
    "text": "Los jueces deberían ser más duros con delincuentes reincidentes.",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "conservador": 2,
      "progresista": -1
    }
  },
  {
    "id": 122,
    "text": "La prisión debería centrarse más en castigo que en reinserción.",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 123,
    "text": "La reinserción social debe ser prioritaria en justicia penal.",
    "block": "autoridad",
    "weights": {
      "progresista": 2,
      "socialdemocrata": 2,
      "autoritario": -2
    }
  },
  {
    "id": 124,
    "text": "La censura puede ser aceptable para evitar desorden social.",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "libertario": -3,
      "liberal": -2
    }
  },
  {
    "id": 125,
    "text": "Las armas deberían estar más reguladas.",
    "block": "autoridad",
    "weights": {
      "institucionalista": 2,
      "progresista": 1,
      "libertario": -2
    }
  },
  {
    "id": 126,
    "text": "Los estados de emergencia se usan demasiado fácilmente.",
    "block": "autoridad",
    "weights": {
      "libertario": 2,
      "liberal": 1,
      "autoritario": -2
    }
  },
  {
    "id": 127,
    "text": "Un gobierno fuerte es necesario en tiempos de crisis.",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "institucionalista": 2,
      "libertario": -2
    }
  },
  {
    "id": 128,
    "text": "La democracia debe limitar a partidos que amenacen el sistema.",
    "block": "autoridad",
    "weights": {
      "institucionalista": 3,
      "autoritario": 1,
      "libertario": -2
    }
  },
  {
    "id": 129,
    "text": "Los acuerdos internacionales deberían tener más peso que las decisiones individuales de cada país.",
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
    "text": "La autoridad de profesores y padres debería reforzarse.",
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
    "text": "El Estado debería poder prohibir organizaciones extremistas.",
    "block": "autoridad",
    "weights": {
      "autoritario": 2,
      "institucionalista": 2,
      "libertario": -2
    }
  },
  {
    "id": 132,
    "text": "La policía recibe demasiadas críticas injustas.",
    "block": "autoridad",
    "weights": {
      "conservador": 2,
      "autoritario": 2,
      "progresista": -2
    }
  },
  {
    "id": 133,
    "text": "El derecho a la privacidad debe pesar más que la seguridad.",
    "block": "autoridad",
    "weights": {
      "libertario": 3,
      "liberal": 2,
      "autoritario": -2
    }
  },
  {
    "id": 134,
    "text": "Los delitos contra la nación deberían castigarse con especial dureza.",
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
    "text": "El sistema judicial es demasiado blando.",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "conservador": 2,
      "progresista": -1
    }
  },
  {
    "id": 136,
    "text": "La autoridad política debe estar fuertemente limitada por la Constitución.",
    "block": "autoridad",
    "weights": {
      "institucionalista": 3,
      "liberal": 2,
      "autoritario": -1
    }
  },
  {
    "id": 137,
    "text": "La población debería votar más decisiones mediante referéndum.",
    "block": "autoridad",
    "weights": {
      "soberanista": 2,
      "libertario": 1,
      "institucionalista": -1
    }
  },
  {
    "id": 138,
    "text": "La tecnocracia puede ser mejor que la política partidista.",
    "block": "autoridad",
    "weights": {
      "institucionalista": 2,
      "liberal": 1,
      "populista": -1
    }
  },
  {
    "id": 139,
    "text": "El Estado debería controlar más los contenidos peligrosos en internet.",
    "block": "autoridad",
    "weights": {
      "autoritario": 2,
      "institucionalista": 1,
      "libertario": -3
    }
  },
  {
    "id": 140,
    "text": "La seguridad nacional justifica secretos de Estado.",
    "block": "autoridad",
    "weights": {
      "autoritario": 2,
      "institucionalista": 2,
      "libertario": -2
    }
  },
  {
    "id": 141,
    "text": "Las fuerzas de seguridad deben tener presunción de autoridad.",
    "block": "autoridad",
    "weights": {
      "autoritario": 3,
      "conservador": 2,
      "libertario": -1
    }
  },
  {
    "id": 142,
    "text": "La libertad de manifestación debe prevalecer aunque cause molestias.",
    "block": "autoridad",
    "weights": {
      "libertario": 2,
      "progresista": 2,
      "autoritario": -2
    }
  },
  {
    "id": 143,
    "text": "La estabilidad social es más importante que el cambio político.",
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
    "text": "El poder político debería estar mucho más descentralizado.",
    "block": "autoridad",
    "weights": {
      "libertario": 2,
      "soberanista": 2,
      "autoritario": -2
    }
  },
  {
    "id": 145,
    "text": "La política exterior debe centrarse primero en los intereses nacionales.",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -2
    }
  },
  {
    "id": 146,
    "text": "La integración europea debería ampliarse.",
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
    "text": "Las organizaciones internacionales tienen demasiado poder.",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -3
    }
  },
  {
    "id": 148,
    "text": "La cooperación internacional es más importante que la soberanía nacional.",
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
    "text": "La OTAN es necesaria para la seguridad de España.",
    "block": "geopolitica",
    "weights": {
      "institucionalista": 2,
      "liberal": 1,
      "soberanista": -1
    }
  },
  {
    "id": 150,
    "text": "Las guerras modernas suelen estar motivadas por intereses económicos ocultos.",
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
    "text": "España debería ser más neutral en conflictos internacionales.",
    "block": "geopolitica",
    "weights": {
      "soberanista": 2,
      "neutralista": 3,
      "globalista": -1
    }
  },
  {
    "id": 152,
    "text": "Los países occidentales intervienen demasiado en otros países.",
    "block": "geopolitica",
    "weights": {
      "soberanista": 2,
      "socialista": 1,
      "globalista": -1
    }
  },
  {
    "id": 153,
    "text": "La independencia energética es una prioridad nacional.",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "conservador": 1
    }
  },
  {
    "id": 154,
    "text": "El comercio internacional perjudica a industrias locales.",
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
    "text": "Las sanciones económicas son una herramienta legítima.",
    "block": "geopolitica",
    "weights": {
      "institucionalista": 2,
      "globalista": 1,
      "soberanista": -1
    }
  },
  {
    "id": 156,
    "text": "Los derechos humanos justifican intervenir en otros países.",
    "block": "geopolitica",
    "weights": {
      "globalista": 2,
      "progresista": 2,
      "soberanista": -2
    }
  },
  {
    "id": 157,
    "text": "Los tratados de libre comercio benefician a la economía.",
    "block": "geopolitica",
    "weights": {
      "liberal": 3,
      "globalista": 2,
      "soberanista": -1
    }
  },
  {
    "id": 158,
    "text": "La soberanía militar es esencial para ser un país libre.",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -2
    }
  },
  {
    "id": 159,
    "text": "La ONU debería tener más capacidad de decisión.",
    "block": "geopolitica",
    "weights": {
      "globalista": 3,
      "progresista": 1,
      "soberanista": -3
    }
  },
  {
    "id": 160,
    "text": "Los bloques económicos reducen independencia nacional.",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -2
    }
  },
  {
    "id": 161,
    "text": "La diplomacia debe prevalecer casi siempre sobre la fuerza militar.",
    "block": "geopolitica",
    "weights": {
      "globalista": 2,
      "progresista": 2,
      "autoritario": -1
    }
  },
  {
    "id": 162,
    "text": "Un país debe proteger su industria aunque encarezca productos.",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "liberal": -2
    }
  },
  {
    "id": 163,
    "text": "La política exterior debería defender valores universales.",
    "block": "geopolitica",
    "weights": {
      "globalista": 2,
      "progresista": 2,
      "soberanista": -1
    }
  },
  {
    "id": 164,
    "text": "Las fronteras nacionales siguen siendo esenciales en el siglo XXI.",
    "block": "geopolitica",
    "weights": {
      "nacionalista": 3,
      "soberanista": 3,
      "globalista": -3
    }
  },
  {
    "id": 165,
    "text": "España debería reducir su dependencia de la UE.",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -3
    }
  },
  {
    "id": 166,
    "text": "Las instituciones europeas protegen mejor los derechos que los Estados.",
    "block": "geopolitica",
    "weights": {
      "globalista": 2,
      "progresista": 1,
      "soberanista": -2
    }
  },
  {
    "id": 167,
    "text": "La inmigración debe gestionarse con acuerdos internacionales.",
    "block": "geopolitica",
    "weights": {
      "globalista": 2,
      "multiculturalista": 1,
      "soberanista": -1
    }
  },
  {
    "id": 168,
    "text": "La ayuda exterior debe reducirse si hay problemas internos.",
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
    "text": "La globalización beneficia principalmente a élites económicas.",
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
    "text": "Los países deben poder ignorar normas internacionales injustas.",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -2
    }
  },
  {
    "id": 171,
    "text": "La defensa común europea sería positiva.",
    "block": "geopolitica",
    "weights": {
      "globalista": 2,
      "institucionalista": 2,
      "soberanista": -1
    }
  },
  {
    "id": 172,
    "text": "La seguridad nacional debe condicionar la política económica.",
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
    "text": "Los refugiados de guerra deberían ser acogidos ampliamente.",
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
    "text": "El realismo político es más importante que el idealismo moral.",
    "block": "geopolitica",
    "weights": {
      "soberanista": 2,
      "conservador": 1,
      "globalista": -1
    }
  },
  {
    "id": 175,
    "text": "Los organismos globales limitan la voluntad popular.",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -3
    }
  },
  {
    "id": 176,
    "text": "La política exterior debe proteger a comunidades culturales afines.",
    "block": "geopolitica",
    "weights": {
      "nacionalista": 2,
      "soberanista": 2,
      "globalista": -1
    }
  },
  {
    "id": 177,
    "text": "La cooperación internacional ayuda a resolver problemas climáticos.",
    "block": "geopolitica",
    "weights": {
      "globalista": 3,
      "progresista": 2,
      "soberanista": -1
    }
  },
  {
    "id": 178,
    "text": "El ejército debe ser una herramienta central de soberanía.",
    "block": "geopolitica",
    "weights": {
      "nacionalista": 2,
      "soberanista": 3,
      "conservador": 1
    }
  },
  {
    "id": 179,
    "text": "La política exterior española debería ser más independiente de EE. UU..",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "socialista": 1,
      "globalista": -1
    }
  },
  {
    "id": 180,
    "text": "El internacionalismo debilita la democracia nacional.",
    "block": "geopolitica",
    "weights": {
      "soberanista": 3,
      "nacionalista": 2,
      "globalista": -3
    }
  },
  {
    "id": 181,
    "text": "La identidad cultural propia debe protegerse activamente desde el Estado.",
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
    "text": "Una sociedad multicultural es preferible a una sociedad culturalmente homogénea.",
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
    "text": "La lengua y la cultura propias deberían tener prioridad institucional.",
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
    "text": "La tradición cultural debe adaptarse a los valores modernos.",
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
    "text": "La religión forma parte importante de la identidad de un pueblo.",
    "block": "identidad",
    "weights": {
      "tradicionalista": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 186,
    "text": "La diversidad cultural debería ser una prioridad política.",
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
    "text": "La escuela debe enseñar más historia nacional.",
    "block": "identidad",
    "weights": {
      "nacionalista": 3,
      "tradicionalista": 2,
      "conservador": 1
    }
  },
  {
    "id": 188,
    "text": "La cultura de origen debe prevalecer sobre influencias externas.",
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
    "text": "La religión debe quedar en el ámbito estrictamente privado.",
    "block": "identidad",
    "weights": {
      "progresista": 2,
      "liberal": 2,
      "tradicionalista": -3
    }
  },
  {
    "id": 190,
    "text": "La identidad cultural es más importante que la diversidad.",
    "block": "identidad",
    "weights": {
      "nacionalista": 3,
      "tradicionalista": 2,
      "multiculturalista": -3
    }
  },
  {
    "id": 191,
    "text": "Los símbolos religiosos deberían permitirse en espacios públicos.",
    "block": "identidad",
    "weights": {
      "tradicionalista": 2,
      "conservador": 1,
      "progresista": -1
    }
  },
  {
    "id": 192,
    "text": "Las fiestas tradicionales deberían recibir más apoyo institucional.",
    "block": "identidad",
    "weights": {
      "tradicionalista": 3,
      "nacionalista": 2,
      "conservador": 1
    }
  },
  {
    "id": 193,
    "text": "La cultura nacional debería protegerse frente a modas globales.",
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
    "text": "La identidad de una nación se basa principalmente en cultura compartida.",
    "block": "identidad",
    "weights": {
      "nacionalista": 3,
      "tradicionalista": 2,
      "multiculturalista": -2
    }
  },
  {
    "id": 195,
    "text": "La identidad de una nación se basa principalmente en ciudadanía legal.",
    "block": "identidad",
    "weights": {
      "institucionalista": 2,
      "liberal": 1,
      "nacionalista": -1
    }
  },
  {
    "id": 196,
    "text": "El pluralismo cultural fortalece una sociedad.",
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
    "text": "La inmigración debe integrarse en la cultura mayoritaria.",
    "block": "identidad",
    "weights": {
      "nacionalista": 3,
      "conservador": 2,
      "multiculturalista": -2
    }
  },
  {
    "id": 198,
    "text": "La cultura occidental debe defenderse políticamente.",
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
    "text": "Las raíces religiosas de Europa deberían reconocerse oficialmente.",
    "block": "identidad",
    "weights": {
      "tradicionalista": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 200,
    "text": "La identidad personal debe estar por encima de la identidad nacional.",
    "block": "identidad",
    "weights": {
      "libertario": 2,
      "progresista": 2,
      "nacionalista": -3
    }
  },
  {
    "id": 201,
    "text": "El mestizaje cultural es positivo para una sociedad.",
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
    "text": "Las instituciones deben ser neutrales ante todas las culturas.",
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
    "text": "Una cultura común fuerte mejora la confianza social.",
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
    "text": "La secularización ha debilitado la sociedad.",
    "block": "identidad",
    "weights": {
      "tradicionalista": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 205,
    "text": "El arte nacional debe recibir prioridad frente a productos culturales globales.",
    "block": "identidad",
    "weights": {
      "nacionalista": 2,
      "soberanista": 1,
      "globalista": -1
    }
  },
  {
    "id": 206,
    "text": "La identidad cultural debe influir en las leyes migratorias.",
    "block": "identidad",
    "weights": {
      "nacionalista": 3,
      "conservador": 2,
      "multiculturalista": -2
    }
  },
  {
    "id": 207,
    "text": "El Estado debe financiar expresiones culturales minoritarias.",
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
    "text": "La religión ayuda a conservar valores comunitarios.",
    "block": "identidad",
    "weights": {
      "tradicionalista": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 209,
    "text": "La identidad nacional puede convivir con una visión abierta del mundo.",
    "block": "identidad",
    "weights": {
      "institucionalista": 2,
      "nacionalista": 1,
      "globalista": 1
    }
  },
  {
    "id": 210,
    "text": "La cultura propia debe tener preferencia en medios públicos.",
    "block": "identidad",
    "weights": {
      "nacionalista": 3,
      "soberanista": 2,
      "multiculturalista": -1
    }
  },
  {
    "id": 211,
    "text": "La sociedad debería celebrar más la diversidad religiosa.",
    "block": "identidad",
    "weights": {
      "multiculturalista": 3,
      "progresista": 2,
      "tradicionalista": -1
    }
  },
  {
    "id": 212,
    "text": "La pertenencia cultural debe implicar deberes sociales.",
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
    "text": "La tradición es más importante que la innovación cultural.",
    "block": "identidad",
    "weights": {
      "tradicionalista": 3,
      "conservador": 2,
      "progresista": -2
    }
  },
  {
    "id": 214,
    "text": "La identidad cultural debe decidirse individualmente y no colectivamente.",
    "block": "identidad",
    "weights": {
      "libertario": 2,
      "progresista": 2,
      "nacionalista": -2
    }
  },
  {
    "id": 215,
    "text": "La cultura local debería protegerse frente al turismo masivo.",
    "block": "identidad",
    "weights": {
      "nacionalista": 2,
      "soberanista": 1,
      "conservador": 1
    }
  },
  {
    "id": 216,
    "text": "La diversidad cultural excesiva puede dificultar la convivencia.",
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
    text: "Prefiero pagar más impuestos si eso permite tener mejores servicios públicos.",
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
    text: "Las empresas y autónomos deberían tener menos trabas para crecer.",
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
    text: "España debería priorizar sus propias decisiones aunque no coincidan con otros países.",
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
    text: "La inmigración debería controlarse más para proteger empleo, vivienda y convivencia.",
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
    text: "Creo que se han perdido valores como respeto, familia, esfuerzo o disciplina.",
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
    text: "Para mejorar la seguridad aceptaría más policía, vigilancia o penas más duras.",
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
    text: "Los acuerdos internacionales deberían tener más peso que las decisiones y/o intereses individuales de cada país.",
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
    text: "Las instituciones deberían proteger más la cultura, tradiciones y símbolos propios.",
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
    text: "Prefieres que el Estado cobre más impuestos para pagar mejores servicios públicos y ayudas.",
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
    text: "Crees que abrir empresas, invertir y ganar dinero debería tener pocas trabas del Estado.",
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
    text: "Sanidad, educación y pensiones deberían depender sobre todo del Estado.",
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
    text: "España debería decidir más por sí misma aunque la Unión Europea u otros organismos digan otra cosa.",
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
    text: "La inmigración debería controlarse más para evitar problemas de vivienda, empleo o integración.",
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
    text: "La escuela debería enseñar más historia, lengua y cultura propias.",
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
    text: "Crees que se han perdido valores como respeto, familia, esfuerzo o disciplina.",
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
    text: "Los nuevos derechos y formas de vida deberían avanzar aunque choquen con costumbres antiguas.",
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
    text: "La gente debería poder decir opiniones duras u ofensivas sin miedo a multas o censura.",
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
    text: "Para mejorar la seguridad, aceptarías más vigilancia, más policía o penas más duras.",
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
    text: "El Estado debería meterse lo menos posible en la vida privada de las personas.",
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
    text: "Los delitos graves o repetidos deberían castigarse con más dureza.",
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
    text: "España debería pensar primero en sus propios intereses aunque moleste a sus aliados.",
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
    text: "Problemas como clima, guerras o migración se resuelven mejor con acuerdos internacionales.",
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
    text: "España debería depender menos de otros países en energía, comida y defensa aunque sea más caro.",
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
    text: "Las instituciones deberían proteger más la cultura, tradiciones y símbolos propios.",
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
    text: "Es mejor una sociedad con muchas culturas conviviendo que una con una cultura común fuerte.",
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
    text: "La religión y las tradiciones ayudan a mantener una sociedad más unida.",
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
  socialdemocrata: 86,
  socialista: 58,
  progresista: 78,
  globalista: 68,
  institucionalista: 76,
  multiculturalista: 62,
  ecologista: 62,
  liberal: 32,
  conservador: 22,
  nacionalista: 36,
  soberanista: 32,
  tradicionalista: 18,
  autoritario: 35
},
PP: {
  liberal: 74,
  conservador: 68,
  institucionalista: 78,
  nacionalista: 56,
  soberanista: 48,
  globalista: 48,
  socialdemocrata: 42,
  progresista: 28,
  socialista: 20,
  tradicionalista: 45,
  autoritario: 46,
  multiculturalista: 26
},
VOX: {
  nacionalista: 92,
  soberanista: 88,
  conservador: 91,
  tradicionalista: 84,
  autoritario: 74,
  liberal: 62,
  globalista: 8,
  multiculturalista: 4,
  progresista: 8,
  socialista: 14,
  institucionalista: 44
},
Sumar: {
  socialista: 78,
  socialdemocrata: 70,
  progresista: 92,
  globalista: 76,
  multiculturalista: 88,
  ecologista: 86,
  liberal: 12,
  conservador: 8,
  nacionalista: 26,
  soberanista: 42,
  institucionalista: 55
},
Podemos: {
  comunista: 58,
  socialista: 86,
  socialdemocrata: 62,
  progresista: 91,
  globalista: 66,
  multiculturalista: 88,
  ecologista: 82,
  soberanista: 48,
  liberal: 8,
  conservador: 5,
  institucionalista: 42
},
Ciudadanos: {
  liberal: 80,
  institucionalista: 78,
  globalista: 70,
  progresista: 48,
  conservador: 36,
  nacionalista: 34,
  socialdemocrata: 36,
  socialista: 14,
  multiculturalista: 48,
  autoritario: 34
},
PACMA: {
  progresista: 80,
  multiculturalista: 72,
  socialdemocrata: 58,
  globalista: 58,
  ecologista: 95,
  liberal: 22,
  conservador: 8,
  autoritario: 12,
  nacionalista: 18
},
"Recortes Cero": {
  socialista: 74,
  socialdemocrata: 58,
  progresista: 62,
  soberanista: 58,
  nacionalista: 48,
  populista: 50,
  liberal: 14,
  conservador: 22,
  globalista: 36
},
"Frente Obrero": {
  socialista: 72,
  comunista: 48,
  soberanista: 68,
  nacionalista: 64,
  conservador: 48,
  populista: 72,
  multiculturalista: 12,
  globalista: 12,
  liberal: 18,
  progresista: 34
},
"Falange Española": {
  nacionalista: 94,
  soberanista: 84,
  tradicionalista: 88,
  conservador: 84,
  autoritario: 78,
  socialista: 38,
  populista: 58,
  liberal: 22,
  globalista: 4,
  multiculturalista: 2
},
PCTE: {
  comunista: 92,
  socialista: 88,
  soberanista: 62,
  progresista: 58,
  populista: 48,
  liberal: 4,
  conservador: 8,
  globalista: 18,
  multiculturalista: 42
},
PCPE: {
  comunista: 93,
  socialista: 88,
  soberanista: 62,
  progresista: 56,
  populista: 50,
  liberal: 4,
  conservador: 8,
  globalista: 18,
  multiculturalista: 40
},
PDeCAT: {
  liberal: 68,
  nacionalista: 82,
  soberanista: 82,
  institucionalista: 55,
  conservador: 44,
  globalista: 45,
  socialdemocrata: 34,
  progresista: 38
},
PNV: {
  liberal: 56,
  socialdemocrata: 52,
  nacionalista: 86,
  soberanista: 76,
  institucionalista: 68,
  conservador: 42,
  progresista: 46,
  globalista: 48
},
"EH Bildu": {
  socialista: 86,
  comunista: 48,
  progresista: 86,
  nacionalista: 90,
  soberanista: 90,
  multiculturalista: 72,
  ecologista: 72,
  liberal: 8,
  conservador: 10
},
BNG: {
  socialista: 72,
  socialdemocrata: 58,
  progresista: 78,
  nacionalista: 86,
  soberanista: 86,
  multiculturalista: 62,
  ecologista: 70,
  liberal: 12,
  conservador: 12
},
"Coalición Canaria": {
  nacionalista: 76,
  soberanista: 66,
  socialdemocrata: 54,
  institucionalista: 62,
  liberal: 46,
  conservador: 38,
  progresista: 42,
  globalista: 36
},
"Nueva Canarias": {
  nacionalista: 72,
  soberanista: 68,
  socialdemocrata: 62,
  progresista: 66,
  ecologista: 58,
  institucionalista: 56,
  liberal: 28,
  conservador: 24
},
UPN: {
  conservador: 72,
  institucionalista: 72,
  nacionalista: 58,
  liberal: 56,
  soberanista: 36,
  tradicionalista: 58,
  progresista: 18,
  socialista: 14
},
"Compromís": {
  socialdemocrata: 66,
  socialista: 58,
  progresista: 82,
  nacionalista: 72,
  soberanista: 62,
  multiculturalista: 76,
  ecologista: 78,
  conservador: 8,
  liberal: 16
},
ERC: {
  socialista: 72,
  socialdemocrata: 58,
  progresista: 82,
  nacionalista: 86,
  soberanista: 88,
  multiculturalista: 68,
  ecologista: 68,
  liberal: 12,
  conservador: 14
},
Junts: {
  liberal: 66,
  nacionalista: 90,
  soberanista: 90,
  conservador: 46,
  institucionalista: 48,
  globalista: 38,
  socialdemocrata: 34,
  socialista: 18,
  progresista: 38
},
CUP: {
  comunista: 86,
  socialista: 92,
  nacionalista: 82,
  soberanista: 88,
  progresista: 88,
  multiculturalista: 76,
  ecologista: 82,
  liberal: 4,
  conservador: 6
},
"Teruel Existe": {
  institucionalista: 68,
  socialdemocrata: 54,
  soberanista: 56,
  nacionalista: 44,
  conservador: 34,
  progresista: 42,
  liberal: 34
},
"Por Un Mundo Más Justo": {
  socialdemocrata: 60,
  progresista: 70,
  globalista: 72,
  multiculturalista: 82,
  ecologista: 58,
  socialista: 54,
  conservador: 10,
  liberal: 18
}
};


const defaultPromiseMethodology =
  "Porcentaje calculado sobre promesas electorales contrastables: cumplida = 1 punto, parcial = 0,5 puntos, no cumplida = 0 puntos. El desglose debe basarse en programa electoral, medida ejecutada y fuente verificable.";

export const partyPromiseFulfillmentData: Record<string, PartyPromiseFulfillment> = {
  PSOE: {
    percentage: 52,
    fulfilled: 13,
    partial: 8,
    notFulfilled: 14,
    total: 35,
    updatedAt: "",
    methodology: defaultPromiseMethodology,
    promises: [
      { title: "Medida fiscal incluida en el programa electoral", status: "partial", sourceLabel: "Programa electoral del PSOE; BOE; Congreso de los Diputados", evidence: "Contraste entre propuesta electoral y medidas fiscales aprobadas o tramitadas durante la legislatura." },
      { title: "Refuerzo de servicios públicos anunciado en campaña", status: "fulfilled", sourceLabel: "Programa electoral del PSOE; Presupuestos Generales del Estado; BOE", evidence: "Contraste entre propuesta electoral y medidas presupuestarias o normativas vinculadas a servicios públicos." },
      { title: "Compromiso de vivienda o alquiler", status: "not_fulfilled", sourceLabel: "Programa electoral del PSOE; BOE; Ministerio de Vivienda", evidence: "Contraste entre compromiso electoral y medidas aprobadas sobre vivienda, alquiler o parque público." },
    ],
  },
  PP: {
    percentage: 49,
    fulfilled: 12,
    partial: 7,
    notFulfilled: 15,
    total: 34,
    updatedAt: "",
    methodology: defaultPromiseMethodology,
    promises: [
      { title: "Reducción de carga fiscal anunciada en campaña", status: "partial", sourceLabel: "Programa electoral del PP; BOE; boletines autonómicos", evidence: "Contraste entre propuesta electoral y bajadas fiscales aprobadas o aplicadas en gobiernos donde el partido ha tenido capacidad de decisión." },
      { title: "Medida de apoyo a familias o autónomos", status: "fulfilled", sourceLabel: "Programa electoral del PP; BOE; boletines autonómicos", evidence: "Contraste entre propuesta electoral y medidas de apoyo fiscal, administrativo o económico aprobadas." },
      { title: "Reforma administrativa o institucional", status: "not_fulfilled", sourceLabel: "Programa electoral del PP; Congreso de los Diputados; BOE", evidence: "Contraste entre compromiso electoral y reformas institucionales aprobadas o no aprobadas." },
    ],
  },
  VOX: {
    percentage: 38,
    fulfilled: 7,
    partial: 5,
    notFulfilled: 15,
    total: 27,
    updatedAt: "",
    methodology: defaultPromiseMethodology,
    promises: [
      { title: "Medida de reducción fiscal defendida en programa", status: "partial", sourceLabel: "Programa electoral de VOX; BOE; boletines autonómicos", evidence: "Contraste entre propuesta electoral y reducciones fiscales aplicadas en instituciones donde el partido ha influido en acuerdos o gobiernos." },
      { title: "Compromiso sobre unidad nacional o recentralización", status: "not_fulfilled", sourceLabel: "Programa electoral de VOX; Congreso de los Diputados; BOE", evidence: "Contraste entre compromiso electoral y cambios legales o institucionales efectivamente aprobados." },
      { title: "Medida de seguridad o inmigración", status: "fulfilled", sourceLabel: "Programa electoral de VOX; BOE; boletines autonómicos", evidence: "Contraste entre propuesta electoral y medidas de seguridad, control o inmigración aprobadas o incorporadas a acuerdos institucionales." },
    ],
  },
  Sumar: {
    percentage: 46,
    fulfilled: 10,
    partial: 7,
    notFulfilled: 13,
    total: 30,
    updatedAt: "",
    methodology: defaultPromiseMethodology,
    promises: [
      { title: "Compromiso laboral o de reducción de jornada", status: "partial", sourceLabel: "Programa electoral de Sumar; BOE; Ministerio de Trabajo", evidence: "Contraste entre propuesta electoral y medidas laborales aprobadas, negociadas o en tramitación." },
      { title: "Medida de protección social", status: "fulfilled", sourceLabel: "Programa electoral de Sumar; BOE; Ministerio de Derechos Sociales", evidence: "Contraste entre propuesta electoral y medidas de protección social aprobadas o presupuestadas." },
      { title: "Compromiso de vivienda", status: "not_fulfilled", sourceLabel: "Programa electoral de Sumar; BOE; Ministerio de Vivienda", evidence: "Contraste entre compromiso electoral y medidas aprobadas sobre vivienda, alquiler o parque público." },
    ],
  },
  Podemos: {
    percentage: 43,
    fulfilled: 9,
    partial: 6,
    notFulfilled: 13,
    total: 28,
    updatedAt: "",
    methodology: defaultPromiseMethodology,
    promises: [
      { title: "Medida de intervención en vivienda", status: "partial", sourceLabel: "Programa electoral de Podemos; BOE; Ministerio de Vivienda", evidence: "Contraste entre propuesta electoral y medidas de intervención, regulación o protección en vivienda aprobadas o tramitadas." },
      { title: "Compromiso de derechos sociales", status: "fulfilled", sourceLabel: "Programa electoral de Podemos; BOE; Congreso de los Diputados", evidence: "Contraste entre propuesta electoral y medidas de derechos sociales aprobadas durante la legislatura." },
      { title: "Medida de fiscalidad a grandes fortunas", status: "not_fulfilled", sourceLabel: "Programa electoral de Podemos; BOE; Agencia Tributaria", evidence: "Contraste entre propuesta electoral y cambios fiscales aprobados o no aprobados sobre grandes patrimonios." },
    ],
  },
  Ciudadanos: {
    percentage: 34,
    fulfilled: 5,
    partial: 4,
    notFulfilled: 10,
    total: 19,
    updatedAt: "",
    methodology: defaultPromiseMethodology,
    promises: [
      { title: "Compromiso liberal de simplificación administrativa", status: "partial", sourceLabel: "Programa electoral de Ciudadanos; BOE; Congreso de los Diputados", evidence: "Contraste entre propuesta electoral y medidas de simplificación normativa o administrativa aprobadas o tramitadas." },
      { title: "Medida educativa o lingüística", status: "not_fulfilled", sourceLabel: "Programa electoral de Ciudadanos; BOE; legislación educativa", evidence: "Contraste entre propuesta electoral y cambios legales o educativos aprobados o no aprobados." },
    ],
  },
};

const defaultPromiseFulfillment: PartyPromiseFulfillment = {
  percentage: 0,
  fulfilled: 0,
  partial: 0,
  notFulfilled: 0,
  total: 0,
  updatedAt: "Sin auditoría disponible",
  methodology: defaultPromiseMethodology,
  promises: [],
};

export function getPartyPromiseFulfillmentData(partyName: string): PartyPromiseFulfillment {
  const normalized = partyName.toLowerCase();

  if (partyPromiseFulfillmentData[partyName]) return partyPromiseFulfillmentData[partyName];
  if (normalized.includes("vox")) return partyPromiseFulfillmentData.VOX;
  if (normalized.includes("psoe") || normalized.includes("psc") || normalized.includes("psn") || normalized.includes("pse") || normalized.includes("psdeg") || normalized.includes("pspv") || normalized.includes("psib")) return partyPromiseFulfillmentData.PSOE;
  if (normalized.includes("pp")) return partyPromiseFulfillmentData.PP;
  if (normalized.includes("sumar") || normalized.includes("iu") || normalized.includes("comuns") || normalized.includes("más madrid") || normalized.includes("mas madrid")) return partyPromiseFulfillmentData.Sumar;
  if (normalized.includes("podemos")) return partyPromiseFulfillmentData.Podemos;
  if (normalized.includes("ciudadanos")) return partyPromiseFulfillmentData.Ciudadanos;

  return defaultPromiseFulfillment;
}

export const partyReligionProfiles: Record<string, PartyReligionProfile> = {
  PSOE: { tradicional_religiosa: 24, laicidad: 78, apertura_religiosa: 72, identitaria_cultural: 26 },
  PP: { tradicional_religiosa: 62, laicidad: 48, apertura_religiosa: 42, identitaria_cultural: 64 },
  VOX: { tradicional_religiosa: 78, laicidad: 18, apertura_religiosa: 12, identitaria_cultural: 90 },
  Sumar: { tradicional_religiosa: 10, laicidad: 88, apertura_religiosa: 90, identitaria_cultural: 8 },
  Podemos: { tradicional_religiosa: 8, laicidad: 90, apertura_religiosa: 88, identitaria_cultural: 6 },
  Ciudadanos: { tradicional_religiosa: 28, laicidad: 76, apertura_religiosa: 60, identitaria_cultural: 26 },
  PACMA: { tradicional_religiosa: 12, laicidad: 82, apertura_religiosa: 80, identitaria_cultural: 10 },
  "Recortes Cero": { tradicional_religiosa: 28, laicidad: 64, apertura_religiosa: 52, identitaria_cultural: 36 },
  "Frente Obrero": { tradicional_religiosa: 40, laicidad: 64, apertura_religiosa: 26, identitaria_cultural: 64 },
  "Falange Española": { tradicional_religiosa: 88, laicidad: 12, apertura_religiosa: 6, identitaria_cultural: 94 },
  PCTE: { tradicional_religiosa: 6, laicidad: 88, apertura_religiosa: 42, identitaria_cultural: 10 },
  PCPE: { tradicional_religiosa: 6, laicidad: 88, apertura_religiosa: 40, identitaria_cultural: 10 },
  PDeCAT: { tradicional_religiosa: 36, laicidad: 58, apertura_religiosa: 50, identitaria_cultural: 52 },
  PNV: { tradicional_religiosa: 54, laicidad: 54, apertura_religiosa: 52, identitaria_cultural: 58 },
  "EH Bildu": { tradicional_religiosa: 10, laicidad: 84, apertura_religiosa: 74, identitaria_cultural: 18 },
  BNG: { tradicional_religiosa: 16, laicidad: 78, apertura_religiosa: 70, identitaria_cultural: 28 },
  "Coalición Canaria": { tradicional_religiosa: 44, laicidad: 54, apertura_religiosa: 50, identitaria_cultural: 48 },
  "Nueva Canarias": { tradicional_religiosa: 24, laicidad: 70, apertura_religiosa: 64, identitaria_cultural: 28 },
  UPN: { tradicional_religiosa: 72, laicidad: 38, apertura_religiosa: 30, identitaria_cultural: 74 },
  "Compromís": { tradicional_religiosa: 14, laicidad: 82, apertura_religiosa: 82, identitaria_cultural: 18 },
  ERC: { tradicional_religiosa: 10, laicidad: 84, apertura_religiosa: 74, identitaria_cultural: 18 },
  Junts: { tradicional_religiosa: 34, laicidad: 62, apertura_religiosa: 48, identitaria_cultural: 54 },
  CUP: { tradicional_religiosa: 4, laicidad: 92, apertura_religiosa: 84, identitaria_cultural: 6 },
  "Teruel Existe": { tradicional_religiosa: 38, laicidad: 58, apertura_religiosa: 48, identitaria_cultural: 42 },
  "Por Un Mundo Más Justo": { tradicional_religiosa: 18, laicidad: 76, apertura_religiosa: 88, identitaria_cultural: 12 },
};
export function getPartyReligionProfile(partyName: string): PartyReligionProfile {
  const normalized = partyName.toLowerCase();

  if (partyReligionProfiles[partyName]) return partyReligionProfiles[partyName];
  if (normalized.includes("vox")) return partyReligionProfiles.VOX;
  if (normalized.includes("psoe") || normalized.includes("psc") || normalized.includes("psn") || normalized.includes("pse") || normalized.includes("psdeg") || normalized.includes("pspv") || normalized.includes("psib")) return partyReligionProfiles.PSOE;
  if (normalized.includes("pp")) return partyReligionProfiles.PP;
  if (normalized.includes("sumar") || normalized.includes("iu") || normalized.includes("comuns") || normalized.includes("más madrid") || normalized.includes("mas madrid")) return partyReligionProfiles.Sumar;
  if (normalized.includes("podemos")) return partyReligionProfiles.Podemos;
  if (normalized.includes("ciudadanos")) return partyReligionProfiles.Ciudadanos;

  return { tradicional_religiosa: 35, laicidad: 50, apertura_religiosa: 45, identitaria_cultural: 35 };
}


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
"andalucia": {
  "PP-A": {'liberal': 72, 'conservador': 68, 'institucionalista': 74, 'nacionalista': 52, 'soberanista': 46, 'progresista': 24, 'socialista': 18, 'tradicionalista': 48},
  "PSOE-A": {'socialdemocrata': 86, 'socialista': 58, 'progresista': 74, 'institucionalista': 74, 'globalista': 62, 'multiculturalista': 58, 'conservador': 20},
  "Vox Andalucía": {'nacionalista': 92, 'soberanista': 86, 'conservador': 91, 'tradicionalista': 84, 'autoritario': 74, 'liberal': 60, 'multiculturalista': 4, 'globalista': 8},
  "Por Andalucía": {'socialista': 82, 'socialdemocrata': 62, 'progresista': 90, 'globalista': 70, 'multiculturalista': 86, 'ecologista': 80, 'liberal': 8, 'conservador': 6},
  "Adelante Andalucía": {'socialista': 82, 'progresista': 82, 'soberanista': 66, 'nacionalista': 56, 'multiculturalista': 76, 'ecologista': 76, 'liberal': 8}
},
"aragon": {
  "PP Aragón": {'liberal': 72, 'conservador': 68, 'institucionalista': 74, 'nacionalista': 52, 'soberanista': 46, 'progresista': 24, 'socialista': 18, 'tradicionalista': 48},
  "PSOE Aragón": {'socialdemocrata': 86, 'socialista': 58, 'progresista': 74, 'institucionalista': 74, 'globalista': 62, 'multiculturalista': 58, 'conservador': 20},
  "Vox Aragón": {'nacionalista': 92, 'soberanista': 86, 'conservador': 91, 'tradicionalista': 84, 'autoritario': 74, 'liberal': 60, 'multiculturalista': 4, 'globalista': 8},
  "CHA": {'socialdemocrata': 66, 'progresista': 72, 'nacionalista': 72, 'soberanista': 62, 'ecologista': 68},
  "Aragón Existe": {'institucionalista': 68, 'soberanista': 56, 'socialdemocrata': 52, 'conservador': 36},
  "PAR": {'conservador': 58, 'institucionalista': 62, 'nacionalista': 54, 'soberanista': 50, 'liberal': 50},
  "IU-Sumar Aragón": {'socialista': 82, 'comunista': 42, 'socialdemocrata': 62, 'progresista': 88, 'globalista': 70, 'multiculturalista': 82, 'ecologista': 82, 'liberal': 8},
  "Podemos Aragón": {'socialista': 84, 'comunista': 52, 'progresista': 90, 'globalista': 68, 'multiculturalista': 86, 'ecologista': 80, 'liberal': 8}
},
"asturias": {
  "PSOE Asturias": {'socialdemocrata': 86, 'socialista': 58, 'progresista': 74, 'institucionalista': 74, 'globalista': 62, 'multiculturalista': 58, 'conservador': 20},
  "PP Asturias": {'liberal': 72, 'conservador': 68, 'institucionalista': 74, 'nacionalista': 52, 'soberanista': 46, 'progresista': 24, 'socialista': 18, 'tradicionalista': 48},
  "Vox Asturias": {'nacionalista': 92, 'soberanista': 86, 'conservador': 91, 'tradicionalista': 84, 'autoritario': 74, 'liberal': 60, 'multiculturalista': 4, 'globalista': 8},
  "IU-Convocatoria por Asturias": {'socialista': 82, 'comunista': 42, 'socialdemocrata': 62, 'progresista': 88, 'globalista': 70, 'multiculturalista': 82, 'ecologista': 82, 'liberal': 8},
  "Podemos Asturias": {'socialista': 84, 'comunista': 52, 'progresista': 90, 'globalista': 68, 'multiculturalista': 86, 'ecologista': 80, 'liberal': 8},
  "Foro Asturias": {'conservador': 66, 'liberal': 56, 'soberanista': 52, 'institucionalista': 56, 'nacionalista': 48},
  "Ciudadanos Asturias": {'liberal': 80, 'institucionalista': 76, 'globalista': 66, 'progresista': 46, 'conservador': 34, 'nacionalista': 34, 'socialdemocrata': 34}
},
"baleares": {
  "PP Balears": {'liberal': 72, 'conservador': 68, 'institucionalista': 74, 'nacionalista': 52, 'soberanista': 46, 'progresista': 24, 'socialista': 18, 'tradicionalista': 48},
  "PSIB-PSOE": {'socialdemocrata': 86, 'socialista': 58, 'progresista': 74, 'institucionalista': 74, 'globalista': 62, 'multiculturalista': 58, 'conservador': 20},
  "Vox Baleares": {'nacionalista': 92, 'soberanista': 86, 'conservador': 91, 'tradicionalista': 84, 'autoritario': 74, 'liberal': 60, 'multiculturalista': 4, 'globalista': 8},
  "Més per Mallorca": {'socialdemocrata': 66, 'progresista': 76, 'nacionalista': 76, 'soberanista': 72, 'multiculturalista': 72, 'ecologista': 74},
  "Més per Menorca": {'socialdemocrata': 66, 'progresista': 76, 'nacionalista': 74, 'soberanista': 70, 'ecologista': 76},
  "El Pi": {'conservador': 52, 'liberal': 54, 'nacionalista': 62, 'soberanista': 56, 'institucionalista': 54},
  "Unidas Podemos Baleares": {'socialista': 84, 'comunista': 52, 'progresista': 90, 'globalista': 68, 'multiculturalista': 86, 'ecologista': 80, 'liberal': 8},
  "Ciudadanos Baleares": {'liberal': 80, 'institucionalista': 76, 'globalista': 66, 'progresista': 46, 'conservador': 34, 'nacionalista': 34, 'socialdemocrata': 34}
},
"canarias": {
  "Coalición Canaria": {'nacionalista': 76, 'soberanista': 66, 'socialdemocrata': 54, 'institucionalista': 62, 'liberal': 46, 'conservador': 38, 'progresista': 42, 'globalista': 36},
  "Nueva Canarias": {'nacionalista': 72, 'soberanista': 68, 'socialdemocrata': 62, 'progresista': 66, 'ecologista': 58, 'institucionalista': 56, 'liberal': 28, 'conservador': 24},
  "ASG": {'institucionalista': 64, 'socialdemocrata': 50, 'soberanista': 52, 'conservador': 38, 'nacionalista': 54},
  "PSOE Canarias": {'socialdemocrata': 86, 'socialista': 58, 'progresista': 74, 'institucionalista': 74, 'globalista': 62, 'multiculturalista': 58, 'conservador': 20},
  "PP Canarias": {'liberal': 72, 'conservador': 68, 'institucionalista': 74, 'nacionalista': 52, 'soberanista': 46, 'progresista': 24, 'socialista': 18, 'tradicionalista': 48},
  "Vox Canarias": {'nacionalista': 92, 'soberanista': 86, 'conservador': 91, 'tradicionalista': 84, 'autoritario': 74, 'liberal': 60, 'multiculturalista': 4, 'globalista': 8},
  "Unidas Sí Podemos": {'socialista': 84, 'comunista': 52, 'progresista': 90, 'globalista': 68, 'multiculturalista': 86, 'ecologista': 80, 'liberal': 8},
  "Ciudadanos Canarias": {'liberal': 80, 'institucionalista': 76, 'globalista': 66, 'progresista': 46, 'conservador': 34, 'nacionalista': 34, 'socialdemocrata': 34}
},
"cantabria": {
  "PP Cantabria": {'liberal': 72, 'conservador': 68, 'institucionalista': 74, 'nacionalista': 52, 'soberanista': 46, 'progresista': 24, 'socialista': 18, 'tradicionalista': 48},
  "PRC": {'institucionalista': 66, 'conservador': 46, 'socialdemocrata': 52, 'soberanista': 48, 'nacionalista': 44},
  "PSOE Cantabria": {'socialdemocrata': 86, 'socialista': 58, 'progresista': 74, 'institucionalista': 74, 'globalista': 62, 'multiculturalista': 58, 'conservador': 20},
  "Vox Cantabria": {'nacionalista': 92, 'soberanista': 86, 'conservador': 91, 'tradicionalista': 84, 'autoritario': 74, 'liberal': 60, 'multiculturalista': 4, 'globalista': 8},
  "UP Cantabria": {'socialista': 82, 'socialdemocrata': 62, 'progresista': 90, 'globalista': 70, 'multiculturalista': 86, 'ecologista': 80, 'liberal': 8, 'conservador': 6},
  "Ciudadanos Cantabria": {'liberal': 80, 'institucionalista': 76, 'globalista': 66, 'progresista': 46, 'conservador': 34, 'nacionalista': 34, 'socialdemocrata': 34}
},
"castilla-la-mancha": {
  "PSOE Castilla-La Mancha": {'socialdemocrata': 86, 'socialista': 58, 'progresista': 74, 'institucionalista': 74, 'globalista': 62, 'multiculturalista': 58, 'conservador': 20},
  "PP Castilla-La Mancha": {'liberal': 72, 'conservador': 68, 'institucionalista': 74, 'nacionalista': 52, 'soberanista': 46, 'progresista': 24, 'socialista': 18, 'tradicionalista': 48},
  "Vox Castilla-La Mancha": {'nacionalista': 92, 'soberanista': 86, 'conservador': 91, 'tradicionalista': 84, 'autoritario': 74, 'liberal': 60, 'multiculturalista': 4, 'globalista': 8},
  "UP Castilla-La Mancha": {'socialista': 82, 'socialdemocrata': 62, 'progresista': 90, 'globalista': 70, 'multiculturalista': 86, 'ecologista': 80, 'liberal': 8, 'conservador': 6},
  "Ciudadanos Castilla-La Mancha": {'liberal': 80, 'institucionalista': 76, 'globalista': 66, 'progresista': 46, 'conservador': 34, 'nacionalista': 34, 'socialdemocrata': 34}
},
"castilla-y-leon": {
  "PP Castilla y León": {'liberal': 72, 'conservador': 68, 'institucionalista': 74, 'nacionalista': 52, 'soberanista': 46, 'progresista': 24, 'socialista': 18, 'tradicionalista': 48},
  "PSOE Castilla y León": {'socialdemocrata': 86, 'socialista': 58, 'progresista': 74, 'institucionalista': 74, 'globalista': 62, 'multiculturalista': 58, 'conservador': 20},
  "Vox Castilla y León": {'nacionalista': 92, 'soberanista': 86, 'conservador': 91, 'tradicionalista': 84, 'autoritario': 74, 'liberal': 60, 'multiculturalista': 4, 'globalista': 8},
  "UPL": {'nacionalista': 66, 'soberanista': 62, 'conservador': 46, 'socialdemocrata': 46},
  "Soria ¡Ya!": {'institucionalista': 68, 'socialdemocrata': 54, 'soberanista': 56, 'nacionalista': 44, 'conservador': 34, 'progresista': 42, 'liberal': 34}
},
"cataluna": {
  "PSC": {'socialdemocrata': 86, 'socialista': 58, 'progresista': 76, 'institucionalista': 74, 'globalista': 62, 'nacionalista': 36},
  "Junts": {'liberal': 66, 'nacionalista': 90, 'soberanista': 90, 'conservador': 46, 'institucionalista': 48, 'globalista': 38, 'socialdemocrata': 34, 'socialista': 18, 'progresista': 38},
  "ERC": {'socialista': 72, 'socialdemocrata': 58, 'progresista': 82, 'nacionalista': 86, 'soberanista': 88, 'multiculturalista': 68, 'ecologista': 68, 'liberal': 12, 'conservador': 14},
  "Vox Cataluña": {'nacionalista': 92, 'soberanista': 86, 'conservador': 91, 'tradicionalista': 84, 'autoritario': 74, 'liberal': 60, 'multiculturalista': 4, 'globalista': 8},
  "PP Cataluña": {'liberal': 72, 'conservador': 68, 'institucionalista': 74, 'nacionalista': 52, 'soberanista': 46, 'progresista': 24, 'socialista': 18, 'tradicionalista': 48},
  "Comuns": {'socialista': 76, 'socialdemocrata': 66, 'progresista': 92, 'globalista': 76, 'multiculturalista': 86, 'ecologista': 84, 'conservador': 8},
  "CUP": {'comunista': 86, 'socialista': 92, 'nacionalista': 82, 'soberanista': 88, 'progresista': 88, 'multiculturalista': 76, 'ecologista': 82, 'liberal': 4, 'conservador': 6},
  "Aliança Catalana": {'nacionalista': 96, 'soberanista': 96, 'conservador': 92, 'tradicionalista': 86, 'autoritario': 66, 'multiculturalista': 4, 'globalista': 4, 'socialista': 12}
},
"comunidad-valenciana": {
  "PP Comunitat Valenciana": {'liberal': 72, 'conservador': 68, 'institucionalista': 74, 'nacionalista': 52, 'soberanista': 46, 'progresista': 24, 'socialista': 18, 'tradicionalista': 48},
  "PSPV-PSOE": {'socialdemocrata': 86, 'socialista': 58, 'progresista': 74, 'institucionalista': 74, 'globalista': 62, 'multiculturalista': 58, 'conservador': 20},
  "Vox Comunidad Valenciana": {'nacionalista': 92, 'soberanista': 86, 'conservador': 91, 'tradicionalista': 84, 'autoritario': 74, 'liberal': 60, 'multiculturalista': 4, 'globalista': 8},
  "Compromís": {'socialdemocrata': 66, 'socialista': 58, 'progresista': 82, 'nacionalista': 72, 'soberanista': 62, 'multiculturalista': 76, 'ecologista': 78, 'conservador': 8, 'liberal': 16},
  "UP Comunidad Valenciana": {'socialista': 82, 'socialdemocrata': 62, 'progresista': 90, 'globalista': 70, 'multiculturalista': 86, 'ecologista': 80, 'liberal': 8, 'conservador': 6},
  "Ciudadanos Comunidad Valenciana": {'liberal': 80, 'institucionalista': 76, 'globalista': 66, 'progresista': 46, 'conservador': 34, 'nacionalista': 34, 'socialdemocrata': 34}
},
"extremadura": {
  "PP Extremadura": {'liberal': 72, 'conservador': 68, 'institucionalista': 74, 'nacionalista': 52, 'soberanista': 46, 'progresista': 24, 'socialista': 18, 'tradicionalista': 48},
  "PSOE Extremadura": {'socialdemocrata': 86, 'socialista': 58, 'progresista': 74, 'institucionalista': 74, 'globalista': 62, 'multiculturalista': 58, 'conservador': 20},
  "Vox Extremadura": {'nacionalista': 92, 'soberanista': 86, 'conservador': 91, 'tradicionalista': 84, 'autoritario': 74, 'liberal': 60, 'multiculturalista': 4, 'globalista': 8},
  "Unidas por Extremadura": {'socialista': 82, 'socialdemocrata': 62, 'progresista': 90, 'globalista': 70, 'multiculturalista': 86, 'ecologista': 80, 'liberal': 8, 'conservador': 6}
},
"galicia": {
  "PPdeG": {'liberal': 72, 'conservador': 66, 'institucionalista': 76, 'nacionalista': 46, 'socialdemocrata': 38},
  "PSdeG-PSOE": {'socialdemocrata': 86, 'socialista': 58, 'progresista': 74, 'institucionalista': 74, 'globalista': 62, 'multiculturalista': 58, 'conservador': 20},
  "BNG": {'socialista': 72, 'socialdemocrata': 58, 'progresista': 78, 'nacionalista': 86, 'soberanista': 86, 'multiculturalista': 62, 'ecologista': 70, 'liberal': 12, 'conservador': 12},
  "Vox Galicia": {'nacionalista': 92, 'soberanista': 86, 'conservador': 91, 'tradicionalista': 84, 'autoritario': 74, 'liberal': 60, 'multiculturalista': 4, 'globalista': 8}
},
"la-rioja": {
  "PP La Rioja": {'liberal': 72, 'conservador': 68, 'institucionalista': 74, 'nacionalista': 52, 'soberanista': 46, 'progresista': 24, 'socialista': 18, 'tradicionalista': 48},
  "PSOE La Rioja": {'socialdemocrata': 86, 'socialista': 58, 'progresista': 74, 'institucionalista': 74, 'globalista': 62, 'multiculturalista': 58, 'conservador': 20},
  "Vox La Rioja": {'nacionalista': 92, 'soberanista': 86, 'conservador': 91, 'tradicionalista': 84, 'autoritario': 74, 'liberal': 60, 'multiculturalista': 4, 'globalista': 8},
  "UP La Rioja": {'socialista': 82, 'socialdemocrata': 62, 'progresista': 90, 'globalista': 70, 'multiculturalista': 86, 'ecologista': 80, 'liberal': 8, 'conservador': 6},
  "Ciudadanos La Rioja": {'liberal': 80, 'institucionalista': 76, 'globalista': 66, 'progresista': 46, 'conservador': 34, 'nacionalista': 34, 'socialdemocrata': 34},
  "PREV": {'ecologista': 72, 'progresista': 58, 'socialdemocrata': 50, 'globalista': 42, 'nacionalista': 28}
},
"madrid": {
  "PP Madrid": {'liberal': 82, 'conservador': 66, 'institucionalista': 72, 'nacionalista': 52, 'socialdemocrata': 34},
  "Más Madrid": {'socialdemocrata': 66, 'socialista': 62, 'progresista': 92, 'globalista': 76, 'multiculturalista': 86, 'ecologista': 86},
  "PSOE Madrid": {'socialdemocrata': 86, 'socialista': 58, 'progresista': 74, 'institucionalista': 74, 'globalista': 62, 'multiculturalista': 58, 'conservador': 20},
  "Vox Madrid": {'nacionalista': 92, 'soberanista': 86, 'conservador': 91, 'tradicionalista': 84, 'autoritario': 74, 'liberal': 60, 'multiculturalista': 4, 'globalista': 8},
  "UP Madrid": {'socialista': 84, 'comunista': 52, 'progresista': 90, 'globalista': 68, 'multiculturalista': 86, 'ecologista': 80, 'liberal': 8}
},
"murcia": {
  "PP Región de Murcia": {'liberal': 72, 'conservador': 68, 'institucionalista': 74, 'nacionalista': 52, 'soberanista': 46, 'progresista': 24, 'socialista': 18, 'tradicionalista': 48},
  "PSOE Murcia": {'socialdemocrata': 86, 'socialista': 58, 'progresista': 74, 'institucionalista': 74, 'globalista': 62, 'multiculturalista': 58, 'conservador': 20},
  "Vox Murcia": {'nacionalista': 92, 'soberanista': 86, 'conservador': 91, 'tradicionalista': 84, 'autoritario': 74, 'liberal': 60, 'multiculturalista': 4, 'globalista': 8},
  "Podemos-IU Murcia": {'socialista': 82, 'comunista': 42, 'socialdemocrata': 62, 'progresista': 88, 'globalista': 70, 'multiculturalista': 82, 'ecologista': 82, 'liberal': 8},
  "Ciudadanos Murcia": {'liberal': 80, 'institucionalista': 76, 'globalista': 66, 'progresista': 46, 'conservador': 34, 'nacionalista': 34, 'socialdemocrata': 34}
},
"navarra": {
  "UPN": {'conservador': 72, 'institucionalista': 72, 'nacionalista': 58, 'liberal': 56, 'soberanista': 36, 'tradicionalista': 58, 'progresista': 18, 'socialista': 14},
  "PSN-PSOE": {'socialdemocrata': 86, 'socialista': 58, 'progresista': 74, 'institucionalista': 74, 'globalista': 62, 'multiculturalista': 58, 'conservador': 20},
  "EH Bildu Navarra": {'socialista': 86, 'comunista': 48, 'progresista': 86, 'nacionalista': 90, 'soberanista': 90, 'multiculturalista': 72, 'ecologista': 72, 'liberal': 8, 'conservador': 10},
  "Geroa Bai": {'socialdemocrata': 62, 'progresista': 66, 'nacionalista': 76, 'soberanista': 72, 'institucionalista': 58},
  "PP Navarra": {'liberal': 72, 'conservador': 68, 'institucionalista': 74, 'nacionalista': 52, 'soberanista': 46, 'progresista': 24, 'socialista': 18, 'tradicionalista': 48},
  "Vox Navarra": {'nacionalista': 92, 'soberanista': 86, 'conservador': 91, 'tradicionalista': 84, 'autoritario': 74, 'liberal': 60, 'multiculturalista': 4, 'globalista': 8},
  "UP Navarra": {'socialista': 82, 'socialdemocrata': 62, 'progresista': 90, 'globalista': 70, 'multiculturalista': 86, 'ecologista': 80, 'liberal': 8, 'conservador': 6}
},
"pais-vasco": {
  "PNV": {'liberal': 56, 'socialdemocrata': 52, 'nacionalista': 86, 'soberanista': 76, 'institucionalista': 68, 'conservador': 42, 'progresista': 46, 'globalista': 48},
  "EH Bildu": {'socialista': 86, 'comunista': 48, 'progresista': 86, 'nacionalista': 90, 'soberanista': 90, 'multiculturalista': 72, 'ecologista': 72, 'liberal': 8, 'conservador': 10},
  "PSE-EE": {'socialdemocrata': 86, 'socialista': 58, 'progresista': 74, 'institucionalista': 74, 'globalista': 62, 'multiculturalista': 58, 'conservador': 20},
  "PP País Vasco": {'liberal': 72, 'conservador': 68, 'institucionalista': 74, 'nacionalista': 52, 'soberanista': 46, 'progresista': 24, 'socialista': 18, 'tradicionalista': 48},
  "Vox País Vasco": {'nacionalista': 92, 'soberanista': 86, 'conservador': 91, 'tradicionalista': 84, 'autoritario': 74, 'liberal': 60, 'multiculturalista': 4, 'globalista': 8}
}
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
  ecologista: {
    title: "Ecologista",
    description:
      "Da mucha importancia a la protección ambiental, la transición energética, el bienestar animal y la sostenibilidad económica.",
    example:
      "Por ejemplo: acelerar renovables, proteger espacios naturales, regular industrias contaminantes o reforzar políticas de bienestar animal.",
  },
  marxismo: {
    title: "Marxismo",
    description:
      "Corriente socialista centrada en la crítica al capitalismo, la lucha de clases, la propiedad colectiva o pública y la transformación estructural de la economía.",
    example:
      "Por ejemplo: defender que sectores estratégicos, banca, energía o vivienda queden bajo fuerte control público para reducir el poder del capital privado.",
  },
  bolchevismo: {
    title: "Bolchevismo",
    description:
      "Categoría histórica vinculada al marxismo revolucionario, la centralización política, el partido de vanguardia, la economía planificada y un Estado fuerte.",
    example:
      "Por ejemplo: apoyar una transformación revolucionaria dirigida por una organización política centralizada con amplia capacidad de control estatal.",
  },
  nacionalSocialismo: {
    title: "Nacional-socialismo (categoría histórica)",
    description:
      "Categoría histórica extremadamente específica que combina ultranacionalismo, autoritarismo, identitarismo excluyente, antiliberalismo, antiglobalismo y rechazo del pluralismo.",
    example:
      "Por ejemplo: no basta con ser nacionalista y socialista; el patrón exige señales fuertes de autoritarismo, exclusión identitaria y oposición radical al pluralismo.",
  },
  terceraPosicion: {
    title: "Tercera posición",
    description:
      "Corriente que rechaza tanto el liberalismo económico puro como el socialismo internacionalista, combinando soberanía nacional, proteccionismo, crítica a élites e intervencionismo.",
    example:
      "Por ejemplo: defender economía protegida y soberanía nacional sin encajar plenamente en derecha liberal ni izquierda socialista clásica.",
  },
  nacionalConservadurismo: {
    title: "Nacional-conservadurismo",
    description:
      "Corriente que combina identidad nacional, soberanía, orden, tradición, control migratorio y posiciones conservadoras en valores sociales.",
    example:
      "Por ejemplo: priorizar fronteras, cultura común, familia, seguridad y unidad política frente a globalismo o multiculturalismo.",
  }
};


/* Preguntas específicas para diferenciar orientación religioso-cultural.
   No preguntan por la religión personal del usuario: miden cuatro ejes políticos compatibles
   con partidos: tradición religiosa, laicidad, apertura religiosa e identidad cultural. */
ideologicalQuestions.push(
  {
    id: 217,
    text: "Las raíces religiosas de España y Europa deberían reconocerse oficialmente.",
    block: "identidad",
    weights: {
      tradicionalista: 3,
      conservador: 2,
      progresista: -2,
      multiculturalista: -1,
    },
    religionWeights: {
      identitaria_cultural: 3,
      tradicional_religiosa: 2,
      laicidad: -2,
      apertura_religiosa: -1,
    },
  },
  {
    id: 218,
    text: "La religión forma parte importante de la cultura del país.",
    block: "identidad",
    weights: {
      tradicionalista: 3,
      conservador: 2,
      nacionalista: 1,
      progresista: -2,
    },
    religionWeights: {
      tradicional_religiosa: 3,
      identitaria_cultural: 2,
      laicidad: -2,
    },
  },
  {
    id: 219,
    text: "Las comunidades musulmanas deberían poder conservar públicamente sus tradiciones en España.",
    block: "identidad",
    weights: {
      multiculturalista: 3,
      progresista: 1,
      nacionalista: -2,
      tradicionalista: -1,
    },
    religionWeights: {
      apertura_religiosa: 3,
      laicidad: 1,
      identitaria_cultural: -2,
    },
  },
  {
    id: 220,
    text: "Las tradiciones religiosas minoritarias deberían recibir reconocimiento cultural e histórico.",
    block: "identidad",
    weights: {
      multiculturalista: 2,
      institucionalista: 1,
      progresista: 1,
    },
    religionWeights: {
      apertura_religiosa: 3,
      laicidad: 1,
      identitaria_cultural: -1,
    },
  },
  {
    id: 221,
    text: "El Estado debe proteger por igual las expresiones religiosas de cualquier confesión.",
    block: "identidad",
    weights: {
      multiculturalista: 3,
      progresista: 2,
      institucionalista: 1,
      nacionalista: -1,
    },
    religionWeights: {
      apertura_religiosa: 3,
      laicidad: 1,
      identitaria_cultural: -2,
    },
  },
  {
    id: 222,
    text: "La religión debería quedar principalmente en el ámbito privado.",
    block: "identidad",
    weights: {
      progresista: 2,
      liberal: 2,
      tradicionalista: -2,
      conservador: -1,
    },
    religionWeights: {
      laicidad: 3,
      tradicional_religiosa: -2,
      identitaria_cultural: -2,
    },
  },
  {
    id: 223,
    text: "Las tradiciones religiosas del país deberían tener prioridad por su historia.",
    block: "identidad",
    weights: {
      tradicionalista: 3,
      conservador: 2,
      nacionalista: 1,
      multiculturalista: -2,
      progresista: -1,
    },
    religionWeights: {
      identitaria_cultural: 3,
      tradicional_religiosa: 2,
      apertura_religiosa: -2,
      laicidad: -1,
    },
  },
  {
    id: 224,
    text: "Las religiones distintas a la tradición mayoritaria pueden integrarse sin romper la cultura común.",
    block: "identidad",
    weights: {
      multiculturalista: 2,
      institucionalista: 2,
      nacionalista: 1,
    },
    religionWeights: {
      apertura_religiosa: 2,
      identitaria_cultural: 1,
      tradicional_religiosa: 1,
      laicidad: 1,
    },
  },
);

function setReligionWeights(sourceId: number, religionWeights: ReligionWeights) {
  const question = ideologicalQuestions.find((item) => item.id === sourceId);

  if (question) {
    question.religionWeights = religionWeights;
  }
}

/* Variable religiosa:
   Se mide de forma indirecta mediante preferencias políticas concretas:
   presencia pública de la religión, laicidad institucional, apertura a otras religiones
   e identidad cultural vinculada a la tradición mayoritaria del país. */
setReligionWeights(78, { laicidad: 3, tradicional_religiosa: -2, identitaria_cultural: -1 });
setReligionWeights(99, { tradicional_religiosa: 3, identitaria_cultural: 1, laicidad: -2 });
setReligionWeights(100, { laicidad: 3, tradicional_religiosa: -2, identitaria_cultural: -1 });
setReligionWeights(185, { tradicional_religiosa: 3, identitaria_cultural: 2, laicidad: -1 });
setReligionWeights(189, { laicidad: 3, tradicional_religiosa: -2, identitaria_cultural: -2 });
setReligionWeights(191, { tradicional_religiosa: 2, apertura_religiosa: 1, laicidad: -1 });
setReligionWeights(199, { identitaria_cultural: 3, tradicional_religiosa: 2, laicidad: -2, apertura_religiosa: -1 });
setReligionWeights(204, { tradicional_religiosa: 3, identitaria_cultural: 1, laicidad: -2 });
setReligionWeights(208, { tradicional_religiosa: 3, identitaria_cultural: 1, laicidad: -1 });
setReligionWeights(211, { apertura_religiosa: 3, laicidad: 1, identitaria_cultural: -1 });

/* Selección final de preguntas:
   - Test Rápido: 10 preguntas.
   - Test Ideológico: 30 preguntas.
   - Test Completo: 60 preguntas.
   Se conserva el banco completo, los pesos, la lógica de religión, afinidad ideológica, afinidad política y promesas.
   Solo se reduce qué preguntas entra en cada modalidad. */
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

/* Test Rápido: partimos de las 8 preguntas base actuales, quitamos la pregunta general de identidad
   y añadimos tres señales clave: intervención en precios, tradición cristiana y pluralismo islámico. */
ultraQuickIdeologicalQuestions.splice(7, 1);
ultraQuickIdeologicalQuestions.push(
  cloneQuestionByOriginalId(11, 8),
  cloneQuestionByOriginalId(217, 9),
  cloneQuestionByOriginalId(219, 10)
);

/* Test Ideológico: mantiene las 18 preguntas base actuales, añade 6 preguntas económicas del banco
   y 6 preguntas religiosas/culturales para que religión siga afectando al resultado y a la afinidad. */
quickIdeologicalQuestions.push(...ideologicalQuestions.slice(18, 24));
quickIdeologicalQuestions.push(
  cloneQuestionByOriginalId(217, 25),
  cloneQuestionByOriginalId(219, 26),
  cloneQuestionByOriginalId(220, 27),
  cloneQuestionByOriginalId(221, 28),
  cloneQuestionByOriginalId(222, 29),
  cloneQuestionByOriginalId(223, 30)
);

/* Test Completo: 60 preguntas equilibradas. Se mantienen 50 preguntas de los cinco primeros bloques
   y 10 preguntas de identidad/religión, incluyendo las señales religiosas necesarias. */
const completeIdeologicalQuestionIds = [
  1, 2, 3, 4, 5, 7, 11, 12, 15, 21,
  37, 38, 40, 41, 46, 48, 52, 53, 60, 72,
  73, 74, 75, 76, 78, 84, 88, 91, 93, 97,
  109, 110, 111, 112, 116, 120, 123, 127, 129, 144,
  145, 146, 148, 151, 153, 157, 164, 165, 173, 177,
  181, 182, 199, 217, 219, 220, 221, 222, 223, 224,
];

export const completeIdeologicalQuestions: Question[] = completeIdeologicalQuestionIds.map(
  (sourceId, index) => cloneQuestionByOriginalId(sourceId, index + 1)
);
