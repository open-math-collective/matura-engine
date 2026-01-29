const MathUtils = require("../../../utils/MathUtils");

class FunctionPropertiesValues {
  /**
   * Get parameters for point belongs problem
   */
  static getPointBelongsParams(difficulty) {
    if (difficulty === "easy") {
      return {
        types: ["quadratic"],
        coeffRange: [-5, 5],
        pointRange: [-5, 5],
      };
    } else if (difficulty === "hard") {
      return {
        types: ["rational", "quadratic", "linear", "cubic"],
        coeffRange: [-15, 15],
        pointRange: [-15, 15],
      };
    } else {
      return {
        types: ["rational", "quadratic", "linear"],
        coeffRange: [-8, 8],
        pointRange: [-8, 8],
      };
    }
  }

  /**
   * Generate scenario for point belongs problem
   */
  static generatePointBelongsScenario(difficulty) {
    const params = this.getPointBelongsParams(difficulty);
    const type = MathUtils.randomElement(params.types);
    const coeffRange = params.coeffRange;
    const pointRange = params.pointRange;

    let formula, x0, m, stepsCalc, formulaLatex;

    switch (type) {
      case "rational": {
        let a = MathUtils.randomInt(coeffRange[0], coeffRange[1]);
        if (a === 0) a = 2;
        const b = MathUtils.randomInt(coeffRange[0], coeffRange[1]);

        const divisors = [];
        for (let i = 1; i <= Math.abs(a); i++) {
          if (a % i === 0) {
            divisors.push(i);
            divisors.push(-i);
          }
        }
        x0 = MathUtils.randomElement(divisors);
        m = a / x0 + b;

        formulaLatex = `f(x) = \\frac{${a}}{x} ${b >= 0 ? "+" : ""}${b === 0 ? "" : b}`;
        stepsCalc = `$$f(${x0}) = \\frac{${a}}{${x0}} ${b >= 0 ? "+" : ""}${b === 0 ? "" : b} = ${a / x0} ${b >= 0 ? "+" : ""}${b === 0 ? "" : b} = ${m}$$`;
        break;
      }
      case "quadratic": {
        const p = MathUtils.randomInt(coeffRange[0], coeffRange[1]);
        const q = MathUtils.randomInt(coeffRange[0], coeffRange[1]);
        x0 = MathUtils.randomInt(pointRange[0], pointRange[1]);
        m = Math.pow(x0 - p, 2) + q;

        formulaLatex = `f(x) = (x ${p > 0 ? "-" : "+"} ${Math.abs(p)})^2 ${q >= 0 ? "+" : ""}${q}`;
        stepsCalc = `$$f(${x0}) = (${x0} ${p > 0 ? "-" : "+"} ${Math.abs(p)})^2 ${q >= 0 ? "+" : ""}${q} = (${x0 - p})^2 ${q >= 0 ? "+" : ""}${q} = ${Math.pow(x0 - p, 2)} ${q >= 0 ? "+" : ""}${q} = ${m}$$`;
        break;
      }
      case "linear": {
        const a = MathUtils.randomInt(coeffRange[0], coeffRange[1]) || 1;
        const b = MathUtils.randomInt(coeffRange[0], coeffRange[1]);
        x0 = MathUtils.randomInt(pointRange[0], pointRange[1]);
        m = a * x0 + b;

        formulaLatex = `f(x) = ${a}x ${b >= 0 ? "+" : ""}${b}`;
        stepsCalc = `$$f(${x0}) = ${a} \\cdot ${x0} ${b >= 0 ? "+" : ""}${b} = ${a * x0} ${b >= 0 ? "+" : ""}${b} = ${m}$$`;
        break;
      }
      case "cubic": {
        const a = MathUtils.randomInt(coeffRange[0], coeffRange[1]) || 1;
        const b = MathUtils.randomInt(coeffRange[0], coeffRange[1]);
        const c = MathUtils.randomInt(coeffRange[0], coeffRange[1]);
        x0 = MathUtils.randomInt(pointRange[0], pointRange[1]);
        m = a * Math.pow(x0, 3) + b * Math.pow(x0, 2) + c * x0;

        formulaLatex = `f(x) = ${a}x^3 ${b >= 0 ? "+" : ""}${b}x^2 ${c >= 0 ? "+" : ""}${c}x`;
        stepsCalc = `$$f(${x0}) = ${a} \\cdot ${x0}^3 ${b >= 0 ? "+" : ""}${b} \\cdot ${x0}^2 ${c >= 0 ? "+" : ""}${c} \\cdot ${x0} = ${m}$$`;
        break;
      }
      default: {
        const p = MathUtils.randomInt(coeffRange[0], coeffRange[1]);
        const q = MathUtils.randomInt(coeffRange[0], coeffRange[1]);
        x0 = MathUtils.randomInt(pointRange[0], pointRange[1]);
        m = Math.pow(x0 - p, 2) + q;

        formulaLatex = `f(x) = (x ${p > 0 ? "-" : "+"} ${Math.abs(p)})^2 ${q >= 0 ? "+" : ""}${q}`;
        stepsCalc = `$$f(${x0}) = (${x0} ${p > 0 ? "-" : "+"} ${Math.abs(p)})^2 ${q >= 0 ? "+" : ""}${q} = ${m}$$`;
      }
    }

    return { type, x0, m, formulaLatex, stepsCalc };
  }

