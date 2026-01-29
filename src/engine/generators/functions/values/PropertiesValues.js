const MathUtils = require("../../../utils/MathUtils");

class PropertiesValues {
  /**
   * Get value range problem parameters
   */
  static getValueRangeParams(difficulty) {
    if (difficulty === "easy") {
      return {
        aList: [-1, 1],
        vertexRange: [-3, 3],
      };
    } else if (difficulty === "hard") {
      return {
        aList: [-3, -2, 2, 3, 4],
        vertexRange: [-8, 8],
      };
    } else {
      return {
        aList: [-2, -1, 1, 2],
        vertexRange: [-5, 5],
      };
    }
  }

  /**
   * Get value range problem templates
   */
  static getValueRangeTemplates(formula) {
    return [
      () => `Wyznacz zbiór wartości funkcji:`,
      () => `Podaj zbiór wartości funkcji kwadratowej:`,
      () => `Znajdź przedział wartości funkcji:`,
      () => `Określ zbiór wartości funkcji kwadratowej:`,
      () => `Dla jakich wartości przyjmuje funkcja:`,
      () => `Wskaż zbiór wartości funkcji:`,
      () => `Oblicz zbiór wartości funkcji:`,
      () => `Podaj dziedzinę wartości funkcji:`,
      () => `Znajdź zakres wartości funkcji kwadratowej:`,
      () => `Wyznacz zbiór wszystkich wartości funkcji:`,
      () => `Dla jakiego zbioru wartości jest określona funkcja:`,
      () => `Wskaż przedział wartości funkcji kwadratowej:`,
      () => `Określ zbiór wartości jakie przyjmuje funkcja:`,
      () => `Podaj wszystkie wartości jakie może przyjąć funkcja:`,
      () => `Znajdź zbiór wartości wyrażenia:`,
      () => `Wyznacz zbiór wartości funkcji danej wzorem:`,
      () => `Jaki jest zbiór wartości funkcji:`,
      () => `Wskaż dla jakich wartości określona jest funkcja:`,
      () => `Oblicz przedział wartości funkcji kwadratowej:`,
      () => `Podaj zakres zmienności funkcji:`,
      () => `Znajdź wszystkie wartości jakie przyjmuje funkcja:`,
      () => `Wyznacz zbiór wartości funkcji określonej wzorem:`,
      () => `Określ dla jakich wartości funkcja jest określona:`,
      () => `Dla jakich liczb przyjmuje wartości ta funkcja:`,
      () => `Wskaż zbiór wartości funkcji danej wzorem:`,
      () => `Podaj przedział wszystkich wartości funkcji:`,
      () => `Znajdź dziedzinę wartości funkcji kwadratowej:`,
      () => `Wyznacz zbiór wartości przyjmowanych przez funkcję:`,
      () => `Określ zakres wartości funkcji:`,
      () => `Dla jakiego zbioru przyjmuje wartości funkcja:`,
      () => `Wskaż wszystkie wartości funkcji kwadratowej:`,
      () => `Oblicz zbiór wartości jakie przyjmuje funkcja:`,
      () => `Podaj zbiór wartości dla funkcji:`,
      () => `Znajdź zbiór wartości funkcji o podanym wzorze:`,
      () => `Wyznacz przedział wartości funkcji kwadratowej:`,
      () => `Określ zbiór wszystkich wartości jakie przyjmuje funkcja:`,
      () => `Dla jakich wartości jest zdefiniowana funkcja:`,
      () => `Wskaż zbiór wartości dla funkcji kwadratowej:`,
      () => `Znajdź zakres wartości funkcji danej wzorem:`,
      () => `Podaj przedział wartości jakie przyjmuje funkcja:`,
      () => `Wyznacz zbiór wartości funkcji w zbiorze liczb rzeczywistych:`,
      () => `Określ wszystkie wartości przyjmowane przez funkcję:`,
      () => `Zbiór wartości funkcji kwadratowej to:`,
      () => `Jakie wartości może przyjąć funkcja kwadratowa:`,
      () => `Wartości jakie przyjmuje funkcja to:`,
      () => `Przedział wartości funkcji danej wzorem to:`,
      () => `Wyznacz wszystkie y dla których istnieje x spełniający równanie:`,
      () => `Dla jakich y funkcja ma rozwiązanie:`,
      () => `Znajdź zbiór wartości y funkcji kwadratowej:`,
      () => `Określ zbiór y spełniających równanie funkcji:`,
      () => `Podaj wszystkie wartości y funkcji kwadratowej:`,
      () => `Wskaż przedział zmienności wartości funkcji:`,
      () => `Dla jakich wartości y istnieje argument x:`,
      () => `Wyznacz zakres wartości przyjmowanych przez funkcję:`,
      () => `Zbiór wszystkich wartości funkcji to przedział:`,
      () => `Jaki przedział wartości odpowiada funkcji:`,
      () => `Wartości funkcji należą do zbioru:`,
      () => `Podaj zbiór wartości y dla funkcji kwadratowej:`,
      () => `Znajdź wszystkie możliwe wartości funkcji:`,
      () => `Wyznacz przedział zmienności y funkcji:`,
      () => `Określ zbiór wszystkich y dla funkcji:`,
      () => `Wskaż zakres wartości y funkcji kwadratowej:`,
      () => `Dla jakich wartości zmienna y przyjmuje wartości:`,
      () => `Oblicz zbiór wartości zmiennej zależnej y:`,
      () => `Zbiór wartości zmiennej y to:`,
      () => `Jakie y możemy otrzymać z funkcji:`,
      () => `Wartości y spełniają warunek:`,
      () => `Podaj wszystkie y dla których istnieje x:`,
      () => `Znajdź zakres zmienności wartości y:`,
      () => `Wyznacz zbiór y dla funkcji kwadratowej:`,
      () => `Określ przedział wartości y funkcji:`,
      () => `Wskaż wszystkie możliwe wartości y:`,
      () => `Dla jakich y równanie ma pierwiastki:`,
      () => `Oblicz przedział zmienności funkcji y:`,
      () => `Zbiór wartości y wynosi:`,
      () => `Jaki jest zakres wartości y:`,
      () => `Wartości funkcji mieszczą się w:`,
      () => `Podaj zakres wartości zmiennej y:`,
      () => `Znajdź przedział wartości y:`,
      () => `Wyznacz zbiór wszystkich wartości y:`,
      () => `Określ dla jakich y funkcja istnieje:`,
      () => `Wskaż wartości y funkcji kwadratowej:`,
      () => `Dla jakich liczb y funkcja przyjmuje wartości:`,
      () => `Oblicz zbiór wartości funkcji y:`,
      () => `Zbiór wszystkich y to:`,
      () => `Jakie wartości y są możliwe:`,
      () => `Wartości y należą do:`,
      () => `Podaj zbiór wszystkich wartości y:`,
      () => `Znajdź zakres y funkcji:`,
      () => `Wyznacz przedział y funkcji:`,
      () => `Określ wartości y funkcji:`,
      () => `Wskaż zbiór y spełniających:`,
      () => `Dla jakich wartości y rozwiązanie istnieje:`,
      () => `Oblicz wszystkie możliwe wartości y:`,
      () => `Zbiór wartości zmiennej to:`,
      () => `Jaki zbiór wartości odpowiada y:`,
      () => `Wartości zmiennej zależnej to:`,
    ];
  }

