const BaseGenerator = require("../../core/BaseGenerator");
const MathUtils = require("../../utils/MathUtils");

class SequencesGenerator extends BaseGenerator {
  generate() {
    const variants = [
      // STARE (8)
      "nth_term", // a_n ze wzoru
      "arithmetic_x", // (a, x, b) arytmetyczny
      "geometric_x", // (a, x, b) geometryczny
      "arithmetic_params", // a_k i a_m -> r
      "arithmetic_sum", // Suma n wyrazów arytm
      "geometric_sum", // Suma n wyrazów geom
      "which_term", // Którym wyrazem jest X
      "count_terms", // Ile wyrazów < X

      // NOWE (7)
      "geometric_ratio_dist", // a_2=27, a_5=1 -> q
      "arithmetic_algebraic", // (x-1, x+2, 2x) arytmetyczny -> x
      "geometric_algebraic", // (x, x+2, x+6) geometryczny -> x
      "sequence_monotonicity", // Czy an = -2n+5 jest rosnący?
      "quadratic_sequence_pos", // Ile wyrazów an = -n^2... jest dodatnich?
      "sequence_average", // Średnia wyrazów ciągu
      "sum_formula_analysis", // Sn = n^2 - n -> a_n?
    ];

    const selectedVariant = MathUtils.randomElement(variants);

    switch (selectedVariant) {
      // NOWE
      case "geometric_ratio_dist":
        return this.generateGeometricRatioDist();
      case "arithmetic_algebraic":
        return this.generateArithmeticAlgebraic();
      case "geometric_algebraic":
        return this.generateGeometricAlgebraic();
      case "sequence_monotonicity":
        return this.generateSequenceMonotonicity();
      case "quadratic_sequence_pos":
        return this.generateQuadraticSequencePos();
      case "sequence_average":
        return this.generateSequenceAverage();
      case "sum_formula_analysis":
        return this.generateSumFormulaAnalysis();

      // STARE
      case "arithmetic_x":
        return this.generateArithmeticX();
      case "geometric_x":
        return this.generateGeometricX();
      case "arithmetic_params":
        return this.generateArithmeticParams();
      case "arithmetic_sum":
        return this.generateArithmeticSum();
      case "geometric_sum":
        return this.generateGeometricSum();
      case "which_term":
        return this.generateWhichTerm();
      case "count_terms":
        return this.generateCountTerms();
      case "nth_term":
      default:
        return this.generateNthTerm();
    }
  }

  // =================================================================
  // NOWE METODY (V3)
  // =================================================================

