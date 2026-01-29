const MathUtils = require("../../../utils/MathUtils");

class TransformationsValues {
  /**
   * Get parameters for symmetry transformation
   */
  static getSymmetryTransformParams(difficulty) {
    if (difficulty === "easy") {
      return {
        typeList: ["OX", "OY"],
        funcTypes: ["linear"],
      };
    } else if (difficulty === "hard") {
      return {
        typeList: ["(0,0)", "OX", "OY"],
        funcTypes: [
          "linear",
          "quadratic",
          "cubic_simple",
          "abs",
          "linear_complex",
        ],
      };
    } else {
      return {
        typeList: ["OX", "OY", "(0,0)"],
        funcTypes: ["linear", "quadratic", "abs", "cubic_simple"],
      };
    }
  }

  /**
   * Generate symmetry transformation scenario
   */
  static generateSymmetryScenario(difficulty) {
    const params = this.getSymmetryTransformParams(difficulty);
    const type = MathUtils.randomElement(params.typeList);
    const baseFunc = MathUtils.randomElement(params.funcTypes);

    let f_latex, g_latex, dist1, dist2, dist3;

    switch (baseFunc) {
      case "linear": {
        const a =
          difficulty === "hard"
            ? MathUtils.randomInt(2, 25)
            : MathUtils.randomInt(2, 30);
        const b =
          difficulty === "hard"
            ? MathUtils.randomInt(1, 40)
            : MathUtils.randomInt(1, 50);
        f_latex = `${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`;

        if (type === "OX") {
          g_latex = `-${a}x ${b >= 0 ? "-" : "+"} ${Math.abs(b)}`;
          dist1 = `${a}x ${b >= 0 ? "-" : "+"} ${Math.abs(b)}`;
          dist2 = `-${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`;
          dist3 = f_latex;
        } else if (type === "OY") {
          g_latex = `-${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`;
          dist1 = `${a}x ${b >= 0 ? "-" : "+"} ${Math.abs(b)}`;
          dist2 = `-${a}x ${b >= 0 ? "-" : "+"} ${Math.abs(b)}`;
          dist3 = f_latex;
        } else {
          // (0,0)
          g_latex = `${a}x ${b >= 0 ? "-" : "+"} ${Math.abs(b)}`;
          dist1 = `-${a}x ${b >= 0 ? "-" : "+"} ${Math.abs(b)}`;
          dist2 = `-${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`;
          dist3 = f_latex;
        }
        break;
      }
      case "quadratic": {
        const a =
          difficulty === "hard"
            ? MathUtils.randomInt(1, 10)
            : MathUtils.randomInt(1, 8);
        const c =
          difficulty === "hard"
            ? MathUtils.randomInt(1, 25)
            : MathUtils.randomInt(1, 50);
        f_latex =
          a === 1
            ? `x^2 ${c >= 0 ? "+" : "-"} ${Math.abs(c)}`
            : `${a}x^2 ${c >= 0 ? "+" : "-"} ${Math.abs(c)}`;

        if (type === "OX") {
          g_latex =
            a === 1
              ? `-x^2 ${c >= 0 ? "-" : "+"} ${Math.abs(c)}`
              : `-${a}x^2 ${c >= 0 ? "-" : "+"} ${Math.abs(c)}`;
          dist1 =
            a === 1
              ? `x^2 ${c >= 0 ? "-" : "+"} ${Math.abs(c)}`
              : `${a}x^2 ${c >= 0 ? "-" : "+"} ${Math.abs(c)}`;
          dist2 =
            a === 1
              ? `-x^2 ${c >= 0 ? "+" : "-"} ${Math.abs(c)}`
              : `-${a}x^2 ${c >= 0 ? "+" : "-"} ${Math.abs(c)}`;
          dist3 = f_latex;
        } else if (type === "OY") {
          g_latex = f_latex;
          dist1 =
            a === 1
              ? `-x^2 ${c >= 0 ? "+" : "-"} ${Math.abs(c)}`
              : `-${a}x^2 ${c >= 0 ? "+" : "-"} ${Math.abs(c)}`;
          dist2 =
            a === 1
              ? `x^2 ${c >= 0 ? "-" : "+"} ${Math.abs(c)}`
              : `${a}x^2 ${c >= 0 ? "-" : "+"} ${Math.abs(c)}`;
          dist3 =
            a === 1
              ? `-x^2 ${c >= 0 ? "-" : "+"} ${Math.abs(c)}`
              : `-${a}x^2 ${c >= 0 ? "-" : "+"} ${Math.abs(c)}`;
        } else {
          g_latex =
            a === 1
              ? `-x^2 ${c >= 0 ? "-" : "+"} ${Math.abs(c)}`
              : `-${a}x^2 ${c >= 0 ? "-" : "+"} ${Math.abs(c)}`;
          dist1 =
            a === 1
              ? `x^2 ${c >= 0 ? "-" : "+"} ${Math.abs(c)}`
              : `${a}x^2 ${c >= 0 ? "-" : "+"} ${Math.abs(c)}`;
          dist2 =
            a === 1
              ? `-x^2 ${c >= 0 ? "+" : "-"} ${Math.abs(c)}`
              : `-${a}x^2 ${c >= 0 ? "+" : "-"} ${Math.abs(c)}`;
          dist3 = f_latex;
        }
        break;
      }
      case "cubic_simple": {
        const a = MathUtils.randomInt(1, 20);
        f_latex = `${a}x^3`;

        if (type === "OX") {
          g_latex = `-${a}x^3`;
          dist1 = `${a}x^3`;
          dist2 = `${a + 1}x^3`;
          dist3 = `-${a + 1}x^3`;
        } else if (type === "OY") {
          g_latex = `-${a}x^3`;
          dist1 = `${a}x^3`;
          dist2 = `${a + 1}x^3`;
          dist3 = `-${a + 1}x^3`;
        } else {
          g_latex = `${a}x^3`;
          dist1 = `-${a}x^3`;
          dist2 = `${a + 1}x^3`;
          dist3 = `-${a + 1}x^3`;
        }
        break;
      }
      case "linear_complex": {
        const a = MathUtils.randomInt(2, 10);
        const b = MathUtils.randomInt(1, 15);
        const c = MathUtils.randomInt(1, 10);
        f_latex = `\\frac{${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}}{${c}}`;

        if (type === "OX") {
          g_latex = `\\frac{-${a}x ${b >= 0 ? "-" : "+"} ${Math.abs(b)}}{${c}}`;
          dist1 = `\\frac{${a}x ${b >= 0 ? "-" : "+"} ${Math.abs(b)}}{${c}}`;
          dist2 = `\\frac{-${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}}{${c}}`;
          dist3 = f_latex;
        } else if (type === "OY") {
          g_latex = `\\frac{-${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}}{${c}}`;
          dist1 = `\\frac{${a}x ${b >= 0 ? "-" : "+"} ${Math.abs(b)}}{${c}}`;
          dist2 = `\\frac{${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}}{${c}}`;
          dist3 = f_latex;
        } else {
          g_latex = `\\frac{${a}x ${b >= 0 ? "-" : "+"} ${Math.abs(b)}}{${c}}`;
          dist1 = `\\frac{-${a}x ${b >= 0 ? "-" : "+"} ${Math.abs(b)}}{${c}}`;
          dist2 = `\\frac{-${a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}}{${c}}`;
          dist3 = f_latex;
        }
        break;
      }
      case "abs": {
        const b =
          difficulty === "hard"
            ? MathUtils.randomInt(1, 25)
            : MathUtils.randomInt(1, 35);
        f_latex = `|x| ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`;

        if (type === "OX") {
          g_latex = `-|x| ${b >= 0 ? "-" : "+"} ${Math.abs(b)}`;
          dist1 = `|x| ${b >= 0 ? "-" : "+"} ${Math.abs(b)}`;
          dist2 = `-|x| ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`;
          dist3 = f_latex;
        } else if (type === "OY") {
          g_latex = f_latex; // |x| is even
          dist1 = `-|x| ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`;
          dist2 = `|x| ${b >= 0 ? "-" : "+"} ${Math.abs(b)}`;
          dist3 = `-|x| ${b >= 0 ? "-" : "+"} ${Math.abs(b)}`;
        } else {
          g_latex = `-|x| ${b >= 0 ? "-" : "+"} ${Math.abs(b)}`;
          dist1 = `|x| ${b >= 0 ? "-" : "+"} ${Math.abs(b)}`;
          dist2 = `-|x| ${b >= 0 ? "+" : "-"} ${Math.abs(b)}`;
          dist3 = f_latex;
        }
        break;
      }
      default: {
        const a = MathUtils.randomInt(2, 5);
        const b = MathUtils.randomInt(1, 5);
        f_latex = `${a}x + ${b}`;
        g_latex = `-${a}x - ${b}`;
        dist1 = `${a}x - ${b}`;
        dist2 = `-${a}x + ${b}`;
        dist3 = f_latex;
      }
    }

    return { type, baseFunc, f_latex, g_latex, dist1, dist2, dist3 };
  }

