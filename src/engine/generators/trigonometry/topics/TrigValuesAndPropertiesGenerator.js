const BaseGenerator = require("../../../core/BaseGenerator");
const MathUtils = require("../../../utils/MathUtils");

class TrigValuesAndPropertiesGenerator extends BaseGenerator {
  generateValuesEval() {
    const exprs = [
      { q: "\\sin 30^\\circ + \\cos 60^\\circ", val: 1, s: "1/2 + 1/2" },
      {
        q: "\\sin 45^\\circ \\cdot \\cos 45^\\circ",
        val: "1/2",
        s: "sqrt(2)/2 * sqrt(2)/2 = 2/4",
      },
      {
        q: "\\tg 30^\\circ \\cdot \\tg 60^\\circ",
        val: 1,
        s: "sqrt(3)/3 * sqrt(3) = 3/3",
      },
      { q: "2\\sin 60^\\circ", val: "\\sqrt{3}", s: "2 * sqrt(3)/2" },
    ];
    const item = MathUtils.randomElement(exprs);
    return this.createResponse({
      question: `Wartość wyrażenia $$${item.q}$$ jest równa:`,
      latex: ``,
      image: null,
      variables: {},
      correctAnswer: `${item.val}`,
      distractors: [`0`, `\\frac{1}{2}`, `\\sqrt{2}`],
      steps: [item.s],
    });
  }

  generateFindAngle() {
    const func = MathUtils.randomElement(["sin", "cos", "tg"]);
    let val, angle;
    if (func === "tg") {
      val = "1";
      angle = 45;
    } else if (func === "sin") {
      val = "\\frac{1}{2}";
      angle = 30;
    } else {
      val = "\\frac{1}{2}";
      angle = 60;
    }
    return this.createResponse({
      question: `Kąt $$\\alpha$$ jest ostry i $$${func}\\alpha = ${val}$$. Miara kąta $$\\alpha$$ wynosi:`,
      latex: ``,
      image: null,
      variables: { func, val },
      correctAnswer: `${angle}^\\circ`,
      distractors: [`30^\\circ`, `45^\\circ`, `60^\\circ`]
        .filter((x) => x !== `${angle}^\\circ`)
        .concat(["90^\\circ"]),
      steps: [`Odczytujemy z tablic.`],
    });
  }

  generateCompareFunctions() {
    const func = MathUtils.randomElement(["sin", "cos", "tg"]);
    const a1 = MathUtils.randomInt(10, 40);
    const a2 = a1 + MathUtils.randomInt(10, 40);
    const isGrowing = func !== "cos";
    const sign = isGrowing ? "<" : ">";
    return this.createResponse({
      question: `Wskaż prawdziwą nierówność:`,
      latex: ``,
      image: null,
      variables: { func, a1, a2 },
      correctAnswer: `\\${func} ${a1}^\\circ ${sign} \\${func} ${a2}^\\circ`,
      distractors: [
        `\\${func} ${a1}^\\circ ${sign === "<" ? ">" : "<"} \\${func} ${a2}^\\circ`,
        `\\${func} ${a1}^\\circ = \\${func} ${a2}^\\circ`,
        `\\${func} ${a1}^\\circ \\cdot \\${func} ${a2}^\\circ = 1`,
      ],
      steps: [
        `Funkcja $$${func}$$ jest ${isGrowing ? "rosnąca" : "malejąca"}.`,
      ],
    });
  }

  generateApproxValue() {
    const angle = 10;
    const val = 0.1736;
    return this.createResponse({
      question: `Z tablic $$\\sin ${angle}^\\circ \\approx ${val}$$. Zatem $$\\cos ${90 - angle}^\\circ$$ jest w przybliżeniu równy:`,
      latex: ``,
      image: null,
      variables: {},
      correctAnswer: `${val}`,
      distractors: [
        `${(1 - val).toFixed(4)}`,
        `${(val * 2).toFixed(4)}`,
        `0.9848`,
      ],
      steps: [`$$\\cos(90^\\circ - \\alpha) = \\sin\\alpha$$.`],
    });
  }
}

module.exports = TrigValuesAndPropertiesGenerator;
