const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");
const AnglesValues = require("../../values/AnglesValues");

class AnglesGenerator extends BaseGenerator {
  generateAnglesLines() {
    const { alpha, beta, mode, alphaStr, betaStr } =
      AnglesValues.generateAnglesLinesData(this.difficulty);

    const templates = AnglesValues.getAnglesLinesTemplates(mode, alphaStr);
    const question = MathUtils.randomElement(templates)();

    const distractors = AnglesValues.generateAnglesLinesDistractors(
      alpha,
      beta,
      mode,
      alphaStr,
      betaStr,
    );

    return this.createResponse({
      question: question,
      latex: ``,
      image: null,
      variables: { alpha, beta, mode },
      correctAnswer:
        mode === "vertical" ? `${alphaStr}^\\circ` : `${betaStr}^\\circ`,
      distractors: distractors,
      steps: [
        mode === "vertical"
          ? `Kąty wierzchołkowe mają tę samą miarę. $$\\beta = \\alpha = ${alphaStr}^\\circ$$.`
          : `Suma kątów przyległych wynosi $$180^\\circ$$. $$\\beta = 180^\\circ - ${alphaStr}^\\circ = ${betaStr}^\\circ$$.`,
      ],
      questionType: "closed",
    });
  }
}

module.exports = AnglesGenerator;
