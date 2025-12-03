const BaseGenerator = require("../../../core/BaseGenerator");
const MathUtils = require("../../../utils/MathUtils");

class GeometricSequencesGenerator extends BaseGenerator {
  generateGeometricX() {
    const r = MathUtils.randomElement([-3, -2, 2, 3]);
    const f = MathUtils.randomInt(1, 5);
    const m = f * r,
      l = m * r;
    return this.createResponse({
      question: `Liczby $$(${f}, x, ${l})$$ to ciąg geometryczny o wyrazach dodatnich.`,
      latex: `(${f}, x, ${l})`,
      image: null,
      variables: { f, m, l },
      correctAnswer: `${Math.abs(m)}`,
      distractors: [`${m * 2}`, `${l - f}`, `${f * l}`],
      steps: [
        `$$x^2 = ${f}\\cdot${l} = ${f * l} \\implies x=\\sqrt{${f * l}}=${Math.abs(m)}$$`,
      ],
    });
  }

  generateGeometricSum() {
    const n = MathUtils.randomInt(3, 6);
    const q = MathUtils.randomElement([-3, -2, 2, 3]);
    const a1 = MathUtils.randomInt(1, 4);
    const sum = (a1 * (1 - Math.pow(q, n))) / (1 - q);

    return this.createResponse({
      question: `Oblicz sumę $$${n}$$ początkowych wyrazów ciągu geometrycznego, w którym $$a_1 = ${a1}$$ oraz iloraz $$q = ${q}$$.`,
      latex: `a_1=${a1}, q=${q}`,
      image: null,
      variables: { a1, q, n },
      correctAnswer: `${sum}`,
      distractors: [
        `${(a1 * (1 - Math.pow(q, n - 1))) / (1 - q)}`,
        `${sum * q}`,
        `${a1 * Math.pow(q, n - 1)}`,
      ],
      steps: [
        `$$S_{${n}} = ${a1} \\cdot \\frac{1-(${q})^{${n}}}{1-(${q})} = ${sum}$$`,
      ],
    });
  }

  generateGeometricRatioDist() {
    const q = MathUtils.randomElement([-3, -2, 2, 3, 4]);
    const k = MathUtils.randomInt(1, 2);
    const diff = MathUtils.randomElement([2, 3]);
    const m = k + diff;
    const a1 = MathUtils.randomInt(1, 5);
    const valK = a1 * Math.pow(q, k - 1);
    const valM = valK * Math.pow(q, diff);

    return this.createResponse({
      question: `W ciągu geometrycznym $$(a_n)$$ dane są wyrazy $$a_{${k}} = ${valK}$$ oraz $$a_{${m}} = ${valM}$$. Iloraz $$q$$ tego ciągu jest równy:`,
      latex: `a_{${k}}=${valK}, a_{${m}}=${valM}`,
      image: null,
      variables: { k, m, q, valK, valM },
      correctAnswer: `${q}`,
      distractors: [
        `${q * 2}`,
        `${valM / valK}`,
        `${q > 0 ? -q : Math.abs(q)}`,
      ],
      steps: [
        `$$q^{${diff}} = \\frac{${valM}}{${valK}} = ${Math.pow(q, diff)} \\implies q = ${q}$$`,
      ],
    });
  }

  generateGeometricAlgebraic() {
    const a = MathUtils.randomElement([2, 3, 4, 5]);
    const div = MathUtils.randomElement([1, a]);
    const b_minus_2a = div;
    const b = b_minus_2a + 2 * a;
    const x = (a * a) / div;

    const t1 = `x`;
    const t2 = `x + ${a}`;
    const t3 = `x + ${b}`;

    return this.createResponse({
      question: `Ciąg $$(${t1}, ${t2}, ${t3})$$ jest geometryczny. Wtedy $$x$$ wynosi:`,
      latex: ``,
      image: null,
      variables: { x, a, b },
      correctAnswer: `${x}`,
      distractors: [`${x + a}`, `${x - 1}`, `${a}`],
      steps: [`$$(${t2})^2 = x \\cdot (${t3}) \\implies x = ${x}$$`],
    });
  }
}

module.exports = GeometricSequencesGenerator;