  // --- 1. ILORAZ CIĄGU GEOMETRYCZNEGO (ODLEGŁE WYRAZY) ---
  generateGeometricRatioDist() {
    // a_k = val1, a_m = val2. Oblicz q.
    // a_m = a_k * q^(m-k) => q = root(val2/val1, m-k)

    const q = MathUtils.randomElement([-3, -2, 2, 3, 4]); // całkowite q
    const k = MathUtils.randomInt(1, 2);
    const diff = MathUtils.randomElement([2, 3]); // różnica indeksów (potęga q)
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
        `${valM / valK}`, // q^diff
        `${q > 0 ? -q : Math.abs(q)}`, // Zły znak
      ],
      steps: [
        `Korzystamy ze wzoru: $$a_m = a_k \\cdot q^{m-k}$$`,
        `$$${valM} = ${valK} \\cdot q^{${m}-${k}} = ${valK} \\cdot q^{${diff}}$$`,
        `$$q^{${diff}} = \\frac{${valM}}{${valK}} = ${Math.pow(q, diff)}$$`,
        `$$q = \\sqrt[${diff}]{${Math.pow(q, diff)}} = ${q}$$`,
      ],
    });
  }

  // --- 2. CIĄG ARYTMETYCZNY Z "X" (ALGEBRAICZNY) ---
  generateArithmeticAlgebraic() {
    // Liczby (x-a, x+b, k*x) tworzą ciąg arytmetyczny.
    // Środkowy = (lewy + prawy) / 2 => 2*Środkowy = Lewy + Prawy

    // Ustalmy x.
    const x = MathUtils.randomInt(2, 8);
    // Generujemy wyrażenia. Np. x+1, 2x, 4x-3
    // Niech wyrazy to: T1, T2, T3.
    // T1 = x + a
    // T2 = b*x + c
    // T3 = d*x + e
    // Warunek: 2(b*x+c) = (x+a) + (d*x+e)
    // 2bx + 2c = (1+d)x + (a+e)
    // 2b = 1+d  ORAZ  2c = a+e (żeby to była tożsamość? Nie, to równanie dla konkretnego x)

    // Uprośćmy: (x+1, 2x, 4x-3)
    // 4x = x+1 + 4x-3 => 4x = 5x - 2 => x = 2.

    const a = MathUtils.randomInt(-3, 3);
    const b_coeff = MathUtils.randomInt(2, 4); // coeff środkowego
    const d_coeff = 2 * b_coeff - 1; // żeby x się nie skrócił całkowicie po prawej

    // Lewy: x + a
    // Środek: b_coeff * x
    // Prawy: d_coeff * x + e

    // 2 * (b_coeff * x) = (x + a) + (d_coeff * x + e)
    // 2*b*x = x + d*x + a + e
    // (2b - 1 - d)x = a + e
    // x = (a+e) / coeff_res

    // Ustalmy coeff_res = 1. Wtedy d = 2b - 2.
    const d_real = 2 * b_coeff - 2;
    // Wtedy x = a + e.
    // Losujemy x, a. Obliczamy e.
    const e = x - a;

    // Wyrazy:
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
        `Dla ciągu arytmetycznego zachodzi: $$2b = a + c$$ (podwojony środkowy to suma skrajnych).`,
        `$$2(${t2}) = (${t1}) + (${t3})$$`,
        `$$${2 * b_coeff}x = x ${a >= 0 ? "+" : ""}${a} + ${d_real}x ${e >= 0 ? "+" : ""}${e}$$`,
        `$$${2 * b_coeff}x = ${1 + d_real}x ${a + e >= 0 ? "+" : ""}${a + e}$$`,
        `$$${2 * b_coeff - (1 + d_real)}x = ${a + e}$$`,
        `$$x = ${x}$$`,
      ],
    });
  }

  // --- 3. CIĄG GEOMETRYCZNY Z "X" (ALGEBRAICZNY) ---
  generateGeometricAlgebraic() {
    // (x, x+3, x+9) nie działa zawsze.
    // Środkowy^2 = Lewy * Prawy
    // (x+a)^2 = x * (x+b)
    // x^2 + 2ax + a^2 = x^2 + bx
    // 2ax + a^2 = bx
    // a^2 = (b - 2a)x
    // x = a^2 / (b - 2a)

    // Niech a=3. a^2=9. b-2a musi być dzielnikiem 9 (np. 1, 3, 9).
    // b-6 = 1 -> b=7. x = 9/1 = 9.
    // Sprawdźmy: (9+3)^2 = 144. 9*(9+7) = 9*16 = 144. OK!

    const a = MathUtils.randomElement([2, 3, 4, 5]);
    const div = MathUtils.randomElement([1, a]); // dzielnik a^2
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
      steps: [
        `Własność ciągu geometrycznego: $$(\\text{środkowy})^2 = \\text{lewy} \\cdot \\text{prawy}$$`,
        `$$(${t2})^2 = x \\cdot (${t3})$$`,
        `$$x^2 + ${2 * a}x + ${a * a} = x^2 + ${b}x$$`,
        `$$${2 * a}x + ${a * a} = ${b}x$$`,
        `$$${a * a} = ${b}x - ${2 * a}x = ${b - 2 * a}x$$`,
        `$$x = ${x}$$`,
      ],
    });
  }

  // --- 4. MONOTONICZNOŚĆ CIĄGU ---
  generateSequenceMonotonicity() {
    // an = an + b (arytmetyczny).
    const a = MathUtils.randomElement([-3, -2, 2, 3]); // Unikamy 1 i -1 dla czytelności
    const b = MathUtils.randomInt(-5, 5);

    const type = a > 0 ? "rosnący" : "malejący";
    const formula = `a_n = ${a}n ${b >= 0 ? "+" : ""}${b}`;

    return this.createResponse({
      question: `Ciąg określony wzorem $$${formula}$$ jest:`,
      latex: formula,
      image: null,
      variables: { a, b, type },
      correctAnswer: type,
      distractors: [a > 0 ? "malejący" : "rosnący", "stały", "niemonotoniczny"],
      steps: [
        `Badamy różnicę $$a_{n+1} - a_n$$.`,
        `$$a_{n+1} = ${a}(n+1) ${b >= 0 ? "+" : ""}${b} = ${a}n + ${a} ${b >= 0 ? "+" : ""}${b}$$`,
        `$$a_{n+1} - a_n = (${a}n + ${a + b}) - (${a}n ${b >= 0 ? "+" : ""}${b}) = ${a}$$`,
        `Różnica $$r = ${a}$$ jest ${a > 0 ? "dodatnia" : "ujemna"}, więc ciąg jest ${type}.`,
      ],
    });
  }

  // --- 5. DODATNIE WYRAZY CIĄGU KWADRATOWEGO ---
  generateQuadraticSequencePos() {
    // Ile wyrazów an = -n^2 + bn + c jest dodatnich?
    // Parabola w dół. Pierwiastki muszą być dodatnie.
    // np. -(n-1)(n-8) = - (n^2 - 9n + 8) = -n^2 + 9n - 8.
    // Dodatnie dla n in (1, 8) -> 2,3,4,5,6,7 (6 wyrazów).

    const x1 = MathUtils.randomInt(1, 3); // pierwszy pierwiastek (mały)
    const diff = MathUtils.randomInt(3, 7);
    const x2 = x1 + diff; // drugi pierwiastek

    // Wzór: -(n - x1)(n - x2) = -n^2 + (x1+x2)n - x1*x2
    const b = x1 + x2;
    const c = -(x1 * x2);

    // Liczba wyrazów dodatnich: liczby całkowite w przedziale (x1, x2)
    // count = ceil(x2) - floor(x1) - 1 ... ale x1, x2 są int
    const count = x2 - x1 - 1;

    const formula = `-n^2 + ${b}n ${c}`;

    return this.createResponse({
      question: `Ile wyrazów ciągu $$a_n = ${formula}$$ jest dodatnich?`,
      latex: formula,
      image: null,
      variables: { x1, x2, count },
      correctAnswer: `${count}`,
      distractors: [`${count + 1}`, `${count + 2}`, `${x2}`],
      steps: [
        `Rozwiązujemy nierówność $$a_n > 0$$ dla $$n \\ge 1$$.`,
        `$$-n^2 + ${b}n ${c} > 0$$`,
        `Miejsca zerowe paraboli: $$\\Delta = ...$$ $$n_1 = ${x1}, n_2 = ${x2}$$.`,
        `Parabola ma ramiona w dół, więc wartości dodatnie są pomiędzy pierwiastkami: $$n \\in (${x1}, ${x2})$$.`,
        `Liczby naturalne w tym przedziale to: ${count === 0 ? "brak" : Array.from({ length: count }, (_, i) => x1 + 1 + i).join(", ")}.`,
        `Odp: $$${count}$$`,
      ],
    });
  }

  // --- 6. ŚREDNIA WYRAZÓW CIĄGU ---
  generateSequenceAverage() {
    // Średnia arytmetyczna wyrazów a1, ..., a_n wynosi S. Oblicz sumę/a1/r.
    // Np. średnia 5 wyrazów ciągu arytm. to wyraz środkowy a3.
    const n = 5; // nieparzysta, łatwiej
    const middle = MathUtils.randomInt(4, 10); // a3
    const r = MathUtils.randomInt(2, 5);
    const a1 = middle - 2 * r;

    const avg = middle; // Dla arytmetycznego śr. arytm = środkowy (dla nieparzystych n)

    return this.createResponse({
      question: `Średnia arytmetyczna pięciu początkowych wyrazów ciągu arytmetycznego wynosi $$${avg}$$. Pierwszy wyraz tego ciągu to $$${a1}$$. Różnica tego ciągu jest równa:`,
      latex: `\\bar{x}=${avg}, a_1=${a1}`,
      image: null,
      variables: { a1, avg, r },
      correctAnswer: `${r}`,
      distractors: [`${r + 1}`, `${avg - a1}`, `${r * 2}`],
      steps: [
        `Średnia arytmetyczna $$n$$ początkowych wyrazów ciągu arytmetycznego to $$\\frac{S_n}{n}$$.`,
        `Dla $$n=5$$ jest to $$a_3$$ (wyraz środkowy). Zatem $$a_3 = ${avg}$$.`,
        `Wzór: $$a_3 = a_1 + 2r$$.`,
        `$$${avg} = ${a1} + 2r \\implies 2r = ${avg - a1} \\implies r = ${r}$$`,
      ],
    });
  }

  // --- 7. ANALIZA WZORU NA SUMĘ ---
  generateSumFormulaAnalysis() {
    // Sn = n^2 - 2n. Oblicz a_n lub a3.
    // a3 = S3 - S2.
    const a = MathUtils.randomInt(1, 3);
    const b = MathUtils.randomInt(1, 5);
    // Sn = a*n^2 - b*n
    const n = 3; // Liczymy a3

    const S3 = a * 3 * 3 - b * 3;
    const S2 = a * 2 * 2 - b * 2;
    const a3 = S3 - S2;

    const formula = `S_n = ${a === 1 ? "" : a}n^2 - ${b}n`;

    return this.createResponse({
      question: `Suma $$n$$ początkowych wyrazów ciągu liczbowego określona jest wzorem $$${formula}$$ dla $$n \\ge 1$$. Trzeci wyraz tego ciągu jest równy:`,
      latex: formula,
      image: null,
      variables: { S3, S2, a3 },
      correctAnswer: `${a3}`,
      distractors: [`${S3}`, `${S3 + S2}`, `${a * 3 * 3 + b * 3}`],
      steps: [
        `Wyraz $$a_n = S_n - S_{n-1}$$. Dla $$n=3$$: $$a_3 = S_3 - S_2$$.`,
        `$$S_3 = ${a}\\cdot 3^2 - ${b}\\cdot 3 = ${S3}$$`,
        `$$S_2 = ${a}\\cdot 2^2 - ${b}\\cdot 2 = ${S2}$$`,
        `$$a_3 = ${S3} - (${S2}) = ${a3}$$`,
      ],
    });
  }

  // =================================================================
  // STARE METODY (BEZ ZMIAN)
  // =================================================================

  generateNthTerm() {
    const a = MathUtils.randomInt(-2, 2) || 1;
    const b = MathUtils.randomInt(-5, 5);
    const c = MathUtils.randomInt(-10, 10);
    const n = MathUtils.randomInt(2, 10);
    const formula = `a_n = ${MathUtils.formatPolynomial(a, b, c).replace(/x/g, "n")}`;
    const val = a * n * n + b * n + c;
    return this.createResponse({
      question: `Oblicz $$a_{${n}}$$ dla ciągu $$${formula}$$.`,
      latex: formula,
      image: null,
      variables: { a, b, c, n },
      correctAnswer: `${val}`,
      distractors: [`${val + a}`, `${val - b}`, `${-val}`],
      steps: [`$$a_{${n}} = ${a}(${n})^2 + (${b})(${n}) + (${c}) = ${val}$$`],
    });
  }
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
    return this.createResponse({
      question: `Oblicz sumę $$${n}$$ początkowych wyrazów ciągu arytmetycznego, gdzie $$a_1=${a1}, r=${r}$$.`,
      latex: `S_${n}=?`,
      image: null,
      variables: { a1, r, n },
      correctAnswer: `${sum}`,
      distractors: [`${sum + 10}`, `${sum * 2}`, `${(a1 + an) * n}`],
      steps: [
        `$$a_{${n}} = ${an}$$`,
        `$$S_{${n}} = \\frac{${a1}+${an}}{2} \\cdot ${n} = ${sum}$$`,
      ],
    });
  }
  generateGeometricSum() {
    const n = 4,
      q = 2,
      a1 = 3;
    const sum = (a1 * (1 - Math.pow(q, n))) / (1 - q);
    return this.createResponse({
      question: `Suma 4 wyrazów ciągu geom. $$a_1=3, q=2$$.`,
      latex: ``,
      image: null,
      variables: {},
      correctAnswer: `${sum}`,
      distractors: [`${sum + 1}`, `30`, `15`],
      steps: [`Wzór na Sn.`],
    });
  }
  generateWhichTerm() {
    const n = 5,
      a = 2,
      b = 1;
    const X = a * n + b;
    return this.createResponse({
      question: `Którym wyrazem ciągu $$a_n=${a}n+${b}$$ jest liczba $$${X}$$?`,
      latex: ``,
      image: null,
      variables: {},
      correctAnswer: `${n}`,
      distractors: [`${n + 1}`, `${n - 1}`, `${X}`],
      steps: [`$$${a}n+${b}=${X} \\implies n=${n}$$`],
    });
  }
  generateCountTerms() {
    const a = -2,
      b = 20; // an = -2n+20. >0 dla n < 10. 9 wyrazów.
    return this.createResponse({
      question: `Ile wyrazów ciągu $$a_n=-2n+20$$ jest dodatnich?`,
      latex: ``,
      image: null,
      variables: {},
      correctAnswer: `9`,
      distractors: [`10`, `8`, `11`],
      steps: [`-2n+20 > 0 => n < 10`],
    });
  }
}

module.exports = SequencesGenerator;