  /**
   * Get templates for symmetry transformation
   */
  static getSymmetryTemplates(type, f_latex) {
    const typeName =
      type === "(0,0)" ? "początku układu współrzędnych" : `osi $$${type}$$`;

    const templates = [
      `Wykres funkcji $$g$$ powstał przez przekształcenie wykresu funkcji $$f(x) = ${f_latex}$$ w symetrii względem ${typeName}. Funkcja $$g$$ jest określona wzorem:`,
      `Funkcja $$g$$ powstała z $$f(x) = ${f_latex}$$ przez symetrię względem ${typeName}. Podaj wzór $$g$$:`,
      `Wyznacz $$g(x)$$, jeśli wykres $$g$$ powstał z wykresu $$f(x) = ${f_latex}$$ przez symetrię względem ${typeName}.`,
      `Zapisz wzór funkcji $$g$$, której wykres powstał przez symetrię względem ${typeName} z wykresu $$f(x) = ${f_latex}$$.`,
      `Przez symetrię względem ${typeName} z wykresu $$f(x) = ${f_latex}$$ otrzymano wykres $$g$$. Wyznacz $$g$$:`,
      `Podaj wzór funkcji $$g$$ powstałej przez symetrię względem ${typeName} z funkcji $$f(x) = ${f_latex}$$.`,
      `Wykres funkcji $$f(x) = ${f_latex}$$ przekształcono symetrycznie względem ${typeName} otrzymując $$g$$. Znajdź $$g(x)$$.`,
      `Oblicz wzór funkcji $$g$$, gdy $$f(x) = ${f_latex}$$ została przekształcona symetrią względem ${typeName}.`,
      `Jaki wzór ma funkcja $$g$$, która powstała z $$f(x) = ${f_latex}$$ przez symetrię względem ${typeName}?`,
      `Wyznacz wzór funkcji $$g$$ utworzonej przez symetrię względem ${typeName} z $$f(x) = ${f_latex}$$.`,
      `Podaj $$g(x)$$ dla funkcji powstałej z $$f(x) = ${f_latex}$$ przez symetrię względem ${typeName}.`,
      `Określ wzór funkcji $$g$$, gdy $$f(x) = ${f_latex}$$ poddano symetrii względem ${typeName}.`,
      `Funkcja $$g$$ jest wynikiem symetrii $$f(x) = ${f_latex}$$ względem ${typeName}. Podaj $$g(x)$$.`,
      `Wykonano symetrię wykresu $$f(x) = ${f_latex}$$ względem ${typeName} uzyskując $$g$$. Zapisz wzór.`,
      `Znajdź wzór funkcji $$g$$ będącej obrazem $$f(x) = ${f_latex}$$ w symetrii względem ${typeName}.`,
      `Dla funkcji $$f(x) = ${f_latex}$$ wykonano symetrię względem ${typeName}. Wyznacz $$g(x)$$.`,
      `Podaj wzór $$g$$, gdy $$f(x) = ${f_latex}$$ przekształcono symetrią względem ${typeName}.`,
      `Oblicz $$g(x)$$ dla symetrii $$f(x) = ${f_latex}$$ względem ${typeName}.`,
      `Wyznacz funkcję $$g$$ powstałą z $$f(x) = ${f_latex}$$ przez symetrię względem ${typeName}.`,
      `Zapisz $$g(x)$$, jeśli $$g$$ to wynik symetrii $$f(x) = ${f_latex}$$ względem ${typeName}.`,
    ];
    return MathUtils.randomElement(templates);
  }

