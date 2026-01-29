const MathUtils = require("../../../utils/MathUtils");

class SimpleRulesValues {
  /**
   * Parameters for numbers rule (count numbers with specific properties)
   */
  static getNumbersRuleParams(difficulty) {
    if (difficulty === "easy") {
      return {
        digitsRange: [2, 3],
        types: ["even", "div5"],
        descriptions: {
          even: "parzystych",
          div5: "podzielnych przez 5",
          div10: "podzielnych przez 10",
          no_zero: "bez zera",
        },
      };
    } else if (difficulty === "hard") {
      return {
        digitsRange: [2, 300],
        types: ["even", "div5", "div10", "no_zero", "odd", "div3"],
        descriptions: {
          even: "parzystych",
          div5: "podzielnych przez 5",
          div10: "podzielnych przez 10",
          no_zero: "bez cyfry 0",
          odd: "nieparzystych",
          div3: "podzielnych przez 3",
        },
      };
    } else {
      return {
        digitsRange: [3, 5],
        types: ["even", "div5", "div10", "no_zero", "odd"],
        descriptions: {
          even: "parzystych",
          div5: "podzielnych przez 5",
          div10: "podzielnych przez 10",
          no_zero: "bez cyfry 0",
          odd: "nieparzystych",
        },
      };
    }
  }

  /**
   * Calculate count for numbers rule
   */
  static calculateNumbersCount(digits, type) {
    let count, desc, shortDesc;

    switch (type) {
      case "even":
        count = 9 * Math.pow(10, digits - 2) * 5;
        desc = `Pierwsza cyfra: 9 opcji (1-9). Kolejne ${digits - 2} cyfr: po 10 opcji. Ostatnia (parzysta): 5 opcji (0,2,4,6,8).`;
        shortDesc = "Ostatnia cyfra parzysta (0,2,4,6,8) - 5 opcji";
        break;
      case "odd":
        count = 9 * Math.pow(10, digits - 2) * 5;
        desc = `Pierwsza cyfra: 9 opcji (1-9). Kolejne ${digits - 2} cyfr: po 10 opcji. Ostatnia (nieparzysta): 5 opcji (1,3,5,7,9).`;
        shortDesc = "Ostatnia cyfra nieparzysta (1,3,5,7,9) - 5 opcji";
        break;
      case "div5":
        count = 9 * Math.pow(10, digits - 2) * 2;
        desc = `Pierwsza cyfra: 9 opcji. Kolejne: 10 opcji. Ostatnia (0 lub 5): 2 opcje.`;
        shortDesc = "Ostatnia cyfra 0 lub 5 - 2 opcje";
        break;
      case "div10":
        count = 9 * Math.pow(10, digits - 2) * 1;
        desc = `Pierwsza cyfra: 9 opcji. Kolejne: 10 opcji. Ostatnia (0): 1 opcja.`;
        shortDesc = "Ostatnia cyfra 0 - 1 opcja";
        break;
      case "no_zero":
        count = Math.pow(9, digits);
        desc = `Każda cyfra od 1 do 9 (9 opcji na każdej pozycji).`;
        shortDesc = "Wszystkie cyfry od 1 do 9";
        break;
      case "div3":
        count = Math.floor((Math.pow(10, digits - 1) * 9) / 3);
        desc = `Około 1/3 wszystkich liczb ${digits}-cyfrowych ma sumę cyfr podzielną przez 3.`;
        shortDesc = "Suma cyfr podzielna przez 3";
        break;
      default:
        count = 9 * Math.pow(10, digits - 1);
        desc = "Wszystkie liczby " + digits + "-cyfrowe.";
        shortDesc = "Wszystkie liczby " + digits + "-cyfrowe";
    }

    return { count, desc, shortDesc };
  }

  /**
   * Parameters for distinct digits problem
   */
  static getDistinctDigitsParams(difficulty) {
    if (difficulty === "easy") {
      return {
        digitsRange: [2, 3],
      };
    } else if (difficulty === "hard") {
      return {
        digitsRange: [2, 2000],
      };
    } else {
      return {
        digitsRange: [3, 5],
      };
    }
  }

