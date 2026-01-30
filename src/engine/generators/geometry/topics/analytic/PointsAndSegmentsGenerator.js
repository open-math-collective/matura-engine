const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");
const AnalyticSVGUtils = require("./AnalyticSVGUtils");
const PointsAndSegmentsValues = require("../../values/PointsAndSegmentsValues");

class PointsAndSegmentsGenerator extends BaseGenerator {
  generateMidpointProblem() {
    const { A, B, S, lengthSquared, lengthStr } =
      PointsAndSegmentsValues.generateMidpointData(this.difficulty);

    const templates = PointsAndSegmentsValues.getMidpointTemplates(A, B);
    const question = MathUtils.randomElement(templates)();

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { A, B, S },
      correctAnswer: `S=(${S.x}, ${S.y}), |AB|=${lengthStr}`,
      distractors: PointsAndSegmentsValues.generateMidpointDistractors(
        S, B, A, lengthSquared, lengthStr
      ),
      steps: [
        `$$S=(\\frac{${A.x}+${B.x}}{2}, \\frac{${A.y}+${B.y}}{2})=(${S.x}, ${S.y})$$`,
        `$$|AB|=\\sqrt{(${B.x}-${A.x})^2+(${B.y}-${A.y})^2}=${lengthStr}$$`,
      ],
      questionType: "open",
      answerFormat: "S=(x, y), |AB|=d",
    });
  }

  generateMissingEndpoint() {
    const { A, B, S } = PointsAndSegmentsValues.generateMissingEndpointData(
      this.difficulty
    );

    const templates = PointsAndSegmentsValues.getMissingEndpointTemplates(S, A);
    const question = MathUtils.randomElement(templates)();

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { A, B, S },
      correctAnswer: `B=(${B.x}, ${B.y})`,
      distractors: PointsAndSegmentsValues.generateMissingEndpointDistractors(
        B, S, A
      ),
      steps: [
        `$$x_B = 2x_S - x_A = ${B.x}$$`,
        `$$y_B = 2y_S - y_A = ${B.y}$$`,
      ],
      questionType: "open",
      answerFormat: "B=(x, y)",
    });
  }

  generateDistanceUnknownCoord() {
    const { x1, y1, x2, m, d, dx, dy } =
      PointsAndSegmentsValues.generateDistanceUnknownCoordData(this.difficulty);

    const templates = PointsAndSegmentsValues.getDistanceUnknownCoordTemplates(
      x1, y1, x2, d
    );
    const question = MathUtils.randomElement(templates)();

    const distractors =
      PointsAndSegmentsValues.generateDistanceUnknownCoordDistractors(
        m, y1, x2, d, dy
      );

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { m, d },
      correctAnswer: `${m}`,
      distractors: distractors,
      steps: [
        `Wzór na długość odcinka: $$|AB| = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$$`,
        `Podstawiamy dane: $$${d} = \\sqrt{(${x2}-${x1})^2 + (m-${y1})^2}$$`,
        `$$${d}^2 = ${dx}^2 + (m-${y1})^2$$`,
        `$$${d * d} = ${dx * dx} + (m-${y1})^2$$`,
        `$$(m-${y1})^2 = ${dy * dy} \\implies |m-${y1}| = ${dy}$$`,
        `$$m-${y1} = ${dy} \\lor m-${y1} = -${dy}$$`,
        `$$m = ${y1 + dy} \\lor m = ${y1 - dy}$$`,
        `Jedną z wartości jest $$m=${m}$$`,
      ],
      questionType: "closed",
    });
  }

  generatePointSymmetry() {
    const { P, type, resX, resY } =
      PointsAndSegmentsValues.generatePointSymmetryData(this.difficulty);

    const templates = PointsAndSegmentsValues.getPointSymmetryTemplates(P, type);
    const question = MathUtils.randomElement(templates)();

    return this.createResponse({
      question: question,
      latex: ``,
      image: null,
      variables: { P, type },
      correctAnswer: `(${resX}, ${resY})`,
      distractors: PointsAndSegmentsValues.generatePointSymmetryDistractors(
        P, resX, resY
      ),
      steps: [
        type === "Ox"
          ? `Symetria OX: (x, -y)`
          : type === "Oy"
          ? `Symetria OY: (-x, y)`
          : `Symetria (0,0): (-x, -y)`,
      ],
      questionType: "open",
      answerFormat: "(x, y)",
    });
  }

  generateCollinearPoints() {
    const { A2, B2, a_val, b_int, m_sol, C_val_str } =
      PointsAndSegmentsValues.generateCollinearPointsData(this.difficulty);

    const templates = PointsAndSegmentsValues.getCollinearPointsTemplates(
      A2, B2, C_val_str
    );
    const question = MathUtils.randomElement(templates)();

    return this.createResponse({
      question: question,
      latex: ``,
      image: null,
      variables: { m_sol },
      correctAnswer: `m = ${m_sol}`,
      distractors: PointsAndSegmentsValues.generateCollinearPointsDistractors(
        m_sol
      ),
      steps: [
        `Wyznaczamy prostą AB.`,
        `Podstawiamy C do równania prostej $$y = ax + b$$`,
        `$$${C_val_str} = ${a_val}m + ${b_int} \\implies m=${m_sol}$$`,
      ],
      questionType: "closed",
    });
  }
}

module.exports = PointsAndSegmentsGenerator;
