const BaseGenerator = require("../../core/BaseGenerator");
const MathUtils = require("../../utils/MathUtils");

class CombinatoricsGenerator extends BaseGenerator {
  generate() {
    const variants = [
      // STARE (6)
      "numbers_rule", // Liczby n-cyfrowe parzyste/podzielne
      "distinct_digits", // Liczby o różnych cyfrach
      "queue_perm", // Kolejka (n!)
      "clothing_sets", // Zestawy ubrań/obiadowe
      "handshakes", // Uściski dłoni (n po 2)
      "flag_coloring", // Flagi (k * k * k vs k * k-1 * k-2)

      // NOWE (5)
      "codes_mixed", // Kody: 2 litery i 3 cyfry
      "numbers_from_set", // Liczby tylko z cyfr {1,3,5}
      "numbers_sum_digits", // Liczby o sumie cyfr 4
      "team_selection", // Wybór delegacji 3 z 20 (kombinacje)
      "seating_constraint", // Ustawienia z warunkiem (X i Y obok siebie)
    ];

    const selectedVariant = MathUtils.randomElement(variants);

    switch (selectedVariant) {
      case "distinct_digits":
        return this.generateDistinctDigits();
      case "queue_perm":
        return this.generateQueueProblem();
      case "clothing_sets":
        return this.generateSetsProblem();
      case "handshakes":
        return this.generateHandshakesProblem();
      case "flag_coloring":
        return this.generateFlagProblem();

      // NOWE
      case "codes_mixed":
        return this.generateMixedCodes();
      case "numbers_from_set":
        return this.generateNumbersFromSet();
      case "numbers_sum_digits":
        return this.generateSumOfDigits();
      case "team_selection":
        return this.generateTeamSelection();
      case "seating_constraint":
        return this.generateSeatingConstraint();

      case "numbers_rule":
      default:
        return this.generateNumbersRule();
    }
  }

  // =================================================================
  // NOWE METODY (V3)
  // =================================================================

  // --- NOWOŚĆ 7: KODY I HASŁA (MIESZANE ZBIORY) ---
  generateMixedCodes() {
    // Kod składa się z L liter i C cyfr.
    // Zakładamy 26 liter i 10 cyfr.
    const lettersCount = MathUtils.randomElement([2, 3]);
    const digitsCount = MathUtils.randomElement([2, 3, 4]);

    // 26^L * 10^C
    // Ponieważ liczby są ogromne, w odpowiedziach zostawiamy potęgi
    // np. 26^2 * 10^3

    const latexRes = `26^{${lettersCount}} \\cdot 10^{${digitsCount}}`;

    return this.createResponse({
      question: `Ile różnych kodów można utworzyć, jeżeli każdy kod składa się z $$${lettersCount}$$ liter (wybranych z 26 liter alfabetu łacińskiego) oraz $$${digitsCount}$$ cyfr (arabskich)? Zakładamy, że najpierw występują litery, a potem cyfry, i mogą się one powtarzać.`,
      latex: ``,
      image: null,
      variables: { lettersCount, digitsCount },
      correctAnswer: latexRes,
      distractors: [
        `26 \\cdot 10`,
        `${lettersCount + digitsCount}^{26+10}`,
        `26 \\cdot ${lettersCount} + 10 \\cdot ${digitsCount}`,
      ],
      steps: [
        `Mamy $$${lettersCount}$$ miejsc na litery i $$${digitsCount}$$ miejsc na cyfry.`,
        `Na każdym miejscu literowym mamy 26 możliwości: $$26^{${lettersCount}}$$`,
        `Na każdym miejscu cyfrowym mamy 10 możliwości: $$10^{${digitsCount}}$$`,
        `Z reguły mnożenia: $$${latexRes}$$`,
      ],
    });
  }