  /**
   * Calculate count for distinct digits
   */
  static calculateDistinctDigits(digits) {
    // 9 * 9 * 8 * 7 * ...
    let res = 9;
    let current = 9;
    let steps = ["Pierwsza cyfra: 9 opcji (bez 0)"];

    for (let i = 1; i < digits; i++) {
      res *= current;
      if (i === 1) {
        steps.push(`Druga cyfra: ${current} opcji (dochodzi 0, odpada użyta)`);
      } else {
        steps.push(`Cyfra ${i + 1}: ${current} opcji`);
      }
      current--;
    }

    return { res, steps };
  }

  /**
   * Get digit name in Polish
   */
  static getDigitName(digits) {
    const names = {
      2: "dwucyfrowych",
      3: "trzycyfrowych",
      4: "czterocyfrowych",
      5: "pięciocyfrowych",
      6: "sześciocyfrowych",
      7: "siedmiocyfrowych",
      8: "ośmiocyfrowych",
    };
    return names[digits] || `${digits}-cyfrowych`;
  }

  /**
   * Parameters for numbers from set problem
   */
  static getNumbersFromSetParams(difficulty) {
    if (difficulty === "easy") {
      return {
        nRange: [2, 3],
        setTypes: ["small", "odd_simple"],
      };
    } else if (difficulty === "hard") {
      return {
        nRange: [2, 300],
        setTypes: ["odd", "prime", "even", "div3", "fibonacci"],
      };
    } else {
      return {
        nRange: [2, 4],
        setTypes: ["odd", "small", "prime", "even"],
      };
    }
  }

  /**
   * Get set definition
   */
  static getDigitSet(setType) {
    const sets = {
      odd: {
        digits: [1, 3, 5, 7, 9],
        name: "nieparzystych",
        desc: "nieparzystych (1, 3, 5, 7, 9)",
      },
      odd_simple: {
        digits: [1, 3, 5],
        name: "nieparzystych",
        desc: "nieparzystych (1, 3, 5)",
      },
      even: {
        digits: [0, 2, 4, 6, 8],
        name: "parzystych",
        desc: "parzystych (0, 2, 4, 6, 8)",
      },
      small: {
        digits: [1, 2, 3, 4],
        name: "{1, 2, 3, 4}",
        desc: "należących do zbioru {1, 2, 3, 4}",
      },
      prime: {
        digits: [2, 3, 5, 7],
        name: "pierwszych",
        desc: "będących cyframi pierwszymi (2, 3, 5, 7)",
      },
      div3: {
        digits: [0, 3, 6, 9],
        name: "podzielnych przez 3",
        desc: "podzielnych przez 3 (0, 3, 6, 9)",
      },
      fibonacci: {
        digits: [1, 2, 3, 5, 8],
        name: "Fibonacciego",
        desc: "będących liczbami Fibonacciego (1, 2, 3, 5, 8)",
      },
    };
    return sets[setType] || sets["odd"];
  }

  /**
   * Parameters for sum of digits problem
   */
  static getSumOfDigitsParams(difficulty) {
    if (difficulty === "easy") {
      return {
        sumRange: [2, 4],
      };
    } else if (difficulty === "hard") {
      return {
        sumRange: [2, 27],
      };
    } else {
      return {
        sumRange: [3, 12],
      };
    }
  }

  /**
   * Calculate count of 3-digit numbers with given sum of digits
   */
  static calculateSumOfDigits(sumTarget) {
    let count = 0;
    let examples = [];
    const allNumbers = [];

    for (let h = 1; h <= 9; h++) {
      for (let t = 0; t <= 9; t++) {
        for (let u = 0; u <= 9; u++) {
          if (h + t + u === sumTarget) {
            count++;
            allNumbers.push(`${h}${t}${u}`);
            if (examples.length < 5) {
              examples.push(`${h}${t}${u}`);
            }
          }
        }
      }
    }

    return { count, examples, allNumbers };
  }

