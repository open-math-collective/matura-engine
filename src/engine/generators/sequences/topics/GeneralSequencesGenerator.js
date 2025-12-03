const BaseGenerator = require("../../../core/BaseGenerator");
const MathUtils = require("../../../utils/MathUtils");

class GeneralSequencesGenerator extends BaseGenerator {
  generateNthTerm() {
    const a = MathUtils.randomInt(-2, 2) || 1;
    const b = MathUtils.randomInt(-5, 5);
    const c = MathUtils.randomInt(-10, 10);
    const n = MathUtils.randomInt(2, 10);
    const formula = `a_n = ${MathUtils.formatPolynomial(a, b, c).replace(/x/g, "n")}`;
    const val = a * n * n + b * n + c;
    return this.createResponse({
      question: `Oblicz $$a_{${n}}$$ dla ciągu $$${formula}$$.`,
      latex: formula,
      image: null,
      variables: { a, b, c, n },
      correctAnswer: `${val}`,
      distractors: [`${val + a}`, `${val - b}`, `${-val}`],
      steps: [`$$a_{${n}} = ${a}(${n})^2 + (${b})(${n}) + (${c}) = ${val}$$`],
    });
  }

  generateWhichTerm() {
    const n = MathUtils.randomInt(2, 12);
    const type = MathUtils.randomElement(["quadratic", "linear"]);
    let a, b, c, X, formula;

    if (type === "linear") {
      a = MathUtils.randomInt(-5, 5) || 2;
      b = MathUtils.randomInt(-10, 10);
      X = a * n + b;
      formula = `a_n = ${a}n ${b >= 0 ? "+" : ""}${b}`;
    } else {
      a = 1;
      b = -MathUtils.randomInt(1, 10);
      c = MathUtils.randomInt(-10, 10);
      X = n * n + b * n + c;
      formula = `a_n = n^2 ${b >= 0 ? "+" : ""}${b}n ${c >= 0 ? "+" : ""}${c}`;
    }

    return this.createResponse({
      question: `Którym wyrazem ciągu $$(${formula})$$ jest liczba $$${X}$$?`,
      latex: formula,
      image: null,
      variables: { n, X },
      correctAnswer: `${n}`,
      distractors: [
        `${n + 1}`,
        `${n - 1}`,
        type === "quadratic" && b !== 0 ? `${Math.abs(n + b)}` : `${n + 2}`,
      ],
      steps: [`$$a_n = ${X} \\implies n = ${n}$$`],
    });
  }

  generateCountTerms() {
    const a = -MathUtils.randomInt(2, 5);
    const b = MathUtils.randomInt(20, 50);
    const limit = -b / a;
    const count = Math.ceil(limit) - 1;
    const formula = `a_n = ${a}n + ${b}`;

    return this.createResponse({
      question: `Ile wyrazów ciągu określonego wzorem $$${formula}$$ jest dodatnich?`,
      latex: formula,
      image: null,
      variables: { a, b, count },
      correctAnswer: `${count}`,
      distractors: [`${count + 1}`, `${count - 1}`, `${Math.floor(limit)}`],
      steps: [
        `$$${a}n + ${b} > 0 \\implies n < ${parseFloat(limit.toFixed(2))} \\implies n \\in \\{1, ..., ${count}\\}$$`,
      ],
    });
  }

  generateSequenceMonotonicity() {
    const a = MathUtils.randomElement([-3, -2, 2, 3]);
    const b = MathUtils.randomInt(-5, 5);
    const type = a > 0 ? "rosnący" : "malejący";
    const formula = `a_n = ${a}n ${b >= 0 ? "+" : ""}${b}`;

    return this.createResponse({
      question: `Ciąg określony wzorem $$${formula}$$ jest:`,
      latex: formula,
      image: null,
      variables: { a, b, type },
      correctAnswer: type,
      distractors: [a > 0 ? "malejący" : "rosnący", "stały", "niemonotoniczny"],
      steps: [`Różnica $$a_{n+1}-a_n = ${a}$$, więc ciąg jest ${type}.`],
    });
  }

  generateQuadraticSequencePos() {
    const x1 = MathUtils.randomInt(1, 3);
    const diff = MathUtils.randomInt(3, 7);
    const x2 = x1 + diff;
    const b = x1 + x2;
    const c = -(x1 * x2);
    const count = x2 - x1 - 1;
    const formula = `-n^2 + ${b}n ${c}`;

    return this.createResponse({
      question: `Ile wyrazów ciągu $$a_n = ${formula}$$ jest dodatnich?`,
      latex: formula,
      image: null,
      variables: { x1, x2, count },
      correctAnswer: `${count}`,
      distractors: [`${count + 1}`, `${count + 2}`, `${x2}`],
      steps: [
        `Parabola w dół, dodatnia między $$${x1}$$ a $$${x2}$$. Ilość: $$${count}$$.`,
      ],
    });
  }

  generateSequenceAverage() {
    const n = 5;
    const middle = MathUtils.randomInt(4, 10);
    const r = MathUtils.randomInt(2, 5);
    const a1 = middle - 2 * r;
    const avg = middle;

    return this.createResponse({
      question: `Średnia arytmetyczna pięciu początkowych wyrazów ciągu arytmetycznego wynosi $$${avg}$$. Pierwszy wyraz tego ciągu to $$${a1}$$. Różnica tego ciągu jest równa:`,
      latex: `\\bar{x}=${avg}, a_1=${a1}`,
      image: null,
      variables: { a1, avg, r },
      correctAnswer: `${r}`,
      distractors: [`${r + 1}`, `${avg - a1}`, `${r * 2}`],
      steps: [`$$a_3 = ${avg} = a_1 + 2r \\implies r = ${r}$$`],
    });
  }

  generateSumFormulaAnalysis() {
    const a = MathUtils.randomInt(1, 3);
    const b = MathUtils.randomInt(1, 5);
    const S3 = a * 3 * 3 - b * 3;
    const S2 = a * 2 * 2 - b * 2;
    const a3 = S3 - S2;
    const formula = `S_n = ${a === 1 ? "" : a}n^2 - ${b}n`;

    return this.createResponse({
      question: `Suma $$n$$ początkowych wyrazów ciągu liczbowego określona jest wzorem $$${formula}$$ dla $$n \\ge 1$$. Trzeci wyraz tego ciągu jest równy:`,
      latex: formula,
      image: null,
      variables: { S3, S2, a3 },
      correctAnswer: `${a3}`,
      distractors: [`${S3}`, `${S3 + S2}`, `${a * 3 * 3 + b * 3}`],
      steps: [`$$a_3 = S_3 - S_2 = ${S3} - ${S2} = ${a3}$$`],
    });
  }
}

module.exports = GeneralSequencesGenerator;
