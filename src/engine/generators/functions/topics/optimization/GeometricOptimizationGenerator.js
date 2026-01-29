const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");
const GeometricOptimizationValues = require("../../values/GeometricOptimizationValues");

class GeometricOptimizationGenerator extends BaseGenerator {
  generateFencingProblem() {
    const params = GeometricOptimizationValues.getFencingParams(
      this.difficulty,
    );

    const L = MathUtils.randomInt(params.rangeL[0], params.rangeL[1]);
    const x = L / 12;
    const y = (L - 6 * x) / 4;
    const maxArea = 3 * x * y;

    const templateFn = MathUtils.randomElement(
      GeometricOptimizationValues.getFencingTemplates(),
    );

    const distractors = GeometricOptimizationValues.generateFencingDistractors(
      x,
      y,
      L,
    );

    return this.createResponse({
      question: templateFn(L, x, y),
      latex: null,
      image: GeometricOptimizationValues.generateFencingSVG(),
      variables: { L, x, y, maxArea },
      correctAnswer: `x=${x}, y=${y}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `x=${x}, y=${y}`,
        distractors,
        () =>
          `x=${x + MathUtils.randomInt(-2, 2)} m, y=${y + MathUtils.randomInt(-2, 2)} m`,
      ),
      steps: [
        `Równanie długości siatki: $$6x + 4y = ${L}$$ (4 ściany zewnętrzne + 2 wewnętrzne).`,
        `$$y = ${L / 4} - 1.5x$$ (wyznaczamy y z równania).`,
        `Pole całkowite 3 wybiegów: $$P = 3xy = 3x(${L / 4} - 1.5x) = ${(3 * L) / 4}x - 4.5x^2$$.`,
        `To funkcja kwadratowa $$P(x) = -4.5x^2 + ${(3 * L) / 4}x$$ o ramionach w dół.`,
        `Wierzchołek paraboli (maksimum): $$p = \\frac{-b}{2a} = \\frac{-${(3 * L) / 4}}{2 \\cdot (-4.5)} = ${x}$$.`,
        `$$y = ${L / 4} - 1.5 \\cdot ${x} = ${y}$$ m.`,
      ],
      questionType: "open",
      answerFormat: "x=a, y=b",
    });
  }

  generateCuboidProblem() {
    const params = GeometricOptimizationValues.getCuboidParams(this.difficulty);

    const S = MathUtils.randomInt(params.rangeS[0], params.rangeS[1]);
    const a = S / 12;
    const h = S / 4 - 2 * a;
    const Pc = 2 * a * a + 4 * a * h;

    const templateFn = MathUtils.randomElement(
      GeometricOptimizationValues.getCuboidTemplates(),
    );

    const distractors = GeometricOptimizationValues.generateCuboidDistractors(
      a,
      S,
    );

    return this.createResponse({
      question: templateFn(S, a, h),
      latex: null,
      image: GeometricOptimizationValues.generateCuboidSVG(),
      variables: { S, a, h, Pc },
      correctAnswer: `x = ${a}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `x = ${a}`,
        distractors,
        () => `x = ${Math.max(1, a + MathUtils.randomInt(-2, 2))}`,
      ),
      steps: [
        `Prostopadłościan o podstawie kwadratowej ma 8 krawędzi podstawy (4 na dole, 4 na górze) i 4 krawędzie boczne.`,
        `Suma krawędzi: $$8x + 4h = ${S}$$, więc $$h = ${S / 4} - 2x$$.`,
        `Pole powierzchni całkowitej: $$P(x) = 2x^2 + 4xh = 2x^2 + 4x(${S / 4} - 2x) = -6x^2 + ${S}x$$.`,
        `Funkcja $$P(x) = -6x^2 + ${S}x$$ ma maksimum w wierzchołku.`,
        `$$p = \\frac{-b}{2a} = \\frac{-${S}}{2 \\cdot (-6)} = ${a}$$.`,
        `Optymalna długość krawędzi podstawy: $$x = ${a}$$.`,
      ],
      questionType: "open",
      answerFormat: "x=a",
    });
  }

  generateTrapezoidProblem() {
    const params = GeometricOptimizationValues.getTrapezoidParams(
      this.difficulty,
    );

    const a = MathUtils.randomInt(params.rangeA[0], params.rangeA[1]);
    const S = a + MathUtils.randomInt(6, 30) * 2;
    const h_opt = (a + S) / 2;
    const b_opt = S - h_opt;

    const templateFn = MathUtils.randomElement(
      GeometricOptimizationValues.getTrapezoidTemplates(),
    );

    const distractors =
      GeometricOptimizationValues.generateTrapezoidDistractors(h_opt, b_opt, S);

    return this.createResponse({
      question: templateFn(a, S, h_opt, b_opt),
      latex: null,
      image: GeometricOptimizationValues.generateTrapezoidSVG({
        a,
        b: b_opt,
        h: h_opt,
      }),
      variables: { a, S, h_opt, b_opt },
      correctAnswer: `h = ${h_opt}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `h = ${h_opt}`,
        distractors,
        () => `h = ${Math.max(1, h_opt + MathUtils.randomInt(-3, 3))}`,
      ),
      steps: [
        `Oznaczmy: $$a = ${a}$$ dm (dłuższa podstawa), $$b + h = ${S}$$ (warunek z treści).`,
        `Krótsza podstawa: $$b = ${S} - h$$.`,
        `Pole trapezu: $$P(h) = \\frac{a + b}{2} \\cdot h = \\frac{${a} + ${S} - h}{2} \\cdot h = -0.5h^2 + ${(a + S) / 2}h$$.`,
        `Funkcja kwadratowa $$P(h) = -0.5h^2 + ${(a + S) / 2}h$$ ma maksimum w wierzchołku.`,
        `$$p = \\frac{-b}{2a} = \\frac{-${(a + S) / 2}}{2 \\cdot (-0.5)} = ${h_opt}$$.`,
        `Optymalna wysokość: $$h = ${h_opt}$$ dm.`,
      ],
      questionType: "open",
      answerFormat: "h=a",
    });
  }
}

module.exports = GeometricOptimizationGenerator;
