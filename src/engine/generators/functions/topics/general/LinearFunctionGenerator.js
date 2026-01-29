const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");
const LinearFunctionValues = require("../../values/LinearFunctionValues");

class LinearFunctionGenerator extends BaseGenerator {
  generateLinearRoot() {
    const { a, b, root } = LinearFunctionValues.generateLinearRootScenario(
      this.difficulty,
    );

    const formula = LinearFunctionValues.formatLinear(a, b);
    const aLatex = LinearFunctionValues.fractionToLatex(a);
    const bLatex = LinearFunctionValues.fractionToLatex(-b);
    const negBLatex = LinearFunctionValues.fractionToLatex(-b);

    const q = LinearFunctionValues.getLinearRootTemplates();

    return this.createResponse({
      question: q,
      latex: `f(x) = ${formula}`,
      image: null,
      variables: { a, b, root },
      correctAnswer: `${root}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `${root}`,
        [
          `${-root}`,
          `${Math.floor(b)}`,
          `${root + 1}`,
          `${root - 1}`,
          `${root * 2}`,
        ],
        () => `${root + MathUtils.randomInt(-5, 5)}`,
      ),
      steps: [
        `Szukamy takiego $$x$$, dla którego $$f(x) = 0$$.`,
        `$$${formula} = 0$$`,
        `$$${aLatex}x = ${bLatex}$$`,
        `$$x = ${negBLatex} : (${aLatex}) = ${root}$$`,
      ],
      questionType: "open",
      answerFormat: "number",
    });
  }

  generateLinearGraphAnalysis() {
    const params = LinearFunctionValues.getGraphAnalysisParams(this.difficulty);
    const a = MathUtils.randomElement(params.aValues);
    const b = MathUtils.randomElement(params.bValues);

    const aSign = a > 0 ? ">" : "<";
    const bSign = b > 0 ? ">" : "<";
    const correct = `a ${aSign} 0 \\quad \\text{i} \\quad b ${bSign} 0`;

    const wrong1 = `a ${aSign === ">" ? "<" : ">"} 0 \\quad \\text{i} \\quad b ${bSign} 0`;
    const wrong2 = `a ${aSign} 0 \\quad \\text{i} \\quad b ${bSign === ">" ? "<" : ">"} 0`;
    const wrong3 = `a ${aSign === ">" ? "<" : ">"} 0 \\quad \\text{i} \\quad b ${bSign === ">" ? "<" : ">"} 0`;

    const templates = [
      "Na rysunku przedstawiono wykres funkcji liniowej $$f(x) = ax + b$$. Prawdziwe jest zdanie:",
      "Wykres funkcji liniowej $$f(x) = ax + b$$ pokazano na rysunku. Które zdanie jest prawdziwe?",
      "Dla funkcji liniowej $$f(x) = ax + b$$ o wykresie przedstawionym na rysunku, prawdziwe jest:",
      "Na podstawie wykresu funkcji $$f(x) = ax + b$$ wskaż prawdziwe zdanie:",
      "Wykres $$f(x) = ax + b$$ przedstawiono graficznie. Prawdziwe jest zdanie:",
    ];

    return this.createResponse({
      question: MathUtils.randomElement(templates),
      latex: ``,
      image: this.generateSVG({ type: "linear_full", a, b }),
      variables: { a, b },
      correctAnswer: correct,
      distractors: [wrong1, wrong2, wrong3],
      steps: [
        `Współczynnik $$a$$ decyduje o monotoniczności. Funkcja jest ${a > 0 ? "rosnąca" : "malejąca"}, więc $$a ${aSign} 0$$.`,
        `Współczynnik $$b$$ to punkt przecięcia z osią $$Oy$$ ($$0, b$$). Punkt ten leży ${b > 0 ? "nad osią" : "pod osią"} $$Ox$$, więc $$b ${bSign} 0$$.`,
      ],
      questionType: "closed",
    });
  }

  generateLinearMonotonicityParam() {
    const params = LinearFunctionValues.getMonotonicityParams(this.difficulty);

    let coeffM;
    if (Array.isArray(params.coeffMRange)) {
      coeffM = MathUtils.randomElement(params.coeffMRange);
    } else {
      coeffM = MathUtils.randomInt(
        params.coeffMRange[0],
        params.coeffMRange[1],
      );
    }

    const validConst =
      MathUtils.randomInt(1, 4) *
      Math.abs(coeffM) *
      (Math.random() > 0.5 ? 1 : -1);

    const bracket = `${coeffM}m ${validConst >= 0 ? "+" : "-"} ${Math.abs(validConst)}`;
    const type = MathUtils.randomElement(["rosnąca", "malejąca"]);
    const boundary = -validConst / coeffM;

    let boundaryStr;
    if (Number.isInteger(boundary)) {
      boundaryStr = `${boundary}`;
    } else {
      boundaryStr = LinearFunctionValues.fractionToLatex(boundary);
    }

    let finalSign;
    if (type === "rosnąca") {
      finalSign = coeffM > 0 ? ">" : "<";
    } else {
      finalSign = coeffM > 0 ? "<" : ">";
    }

    const templates = [
      `Dla jakiego parametru $$m$$ funkcja liniowa $$f(x) = (${bracket})x + 5$$ jest ${type}?`,
      `Funkcja $$f(x) = (${bracket})x + 5$$ jest ${type} dla jakiego $$m$$?`,
      `Wyznacz $$m$$ tak, aby funkcja $$f(x) = (${bracket})x + 5$$ była ${type}.`,
      `Dla jakich wartości $$m$$ funkcja $$f(x) = (${bracket})x + 5$$ jest funkcją ${type}?`,
      `Znajdź warunek na $$m$$, przy którym $$f(x) = (${bracket})x + 5$$ jest ${type}.`,
      `Podaj warunek na $$m$$ dla funkcji $$f(x) = (${bracket})x + 5$$ aby była ${type}.`,
      `Dla jakich $$m$$ funkcja liniowa $$f(x) = (${bracket})x + 5$$ jest ${type}?`,
      `Znajdź zbiór wartości $$m$$, dla których $$f(x) = (${bracket})x + 5$$ jest ${type}.`,
      `Wyznacz zbiór $$m$$ tak, aby $$f(x) = (${bracket})x + 5$$ była funkcją ${type}.`,
      `Funkcja liniowa $$f(x) = (${bracket})x + 5$$ ma być ${type}. Dla jakich $$m$$?`,
      `Podaj zbiór wszystkich $$m$$, dla których $$f(x) = (${bracket})x + 5$$ jest ${type}.`,
      `Dla jakiego $$m$$ współczynnik kierunkowy $$f(x) = (${bracket})x + 5$$ zapewnia, że funkcja jest ${type}?`,
      `Wskaż warunek na parametr $$m$$ w funkcji $$f(x) = (${bracket})x + 5$$ aby była ${type}.`,
      `Oblicz, dla jakich $$m$$ funkcja $$f(x) = (${bracket})x + 5$$ spełnia warunek bycia funkcją ${type}.`,
      `Zbadaj, dla jakich wartości $$m$$ funkcja $$f(x) = (${bracket})x + 5$$ jest ${type}.`,
    ];

    return this.createResponse({
      question: MathUtils.randomElement(templates),
      latex: ``,
      image: null,
      variables: { coeffM, validConst, type, boundary },
      correctAnswer: `$$m ${finalSign} ${boundaryStr}$$`,
      distractors: [
        `$$m ${finalSign === ">" ? "<" : ">"} ${boundaryStr}$$`,
        `$$m = ${boundaryStr}$$`,
        `$$m ${finalSign} ${-boundary}$$`,
      ],
      steps: [
        `Funkcja liniowa jest ${type}, gdy jej współczynnik kierunkowy $$a$$ jest ${type === "rosnąca" ? "dodatni ($$a>0$$)" : "ujemny ($$a<0$$)"}.`,
        `$$${bracket} ${type === "rosnąca" ? ">" : "<"} 0$$`,
        `$$${coeffM}m ${type === "rosnąca" ? ">" : "<"} ${-validConst}$$`,
        `Dzielimy przez $$${coeffM}$$ ${coeffM < 0 ? "(pamiętając o zmianie znaku!)" : ""}:`,
        `$$m ${finalSign} ${boundaryStr}$$`,
      ],
      questionType: "open",
      answerFormat: "m=x",
    });
  }

  generateLinearProperties() {
    const params = LinearFunctionValues.getLinearPropertiesParams(
      this.difficulty,
    );
    const a = MathUtils.randomInt(params.aRange[0], params.aRange[1]) || 1;
    const b = MathUtils.randomInt(params.bRange[0], params.bRange[1]);

    const formula = `f(x) = ${a === 1 ? "" : a === -1 ? "-" : a}x ${b >= 0 ? "+" : ""}${b}`;
    const monotonicity = a > 0 ? "rosnąca" : a < 0 ? "malejąca" : "stała";
    const intercept = `(0, ${b})`;

    const q = LinearFunctionValues.getLinearPropertiesTemplates(formula);

    const wrongIntercept1 =
      b === 0 ? `(0, ${MathUtils.randomInt(1, 5)})` : `(0, ${-b})`;
    const wrongIntercept2 =
      b === 0 ? `(${MathUtils.randomInt(1, 5)}, 0)` : `(${b}, 0)`;

    return this.createResponse({
      question: q,
      latex: ``,
      image: this.generateSVG({ type: "linear", a, b }),
      variables: { a, b },
      correctAnswer: `${monotonicity} i jej wykres przecina oś $$Oy$$ w punkcie $$${intercept}$$`,
      distractors: [
        `${monotonicity} i jej wykres przecina oś $$Oy$$ w punkcie $${wrongIntercept1}$$`,
        `${a > 0 ? "malejąca" : "rosnąca"} i jej wykres przecina oś $$Oy$$ w punkcie $$${intercept}$$`,
        `${a > 0 ? "malejąca" : "rosnąca"} i jej wykres przecina oś $$Oy$$ w punkcie $${wrongIntercept2}$$`,
      ],
      steps: [
        `Współczynnik kierunkowy $$a = ${a}$$ (${monotonicity}).`,
        `Wyraz wolny $$b = ${b}$$ (punkt $$(0, ${b})$$).`,
      ],
      questionType: "closed",
    });
  }

  generateSVG(params) {
    const size = 300;
    const center = size / 2;
    const scale = 20;
    let svg = `<line x1="0" y1="${center}" x2="${size}" y2="${center}" stroke="#333" stroke-width="1" /><line x1="${center}" y1="0" x2="${center}" y2="${size}" stroke="#333" stroke-width="1" /><text x="${size - 15}" y="${center + 15}">x</text><text x="${center + 10}" y="15">y</text>`;

    if (params.type === "linear" || params.type === "linear_full") {
      const a = params.a;
      const b = params.b;
      const x1 = -10,
        y1 = a * x1 + b;
      const x2 = 10,
        y2 = a * x2 + b;
      const p1 = { x: center + x1 * scale, y: center - y1 * scale };
      const p2 = { x: center + x2 * scale, y: center - y2 * scale };
      svg += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="blue" stroke-width="2" />`;
    }
    return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff">${svg}</svg>`;
  }
}

module.exports = LinearFunctionGenerator;
