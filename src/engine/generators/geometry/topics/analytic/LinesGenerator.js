const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");
const LinesValues = require("../../values/LinesValues");

class LinesGenerator extends BaseGenerator {
  generateLineThroughTwoPoints() {
    const { A, B, a, b } = LinesValues.generateLineThroughTwoPointsData(
      this.difficulty,
    );

    const templates = LinesValues.getLineThroughTwoPointsTemplates();
    const question = MathUtils.randomElement(templates)();

    const eq = LinesValues.formatLineEquation(a, b);
    const correctAnswer = `y = ${eq}`;
    const distractors = LinesValues.generateLineThroughTwoPointsDistractors(
      a,
      b,
    );

    return this.createResponse({
      question: question,
      latex: `A=(${A.x}, ${A.y}), B=(${B.x}, ${B.y})`,
      image: null,
      variables: { A, B, a, b },
      correctAnswer: correctAnswer,
      distractors: distractors,
      steps: [
        `$$a = \\frac{y_B - y_A}{x_B - x_A} = \\frac{${B.y}-${A.y}}{${B.x}-${A.x}} = ${LinesValues.fractionToLatex(a)}$$`,
        `$$b = y_A - a x_A = ${A.y} - (${LinesValues.fractionToLatex(a)})\\cdot${A.x} = ${LinesValues.fractionToLatex(b)}$$`,
        `$$y = ${eq}$$`,
      ],
    });
  }

  generateParallelLine() {
    return this.generateRelativeLine("parallel");
  }

  generatePerpendicularLine() {
    return this.generateRelativeLine("perpendicular");
  }

  generateRelativeLine(mode) {
    const { a1, b1, P, a2, b2 } = LinesValues.generateRelativeLineData(
      this.difficulty,
      mode,
    );

    const eq1 = LinesValues.formatLineEquation(a1, b1);
    const eq2 = LinesValues.formatLineEquation(a2, b2);

    const templates = LinesValues.getRelativeLineTemplates(mode, P, eq1);
    const question = MathUtils.randomElement(templates)();

    const correctAnswer = `l: y=${eq2}`;
    const distractors = LinesValues.generateRelativeLineDistractors(a1, a2, b2);

    return this.createResponse({
      question: question,
      latex: `k: y=${eq1}`,
      image: null,
      variables: { a2, b2 },
      correctAnswer: correctAnswer,
      distractors: distractors,
      steps: [
        `Współczynnik kierunkowy prostej $$k$$: $$a_1 = ${LinesValues.fractionToLatex(a1)}$$`,
        mode === "parallel"
          ? `Dla prostej równoległej: $$a_2 = a_1 = ${LinesValues.fractionToLatex(a2)}$$`
          : `Dla prostej prostopadłej: $$a_2 = -\\frac{1}{a_1} = ${LinesValues.fractionToLatex(a2)}$$`,
        `Podstawiamy punkt $$P$$: $$${P.y} = ${LinesValues.fractionToLatex(a2)} \\cdot (${P.x}) + b_2$$`,
        `$$b_2 = ${LinesValues.fractionToLatex(b2)}$$`,
        `$$y = ${eq2}$$`,
      ],
      questionType: "open",
      answerFormat: "l: y=...",
    });
  }

  generateParameterMProblem() {
    const { mode, m, a1_coeff, a1_const, a2 } =
      LinesValues.generateParameterMData(this.difficulty);

    const templates = LinesValues.getParameterMTemplates(mode);
    const question = MathUtils.randomElement(templates)();

    const a2_latex = LinesValues.fractionToLatex(a2);

    return this.createResponse({
      question: question,
      latex: `l: y=(${a1_coeff}m ${a1_const >= 0 ? "+" : ""}${a1_const})x+1, \\quad k: y=${a2_latex}x-2`,
      image: null,
      variables: { m, a1_coeff, a1_const, mode },
      correctAnswer: `m=${m}`,
      distractors: LinesValues.generateParameterMDistractors(m),
      steps: [
        `Współczynniki kierunkowe: $$a_1 = ${a1_coeff}m ${a1_const >= 0 ? "+" : ""}${a1_const}$$, $$a_2 = ${a2_latex}$$`,
        `Warunek: $${mode === "parallel" ? "a_1=a_2" : "a_1 a_2 = -1"}$$`,
        `Rozwiązanie równania daje $$m=${m}$$`,
      ],
      questionType: "open",
      answerFormat: "m=...",
    });
  }

  generateIntersectionProblem() {
    const { intX, intY, a1, b1, a2, b2 } = LinesValues.generateIntersectionData(
      this.difficulty,
    );

    const templates = LinesValues.getIntersectionTemplates();
    const question = MathUtils.randomElement(templates)();

    return this.createResponse({
      question: question,
      latex: `\\begin{cases} y=x${b1 >= 0 ? "+" : ""}${b1} \\\\ y=-x${b2 >= 0 ? "+" : ""}${b2} \\end{cases}`,
      image: null,
      variables: { intX, intY },
      correctAnswer: `(${intX}, ${intY})`,
      distractors: LinesValues.generateIntersectionDistractors(intX, intY),
      steps: [
        `$$x${b1 >= 0 ? "+" : ""}${b1} = -x${b2 >= 0 ? "+" : ""}${b2}$$`,
        `$$2x = ${b2 - b1} \\implies x = ${intX}$$`,
        `$$y = ${intX} ${b1 >= 0 ? "+" : ""}${b1} = ${intY}$$`,
      ],
      questionType: "open",
      answerFormat: "(x, y)",
    });
  }

