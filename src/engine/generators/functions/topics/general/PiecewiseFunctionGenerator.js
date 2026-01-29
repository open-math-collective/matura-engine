const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");
const PiecewiseFunctionValues = require("../../values/PiecewiseFunctionValues");

class PiecewiseFunctionGenerator extends BaseGenerator {
  generatePiecewiseFunction() {
    const { cut, f1_tex, f2_tex, val1, val2, res1, res2 } =
      PiecewiseFunctionValues.generatePiecewiseScenario(this.difficulty);

    const total = res1 + res2;

    const q = PiecewiseFunctionValues.getPiecewiseTemplates(
      cut,
      f1_tex,
      f2_tex,
      val1,
      val2,
    );

    const steps = PiecewiseFunctionValues.generateSteps(
      cut,
      val1,
      val2,
      f1_tex,
      f2_tex,
      res1,
      res2,
    );

    return this.createResponse({
      question: q,
      latex: ``,
      image: null,
      variables: { cut, val1, val2, res1, res2 },
      correctAnswer: `${total}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `${total}`,
        [
          `${res1 - res2}`,
          `${res1 * res2}`,
          `${total + 2}`,
          `${total - 2}`,
          `${Math.abs(res1 - res2)}`,
        ],
        () => `${total + MathUtils.randomInt(-10, 10)}`,
      ),
      steps: steps,
      questionType: "closed",
    });
  }
}

module.exports = PiecewiseFunctionGenerator;
