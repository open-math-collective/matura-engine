const MathUtils = require("../../../utils/MathUtils");

class LinearFunctionValues {
  /**
   * Get parameters for linear root problem
   */
  static getLinearRootParams(difficulty) {
    if (difficulty === "easy") {
      return {
        aNumRange: [1, 4],
        aDenRange: [1, 1],
        rootRange: [-10, 10],
      };
    } else if (difficulty === "hard") {
      return {
        aNumRange: [2, 50],
        aDenRange: [2, 100],
        rootRange: [-500, 500],
      };
    } else {
      return {
        aNumRange: [1, 5],
        aDenRange: [1, 3],
        rootRange: [-12, 12],
      };
    }
  }

  /**
   * Generate linear root scenario
   */
  static generateLinearRootScenario(difficulty) {
    const params = this.getLinearRootParams(difficulty);
    const root = MathUtils.randomInt(params.rootRange[0], params.rootRange[1]);

    let a_num = MathUtils.randomInt(params.aNumRange[0], params.aNumRange[1]);
    let a_den = MathUtils.randomInt(params.aDenRange[0], params.aDenRange[1]);

    if (Math.random() > 0.5) a_num *= -1;

    const a = a_num / a_den;
    const b = -a * root;

    return { a, b, root, a_num, a_den };
  }

  /**
   * Get templates for linear root question
   */
  static getLinearRootTemplates() {
    const templates = [
      `Wyznacz miejsce zerowe funkcji liniowej określonej wzorem:`,
      `Znajdź miejsce zerowe funkcji liniowej:`,
      `Dla jakiego $$x$$ funkcja liniowa przyjmuje wartość $$0$$?`,
      `Oblicz pierwiastek funkcji liniowej:`,
      `Wyznacz $$x$$, dla którego funkcja liniowa równa się $$0$$:`,
      `Znajdź punkt przecięcia wykresu funkcji liniowej z osią $$Ox$$:`,
      `Dla jakiego argumentu funkcja liniowa ma wartość $$0$$?`,
      `Podaj miejsce zerowe funkcji liniowej określonej wzorem:`,
      `Oblicz miejsce zerowe funkcji:`,
      `Wyznacz argument, dla którego wartość funkcji wynosi $$0$$:`,
      `Znajdź argument zerowy funkcji liniowej:`,
      `Wyznacz zero funkcji liniowej określonej wzorem:`,
      `Dla jakiej wartości $$x$$ funkcja przyjmuje wartość $$0$$?`,
      `Podaj argument, dla którego funkcja równa się $$0$$:`,
      `Oblicz argument zerowy funkcji liniowej:`,
      `Znajdź $$x$$-owy punkt przecięcia z osią $$Ox$$:`,
      `Wyznacz wartość $$x$$, dla której $$f(x) = 0$$:`,
      `Podaj pierwiastek funkcji liniowej:`,
      `Oblicz, dla jakiego $$x$$ funkcja przyjmuje wartość $$0$$:`,
      `Znajdź miejsce przecięcia wykresu z osią odciętych:`,
    ];
    return MathUtils.randomElement(templates);
  }

  /**
   * Format linear function to LaTeX
   */
  static formatLinear(a, b) {
    const aStr = this.fractionToLatex(a);
    const xPart = aStr === "1" ? "x" : aStr === "-1" ? "-x" : `${aStr}x`;
    const bS =
      b === 0
        ? ""
        : b > 0
          ? `+${this.fractionToLatex(b)}`
          : this.fractionToLatex(b);
    return `${xPart}${bS}`;
  }

  /**
   * Convert number to LaTeX fraction
   */
  static fractionToLatex(val) {
    if (Number.isInteger(val)) return `${val}`;

    const commonFractions = {
      0.5: "\\frac{1}{2}",
      "-0.5": "-\\frac{1}{2}",
      0.333: "\\frac{1}{3}",
      "-0.333": "-\\frac{1}{3}",
      0.667: "\\frac{2}{3}",
      "-0.667": "-\\frac{2}{3}",
      0.25: "\\frac{1}{4}",
      "-0.25": "-\\frac{1}{4}",
      0.75: "\\frac{3}{4}",
      "-0.75": "-\\frac{3}{4}",
    };

    const rounded = Math.round(val * 1000) / 1000;
    if (commonFractions[rounded]) return commonFractions[rounded];

    const gcd = (a, b) => (b ? gcd(b, a % b) : a);
    const den = 1000;
    const num = Math.round(val * den);
    const divisor = gcd(Math.abs(num), den);

    if (den / divisor <= 20) {
      return `\\frac{${num / divisor}}{${den / divisor}}`;
    }

    return parseFloat(val.toFixed(2));
  }

  /**
   * Get parameters for graph analysis
   */
  static getGraphAnalysisParams(difficulty) {
    if (difficulty === "hard") {
      return {
        aValues: [-0.5, -0.3, 0.3, 0.5, -2, 2, -3, 3],
        bValues: [-5, -4, -3, -2, 2, 3, 4, 5],
      };
    } else {
      return {
        aValues: [-3, -2, -1, 1, 2, 3],
        bValues: [-4, -3, -2, 2, 3, 4],
      };
    }
  }

  /**
   * Get parameters for monotonicity problem
   */
  static getMonotonicityParams(difficulty) {
    if (difficulty === "easy") {
      return {
        coeffMRange: [2, 4],
        constRange: [-8, 8],
      };
    } else if (difficulty === "hard") {
      return {
        coeffMRange: [
          -20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6,
          -5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
          17, 18, 19, 20,
        ],
        constRange: [-100, 100],
      };
    } else {
      return {
        coeffMRange: [-3, -2, 2, 3],
        constRange: [-10, 10],
      };
    }
  }

  /**
   * Get parameters for linear properties
   */
  static getLinearPropertiesParams(difficulty) {
    if (difficulty === "easy") {
      return {
        aRange: [-4, 4],
        bRange: [-5, 5],
      };
    } else if (difficulty === "hard") {
      return {
        aRange: [-8, 8],
        bRange: [-10, 10],
      };
    } else {
      return {
        aRange: [-6, 6],
        bRange: [-8, 8],
      };
    }
  }

  /**
   * Get templates for linear properties question
   */
  static getLinearPropertiesTemplates(formula) {
    const templates = [
      `Dana jest funkcja liniowa określona wzorem $$${formula}$$. Funkcja ta jest:`,
      `Funkcja liniowa $$${formula}$$ ma następujące własności:`,
      `Określ własności funkcji liniowej $$${formula}$$:`,
    ];
    return MathUtils.randomElement(templates);
  }
}

module.exports = LinearFunctionValues;
