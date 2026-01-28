const MathUtils = require("../../../utils/MathUtils");

class NumbersValues {
  /**
   * Generates parameters for Percent Problem.
   * @param {string} difficulty - The difficulty level.
   * @returns {Object} An object containing pList and priceRange.
   */
  static getPercentProblemValues(difficulty) {
    let pList, priceRange;

    if (difficulty === "easy") {
      pList = Array.from({ length: 19 }, (_, i) => (i + 1) * 5);
      priceRange = [10, 500];
    } else if (difficulty === "hard") {
      pList = Array.from({ length: 150 }, (_, i) => i + 1);
      priceRange = [100, 10000];
    } else {
      pList = Array.from({ length: 20 }, (_, i) => (i + 1) * 5);
      priceRange = [50, 1000];
    }
    return { pList, priceRange };
  }

  /**
   * Generates scenarios for Percent Relations.
   * @param {string} difficulty - The difficulty level.
   * @returns {Object} Object containing {p, b_frac, varX, varY}.
   */
  static getPercentRelationsValues(difficulty) {
    let p;
    // x = (1 + p/100)y  => y = x / (1 + p/100) = x / ((100+p)/100) = 100/(100+p) x

    if (difficulty === "easy") {
      p = MathUtils.randomInt(1, 400);
    } else if (difficulty === "hard") {
      p = MathUtils.randomInt(1, 1000);
    } else {
      p = MathUtils.randomInt(1, 500);
    }

    const num = 100;
    const den = 100 + p;
    const [n, d] = MathUtils.reduceFraction(num, den);

    const b_frac = d === 1 ? `${n}` : `\\frac{${n}}{${d}}`;

    const pairs = [
      ["x", "y"],
      ["a", "b"],
      ["m", "n"],
      ["p", "q"],
      ["u", "v"],
      ["k", "l"],
    ];
    const [varX, varY] = MathUtils.randomElement(pairs);

    return { p, b_frac, varX, varY };
  }

  /**
   * Generates parameters for Error Problem.
   * @param {string} difficulty - The difficulty level.
   * @returns {Object} An object containing errorList and xRange.
   */
  static getErrorProblemValues(difficulty) {
    let errorList, xRange;

    if (difficulty === "easy") {
      errorList = Array.from({ length: 50 }, (_, i) => i + 1);
      xRange = [10, 1000];
    } else if (difficulty === "hard") {
      errorList = Array.from({ length: 200 }, (_, i) =>
        Number((i * 0.5 + 0.5).toFixed(1)),
      );
      xRange = [100, 10000];
    } else {
      errorList = [5, 10, 15, 20, 25, 30, 40, 50];
      xRange = [20, 2000];
    }
    return { errorList, xRange };
  }

  /**
   * Generates parameters for GCD/LCM Problem.
   * @param {string} difficulty - The difficulty level.
   * @returns {Object} An object containing commonList and mRange.
   */
  static getGcdLcmValues(difficulty) {
    let commonList, mRange;

    if (difficulty === "easy") {
      commonList = [2, 3, 4, 5, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20];
      mRange = [1, 30];
    } else if (difficulty === "hard") {
      commonList = Array.from({ length: 100 }, (_, i) => i + 2);
      mRange = [3, 200];
    } else {
      commonList = [4, 6, 8, 9, 12, 15, 18, 20, 24, 25, 30];
      mRange = [2, 50];
    }
    return { commonList, mRange };
  }
}

module.exports = NumbersValues;
