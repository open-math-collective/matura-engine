const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");

class SetsAndNumbersGenerator extends BaseGenerator {
  generateTwoSetsSum() {
    const setA = [1, 2, 3, 4, 5].slice(0, MathUtils.randomInt(3, 5));
    const setB = [1, 2, 3, 4, 5, 6, 7].slice(
      MathUtils.randomInt(0, 2),
      MathUtils.randomInt(4, 7),
    );
    for (let i = 0; i < setB.length; i++) setB[i] += MathUtils.randomInt(2, 5);

    const omega = setA.length * setB.length;
    const type = MathUtils.randomElement(["sum_even", "sum_odd"]);
    let favored = 0;
    let conditionDesc = `suma wylosowanych liczb będzie liczbą ${type === "sum_even" ? "parzystą" : "nieparzystą"}`;

    for (let a of setA) {
      for (let b of setB) {
        const sum = a + b;
        if (type === "sum_even" && sum % 2 === 0) favored++;
        else if (type === "sum_odd" && sum % 2 !== 0) favored++;
      }
    }

    const gcd = this.getGCD(favored, omega);

    return this.createResponse({
      question: `Dane są dwa zbiory: $$A=\\{${setA.join(",")}\\}$$ oraz $$B=\\{${setB.join(",")}\\}$$. Losujemy jedną liczbę ze zbioru $$A$$ i jedną liczbę ze zbioru $$B$$. Oblicz prawdopodobieństwo, że ${conditionDesc}.`,
      latex: ``,
      image: null,
      variables: { setA, setB, favored, omega },
      correctAnswer: `\\frac{${favored / gcd}}{${omega / gcd}}`,
      distractors: [
        `\\frac{1}{2}`,
        `\\frac{${Math.max(1, favored - 1)}}{${omega}}`,
        `\\frac{${setA.length + setB.length}}{${omega}}`,
      ],
      steps: [
        `$$|\\Omega| = |A| \\cdot |B| = ${omega}$$`,
        `Zliczamy pary: $$${favored}$$`,
        `$$P(A) = \\frac{${favored}}{${omega}}$$`,
      ],
    });
  }

  generateDrawingWithReplacement() {
    const n = MathUtils.randomInt(5, 9);
    const omega = n * n;

    const type = MathUtils.randomElement(["prod_div3", "sum_even"]);
    let favored = 0;
    let desc = "";

    if (type === "prod_div3") {
      desc = "iloczyn wylosowanych liczb będzie podzielny przez 3";
      for (let i = 1; i <= n; i++)
        for (let j = 1; j <= n; j++) if ((i * j) % 3 === 0) favored++;
    } else {
      desc = "suma wylosowanych liczb będzie parzysta";
      for (let i = 1; i <= n; i++)
        for (let j = 1; j <= n; j++) if ((i + j) % 2 === 0) favored++;
    }

    const gcd = this.getGCD(favored, omega);
    return this.createResponse({
      question: `Ze zbioru liczb $$\\{1, 2, ..., ${n}\\}$$ losujemy dwa razy po jednej liczbie ze zwracaniem. Oblicz prawdopodobieństwo, że ${desc}.`,
      latex: ``,
      image: null,
      variables: { n, omega, favored },
      correctAnswer: `\\frac{${favored / gcd}}{${omega / gcd}}`,
      distractors: [
        `\\frac{1}{3}`,
        `\\frac{${n}}{${omega}}`,
        `\\frac{${favored}}{${n * (n - 1)}}`,
      ],
      steps: [
        `$$|\\Omega| = ${n}^2 = ${omega}$$`,
        `Liczba par sprzyjających: $$${favored}$$`,
        `$$P(A) = \\frac{${favored}}{${omega}}$$`,
      ],
    });
  }

  generateDivisibilitySetDynamic() {
    const n = MathUtils.randomInt(20, 60);
    const div1 = 3;
    const div2 = 5;
    const c1 = Math.floor(n / div1);
    const c2 = Math.floor(n / div2);
    const c12 = Math.floor(n / (div1 * div2));
    const favored = c1 + c2 - c12;
    const gcd = this.getGCD(favored, n);

    return this.createResponse({
      question: `Ze zbioru $$\\{1, ..., ${n}\\}$$ losujemy liczbę. Prawdopodobieństwo, że jest podzielna przez 3 lub 5:`,
      latex: ``,
      image: null,
      variables: { n, favored },
      correctAnswer: `\\frac{${favored / gcd}}{${n / gcd}}`,
      distractors: [
        `\\frac{${c1 + c2}}{${n}}`,
        `\\frac{1}{2}`,
        `\\frac{${c12}}{${n}}`,
      ],
      steps: [
        `$$|A \\cup B| = ${c1} + ${c2} - ${c12} = ${favored}$$`,
        `$$P = \\frac{${favored}}{${n}}$$`,
      ],
    });
  }

  generateDrawNumberProperties() {
    const n = MathUtils.randomElement([10, 20, 30]);
    const type = MathUtils.randomElement(["prime", "square"]);
    let favored = 0;
    let desc = "";

    if (type === "prime") {
      const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
      favored = primes.filter((p) => p <= n).length;
      desc = "liczbą pierwszą";
    } else {
      for (let i = 1; i * i <= n; i++) favored++;
      desc = "kwadratem liczby naturalnej";
    }

    const gcd = this.getGCD(favored, n);
    return this.createResponse({
      question: `Ze zbioru $$\\{1, ..., ${n}\\}$$ losujemy liczbę. Prawdopodobieństwo, że będzie ${desc}:`,
      latex: ``,
      image: null,
      variables: { n, type },
      correctAnswer: `\\frac{${favored / gcd}}{${n / gcd}}`,
      distractors: [
        `\\frac{1}{2}`,
        `\\frac{1}{4}`,
        `\\frac{${favored + 1}}{${n}}`,
      ],
      steps: [
        `Liczba sprzyjających: $$${favored}$$`,
        `$$P = \\frac{${favored}}{${n}}$$`,
      ],
    });
  }

  getGCD(a, b) {
    return b ? this.getGCD(b, a % b) : a;
  }
}

module.exports = SetsAndNumbersGenerator;