  // --- NOWOŚĆ 8: LICZBY ZE ZBIORU CYFR ---
  generateNumbersFromSet() {
    // Ile liczb n-cyfrowych można ułożyć z cyfr {1, 3, 5, 7}?
    // Zbiór ma moc K. Liczba ma N cyfr. Wynik K^N.
    const setType = MathUtils.randomElement(["odd", "small", "prime"]);
    let setDigits, setName;

    if (setType === "odd") {
      setDigits = [1, 3, 5, 7, 9];
      setName = "nieparzystych";
    } else if (setType === "small") {
      setDigits = [1, 2, 3, 4];
      setName = "należących do zbioru \\{1, 2, 3, 4\\}";
    } else {
      setDigits = [2, 3, 5, 7];
      setName = "będących cyframi pierwszymi";
    }

    const n = MathUtils.randomInt(3, 5); // długość liczby
    const k = setDigits.length;
    const res = Math.pow(k, n);

    return this.createResponse({
      question: `Ile jest wszystkich liczb naturalnych ${n}-cyfrowych, których zapis dziesiętny składa się wyłącznie z cyfr ${setName}?`,
      latex: ``,
      image: null,
      variables: { n, k, setType },
      correctAnswer: `${res}`,
      distractors: [
        `${Math.pow(10, n)}`, // Wszystkie n-cyfrowe
        `${n * k}`,
        `${Math.pow(n, k)}`, // Odwrotnie potęgi
      ],
      steps: [
        `Dostępne cyfry to: $$${setDigits.join(", ")}$$. Jest ich $$${k}$$.`,
        `Tworzymy liczbę $$${n}$$-cyfrową. Na każdym z $$${n}$$ miejsc możemy postawić jedną z $$${k}$$ cyfr.`,
        `$$${Array(n).fill(k).join(" \\cdot ")} = ${k}^{${n}} = ${res}$$`,
      ],
    });
  }

  // --- NOWOŚĆ 9: LICZBY O USTALONEJ SUMIE CYFR ---
  generateSumOfDigits() {
    // Ile liczb 3-cyfrowych ma sumę cyfr równą X?
    // To wymaga wypisania przypadków. X małe, np. 3, 4, 5.
    const sumTarget = MathUtils.randomElement([3, 4, 5]);
    const n = 3; // Zawsze 3-cyfrowe na maturze w tym typie

    // Logika zliczania (Hardcoded logic for speed and stability)
    let count = 0;
    let examples = [];

    for (let h = 1; h <= 9; h++) {
      // setki (1-9)
      for (let t = 0; t <= 9; t++) {
        // dziesiątki (0-9)
        const u = sumTarget - h - t; // jedności
        if (u >= 0 && u <= 9) {
          count++;
          if (examples.length < 5) examples.push(`${h}${t}${u}`);
        }
      }
    }

    return this.createResponse({
      question: `Ile jest wszystkich liczb naturalnych trzycyfrowych, których suma cyfr jest równa $$${sumTarget}$$?`,
      latex: ``,
      image: null,
      variables: { sumTarget, count },
      correctAnswer: `${count}`,
      distractors: [`${count + 2}`, `${count - 1}`, `${sumTarget * 3}`],
      steps: [
        `Wypisujemy systematycznie liczby trzycyfrowe o sumie cyfr $$${sumTarget}$$:`,
        `Zaczynając od najmniejszej (lub największej):`,
        `$$${examples.join(", ")}...$$`,
        `Łącznie jest ich: $$${count}$$`,
      ],
    });
  }

  // --- NOWOŚĆ 10: WYBÓR DELEGACJI (KOMBINACJE C(n,k)) ---
  generateTeamSelection() {
    // Z klasy 25 osób wybieramy 3 osoby.
    const total = MathUtils.randomElement([20, 25, 30]);
    const k = 3; // Zawsze 3, żeby było trudniej niż uściski dłoni (2)

    // C(n, 3) = n(n-1)(n-2) / 6
    const res = (total * (total - 1) * (total - 2)) / 6;

    return this.createResponse({
      question: `Z grupy liczącej $$${total}$$ osób wybieramy trzyosobową delegację. Na ile sposobów można to zrobić?`,
      latex: `n=${total}, k=3`,
      image: null,
      variables: { total, k },
      correctAnswer: `${res}`,
      distractors: [
        `${total * (total - 1) * (total - 2)}`, // Wariacja (kolejność ważna)
        `${total * 3}`,
        `${res + total}`,
      ],
      steps: [
        `Kolejność wyboru nie ma znaczenia, stosujemy symbol Newtona (kombinacje).`,
        `$${total} \\choose 3} = \\frac{${total} \\cdot ${total - 1} \\cdot ${total - 2}}{3 \\cdot 2 \\cdot 1}$$`,
        `$$= \\frac{${total * (total - 1) * (total - 2)}}{6} = ${res}$$`,
      ],
    });
  }