  /**
   * Generate value range distractors
   */
  static generateValueRangeDistractors(a, q, p) {
    const range =
      a > 0 ? `\\langle ${q}, \\infty )` : `( -\\infty, ${q} \\rangle`;
    const reversedRange =
      a > 0 ? `( -\\infty, ${q} \\rangle` : `\\langle ${q}, \\infty )`;

    return [
      reversedRange,
      `\\langle ${p}, \\infty )`,
      `\\mathbb{R}`,
      `( -\\infty, \\infty )`,
      `\\langle ${q - 1}, \\infty )`,
      a > 0 ? `( -\\infty, ${q + 1} \\rangle` : `\\langle ${q + 1}, \\infty )`,
    ];
  }

  /**
   * Get monotonicity problem parameters
   */
  static getMonotonicityParams(difficulty) {
    if (difficulty === "easy") {
      return {
        aList: [-1, 1],
        pRange: [-3, 3],
      };
    } else if (difficulty === "hard") {
      return {
        aList: [-3, 3],
        pRange: [-10, 10],
      };
    } else {
      return {
        aList: [-2, 2],
        pRange: [-5, 5],
      };
    }
  }

  /**
   * Get monotonicity problem templates
   */
  static getMonotonicityTemplates(formula, type) {
    return [
      () =>
        `Funkcja kwadratowa $$f(x) = ${formula}$$ jest ${type} w przedziale:`,
      () =>
        `Wskaż przedział, w którym funkcja $$f(x) = ${formula}$$ jest ${type}:`,
      () =>
        `Dla jakiego przedziału funkcja $$f(x) = ${formula}$$ jest ${type}:`,
      () => `Funkcja $$f(x) = ${formula}$$ jest funkcją ${type} w:`,
      () =>
        `Podaj przedział monotoniczności funkcji $$f(x) = ${formula}$$ dla funkcji ${type}:`,
      () =>
        `W którym przedziale funkcja kwadratowa $$f(x) = ${formula}$$ jest ${type}:`,
      () => `Zbiór, w którym funkcja $$f(x) = ${formula}$$ jest ${type}:`,
      () =>
        `Wyznacz przedział, w którym funkcja $$f(x) = ${formula}$$ jest ${type}:`,
      () =>
        `Funkcja kwadratowa $$f(x) = ${formula}$$ rośnie/maleje (wskaż dla ${type}):`,
      () => `Dla jakich x funkcja $$f(x) = ${formula}$$ jest ${type}:`,
      () =>
        `Podaj dziedzinę, w której funkcja $$f(x) = ${formula}$$ jest ${type}:`,
      () =>
        `Wskaż zbiór argumentów, dla których $$f(x) = ${formula}$$ jest ${type}:`,
      () =>
        `Przedział monotoniczności funkcji $$f(x) = ${formula}$$ (${type}):`,
      () => `Funkcja $$f(x) = ${formula}$$ zmienia się ${type} w przedziale:`,
      () =>
        `Dla jakiego zbioru funkcja kwadratowa $$f(x) = ${formula}$$ jest ${type}:`,
      () =>
        `W którym zbiorze funkcja $$f(x) = ${formula}$$ jest funkcją ${type}:`,
      () => `Znajdź przedział, w którym $$f(x) = ${formula}$$ jest ${type}:`,
      () =>
        `Określ przedział monotoniczności funkcji $$f(x) = ${formula}$$ dla ${type}:`,
      () =>
        `Funkcja kwadratowa $$f(x) = ${formula}$$ jest ${type} dla x należących do:`,
      () => `Podaj zbiór x, dla których $$f(x) = ${formula}$$ jest ${type}:`,
      () =>
        `Wskaż dziedzinę monotoniczności funkcji $$f(x) = ${formula}$$ (${type}):`,
      () => `Dla jakich argumentów funkcja $$f(x) = ${formula}$$ jest ${type}:`,
      () =>
        `Przedział, w którym funkcja $$f(x) = ${formula}$$ zmienia się ${type}:`,
      () => `Zbiór argumentów, dla których $$f(x) = ${formula}$$ jest ${type}:`,
      () => `Funkcja $$f(x) = ${formula}$$ jest ${type} w przedziale:`,
      () =>
        `Znajdź zbiór, w którym funkcja kwadratowa $$f(x) = ${formula}$$ jest ${type}:`,
      () => `Określ dla jakich x funkcja $$f(x) = ${formula}$$ jest ${type}:`,
      () => `Wskaż przedział ${type} funkcji $$f(x) = ${formula}$$:`,
      () =>
        `Dla jakiego przedziału funkcja $$f(x) = ${formula}$$ zachowuje się ${type}:`,
      () =>
        `Podaj przedział, w którym funkcja $$f(x) = ${formula}$$ jest właściwie ${type}:`,
      () =>
        `Funkcja kwadratowa $$f(x) = ${formula}$$ rośnie/maleje w zbiorze (${type}):`,
      () =>
        `Wyznacz zbiór argumentów, dla których $$f(x) = ${formula}$$ jest ${type}:`,
      () => `Dla jakich wartości x funkcja $$f(x) = ${formula}$$ jest ${type}:`,
      () =>
        `Przedział monotoniczny funkcji $$f(x) = ${formula}$$ dla funkcji ${type}:`,
      () => `Funkcja $$f(x) = ${formula}$$ jest ${type} dla argumentów z:`,
      () => `Znajdź dziedzinę, w której $$f(x) = ${formula}$$ jest ${type}:`,
      () => `Określ przedział, w którym $$f(x) = ${formula}$$ jest ${type}:`,
      () => `Wskaż zbiór, w którym funkcja $$f(x) = ${formula}$$ jest ${type}:`,
      () => `Dla jakiego zbioru argumentów $$f(x) = ${formula}$$ jest ${type}:`,
      () => `Podaj przedział zmienności ${type} funkcji $$f(x) = ${formula}$$:`,
    ];
  }

