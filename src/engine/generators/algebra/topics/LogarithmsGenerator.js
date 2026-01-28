const BaseGenerator = require("../../../core/BaseGenerator");
const MathUtils = require("../../../utils/MathUtils");
const LogarithmsValues = require("../values/LogarithmsValues");

class LogarithmsGenerator extends BaseGenerator {
  generateLogProblem() {
    // log_a X - log_a Y = log_a (X/Y) = result
    const { base, result, Y } = LogarithmsValues.getLogProblemValues(
      this.difficulty,
    );
    const ratio = Math.pow(base, result);

    const X = Y * ratio;

    return this.createResponse({
      question: `Wartość wyrażenia $$\\log_{${base}} ${X} - \\log_{${base}} ${Y}$$ jest równa:`,
      latex: null,
      image: null,
      variables: { base, X, Y, result },
      correctAnswer: `${result}`,
      distractors: [`${result + 1}`, `\\log_{${base}} ${X + Y}`, `${X - Y}`],
      steps: [
        `$$\\log_a b - \\log_a c = \\log_a \\frac{b}{c}$$`,
        `$$\\log_{${base}} \\frac{${X}}{${Y}} = \\log_{${base}} ${X / Y} = ${result}$$`,
      ],
      questionType: "closed",
    });
  }

  generateLogPowerRule() {
    // k * log_a (realX) - log_a (y) = result
    const { base, k, p, multiplier } = LogarithmsValues.getPowerRuleValues(
      this.difficulty,
    );
    const realX = multiplier * base;

    // total = base^p
    // log(realX^k) - log(y) = log(realX^k / y) = log(total)
    // y = realX^k / total

    let y;

    // Use BigInt for calculation to avoid precision loss
    const bigBase = BigInt(base);
    const bigRealX = BigInt(realX);
    const bigK = BigInt(k);

    if (p < 0) {
      // y = realX^k * base^(-p) (Always integer)
      const bigPPos = BigInt(-p);
      const bigNumerator = bigRealX ** bigK;
      const bigFactor = bigBase ** bigPPos;
      const bigY = bigNumerator * bigFactor;
      y = Number(bigY);
    } else {
      const bigP = BigInt(p);
      const bigNumerator = bigRealX ** bigK;
      const bigTotal = bigBase ** bigP; // base^p

      // Check divisibility
      if (bigNumerator % bigTotal !== 0n) {
        return this.generateLogPowerRule();
      }
      y = Number(bigNumerator / bigTotal);
    }

    return this.createResponse({
      question: "Ile wynosi wartość poniższego wyrażenia?",
      latex: `${k}\\log_{${base}} ${realX} - \\log_{${base}} ${y}`,
      image: null,
      variables: { base, k, realX, y, p },
      correctAnswer: `${p}`,
      distractors: [
        `${p + 1}`,
        `\\log_{${base}} ${realX * k - y}`,
        `${Math.floor(realX / y)}`,
      ],
      steps: [
        `Korzystamy ze wzoru $$r \\log_a b = \\log_a b^r$$:`,
        `$$${k}\\log_{${base}} ${realX} = \\log_{${base}} ${realX}^${k} = \\log_{${base}} ${Math.pow(realX, k)}$$`,
        `Teraz odejmujemy logarytmy: $$\\log_a b - \\log_a c = \\log_a \\frac{b}{c}$$`,
        `$$\\log_{${base}} ${Math.pow(realX, k)} - \\log_{${base}} ${y} = \\log_{${base}} \\frac{${Math.pow(realX, k)}}{${y}} = \\log_{${base}} ${Math.pow(base, p)}$$`,
        `$$${base}^x = ${Math.pow(base, p)} \\implies x = ${p}$$`,
      ],
      questionType: "closed",
    });
  }
}

module.exports = LogarithmsGenerator;
