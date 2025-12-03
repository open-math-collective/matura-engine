const BaseGenerator = require("../../../core/BaseGenerator");
const MathUtils = require("../../../utils/MathUtils");

class LogarithmsGenerator extends BaseGenerator {
  generateLogProblem() {
    const base = MathUtils.randomElement([2, 3, 4, 5]);
    const result = MathUtils.randomInt(1, 2);
    const ratio = Math.pow(base, result);
    const Y = MathUtils.randomElement([2, 3, 4, 5]);
    const X = Y * ratio;

    return this.createResponse({
      question: "Wartość wyrażenia jest równa:",
      latex: `\\log_{${base}} ${X} - \\log_{${base}} ${Y}`,
      image: null,
      variables: { base, X, Y, result },
      correctAnswer: `${result}`,
      distractors: [`${result + 1}`, `\\log_{${base}} ${X + Y}`, `${X - Y}`],
      steps: [
        `$$\\log_a b - \\log_a c = \\log_a \\frac{b}{c}$$`,
        `$$\\log_{${base}} \\frac{${X}}{${Y}} = \\log_{${base}} ${X / Y} = ${result}$$`,
      ],
    });
  }

  generateLogPowerRule() {
    const base = MathUtils.randomElement([2, 3, 5]);
    const k = 2;
    const p = MathUtils.randomInt(1, 3);
    const x = MathUtils.randomElement([2, 3, 4, 5, 6, 10]);
    const multiplier = MathUtils.randomInt(1, 4);
    const realX = multiplier * base;
    const total = Math.pow(base, p);
    const y = Math.pow(realX, k) / total;

    return this.createResponse({
      question: "Wartość wyrażenia jest równa:",
      latex: `${k}\\log_{${base}} ${realX} - \\log_{${base}} ${y}`,
      image: null,
      variables: { base, k, realX, y, p },
      correctAnswer: `${p}`,
      distractors: [
        `${p + 1}`,
        `\\log_{${base}} ${realX * k - y}`,
        `${realX / y}`,
      ],
      steps: [
        `Korzystamy ze wzoru $$r \\log_a b = \\log_a b^r$$:`,
        `$$${k}\\log_{${base}} ${realX} = \\log_{${base}} ${realX}^${k} = \\log_{${base}} ${Math.pow(realX, k)}$$`,
        `Teraz odejmujemy logarytmy: $$\\log_a b - \\log_a c = \\log_a \\frac{b}{c}$$`,
        `$$\\log_{${base}} ${Math.pow(realX, k)} - \\log_{${base}} ${y} = \\log_{${base}} \\frac{${Math.pow(realX, k)}}{${y}} = \\log_{${base}} ${total}$$`,
        `$$${base}^x = ${total} \\implies x = ${p}$$`,
      ],
    });
  }
}

module.exports = LogarithmsGenerator;
