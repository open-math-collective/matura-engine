const BaseGenerator = require("../../core/BaseGenerator");
const MathUtils = require("../../utils/MathUtils");

class SequencesGenerator extends BaseGenerator {
  generate() {
    const variants = [
      "nth_term", // Oblicz a_n ze wzoru
      "arithmetic_x", // Liczby (a, x, b) są ciągiem arytmetycznym
      "geometric_x", // Liczby (a, x, b) są ciągiem geometrycznym
      "arithmetic_params", // Mając a_k i a_m oblicz r
      "arithmetic_sum", // NOWOŚĆ: Suma n wyrazów ciągu arytmetycznego
      "geometric_sum", // NOWOŚĆ: Suma n wyrazów ciągu geometrycznego
      "which_term", // NOWOŚĆ: Którym wyrazem jest liczba X?
      "count_terms", // NOWOŚĆ: Ile wyrazów jest mniejszych od X?
    ];

    const selectedVariant = MathUtils.randomElement(variants);

    switch (selectedVariant) {
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

  // --- NOWOŚĆ 1: SUMA CIĄGU ARYTMETYCZNEGO ---
  generateArithmeticSum() {
    // Sn = ((a1 + an) / 2) * n
    const n = MathUtils.randomInt(5, 20); // Liczymy sumę np. 10 wyrazów
    const a1 = MathUtils.randomInt(-10, 10);
    const r = MathUtils.randomInt(-5, 5) || 2;

    const an = a1 + (n - 1) * r;
    const sum = ((a1 + an) / 2) * n;

    // Warianty treści: podany wzór ogólny LUB podane a1 i r
    const mode = MathUtils.randomElement(["formula", "params"]);

    let question, latex, dist1, dist2;

    if (mode === "formula") {
      // Generujemy wzór an = r*n + (a1-r)
      const b = a1 - r;
      const formula = `a_n = ${r}n ${b >= 0 ? "+" : ""}${b}`;
      question = `Oblicz sumę $$${n}$$ początkowych wyrazów ciągu arytmetycznego określonego wzorem $$${formula}$$ dla $$n \\ge 1$$.`;
      latex = formula;
      dist1 = sum + n * r; // Błąd przesunięcia
      dist2 = sum - a1;
    } else {
      question = `W ciągu arytmetycznym $$a_1 = ${a1}$$ oraz $$r = ${r}$$. Oblicz sumę $$${n}$$ początkowych wyrazów tego ciągu.`;
      latex = `a_1=${a1}, r=${r}`;
      dist1 = ((a1 + an) / 2) * (n - 1); // Złe n
      dist2 = (a1 + an) * n; // Brak dzielenia przez 2
    }

    return this.createResponse({
      question: question,
      latex: latex,
      image: null,
      variables: { a1, r, n, an },
      correctAnswer: `${sum}`,
      distractors: [`${dist1}`, `${dist2}`, `${sum + 10}`],
      steps: [
        `Wzór na sumę $$n$$ wyrazów ciągu arytmetycznego: $$S_n = \\frac{a_1 + a_n}{2} \\cdot n$$`,
        mode === "formula"
          ? `Najpierw obliczamy $$a_1$$ i $$a_{${n}}$$ ze wzoru ciągu.`
          : `Najpierw obliczamy $$a_{${n}}$$ ze wzoru $$a_n = a_1 + (n-1)r$$`,
        `$$a_1 = ${a1}$$`,
        `$$a_{${n}} = ${a1} + (${n}-1)\\cdot(${r}) = ${a1} + ${n - 1}\\cdot${r} = ${an}$$`,
        `Podstawiamy do wzoru na sumę:`,
        `$$S_{${n}} = \\frac{${a1} + ${an}}{2} \\cdot ${n} = \\frac{${a1 + an}}{2} \\cdot ${n} = ${(a1 + an) / 2} \\cdot ${n} = ${sum}$$`,
      ],
    });
  }

  // --- NOWOŚĆ 2: SUMA CIĄGU GEOMETRYCZNEGO ---
  generateGeometricSum() {
    // Sn = a1 * (1 - q^n) / (1 - q)
    const n = MathUtils.randomInt(3, 6); // Małe n, bo potęgi rosną szybko
    const q = MathUtils.randomElement([-3, -2, 2, 3]); // q != 1
    const a1 = MathUtils.randomInt(1, 4); // Małe a1

    const sum = (a1 * (1 - Math.pow(q, n))) / (1 - q);

    return this.createResponse({
      question: `Oblicz sumę $$${n}$$ początkowych wyrazów ciągu geometrycznego, w którym $$a_1 = ${a1}$$ oraz iloraz $$q = ${q}$$.`,
      latex: `a_1=${a1}, q=${q}`,
      image: null,
      variables: { a1, q, n },
      correctAnswer: `${sum}`,
      distractors: [
        `${(a1 * (1 - Math.pow(q, n - 1))) / (1 - q)}`, // Suma n-1 wyrazów
        `${sum * q}`,
        `${a1 * Math.pow(q, n - 1)}`, // Wzór na n-ty wyraz zamiast sumy
      ],
      steps: [
        `Wzór na sumę $$n$$ wyrazów ciągu geometrycznego: $$S_n = a_1 \\cdot \\frac{1-q^n}{1-q}$$`,
        `Podstawiamy dane: $$a_1 = ${a1}, q = ${q}, n = ${n}$$`,
        `$$S_{${n}} = ${a1} \\cdot \\frac{1-(${q})^{${n}}}{1-(${q})}$$`,
        `Obliczamy potęgę: $$(${q})^{${n}} = ${Math.pow(q, n)}$$`,
        `$$S_{${n}} = ${a1} \\cdot \\frac{1 - ${Math.pow(q, n)}}{${1 - q}} = ${a1} \\cdot \\frac{${1 - Math.pow(q, n)}}{${1 - q}}$$`,
        `$$S_{${n}} = ${a1} \\cdot (${(1 - Math.pow(q, n)) / (1 - q)}) = ${sum}$$`,
      ],
    });
  }

  // --- NOWOŚĆ 3: KTÓRYM WYRAZEM JEST LICZBA X? ---
  generateWhichTerm() {
    // a_n = n^2 + bn + c = X. Szukamy n (musi być całkowite > 0)
    // Reverse engineering: Losujemy n (np. 5), wyliczamy X.

    const n = MathUtils.randomInt(2, 12);

    // Formuła: kwadratowa n^2 + ... (częsta na maturze) lub liniowa -2n + ...
    const type = MathUtils.randomElement(["quadratic", "linear"]);

    let a, b, c, X, formula;

    if (type === "linear") {
      a = MathUtils.randomInt(-5, 5) || 2;
      b = MathUtils.randomInt(-10, 10);
      X = a * n + b;
      formula = `a_n = ${a}n ${b >= 0 ? "+" : ""}${b}`;
    } else {
      // n^2 - 4n - 5
      a = 1;
      b = -MathUtils.randomInt(1, 10); // Żeby parabola miała wierzchołek po prawej
      c = MathUtils.randomInt(-10, 10);
      X = n * n + b * n + c;
      formula = `a_n = n^2 ${b >= 0 ? "+" : ""}${b}n ${c >= 0 ? "+" : ""}${c}`;
    }

    return this.createResponse({
      question: `Którym wyrazem ciągu $$(${formula})$$ jest liczba $$${X}$$?`,
      latex: formula,
      image: null,
      variables: { n, X },
      correctAnswer: `${n}`,
      distractors: [
        `${n + 1}`,
        `${n - 1}`,
        type === "quadratic" && b !== 0 ? `${Math.abs(n + b)}` : `${n + 2}`,
      ], // Drugie miejsce zerowe paraboli
      steps: [
        `Musimy rozwiązać równanie $$a_n = ${X}$$, pamiętając, że $$n$$ musi być liczbą naturalną dodatnią ($$n \\ge 1$$).`,
        `$$${formula.split("=")[1]} = ${X}$$`,
        type === "linear"
          ? `$$${a}n = ${X - b} \\implies n = ${n}$$`
          : `$$n^2 ${b >= 0 ? "+" : ""}${b}n ${c - X >= 0 ? "+" : ""}${c - X} = 0$$ \n(Obliczamy deltę i szukamy dodatniego n)`,
        type === "quadratic"
          ? `$$\\Delta = (${b})^2 - 4\\cdot 1 \\cdot (${c - X}) = ${b * b} - ${4 * (c - X)} = ${b * b - 4 * (c - X)}$$`
          : ``,
        `Otrzymujemy $$n = ${n}$$. (Drugie rozwiązanie odrzucamy jeśli nie jest naturalne dodatnie).`,
        `Odp: Jest to wyraz nr $$${n}$$`,
      ],
    });
  }

  // --- NOWOŚĆ 4: ILE WYRAZÓW SPEŁNIA WARUNEK? ---
  generateCountTerms() {
    // Ile wyrazów ciągu an = -n^2 + 10n - 5 jest większych od -20?
    // Zawsze dobieramy tak, żeby delta była ładna i przedział jasny.

    // Najprościej: Ciąg malejący a_n = -2n + 20. Ile wyrazów jest dodatnich?
    // -2n + 20 > 0 -> 20 > 2n -> 10 > n. Czyli wyrazy 1..9. Odp: 9.

    const a = -MathUtils.randomInt(2, 5); // Ujemne, żeby ciąg malał
    const b = MathUtils.randomInt(20, 50); // Duży start

    // a_n = an + b. Pytanie: Ile wyrazów dodatnich?
    // an + b > 0 => an > -b => n < -b/a

    const limit = -b / a;
    const count = Math.ceil(limit) - 1; // n musi być mniejsze ostro lub równe... zależy od pytania.
    // Ustalmy pytanie "dodatnich" (>0)
    // Jeśli limit = 5, to n < 5 => n in {1,2,3,4} => 4 wyrazy.
    // Jeśli limit = 5.5, to n < 5.5 => n in {1..5} => 5 wyrazów.

    const formula = `a_n = ${a}n + ${b}`;

    return this.createResponse({
      question: `Ile wyrazów ciągu określonego wzorem $$${formula}$$ jest dodatnich?`,
      latex: formula,
      image: null,
      variables: { a, b, count },
      correctAnswer: `${count}`,
      distractors: [`${count + 1}`, `${count - 1}`, `${Math.floor(limit)}`],
      steps: [
        `Szukamy takich $$n \\ge 1$$, dla których $$a_n > 0$$.`,
        `$$${a}n + ${b} > 0$$`,
        `$$${a}n > ${-b} \\quad / :(${a})$$ (Zmieniamy znak nierówności!)`,
        `$$n < ${parseFloat(limit.toFixed(2))}$$`,
        `Ponieważ $$n$$ musi być liczbą naturalną ($$1, 2, 3...$$), to warunek spełniają liczby: $$1, 2, ..., ${count}$$.`,
        `Odp: Jest $$${count}$$ takich wyrazów.`,
      ],
    });
  }

  // --- STARE WARIANTY (BEZ ZMIAN) ---
  generateNthTerm() {
    // a_n = an^2 + bn + c
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
}

module.exports = SequencesGenerator;
