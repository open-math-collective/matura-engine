const BaseGenerator = require("../../../core/BaseGenerator");
const MathUtils = require("../../../utils/MathUtils");

const BasicOperationsValues = require("../values/BasicOperationsValues");

class BasicOperationsGenerator extends BaseGenerator {
  generatePowerProblem() {
    const { bases, nRange, kRange, mRange } =
      BasicOperationsValues.getPowerProblemParams(this.difficulty);

    const base = Number.isInteger(bases)
      ? bases
      : MathUtils.randomElement(bases);
    const n = MathUtils.randomInt(nRange[0], nRange[1]);
    const k = MathUtils.randomInt(kRange[0], kRange[1]);
    const m = MathUtils.randomInt(mRange[0], mRange[1]);

    const finalExp = n + 2 * k - m;
    const baseSq = base * base;

    return this.createResponse({
      question: "Liczba $$x$$ jest równa wartości wyrażenia. Ile wynosi $$x$$?",
      latex: `x = \\frac{${base}^{${n}} \\cdot ${baseSq}^{${k}}}{${base}^{${m}}}`,
      image: null,
      variables: { base, n, k, m, finalExp },
      correctAnswer: `${base}^{${finalExp}}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `${base}^{${finalExp}}`,
        [
          `${base}^{${n + k - m}}`,
          `${base}^{${finalExp * -1}}`,
          `${baseSq}^{${finalExp + 1}}`,
        ],
        () => {
          const e = finalExp + MathUtils.randomElement([-1, 1, -2, 2, 3]);
          return `${base}^{${e}}`;
        },
      ),
      steps: [
        `Sprowadzamy do podstawy $$${base}$$: $$${baseSq} = ${base}^2$$.`,
        `$$(${base}^2)^{${k}} = ${base}^{${2 * k}}$$`,
        `Licznik: $$${base}^{${n}} \\cdot ${base}^{${2 * k}} = ${base}^{${n + 2 * k}}$$`,
        `Całość: $$x = ${base}^{${n + 2 * k} - ${m}} = ${base}^{${finalExp}}$$`,
      ],
      questionType: "closed",
    });
  }

  generateRootsProblem() {
    const { roots, f1Range, f2Range, opList } =
      BasicOperationsValues.getRootsProblemParams(this.difficulty);

    const root = Number.isInteger(roots) ? roots : roots;
    const f1 = MathUtils.randomInt(f1Range[0], f1Range[1]);
    const f2 = MathUtils.randomInt(f2Range[0], Math.min(f1 - 1, f2Range[1]));

    const largeVal = f1 * f1 * root;
    const smallVal = f2 * f2 * root;
    const op = MathUtils.randomElement(opList);

    const resultFactor = op === "-" ? f1 - f2 : f1 + f2;
    const latex = `\\sqrt{${largeVal}} ${op} \\sqrt{${smallVal}}`;
    const correctAnswer = `${resultFactor}\\sqrt{${root}}`;

    return this.createResponse({
      question: `Liczba $$${latex}$$ jest równa:`,
      latex: null,
      image: null,
      variables: { root, f1, f2, largeVal, smallVal },
      correctAnswer: correctAnswer,
      distractors: MathUtils.ensureUniqueDistractors(
        correctAnswer,
        [
          `\\sqrt{${op === "-" ? largeVal - smallVal : largeVal + smallVal}}`,
          `${resultFactor * root}`,
          `${op === "-" ? f1 + f2 : f1 - f2}\\sqrt{${root}}`,
        ],
        () => {
          const fakeFactor =
            resultFactor + MathUtils.randomElement([-1, 1, 2, -2]);
          return `${fakeFactor}\\sqrt{${root}}`;
        },
      ),
      steps: [
        `$$\\sqrt{${largeVal}} = ${f1}\\sqrt{${root}}$$`,
        `$$\\sqrt{${smallVal}} = ${f2}\\sqrt{${root}}$$`,
        `Wynik: $$${correctAnswer}$$`,
      ],
      anserFormat: null,
      questionType: "closed",
    });
  }

  generateScientificProblem() {
    const { bBaseRange, multipliers, expRange } =
      BasicOperationsValues.getScientificParams(this.difficulty);

    const b_base = MathUtils.randomInt(bBaseRange[0], bBaseRange[1]);
    const multiplier = MathUtils.randomElement(multipliers);
    const a_base = b_base * multiplier;

    const k = MathUtils.randomInt(expRange[0], expRange[1]);
    const m = MathUtils.randomInt(expRange[0], expRange[1]);

    const mantissa = a_base / b_base; // = multiplier
    const exponent = k - m;

    let finalMantissa = mantissa;
    let finalExponent = exponent;

    if (finalMantissa >= 10) {
      finalMantissa /= 10;
      finalExponent += 1;
    } else if (finalMantissa < 1) {
      finalMantissa *= 10;
      finalExponent -= 1;
    }

    const formatNum = (num) => (Number.isInteger(num) ? `${num}` : `${num}`);

    return this.createResponse({
      question: `Wartość wyrażenia $$\\frac{${formatNum(a_base)} \\cdot 10^{${k}}}{${formatNum(b_base)} \\cdot 10^{${m}}}$$ jest równa:`,
      latex: null,
      image: null,
      variables: { a_base, b_base, k, m },
      correctAnswer: `${formatNum(finalMantissa)} \\cdot 10^{${finalExponent}}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `${formatNum(finalMantissa)} \\cdot 10^{${finalExponent}}`,
        [
          `${formatNum(finalMantissa)} \\cdot 10^{${k - m}}`,
          `${formatNum(mantissa * 10)} \\cdot 10^{${exponent + 1}}`,
          `${formatNum(a_base - b_base)} \\cdot 10^{${k - m}}`,
        ],
        () => {
          return `${formatNum(finalMantissa)} \\cdot 10^{${finalExponent + MathUtils.randomElement([-1, 1, 2])}}`;
        },
      ),
      steps: [
        `$$${formatNum(a_base)}:${formatNum(b_base)}=${formatNum(mantissa)}$$`,
        `$$10^{${k}}:10^{${m}}=10^{${k - m}}$$`,
        `Normalizacja: $$${formatNum(finalMantissa)} \\cdot 10^{${finalExponent}}$$`,
      ],
      questionType: "closed",
    });
  }

  generateExponentRootConversion() {
    const { aList, nRange, mRange } = BasicOperationsValues.getConversionParams(
      this.difficulty,
    );

    const a = MathUtils.randomElement(aList);
    const n = MathUtils.randomInt(nRange[0], nRange[1]);
    const m = MathUtils.randomInt(mRange[0], mRange[1]);

    const resNum = 2 * m + n;
    const resDen = 2 * n;

    const gcd = (x, y) => (y ? gcd(y, x % y) : x);

    const common = gcd(resNum, resDen);
    const finalNum = resNum / common;
    const finalDen = resDen / common;

    return this.createResponse({
      question: `Liczbę $$\\sqrt[${n}]{${a}^${m}} \\cdot ${a}^{\\frac{1}{2}}$$ można zapisać w postaci:`,
      latex: ``,
      image: null,
      variables: { a, n, m },
      correctAnswer: `${a}^{\\frac{${finalNum}}{${finalDen}}}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `${a}^{\\frac{${finalNum}}{${finalDen}}}`,
        [
          `${a}^{\\frac{${m}}{${n + 2}}}`,
          `${a}^{\\frac{${resNum}}{${n}}}`,
          `${a}^{\\frac{${finalDen}}{${finalNum}}}`,
        ],
        () => {
          const num = finalNum + MathUtils.randomElement([-1, 1]);
          const den = finalDen + MathUtils.randomElement([0, 1]);
          return `${a}^{\\frac{${num}}{${den}}}`;
        },
      ),
      steps: [
        `Zamieniamy pierwiastek na potęgę: $$\\sqrt[n]{a^m} = a^{\\frac{m}{n}}$$`,
        `Mnożenie potęg: dodajemy wykładniki $$\\frac{${m}}{${n}} + \\frac{1}{2}$$`,
        `Sprowadzamy do wspólnego mianownika i skracamy: $$${a}^{\\frac{${finalNum}}{${finalDen}}}$$`,
      ],
      questionType: "closed",
    });
  }
}

module.exports = BasicOperationsGenerator;