  /**
   * Get templates for point belongs question
   */
  static getPointBelongsTemplates(x0) {
    const templates = [
      `Punkt $$A = (${x0}, m)$$ należy do wykresu funkcji $$[FORMULA]$$. Zatem:`,
      `Dla jakiej wartości $$m$$ punkt $$(${x0}, m)$$ należy do wykresu $$[FORMULA]$$?`,
      `Punkt $$(${x0}, m)$$ leży na wykresie $$[FORMULA]$$. Oblicz $$m$$.`,
      `Wyznacz $$m$$ tak, aby punkt $$(${x0}, m)$$ należał do wykresu $$[FORMULA]$$.`,
      `Punkt $$A(${x0}, m)$$ należy do wykresu funkcji $$[FORMULA]$$. Znajdź $$m$$.`,
      `Dla jakiego $$m$$ punkt $$(${x0}, m)$$ znajduje się na wykresie $$[FORMULA]$$?`,
      `Oblicz $$m$$, jeśli punkt $$(${x0}, m)$$ należy do wykresu $$[FORMULA]$$.`,
      `Znajdź wartość $$m$$, dla której punkt $$(${x0}, m)$$ leży na wykresie $$[FORMULA]$$.`,
    ];
    return MathUtils.randomElement(templates);
  }

  /**
   * Get parameters for read graph problem
   */
  static getReadGraphParams(difficulty) {
    if (difficulty === "easy") {
      return {
        segmentsCountRange: [2, 3],
        rangeXY: [-6, 6],
      };
    } else if (difficulty === "hard") {
      return {
        segmentsCountRange: [4, 7],
        rangeXY: [-12, 12],
      };
    } else {
      return {
        segmentsCountRange: [3, 4],
        rangeXY: [-8, 8],
      };
    }
  }

  /**
   * Get parameters for function domain problem
   */
  static getFunctionDomainParams(difficulty) {
    if (difficulty === "easy") {
      return {
        range: [-5, 5],
        polynomialProb: 0.0,
      };
    } else if (difficulty === "hard") {
      return {
        range: [-15, 15],
        polynomialProb: 1.0,
      };
    } else {
      return {
        range: [-8, 8],
        polynomialProb: 0.5,
      };
    }
  }

  /**
   * Get parameters for function value problem
   */
  static getFunctionValueParams(difficulty) {
    if (difficulty === "easy") {
      return {
        coeffRange: [-3, 3],
        xRange: [-3, 3],
        degree: "quadratic",
      };
    } else if (difficulty === "hard") {
      return {
        coeffRange: [-10, 10],
        xRange: [-8, 8],
        degree: MathUtils.randomElement(["quadratic", "cubic"]),
      };
    } else {
      return {
        coeffRange: [-6, 6],
        xRange: [-5, 5],
        degree: "quadratic",
      };
    }
  }

  /**
   * Generate polynomial coefficients
   */
  static generatePolynomial(degree, coeffRange) {
    const c1 = MathUtils.randomInt(coeffRange[0], coeffRange[1]) || 1;
    const c2 = MathUtils.randomInt(coeffRange[0], coeffRange[1]);
    const c3 = MathUtils.randomInt(coeffRange[0], coeffRange[1]);

    if (degree === "cubic") {
      const c0 = MathUtils.randomInt(coeffRange[0], coeffRange[1]);
      return { c1, c2, c3, c0 };
    }

    return { c1, c2, c3 };
  }

  /**
   * Calculate polynomial value
   */
  static calculatePolynomialValue(coeffs, x, degree) {
    if (degree === "cubic") {
      return (
        coeffs.c1 * Math.pow(x, 3) +
        coeffs.c2 * Math.pow(x, 2) +
        coeffs.c3 * x +
        coeffs.c0
      );
    }
    return coeffs.c1 * x * x + coeffs.c2 * x + coeffs.c3;
  }

  /**
   * Format polynomial to LaTeX
   */
  static formatPolynomialLatex(coeffs, degree) {
    if (degree === "cubic") {
      return `${coeffs.c1}x^3 ${coeffs.c2 >= 0 ? "+" : ""}${coeffs.c2}x^2 ${coeffs.c3 >= 0 ? "+" : ""}${coeffs.c3}x ${coeffs.c0 >= 0 ? "+" : ""}${coeffs.c0}`;
    }
    return `${coeffs.c1}x^2 ${coeffs.c2 >= 0 ? "+" : ""}${coeffs.c2}x ${coeffs.c3 >= 0 ? "+" : ""}${coeffs.c3}`;
  }
}

module.exports = FunctionPropertiesValues;
