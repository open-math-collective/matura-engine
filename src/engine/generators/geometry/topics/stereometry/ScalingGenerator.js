const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");

class ScalingGenerator extends BaseGenerator {
  generateScalingProblem() {
    const k = MathUtils.randomElement([2, 3, 4]);
    const type = MathUtils.randomElement(["volume", "area"]);
    const factor = type === "volume" ? k * k * k : k * k;
    return this.createResponse({
      question: `Jeśli krawędź bryły zwiększymy $$${k}$$-krotnie, to jej ${type === "volume" ? "objętość" : "pole powierzchni"} zwiększy się:`,
      latex: `k=${k}`,
      image: null,
      variables: { k, factor },
      correctAnswer: `${factor}-krotnie`,
      distractors: [
        `${k}-krotnie`,
        `${k * 2}-krotnie`,
        `${type === "volume" ? k * k : k * 3}-krotnie`,
      ],
      steps: [
        `Stosunek ${type === "volume" ? "objętości" : "pól"} brył podobnych to $$k^${type === "volume" ? 3 : 2}$$`,
        `$$${k}^${type === "volume" ? 3 : 2} = ${factor}$$`,
      ],
    });
  }
}

module.exports = ScalingGenerator;