  // --- NOWOŚĆ 11: USTAWIENIA Z WARUNKIEM ---
  generateSeatingConstraint() {
    // n osób w rzędzie. Osoby A i B muszą siedzieć obok siebie.
    // Lub: Osoba A musi siedzieć na pierwszym miejscu.
    const n = MathUtils.randomInt(5, 7);
    const type = MathUtils.randomElement(["together", "fixed_first"]);

    let res, desc;

    if (type === "together") {
      // (n-1)! * 2
      let fact = 1;
      for (let i = 1; i <= n - 1; i++) fact *= i;
      res = fact * 2;
      desc = `Sklejamy osoby A i B w jeden element. Mamy wtedy $$${n - 1}$$ elementów do ustawienia ($$${n - 1}!$$). Osoby A i B mogą zamienić się miejscami ($$\\cdot 2$$).`;
    } else {
      // (n-1)!
      let fact = 1;
      for (let i = 1; i <= n - 1; i++) fact *= i;
      res = fact;
      desc = `Skoro pierwsza osoba jest ustalona, to pozostałe $$${n - 1}$$ osób ustawiamy dowolnie na $$${n - 1}$$ miejscach.`;
    }

    return this.createResponse({
      question:
        type === "together"
          ? `Na ile sposobów $$${n}$$ osób (w tym Kasia i Tomek) może usiąść w rzędzie tak, aby Kasia i Tomek siedzieli obok siebie?`
          : `Na ile sposobów $$${n}$$ osób może ustawić się w kolejce, jeśli Pan X musi stać na pierwszym miejscu?`,
      latex: ``,
      image: null,
      variables: { n, type },
      correctAnswer: `${res}`,
      distractors: [
        `${this.factorial(n)}`, // Wszystkie permutacje n!
        type === "together" ? `${res / 2}` : `${res * n}`,
        `${n * n}`,
      ],
      steps: [
        desc,
        type === "together"
          ? `$$(${n}-1)! \\cdot 2 = ${res / 2} \\cdot 2 = ${res}$$`
          : `$$(${n}-1)! = ${res}$$`,
      ],
    });
  }

  // =================================================================
  // STARE METODY (V2)
  // =================================================================

  generateNumbersRule() {
    const digits = MathUtils.randomElement([3, 4]);
    const type = MathUtils.randomElement([
      "even",
      "div5",
      "div10",
      "no_zero_digit",
    ]);

    let count, desc;
    if (type === "even") {
      count = 9 * Math.pow(10, digits - 2) * 5;
      desc = `Pierwsza cyfra: 9 opcji. Kolejne: 10 opcji. Ostatnia (parzysta): 5 opcji.`;
    } else if (type === "div5") {
      count = 9 * Math.pow(10, digits - 2) * 2;
      desc = `Ostatnia cyfra to 0 lub 5 (2 opcje).`;
    } else if (type === "div10") {
      count = 9 * Math.pow(10, digits - 2) * 1;
      desc = `Ostatnia cyfra to 0 (1 opcja).`;
    } else {
      count = Math.pow(9, digits);
      desc = `Na każdym miejscu cyfra od 1 do 9 (9 opcji).`;
    }

    return this.createResponse({
      question: `Ile jest wszystkich liczb naturalnych ${digits}-cyfrowych ${type === "even" ? "parzystych" : type === "div5" ? "podzielnych przez 5" : type === "div10" ? "podzielnych przez 10" : "w których zapisie nie występuje cyfra 0"}?`,
      latex: ``,
      image: null,
      variables: { digits, type },
      correctAnswer: `${count}`,
      distractors: [`${count + 10}`, `${count / 2}`, `${Math.pow(10, digits)}`],
      steps: [`Stosujemy regułę mnożenia.`, desc, `Wynik: $$${count}$$`],
    });
  }

  generateDistinctDigits() {
    const digits = 3;
    const res = 9 * 9 * 8;
    return this.createResponse({
      question:
        "Ile jest wszystkich liczb naturalnych trzycyfrowych o cyfrach niepowtarzających się?",
      latex: ``,
      image: null,
      variables: {},
      correctAnswer: `${res}`,
      distractors: [`${9 * 10 * 10}`, `${9 * 8 * 7}`, `${10 * 9 * 8}`],
      steps: [
        `Pierwsza cyfra: 9 opcji (bez 0).`,
        `Druga: 9 opcji (bo dochodzi 0, odpada użyta).`,
        `Trzecia: 8 opcji.`,
        `$$9 \\cdot 9 \\cdot 8 = ${res}$$`,
      ],
    });
  }

