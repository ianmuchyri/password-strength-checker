import escapeStringRegexp from "escape-string-regexp";

export interface Option<V> {
  id: number;
  value: V;
  minDiversity: number;
  minLength: number;
}

export interface FirstOption<V> extends Option<V> {
  minDiversity: 0;
  minLength: 0;
}

export type Options<V> = [FirstOption<V>, ...Option<V>[]];

export type DiversityType = "lowercase" | "uppercase" | "symbol" | "number";

export interface Result<V> {
  id: number;
  value: V;
  contains: DiversityType[];
  length: number;
}

export const defaultOptions: Options<string> = [
  {
    id: 0,
    value: "Too weak",
    minDiversity: 0,
    minLength: 0,
  },
  {
    id: 1,
    value: "Weak",
    minDiversity: 2,
    minLength: 8,
  },
  {
    id: 2,
    value: "Medium",
    minDiversity: 4,
    minLength: 10,
  },
  {
    id: 3,
    value: "Strong",
    minDiversity: 4,
    minLength: 12,
  },
];

export const owaspSymbols = "!\"#$%&'()*+,-./\\:;<=>?@[]^_`{|}~";

export const passwordStrength = (
  password: string,
  options: Options<string> = defaultOptions,
  restrictSymbolsTo?: string | undefined,
): Result<string> => {
  options[0].minDiversity = 0;
  options[0].minLength = 0;

  // prevent [a-z] to match null and compute length
  const _password = password ?? "";

  if (_password.length === 0) {
    return {
      ...options[0],
      id: -1,
      contains: [],
      length: _password.length,
    };
  }

  const rules = [
    {
      key: "lowercase",
      regex: "[a-z]",
    },
    {
      key: "uppercase",
      regex: "[A-Z]",
    },
    {
      key: "number",
      regex: "[0-9]",
    },
    {
      key: "symbol",
      regex: restrictSymbolsTo
        ? `[${escapeStringRegexp(restrictSymbolsTo)}]`
        : "[^a-zA-Z0-9]",
    },
  ];

  const strength: Result<string> = {
    id: -1,
    value: "",
    contains: [],
    length: 0,
  };

  strength.contains = rules
    .filter((rule) => new RegExp(`${rule.regex}`).test(_password))
    .map((rule) => rule.key as DiversityType);

  strength.length = _password.length;

  const fulfilledOptions = options
    .filter((option) => strength.contains.length >= option.minDiversity)
    .filter((option) => strength.length >= option.minLength)
    .sort((o1, o2) => o2.id - o1.id)
    .map((option) => ({ id: option.id, value: option.value }));

  Object.assign(strength, fulfilledOptions[0]);

  return strength;
};