  /**
   * Get parameters for function shift
   */
  static getFunctionShiftParams(difficulty) {
    if (difficulty === "easy") {
      return {
        pRange: [-4, 4],
        qRange: [-4, 4],
        types: ["quadratic"],
        requireOneNonZero: true,
      };
    } else if (difficulty === "hard") {
      return {
        pRange: [-15, 15],
        qRange: [-15, 15],
        types: ["exponential", "rational", "quadratic", "linear_frac"],
      };
    } else {
      return {
        pRange: [-5, 5],
        qRange: [-5, 5],
        types: ["quadratic", "exponential"],
      };
    }
  }

  /**
   * Generate function shift scenario
   */
  static generateShiftScenario(difficulty) {
    const params = this.getFunctionShiftParams(difficulty);

    let p = MathUtils.randomInt(params.pRange[0], params.pRange[1]);
    let q = MathUtils.randomInt(params.qRange[0], params.qRange[1]);

    if (p === 0 && q === 0) {
      if (Math.random() > 0.5) {
        p = MathUtils.randomInt(1, Math.max(2, Math.abs(params.pRange[1]) + 1));
        p = Math.random() > 0.5 ? p : -p;
      } else {
        q = MathUtils.randomInt(1, Math.max(2, Math.abs(params.qRange[1]) + 1));
        q = Math.random() > 0.5 ? q : -q;
      }
    }

    const type = MathUtils.randomElement(params.types);
    let baseFuncLatex, shiftedFuncLatex, dist1, dist2, dist3;

    switch (type) {
      case "quadratic": {
        baseFuncLatex = "f(x) = x^2";
        const inside =
          p === 0 ? "x" : p > 0 ? `(x - ${p})` : `(x + ${Math.abs(p)})`;
        shiftedFuncLatex = `${inside}^2${q === 0 ? "" : q > 0 ? ` + ${q}` : ` - ${Math.abs(q)}`}`;

        const wrongP =
          p === 0
            ? `(x + ${MathUtils.randomInt(1, 5)})`
            : p > 0
              ? `(x + ${p})`
              : `(x - ${Math.abs(p)})`;
        dist1 = `${wrongP}^2${q === 0 ? "" : q > 0 ? ` + ${q}` : ` - ${Math.abs(q)}`}`;
        dist2 = `${inside}^2${q === 0 ? ` + ${MathUtils.randomInt(1, 5)}` : q > 0 ? ` - ${q}` : ` + ${Math.abs(q)}`}`;
        dist3 =
          p === 0
            ? `(x - ${MathUtils.randomInt(1, 5)})^2${q === 0 ? "" : q > 0 ? ` + ${q}` : ` - ${Math.abs(q)}`}`
            : `x^2${q === 0 ? ` + ${MathUtils.randomInt(1, 5)}` : q > 0 ? ` + ${q}` : ` - ${Math.abs(q)}`}`;
        break;
      }
      case "exponential": {
        const base = MathUtils.randomElement([2, 3, 4]);
        baseFuncLatex = `f(x) = ${base}^x`;
        const exponent =
          p === 0 ? "x" : p > 0 ? `x - ${p}` : `x + ${Math.abs(p)}`;
        shiftedFuncLatex = `${base}^{${exponent}}${q === 0 ? "" : q > 0 ? ` + ${q}` : ` - ${Math.abs(q)}`}`;

        const wrongExp =
          p === 0
            ? `x + ${MathUtils.randomInt(1, 5)}`
            : p > 0
              ? `x + ${p}`
              : `x - ${Math.abs(p)}`;
        dist1 = `${base}^{${wrongExp}}${q === 0 ? "" : q > 0 ? ` + ${q}` : ` - ${Math.abs(q)}`}`;
        dist2 = `${base}^{${exponent}}${q === 0 ? ` + ${MathUtils.randomInt(1, 5)}` : q > 0 ? ` - ${q}` : ` + ${Math.abs(q)}`}`;
        dist3 = `${base}^x${q === 0 ? ` + ${MathUtils.randomInt(1, 5)}` : q > 0 ? ` + ${q}` : ` - ${Math.abs(q)}`}`;
        break;
      }
      case "rational": {
        baseFuncLatex = `f(x) = \\frac{1}{x}`;
        const den = p === 0 ? "x" : p > 0 ? `x - ${p}` : `x + ${Math.abs(p)}`;
        shiftedFuncLatex = `\\frac{1}{${den}}${q === 0 ? "" : q > 0 ? ` + ${q}` : ` - ${Math.abs(q)}`}`;

        const wrongDen =
          p === 0
            ? `x + ${MathUtils.randomInt(1, 5)}`
            : p > 0
              ? `x + ${p}`
              : `x - ${Math.abs(p)}`;
        dist1 = `\\frac{1}{${wrongDen}}${q === 0 ? "" : q > 0 ? ` + ${q}` : ` - ${Math.abs(q)}`}`;
        dist2 = `\\frac{1}{${den}}${q === 0 ? ` + ${MathUtils.randomInt(1, 5)}` : q > 0 ? ` - ${q}` : ` + ${Math.abs(q)}`}`;
        dist3 =
          p === 0
            ? `\\frac{1}{x - ${MathUtils.randomInt(1, 5)}}${q === 0 ? "" : q > 0 ? ` + ${q}` : ` - ${Math.abs(q)}`}`
            : `\\frac{1}{x}${q === 0 ? ` + ${MathUtils.randomInt(1, 5)}` : q > 0 ? ` + ${q}` : ` - ${Math.abs(q)}`}`;
        break;
      }
      case "linear_frac": {
        const a = MathUtils.randomInt(1, 6);
        baseFuncLatex = `f(x) = \\frac{${a}}{x}`;
        const den = p === 0 ? "x" : p > 0 ? `x - ${p}` : `x + ${Math.abs(p)}`;
        shiftedFuncLatex = `\\frac{${a}}{${den}}${q === 0 ? "" : q > 0 ? ` + ${q}` : ` - ${Math.abs(q)}`}`;

        const wrongDen =
          p === 0
            ? `x + ${MathUtils.randomInt(1, 5)}`
            : p > 0
              ? `x + ${p}`
              : `x - ${Math.abs(p)}`;
        dist1 = `\\frac{${a}}{${wrongDen}}${q === 0 ? "" : q > 0 ? ` + ${q}` : ` - ${Math.abs(q)}`}`;
        dist2 = `\\frac{${a}}{${den}}${q === 0 ? ` + ${MathUtils.randomInt(1, 5)}` : q > 0 ? ` - ${q}` : ` + ${Math.abs(q)}`}`;
        dist3 =
          p === 0
            ? `\\frac{${a}}{x - ${MathUtils.randomInt(1, 5)}}${q === 0 ? "" : q > 0 ? ` + ${q}` : ` - ${Math.abs(q)}`}`
            : `\\frac{${a}}{x}${q === 0 ? ` + ${MathUtils.randomInt(1, 5)}` : q > 0 ? ` + ${q}` : ` - ${Math.abs(q)}`}`;
        break;
      }
      default: {
        baseFuncLatex = "f(x) = x^2";
        shiftedFuncLatex = `(x - ${p})^2 + ${q}`;
        dist1 = `(x + ${p})^2 + ${q}`;
        dist2 = `(x - ${p})^2 - ${q}`;
        dist3 = `x^2 + ${q}`;
      }
    }

    return { p, q, type, baseFuncLatex, shiftedFuncLatex, dist1, dist2, dist3 };
  }

