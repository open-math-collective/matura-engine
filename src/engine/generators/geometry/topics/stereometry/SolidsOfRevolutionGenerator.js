const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");
const StereometrySVGUtils = require("./StereometrySVGUtils");

class SolidsOfRevolutionGenerator extends BaseGenerator {
  generateConeProblem() {
    const triples = [
      [3, 4, 5],
      [5, 12, 13],
      [6, 8, 10],
      [8, 15, 17],
    ];
    const [r, h, l] = MathUtils.randomElement(triples);
    const mode = MathUtils.randomElement(["find_l", "find_h"]);
    return this.createResponse({
      question:
        mode === "find_l"
          ? `Wysokość stożka $$h=${h}$$, promień $$r=${r}$$. Tworząca $$l$$ ma długość:`
          : `Tworząca stożka $$l=${l}$$, promień $$r=${r}$$. Wysokość $$h$$ wynosi:`,
      latex: mode === "find_l" ? `h=${h}, r=${r}` : `l=${l}, r=${r}`,
      image: StereometrySVGUtils.generateSVG({ type: "cone", r, h }),
      variables: { r, h, l },
      correctAnswer: mode === "find_l" ? `${l}` : `${h}`,
      distractors: [
        `${r + h}`,
        `${Math.abs(h - r)}`,
        `${Math.sqrt(h * h + r * r).toFixed(1)}`,
      ],
      steps: [
        `Z twierdzenia Pitagorasa: $$r^2 + h^2 = l^2$$`,
        `Podstawiamy dane i obliczamy brakujący bok.`,
      ],
    });
  }

  generateCylinderProblem() {
    const r = MathUtils.randomInt(2, 6);
    const h = 2 * r;
    const V = r * r * h;
    return this.createResponse({
      question: `Przekrój osiowy walca jest kwadratem o boku $$${h}$$. Objętość walca wynosi:`,
      latex: `H=2r=${h}`,
      image: StereometrySVGUtils.generateSVG({ type: "cylinder", r, h }),
      variables: { r, h, V },
      correctAnswer: `${V}\\pi`,
      distractors: [`${V}`, `${2 * r * h}\\pi`, `${h * h}\\pi`],
      steps: [
        `$$2r = ${h} \\implies r = ${r}$$`,
        `$$V = \\pi r^2 H = \\pi \\cdot ${r}^2 \\cdot ${h} = ${V}\\pi$$`,
      ],
    });
  }

  generateCylinderSectionDiagonal() {
    const triples = [
      [3, 4, 5],
      [6, 8, 10],
      [5, 12, 13],
      [8, 15, 17],
    ];
    const [base, height, diag] = MathUtils.randomElement(triples);
    const isBaseDiameter = MathUtils.randomElement([true, false]);
    const r = isBaseDiameter ? base / 2 : height / 2;
    const h = isBaseDiameter ? height : base;

    return this.createResponse({
      question: `Przekrój osiowy walca jest prostokątem o wymiarach $$${2 * r} \\times ${h}$$ (średnica $$\\times$$ wysokość). Długość przekątnej tego przekroju jest równa:`,
      latex: `2r=${2 * r}, h=${h}`,
      image: StereometrySVGUtils.generateSVG({
        type: "cylinder_section",
        r,
        h,
      }),
      variables: { r, h, diag },
      correctAnswer: `${diag}`,
      distractors: [
        `${Math.sqrt(r * r + h * h).toFixed(1)}`,
        `${2 * r + h}`,
        `${diag + 2}`,
      ],
      steps: [
        `Boki prostokąta: $$a = 2r = ${2 * r}$$, $$b = h = ${h}$$.`,
        `Z twierdzenia Pitagorasa dla przekątnej $$d$$: $$d = \\sqrt{a^2 + b^2}$$`,
        `$$d = \\sqrt{${2 * r}^2 + ${h}^2} = \\sqrt{${diag * diag}} = ${diag}$$`,
      ],
    });
  }

  generateSphereProblem() {
    const r = MathUtils.randomInt(2, 6);
    const type = MathUtils.randomElement(["volume", "area"]);
    if (type === "volume") {
      const niceR = MathUtils.randomElement([3, 6]);
      const V = (4 * Math.pow(niceR, 3)) / 3;
      return this.createResponse({
        question: `Promień kuli jest równy $$${niceR}$$. Objętość tej kuli wynosi:`,
        latex: `r=${niceR}`,
        image: StereometrySVGUtils.generateSVG({ type: "sphere", r: niceR }),
        variables: { r: niceR, V },
        correctAnswer: `${V}\\pi`,
        distractors: [
          `${(V * 3) / 4}\\pi`,
          `${4 * niceR * niceR}\\pi`,
          `${Math.pow(niceR, 3)}\\pi`,
        ],
        steps: [
          `$$V = \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi \\cdot ${Math.pow(niceR, 3)} = ${V}\\pi$$`,
        ],
      });
    } else {
      const P = 4 * r * r;
      return this.createResponse({
        question: `Promień kuli jest równy $$${r}$$. Pole powierzchni tej kuli wynosi:`,
        latex: `r=${r}`,
        image: StereometrySVGUtils.generateSVG({ type: "sphere", r }),
        variables: { r, P },
        correctAnswer: `${P}\\pi`,
        distractors: [`${r * r}\\pi`, `${2 * r * r}\\pi`, `${P / 4}\\pi`],
        steps: [`$$P = 4\\pi r^2 = 4\\pi \\cdot ${r * r} = ${P}\\pi$$`],
      });
    }
  }
}

module.exports = SolidsOfRevolutionGenerator;
