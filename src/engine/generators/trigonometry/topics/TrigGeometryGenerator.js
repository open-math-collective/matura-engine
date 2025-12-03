const BaseGenerator = require("../../../core/BaseGenerator");
const MathUtils = require("../../../utils/MathUtils");
const TrigSVGUtils = require("./TrigSVGUtils");

class TrigGeometryGenerator extends BaseGenerator {
  generateTriangleDef() {
    const [a, b, c] = MathUtils.randomElement([
      [3, 4, 5],
      [5, 12, 13],
      [8, 15, 17],
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
      image: TrigSVGUtils.generateSVG({ type: "triangle", a, b, c }),
      variables: { a, b, c, func },
      correctAnswer: `\\frac{${num}}{${den}}`,
      distractors: [
        `\\frac{${den}}{${num}}`,
        `\\frac{${b}}{${a}}`,
        `\\frac{${a}}{${c + 1}}`,
      ],
      steps: [`Definicja $$${func}$$: Odpowiedni stosunek boków.`],
    });
  }

  generateAreaTriangle() {
    const a = MathUtils.randomInt(4, 10);
    const b = MathUtils.randomInt(4, 10);
    const angle = MathUtils.randomElement([30, 45, 60]);
    let areaStr;
    const coeff = (a * b) / 2;
    if (angle === 30) areaStr = `${coeff / 2}`;
    else if (angle === 45) areaStr = `${coeff / 2}\\sqrt{2}`;
    else areaStr = `${coeff / 2}\\sqrt{3}`;

    return this.createResponse({
      question: `Dany jest trójkąt o bokach $$${a}$$ i $$${b}$$ oraz kącie między nimi $$${angle}^\\circ$$. Pole tego trójkąta wynosi:`,
      latex: ``,
      image: TrigSVGUtils.generateSVG({ type: "triangle_sas", a, b, angle }),
      variables: { a, b, angle },
      correctAnswer: areaStr,
      distractors: [`${a * b}`, `${coeff}`, `${coeff}\\sqrt{2}`],
      steps: [`$$P = \\frac{1}{2}ab \\sin\\alpha$$`],
    });
  }

  generateAreaParallelogram() {
    const a = MathUtils.randomInt(3, 8);
    const b = MathUtils.randomInt(3, 8);
    const angle = MathUtils.randomElement([30, 45, 60, 120, 135, 150]);
    const refAngle = angle > 90 ? 180 - angle : angle;

    let areaStr;
    if (refAngle === 30) areaStr = `${(a * b) / 2}`;
    else if (refAngle === 45) areaStr = `${(a * b) / 2}\\sqrt{2}`;
    else areaStr = `${(a * b) / 2}\\sqrt{3}`;

    return this.createResponse({
      question: `Boki równoległoboku mają długości $$${a}$$ i $$${b}$$, a kąt między nimi ma miarę $$${angle}^\\circ$$. Pole tego równoległoboku jest równe:`,
      latex: ``,
      image: TrigSVGUtils.generateSVG({ type: "parallelogram", a, b, angle }),
      variables: { a, b, angle },
      correctAnswer: areaStr,
      distractors: [`${a * b}`, `${a * b * 2}`, `${a + b}`],
      steps: [`$$P = ab \\sin\\alpha$$`],
    });
  }

  generateAreaRhombus() {
    const a = MathUtils.randomInt(4, 10);
    const angle = MathUtils.randomElement([30, 45, 60]);
    let areaStr;
    if (angle === 30) areaStr = `${(a * a) / 2}`;
    else if (angle === 45) areaStr = `${(a * a) / 2}\\sqrt{2}`;
    else areaStr = `${(a * a) / 2}\\sqrt{3}`;

    return this.createResponse({
      question: `Bok rombu ma długość $$${a}$$, a kąt ostry ma miarę $$${angle}^\\circ$$. Pole tego rombu wynosi:`,
      latex: ``,
      image: TrigSVGUtils.generateSVG({ type: "rhombus_angle", a, angle }),
      variables: { a, angle },
      correctAnswer: areaStr,
      distractors: [`${a * a}`, `${a * 4}`, `${(a * a) / 4}`],
      steps: [`$$P = a^2 \\sin\\alpha$$`],
    });
  }

  generateIsoscelesArm() {
    const a = MathUtils.randomInt(4, 10) * 2;
    const armLatex = `\\frac{${a}\\sqrt{3}}{3}`;

    return this.createResponse({
      question: `Podstawa trójkąta równoramiennego ma długość $$${a}$$, a kąt przy podstawie ma miarę $$30^\\circ$$. Ramię tego trójkąta ma długość:`,
      latex: ``,
      image: TrigSVGUtils.generateSVG({ type: "isosceles", a, angle: 30 }),
      variables: { a },
      correctAnswer: armLatex,
      distractors: [`${a}`, `${a}\\sqrt{3}`, `${a / 2}`],
      steps: [
        `$$\\cos 30^\\circ = \\frac{a/2}{b} \\implies b = \\frac{${a / 2}}{\\sqrt{3}/2}$$`,
      ],
    });
  }

  generateTrapezoidHeight() {
    const c = MathUtils.randomInt(4, 10) * 2;
    const angle = MathUtils.randomElement([30, 45, 60]);
    let hStr;
    if (angle === 30) hStr = `${c / 2}`;
    else if (angle === 45) hStr = `${c / 2}\\sqrt{2}`;
    else hStr = `${c / 2}\\sqrt{3}`;

    return this.createResponse({
      question: `Ramię trapezu równoramiennego ma długość $$${c}$$, a kąt ostry tego trapezu ma miarę $$${angle}^\\circ$$. Wysokość trapezu jest równa:`,
      latex: ``,
      image: TrigSVGUtils.generateSVG({ type: "trapezoid_h", c, angle }),
      variables: { c, angle },
      correctAnswer: hStr,
      distractors: [`${c}`, `${c}\\sqrt{2}`, `${c * 2}`],
      steps: [`$$h = c \\cdot \\sin ${angle}^\\circ$$`],
    });
  }
}

module.exports = TrigGeometryGenerator;