  /**
   * Generate monotonicity distractors
   */
  static generateMonotonicityDistractors(interval, p, q) {
    const reversedInterval = interval.includes("-\\infty")
      ? `\\langle ${p}, \\infty )`
      : `( -\\infty, ${p} \\rangle`;

    return [
      reversedInterval,
      `\\langle ${q}, \\infty )`,
      `( -\\infty, ${q} \\rangle`,
      `\\langle ${p + 1}, \\infty )`,
      `( -\\infty, ${p - 1} \\rangle`,
      `\\langle ${q + 1}, \\infty )`,
    ];
  }

  /**
   * Get min/max interval problem parameters
   */
  static getMinMaxIntervalParams(difficulty) {
    if (difficulty === "easy") {
      return {
        pRange: [-3, 3],
        aList: [-1, 1],
        isPInside: true,
      };
    } else if (difficulty === "hard") {
      return {
        pRange: [-6, 6],
        aList: [-2, 2, 3],
        isPInside: null, // random
      };
    } else {
      return {
        pRange: [-4, 4],
        aList: [-1, 1, 2],
        isPInside: true,
      };
    }
  }

  /**
   * Get min/max interval problem templates
   */
  static getMinMaxIntervalTemplates(formula, start, end, type) {
    return [
      () =>
        `Największą i najmniejszą wartość funkcji w przedziale $$\\langle ${start}, ${end} \\rangle$$ są odpowiednio liczby... Jaka jest ${type} z nich?`,
      () =>
        `W przedziale $$\\langle ${start}, ${end} \\rangle$$ funkcja $$${formula}$$ przyjmuje wartość ${type} równą:`,
      () =>
        `Oblicz wartość ${type} funkcji $$${formula}$$ w przedziale $$\\langle ${start}, ${end} \\rangle$$:`,
      () =>
        `Dla $$x \\in \\langle ${start}, ${end} \\rangle$$ znajdź wartość ${type} funkcji $$${formula}$$:`,
      () =>
        `Wartość ${type} funkcji $$${formula}$$ na przedziale $$\\langle ${start}, ${end} \\rangle$$ wynosi:`,
      () =>
        `Znajdź wartość ${type} jaką przyjmuje funkcja $$${formula}$$ w $$\\langle ${start}, ${end} \\rangle$$:`,
      () =>
        `Funkcja $$${formula}$$ w przedziale $$\\langle ${start}, ${end} \\rangle$$ ma wartość ${type} równą:`,
      () =>
        `Oblicz ${type} wartość funkcji $$${formula}$$ dla $$x \\in \\langle ${start}, ${end} \\rangle$$:`,
      () =>
        `Podaj wartość ${type} funkcji $$${formula}$$ w przedziale $$\\langle ${start}, ${end} \\rangle$$:`,
      () =>
        `W przedziale $$\\langle ${start}, ${end} \\rangle$$ wartość ${type} funkcji $$${formula}$$ to:`,
      () =>
        `Dla argumentów z $$\\langle ${start}, ${end} \\rangle$$ funkcja $$${formula}$$ osiąga wartość ${type}:`,
      () =>
        `Znajdź ${type} wartość jaką przyjmuje $$${formula}$$ w $$\\langle ${start}, ${end} \\rangle$$:`,
      () =>
        `Wartość ${type} funkcji kwadratowej $$${formula}$$ w przedziale $$\\langle ${start}, ${end} \\rangle$$:`,
      () =>
        `Oblicz wartość ${type} funkcji $$${formula}$$ na odcinku $$\\langle ${start}, ${end} \\rangle$$:`,
      () =>
        `Podaj ${type} wartość funkcji $$${formula}$$ dla $$x \\in \\langle ${start}, ${end} \\rangle$$:`,
      () =>
        `W przedziale $$\\langle ${start}, ${end} \\rangle$$ funkcja $$${formula}$$ przyjmuje ${type} wartość:`,
      () =>
        `Dla $$x \\in \\langle ${start}, ${end} \\rangle$$ oblicz wartość ${type} funkcji $$${formula}$$:`,
      () =>
        `Znajdź ${type} z wartości funkcji $$${formula}$$ w przedziale $$\\langle ${start}, ${end} \\rangle$$:`,
      () =>
        `Wartość ${type} jaką osiąga funkcja $$${formula}$$ w $$\\langle ${start}, ${end} \\rangle$$ to:`,
      () =>
        `Oblicz ${type} wartość funkcji kwadratowej $$${formula}$$ w przedziale $$\\langle ${start}, ${end} \\rangle$$:`,
      () =>
        `Funkcja $$${formula}$$ w przedziale $$\\langle ${start}, ${end} \\rangle$$ osiąga wartość ${type}:`,
      () =>
        `Podaj wartość ${type} funkcji $$${formula}$$ na przedziale $$\\langle ${start}, ${end} \\rangle$$:`,
      () =>
        `Dla przedziału $$\\langle ${start}, ${end} \\rangle$$ znajdź wartość ${type} funkcji $$${formula}$$:`,
      () =>
        `Wartość ${type} funkcji $$${formula}$$ w zbiorze $$\\langle ${start}, ${end} \\rangle$$ wynosi:`,
      () =>
        `Oblicz ${type} z wartości jakie przyjmuje $$${formula}$$ w $$\\langle ${start}, ${end} \\rangle$$:`,
      () =>
        `Znajdź wartość ${type} funkcji $$${formula}$$ dla argumentów z $$\\langle ${start}, ${end} \\rangle$$:`,
      () =>
        `W przedziale $$\\langle ${start}, ${end} \\rangle$$ ${type} wartość $$${formula}$$ to:`,
      () =>
        `Podaj ${type} wartość jaką przyjmuje funkcja $$${formula}$$ w $$\\langle ${start}, ${end} \\rangle$$:`,
      () =>
        `Dla $$x \\in \\langle ${start}, ${end} \\rangle$$ wartość ${type} funkcji $$${formula}$$ wynosi:`,
      () =>
        `Oblicz wartość ${type} funkcji $$${formula}$$ w zbiorze $$\\langle ${start}, ${end} \\rangle$$:`,
    ];
  }

