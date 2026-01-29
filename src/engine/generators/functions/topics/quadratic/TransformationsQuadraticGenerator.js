const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");
const SVGUtils = require("../../../../utils/SVGUtils");
const TransformationsQuadraticValues = require("../../values/TransformationsQuadraticValues");

class TransformationsQuadraticGenerator extends BaseGenerator {
  generateShiftParabolaProblem() {
    const params = TransformationsQuadraticValues.getShiftParabolaParams(
      this.difficulty,
    );

    const a = MathUtils.randomElement(params.aList);
    const p = MathUtils.randomInt(params.rangeV[0], params.rangeV[1]);
    const q = MathUtils.randomInt(params.rangeV[0], params.rangeV[1]);

    // g(x) = Ax^2 + Bx + C
    const A = a;
    const B = -2 * a * p;
    const C = a * p * p + q;

    const formulaBase = `${a === 1 ? "" : a === -1 ? "-" : a}x^2`;
    const formulaNew = MathUtils.formatPolynomial(A, B, C);

    const templates = TransformationsQuadraticValues.getShiftParabolaTemplates(
      formulaBase,
      p,
      q,
    );
    const question = MathUtils.randomElement(templates)();

    const correctAnswer = `g(x) = ${formulaNew}`;
    const distractors =
      TransformationsQuadraticValues.generateShiftParabolaDistractors(
        A,
        B,
        C,
        p,
        formulaNew,
        MathUtils.formatPolynomial.bind(MathUtils),
      );

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { a, p, q },
      correctAnswer: correctAnswer,
      distractors: distractors,
      steps: [
        `Przesunięcie o wektor $$[p, q]$$ oznacza, że do wzoru wstawiamy $$(x-p)$$ zamiast $$x$$ i dodajemy $$q$$ na końcu.`,
        `Postać kanoniczna: $$g(x) = ${a}(x - (${p}))^2 + (${q})$$`,
        `$$g(x) = ${a}(x ${p > 0 ? "-" : "+"} ${Math.abs(p)})^2 ${q >= 0 ? "+" : ""}${q}$$`,
        `Rozwijamy wzór skróconego mnożenia: $$${a}(x^2 ${p > 0 ? "-" : "+"} ${2 * Math.abs(p)}x + ${p * p}) ${q >= 0 ? "+" : ""}${q}$$`,
        `$$g(x) = ${A}x^2 ${B >= 0 ? "+" : ""}${B}x + ${a * p * p} ${q >= 0 ? "+" : ""}${q}$$`,
        `$$g(x) = ${formulaNew}$$`,
      ],
      questionType: "open",
      answerFormat: "g(x) = Ax^2 + Bx + C",
    });
  }

  generateInequalityGraphProblem() {
    const params = TransformationsQuadraticValues.getInequalityGraphParams(
      this.difficulty,
    );

    const a = MathUtils.randomElement(params.aList);
    const x1 = MathUtils.randomInt(params.rootRange[0], params.rootRange[1]);
    let x2 = MathUtils.randomInt(params.rootRange[0], params.rootRange[1]);
    while (x1 === x2)
      x2 = MathUtils.randomInt(params.rootRange[0], params.rootRange[1]);

    const b = -a * (x1 + x2);
    const c = a * x1 * x2;

    const p = (x1 + x2) / 2;
    const q = a * p * p + b * p + c;

    const sign = MathUtils.randomElement(["<", ">", "\\le", "\\ge"]);

    const isUp = a > 0;
    const isGr = sign.includes(">");
    const isCl =
      sign.includes("=") || sign.includes("le") || sign.includes("ge");

    const brL = isCl ? "\\langle" : "(";
    const brR = isCl ? "\\rangle" : ")";

    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);

    // up & > 0 (gr) -> outside
    // up & < 0      -> inside
    // down & > 0    -> inside
    // down & < 0    -> outside

    // (!up && gr) || (up && !gr) -> xor logic
    const isInside = isUp !== isGr;

    let res;
    if (isInside) {
      res = `${brL}${minX}, ${maxX}${brR}`;
    } else {
      res = `(-\\infty, ${minX}${brR} \\cup ${brL}${maxX}, \\infty)`;
    }

    const templates =
      TransformationsQuadraticValues.getInequalityGraphTemplates(
        a,
        sign,
        minX,
        maxX,
        res,
      );
    const question = MathUtils.randomElement(templates)();

    const correctAnswer = `x \\in ${res}`;
    const distractors =
      TransformationsQuadraticValues.generateInequalityGraphDistractors(
        isInside,
        minX,
        maxX,
        res,
      );

    const uniqueDistractors = [];
    const used = new Set([correctAnswer]);
    for (const d of distractors) {
      if (!used.has(d)) {
        uniqueDistractors.push(d);
        used.add(d);
      }
      if (uniqueDistractors.length === 3) break;
    }

    return this.createResponse({
      question: question,
      latex: ``,
      image: SVGUtils.generateSVG({
        a,
        b,
        c,
        p,
        q,
        x1,
        x2,
        highlight: "roots",
      }),
      variables: { x1, x2, a, sign },
      correctAnswer: correctAnswer,
      distractors: uniqueDistractors,
      steps: [
        `Odczytujemy z wykresu miejsca zerowe: $$x_1 = ${minX}, x_2 = ${maxX}$$.`,
        `Parabola ma ramiona skierowane w ${a > 0 ? "górę" : "dół"}.`,
        `Szukamy wartości ${isGr ? "większych" : "mniejszych"} od zera (część wykresu ${isGr ? "nad osią" : "pod osią"}).`,
        `Odp: $$x \\in ${res}$$`,
      ],
      questionType: "closed",
    });
  }
}

module.exports = TransformationsQuadraticGenerator;
