# Password Strength Checker

This module provides a function to evaluate the strength of a password based on its length and diversity (presence of lowercase, uppercase, numbers, and symbols).

## Features
- Categorizes password strength as `Too weak`, `Weak`, `Medium`, or `Strong`.
- Evaluates passwords based on character diversity and length.
- Customizable rules for strength calculation.

## Object Result

| Property  | Description |
|-----------|------------|
| `id` | **0** = Too weak, **1** = Weak, **2** = Medium, **3** = Strong |
| `value` | Too weak, Weak, Medium & Strong |
| `contains` | lowercase, uppercase, symbol and/or number |
| `length` | Length of the password |

## Password Length Default Options

| Name       | Minimum Diversity | Minimum Length |
|------------|------------------|----------------|
| Too weak   | 0                | 0              |
| Weak       | 2                | 8              |
| Medium     | 4                | 10             |
| Strong     | 4                | 12             |

## Dependency Installation
```sh
npm install escape-string-regexp
```

## Usage
```ts
import { passwordStrength } from "./password-strength";

const result = passwordStrength("MySecureP@ssw0rd!");
console.log(result);
// Example output:
// {
//   id: 3,
//   value: "Strong",
//   contains: ["lowercase", "uppercase", "number", "symbol"],
//   length: 16
// }
```

## Customization
You can provide custom strength options and restrict allowed symbols:

```ts
const customOptions = [
  { id: 0, value: "Too weak", minDiversity: 0, minLength: 0 },
  { id: 1, value: "Weak", minDiversity: 2, minLength: 6 },
  { id: 2, value: "Medium", minDiversity: 3, minLength: 8 },
  { id: 3, value: "Strong", minDiversity: 4, minLength: 10 },
];

const result = passwordStrength("Example123!", customOptions, "!@#$%");
console.log(result);
```

## License
MIT

