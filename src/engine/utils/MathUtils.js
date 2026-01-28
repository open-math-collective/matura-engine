class MathUtils {
  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  static formatPolynomial(a, b, c) {
    let text = "";

    if (a === 1) text += "x^2";
    else if (a === -1) text += "-x^2";
    else text += `${a}x^2`;

    if (b > 0) text += ` + ${b === 1 ? "" : b}x`;
    else if (b < 0) text += ` - ${b === -1 ? "" : Math.abs(b)}x`;

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

  static gcd(a, b) {
    return b === 0 ? a : MathUtils.gcd(b, a % b);
  }

  static reduceFraction(n, d) {
    const common = MathUtils.gcd(Math.abs(n), Math.abs(d));
    return [n / common, d / common];
  }

  static toLatexFraction(n, d) {
    if (d === 1) return `${n}`;
    if (d === -1) return `${-n}`;
    if (n === 0) return "0";
    if (d < 0) {
      n = -n;
      d = -d;
    }
    return `\\frac{${n}}{${d}}`;
  }

  static simplifyRoot(n) {
    let coef = 1;
    let radical = n;
    for (let i = 2; i * i <= radical; i++) {
      while (radical % (i * i) === 0) {
        coef *= i;
        radical /= i * i;
      }
    }
    return { coef, radical };
  }

  static randomFraction(minVal, maxVal, denominatorRange = [2, 10]) {
    const den = MathUtils.randomInt(denominatorRange[0], denominatorRange[1]);
    const minNum = Math.ceil(minVal * den);
    const maxNum = Math.floor(maxVal * den);
    const num = MathUtils.randomInt(minNum, maxNum);

    return MathUtils.reduceFraction(num, den);
  }
}

module.exports = MathUtils;
