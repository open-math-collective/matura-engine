const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");
const AnalyticSVGUtils = require("./AnalyticSVGUtils");
const ShapesCoordsValues = require("../../values/ShapesCoordsValues");

class ShapesCoordsGenerator extends BaseGenerator {
  generateCircleProblem() {
    const { S, r, eq } = ShapesCoordsValues.generateCircleData(
      this.difficulty
    );

    const templates = ShapesCoordsValues.getCircleTemplates();
    const question = MathUtils.randomElement(templates)();

    return this.createResponse({
      question: question,
      latex: eq,
      image: null,
      variables: { S, r },
      correctAnswer: `S=(${S.x},${S.y}), r=${r}`,
      distractors: ShapesCoordsValues.generateCircleDistractors(S, r),
      steps: [
        `$$(x-a)^2+(y-b)^2=r^2$$`,
        `$$a=${S.x}, b=${S.y}, r=${r}$$`,
      ],
      questionType: "open",
      answerFormat: "S=(x, y), r=d",
    });
  }

  generateCircleTangentToAxis() {
    const { S, axis, r } = ShapesCoordsValues.generateCircleTangentData(
      this.difficulty
    );

    const templates = ShapesCoordsValues.getCircleTangentTemplates(S, axis);
    const question = MathUtils.randomElement(templates)();

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { S, axis, r },
      correctAnswer: `${r}`,
      distractors: ShapesCoordsValues.generateCircleTangentDistractors(
        S,
        axis,
        r
      ),
      steps: [
        `Odległość środka od osi $$${axis}$$ jest równa promieniowi. $$r = |${axis === "Ox" ? S.y : S.x}| = ${r}$$`,
      ],
      questionType: "closed",
    });
  }

  generateRadiusFromEquation() {
    const { rSq, rStr, a, b } = ShapesCoordsValues.generateRadiusFromEquationData(
      this.difficulty
    );

    const templates = ShapesCoordsValues.getRadiusFromEquationTemplates(rSq, a, b);
    const question = MathUtils.randomElement(templates)();

    return this.createResponse({
      question: question,
      latex: ``,
      image: null,
      variables: { rSq, a, b },
      correctAnswer: rStr,
      distractors: ShapesCoordsValues.generateRadiusFromEquationDistractors(
        rSq
      ),
      steps: [`$$r^2 = ${rSq} \\implies r = ${rStr}$$`],
      questionType: "closed",
    });
  }

  generateParallelogramVertex() {
    const { A, B, C, D } = ShapesCoordsValues.generateParallelogramVertexData(
      this.difficulty
    );

    const templates = ShapesCoordsValues.getParallelogramVertexTemplates(
      A,
      B,
      C
    );
    const question = MathUtils.randomElement(templates)();

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { D },
      correctAnswer: `(${D.x}, ${D.y})`,
      distractors: ShapesCoordsValues.generateParallelogramVertexDistractors(
        A,
        B,
        C,
        D
      ),
      steps: [
        `$$x_D = x_A + x_C - x_B = ${D.x}$$`,
        `$$y_D = y_A + y_C - y_B = ${D.y}$$`,
      ],
      questionType: "open",
      answerFormat: "(x, y)",
    });
  }

  generateTriangleAreaCoords() {
    const {
      x1,
      y1,
      x2,
      y2,
      x3,
      y3,
      base,
      h,
      area,
      isHorizontal,
    } = ShapesCoordsValues.generateTriangleAreaCoordsData(this.difficulty);

    const templates = ShapesCoordsValues.getTriangleAreaCoordsTemplates(
      x1,
      y1,
      x2,
      y2,
      x3,
      y3
    );
    const question = MathUtils.randomElement(templates)();

    const distractors = ShapesCoordsValues.generateTriangleAreaCoordsDistractors(
      area,
      base,
      h
    );

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { area },
      correctAnswer: `${area}`,
      distractors: distractors,
      steps: [
        isHorizontal
          ? `Podstawa AB pozioma, długość ${base}. Wysokość h=${h}. Pole = ${area}.`
          : `Podstawa AB pionowa, długość ${base}. Wysokość h=${h}. Pole = ${area}.`,
      ],
      questionType: "closed",
    });
  }
}

module.exports = ShapesCoordsGenerator;
