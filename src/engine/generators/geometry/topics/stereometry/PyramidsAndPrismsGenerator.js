const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");
const StereometrySVGUtils = require("./StereometrySVGUtils");

class PyramidsAndPrismsGenerator extends BaseGenerator {
  generatePyramidSquare() {
    const a = MathUtils.randomInt(4, 10);
    const angle = MathUtils.randomElement([45, 60]);
    let H_latex;
    if (angle === 45)
      H_latex = a % 2 === 0 ? `${a / 2}\\sqrt{2}` : `\\frac{${a}\\sqrt{2}}{2}`;
    else
      H_latex = a % 2 === 0 ? `${a / 2}\\sqrt{6}` : `\\frac{${a}\\sqrt{6}}{2}`;

    return this.createResponse({
      question: `Krawędź podstawy ostrosłupa prawidłowego czworokątnego ma długość $$${a}$$. Krawędź boczna tworzy z płaszczyzną podstawy kąt $$${angle}^\\circ$$. Wysokość tego ostrosłupa jest równa:`,
      latex: `a=${a}, \\alpha=${angle}^\\circ`,
      image: StereometrySVGUtils.generateSVG({
        type: "pyramid_square",
        a,
        angle,
      }),
      variables: { a, angle },
      correctAnswer: H_latex,
      distractors: [
        `${a}\\sqrt{2}`,
        angle === 45 ? `${a}` : `${a}\\sqrt{3}`,
        `\\frac{${a}\\sqrt{2}}{4}`,
      ],
      steps: [
        `$$d = a\\sqrt{2} \\implies d/2 = \\frac{a\\sqrt{2}}{2}$$`,
        `$$H = d/2 \\cdot \\tg ${angle}^\\circ = ${H_latex}$$`,
      ],
    });
  }

  generatePyramidFaceAngle() {
    const a = MathUtils.randomInt(4, 10);
    const angle = MathUtils.randomElement([45, 60]);
    let H_latex;
    if (angle === 45) H_latex = a % 2 === 0 ? `${a / 2}` : `\\frac{${a}}{2}`;
    else
      H_latex = a % 2 === 0 ? `${a / 2}\\sqrt{3}` : `\\frac{${a}\\sqrt{3}}{2}`;

    return this.createResponse({
      question: `Krawędź podstawy ostrosłupa prawidłowego czworokątnego ma długość $$${a}$$. Wysokość ściany bocznej tworzy z płaszczyzną podstawy kąt $$${angle}^\\circ$$. Wysokość tego ostrosłupa jest równa:`,
      latex: `a=${a}, \\alpha=${angle}^\\circ`,
      image: StereometrySVGUtils.generateSVG({
        type: "pyramid_face_angle",
        a,
        angle,
      }),
      variables: { a, angle },
      correctAnswer: H_latex,
      distractors: [`${a}`, `${a}\\sqrt{2}`, `${a}\\sqrt{3}`],
      steps: [`$$H = \\frac{a}{2} \\cdot \\tg ${angle}^\\circ = ${H_latex}$$`],
    });
  }

  generatePyramidTriangle() {
    const a = MathUtils.randomInt(3, 9) * 2;
    const H = a / 2;
    return this.createResponse({
      question: `Krawędź podstawy ostrosłupa prawidłowego trójkątnego ma długość $$${a}$$. Wysokość ściany bocznej tworzy z płaszczyzną podstawy kąt $$60^\\circ$$. Wysokość ostrosłupa jest równa:`,
      latex: `a=${a}, \\alpha=60^\\circ`,
      image: StereometrySVGUtils.generateSVG({ type: "pyramid_triangle", a }),
      variables: { a, H },
      correctAnswer: `${H}`,
      distractors: [`${a}`, `${a}\\sqrt{3}`, `\\frac{${a}\\sqrt{3}}{2}`],
      steps: [
        `$$r = \\frac{a\\sqrt{3}}{6}$$`,
        `$$H = r \\cdot \\tg 60^\\circ = ${H}$$`,
      ],
    });
  }

  generateTetrahedronRegular() {
    const a = MathUtils.randomInt(1, 5) * 3;
    const mode = MathUtils.randomElement(["height", "area"]);

    if (mode === "height") {
      const hStr = `${(a / 3).toFixed(0)}\\sqrt{6}`;
      return this.createResponse({
        question: `Wysokość czworościanu foremnego o krawędzi $$a=${a}$$ jest równa:`,
        latex: `a=${a}`,
        image: StereometrySVGUtils.generateSVG({ type: "pyramid_triangle", a }),
        variables: { a },
        correctAnswer: hStr,
        distractors: [
          `${a}\\sqrt{3}`,
          `${a}\\sqrt{6}`,
          `${(a / 2).toFixed(0)}\\sqrt{3}`,
        ],
        steps: [`$$H = \\frac{a\\sqrt{6}}{3} = ${a / 3}\\sqrt{6}$$`],
      });
    } else {
      const areaStr = `${a * a}\\sqrt{3}`;
      return this.createResponse({
        question: `Pole powierzchni całkowitej czworościanu foremnego o krawędzi $$a=${a}$$ jest równe:`,
        latex: `a=${a}`,
        image: StereometrySVGUtils.generateSVG({ type: "pyramid_triangle", a }),
        variables: { a },
        correctAnswer: areaStr,
        distractors: [
          `\\frac{${a * a}\\sqrt{3}}{4}`,
          `${a * a}\\sqrt{2}`,
          `${3 * a * a}`,
        ],
        steps: [`$$P_c = 4 \\cdot \\frac{a^2\\sqrt{3}}{4} = a^2\\sqrt{3}$$`],
      });
    }
  }

  generatePrismTriangle() {
    const a = MathUtils.randomInt(2, 6) * 2;
    const H = MathUtils.randomInt(5, 12);
    const Pp_coeff = (a * a) / 4;
    const V_coeff = Pp_coeff * H;
    return this.createResponse({
      question: `Krawędź podstawy graniastosłupa prawidłowego trójkątnego ma długość $$${a}$$, a jego wysokość wynosi $$${H}$$. Objętość tego graniastosłupa jest równa:`,
      latex: `a=${a}, H=${H}`,
      image: StereometrySVGUtils.generateSVG({ type: "prism_triangle", a, H }),
      variables: { a, H, V_coeff },
      correctAnswer: `${V_coeff}\\sqrt{3}`,
      distractors: [
        `${V_coeff * 3}\\sqrt{3}`,
        `${V_coeff}\\sqrt{2}`,
        `${a * a * H}\\sqrt{3}`,
      ],
      steps: [
        `$$P_p = \\frac{a^2\\sqrt{3}}{4}$$`,
        `$$V = P_p \\cdot H = ${V_coeff}\\sqrt{3}$$`,
      ],
    });
  }
}

module.exports = PyramidsAndPrismsGenerator;
