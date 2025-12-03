const BaseGenerator = require("../../core/BaseGenerator");
const MathUtils = require("../../utils/MathUtils");

class ProbabilityGenerator extends BaseGenerator {
  generate() {
    const variants = ["dice", "coins", "urn", "draw_number"];
    const selectedVariant = MathUtils.randomElement(variants);

    switch (selectedVariant) {
      case "coins":
        return this.generateCoins();
      case "urn":
        return this.generateUrn();
      case "draw_number":
        return this.generateDrawNumber();
      case "dice":
      default:
        return this.generateDice();
    }
  }

  // 1. KOSTKA
  generateDice() {
    const limit = MathUtils.randomInt(7, 10);
    const omega = 36;
    let favored = 0;
    for (let i = 1; i <= 6; i++)
      for (let j = 1; j <= 6; j++) if (i + j > limit) favored++;

    const gcd = this.getGCD(favored, omega);
    return this.createResponse({
      question: `Rzucamy dwa razy sześcienną kostką. Prawdopodobieństwo, że suma oczek jest większa od $$${limit}$$:`,
      latex: ``,
      image: null,
      variables: { limit, favored },
      correctAnswer: `\\frac{${favored / gcd}}{${omega / gcd}}`,
      distractors: [
        `\\frac{1}{6}`,
        `\\frac{1}{2}`,
        `\\frac{${favored + 1}}{36}`,
      ],
      steps: [
        `$$|\\Omega|=36$$`,
        `Sprzyjające: $$${favored}$$`,
        `Wynik: $$\\frac{${favored}}{36}$$`,
      ],
    });
  }

  // 2. MONETY
  generateCoins() {
    // 3 monety, co najmniej 1 orzeł
    // Zdarzenie przeciwne: same reszki (1 przypadek)
    const omega = 8;
    const favored = 7; // 8 - 1
    return this.createResponse({
      question: `Rzucamy trzy razy monetą. Prawdopodobieństwo wyrzucenia co najmniej jednego orła:`,
      latex: ``,
      image: null,
      variables: {},
      correctAnswer: `\\frac{7}{8}`,
      distractors: [`\\frac{1}{8}`, `\\frac{3}{8}`, `\\frac{1}{2}`],
      steps: [
        `$$|\\Omega| = 2^3 = 8$$`,
        `Zdarzenie przeciwne: same reszki (RRR) - 1 przypadek.`,
        `$$P(A) = 1 - P(A') = 1 - \\frac{1}{8} = \\frac{7}{8}$$`,
      ],
    });
  }

  // 3. URNA
  generateUrn() {
    const b = MathUtils.randomInt(3, 7);
    const c = MathUtils.randomInt(3, 7);
    const total = b + c;
    const gcd = this.getGCD(b, total);
    return this.createResponse({
      question: `W urnie jest $$${b}$$ kul białych i $$${c}$$ czarnych. Losujemy jedną. P(biała) = ?`,
      latex: ``,
      image: null,
      variables: {},
      correctAnswer: `\\frac{${b / gcd}}{${total / gcd}}`,
      distractors: [
        `\\frac{${c}}{${total}}`,
        `\\frac{1}{2}`,
        `\\frac{${b}}{${c}}`,
      ],
      steps: [
        `Wszystkich: $$${total}$$`,
        `Białych: $$${b}$$`,
        `$$P = \\frac{${b}}{${total}}$$`,
      ],
    });
  }

  // 4. LOSOWANIE LICZBY ZE ZBIORU
  generateDrawNumber() {
    // Zbiór {1, ..., n}. P(parzysta)
    const n = MathUtils.randomElement([10, 15, 20, 30]);
    const favored = Math.floor(n / 2);
    const gcd = this.getGCD(favored, n);

    return this.createResponse({
      question: `Ze zbioru liczb naturalnych $$\\{1, 2, ..., ${n}\\}$$ losujemy jedną liczbę. Prawdopodobieństwo, że jest to liczba parzysta:`,
      latex: ``,
      image: null,
      variables: { n, favored },
      correctAnswer: `\\frac{${favored / gcd}}{${n / gcd}}`,
      distractors: [
        `\\frac{1}{3}`,
        `\\frac{1}{4}`,
        `\\frac{${favored + 1}}{${n}}`,
      ],
      steps: [
        `Wszystkich liczb: $$${n}$$`,
        `Parzystych: $$${favored}$$`,
        `$$P = \\frac{${favored}}{${n}}$$`,
      ],
    });
  }

  getGCD(a, b) {
    return b ? this.getGCD(b, a % b) : a;
  }
}

module.exports = ProbabilityGenerator;
