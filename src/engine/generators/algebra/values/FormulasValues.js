class FormulasValues {
  /**
   * Generates parameters for Short Multiplication problems (sqrt(a) +/- b)^2.
   * @param {string} difficulty - The difficulty level.
   * @returns {Object} An object containing aList and bRange.
   */
  static getShortMultParams(difficulty) {
    if (difficulty === "easy") {
      return {
        aList: [2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17, 18, 20],
        bRange: [1, 50],
      };
    } else if (difficulty === "hard") {
      const largeAList = [];
      const isPerfectSquare = (n) => Number.isInteger(Math.sqrt(n));
      for (let i = 2; i <= 2000; i++) {
        if (!isPerfectSquare(i)) largeAList.push(i);
      }
      return {
        aList: largeAList,
        bRange: [5, 2000],
      };
    } else {
      return {
        aList: [
          2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23,
          24, 26, 27, 28, 30,
        ],
        bRange: [2, 300],
      };
    }
  }

  /**
   * Generates parameters for Algebraic Expansion problems.
   * @param {string} difficulty - The difficulty level.
   * @returns {Object} An object containing aRange and bRange.
   */
  static getExpansionParams(difficulty) {
    if (difficulty === "easy") {
      return {
        aRange: [1, 30],
        bRange: [1, 50],
      };
    } else if (difficulty === "hard") {
      return {
        aRange: [5, 2000],
        bRange: [5, 5000],
      };
    } else {
      return {
        aRange: [2, 200],
        bRange: [2, 500],
      };
    }
  }

  /**
   * Generates parameters for Rational problems.
   * @param {string} difficulty - The difficulty level.
   * @returns {Object} An object containing aRange and kRange.
   */
  static getRationalParams(difficulty) {
    if (difficulty === "easy") {
      return {
        aRange: [1, 50],
        kRange: [1, 10],
      };
    } else if (difficulty === "hard") {
      return {
        aRange: [5, 5000],
        kRange: [2, 1000],
      };
    } else {
      return {
        aRange: [2, 200],
        kRange: [1, 50],
      };
    }
  }
}

module.exports = FormulasValues;