  /**
   * Generate min/max interval distractors
   */
  static generateMinMaxIntervalDistractors(
    ans,
    f_start,
    f_end,
    q,
    correctAnswer,
  ) {
    const candidates = [
      `${f_start}`,
      `${f_end}`,
      `${q}`,
      `${f_start + 1}`,
      `${f_end + 1}`,
      `${q + 1}`,
      `${f_start - 1}`,
      `${f_end - 1}`,
      `${q - 1}`,
      `${parseInt(ans) + 1}`,
      `${parseInt(ans) - 1}`,
      `${2 * parseInt(ans)}`,
    ];

    const uniqueDistractors = [];
    const used = new Set([correctAnswer]);

    for (const d of candidates) {
      if (!used.has(d)) {
        uniqueDistractors.push(d);
        used.add(d);
      }
      if (uniqueDistractors.length === 3) break;
    }

    return uniqueDistractors;
  }

  /**
   * Get coefficients generation parameters
   */
  static getCoefficientsParams(difficulty) {
    if (difficulty === "easy") {
      return {
        pRange: [-3, 3],
        aList: [-1, 1],
      };
    } else if (difficulty === "hard") {
      return {
        pRange: [-6, 6],
        aList: [-2, 2, 3],
      };
    } else {
      return {
        pRange: [-4, 4],
        aList: [-1, 1, 2],
      };
    }
  }
}

module.exports = PropertiesValues;
