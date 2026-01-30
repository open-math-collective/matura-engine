const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");
const QuadrilateralsValues = require("../../values/QuadrilateralsValues");

class QuadrilateralsGenerator extends BaseGenerator {
  generateRhombus() {
    const { d1, d2, area, areaStr } = QuadrilateralsValues.generateRhombusData(
      this.difficulty,
    );

    const templates = QuadrilateralsValues.getRhombusTemplates(d1, d2);
    const question = MathUtils.randomElement(templates)();
    const distractors = QuadrilateralsValues.generateRhombusDistractors(
      d1,
      d2,
      area,
    );

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { d1, d2 },
      correctAnswer: areaStr,
      distractors: distractors,
      steps: [
        `$$P = \\frac{d_1 d_2}{2} = \\frac{${d1} \\cdot ${d2}}{2} = ${areaStr}$$`,
      ],
      questionType: "closed",
    });
  }

  generateRhombusAngles() {
    const { angle, obtuse } = QuadrilateralsValues.generateRhombusAnglesData(
      this.difficulty,
    );

    const templates = QuadrilateralsValues.getRhombusAnglesTemplates(angle);
    const question = MathUtils.randomElement(templates)();
    const distractors = QuadrilateralsValues.generateRhombusAnglesDistractors(
      angle,
      obtuse,
    );

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { alpha: angle, obtuse },
      correctAnswer: `${obtuse}^\\circ`,
      distractors: distractors,
      steps: [
        `Przekątna jest dwusieczną kąta ostrego. Cały kąt ostry: $$2 \\cdot ${angle}^\\circ = ${2 * angle}^\\circ$$.`,
        `Suma kątów przy ramieniu to $$180^\\circ$$. Kąt rozwarty: $$180^\\circ - ${2 * angle}^\\circ = ${obtuse}^\\circ$$`,
      ],
      questionType: "open",
      answerFormat: "α=angle^\\circ",
    });
  }

  generateParallelogramNeighbor() {
    const { alpha, beta } = QuadrilateralsValues.generateParallelogramData(
      this.difficulty,
    );

    const templates = QuadrilateralsValues.getParallelogramTemplates(alpha);
    const question = MathUtils.randomElement(templates)();
    const distractors = QuadrilateralsValues.generateParallelogramDistractors(
      alpha,
      beta,
    );

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { alpha, beta },
      correctAnswer: `${beta}^\\circ`,
      distractors: distractors,
      steps: [`$$180^\\circ - ${alpha}^\\circ = ${beta}^\\circ$$`],
      questionType: "closed",
    });
  }

  generateTrapezoidArea() {
    const { a, b, h, area, areaStr } =
      QuadrilateralsValues.generateTrapezoidData(this.difficulty);

    const templates = QuadrilateralsValues.getTrapezoidTemplates(a, b, h);
    const question = MathUtils.randomElement(templates)();
    const distractors = QuadrilateralsValues.generateTrapezoidDistractors(
      a,
      b,
      h,
      area,
    );

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { a, b, h, area },
      correctAnswer: areaStr,
      distractors: distractors,
      steps: [`$$P = \\frac{${a}+${b}}{2} \\cdot ${h} = ${areaStr}$$`],
      questionType: "closed",
    });
  }

  generateQuadrilateralAngles() {
    const { alpha, beta } = QuadrilateralsValues.generateQuadAnglesData(
      this.difficulty,
    );

    const templates = QuadrilateralsValues.getQuadAnglesTemplates(alpha);
    const question = MathUtils.randomElement(templates)();
    const distractors =
      QuadrilateralsValues.generateQuadAnglesDistractors(alpha);

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { alpha },
      correctAnswer: `α=${beta}^\\circ`,
      distractors: distractors,
      steps: [`$$180^\\circ - ${alpha}^\\circ$$`],
      questionType: "open",
      answerFormat: "α=angle^\\circ",
    });
  }

  generateCyclicQuadrilateral() {
    const { alpha, gamma } = QuadrilateralsValues.generateCyclicData(
      this.difficulty,
    );

    const templates = QuadrilateralsValues.getCyclicTemplates(alpha);
    const question = MathUtils.randomElement(templates)();
    const distractors = QuadrilateralsValues.generateCyclicDistractors(
      alpha,
      gamma,
    );

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { alpha, gamma },
      correctAnswer: `${gamma}^\\circ`,
      distractors: distractors,
      steps: [`$$180^\\circ - ${alpha}^\\circ = ${gamma}^\\circ$$`],
      questionType: "closed",
    });
  }

  generateTangentialQuadrilateral() {
    const { a, b, c, d } = QuadrilateralsValues.generateTangentialData(
      this.difficulty,
    );

    const templates = QuadrilateralsValues.getTangentialTemplates(a, b, c);
    const question = MathUtils.randomElement(templates)();
    const distractors = QuadrilateralsValues.generateTangentialDistractors(
      a,
      b,
      c,
      d,
    );

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { a, b, c, d },
      correctAnswer: `${d}`,
      distractors: distractors,
      steps: [`$$a+c = b+d \\implies d = ${a}+${c}-${b} = ${d}$$`],
      questionType: "closed",
    });
  }
}

module.exports = QuadrilateralsGenerator;
