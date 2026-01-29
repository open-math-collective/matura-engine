const MathUtils = require("../../../utils/MathUtils");

class PiecewiseFunctionValues {
  /**
   * Get parameters for piecewise function problem
   */
  static getPiecewiseFunctionParams(difficulty) {
    if (difficulty === "easy") {
      return {
        cutRange: [0, 0],
        f1Type: "quadratic_simple",
        f2Type: "linear",
        val1Range: [-5, -1],
        val2Range: [0, 4],
      };
    } else if (difficulty === "hard") {
      return {
        cutRange: [-10, 10],
        f1Types: ["quadratic", "quadratic_shifted", "cubic_simple"],
        f2Types: ["linear", "linear_steep", "constant"],
        valOffsetRange: [1, 8],
      };
    } else {
      return {
        cutRange: [-5, 5],
        f1Types: ["quadratic_simple", "quadratic_shifted"],
        f2Types: ["linear", "linear_simple"],
        valOffsetRange: [1, 5],
      };
    }
  }

  /**
   * Generate piecewise function scenario
   */
  static generatePiecewiseScenario(difficulty) {
    const params = this.getPiecewiseFunctionParams(difficulty);

    let cut, f1_tex, f2_tex, val1, val2, res1, res2;

    if (difficulty === "easy") {
      cut = 0;
      const f2_b = MathUtils.randomInt(1, 8);

      f1_tex = "x^2";
      f2_tex = `x + ${f2_b}`;

      val1 = MathUtils.randomInt(params.val1Range[0], params.val1Range[1]);
      val2 = MathUtils.randomInt(params.val2Range[0], params.val2Range[1]);

      res1 = val1 * val1;
      res2 = val2 + f2_b;
    } else if (difficulty === "hard") {
      cut = MathUtils.randomInt(params.cutRange[0], params.cutRange[1]);

      const f1Type = MathUtils.randomElement(params.f1Types);
      const f2Type = MathUtils.randomElement(params.f2Types);

      switch (f1Type) {
        case "quadratic": {
          const a = MathUtils.randomInt(2, 5);
          const c = MathUtils.randomInt(1, 8);
          f1_tex = `${a}x^2 - ${c}`;
          val1 = cut - MathUtils.randomInt(1, params.valOffsetRange[1]);
          res1 = a * val1 * val1 - c;
          break;
        }
        case "quadratic_shifted": {
          const a = MathUtils.randomInt(1, 4);
          const h = MathUtils.randomInt(-5, 5);
          const k = MathUtils.randomInt(-5, 5);
          f1_tex =
            k >= 0
              ? `${a}(x ${h >= 0 ? "-" : "+"} ${Math.abs(h)})^2 + ${k}`
              : `${a}(x ${h >= 0 ? "-" : "+"} ${Math.abs(h)})^2 - ${Math.abs(k)}`;
          val1 = cut - MathUtils.randomInt(1, params.valOffsetRange[1]);
          res1 = a * Math.pow(val1 - h, 2) + k;
          break;
        }
        case "cubic_simple": {
          const a = MathUtils.randomInt(1, 3);
          f1_tex = `${a}x^3`;
          val1 = cut - MathUtils.randomInt(1, params.valOffsetRange[1]);
          res1 = a * Math.pow(val1, 3);
          break;
        }
        default: {
          const a = MathUtils.randomInt(2, 4);
          const c = MathUtils.randomInt(1, 5);
          f1_tex = `${a}x^2 - ${c}`;
          val1 = cut - MathUtils.randomInt(1, 4);
          res1 = a * val1 * val1 - c;
        }
      }

      switch (f2Type) {
        case "linear": {
          const a = MathUtils.randomInt(-6, -2);
          const b = MathUtils.randomInt(5, 15);
          f2_tex = `${a}x + ${b}`;
          val2 = cut + MathUtils.randomInt(0, params.valOffsetRange[1]);
          res2 = a * val2 + b;
          break;
        }
        case "linear_steep": {
          const a = MathUtils.randomInt(-10, -5);
          const b = MathUtils.randomInt(10, 20);
          f2_tex = `${a}x + ${b}`;
          val2 = cut + MathUtils.randomInt(0, params.valOffsetRange[1]);
          res2 = a * val2 + b;
          break;
        }
        case "constant": {
          const c = MathUtils.randomInt(-10, 10);
          f2_tex = `${c}`;
          val2 = cut + MathUtils.randomInt(0, params.valOffsetRange[1]);
          res2 = c;
          break;
        }
        default: {
          const a = MathUtils.randomInt(-4, -2);
          const b = MathUtils.randomInt(5, 10);
          f2_tex = `${a}x + ${b}`;
          val2 = cut + MathUtils.randomInt(0, 4);
          res2 = a * val2 + b;
        }
      }
    } else {
      cut = MathUtils.randomInt(params.cutRange[0], params.cutRange[1]);
      const f1_c = MathUtils.randomInt(1, 6);
      const f2_a = MathUtils.randomInt(-3, 3) || 1;
      const f2_b = MathUtils.randomInt(1, 8);

      f1_tex = `x^2 + ${f1_c}`;
      f2_tex = `${f2_a === 1 ? "" : f2_a === -1 ? "-" : f2_a}x ${f2_b >= 0 ? "+" : ""}${f2_b}`;

      val1 = cut - MathUtils.randomInt(1, params.valOffsetRange[1]);
      val2 = cut + MathUtils.randomInt(0, params.valOffsetRange[1]);

      res1 = val1 * val1 + f1_c;
      res2 = f2_a * val2 + f2_b;
    }

    return { cut, f1_tex, f2_tex, val1, val2, res1, res2 };
  }

