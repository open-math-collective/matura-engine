const BaseGenerator = require("../../core/BaseGenerator");
const MathUtils = require("../../utils/MathUtils");

class TrigonometryGenerator extends BaseGenerator {
  generate() {
    const variants = [
      "triangle_def", // Definicja sin/cos/tg w trójkącie
      "pythagorean_id", // Jedynka trygonometryczna: sin^2 + cos^2 = 1
      "values_eval", // sin(30) + cos(60)...
      "angle_relation", // sin(alpha) = cos(90-alpha)
      "tg_identity", // tg = sin/cos
    ];

    const selectedVariant = MathUtils.randomElement(variants);

    switch (selectedVariant) {
      case "triangle_def":
        return this.generateTriangleDef();
      case "pythagorean_id":
        return this.generatePythagoreanIdentity();
      case "values_eval":
        return this.generateValuesEval();
      case "angle_relation":
        return this.generateAngleRelation();
      case "tg_identity":
      default:
        return this.generateTgIdentity();
    }
  }

  // 1. DEFINICJE W TRÓJKĄCIE (Przeniesione i ulepszone z Planimetrii)
  generateTriangleDef() {
    const [a, b, c] = MathUtils.randomElement([
      [3, 4, 5],
      [5, 12, 13],
      [8, 15, 17],
      [20, 21, 29],
    ]);
    const func = MathUtils.randomElement(["sin", "cos", "tg"]);

    let num, den;
    if (func === "sin") {
      num = a;
      den = c;
    } else if (func === "cos") {
      num = b;
      den = c;
    } else {
      num = a;
      den = b;
    }

    return this.createResponse({
      question: `W trójkącie prostokątnym o bokach $$${a}, ${b}, ${c}$$ kąt $$\\alpha$$ leży naprzeciwko boku $$${a}$$. Wartość $$${func} \\alpha$$ wynosi:`,
      latex: ``,
      image: this.generateSVG({ type: "triangle", a, b, c }),
      variables: { a, b, c, func },
      correctAnswer: `\\frac{${num}}{${den}}`,
      distractors: [
        `\\frac{${den}}{${num}}`,
        `\\frac{${b}}{${a}}`,
        `\\frac{${a}}{${c + 1}}`,
      ], // Losowe
      steps: [
        `Rysunek pomocniczy. $$a=${a}$$ (naprzeciw), $$b=${b}$$ (przy), $$c=${c}$$ (przeciwprostokątna).`,
        `Definicja $$${func}$$: Odpowiedni stosunek boków.`,
      ],
    });
  }

  // 2. JEDYNKA TRYGONOMETRYCZNA
  generatePythagoreanIdentity() {
    // Dane sin, oblicz cos (lub odwrotnie).
    // Używamy trójek pitagorejskich, żeby pierwiastki wyszły ładnie.
    const [a, b, c] = MathUtils.randomElement([
      [3, 4, 5],
      [5, 12, 13],
      [8, 15, 17],
    ]);
    const givenFunc = MathUtils.randomElement(["sin", "cos"]);
    const targetFunc = givenFunc === "sin" ? "cos" : "sin";

    const givenVal = `\\frac{${givenFunc === "sin" ? a : b}}{${c}}`;
    const targetVal = `\\frac{${givenFunc === "sin" ? b : a}}{${c}}`;

    return this.createResponse({
      question: `Kąt $$\\alpha$$ jest ostry i $$${givenFunc} \\alpha = ${givenVal}$$. Wartość $$${targetFunc} \\alpha$$ jest równa:`,
      latex: `${givenFunc} \\alpha = ${givenVal}`,
      image: null,
      variables: { a, b, c },
      correctAnswer: targetVal,
      distractors: [`\\frac{${c - a}}{${c}}`, `\\frac{${a}}{${b}}`, `1`],
      steps: [
        `Z jedynki trygonometrycznej: $$\\sin^2\\alpha + \\cos^2\\alpha = 1$$`,
        `$$(${givenVal})^2 + ${targetFunc}^2\\alpha = 1$$`,
        `$$${targetFunc}^2\\alpha = 1 - \\frac{${givenFunc === "sin" ? a * a : b * b}}{${c * c}} = \\frac{${c * c - (givenFunc === "sin" ? a * a : b * b)}}{${c * c}}$$`,
        `$$${targetFunc}\\alpha = \\sqrt{\\frac{${givenFunc === "sin" ? b * b : a * a}}{${c * c}}} = ${targetVal}$$`,
      ],
    });
  }

