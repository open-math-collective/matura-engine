const MathUtils = require("../../../utils/MathUtils");

class ExponentialFunctionValues {
  /**
   * Generate parameters for exponential parameter problem (find base a where f(x) = a^x = y)
   */
  static getExponentialParamParams(difficulty) {
    if (difficulty === "easy") {
      return {
        xRange: [2, 4],
        aRange: [2, 10],
        allowFractions: false,
      };
    } else if (difficulty === "hard") {
      return {
        xRange: [-20, 20],
        aRange: [2, 200],
        allowFractions: true,
        allowRoots: true,
      };
    } else {
      return {
        xRange: [-3, 4],
        aRange: [2, 15],
        allowFractions: true,
        allowRoots: false,
      };
    }
  }

  /**
   * Generate a valid scenario for exponential parameter problem
   * Returns: { x, a, y, yLatex }
   */
  static generateExponentialScenario(difficulty) {
    const params = this.getExponentialParamParams(difficulty);

    if (difficulty === "hard") {
      const scenarioType = MathUtils.randomElement([
        "integer",
        "integer_large",
        "negative_exp",
        "negative_exp_large",
        "fractional_exp",
        "fractional_exp_cube",
        "fractional_base",
        "fractional_base_large",
      ]);

      switch (scenarioType) {
        case "integer": {
          const a = MathUtils.randomInt(2, 50);
          const x = MathUtils.randomInt(2, 6);
          const y = Math.pow(a, x);
          return { x, a, y: `${y}`, yLatex: `${y}` };
        }
        case "integer_large": {
          const a = MathUtils.randomInt(10, 100);
          const x = MathUtils.randomInt(2, 4);
          const y = Math.pow(a, x);
          return { x, a, y: `${y}`, yLatex: `${y}` };
        }
        case "negative_exp": {
          const a = MathUtils.randomInt(2, 10);
          const x = -MathUtils.randomInt(1, 4);
          const yNum = 1;
          const yDen = Math.pow(a, Math.abs(x));
          return {
            x,
            a,
            y: `${yNum}/${yDen}`,
            yLatex: `\\frac{${yNum}}{${yDen}}`,
          };
        }
        case "negative_exp_large": {
          const a = MathUtils.randomInt(5, 20);
          const x = -MathUtils.randomInt(3, 6);
          const yNum = 1;
          const yDen = Math.pow(a, Math.abs(x));
          return {
            x,
            a,
            y: `${yNum}/${yDen}`,
            yLatex: `\\frac{${yNum}}{${yDen}}`,
          };
        }
        case "fractional_exp": {
          const n = 2;
          const y = MathUtils.randomInt(2, 20);
          const a = Math.pow(y, n);
          const x = 0.5;
          return { x, a: `${a}`, y: `${y}`, yLatex: `${y}` };
        }
        case "fractional_exp_cube": {
          const n = 3;
          const y = MathUtils.randomInt(2, 10);
          const a = Math.pow(y, n);
          const x = `1/${n}`;
          return { x, a: `${a}`, y: `${y}`, yLatex: `${y}` };
        }
        case "fractional_base": {
          const num = 1;
          const den = MathUtils.randomInt(2, 5);
          const x = MathUtils.randomInt(2, 4);
          const yNum = Math.pow(num, x);
          const yDen = Math.pow(den, x);
          return {
            x,
            a: `\\frac{${num}}{${den}}`,
            y: `${yNum}/${yDen}`,
            yLatex: `\\frac{${yNum}}{${yDen}}`,
          };
        }
        case "fractional_base_large": {
          const num = 1;
          const den = MathUtils.randomInt(3, 10);
          const x = MathUtils.randomInt(2, 5);
          const yNum = Math.pow(num, x);
          const yDen = Math.pow(den, x);
          return {
            x,
            a: `\\frac{${num}}{${den}}`,
            y: `${yNum}/${yDen}`,
            yLatex: `\\frac{${yNum}}{${yDen}}`,
          };
        }
        default: {
          const a = MathUtils.randomInt(2, 10);
          const x = MathUtils.randomInt(2, 4);
          const y = Math.pow(a, x);
          return { x, a, y: `${y}`, yLatex: `${y}` };
        }
      }
    } else if (difficulty === "medium") {
      const allowNegative = Math.random() < 0.5;

      if (allowNegative) {
        const a = MathUtils.randomInt(2, 10);
        const x = -MathUtils.randomInt(1, 3);
        const yDen = Math.pow(a, Math.abs(x));
        return { x, a, y: `1/${yDen}`, yLatex: `\\frac{1}{${yDen}}` };
      } else {
        const a = MathUtils.randomInt(2, 15);
        const x = MathUtils.randomInt(2, 4);
        const y = Math.pow(a, x);
        return { x, a, y: `${y}`, yLatex: `${y}` };
      }
    } else {
      const a = MathUtils.randomInt(2, 10);
      const x = MathUtils.randomInt(2, 4);
      const y = Math.pow(a, x);
      return { x, a, y: `${y}`, yLatex: `${y}` };
    }
  }

