const MathUtils = require("../../../utils/MathUtils");

class BasicOperationsValues {
  /**
   * Generates parameters for power problems (base^exp).
   * @param {string} difficulty - The difficulty level ("easy", "medium", "hard").
   * @returns {Object} An object containing bases, nRange, kRange, and mRange.
   */
  static getPowerProblemParams(difficulty) {
    if (difficulty === "easy") {
      return {
        bases: MathUtils.randomInt(2, 100),
        nRange: [-30, 40],
        kRange: [-20, 25],
        mRange: [-20, 25],
      };
    } else if (difficulty === "hard") {
      return {
        bases: MathUtils.randomInt(2, 200),
        nRange: [-500, 500],
        kRange: [-200, 200],
        mRange: [-500, 500],
      };
    } else {
      return {
        bases: MathUtils.randomInt(2, 100),
        nRange: [-100, 100],
        kRange: [-50, 50],
        mRange: [-100, 100],
      };
    }
  }

  /**
   * Generates parameters for roots problems.
   * @param {string} difficulty - The difficulty level.
   * @returns {Object} An object containing roots, f1Range, f2Range, and opList.
   */
  static getRootsProblemParams(difficulty) {
    if (difficulty === "easy") {
      return {
        roots: MathUtils.randomElement([
          2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17, 18, 20,
        ]),
        f1Range: [2, 50],
        f2Range: [1, 40],
        opList: ["+", "-"],
      };
    } else if (difficulty === "hard") {
      const largeRoots = [];
      const isPerfectSquare = (n) => Number.isInteger(Math.sqrt(n));
      for (let i = 2; i <= 500; i++) {
        if (!isPerfectSquare(i)) largeRoots.push(i);
      }
      return {
        roots: MathUtils.randomElement(largeRoots),
        f1Range: [20, 1000],
        f2Range: [5, 500],
        opList: ["-", "+"],
      };
    } else {
      return {
        roots: MathUtils.randomElement([
          2, 3, 5, 7, 10, 11, 13, 14, 15, 17, 19, 20, 21, 22, 23, 24, 26, 27,
          28, 30, 31, 33, 34, 35, 37,
        ]),
        f1Range: [5, 100],
        f2Range: [2, 80],
        opList: ["-", "+"],
      };
    }
  }

  /**
   * Generates parameters for scientific notation problems.
   * @param {string} difficulty - The difficulty level.
   * @returns {Object} An object containing bBaseRange, multipliers, and expRange.
   */
  static getScientificParams(difficulty) {
    if (difficulty === "easy") {
      return {
        bBaseRange: [2, 100],
        multipliers: [2, 3, 4, 5, 6, 8, 10, 0.5, 0.1, 0.2, 2.5, 1.5],
        expRange: [2, 50],
      };
    } else if (difficulty === "hard") {
      const mults = [
        1.5, 2.5, 0.5, 0.2, 0.1, 0.25, 1.2, 0.8, 0.4, 0.01, 0.001, 0.05, 5, 10,
        100,
      ];
      for (let i = 2; i < 20; i++) mults.push(i);
      return {
        bBaseRange: [2, 1000],
        multipliers: mults,
        expRange: [-500, 500],
      };
    } else {
      return {
        bBaseRange: [2, 500],
        multipliers: [2, 3, 4, 5, 6, 7, 8, 9, 10, 1.5, 2.5, 0.5, 1.2, 0.8, 0.4],
        expRange: [-200, 200],
      };
    }
  }

  /**
   * Generates parameters for exponent-root conversion problems.
   * @param {string} difficulty - The difficulty level.
   * @returns {Object} An object containing aList, nRange, and mRange.
   */
  static getConversionParams(difficulty) {
    if (difficulty === "easy") {
      return {
        aList: [
          2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 30, 40,
        ],
        nRange: [2, 50],
        mRange: [1, 50],
      };
    } else if (difficulty === "hard") {
      const largeBases = [];
      for (let i = 2; i <= 500; i++) largeBases.push(i);
      return {
        aList: largeBases,
        nRange: [2, 1000],
        mRange: [2, 2000],
      };
    } else {
      const medBases = [];
      for (let i = 2; i <= 100; i++) medBases.push(i);
      return {
        aList: medBases,
        nRange: [2, 100],
        mRange: [2, 200],
      };
    }
  }
}

module.exports = BasicOperationsValues;
