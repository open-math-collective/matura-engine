const BaseGenerator = require("../../core/BaseGenerator");
const MathUtils = require("../../utils/MathUtils");

class CombinatoricsGenerator extends BaseGenerator {
  generate() {
    const variants = [
      "numbers_rule", // Liczby n-cyfrowe parzyste/podzielne
      "distinct_digits", // Liczby o różnych cyfrach
      "queue_perm", // Kolejka / Miejsca w kinie
      "clothing_sets", // NOWOŚĆ: Zestawy ubrań/obiadowe (3 zupy, 4 drugie...)
      "handshakes", // NOWOŚĆ: Uściski dłoni / Mecze (n*(n-1)/2)
      "flag_coloring", // NOWOŚĆ: Kolorowanie flagi
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
      case "numbers_rule":
      default:
        return this.generateNumbersRule();
    }
  }

  // 1. REGUŁA MNOŻENIA (LICZBY)
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
      // Pierwsza: 9 (1-9), Środek: 10, Ostatnia: 5 (0,2,4,6,8)
      count = 9 * Math.pow(10, digits - 2) * 5;
      desc = `Pierwsza cyfra: 9 opcji. Kolejne: 10 opcji. Ostatnia (parzysta): 5 opcji.`;
    } else if (type === "div5") {
      count = 9 * Math.pow(10, digits - 2) * 2; // Kończy się na 0 lub 5
      desc = `Ostatnia cyfra to 0 lub 5 (2 opcje).`;
    } else if (type === "div10") {
      count = 9 * Math.pow(10, digits - 2) * 1; // Kończy się na 0
      desc = `Ostatnia cyfra to 0 (1 opcja).`;
    } else {
      count = Math.pow(9, digits); // Bez zera (1-9 wszędzie)
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

  // 2. RÓŻNE CYFRY
  generateDistinctDigits() {
    const digits = 3;
    const res = 9 * 9 * 8; // 1: (1-9), 2: (0-9 bez jednej), 3: (0-9 bez dwóch)
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

  // 3. KOLEJKA (PERMUTACJE)
  generateQueueProblem() {
    const n = MathUtils.randomInt(4, 6);
    let res = 1;
    for (let i = 1; i <= n; i++) res *= i;
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

  // 4. ZESTAWY (UBRANIA/MENU)
  generateSetsProblem() {
    const type = MathUtils.randomElement(["clothes", "menu"]);
    let q, c1, c2, c3, n1, n2, n3, total;

    if (type === "clothes") {
      n1 = MathUtils.randomInt(3, 6); // Bluzki
      n2 = MathUtils.randomInt(3, 6); // Spodnie
      n3 = MathUtils.randomInt(2, 4); // Buty
      c1 = "bluzek";
      c2 = "par spodni";
      c3 = "par butów";
      q = `W szafie wisi ${n1} ${c1}, leży ${n2} ${c2} i stoi ${n3} ${c3}. Ile różnych zestawów (bluzka + spodnie + buty) można utworzyć?`;
    } else {
      n1 = MathUtils.randomInt(3, 5); // Zupy
      n2 = MathUtils.randomInt(4, 8); // Drugie dania
      n3 = MathUtils.randomInt(2, 5); // Desery
      c1 = "zup";
      c2 = "drugich dań";
      c3 = "deserów";
      q = `Restauracja oferuje ${n1} rodzajów ${c1}, ${n2} rodzaje ${c2} i ${n3} rodzajów ${c3}. Ile różnych pełnych zestawów obiadowych można zamówić?`;
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
        `Reguła mnożenia: mnożymy liczby możliwości z każdej kategorii.`,
        `$$${n1} \\cdot ${n2} \\cdot ${n3} = ${total}$$`,
      ],
    });
  }

  // 5. TURNIEJ / UŚCISKI (KOMBINACJE C(n,2))
  generateHandshakesProblem() {
    const n = MathUtils.randomInt(6, 12);
    const result = (n * (n - 1)) / 2;
    const type = MathUtils.randomElement(["handshakes", "matches"]);

    const q =
      type === "handshakes"
        ? `Na spotkaniu towarzyskim było $$${n}$$ osób. Każdy przywitał się z każdym uściskiem dłoni. Ile nastąpiło powitań?`
        : `W turnieju szachowym bierze udział $$${n}$$ zawodników. Każdy gra z każdym dokładnie jeden mecz. Ile meczów zostanie rozegranych?`;

    return this.createResponse({
      question: q,
      latex: `n=${n}`,
      image: null,
      variables: { n },
      correctAnswer: `${result}`,
      distractors: [`${n * (n - 1)}`, `${n * 2}`, `${result + n}`],
      steps: [
        `Wybieramy 2 osoby z $$${n}$$, kolejność nie ma znaczenia.`,
        `Wzór: $$\\frac{n(n-1)}{2}$$`,
        `$$\\frac{${n}\\cdot${n - 1}}{2} = \\frac{${n * (n - 1)}}{2} = ${result}$$`,
      ],
    });
  }

  // 6. FLAGI (WARIACJE Z POWTÓRZENIAMI LUB BEZ)
  generateFlagProblem() {
    // Flaga ma 3 poziome pasy. Mamy k kolorów.
    // Wariant A: Kolory mogą się powtarzać (sąsiadujące nie - trudniejsze, pomińmy na basic).
    // Wariant B: Kolory mogą się dowolnie powtarzać -> k*k*k.
    // Wariant C: Kolory muszą być różne -> k*(k-1)*(k-2).

    const k = MathUtils.randomInt(4, 6);
    const distinct = MathUtils.randomElement([true, false]);
    const res = distinct ? k * (k - 1) * (k - 2) : k * k * k;

    return this.createResponse({
      question: `Mamy do dyspozycji $$${k}$$ kolorów materiału. Szyjemy flagę z trzech poziomych pasów jednakowej szerokości. Ile różnych flag można uszyć, jeśli kolory pasów ${distinct ? "nie mogą się powtarzać" : "mogą się powtarzać"}?`,
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
          ? `Pierwszy pas: ${k} opcji. Drugi: ${k - 1} opcji. Trzeci: ${k - 2} opcji.`
          : `Każdy pas możemy wybrać na ${k} sposobów.`,
        distinct
          ? `$$${k} \\cdot ${k - 1} \\cdot ${k - 2} = ${res}$$`
          : `$$${k} \\cdot ${k} \\cdot ${k} = ${res}$$`,
      ],
    });
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
