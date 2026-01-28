const BaseGenerator = require("../../../core/BaseGenerator");
const MathUtils = require("../../../utils/MathUtils");

class IntervalsGenerator extends BaseGenerator {
  generateAbsValueProblem() {
    // |x - a| < b
    let a, b, x1, x2, valA, valB, valX1, valX2;
    const sign = MathUtils.randomElement(["<", ">", "\\le", "\\ge"]);
    const isInside = sign === "<" || sign === "\\le";
    const isClosed = sign === "\\le" || sign === "\\ge";

    if (this.difficulty === "hard") {
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
      if (this.difficulty === "easy") {
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

    const formatSet = (s, e, inside, closed) => {
      const bL = closed ? "\\langle" : "(";
      const bR = closed ? "\\rangle" : ")";
      return inside
        ? `x \\in ${bL} ${s}, ${e} ${bR}`
        : `x \\in (- \\infty, ${s} ${bR} \\cup ${bL} ${e}, \\infty)`;
    };

    const correctAns = formatSet(valX1, valX2, isInside, isClosed);

    const candidates = [
      formatSet(valX1, valX2, !isInside, isClosed),
      formatSet(valA, valB, isInside, isClosed),
    ];

    const distractors = MathUtils.ensureUniqueDistractors(
      correctAns,
      candidates,
      () => {
        if (this.difficulty === "hard") {
          const r1 = MathUtils.randomInt(-10, 10);
          const r2 = r1 + MathUtils.randomInt(1, 5);
          return formatSet(r1, r2, isInside, isClosed);
        }
        const f1 = MathUtils.randomInt(-20, 20);
        const f2 = f1 + MathUtils.randomInt(1, 10);
        return formatSet(f1, f2, isInside, isClosed);
      },
    );

    return this.createResponse({
      question:
        "Zbiór rozwiązań nierówności jest zaznaczony na osi liczbowej. Wybierz poprawny zbiór.",
      latex: null,
      image: this.generateNumberLineSVG({
        center: typeof a === "object" ? a.n / a.d : a,
        points: [x1, x2],
        pointLabels: [valX1, valX2],
        isInside,
        isClosed,
        type: "inequality",
      }),
      variables: { a: valA, b: valB, sign },
      correctAnswer: correctAns,
      distractors: distractors,
      steps: [
        `Środek przedziału to $$a = ${valA}$$, a promień (odległość od środka) to $$b = ${valB}$$.`,
        `Szukamy liczb, których odległość od $$${valA}$$ jest ${isInside ? "mniejsza" : "większa"} ${isClosed ? "lub równa" : ""} $$${valB}$$.`,
        `Odpowiedź: $$${correctAns}$$`,
      ],
      questionType: "closed",
    });
  }

  generateIntervalOpsProblem() {
    // A u B / A n B
    let valA, valB, numA, numB;

    if (this.difficulty === "hard") {
      const [an, ad] = MathUtils.randomFraction(-10, 10, [2, 5]);
      numA = an / ad;
      valA = MathUtils.toLatexFraction(an, ad);

      const offset = MathUtils.randomElement([
        -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2,
      ]);
      numB = numA + offset;

      const [bn, bd] = MathUtils.randomFraction(
        Math.floor(numA) - 2,
        Math.ceil(numA) + 2,
        [2, 5],
      );
      numB = bn / bd;
      valB = MathUtils.toLatexFraction(bn, bd);
    } else {
      const range = this.difficulty === "easy" ? [-300, 300] : [-1000, 1000];
      numA = MathUtils.randomInt(range[0], range[1]);
      const offsetLimit = this.difficulty === "easy" ? 50 : 200;
      const offset = MathUtils.randomInt(-offsetLimit, offsetLimit);
      numB = numA + offset;

      valA = `${numA}`;
      valB = `${numB}`;
    }

    const a = numA;
    const b = numB;

    const closedA = MathUtils.randomElement([true, false]);
    const closedB = MathUtils.randomElement([true, false]);
    const op = MathUtils.randomElement(["union", "intersection"]);
    const opSymbol = op === "union" ? "\\cup" : "\\cap";

    const bracketA = closedA ? "\\rangle" : ")";
    const bracketB = closedB ? "\\langle" : "(";

    let result = "";

    if (b > a) {
      if (op === "intersection") result = `\\emptyset`;
      else
        result = `(- \\infty, ${valA} ${bracketA} \\cup ${bracketB} ${valB}, \\infty)`;
    } else if (Math.abs(b - a) < 0.0001) {
      if (op === "intersection") {
        if (closedA && closedB) result = `\\{ ${valA} \\}`;
        else result = `\\emptyset`;
      } else {
        if (!closedA && !closedB)
          result = `(- \\infty, ${valA}) \\cup (${valA}, \\infty)`;
        else result = `\\mathbb{R}`;
      }
    } else {
      if (op === "intersection")
        result = `${bracketB} ${valB}, ${valA} ${bracketA}`;
      else result = `\\mathbb{R}`;
    }

    return this.createResponse({
      question: `Wyznacz $$A ${opSymbol} B$$ dla przedziałów z rysunku.`,
      latex: null,
      image: this.generateNumberLineSVG({
        type: "sets",
        a,
        b,
        pointLabels: [valA, valB],
        closedA,
        closedB,
        op,
      }),
      variables: { a: valA, b: valB, op },
      correctAnswer: result,
      distractors: [
        `(${valA}, ${valB})`,
        `\\langle ${valA}, ${valB} \\rangle`,
        `(- \\infty, ${valB} ${bracketB}`,
      ],
      steps: [
        `Zaznaczamy przedziały na osi liczbowej.`,
        b > a
          ? `Przedziały są rozłączne.`
          : Math.abs(b - a) < 0.0001
            ? `Przedziały stykają się w punkcie $$${valA}$$.`
            : `Przedziały zachodzą na siebie.`,
        `Odp: $$${result}$$`,
      ],
      questionType: "closed",
    });
  }

  generateNumberLineSVG(params) {
    const size = 300;
    const midY = 50;
    const scale = 20;
    const center = params.center || 0;
    const toSVG = (val) => size / 2 + (val - center) * scale;
    let content = "";

    if (params.type === "inequality") {
      const p1 = toSVG(params.points[0]);
      const p2 = toSVG(params.points[1]);
      const color = "blue";
      if (params.isInside) {
        content += `<line x1="${p1}" y1="${midY}" x2="${p2}" y2="${midY}" stroke="${color}" stroke-width="4" />`;
      } else {
        content += `<line x1="0" y1="${midY}" x2="${p1}" y2="${midY}" stroke="${color}" stroke-width="4" /><line x1="${p2}" y1="${midY}" x2="${size}" y2="${midY}" stroke="${color}" stroke-width="4" />`;
      }
      const fill = params.isClosed ? color : "white";
      content += `<circle cx="${p1}" cy="${midY}" r="5" fill="${fill}" stroke="${color}" stroke-width="2"/><circle cx="${p2}" cy="${midY}" r="5" fill="${fill}" stroke="${color}" stroke-width="2"/>`;

      const l1 = params.pointLabels ? params.pointLabels[0] : params.points[0];
      const l2 = params.pointLabels ? params.pointLabels[1] : params.points[1];

      const clean = (t) =>
        `${t}`.replace(/\\frac{(\d+)}{(\d+)}/, "$1/$2").replace(/[{}]/g, "");

      content += `<text x="${p1 - 5}" y="${midY + 25}" font-size="14">${clean(l1)}</text><text x="${p2 - 5}" y="${midY + 25}" font-size="14">${clean(l2)}</text>`;
    } else if (params.type === "sets") {
      const { a, b, closedA, closedB, pointLabels } = params;
      const pA = toSVG(a);
      const pB = toSVG(b);
      const lA = pointLabels ? pointLabels[0] : a;
      const lB = pointLabels ? pointLabels[1] : b;

      const clean = (t) =>
        `${t}`.replace(/\\frac{(\d+)}{(\d+)}/, "$1/$2").replace(/[{}]/g, "");

      content += `<line x1="0" y1="${midY - 10}" x2="${pA}" y2="${midY - 10}" stroke="blue" stroke-width="3" />`;
      content += `<circle cx="${pA}" cy="${midY - 10}" r="4" fill="${closedA ? "blue" : "white"}" stroke="blue" stroke-width="2"/>`;
      content += `<text x="${pA - 5}" y="${midY - 25}" font-size="12" fill="blue">${clean(lA)}</text>`;
      content += `<line x1="${pB}" y1="${midY + 10}" x2="${size}" y2="${midY + 10}" stroke="red" stroke-width="3" />`;
      content += `<circle cx="${pB}" cy="${midY + 10}" r="4" fill="${closedB ? "red" : "white"}" stroke="red" stroke-width="2"/>`;
      content += `<text x="${pB - 5}" y="${midY + 35}" font-size="12" fill="red">${clean(lB)}</text>`;
    }
    return `<svg viewBox="0 0 ${size} 100" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff"><line x1="0" y1="${midY}" x2="${size}" y2="${midY}" stroke="#333" stroke-width="1" /><line x1="${size - 10}" y1="${midY - 5}" x2="${size}" y2="${midY}" stroke="#333" stroke-width="1" /><line x1="${size - 10}" y1="${midY + 5}" x2="${size}" y2="${midY}" stroke="#333" stroke-width="1" />${content}</svg>`;
  }
}

module.exports = IntervalsGenerator;
