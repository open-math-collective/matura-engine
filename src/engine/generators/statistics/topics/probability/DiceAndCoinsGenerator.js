const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");

class DiceAndCoinsGenerator extends BaseGenerator {
  generateDiceSum() {
    const limit = MathUtils.randomInt(4, 10);
    const omega = 36;
    let favored = 0;
    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j <= 6; j++) {
        if (i + j > limit) favored++;
      }
    }

    const gcd = this.getGCD(favored, omega);
    return this.createResponse({
      question: `Rzucamy dwa razy sześcienną kostką. Oblicz prawdopodobieństwo, że suma wyrzuconych oczek jest większa od $$${limit}$$.`,
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
        `Liczba wszystkich zdarzeń elementarnych: $$|\\Omega| = 6 \\cdot 6 = 36$$.`,
        `Wypisujemy zdarzenia sprzyjające (suma > ${limit}).`,
        `Jest ich $$${favored}$$.`,
        `$$P(A) = \\frac{${favored}}{36}$$`,
      ],
    });
  }

  generateDiceComparison() {
    const omega = 36;
    const type = MathUtils.randomElement(["greater", "equal", "less"]);
    let favored = 0;
    let desc = "";

    if (type === "equal") {
      favored = 6;
      desc =
        "liczba oczek w pierwszym rzucie będzie równa liczbie oczek w drugim";
    } else {
      favored = 15;
      desc = `liczba oczek w pierwszym rzucie będzie ${type === "greater" ? "większa od" : "mniejsza od"} liczby oczek w drugim`;
    }

    const gcd = this.getGCD(favored, omega);

    return this.createResponse({
      question: `Rzucamy dwa razy sześcienną kostką. Oblicz prawdopodobieństwo, że ${desc}.`,
      latex: ``,
      image: null,
      variables: { favored },
      correctAnswer: `\\frac{${favored / gcd}}{${omega / gcd}}`,
      distractors: [`\\frac{1}{2}`, `\\frac{1}{6}`, `\\frac{21}{36}`],
      steps: [
        `$$|\\Omega| = 36$$`,
        `Liczba zdarzeń sprzyjających: $$${favored}$$`,
        `$$P(A) = \\frac{${favored}}{36}$$`,
      ],
    });
  }

  generateDiceProduct() {
    const omega = 36;
    const type = MathUtils.randomElement(["odd", "even", "div4"]);
    let favored = 0;
    let desc = "";

    if (type === "odd") {
      favored = 9;
      desc = "iloczyn oczek będzie liczbą nieparzystą";
    } else if (type === "even") {
      favored = 27;
      desc = "iloczyn oczek będzie liczbą parzystą";
    } else {
      desc = "iloczyn oczek będzie podzielny przez 4";
      for (let i = 1; i <= 6; i++)
        for (let j = 1; j <= 6; j++) if ((i * j) % 4 === 0) favored++;
    }

    const gcd = this.getGCD(favored, omega);

    return this.createResponse({
      question: `Rzucamy dwa razy kostką. Oblicz prawdopodobieństwo, że ${desc}.`,
      latex: ``,
      image: null,
      variables: { favored, type },
      correctAnswer: `\\frac{${favored / gcd}}{${omega / gcd}}`,
      distractors: [`\\frac{1}{2}`, `\\frac{1}{4}`, `\\frac{1}{6}`],
      steps: [
        `Liczba zdarzeń sprzyjających: $$${favored}$$`,
        `$$P(A) = \\frac{${favored}}{36}$$`,
      ],
    });
  }

  generateCoinsDynamic() {
    const n = MathUtils.randomInt(2, 4);
    const omega = Math.pow(2, n);
    // Co najmniej 1 orzeł
    const favored = omega - 1;
    const gcd = this.getGCD(favored, omega);

    return this.createResponse({
      question: `Rzucamy $$${n}$$ razy monetą. Prawdopodobieństwo wyrzucenia co najmniej jednego orła:`,
      latex: ``,
      image: null,
      variables: { n, favored },
      correctAnswer: `\\frac{${favored / gcd}}{${omega / gcd}}`,
      distractors: [
        `\\frac{1}{${omega}}`,
        `\\frac{1}{2}`,
        `\\frac{${n}}{${omega}}`,
      ],
      steps: [
        `Zdarzenie przeciwne (same reszki): 1. $$P(A) = 1 - \\frac{1}{${omega}}$$`,
      ],
    });
  }

  getGCD(a, b) {
    return b ? this.getGCD(b, a % b) : a;
  }
}

module.exports = DiceAndCoinsGenerator;
