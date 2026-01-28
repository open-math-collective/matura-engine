// src/engine/utils/MathUtils.js

class MathUtils {
  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Funkcja do ładnego formatowania ax^2 + bx + c
  static formatPolynomial(a, b, c) {
    let text = "";

    // Obsługa a
    if (a === 1) text += "x^2";
    else if (a === -1) text += "-x^2";
    else text += `${a}x^2`;

    // Obsługa b
    if (b > 0) text += ` + ${b === 1 ? "" : b}x`;
    else if (b < 0) text += ` - ${b === -1 ? "" : Math.abs(b)}x`;

    // Obsługa c
    if (c > 0) text += ` + ${c}`;
    else if (c < 0) text += ` - ${Math.abs(c)}`;

    return text;
  }

  static ensureUniqueDistractors(correctAnswer, distractors, generateFallback) {
    const unique = new Set(distractors.filter((d) => d !== correctAnswer));

    let attempts = 0;
    while (unique.size < 3 && attempts < 20) {
      const fallback = generateFallback();
      if (fallback !== correctAnswer) {
        unique.add(fallback);
      }
      attempts++;
    }
    return Array.from(unique).slice(0, 3);
  }
}

module.exports = MathUtils;