  /**
   * Get templates for exponential parameter question
   */
  static getExponentialParamTemplates(x, yLatex) {
    const templates = [
      `Funkcja wykładnicza określona wzorem $$f(x) = a^x$$ przyjmuje dla argumentu $$${x}$$ wartość $$${yLatex}$$. Ile wynosi podstawa $$a$$ tej funkcji?`,
      `Dla funkcji $$f(x) = a^x$$ wiadomo, że $$f(${x}) = ${yLatex}$$. Wyznacz wartość $$a$$.`,
      `Funkcja $$f(x) = a^x$$ spełnia warunek $$f(${x}) = ${yLatex}$$. Oblicz $$a$$.`,
      `Wykres funkcji $$f(x) = a^x$$ przechodzi przez punkt $$(${x}, ${yLatex})$$. Znajdź podstawę $$a$$.`,
      `Funkcja wykładnicza $$f(x) = a^x$$ ma wartość $$${yLatex}$$ dla $$x = ${x}$$. Oblicz $$a$$.`,
      `Punkt $$(${x}, ${yLatex})$$ należy do wykresu funkcji $$f(x) = a^x$$. Wyznacz $$a$$.`,
      `Dla jakiej wartości $$a$$ funkcja $$f(x) = a^x$$ przyjmuje wartość $$${yLatex}$$ dla $$x = ${x}$$?`,
      `Funkcja $$f$$ określona wzorem $$f(x) = a^x$$ spełnia $$f(${x}) = ${yLatex}$$. Znajdź $$a$$.`,
      `Oblicz podstawę $$a$$ funkcji wykładniczej $$f(x) = a^x$$, jeśli $$f(${x}) = ${yLatex}$$.`,
      `Wyznacz podstawę $$a$$ funkcji $$f(x) = a^x$$, która dla $$x = ${x}$$ przyjmuje wartość $$${yLatex}$$.`,
      `Znajdź wartość $$a$$, dla której funkcja $$f(x) = a^x$$ spełnia $$f(${x}) = ${yLatex}$$.`,
      `Podstawa $$a$$ funkcji wykładniczej $$f(x) = a^x$$ jest taka, że $$f(${x}) = ${yLatex}$$. Oblicz $$a$$.`,
      `Funkcja $$y = a^x$$ przechodzi przez punkt $$(${x}, ${yLatex})$$. Wyznacz $$a$$.`,
      `Wykres $$y = a^x$$ zawiera punkt $$(${x}, ${yLatex})$$. Znajdź $$a$$.`,
      `Dla funkcji $$y = a^x$$ mamy $$y(${x}) = ${yLatex}$$. Oblicz $$a$$.`,
      `Funkcja $$f(x) = a^x$$ przyjmuje wartość $$${yLatex}$$ dla argumentu $$${x}$$. Znajdź $$a$$.`,
      `Argumentowi $$${x}$$ odpowiada wartość $$${yLatex}$$ funkcji $$f(x) = a^x$$. Wyznacz $$a$$.`,
      `Funkcja wykładnicza $$f$$ spełnia $$f(${x}) = ${yLatex}$$. Oblicz podstawę $$a$$, gdzie $$f(x) = a^x$$.`,
      `Dla $$x = ${x}$$ funkcja $$f(x) = a^x$$ przyjmuje wartość $$${yLatex}$$. Znajdź $$a$$.`,
      `Znajdź podstawę $$a$$ funkcji $$f(x) = a^x$$, wiedząc że $$f(${x}) = ${yLatex}$$.`,
      `Wykres funkcji $$f(x) = a^x$$ zawiera punkt o współrzędnych $$(${x}, ${yLatex})$$. Oblicz $$a$$.`,
      `Funkcja wykładnicza o równaniu $$f(x) = a^x$$ spełnia $$f(${x}) = ${yLatex}$$. Wyznacz $$a$$.`,
      `Podstawa $$a$$ w funkcji $$f(x) = a^x$$ jest nieznana, ale wiemy że $$f(${x}) = ${yLatex}$$. Oblicz $$a$$.`,
      `Oblicz $$a$$ w funkcji wykładniczej $$f(x) = a^x$$, która spełnia $$f(${x}) = ${yLatex}$$.`,
      `Znajdź $$a$$ w równaniu funkcji $$f(x) = a^x$$, jeśli $$f(${x}) = ${yLatex}$$.`,
      `Wartość $$f(${x}) = ${yLatex}$$ jest znana dla funkcji $$f(x) = a^x$$. Wyznacz $$a$$.`,
      `Funkcja $$f(x) = a^x$$ dla $$x = ${x}$$ przyjmuje wartość $$${yLatex}$$. Oblicz podstawę $$a$$.`,
      `Punkt o współrzędnych $$(${x}, ${yLatex})$$ leży na wykresie $$f(x) = a^x$$. Znajdź $$a$$.`,
      `Dla jakiego $$a$$ funkcja $$f(x) = a^x$$ ma wartość $$${yLatex}$$ przy $$x = ${x}$$?`,
      `Podstawa $$a$$ w $$f(x) = a^x$$ jest taka, że dla $$x = ${x}$$ wartość wynosi $$${yLatex}$$. Znajdź $$a$$.`,
    ];
    return MathUtils.randomElement(templates);
  }

