const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");
const PlanimetrySVGUtils = require("./PlanimetrySVGUtils");
const CirclesValues = require("../../values/CirclesValues");

class CirclesGenerator extends BaseGenerator {
  generateCircleAngles() {
    const { alpha, beta, mode, aStr, bStr } =
      CirclesValues.generateCircleAnglesData(this.difficulty);

    const templates = CirclesValues.getCircleAnglesTemplates(mode, aStr, bStr);
    const question = MathUtils.randomElement(templates)();
    const distractors = CirclesValues.generateCircleAnglesDistractors(
      alpha,
      beta,
      mode,
      aStr,
      bStr,
    );

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { alpha, beta, mode },
      correctAnswer:
        mode === "find_central" ? `${bStr}^\\circ` : `${aStr}^\\circ`,
      distractors: distractors,
      steps: [
        `Zależność: $$\\beta = 2\\alpha$$`,
        mode === "find_central"
          ? `$$\\beta = 2 \\cdot ${aStr}^\\circ = ${bStr}^\\circ$$`
          : `$$\\alpha = ${bStr}^\\circ : 2 = ${aStr}^\\circ$$`,
      ],
      questionType: "closed",
    });
  }

  generateCircleAreaCircumference() {
    const { r, mode, area, circ } = CirclesValues.generateCircleAreaData(
      this.difficulty,
    );

    const templates = CirclesValues.getCircleAreaTemplates(mode, r, area);
    const question = MathUtils.randomElement(templates)();
    const distractors = CirclesValues.generateCircleAreaDistractors(r, mode);

    let correctAnswer, steps, image, latex;

    if (mode === "area_from_r") {
      correctAnswer = `${area}\\pi`;
      steps = [`$$P = \\pi r^2 = \\pi \\cdot ${r}^2 = ${area}\\pi$$`];
      image = PlanimetrySVGUtils.generateSVG({ type: "circle_r", r });
      latex = `r=${r}`;
    } else if (mode === "circ_from_r") {
      correctAnswer = `${circ}\\pi`;
      steps = [`$$L = 2\\pi r = 2\\pi \\cdot ${r} = ${circ}\\pi$$`];
      image = PlanimetrySVGUtils.generateSVG({ type: "circle_r", r });
      latex = `r=${r}`;
    } else {
      correctAnswer = `${r}`;
      steps = [`$$P = \\pi r^2 \\implies r^2 = ${area} \\implies r = ${r}$$`];
      image = null;
      latex = null;
    }

    return this.createResponse({
      question: question,
      latex: latex,
      image: image,
      variables: { r, mode },
      correctAnswer: correctAnswer,
      distractors: distractors,
      steps: steps,
      questionType: "closed",
    });
  }

  generateSectorArea() {
    const { niceR, alpha, niceSector, niceSectorStr, niceTotal } =
      CirclesValues.generateSectorAreaData(this.difficulty);

    const templates = CirclesValues.getSectorAreaTemplates(niceR, alpha);
    const question = MathUtils.randomElement(templates)();
    const distractors = CirclesValues.generateSectorAreaDistractors(
      niceSector,
      niceTotal,
      niceSectorStr,
    );

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { niceR, alpha },
      correctAnswer: `${niceSectorStr}\\pi`,
      distractors: distractors,
      steps: [
        `$$P_w = \\frac{${alpha}}{360} \\cdot \\pi \\cdot ${niceR}^2 = ${niceSectorStr}\\pi$$`,
      ],
      questionType: "closed",
    });
  }

  generateArcLength() {
    const { niceR, alpha, niceLen, niceLenStr } =
      CirclesValues.generateArcLengthData(this.difficulty);

    const templates = CirclesValues.getArcLengthTemplates(niceR, alpha);
    const question = MathUtils.randomElement(templates)();
    const distractors = CirclesValues.generateArcLengthDistractors(
      niceLen,
      niceR,
      niceLenStr,
    );

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { niceR, alpha },
      correctAnswer: `${niceLenStr}\\pi`,
      distractors: distractors,
      steps: [
        `Wzór: $$L = \\frac{\\alpha}{360^\\circ} \\cdot 2\\pi r$$`,
        `$$L = \\frac{${alpha}}{360} \\cdot 2\\pi \\cdot ${niceR} = ${niceLenStr}\\pi$$`,
      ],
      questionType: "closed",
    });
  }

  generateThalesTheorem() {
    const { alpha, beta } = CirclesValues.generateThalesData(this.difficulty);

    const templates = CirclesValues.getThalesTemplates(alpha);
    const question = MathUtils.randomElement(templates)();
    const distractors = CirclesValues.generateThalesDistractors(alpha, beta);

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { alpha, beta },
      correctAnswer: `${beta}^\\circ`,
      distractors: distractors,
      steps: [`Kąt $$C = 90^\\circ$$. $$\\beta = 90 - ${alpha} = ${beta}$$`],
      questionType: "closed",
    });
  }

  generateCircleTangent() {
    const { r, x, d, mode } = CirclesValues.generateTangentData(
      this.difficulty,
    );

    const templates = CirclesValues.getTangentTemplates(mode, r, x, d);
    const question = MathUtils.randomElement(templates)();
    const distractors = CirclesValues.generateTangentDistractors(r, x, d, mode);

    return this.createResponse({
      question: question,
      latex: null,
      image: PlanimetrySVGUtils.generateSVG({
        type: "circle_tangent",
        r,
        d,
        x,
      }),
      variables: { r, x, d, mode },
      correctAnswer: mode === "find_tangent" ? `${x}` : `${d}`,
      distractors: distractors,
      steps: [`$$r^2 + x^2 = d^2$$`],
      questionType: "closed",
    });
  }
}

module.exports = CirclesGenerator;