  generateQueueProblem() {
    const n = MathUtils.randomInt(4, 6);
    let res = this.factorial(n);
    return this.createResponse({
      question: `Na ile sposobów $$${n}$$ osób może ustawić się w kolejce do kasy?`,
      latex: `n=${n}`,
      image: null,
      variables: { n },
      correctAnswer: `${res}`,
      distractors: [`${n * n}`, `${n}`, `${res / 2}`],
      steps: [
        `Liczba permutacji zbioru $$n$$-elementowego to $$n!$$.`,
        `$$${n}! = ${res}$$`,
      ],
    });
  }

  generateSetsProblem() {
    const type = MathUtils.randomElement(["clothes", "menu"]);
    let q, n1, n2, n3, total;
    if (type === "clothes") {
      n1 = MathUtils.randomInt(3, 6);
      n2 = MathUtils.randomInt(3, 6);
      n3 = MathUtils.randomInt(2, 4);
      q = `W szafie wisi ${n1} bluzek, leży ${n2} par spodni i stoi ${n3} par butów. Ile różnych zestawów można utworzyć?`;
    } else {
      n1 = MathUtils.randomInt(3, 5);
      n2 = MathUtils.randomInt(4, 8);
      n3 = MathUtils.randomInt(2, 5);
      q = `Restauracja oferuje ${n1} zup, ${n2} drugich dań i ${n3} deserów. Ile różnych zestawów obiadowych można zamówić?`;
    }
    total = n1 * n2 * n3;
    return this.createResponse({
      question: q,
      latex: ``,
      image: null,
      variables: { n1, n2, n3 },
      correctAnswer: `${total}`,
      distractors: [`${n1 + n2 + n3}`, `${total * 2}`, `${n1 * n2 + n3}`],
      steps: [
        `Reguła mnożenia: $$${n1} \\cdot ${n2} \\cdot ${n3} = ${total}$$`,
      ],
    });
  }

  generateHandshakesProblem() {
    const n = MathUtils.randomInt(6, 12);
    const result = (n * (n - 1)) / 2;
    const type = MathUtils.randomElement(["handshakes", "matches"]);
    const q =
      type === "handshakes"
        ? `Na spotkaniu było $$${n}$$ osób. Ile było powitań?`
        : `W turnieju bierze udział $$${n}$$ zawodników (każdy z każdym). Ile meczów?`;
    return this.createResponse({
      question: q,
      latex: `n=${n}`,
      image: null,
      variables: { n },
      correctAnswer: `${result}`,
      distractors: [`${n * (n - 1)}`, `${n * 2}`, `${result + n}`],
      steps: [
        `Wzór: $$\\frac{n(n-1)}{2}$$`,
        `$$\\frac{${n}\\cdot${n - 1}}{2} = ${result}$$`,
      ],
    });
  }

  generateFlagProblem() {
    const k = MathUtils.randomInt(4, 6);
    const distinct = MathUtils.randomElement([true, false]);
    const res = distinct ? k * (k - 1) * (k - 2) : k * k * k;
    return this.createResponse({
      question: `Mamy $$${k}$$ kolorów. Szyjemy flagę z 3 pasów. Ile flag, jeśli kolory ${distinct ? "nie mogą" : "mogą"} się powtarzać?`,
      latex: `k=${k}`,
      image: this.generateSVG({ type: "flag" }),
      variables: { k, distinct },
      correctAnswer: `${res}`,
      distractors: [
        distinct ? `${k * k * k}` : `${k * (k - 1) * (k - 2)}`,
        `${k * 3}`,
        `${Math.pow(3, k)}`,
      ],
      steps: [
        distinct
          ? `$$${k} \\cdot ${k - 1} \\cdot ${k - 2} = ${res}$$`
          : `$$${k} \\cdot ${k} \\cdot ${k} = ${res}$$`,
      ],
    });
  }

  // --- HELPERY ---
  factorial(n) {
    let res = 1;
    for (let i = 1; i <= n; i++) res *= i;
    return res;
  }

  generateSVG(params) {
    if (params.type === "flag") {
      return `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff">
                <rect x="50" y="20" width="200" height="50" fill="#ddd" stroke="black"/>
                <rect x="50" y="70" width="200" height="50" fill="#bbb" stroke="black"/>
                <rect x="50" y="120" width="200" height="50" fill="#999" stroke="black"/>
                <line x1="50" y1="20" x2="50" y2="190" stroke="black" stroke-width="4"/>
            </svg>`;
    }
    return "";
  }
}

module.exports = CombinatoricsGenerator;
