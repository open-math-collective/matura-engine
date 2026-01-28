const MathUtils = require("../../../utils/MathUtils");

class IntervalsValues {
  /**
   * Generates values for Absolute Value problems (|x - a| < b).
   * @param {string} difficulty - The difficulty level.
   * @returns {Object} An object containing { a, b, valA, valB, x1, x2, valX1, valX2 }.
   */
  static getAbsValueValues(difficulty) {
    let a, b, x1, x2, valA, valB, valX1, valX2;

    if (difficulty === "hard") {
      const [an, ad] = MathUtils.randomFraction(-10, 10, [2, 6]);
      const [bn, bd] = MathUtils.randomFraction(1, 10, [2, 6]);

      a = { n: an, d: ad };
      b = { n: bn, d: bd };

      valA = MathUtils.toLatexFraction(an, ad);
      valB = MathUtils.toLatexFraction(bn, bd);

      const subNum = an * bd - bn * ad;
      const subDen = ad * bd;
      const [sN, sD] = MathUtils.reduceFraction(subNum, subDen);

      const addNum = an * bd + bn * ad;
      const addDen = ad * bd;
      const [aN, aD] = MathUtils.reduceFraction(addNum, addDen);

      x1 = subNum / subDen;
      x2 = addNum / addDen;

      valX1 = MathUtils.toLatexFraction(sN, sD);
      valX2 = MathUtils.toLatexFraction(aN, aD);
    } else {
      let centerRange, radiusRange;
      if (difficulty === "easy") {
        centerRange = [-300, 300];
        radiusRange = [1, 200];
      } else {
        centerRange = [-1000, 1000];
        radiusRange = [1, 500];
      }

      a = MathUtils.randomInt(centerRange[0], centerRange[1]);
      b = MathUtils.randomInt(radiusRange[0], radiusRange[1]);

      valA = `${a}`;
      valB = `${b}`;

      x1 = a - b;
      x2 = a + b;

      valX1 = `${x1}`;
      valX2 = `${x2}`;
    }

    return { a, b, valA, valB, x1, x2, valX1, valX2 };
  }

  /**
   * Generates values for Interval Operations problems (A u B / A n B).
   * @param {string} difficulty - The difficulty level.
   * @returns {Object} An object containing { numA, numB, valA, valB }.
   */
  static getIntervalOpsValues(difficulty) {
    let numA, numB, valA, valB;

    if (difficulty === "hard") {
      const [an, ad] = MathUtils.randomFraction(-10, 10, [2, 5]);
      numA = an / ad;
      valA = MathUtils.toLatexFraction(an, ad);

      const [bn, bd] = MathUtils.randomFraction(
        Math.floor(numA) - 3,
        Math.floor(numA) + 3,
        [2, 5],
      );
      numB = bn / bd;
      valB = MathUtils.toLatexFraction(bn, bd);
    } else {
      const range = difficulty === "easy" ? [-300, 300] : [-1000, 1000];
      numA = MathUtils.randomInt(range[0], range[1]);
      const offsetLimit = difficulty === "easy" ? 50 : 200;
      const offset = MathUtils.randomInt(-offsetLimit, offsetLimit);
      numB = numA + offset;

      valA = `${numA}`;
      valB = `${numB}`;
    }

    return { numA, numB, valA, valB };
  }
}

module.exports = IntervalsValues;
