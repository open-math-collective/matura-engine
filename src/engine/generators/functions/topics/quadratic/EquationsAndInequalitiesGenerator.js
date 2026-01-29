const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");
const EquationsAndInequalitiesValues = require("../../values/EquationsAndInequalitiesValues");

class EquationsAndInequalitiesGenerator extends BaseGenerator {
  generateInequalityProblem() {
    const params = EquationsAndInequalitiesValues.getInequalityParams(
      this.difficulty,
    );

    const x1 = MathUtils.randomInt(params.rootRange[0], params.rootRange[1]);
    let x2 = MathUtils.randomInt(params.rootRange[0], params.rootRange[1]);
    while (x1 === x2)
      x2 = MathUtils.randomInt(params.rootRange[0], params.rootRange[1]);

    const a = MathUtils.randomElement(params.aList);
    const b = -a * (x1 + x2);
    const c = a * x1 * x2;
    const sign = MathUtils.randomElement([">", "<", ">=", "<="]);

    const isUp = a > 0;
    const isGr = sign.includes(">");
    const isCl = sign.includes("=");
    const brL = isCl ? "\\langle" : "(";
    const brR = isCl ? "\\rangle" : ")";

    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);

    const res =
      isUp !== isGr
        ? `${brL}${minX}, ${maxX}${brR}`
        : `(-\\infty, ${minX}${brR} \\cup ${brL}${maxX}, \\infty)`;

    const templates = EquationsAndInequalitiesValues.getInequalityTemplates();
    const question = MathUtils.randomElement(templates)();

