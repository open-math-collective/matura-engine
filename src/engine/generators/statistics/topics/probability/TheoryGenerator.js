const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");

class TheoryGenerator extends BaseGenerator {
  generateUnionFormula() {
    const den = MathUtils.randomElement([10, 20, 50]);
    const nA = MathUtils.randomInt(3, den / 2);
    const nB = MathUtils.randomInt(3, den / 2);
    const nIntersect = MathUtils.randomInt(1, Math.min(nA, nB));
    const nUnion = nA + nB - nIntersect;

    const pA = `0.${nA * (100 / den)}`;
    const pB = `0.${nB * (100 / den)}`;
    const pInt = `0.${nIntersect * (100 / den)}`;
    const res = (nUnion * (100 / den)) / 100;
    const resStr = res.toFixed(2).replace(/\.?0+$/, "");

    return this.createResponse({
      question: `Dla zdarzeń $$A, B$$ zachodzi: $$P(A) = ${pA}$$, $$P(B) = ${pB}$$, $$P(A \\cap B) = ${pInt}$$. Wtedy $$P(A \\cup B)$$ wynosi:`,
      latex: ``,
      image: null,
      variables: { res },
      correctAnswer: `${resStr}`,
      distractors: [
        `${(parseFloat(pA) + parseFloat(pB)).toFixed(1)}`,
        `${(1 - res).toFixed(2)}`,
        `1`,
      ],
      steps: [
        `$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$`,
        `$$P(A \\cup B) = ${pA} + ${pB} - ${pInt} = ${resStr}$$`,
      ],
    });
  }

  generateComplementaryEvent() {
    const den = MathUtils.randomInt(5, 15);
    const num = MathUtils.randomInt(1, den - 1);
    return this.createResponse({
      question: `Jeżeli $$P(A) = \\frac{${num}}{${den}}$$, to prawdopodobieństwo zdarzenia przeciwnego $$A'$$ wynosi:`,
      latex: ``,
      image: null,
      variables: { num, den },
      correctAnswer: `\\frac{${den - num}}{${den}}`,
      distractors: [`\\frac{${num}}{${den - num}}`, `\\frac{1}{${den}}`, `1`],
      steps: [
        `$$P(A') = 1 - P(A) = 1 - \\frac{${num}}{${den}} = \\frac{${den - num}}{${den}}$$`,
      ],
    });
  }

  generateGeometry1D() {
    const start = -2;
    const end = 4;
    const subStart = 0;
    const subEnd = 2;
    return this.createResponse({
      question: `Z przedziału $$<-2, 4>$$ losujemy liczbę. Prawdopodobieństwo, że należy do $$<0, 2>$$:`,
      latex: ``,
      image: null,
      variables: {},
      correctAnswer: `\\frac{1}{3}`,
      distractors: [`\\frac{1}{2}`, `\\frac{1}{6}`, `\\frac{2}{4}`],
      steps: [`Długość Omega: 6. Długość A: 2. $$P = 2/6 = 1/3$$`],
    });
  }
}

module.exports = TheoryGenerator;
