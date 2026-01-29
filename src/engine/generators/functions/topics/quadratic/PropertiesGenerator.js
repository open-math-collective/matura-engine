const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");
const PropertiesValues = require("../../values/PropertiesValues");

class PropertiesGenerator extends BaseGenerator {
  generateValueRangeProblem() {
    const params = PropertiesValues.getValueRangeParams(this.difficulty);

    const p = MathUtils.randomInt(params.vertexRange[0], params.vertexRange[1]);
    const q = MathUtils.randomInt(params.vertexRange[0], params.vertexRange[1]);
    const a = MathUtils.randomElement(params.aList);
    const b = -2 * a * p;
    const c = a * p * p + q;

    const range =
      a > 0 ? `\\langle ${q}, \\infty )` : `( -\\infty, ${q} \\rangle`;

    const formula = MathUtils.formatPolynomial(a, b, c);
    const templates = PropertiesValues.getValueRangeTemplates(formula);
    const question = MathUtils.randomElement(templates)();

    const distractors = PropertiesValues.generateValueRangeDistractors(a, q, p);
    const uniqueDistractors = [];
    const used = new Set([range]);
    for (const d of distractors) {
      if (!used.has(d)) {
        uniqueDistractors.push(d);
        used.add(d);
      }
      if (uniqueDistractors.length === 3) break;
    }

    return this.createResponse({
      question: question,
      latex: `f(x) = ${formula}`,
      image: null,
      variables: { a, b, c, p, q },
      correctAnswer: range,
      distractors: uniqueDistractors,
      steps: [
        `Współczynnik $$a=${a}$$, ramiona skierowane w ${a > 0 ? "górę" : "dół"}.`,
        `Współrzędna $$q=${q}$$ wierzchołka.`,
        `Zbiór wartości: $$${range}$$`,
      ],
      questionType: "open",
      answerFormat: "interval",
    });
  }

  generateMonotonicityProblem() {
    const params = PropertiesValues.getMonotonicityParams(this.difficulty);

    const p = MathUtils.randomInt(params.pRange[0], params.pRange[1]);
    const q = MathUtils.randomInt(params.pRange[0], params.pRange[1]);
    const a = MathUtils.randomElement(params.aList);
    const b = -2 * a * p;
    const c = a * p * p + q;

    const type = MathUtils.randomElement(["rosnąca", "malejąca"]);
    let interval;

    // a > 0 (U): maleje (-inf, p>, rosnie <p, inf)
    // a < 0 (n): rosnie (-inf, p>, maleje <p, inf)

    if ((a > 0 && type === "rosnąca") || (a < 0 && type === "malejąca")) {
      interval = `\\langle ${p}, \\infty )`;
    } else {
      interval = `( -\\infty, ${p} \\rangle`;
    }

    const formula = MathUtils.formatPolynomial(a, b, c);
    const templates = PropertiesValues.getMonotonicityTemplates(formula, type);
    const question = MathUtils.randomElement(templates)();

    const distractors = PropertiesValues.generateMonotonicityDistractors(
      interval,
      p,
      q,
    );
    const uniqueDistractors = [];
    const used = new Set([interval]);
    for (const d of distractors) {
      if (!used.has(d)) {
        uniqueDistractors.push(d);
        used.add(d);
      }
      if (uniqueDistractors.length === 3) break;
    }

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { a, p, type },
      correctAnswer: interval,
      distractors: uniqueDistractors,
      steps: [
        `Współrzędna $$p$$ wierzchołka $$p = \\frac{-b}{2a} = ${p}$$.`,
        `Ramiona ${a > 0 ? "góra" : "dół"}.`,
      ],
      questionType: "closed",
    });
  }

  generateMinMaxIntervalProblem() {
    const params = PropertiesValues.getMinMaxIntervalParams(this.difficulty);

    const p = MathUtils.randomInt(params.pRange[0], params.pRange[1]);
    const q = MathUtils.randomInt(params.pRange[0], params.pRange[1]);
    const a = MathUtils.randomElement(params.aList);
    const b = -2 * a * p;
    const c = a * p * p + q;

    let isPInside;
    if (this.difficulty === "easy") isPInside = true;
    else if (this.difficulty === "hard") isPInside = Math.random() > 0.5;
    else isPInside = true;

    let start, end;
    if (isPInside) {
      start = p - MathUtils.randomInt(1, 2);
      end = p + MathUtils.randomInt(1, 2);
    } else {
      if (Math.random() > 0.5) {
        start = p + 1;
        end = p + 3;
      } else {
        end = p - 1;
        start = end - 2;
      }
    }

    const f_start = a * start * start + b * start + c;
    const f_end = a * end * end + b * end + c;
    const f_p = q;

    const type = MathUtils.randomElement(["najmniejsza", "największa"]);
    const values = [f_start, f_end];
    if (start <= p && p <= end) values.push(f_p);

    const ans =
      type === "najmniejsza" ? Math.min(...values) : Math.max(...values);

    const formula = MathUtils.formatPolynomial(a, b, c);
    const templates = PropertiesValues.getMinMaxIntervalTemplates(
      formula,
      start,
      end,
      type,
    );
    const question = MathUtils.randomElement(templates)();

    const correctAnswer = `${ans}`;
    const distractors = PropertiesValues.generateMinMaxIntervalDistractors(
      ans,
      f_start,
      f_end,
      q,
      correctAnswer,
    );

    return this.createResponse({
      question: question,
      latex: `f(x) = ${formula}`,
      image: null,
      variables: { ans },
      correctAnswer: correctAnswer,
      distractors: distractors,
      steps: [
        `Wierzchołek $$p=${p}$$ ${start <= p && p <= end ? "należy" : "nie należy"} do przedziału.`,
        `Obliczamy wartości na krańcach: $$f(${start})=${f_start}, f(${end})=${f_end}$$` +
          (start <= p && p <= end
            ? ` oraz w wierzchołku $$f(${p})=${f_p}$$`
            : ``) +
          `.`,
      ],
      questionType: "open",
      answerFormat: "number",
    });
  }

  generateCoefficients() {
    const params = PropertiesValues.getCoefficientsParams(this.difficulty);

    const p = MathUtils.randomInt(params.pRange[0], params.pRange[1]);
    const q = MathUtils.randomInt(params.pRange[0], params.pRange[1]);
    const a = MathUtils.randomElement(params.aList);
    const b = -2 * a * p;
    const c = a * (p * p) + q;
    return { a, b, c, p, q };
  }
}

module.exports = PropertiesGenerator;
