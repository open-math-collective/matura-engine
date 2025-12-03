const BaseGenerator = require("../../../core/BaseGenerator");
const MathUtils = require("../../../utils/MathUtils");

class ArithmeticSequencesGenerator extends BaseGenerator {
  generateArithmeticX() {
    const r = MathUtils.randomInt(-10, 10) || 2;
    const middle = MathUtils.randomInt(-10, 10);
    const first = middle - r,
      last = middle + r;
    return this.createResponse({
      question: `Liczby $$(${first}, x, ${last})$$ to ciąg arytmetyczny. Oblicz $$x$$.`,
      latex: `(${first}, x, ${last})`,
      image: null,
      variables: { first, middle, last },
      correctAnswer: `${middle}`,
      distractors: [`${first + last}`, `${r}`, `${middle + 1}`],
      steps: [`$$x = \\frac{${first}+${last}}{2} = ${middle}$$`],
    });
  }

  generateArithmeticParams() {
    const k = 2,
      m = 5,
      r = MathUtils.randomInt(2, 5),
      a1 = 2;
    const vk = a1 + (k - 1) * r,
      vm = a1 + (m - 1) * r;
    return this.createResponse({
      question: `W ciągu arytm. $$a_${k}=${vk}, a_${m}=${vm}$$. Oblicz $$r$$.`,
      latex: `a_${k}=${vk}, a_${m}=${vm}`,
      image: null,
      variables: { r },
      correctAnswer: `r=${r}`,
      distractors: [`r=${r + 1}`, `r=${-r}`, `r=${vm - vk}`],
      steps: [
        `$$${vm} - ${vk} = (${m}-${k})r \\implies ${vm - vk} = ${m - k}r \\implies r=${r}$$`,
      ],
    });
  }

  generateArithmeticSum() {
    const n = MathUtils.randomInt(5, 20);
    const a1 = MathUtils.randomInt(-10, 10);
    const r = MathUtils.randomInt(-5, 5) || 2;
    const an = a1 + (n - 1) * r;
    const sum = ((a1 + an) / 2) * n;

    const mode = MathUtils.randomElement(["formula", "params"]);
    let question, latex, dist1, dist2;

    if (mode === "formula") {
      const b = a1 - r;
      const formula = `a_n = ${r}n ${b >= 0 ? "+" : ""}${b}`;
      question = `Oblicz sumę $$${n}$$ początkowych wyrazów ciągu arytmetycznego określonego wzorem $$${formula}$$ dla $$n \\ge 1$$.`;
      latex = formula;
      dist1 = sum + n * r;
      dist2 = sum - a1;
    } else {
      question = `W ciągu arytmetycznym $$a_1 = ${a1}$$ oraz $$r = ${r}$$. Oblicz sumę $$${n}$$ początkowych wyrazów tego ciągu.`;
      latex = `a_1=${a1}, r=${r}`;
      dist1 = ((a1 + an) / 2) * (n - 1);
      dist2 = (a1 + an) * n;
    }

    return this.createResponse({
      question: question,
      latex: latex,
      image: null,
      variables: { a1, r, n, an },
      correctAnswer: `${sum}`,
      distractors: [`${dist1}`, `${dist2}`, `${sum + 10}`],
      steps: [
        `$$a_{${n}} = ${an}$$`,
        `$$S_{${n}} = \\frac{${a1} + ${an}}{2} \\cdot ${n} = ${sum}$$`,
      ],
    });
  }

  generateArithmeticAlgebraic() {
    const x = MathUtils.randomInt(2, 8);
    const a = MathUtils.randomInt(-3, 3);
    const b_coeff = MathUtils.randomInt(2, 4);
    const d_real = 2 * b_coeff - 2;
    const e = x - a;

    const t1 = `x ${a >= 0 ? "+" : ""}${a}`;
    const t2 = `${b_coeff}x`;
    const t3 = `${d_real}x ${e >= 0 ? "+" : ""}${e}`;

    return this.createResponse({
      question: `Ciąg $$(${t1}, ${t2}, ${t3})$$ jest arytmetyczny. Wtedy $$x$$ jest równe:`,
      latex: ``,
      image: null,
      variables: { x },
      correctAnswer: `${x}`,
      distractors: [`${x + 1}`, `${-x}`, `${0}`],
      steps: [
        `$$2(${t2}) = (${t1}) + (${t3})$$`,
        `$$${2 * b_coeff}x = ${1 + d_real}x ${a + e >= 0 ? "+" : ""}${a + e}$$`,
        `$$x = ${x}$$`,
      ],
    });
  }
}

module.exports = ArithmeticSequencesGenerator;