  /**
   * Get templates for piecewise function question
   */
  static getPiecewiseTemplates(cut, f1_tex, f2_tex, val1, val2) {
    const templates = [
      `Funkcja $$f$$ jest określona wzorem: $$f(x) = \\begin{cases} ${f1_tex} & \\text{dla } x < ${cut} \\\\ ${f2_tex} & \\text{dla } x \\ge ${cut} \\end{cases}$$ Wartość wyrażenia $$f(${val1}) + f(${val2})$$ jest równa:`,
      `Dana jest funkcja: $$f(x) = \\begin{cases} ${f1_tex} & \\text{dla } x < ${cut} \\\\ ${f2_tex} & \\text{dla } x \\ge ${cut} \\end{cases}$$ Oblicz $$f(${val1}) + f(${val2})$$:`,
      `Funkcja $$f$$ dana jest wzorem: $$f(x) = \\begin{cases} ${f1_tex} & \\text{gdy } x < ${cut} \\\\ ${f2_tex} & \\text{gdy } x \\ge ${cut} \\end{cases}$$ Wyznacz $$f(${val1}) + f(${val2})$$:`,
      `Dla funkcji $$f(x) = \\begin{cases} ${f1_tex} & \\text{dla } x < ${cut} \\\\ ${f2_tex} & \\text{dla } x \\ge ${cut} \\end{cases}$$ oblicz wartość $$f(${val1}) + f(${val2})$$:`,
      `Oblicz $$f(${val1}) + f(${val2})$$ dla funkcji: $$f(x) = \\begin{cases} ${f1_tex} & \\text{gdy } x < ${cut} \\\\ ${f2_tex} & \\text{gdy } x \\ge ${cut} \\end{cases}$$`,
      `Funkcja określona jest wzorem: $$f(x) = \\begin{cases} ${f1_tex}, & x < ${cut} \\\\ ${f2_tex}, & x \\ge ${cut} \\end{cases}$$ Podaj wartość $$f(${val1}) + f(${val2})$$:`,
      `Wyznacz wartość wyrażenia $$f(${val1}) + f(${val2})$$, gdzie $$f(x) = \\begin{cases} ${f1_tex} & \\text{dla } x < ${cut} \\\\ ${f2_tex} & \\text{dla } x \\ge ${cut} \\end{cases}$$`,
      `Dla funkcji określonej jako $$f(x) = \\begin{cases} ${f1_tex} & \\text{gdy } x < ${cut} \\\\ ${f2_tex} & \\text{gdy } x \\ge ${cut} \\end{cases}$$ oblicz $$f(${val1}) + f(${val2})$$:`,
    ];
    return MathUtils.randomElement(templates);
  }

  /**
   * Generate solution steps
   */
  static generateSteps(cut, val1, val2, f1_tex, f2_tex, res1, res2) {
    const total = res1 + res2;

    const f1_display = f1_tex.replace(/x/g, `(${val1})`);
    const f2_display = f2_tex.replace(/x/g, `(${val2})`);

    return [
      `Obliczamy $$f(${val1})$$. Ponieważ $$${val1} < ${cut}$$, korzystamy z pierwszego wzoru:`,
      `$$f(${val1}) = ${f1_display} = ${res1}$$`,
      `Obliczamy $$f(${val2})$$. Ponieważ $$${val2} \\ge ${cut}$$, korzystamy z drugiego wzoru:`,
      `$$f(${val2}) = ${f2_display} = ${res2}$$`,
      `Suma: $$${res1} + ${res2} = ${total}$$`,
    ];
  }
}

module.exports = PiecewiseFunctionValues;
