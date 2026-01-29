const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");
const TransformationsValues = require("../../values/TransformationsValues");

class TransformationsGenerator extends BaseGenerator {
  generateSymmetryTransform() {
    const { type, f_latex, g_latex, dist1, dist2, dist3 } =
      TransformationsValues.generateSymmetryScenario(this.difficulty);

    const q = TransformationsValues.getSymmetryTemplates(type, f_latex);

    return this.createResponse({
      question: q,
      latex: null,
      image: null,
      variables: { type, baseFunc: f_latex },
      correctAnswer: `g(x) = ${g_latex}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `g(x) = ${g_latex}`,
        [`g(x) = ${dist1}`, `g(x) = ${dist2}`, `g(x) = ${dist3}`],
        () => `g(x) = -(${f_latex})`,
      ),
      steps: [
        type === "OX"
          ? `Symetria OX: $$g(x) = -f(x)$$`
          : type === "OY"
            ? `Symetria OY: $$g(x) = f(-x)$$`
            : `Symetria (0,0): $$g(x) = -f(-x)$$`,
        `$$g(x) = ${g_latex}$$`,
      ],
      questionType: "closed",
    });
  }

  generateFunctionShift() {
    const { p, q, baseFuncLatex, shiftedFuncLatex, dist1, dist2, dist3 } =
      TransformationsValues.generateShiftScenario(this.difficulty);

    const q_text = TransformationsValues.getShiftTemplates(baseFuncLatex, p, q);

    return this.createResponse({
      question: q_text,
      latex: ``,
      image: null,
      variables: { p, q },
      correctAnswer: `g(x) = ${shiftedFuncLatex}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `g(x) = ${shiftedFuncLatex}`,
        [`g(x) = ${dist1}`, `g(x) = ${dist2}`, `g(x) = ${dist3}`],
        () =>
          `g(x) = ${shiftedFuncLatex.replace(/[+-]\s*\d+/g, (match) => (match.startsWith("+") ? match.replace("+", "-") : match.replace("-", "+")))}`,
      ),
      steps: [
        `Wzór po przesunięciu o $$[p, q]$$: $$g(x) = f(x-p) + q$$`,
        `$$g(x) = ${shiftedFuncLatex}$$`,
      ],
      questionType: "open",
      answerFormat: "g(x) = ...",
    });
  }
}

module.exports = TransformationsGenerator;
