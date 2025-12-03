const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");
const StereometrySVGUtils = require("./StereometrySVGUtils");

class CubesGenerator extends BaseGenerator {
  generateCubeProblem() {
    const a = MathUtils.randomInt(2, 10);
    const mode = MathUtils.randomElement(["given_edge", "given_diag"]);

    if (mode === "given_edge") {
      return this.createResponse({
        question: `Krawędź sześcianu ma długość $$${a}$$. Długość przekątnej tego sześcianu jest równa:`,
        latex: `a = ${a}`,
        image: StereometrySVGUtils.generateSVG({ type: "cube", a }),
        variables: { a },
        correctAnswer: `${a}\\sqrt{3}`,
        distractors: [`${a}\\sqrt{2}`, `${3 * a}`, `${a * a}`],
        steps: [
          `Przekątna sześcianu o krawędzi $$a$$: $$D = a\\sqrt{3}$$`,
          `$$D = ${a}\\sqrt{3}$$`,
        ],
      });
    } else {
      const V = a * a * a;
      return this.createResponse({
        question: `Przekątna sześcianu ma długość $$${a}\\sqrt{3}$$. Objętość tego sześcianu wynosi:`,
        latex: `D = ${a}\\sqrt{3}`,
        image: StereometrySVGUtils.generateSVG({ type: "cube", a }),
        variables: { a, V },
        correctAnswer: `${V}`,
        distractors: [`${3 * a}`, `${a * a}`, `${Math.floor(V / 3)}`],
        steps: [
          `$$D = a\\sqrt{3} = ${a}\\sqrt{3} \\implies a = ${a}$$`,
          `$$V = a^3 = ${a}^3 = ${V}$$`,
        ],
      });
    }
  }

  generateCuboidAngle() {
    const a = MathUtils.randomInt(3, 6);
    const angle = MathUtils.randomElement([30, 45, 60]);
    let H_latex;
    if (angle === 45) H_latex = `${a}\\sqrt{2}`;
    else if (angle === 60) H_latex = `${a}\\sqrt{6}`;
    else H_latex = `\\frac{${a}\\sqrt{6}}{3}`;

    return this.createResponse({
      question: `Podstawą prostopadłościanu jest kwadrat o boku $$${a}$$. Przekątna bryły tworzy z płaszczyzną podstawy kąt $$${angle}^\\circ$$. Wysokość bryły wynosi:`,
      latex: `a=${a}, \\alpha=${angle}^\\circ`,
      image: StereometrySVGUtils.generateSVG({
        type: "cuboid_angle",
        a,
        angle,
      }),
      variables: { a, angle },
      correctAnswer: H_latex,
      distractors: [
        `${a}\\sqrt{3}`,
        angle === 60 ? `${a}\\sqrt{2}` : `${3 * a}`,
        `${a}`,
      ],
      steps: [
        `Przekątna podstawy (kwadratu): $$d = a\\sqrt{2} = ${a}\\sqrt{2}$$`,
        `Z trójkąta prostokątnego: $$\\tg ${angle}^\\circ = \\frac{H}{d}$$`,
        `$$H = ${a}\\sqrt{2} \\cdot \\tg ${angle}^\\circ = ${H_latex}$$`,
      ],
    });
  }

  generateCuboidDiagonal() {
    const a = MathUtils.randomInt(2, 6);
    const b = MathUtils.randomInt(2, 6);
    const c = MathUtils.randomInt(2, 8);

    const sumSq = a * a + b * b + c * c;
    const diagStr = Number.isInteger(Math.sqrt(sumSq))
      ? `${Math.sqrt(sumSq)}`
      : `\\sqrt{${sumSq}}`;

    return this.createResponse({
      question: `Wymiary prostopadłościanu są równe: $$a=${a}$$, $$b=${b}$$, $$c=${c}$$. Długość przekątnej tego prostopadłościanu wynosi:`,
      latex: `a=${a}, b=${b}, c=${c}`,
      image: StereometrySVGUtils.generateSVG({
        type: "cuboid_diagonal",
        a,
        b,
        c,
      }),
      variables: { a, b, c },
      correctAnswer: `${diagStr}`,
      distractors: [
        `\\sqrt{${a * a + b * b}}`,
        `${a + b + c}`,
        `\\sqrt{${sumSq - c * c}}`,
      ],
      steps: [
        `Wzór na długość przekątnej prostopadłościanu: $$d = \\sqrt{a^2 + b^2 + c^2}$$`,
        `$$d = \\sqrt{${a}^2 + ${b}^2 + ${c}^2}$$`,
        `$$d = \\sqrt{${a * a} + ${b * b} + ${c * c}} = \\sqrt{${sumSq}} = ${diagStr}$$`,
      ],
    });
  }
}

module.exports = CubesGenerator;