    return this.createResponse({
      question: question,
      latex: `${MathUtils.formatPolynomial(a, b, c)} ${sign} 0`,
      image: null,
      variables: { x1, x2 },
      correctAnswer: `x \\in ${res}`,
      distractors: EquationsAndInequalitiesValues.generateInequalityDistractors(
        res,
        minX,
        maxX,
        isCl,
      ),
      steps: [
        `Miejsca zerowe: ${minX}, ${maxX}`,
        `Parabola ${a > 0 ? "uśmiechnięta" : "smutna"}`,
        `Odp: ${res}`,
      ],
      questionType: "open",
      answerFormat: "x \\in (...)",
    });
  }

  generateSolutionsCountProblem() {
    const { a, b, c, p, q } = this.generateCoefficients();
    const condition = a > 0 ? "k >" : "k <";
    const correctAnswer = `k \\in (${condition === "k >" ? `${q}, \\infty` : `-\\infty, ${q}`})`;

    const formula = MathUtils.formatPolynomial(a, b, c);
    const templates =
      EquationsAndInequalitiesValues.getSolutionsCountTemplates(formula);
    const question = MathUtils.randomElement(templates)();

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { q },
      correctAnswer: correctAnswer,
      distractors:
        EquationsAndInequalitiesValues.generateSolutionsCountDistractors(
          q,
          condition,
          p,
        ),
      steps: [
        `Dwa rozwiązania gdy delta jest większa niż zero.`,
        `Delta: $$\\Delta = b^2 - 4a(c - k)$$`,
        `Delta: $$\\Delta = ${b * b} - 4 \\cdot ${a} \\cdot (${c} - k)`,
        `Warunek: $$${b * b} - 4 \\cdot ${a} \\cdot (${c} - k) > 0$$`,
        `Rozwiązując nierówność względem k, otrzymujemy: $$${correctAnswer}$$`,
      ],
      questionType: "closed",
    });
  }

  generateVietaProblem() {
    const params = EquationsAndInequalitiesValues.getVietaParams(
      this.difficulty,
    );

    const a = MathUtils.randomElement(params.aList);
    const x1 = MathUtils.randomInt(params.rootRange[0], params.rootRange[1]);
    const x2 = MathUtils.randomInt(params.rootRange[0], params.rootRange[1]);
    const b = -a * (x1 + x2);
    const c = a * x1 * x2;

    const formatFrac = (num, den) =>
      EquationsAndInequalitiesValues.formatFraction(num, den);

    const sum = formatFrac(-b, a);
    const prod = formatFrac(c, a);
    const correctAnswer = `${sum}, ${prod}`;

    const formula = MathUtils.formatPolynomial(a, b, c);
    const templates = EquationsAndInequalitiesValues.getVietaTemplates(formula);
    const question = MathUtils.randomElement(templates)();

    return this.createResponse({
      question: question,
      latex: ``,
      image: null,
      variables: {},
      correctAnswer: correctAnswer,
      distractors: EquationsAndInequalitiesValues.generateVietaDistractors(
        sum,
        prod,
        formatFrac,
        b,
        a,
        c,
        correctAnswer,
      ),
      steps: [`Suma = $$-b/a = ${sum}$$`, `Iloczyn = $$c/a = ${prod}$$`],
      questionType: "closed",
    });
  }

  generateFormulaFromVertexProblem() {
    const params = EquationsAndInequalitiesValues.getFormulaFromVertexParams(
      this.difficulty,
    );

    const p = MathUtils.randomInt(params.pRange[0], params.pRange[1]);
    const q = MathUtils.randomInt(params.qRange[0], params.qRange[1]);
    const a = MathUtils.randomElement(params.aList);

    const dx = 1;
    const x = p + dx;
    const y = a * dx * dx + q;

    const aStr = a === 1 ? "" : a === -1 ? "-" : a;
    const pSign = p > 0 ? "-" : "+";
    const qSign = q >= 0 ? "+" : "";

    const formula = `f(x) = ${aStr}(x ${pSign} ${Math.abs(p)})^2 ${qSign}${q}`;

    const templates =
      EquationsAndInequalitiesValues.getFormulaFromVertexTemplates(p, q, x, y);
    const question = MathUtils.randomElement(templates)();

    return this.createResponse({
      question: question,
      latex: ``,
      image: null,
      variables: {},
      correctAnswer: formula,
      distractors:
        EquationsAndInequalitiesValues.generateFormulaFromVertexDistractors(
          a,
          aStr,
          pSign,
          Math.abs(p),
          qSign,
          q,
        ),
      steps: [`Postać kanoniczna. Podstawiamy W i A, wyliczamy a.`],
      questionType: "open",
      answerFormat: "f(x) = ...",
    });
  }

  generateCoeffsFromVertexProblem() {
    const { a, b, c, p, q } = this.generateCoefficients();
    const correctAnswer = `b=${b}, c=${c}`;

    const templates =
      EquationsAndInequalitiesValues.getCoeffsFromVertexTemplates(p, q, a);
    const question = MathUtils.randomElement(templates)();

    return this.createResponse({
      question: question,
      latex: ``,
      image: null,
      variables: {},
      correctAnswer: correctAnswer,
      distractors:
        EquationsAndInequalitiesValues.generateCoeffsFromVertexDistractors(
          b,
          c,
          correctAnswer,
        ),
      steps: [`$$p=-b/2a$$, $$q=ap^2+bp+c$$`],
      questionType: "open",
      answerFormat: "b=..., c=...",
    });
  }

  generateProductToGeneralProblem() {
    const params = EquationsAndInequalitiesValues.getProductToGeneralParams(
      this.difficulty,
    );

    const x1 = MathUtils.randomInt(params.rootRange[0], params.rootRange[1]);
    const x2 = MathUtils.randomInt(params.rootRange[0], params.rootRange[1]);
    const a = MathUtils.randomElement(params.aList);

    const b = -a * (x1 + x2);
    const c = a * x1 * x2;

    const formula = `f(x)=${a === 1 ? "" : a === -1 ? "-" : a}(x${x1 > 0 ? "-" : "+"}${Math.abs(x1)})(x${x2 > 0 ? "-" : "+"}${Math.abs(x2)})`;

    const innerB = -(x1 + x2);
    const innerC = x1 * x2;
    const innerPoly = `x^2 ${innerB >= 0 ? "+" : ""}${innerB}x ${innerC >= 0 ? "+" : ""}${innerC}`;

    const templates =
      EquationsAndInequalitiesValues.getProductToGeneralTemplates(formula);
    const question = MathUtils.randomElement(templates)();

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: {},
      correctAnswer: `${b}`,
      distractors:
        EquationsAndInequalitiesValues.generateProductToGeneralDistractors(
          b,
          x1,
          x2,
          a,
        ),
      steps: [
        `Wymnażamy nawiasy: $$(x${x1 > 0 ? "-" : "+"}${Math.abs(x1)})(x${x2 > 0 ? "-" : "+"}${Math.abs(x2)}) = ${innerPoly}$$`,
        `Mnożymy całość przez $$a=${a}$$:`,
        `$$f(x) = ${a}(${innerPoly}) = ${a}x^2 ${b >= 0 ? "+" : ""}${b}x ${c >= 0 ? "+" : ""}${c}$$`,
        `Współczynnik przy $$x$$ to $$b = ${b}$$`,
      ],
      questionType: "closed",
    });
  }

  generateCoefficients() {
    const params = EquationsAndInequalitiesValues.getCoeffsFromVertexParams(
      this.difficulty,
    );

    const p = MathUtils.randomInt(params.range[0], params.range[1]);
    const q = MathUtils.randomInt(params.range[0], params.range[1]);
    const a = MathUtils.randomElement(params.aList);
    const b = -2 * a * p;
    const c = a * (p * p) + q;
    return { a, b, c, p, q };
  }
}

module.exports = EquationsAndInequalitiesGenerator;