  // 3. WARTOŚCI KĄTÓW (30, 45, 60)
  generateValuesEval() {
    // sin(30) + cos(60) itp.
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
      steps: [`Podstawiamy wartości z tabeli trygonometrycznej.`, item.s],
    });
  }

  // 4. ZALEŻNOŚCI KĄTÓW (COFUNKCJE)
  generateAngleRelation() {
    // sin(alpha) - cos(90-alpha) = 0
    const alpha = MathUtils.randomInt(10, 80);
    const beta = 90 - alpha;

    return this.createResponse({
      question: `Wartość wyrażenia $$\\sin ${alpha}^\\circ - \\cos ${beta}^\\circ$$ jest równa:`,
      latex: ``,
      image: null,
      variables: { alpha, beta },
      correctAnswer: `0`,
      distractors: [`1`, `-1`, `2\\sin ${alpha}^\\circ`],
      steps: [
        `Korzystamy ze wzoru redukcyjnego: $$\\cos \\beta = \\sin (90^\\circ - \\beta)$$`,
        `$$\\cos ${beta}^\\circ = \\sin (90^\\circ - ${beta}^\\circ) = \\sin ${alpha}^\\circ$$`,
        `Zatem: $$\\sin ${alpha}^\\circ - \\sin ${alpha}^\\circ = 0$$`,
      ],
    });
  }

  // 5. TOŻSAMOŚĆ TANGENSA
  generateTgIdentity() {
    // tg = sin/cos. Dane sin i cos, oblicz tg.
    const [a, b, c] = MathUtils.randomElement([
      [3, 4, 5],
      [5, 12, 13],
    ]);

    return this.createResponse({
      question: `Kąt $$\\alpha$$ jest ostry, $$\\sin\\alpha=\\frac{${a}}{${c}}$$ i $$\\cos\\alpha=\\frac{${b}}{${c}}$$. Wartość $$\\tg\\alpha$$ wynosi:`,
      latex: ``,
      image: null,
      variables: { a, b, c },
      correctAnswer: `\\frac{${a}}{${b}}`,
      distractors: [`\\frac{${b}}{${a}}`, `\\frac{${a}}{${c}}`, `1`],
      steps: [
        `$$\\tg\\alpha = \\frac{\\sin\\alpha}{\\cos\\alpha} = \\frac{${a}/${c}}{${b}/${c}} = \\frac{${a}}{${b}}$$`,
      ],
    });
  }

  generateSVG(params) {
    if (params.type === "triangle") {
      const size = 300;
      const x0 = 50;
      const y0 = 250;
      const sc = 15; // scale
      const ax = params.b * sc;
      const ay = params.a * sc;
      return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff">
                <polygon points="${x0},${y0} ${x0 + ax},${y0} ${x0},${y0 - ay}" stroke="black" fill="none" stroke-width="2"/>
                <text x="${x0 - 20}" y="${y0 - ay / 2}">${params.a}</text>
                <text x="${x0 + ax / 2}" y="${y0 + 20}">${params.b}</text>
                <text x="${x0 + ax / 2}" y="${y0 - ay / 2}">${params.c}</text>
                <text x="${x0 + ax - 30}" y="${y0 - 10}" fill="red">α</text>
            </svg>`;
    }
    return "";
  }
}

module.exports = TrigonometryGenerator;