  /**
   * Get templates for function shift
   */
  static getShiftTemplates(baseFuncLatex, p, q) {
    const templates = [
      `Wykres funkcji $$g$$ powstał przez przesunięcie wykresu funkcji $$${baseFuncLatex}$$ o wektor $$v=[${p}, ${q}]$$. Wyznacz wzór funkcji $$g$$.`,
      `Funkcja $$g$$ powstała z $$${baseFuncLatex}$$ przez przesunięcie o wektor $$[${p}, ${q}]$$. Podaj wzór $$g$$:`,
      `Przesuwając wykres $$${baseFuncLatex}$$ o wektor $$[${p}, ${q}]$$ otrzymano wykres $$g$$. Zapisz wzór $$g$$.`,
      `Wyznacz $$g(x)$$, jeśli wykres $$g$$ powstał z $$${baseFuncLatex}$$ przez przesunięcie o $$[${p}, ${q}]$$.`,
      `Zapisz wzór funkcji $$g$$, której wykres powstał z $$${baseFuncLatex}$$ przez przesunięcie o wektor $$[${p}, ${q}]$$.`,
      `Podaj wzór funkcji $$g$$ utworzonej przez przesunięcie $$${baseFuncLatex}$$ o wektor $$[${p}, ${q}]$$.`,
      `Przesunięto wykres $$${baseFuncLatex}$$ o wektor $$[${p}, ${q}]$$ tworząc $$g$$. Wyznacz wzór $$g$$.`,
      `Oblicz wzór $$g$$ po przesunięciu $$${baseFuncLatex}$$ o wektor $$[${p}, ${q}]$$.`,
    ];
    return MathUtils.randomElement(templates);
  }
}

module.exports = TransformationsValues;
