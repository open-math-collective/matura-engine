const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");
const FunctionPropertiesValues = require("../../values/FunctionPropertiesValues");

class FunctionPropertiesGenerator extends BaseGenerator {
  generatePointBelongsParam() {
    const { x0, m, formulaLatex, stepsCalc } =
      FunctionPropertiesValues.generatePointBelongsScenario(this.difficulty);

    const q = FunctionPropertiesValues.getPointBelongsTemplates(x0).replace(
      "[FORMULA]",
      formulaLatex,
    );

    return this.createResponse({
      question: q,
      latex: null,
      image: null,
      variables: { x0, m },
      correctAnswer: `m = ${m}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `m = ${m}`,
        [`m = ${m + 1}`, `m = ${-m}`, `m = 0`, `m = ${m - 1}`, `m = ${m * 2}`],
        () => `m = ${m + MathUtils.randomInt(-5, 5)}`,
      ),
      steps: [
        `Skoro punkt $$A$$ należy do wykresu, to jego współrzędne spełniają równanie funkcji.`,
        `Podstawiamy $$x = ${x0}$$ i $$y = m$$.`,
        stepsCalc,
        `$$m = ${m}$$`,
      ],
      questionType: "closed",
    });
  }

  generateReadGraphProperties() {
    const { segmentsCountRange, rangeXY } =
      FunctionPropertiesValues.getReadGraphParams(this.difficulty);

    const segmentsCount = MathUtils.randomInt(
      segmentsCountRange[0],
      segmentsCountRange[1],
    );

    const points = [];
    let currX = rangeXY[0];
    let currY = MathUtils.randomInt(rangeXY[0], rangeXY[1]);
    points.push({ x: currX, y: currY });

    for (let i = 0; i < segmentsCount; i++) {
      currX += MathUtils.randomInt(2, 4);
      if (currX > rangeXY[1]) {
        currX = rangeXY[1];
      }

      currY = MathUtils.randomInt(rangeXY[0], rangeXY[1]);
      points.push({ x: currX, y: currY });
      if (currX >= rangeXY[1]) break;
    }

    const ys = points.map((p) => p.y);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const range = `\\langle ${minY}, ${maxY} \\rangle`;

    const templates = [
      "Na rysunku przedstawiono wykres funkcji $$y=f(x)$$. Zbiorem wartości tej funkcji jest:",
      "Wykres funkcji $$y=f(x)$$ przedstawiono na rysunku. Zbiór wartości tej funkcji to:",
      "Dla funkcji $$y=f(x)$$ o wykresie przedstawionym na rysunku, zbiorem wartości jest:",
      "Przedstawiono wykres funkcji $$f$$. Zbiór wartości funkcji $$f$$ to:",
      "Na podstawie wykresu funkcji $$y=f(x)$$ podaj jej zbiór wartości:",
      "Jaki jest zbiór wartości funkcji $$y=f(x)$$ przedstawionej na rysunku?",
      "Wskaż zbiór wartości funkcji $$f$$ na podstawie jej wykresu:",
      "Podaj zbiór wartości funkcji $$y=f(x)$$ odczytany z wykresu:",
      "Zbadaj zbiór wartości funkcji $$f$$ na podstawie przedstawionego wykresu:",
      "Odczytaj zbiór wartości funkcji $$y=f(x)$$ z przedstawionego wykresu:",
      "Na rysunku pokazano wykres funkcji $$f$$. Podaj jej zbiór wartości:",
      "Wyznacz zbiór wartości funkcji $$y=f(x)$$ na podstawie wykresu:",
      "Podaj zbiór wartości funkcji $$f(x)$$ przedstawionej graficznie:",
      "Z przedstawionego wykresu funkcji $$y=f(x)$$ odczytaj jej zbiór wartości:",
      "Odczytaj z wykresu funkcji $$f$$ jej zbiór wartości:",
      "Dla funkcji przedstawionej na wykresie podaj zbiór wartości:",
      "Na podstawie graficznego przedstawienia funkcji $$f$$ podaj jej zbiór wartości:",
      "Jaki zbiór wartości odpowiada funkcji przedstawionej na wykresie?",
      "Wskaż na podstawie wykresu zbiór wartości funkcji $$y=f(x)$$:",
      "Podaj zbiór wszystkich wartości przyjmowanych przez funkcję $$f$$ na wykresie:",
    ];

    return this.createResponse({
      question: MathUtils.randomElement(templates),
      latex: ``,
      image: this.generateSVG({ type: "polyline", points }),
      variables: { points, minY, maxY },
      correctAnswer: range,
      distractors: MathUtils.ensureUniqueDistractors(
        range,
        [
          `\\langle ${points[0].x}, ${points[points.length - 1].x} \\rangle`,
          `\\langle ${minY - 2}, ${maxY + 2} \\rangle`,
          `\\langle ${minY}, ${maxY})`,
          `\\langle ${minY - 1}, ${maxY} \\rangle`,
        ],
        () => `\\langle ${minY + 1}, ${maxY} \\rangle`,
      ),
      steps: [
        `Odczytujemy z osi $$Oy$$ najniższy i najwyższy punkt wykresu.`,
        `Najmniejsza wartość: $$y_{min} = ${minY}$$`,
        `Największa wartość: $$y_{max} = ${maxY}$$`,
        `Funkcja jest ciągła (połączone odcinki), więc zbiór wartości to $$${range}$$`,
      ],
      questionType: "closed",
    });
  }

  generateFunctionDomain() {
    const { range, polynomialProb } =
      FunctionPropertiesValues.getFunctionDomainParams(this.difficulty);

    const x1 = MathUtils.randomInt(range[0], range[1]);
    let x2 = MathUtils.randomInt(range[0], range[1]);
    while (x1 === x2) x2 = MathUtils.randomInt(range[0], range[1]);

    const showPolynomial = Math.random() < polynomialProb;
    let denominatorLatex;

    if (showPolynomial) {
      const b = -(x1 + x2);
      const c = x1 * x2;
      denominatorLatex = MathUtils.formatPolynomial(1, b, c);
    } else {
      const p1 = x1 > 0 ? `(x-${x1})` : `(x+${Math.abs(x1)})`;
      const p2 = x2 > 0 ? `(x-${x2})` : `(x+${Math.abs(x2)})`;
      denominatorLatex = `${p1}${p2}`;
    }

    const templates = [
      `Dziedziną funkcji $$f$$ określonej wzorem $$f(x) = \\frac{2x+1}{${denominatorLatex}}$$ jest zbiór liczb rzeczywistych z wyłączeniem jakich liczb?`,
      `Funkcja $$f(x) = \\frac{2x+1}{${denominatorLatex}}$$ nie jest określona dla jakich wartości $$x$$?`,
      `Dla jakich liczb funkcja $$f(x) = \\frac{2x+1}{${denominatorLatex}}$$ nie jest określona?`,
      `Wskaż wartości, które należy wykluczyć z dziedziny funkcji $$f(x) = \\frac{2x+1}{${denominatorLatex}}$$.`,
      `Jakie liczby należy wykluczyć z dziedziny funkcji $$f(x) = \\frac{2x+1}{${denominatorLatex}}$$?`,
      `Dla jakich $$x$$ funkcja $$f(x) = \\frac{2x+1}{${denominatorLatex}}$$ nie ma sensu?`,
      `Wyznacz wartości wykluczone z dziedziny funkcji $$f(x) = \\frac{2x+1}{${denominatorLatex}}$$.`,
      `Podaj liczby, dla których funkcja $$f(x) = \\frac{2x+1}{${denominatorLatex}}$$ nie jest określona.`,
      `Znajdź wartości wykluczone z dziedziny $$f(x) = \\frac{2x+1}{${denominatorLatex}}$$.`,
      `Oblicz, dla jakich $$x$$ funkcja $$f(x) = \\frac{2x+1}{${denominatorLatex}}$$ nie istnieje.`,
      `Wskaż miejsca, w których funkcja $$f(x) = \\frac{2x+1}{${denominatorLatex}}$$ nie jest określona.`,
      `Podaj wartości $$x$$, dla których $$f(x) = \\frac{2x+1}{${denominatorLatex}}$$ nie ma wartości.`,
      `Dziedzina funkcji $$f(x) = \\frac{2x+1}{${denominatorLatex}}$$ nie obejmuje jakich liczb?`,
      `Które liczby nie należą do dziedziny funkcji $$f(x) = \\frac{2x+1}{${denominatorLatex}}$$?`,
      `Z jakich liczb składa się zbiór wykluczony z dziedziny $$f(x) = \\frac{2x+1}{${denominatorLatex}}$$?`,
    ];

    return this.createResponse({
      question: MathUtils.randomElement(templates),
      latex: null,
      image: null,
      variables: { x1, x2 },
      correctAnswer: `\\{${Math.min(x1, x2)}, ${Math.max(x1, x2)}\\}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `\\{${Math.min(x1, x2)}, ${Math.max(x1, x2)}\\}`,
        [
          `\\{${Math.min(-x1, -x2)}, ${Math.max(-x1, -x2)}\\}`,
          `\\{${x1}\\}`,
          `\\mathbb{R}`,
          `\\{${x2}\\}`,
          `\\{${Math.min(x1, x2)}\\}`,
        ],
        () => `\\{${x1 + 1}, ${x2 + 1}\\}`,
      ),
      steps: [
        `Mianownik musi być różny od zera.`,
        `Miejsca zerowe mianownika: $$${x1}, ${x2}$$`,
        `Te liczby musimy wyrzucić ze zbioru liczb rzeczywistych.`,
      ],
      questionType: "open",
      answerFormat: "{x_1, x_2}",
    });
  }

  generateFunctionValue() {
    const { coeffRange, xRange, degree } =
      FunctionPropertiesValues.getFunctionValueParams(this.difficulty);

    const actualDegree =
      typeof degree === "string" ? degree : MathUtils.randomElement(degree);
    const a = MathUtils.randomInt(xRange[0], xRange[1]);
    const coeffs = FunctionPropertiesValues.generatePolynomial(
      actualDegree,
      coeffRange,
    );
    const result = FunctionPropertiesValues.calculatePolynomialValue(
      coeffs,
      a,
      actualDegree,
    );
    const formulaLatex = FunctionPropertiesValues.formatPolynomialLatex(
      coeffs,
      actualDegree,
    );

    const templates = [
      `Dana jest funkcja $$f(x) = ${formulaLatex}$$. Wartość tej funkcji dla argumentu $$x=${a}$$ jest równa:`,
      `Dla funkcji $$f(x) = ${formulaLatex}$$ oblicz $$f(${a})$$.`,
      `Funkcja $$f(x) = ${formulaLatex}$$ przyjmuje jaką wartość dla $$x = ${a}$$?`,
      `Oblicz wartość funkcji $$f(x) = ${formulaLatex}$$ dla argumentu $$x = ${a}$$.`,
      `Podaj $$f(${a})$$ dla funkcji $$f(x) = ${formulaLatex}$$.`,
    ];

    return this.createResponse({
      question: MathUtils.randomElement(templates),
      latex: ``,
      image: null,
      variables: { a, ...coeffs },
      correctAnswer: `${result}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `${result}`,
        [
          `${result + coeffs.c1 + 2 * coeffs.c3}`,
          `${result + 2 * coeffs.c1 + coeffs.c2}`,
          `${result - 10}`,
          `${result + 1}`,
          `${result - 1}`,
        ],
        () => `${result + MathUtils.randomInt(-20, 20)}`,
      ),
      steps: [
        `Podstawiamy $$x = ${a}$$ do wzoru funkcji.`,
        `$$f(${a}) = ${result}$$`,
      ],
      questionType: "closed",
    });
  }

  generateSVG(params) {
    const size = 300;
    const center = size / 2;
    const scale = 20; // px

    let grid = "";
    for (let i = -7; i <= 7; i++) {
      if (i === 0) continue;

      const pos = i * scale;
      const screenX = center + pos;
      const screenY = center - pos;

      // X
      grid += `<line x1="${screenX}" y1="0" x2="${screenX}" y2="${size}" stroke="#f0f0f0" stroke-width="1" />`;
      // Y
      grid += `<line x1="0" y1="${screenY}" x2="${size}" y2="${screenY}" stroke="#f0f0f0" stroke-width="1" />`;

      // kreski na X
      grid += `<line x1="${screenX}" y1="${center - 3}" x2="${screenX}" y2="${center + 3}" stroke="#888" stroke-width="1" />`;
      // liczby na X
      grid += `<text x="${screenX}" y="${center + 15}" font-size="10" text-anchor="middle" fill="#666">${i}</text>`;

      // kreski na Y
      grid += `<line x1="${center - 3}" y1="${screenY}" x2="${center + 3}" y2="${screenY}" stroke="#888" stroke-width="1" />`;
      // liczby na Y
      grid += `<text x="${center - 6}" y="${screenY + 3}" font-size="10" text-anchor="end" fill="#666">${i}</text>`;
    }

    const axes = `
      <line x1="0" y1="${center}" x2="${size}" y2="${center}" stroke="#333" stroke-width="2" />
      <line x1="${center}" y1="0" x2="${center}" y2="${size}" stroke="#333" stroke-width="2" />
      <text x="${size - 10}" y="${center + 15}" font-weight="bold" font-size="12">x</text>
      <text x="${center + 10}" y="15" font-weight="bold" font-size="12">y</text>
      <text x="${center - 10}" y="${center + 15}" font-size="10" fill="#666">0</text>
    `;

    let graph = "";
    if (params.type === "polyline") {
      let pts = "";
      params.points.forEach((p) => {
        const sx = center + p.x * scale;
        const sy = center - p.y * scale;
        pts += `${sx},${sy} `;
        graph += `<circle cx="${sx}" cy="${sy}" r="3" fill="blue" />`;
      });
      graph += `<polyline points="${pts}" fill="none" stroke="blue" stroke-width="2" />`;
    }

    return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff">
      ${grid}
      ${axes}
      ${graph}
    </svg>`;
  }
}

module.exports = FunctionPropertiesGenerator;