  generateSlopeAngle() {
    const { angle, b, eq, sel } = LinesValues.generateSlopeAngleData(
      this.difficulty,
    );

    const templates = LinesValues.getSlopeAngleTemplates(eq);
    const question = MathUtils.randomElement(templates)();

    const distractors = LinesValues.generateSlopeAngleDistractors(angle);

    return this.createResponse({
      question: question,
      latex: ``,
      image: null,
      variables: { angle: sel.ang, a_latex: sel.tan, b },
      correctAnswer: `${sel.ang}^\\circ`,
      distractors: distractors,
      steps: [
        `Współczynnik kierunkowy $$a = \\tg\\alpha$$.`,
        `$$a = ${sel.tan} \\implies \\alpha = ${sel.ang}^\\circ$$`,
      ],
      questionType: "closed",
    });
  }

  generatePointOnLineParam() {
    const { a, b, x, y } = LinesValues.generatePointOnLineData();
    const eq = LinesValues.formatLineEquation(a, b);

    const templates = LinesValues.getPointOnLineTemplates(x, eq);
    const question = MathUtils.randomElement(templates)();

    const distractors = LinesValues.generatePointOnLineDistractors(y, a, x, b);

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { a, b, x, m_val: y },
      correctAnswer: `${y}`,
      distractors: distractors,
      steps: [
        `Podstawiamy $$x=${x}$$ do wzoru:`,
        `$$m = ${a}\\cdot(${x}) ${b >= 0 ? "+" : ""}${b} = ${y}$$`,
      ],
      questionType: "closed",
    });
  }

  generateIntersectionWithAxes() {
    const { a, b, root, axis } = LinesValues.generateIntersectionWithAxesData(
      this.difficulty,
    );

    const eq = LinesValues.formatLineEquation(a, b);

    const templates = LinesValues.getIntersectionWithAxesTemplates(eq, axis);
    const question = MathUtils.randomElement(templates)();

    return this.createResponse({
      question: question,
      latex: ``,
      image: null,
      variables: { a, b, axis },
      correctAnswer: axis === "Oy" ? `(0, ${b})` : `(${root}, 0)`,
      distractors: LinesValues.generateIntersectionWithAxesDistractors(
        root,
        b,
        axis,
      ),
      steps: [
        axis === "Oy"
          ? `$$x=0 \\implies y=${b}$$`
          : `$$y=0 \\implies ax+b=0 \\implies x=${root}$$`,
      ],
      questionType: "open",
      answerFormat: "(x, y)",
    });
  }

  generatePerpendicularCoeff() {
    const { num, den, sign } = LinesValues.generatePerpendicularCoeffData();

    const a1_eq_latex = LinesValues.formatCoeffForEquation(num, den, sign);
    const a1_val_latex = LinesValues.formatCoeffAsValue(num, den, sign);

    const num2 = den;
    const den2 = num;
    const sign2 = -sign;
    const a2_val_latex = LinesValues.formatCoeffAsValue(num2, den2, sign2);

    const templates = LinesValues.getPerpendicularCoeffTemplates(a1_eq_latex);
    const question = MathUtils.randomElement(templates)();

    const distractors = LinesValues.generatePerpendicularCoeffDistractors(
      num,
      den,
      sign,
      a2_val_latex,
    );

    return this.createResponse({
      question: question,
      latex: ``,
      image: null,
      variables: {},
      correctAnswer: a2_val_latex,
      distractors: distractors,
      steps: [
        `Współczynnik kierunkowy danej prostej to $$a_1 = ${a1_val_latex}$$.`,
        `Warunkiem prostopadłości prostych jest $$a_1 \\cdot a_2 = -1$$.`,
        `Szukamy $$a_2$$:`,
        `$$a_2 = -\\frac{1}{a_1} = -\\frac{1}{${a1_val_latex}} = ${a2_val_latex}$$`,
      ],
      questionType: "closed",
    });
  }

  generateBisector() {
    const templates = LinesValues.getBisectorTemplates();
    const question = MathUtils.randomElement(templates)();

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { S: { x: 0, y: 2 } },
      correctAnswer: `y=-x+2`,
      distractors: LinesValues.generateBisectorDistractors(),
      steps: [
        `Środek $$S(0,2)$$`,
        `$$a_{AB}=1 \\implies a_{sym}=-1$$`,
        `Podstawiamy S do $$y=-x+b$$`,
      ],
      questionType: "open",
      answerFormat: "y=...",
    });
  }

  generateNiceLinePoints() {
    const x1 = MathUtils.randomInt(-5, 5),
      y1 = MathUtils.randomInt(-5, 5);
    const dx = MathUtils.randomElement([1, 2, 3]),
      dy = MathUtils.randomInt(-4, 4);
    return {
      A: { x: x1, y: y1 },
      B: { x: x1 + dx, y: y1 + dy },
      a: dy / dx,
      b: y1 - (dy / dx) * x1,
    };
  }
}

module.exports = LinesGenerator;