  /**
   * Parameters for mixed codes problem
   */
  static getMixedCodesParams(difficulty) {
    if (difficulty === "easy") {
      return {
        lettersRange: [1, 2],
        digitsRange: [1, 2],
      };
    } else if (difficulty === "hard") {
      return {
        lettersRange: [2, 20],
        digitsRange: [2, 20],
      };
    } else {
      return {
        lettersRange: [1, 3],
        digitsRange: [1, 4],
      };
    }
  }

  /**
   * Get templates for mixed codes
   */
  static getMixedCodesTemplates(lettersCount, digitsCount) {
    const templates = [
      `Ile różnych kodów można utworzyć, jeżeli każdy kod składa się z $$${lettersCount}$$ liter (wybranych z 26 liter alfabetu łacińskiego) oraz $$${digitsCount}$$ cyfr (arabskich)? Zakładamy, że najpierw występują litery, a potem cyfry, i mogą się one powtarzać.`,
      `Na ile sposobów można stworzyć kod składający się z $$${lettersCount}$$ liter (A-Z) i $$${digitsCount}$$ cyfr (0-9), gdzie litery są na początku? Powtórzenia dozwolone.`,
      `System generuje kody z $$${lettersCount}$$ literami (26 możliwości) i $$${digitsCount}$$ cyframi (10 możliwości). Ile różnych kodów można utworzyć?`,
      `Hasło składa się z $$${lettersCount}$$ liter (A-Z) i $$${digitsCount}$$ cyfr. Ile możliwych haseł istnieje, jeśli litery są przed cyframi?`,
      `Na ile sposobów można utworzyć identyfikator z $$${lettersCount}$$ literami (26 opcji) i $$${digitsCount}$$ cyframi (10 opcji)? Litery pierwsze, potem cyfry.`,
      `Oblicz liczbę kodów składających się z $$${lettersCount}$$ liter (A-Z) i $$${digitsCount}$$ cyfr (0-9), gdzie litery są na początku.`,
      `Znajdź liczbę wszystkich kodów z $$${lettersCount}$$ literami i $$${digitsCount}$$ cyframi. Litery mogą się powtarzać, cyfry też.`,
      `Ile kodów można utworzyć z $$${lettersCount}$$ liter (26 opcji) i $$${digitsCount}$$ cyfr (10 opcji)? Powtórzenia dozwolone.`,
      `System haseł używa $$${lettersCount}$$ liter i $$${digitsCount}$$ cyfr. Ile różnych haseł można stworzyć?`,
      `Na ile sposobów można wygenerować kod z $$${lettersCount}$$ liter (A-Z) na początku i $$${digitsCount}$$ cyfr (0-9) na końcu?`,
      `Oblicz ile różnych identyfikatorów można utworzyć z $$${lettersCount}$$ liter i $$${digitsCount}$$ cyfr.`,
      `Znajdź ilość kodów składających się z $$${lettersCount}$$ liter (26 możliwości) i $$${digitsCount}$$ cyfr (10 możliwości).`,
      `Ile jest możliwych kodów z $$${lettersCount}$$ literami (A-Z) i $$${digitsCount}$$ cyframi (0-9)?`,
      `Podaj liczbę kodów utworzonych z $$${lettersCount}$$ liter i $$${digitsCount}$$ cyfr z powtórzeniami.`,
      `Wyznacz liczbę wszystkich kodów z $$${lettersCount}$$ literami (26 opcji) i $$${digitsCount}$$ cyframi (10 opcji).`,
      `Oblicz ile różnych sekwencji można utworzyć z $$${lettersCount}$$ liter i $$${digitsCount}$$ cyfr.`,
      `Znajdź liczebność zbioru kodów z $$${lettersCount}$$ literami i $$${digitsCount}$$ cyframi.`,
      `Ile elementów ma zbiór kodów składających się z $$${lettersCount}$$ liter i $$${digitsCount}$$ cyfr?`,
      `Podaj moc zbioru kodów z $$${lettersCount}$$ liter (A-Z) i $$${digitsCount}$$ cyfr (0-9).`,
      `Oblicz moc zbioru wszystkich kodów z $$${lettersCount}$$ literami i $$${digitsCount}$$ cyframi.`,
    ];
    return MathUtils.randomElement(templates);
  }
}

module.exports = SimpleRulesValues;
