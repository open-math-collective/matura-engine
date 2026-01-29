const BaseGenerator = require("../../../../core/BaseGenerator");
const ExponentialFunctionValues = require("../../values/ExponentialFunctionValues");

class ExponentialFunctionGenerator extends BaseGenerator {
  generateExponentialParam() {
    const { x, a, yLatex } =
      ExponentialFunctionValues.generateExponentialScenario(this.difficulty);

    const q = ExponentialFunctionValues.getExponentialParamTemplates(x, yLatex);
    const distractors = ExponentialFunctionValues.generateDistractors(
      `${a}`,
      x,
      this.difficulty,
    );
    const steps = ExponentialFunctionValues.generateSteps(x, a, yLatex);

    return this.createResponse({
      question: q,
      latex: null,
      image: null,
      variables: { x, a, y: yLatex },
      correctAnswer: `${a}`,
      distractors: distractors,
      steps: steps,
      questionType: "open",
      answerFormat: "number",
    });
  }
}

module.exports = ExponentialFunctionGenerator;