  /**
   * Generate distractors for exponential parameter problem
   */
  static generateDistractors(a, x, difficulty) {
    const aVal = parseFloat(a);

    if (isNaN(aVal)) {
      const match = a.match(/\\?frac\{?(\d+)\}?\{?(\d+)\}?/);
      if (match) {
        const num = parseInt(match[1]);
        const den = parseInt(match[2]);
        return [`\\frac{${den}}{${num}}`, `${num + 1}`, `${den + 1}`];
      }
      return ["2", "3", "4"];
    }

    if (difficulty === "hard") {
      return MathUtils.ensureUniqueDistractors(
        `${aVal}`,
        [
          `${aVal * 2}`,
          `${Math.floor(aVal / 2)}`,
          `${aVal + 1}`,
          `${Math.abs(aVal - 1)}`,
        ],
        () => {
          const offset = MathUtils.randomInt(1, 5);
          return `${Math.max(1, aVal + offset)}`;
        },
      );
    } else {
      return [
        `${aVal * 2}`,
        x > 0 ? `\\frac{1}{${aVal}}` : `${Math.floor((1 / aVal) * 10) / 10}`,
        `${aVal + 1}`,
      ];
    }
  }

  /**
   * Generate solution steps
   */
  static generateSteps(x, a, yLatex) {
    const steps = [
      `Podstawiamy do wzoru $$f(x) = a^x$$:`,
      `$$a^{${x}} = ${yLatex}$$`,
    ];

    if (x === -1) {
      steps.push(`$$a^{-1} = \\frac{1}{a} = ${yLatex} \\implies a = ${a}$$`);
    } else if (x < 0) {
      steps.push(`$$a^{${x}} = \\frac{1}{a^{${Math.abs(x)}}} = ${yLatex}$$`);
      steps.push(
        `Stąd $$a^{${Math.abs(x)}} = ${Math.pow(parseFloat(a), Math.abs(x))}$$, więc $$a = ${a}$$`,
      );
    } else if (x === 0.5 || x === "1/2") {
      steps.push(`$$a^{0.5} = \\sqrt{a} = ${yLatex} \\implies a = ${a}$$`);
    } else if (x === "1/3") {
      steps.push(`$$a^{1/3} = \\sqrt[3]{a} = ${yLatex} \\implies a = ${a}$$`);
    } else {
      steps.push(
        `Szukamy liczby, która podniesiona do potęgi $$${x}$$ da $$${yLatex}$$.`,
      );
    }

    steps.push(`$$a = ${a}$$`);
    return steps;
  }
}

module.exports = ExponentialFunctionValues;
