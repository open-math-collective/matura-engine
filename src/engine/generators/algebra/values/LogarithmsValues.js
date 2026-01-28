const MathUtils = require("../../../utils/MathUtils");

class LogarithmsValues {
  /**
   * Generates parameters for basic log problems: log_a X - log_a Y = result.
   * @param {string} difficulty - The difficulty level.
   * @returns {Object} An object containing base, result, Y.
   */
  static getLogProblemValues(difficulty) {
    let bases, resultRange, yRange;
    let useFractionBase = false;

    if (difficulty === "easy") {
      bases = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
      resultRange = [1, 3];
      yRange = [2, 50];
    } else if (difficulty === "hard") {
      useFractionBase = Math.random() < 0.4;
      bases = Array.from({ length: 49 }, (_, i) => i + 2); // 2..50
      resultRange = [-4, 5];
      yRange = [5, 1000];
    } else {
      bases = Array.from({ length: 19 }, (_, i) => i + 2); // 2..20
      resultRange = [1, 4];
      yRange = [2, 200];
    }

    let base = MathUtils.randomElement(bases);
    if (useFractionBase) {
      base = 1 / base;
    }

    const result = MathUtils.randomInt(resultRange[0], resultRange[1]);
    const Y = MathUtils.randomInt(yRange[0], yRange[1]);

    return { base, result, Y };
  }

  /**
   * Generates parameters for Power Rule problems: k * log_a (realX) - log_a (y).
   * @param {string} difficulty - The difficulty level.
   * @returns {Object} An object containing base, k, p, multiplier.
   */
  static getPowerRuleValues(difficulty) {
    let bases, kOptions, pRange, multRange;

    if (difficulty === "easy") {
      bases = [2, 3, 4, 5, 6, 8, 10];
      kOptions = [2, 3];
      pRange = [1, 4];
      multRange = [1, 30];
    } else if (difficulty === "hard") {
      bases = Array.from({ length: 30 }, (_, i) => i + 2); // 2..31
      kOptions = [2, 3, 4];
      pRange = [-5, 8];
      multRange = [1, 100];
    } else {
      bases = [2, 3, 4, 5, 6, 8, 9, 10];
      kOptions = [2, 3];
      pRange = [1, 5];
      multRange = [1, 50];
    }

    const base = MathUtils.randomElement(bases);
    const k = MathUtils.randomElement(kOptions);

    // p != 0 ?
    let p = MathUtils.randomInt(pRange[0], pRange[1]);
    if (p === 0) p = 1;

    const multiplier = MathUtils.randomInt(multRange[0], multRange[1]);

    return { base, k, p, multiplier };
  }
}

module.exports = LogarithmsValues;
