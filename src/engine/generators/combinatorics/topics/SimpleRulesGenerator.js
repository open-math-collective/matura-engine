const BaseGenerator = require("../../../core/BaseGenerator");
const MathUtils = require("../../../utils/MathUtils");
const SimpleRulesValues = require("../values/SimpleRulesValues");

class SimpleRulesGenerator extends BaseGenerator {
  generateNumbersRule() {
    const { digitsRange, types, descriptions } =
      SimpleRulesValues.getNumbersRuleParams(this.difficulty);

    const digits = MathUtils.randomInt(digitsRange[0], digitsRange[1]);
    const type = MathUtils.randomElement(types);

    const { count, desc, shortDesc } = SimpleRulesValues.calculateNumbersCount(
      digits,
      type,
    );

    const templates = [
      `Ile jest wszystkich liczb naturalnych ${SimpleRulesValues.getDigitName(digits)} ${descriptions[type]}?`,
      `Oblicz liczbę liczb naturalnych ${SimpleRulesValues.getDigitName(digits)}, które są ${descriptions[type]}.`,
      `Ile liczb ${SimpleRulesValues.getDigitName(digits)} jest ${descriptions[type]}?`,
      `Znajdź liczbę wszystkich liczb ${SimpleRulesValues.getDigitName(digits)} ${descriptions[type]}.`,
      `Podaj liczbę liczb naturalnych ${SimpleRulesValues.getDigitName(digits)} ${descriptions[type]}.`,
      `Wyznacz liczbę liczb ${SimpleRulesValues.getDigitName(digits)} ${descriptions[type]}.`,
      `Ile jest liczb ${SimpleRulesValues.getDigitName(digits)} o własności: ${descriptions[type]}?`,
      `Oblicz ile liczb naturalnych ${SimpleRulesValues.getDigitName(digits)} spełnia warunek: ${descriptions[type]}.`,
      `Podaj liczebność zbioru liczb ${SimpleRulesValues.getDigitName(digits)} ${descriptions[type]}.`,
      `Znajdź ile jest liczb naturalnych ${SimpleRulesValues.getDigitName(digits)} ${descriptions[type]}.`,
      `Ile liczb ${SimpleRulesValues.getDigitName(digits)} należy do zbioru liczb ${descriptions[type]}?`,
      `Podaj ilość liczb naturalnych ${SimpleRulesValues.getDigitName(digits)} ${descriptions[type]}.`,
      `Wyznacz ile liczb ${SimpleRulesValues.getDigitName(digits)} jest ${descriptions[type]}.`,
      `Oblicz liczebność zbioru wszystkich liczb ${SimpleRulesValues.getDigitName(digits)} ${descriptions[type]}.`,
      `Ile elementów ma zbiór liczb ${SimpleRulesValues.getDigitName(digits)} ${descriptions[type]}?`,
      `Znajdź liczebność zbioru liczb naturalnych ${SimpleRulesValues.getDigitName(digits)} ${descriptions[type]}.`,
      `Podaj moc zbioru liczb ${SimpleRulesValues.getDigitName(digits)} ${descriptions[type]}.`,
      `Ile liczb naturalnych ${SimpleRulesValues.getDigitName(digits)} należy do zbioru liczb ${descriptions[type]}?`,
      `Oblicz moc zbioru wszystkich liczb ${SimpleRulesValues.getDigitName(digits)} ${descriptions[type]}.`,
      `Wyznacz ilość liczb ${SimpleRulesValues.getDigitName(digits)} ${descriptions[type]}.`,
    ];

    const question = MathUtils.randomElement(templates);

    return this.createResponse({
      question: question,
      latex: ``,
      image: null,
      variables: { digits, type },
      correctAnswer: `${count}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `${count}`,
        [
          `${Math.floor(count / 2)}`,
          `${Math.pow(10, digits)}`,
          `${Math.floor(count * 1.5)}`,
          `${Math.floor(count / 5)}`,
        ],
        () => {
          const offset = Math.floor(count * 0.1 * MathUtils.randomInt(1, 5));
          return `${Math.max(1, count + (Math.random() > 0.5 ? offset : -offset))}`;
        },
      ),
      steps: [`Stosujemy regułę mnożenia.`, desc, `Wynik: $$${count}$$`],
      questionType: "closed",
    });
  }

  generateDistinctDigits() {
    const { digitsRange } = SimpleRulesValues.getDistinctDigitsParams(
      this.difficulty,
    );

    const digits = MathUtils.randomInt(digitsRange[0], digitsRange[1]);
    const { res, steps } = SimpleRulesValues.calculateDistinctDigits(digits);

    const digitName = SimpleRulesValues.getDigitName(digits);

    const templates = [
      `Ile jest wszystkich liczb naturalnych ${digitName} o cyfrach niepowtarzających się?`,
      `Ile liczb naturalnych ${digitName} ma wszystkie cyfry różne?`,
      `Na ile sposobów można utworzyć liczbę ${digitName} z różnymi cyframi?`,
      `Ile jest liczb ${digitName} o parami różnych cyfrach?`,
      `Ile liczb ${digitName} nie ma powtarzających się cyfr?`,
      `Oblicz liczbę liczb ${digitName} o różnych cyfrach.`,
      `Znajdź liczbę wszystkich liczb ${digitName} z niepowtarzającymi się cyframi.`,
      `Podaj ile jest liczb naturalnych ${digitName} o różnych cyfrach.`,
      `Wyznacz liczbę liczb ${digitName} bez powtarzających się cyfr.`,
      `Ile liczb ${digitName} ma cyfry parami różne?`,
      `Oblicz ile liczb ${digitName} można utworzyć z różnych cyfr.`,
      `Znajdź ilość liczb ${digitName} o niepowtarzających się cyfrach.`,
      `Podaj liczbę liczb ${digitName} z różnymi cyframi.`,
      `Ile jest liczb ${digitName} bez powtórzeń cyfr?`,
      `Oblicz liczbę możliwych liczb ${digitName} o różnych cyfrach.`,
      `Wyznacz ilość liczb ${digitName} z niepowtarzającymi się cyframi.`,
      `Znajdź liczebność zbioru liczb ${digitName} o różnych cyfrach.`,
      `Ile elementów ma zbiór liczb ${digitName} bez powtórzeń cyfr?`,
      `Podaj moc zbioru liczb ${digitName} o różnych cyfrach.`,
      `Oblicz moc zbioru wszystkich liczb ${digitName} z różnymi cyframi.`,
    ];

    return this.createResponse({
      question: MathUtils.randomElement(templates),
      latex: ``,
      image: null,
      variables: { digits },
      correctAnswer: `${res}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `${res}`,
        [
          `${9 * Math.pow(10, digits - 1)}`,
          `${Math.pow(9, digits)}`,
          `${res * 2}`,
          `${Math.pow(10, digits) - Math.pow(9, digits)}`,
        ],
        () => {
          const offset =
            MathUtils.randomElement([1, -1, 10, -10]) *
            MathUtils.randomInt(1, 10);
          return `${Math.max(1, res + offset)}`;
        },
      ),
      steps: steps.concat([`Wynik: $$${res}$$`]),
      questionType: "closed",
    });
  }

  generateNumbersFromSet() {
    const { nRange, setTypes } = SimpleRulesValues.getNumbersFromSetParams(
      this.difficulty,
    );

    const setType = MathUtils.randomElement(setTypes);
    const setInfo = SimpleRulesValues.getDigitSet(setType);

    const n = MathUtils.randomInt(nRange[0], nRange[1]);
    const k = setInfo.digits.length;
    const res = Math.pow(k, n);

    const templates = [
      `Ile jest wszystkich liczb naturalnych ${SimpleRulesValues.getDigitName(n)}, których zapis dziesiętny składa się wyłącznie z cyfr ${setInfo.desc}?`,
      `Na ile sposobów można utworzyć liczbę ${SimpleRulesValues.getDigitName(n)} używając tylko cyfr ${setInfo.desc}?`,
      `Ile liczb ${SimpleRulesValues.getDigitName(n)} ma wszystkie cyfry ze zbioru {${setInfo.digits.join(", ")}}?`,
      `Z cyfr {${setInfo.digits.join(", ")}} tworzymy liczby ${SimpleRulesValues.getDigitName(n)}. Ile można utworzyć?`,
      `Oblicz liczbę liczb ${SimpleRulesValues.getDigitName(n)} z cyfr ${setInfo.desc}.`,
      `Znajdź liczbę wszystkich liczb ${SimpleRulesValues.getDigitName(n)} używających tylko cyfr ${setInfo.desc}.`,
      `Ile liczb ${SimpleRulesValues.getDigitName(n)} składa się wyłącznie z cyfr ${setInfo.desc}?`,
      `Podaj liczbę liczb ${SimpleRulesValues.getDigitName(n)} o cyfrach ze zbioru {${setInfo.digits.join(", ")}}.`,
      `Wyznacz liczbę liczb ${SimpleRulesValues.getDigitName(n)} z cyfr ${setInfo.desc}.`,
      `Oblicz ile liczb ${SimpleRulesValues.getDigitName(n)} można zapisać używając cyfr ${setInfo.desc}.`,
      `Znajdź ilość liczb ${SimpleRulesValues.getDigitName(n)} z cyframi ze zbioru {${setInfo.digits.join(", ")}}.`,
      `Ile jest liczb ${SimpleRulesValues.getDigitName(n)} używających tylko cyfr ${setInfo.desc}?`,
      `Podaj ilość liczb ${SimpleRulesValues.getDigitName(n)} o cyfrach ${setInfo.desc}.`,
      `Wyznacz ilość wszystkich liczb ${SimpleRulesValues.getDigitName(n)} z cyfr ${setInfo.desc}.`,
      `Oblicz liczbę możliwych liczb ${SimpleRulesValues.getDigitName(n)} ze zbioru cyfr {${setInfo.digits.join(", ")}}.`,
      `Znajdź liczebność zbioru liczb ${SimpleRulesValues.getDigitName(n)} z cyframi ${setInfo.desc}.`,
      `Ile elementów ma zbiór liczb ${SimpleRulesValues.getDigitName(n)} używających cyfr ${setInfo.desc}?`,
      `Podaj moc zbioru liczb ${SimpleRulesValues.getDigitName(n)} o cyfrach ${setInfo.desc}.`,
      `Oblicz moc zbioru wszystkich liczb ${SimpleRulesValues.getDigitName(n)} z cyfr {${setInfo.digits.join(", ")}}.`,
      `Wyznacz liczebność zbioru liczb ${SimpleRulesValues.getDigitName(n)} ze zbioru cyfr {${setInfo.digits.join(", ")}}.`,
    ];

    return this.createResponse({
      question: MathUtils.randomElement(templates),
      latex: ``,
      image: null,
      variables: { n, k, setType },
      correctAnswer: `${res}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `${res}`,
        [
          `${Math.pow(10, n)}`,
          `${n * k}`,
          `${Math.pow(n - 1, k)}`,
          `${Math.pow(k, n - 1)}`,
          `${Math.pow(k + 1, n)}`,
        ],
        () => {
          const fakeK = k + MathUtils.randomElement([-1, 1]);
          return `${Math.pow(Math.max(1, fakeK), n)}`;
        },
      ),
      steps: [
        `Dostępne cyfry to: $$${setInfo.digits.join(", ")}$$. Jest ich $$${k}$$.`,
        `$$${Array(n).fill(k).join(" \\cdot ")} = ${k}^{${n}} = ${res}$$`,
      ],
      questionType: "closed",
    });
  }

  generateSumOfDigits() {
    const { sumRange } = SimpleRulesValues.getSumOfDigitsParams(
      this.difficulty,
    );

    const sumTarget = MathUtils.randomInt(sumRange[0], sumRange[1]);
    const { count, examples } =
      SimpleRulesValues.calculateSumOfDigits(sumTarget);

    const templates = [
      `Ile jest wszystkich liczb naturalnych trzycyfrowych, których suma cyfr jest równa $$${sumTarget}$$?`,
      `Ile liczb trzycyfrowych ma sumę cyfr równą $$${sumTarget}$$?`,
      `Na ile sposobów można utworzyć liczbę trzycyfrową o sumie cyfr $$${sumTarget}$$?`,
      `Ile trzycyfrowych liczb naturalnych ma sumę cyfr $$${sumTarget}$$?`,
      `Oblicz liczbę liczb trzycyfrowych o sumie cyfr $$${sumTarget}$$.`,
      `Znajdź liczbę wszystkich liczb trzycyfrowych z sumą cyfr $$${sumTarget}$$.`,
      `Ile liczb trzycyfrowych spełnia warunek: suma cyfr = $$${sumTarget}$$?`,
      `Podaj liczbę liczb trzycyfrowych o sumie cyfr równej $$${sumTarget}$$.`,
      `Wyznacz liczbę liczb trzycyfrowych z sumą cyfr $$${sumTarget}$$.`,
      `Oblicz ile liczb trzycyfrowych ma sumę cyfr $$${sumTarget}$$.`,
      `Znajdź ilość liczb trzycyfrowych o sumie cyfr $$${sumTarget}$$.`,
      `Ile jest liczb trzycyfrowych o sumie cyfr równej $$${sumTarget}$$?`,
      `Podaj ilość liczb trzycyfrowych z sumą cyfr $$${sumTarget}$$.`,
      `Wyznacz ilość wszystkich liczb trzycyfrowych o sumie cyfr $$${sumTarget}$$.`,
      `Oblicz liczbę możliwych liczb trzycyfrowych z sumą cyfr $$${sumTarget}$$.`,
      `Znajdź liczebność zbioru liczb trzycyfrowych o sumie cyfr $$${sumTarget}$$.`,
      `Ile elementów ma zbiór liczb trzycyfrowych o sumie cyfr $$${sumTarget}$$?`,
      `Podaj moc zbioru liczb trzycyfrowych z sumą cyfr $$${sumTarget}$$.`,
      `Oblicz moc zbioru wszystkich liczb trzycyfrowych o sumie cyfr $$${sumTarget}$$.`,
      `Wyznacz liczebność zbioru liczb trzycyfrowych z sumą cyfr $$${sumTarget}$$.`,
      `Znajdź wszystkie liczby trzycyfrowe o sumie cyfr $$${sumTarget}$$ i podaj ich liczbę.`,
      `Policz ile liczb trzycyfrowych ma sumę cyfr równą dokładnie $$${sumTarget}$$.`,
      `Ile jest takich liczb trzycyfrowych, że suma ich cyfr wynosi $$${sumTarget}$$?`,
      `Podaj liczbę wszystkich trzycyfrowych liczb naturalnych o sumie cyfr $$${sumTarget}$$.`,
      `Oblicz ile istnieje liczb trzycyfrowych o sumie cyfr równej $$${sumTarget}$$.`,
      `Wyznacz ilość trzycyfrowych liczb o sumie cyfr równej $$${sumTarget}$$.`,
      `Znajdź ilość wszystkich liczb trzycyfrowych, których suma cyfr to $$${sumTarget}$$.`,
      `Policz wszystkie liczby trzycyfrowe o sumie cyfr równej $$${sumTarget}$$.`,
      `Ile liczb trzycyfrowych spełnia warunek, że suma cyfr jest równa $$${sumTarget}$$?`,
      `Podaj liczbę trzycyfrowych liczb naturalnych o sumie cyfr równej $$${sumTarget}$$.`,
    ];

    const candidates = [
      count - 1,
      count + 1,
      count + 2,
      sumTarget,
      sumTarget * 2,
      sumTarget + 10,
      count + 5,
      Math.max(1, count - 2),
      count * 2,
      Math.floor(count / 2),
    ];

    const uniqueDistractors = [];
    const usedValues = new Set();
    usedValues.add(count);

    for (const val of candidates) {
      if (val > 0 && !usedValues.has(val) && val < 1000) {
        uniqueDistractors.push(`${val}`);
        usedValues.add(val);
      }
      if (uniqueDistractors.length === 3) break;
    }

    let offset = 1;
    while (uniqueDistractors.length < 3) {
      const val = count + offset;
      if (val > 0 && !usedValues.has(val)) {
        uniqueDistractors.push(`${val}`);
        usedValues.add(val);
      }
      offset = offset > 0 ? -offset : -offset + 1;
    }

    return this.createResponse({
      question: MathUtils.randomElement(templates),
      latex: ``,
      image: null,
      variables: { sumTarget, count },
      correctAnswer: `${count}`,
      distractors: uniqueDistractors,
      steps: [
        `Wypisujemy systematycznie liczby trzycyfrowe o sumie cyfr $$${sumTarget}$$:`,
        `$$${examples.join(", ")}...$$`,
        `Łącznie jest ich: $$${count}$$`,
      ],
      questionType: "closed",
    });
  }

  generateMixedCodes() {
    const { lettersRange, digitsRange } = SimpleRulesValues.getMixedCodesParams(
      this.difficulty,
    );

    const lettersCount = MathUtils.randomInt(lettersRange[0], lettersRange[1]);
    const digitsCount = MathUtils.randomInt(digitsRange[0], digitsRange[1]);
    const latexRes = `26^{${lettersCount}} \\cdot 10^{${digitsCount}}`;

    const q = SimpleRulesValues.getMixedCodesTemplates(
      lettersCount,
      digitsCount,
    );

    return this.createResponse({
      question: q,
      latex: ``,
      image: null,
      variables: { lettersCount, digitsCount },
      correctAnswer: latexRes,
      distractors: MathUtils.ensureUniqueDistractors(
        latexRes,
        [
          `26 \\cdot 10`,
          `${lettersCount + digitsCount}^{36}`,
          `26 \\cdot ${lettersCount} + 10 \\cdot ${digitsCount}`,
          `26^{${lettersCount + digitsCount}}`,
          `10^{${lettersCount + digitsCount}}`,
        ],
        () => {
          const fakeLetters = lettersCount + MathUtils.randomElement([-1, 1]);
          const fakeDigits = digitsCount + MathUtils.randomElement([-1, 1]);
          return `26^{${fakeLetters}} \\cdot 10^{${fakeDigits}}`;
        },
      ),
      steps: [
        `Mamy $$${lettersCount}$$ miejsc na litery i $$${digitsCount}$$ miejsc na cyfry.`,
        `$$26^{${lettersCount}}$$ (litery) $$\\cdot$$ $$10^{${digitsCount}}$$ (cyfry)`,
        `Z reguły mnożenia: $$${latexRes}$$`,
      ],
      questionType: "closed",
    });
  }
}

module.exports = SimpleRulesGenerator;
