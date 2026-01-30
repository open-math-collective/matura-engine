const MathUtils = require("../../../utils/MathUtils");

class VertexAndRootsValues {
  /**
   * Get parameters for vertex problem
   */
  static getVertexParams(difficulty) {
    if (difficulty === "easy") {
      return {
        aList: [-1, 1],
        pRange: [-2, 2],
      };
    } else if (difficulty === "hard") {
      return {
        aList: [-2, 2, 3],
        pRange: [-6, 6],
      };
    } else {
      return {
        aList: [-1, 1, 2],
        pRange: [-4, 4],
      };
    }
  }

  /**
   * Generate coefficients for vertex problem
   */
  static generateVertexCoefficients(difficulty) {
    const params = this.getVertexParams(difficulty);
    const p = MathUtils.randomInt(params.pRange[0], params.pRange[1]);
    const q = MathUtils.randomInt(params.pRange[0], params.pRange[1]);
    const a = MathUtils.randomElement(params.aList);

    const b = -2 * a * p;
    const c = a * p * p + q;

    return { a, b, c, p, q };
  }

  /**
   * Get templates for vertex problem
   */
  static getVertexTemplates() {
    return [
      () =>
        "Wyznacz współrzędne wierzchołka paraboli będącej wykresem funkcji:",
      () => "Znajdź współrzędne wierzchołka paraboli dla funkcji kwadratowej:",
      () => "Dla podanej funkcji kwadratowej określ współrzędne wierzchołka:",
      () => "Podaj współrzędne wierzchołka paraboli opisanej wzorem:",
      () =>
        "Jakie są współrzędne wierzchołka paraboli będącej wykresem funkcji:",
      () => "Wyznacz punkt wierzchołkowy paraboli dla funkcji:",
      () => "Znajdź wierzchołek paraboli opisanej równaniem:",
      () => "Określ współrzędne punktu wierzchołkowego paraboli:",
      () => "Dla funkcji kwadratowej podanej wzorem znajdź wierzchołek:",
      () => "Współrzędne wierzchołka paraboli opisanej funkcją to:",
      () => "Oblicz współrzędne wierzchołka dla podanej funkcji kwadratowej:",
      () => "Jaki jest wierzchołek paraboli będącej wykresem funkcji:",
      () => "Znajdź współrzędne punktu wierzchołkowego W paraboli:",
      () => "Wierzchołek paraboli opisanej podanym wzorem ma współrzędne:",
      () => "Dla funkcji kwadratowej wyznacz współrzędne wierzchołka W:",
      () => "Podaj współrzędne wierzchołka W paraboli będącej wykresem:",
      () => "Z jakich współrzędnych składa się wierzchołek paraboli:",
      () => "Wyznacz współrzędne x i y wierzchołka paraboli:",
      () => "Znajdź punkt W(x,y) będący wierzchołkiem paraboli:",
      () => "Jakie współrzędne ma wierzchołek paraboli danej funkcją:",
      () => "Wyznacz wierzchołek paraboli dla podanej funkcji kwadratowej:",
      () => "Znajdź współrzędne wierzchołka paraboli f(x):",
      () => "Dla podanej paraboli oblicz współrzędne wierzchołka:",
      () => "Podaj współrzędne punktu wierzchołkowego paraboli:",
      () => "Znajdź punkt wierzchołkowy paraboli opisanej wzorem:",
      () => "Wyznacz współrzędne W wierzchołka paraboli:",
      () => "Oblicz współrzędne punktu wierzchołkowego W:",
      () => "Jaki punkt jest wierzchołkiem danej paraboli:",
      () => "Znajdź x i y wierzchołka paraboli f(x):",
      () => "Podaj współrzędne wierzchołka dla funkcji kwadratowej:",
      () => "Wierzchołek paraboli opisanej funkcją to punkt:",
      () => "Dla funkcji podanej wzorem znajdź wierzchołek W:",
      () => "Współrzędne punktu wierzchołkowego paraboli to:",
      () => "Wyznacz punkt W będący wierzchołkiem paraboli:",
      () => "Znajdź wierzchołek W paraboli opisanej równaniem:",
      () => "Oblicz współrzędne wierzchołka paraboli f(x):",
      () => "Podaj punkt wierzchołkowy dla danej funkcji kwadratowej:",
      () => "Dla funkcji kwadratowej znajdź punkt wierzchołkowy W:",
      () => "Wyznacz wierzchołek W danej paraboli:",
      () => "Jakie są współrzędne punktu wierzchołkowego W:",
    ];
  }

  /**
   * Generate distractors for vertex problem
   */
  static generateVertexDistractors(p, q, c) {
    const candidates = [
      `W(${-p}, ${q})`,
      `W(${q}, ${p})`,
      `W(${p}, ${c})`,
      `W(${p}, ${-q})`,
      `W(${-p}, ${-q})`,
      `W(${q}, ${-p})`,
      `W(${p + 1}, ${q})`,
      `W(${p}, ${q + 1})`,
      `W(${2 * p}, ${q})`,
      `W(${p}, ${2 * q})`,
      `W(${p - 1}, ${q})`,
      `W(${p}, ${q - 1})`,
      `W(${-p + 1}, ${q})`,
      `W(${q + 1}, ${p})`,
      `W(${p}, ${c + 1})`,
    ];

    const uniqueDistractors = [];
    const correctAnswer = `W(${p}, ${q})`;
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
   * Get parameters for roots problem
   */
  static getRootsParams(difficulty) {
    if (difficulty === "easy") {
      return {
        rootRange: [-3, 3],
        aList: [1],
      };
    } else if (difficulty === "hard") {
      return {
        rootRange: [-10, 10],
        aList: [-3, -2, 2, 3],
      };
    } else {
      return {
        rootRange: [-5, 5],
        aList: [-1, 1],
      };
    }
  }

  /**
   * Generate coefficients for roots problem
   */
  static generateRootsCoefficients(difficulty) {
    const params = this.getRootsParams(difficulty);
    const x1 = MathUtils.randomInt(params.rootRange[0], params.rootRange[1]);
    let x2 = MathUtils.randomInt(params.rootRange[0], params.rootRange[1]);
    while (x1 === x2)
      x2 = MathUtils.randomInt(params.rootRange[0], params.rootRange[1]);

    const a = MathUtils.randomElement(params.aList);
    const b = -a * (x1 + x2);
    const c = a * x1 * x2;

    const roots = [x1, x2].sort((n1, n2) => n1 - n2);
    const p = (x1 + x2) / 2;
    const q = a * p * p + b * p + c;

    return { a, b, c, x1, x2, roots, p, q };
  }

  /**
   * Get templates for roots problem
   */
  static getRootsTemplates() {
    return [
      () => "Podaj miejsca zerowe funkcji:",
      () => "Wyznacz miejsca zerowe podanej funkcji kwadratowej:",
      () => "Znajdź pierwiastki równania kwadratowego:",
      () => "Dla jakich x funkcja przyjmuje wartość zero:",
      () => "Oblicz miejsca zerowe funkcji kwadratowej:",
      () => "Wskaż argumenty, dla których funkcja jest równa zero:",
      () => "Znajdź wszystkie miejsca zerowe funkcji:",
      () => "Podaj pierwiastki funkcji kwadratowej:",
      () => "Dla jakich wartości x zachodzi f(x) = 0:",
      () => "Wyznacz punkty przecięcia z osią OX:",
      () => "Znajdź zera funkcji podanej wzorem:",
      () => "Oblicz argumenty zerujące funkcję:",
      () => "Rozwiąż równanie f(x) = 0 dla podanej funkcji:",
      () => "Wyznacz argumenty, dla których f(x) przyjmuje wartość 0:",
      () => "Znajdź rozwiązania równania kwadratowego f(x) = 0:",
      () => "Podaj wartości x, dla których wykres przecina oś OX:",
      () => "Dla jakich argumentów funkcja kwadratowa ma wartość zero:",
      () => "Wskaż miejsca zerowe paraboli opisanej funkcją:",
      () => "Oblicz punkty, w których parabola przecina oś poziomą:",
      () => "Znajdź zera funkcji kwadratowej przedstawionej wzorem:",
      () => "Wyznacz pierwiastki trójmianu kwadratowego:",
      () => "Dla jakich x parabola przecina oś OX:",
      () => "Podaj rozwiązania równania kwadratowego:",
      () => "Znajdź wszystkie pierwiastki funkcji kwadratowej:",
      () => "Wyznacz miejsca przecięcia paraboli z osią x:",
      () => "Znajdź argumenty dla których wartość funkcji wynosi 0:",
      () => "Podaj zera funkcji kwadratowej:",
      () => "Oblicz pierwiastki trójmianu:",
      () => "Znajdź rozwiązania równania f(x)=0:",
      () => "Wskaż gdzie parabola przecina oś OX:",
      () => "Dla jakich x wykres przecina oś poziomą:",
      () => "Podaj x dla których funkcja jest równa zero:",
      () => "Znajdź wszystkie pierwiastki równania kwadratowego:",
      () => "Wyznacz zera trójmianu kwadratowego:",
      () => "Oblicz argumenty zerowe funkcji:",
      () => "Rozwiąż graficznie równanie f(x)=0:",
      () => "Znajdź punkty zerowe funkcji kwadratowej:",
      () => "Podaj pierwiastki równania kwadratowego f(x)=0:",
      () => "Wyznacz miejsca zerowe paraboli:",
      () => "Znajdź x takie że f(x)=0:",
    ];
  }

  /**
   * Generate distractors for roots problem
   */
  static generateRootsDistractors(roots, c) {
    const [r1, r2] = roots;
    const candidates = [
      `x_1 = ${-r1}, x_2 = ${-r2}`,
      `x_1 = ${r1}, x_2 = ${-r2}`,
      `x_1 = 0, x_2 = ${c}`,
      `x_1 = ${-r1}, x_2 = ${r2}`,
      `x_1 = ${r1}, x_2 = ${r1}`,
      `x_1 = ${r2}, x_2 = ${r2}`,
      `x_1 = ${r1 + 1}, x_2 = ${r2 + 1}`,
      `x_1 = ${r1 - 1}, x_2 = ${r2 - 1}`,
      `x_1 = ${2 * r1}, x_2 = ${2 * r2}`,
      `x_1 = ${-c}, x_2 = ${c}`,
    ];

    const correctAnswer = `${r1}, ${r2}`;
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
   * Get parameters for canonical problem
   */
  static getCanonicalParams(difficulty) {
    if (difficulty === "easy") {
      return {
        aList: [-1, 1],
        pRange: [-3, 3],
      };
    } else if (difficulty === "hard") {
      return {
        aList: [-2, 2, 3],
        pRange: [-6, 6],
      };
    } else {
      return {
        aList: [-1, 1, 2],
        pRange: [-4, 4],
      };
    }
  }

  /**
   * Generate coefficients for canonical problem
   */
  static generateCanonicalCoefficients(difficulty) {
    const params = this.getCanonicalParams(difficulty);
    let p = MathUtils.randomInt(params.pRange[0], params.pRange[1]);

    if (difficulty === "easy" && p < 0) {
      p = Math.abs(p);
    }

    const q = MathUtils.randomInt(params.pRange[0], params.pRange[1]);
    const a = MathUtils.randomElement(params.aList);

    const b = -2 * a * p;
    const c = a * p * p + q;

    return { a, b, c, p, q };
  }

  /**
   * Get templates for canonical problem
   */
  static getCanonicalTemplates() {
    return [
      () => "Wyznacz postać kanoniczną funkcji określonej wzorem:",
      () => "Zapisz funkcję w postaci kanonicznej:",
      () => "Podaj postać kanoniczną funkcji kwadratowej:",
      () => "Przekształć funkcję do postaci kanonicznej:",
      () => "Znajdź wzór funkcji w postaci kanonicznej:",
      () =>
        "Dana jest funkcja w postaci ogólnej. Zapisz ją w postaci kanonicznej:",
      () => "Wyznacz kanoniczną postać funkcji kwadratowej:",
      () => "Zamień funkcję na postać kanoniczną:",
      () => "Podaj równanie paraboli w postaci kanonicznej:",
      () => "Zapisz wzór funkcji w postaci f(x) = a(x-p)² + q:",
      () => "Przedstaw funkcję w kanonicznej postaci:",
      () => "W jakiej postaci kanonicznej zapiszemy tę funkcję:",
      () => "Zapisz podaną funkcję kwadratową w postaci kanonicznej:",
      () => "Dla funkcji kwadratowej wyznacz postać kanoniczną:",
      () => "Przekształć podaną funkcję do postaci f(x)=a(x-p)²+q:",
      () => "Znajdź postać kanoniczną podanej paraboli:",
      () => "Wypisz wzór funkcji w postaci kanonicznej:",
      () => "Podaj wzór w postaci kanonicznej dla funkcji kwadratowej:",
      () => "Zamień postać ogólną na kanoniczną:",
      () => "Wyznacz wzór kanoniczny funkcji kwadratowej:",
      () => "Zapisz równanie paraboli w postaci kanonicznej:",
      () => "Przedstaw wzór funkcji w postaci a(x-p)²+q:",
      () => "Dla podanej funkcji znajdź postać kanoniczną:",
      () => "Oblicz postać kanoniczną funkcji kwadratowej:",
      () => "Podaj kanoniczną postać równania paraboli:",
      () => "Zamień funkcję f(x) na postać kanoniczną:",
      () => "Zapisz kanoniczny wzór funkcji kwadratowej:",
      () => "W jakiej postaci zapiszesz tę funkcję kwadratową:",
      () => "Znajdź postać kanoniczną trójmianu kwadratowego:",
      () => "Wyznacz postać f(x)=a(x-p)²+q dla podanej funkcji:",
      () => "Przekształć trójmian do postaci kanonicznej:",
      () => "Podaj postać kanoniczną danego trójmianu kwadratowego:",
      () => "Zapisz funkcję kwadratową kanonicznie:",
      () => "Oblicz parametry p i q postaci kanonicznej:",
      () => "Dla paraboli podaj równanie w postaci kanonicznej:",
      () => "Zamień wzór funkcji na postać z wierzchołkiem:",
      () => "Wypisz postać kanoniczną z wyznaczonymi p i q:",
      () => "Podaj kanoniczną formę zapisu tej funkcji:",
      () => "Zapisz wzór z uwzględnieniem wierzchołka paraboli:",
      () => "Przedstaw funkcję w postaci kanonicznej f(x)=a(x-p)²+q:",
    ];
  }

  /**
   * Format canonical form
   */
  static formatCanonical(a, p, q) {
    const pStr =
      p > 0 ? `(x - ${p})^2` : p < 0 ? `(x + ${Math.abs(p)})^2` : `x^2`;
    const aStr = a === 1 ? "" : a === -1 ? "-" : a;

    let qPart = "";
    if (q > 0) {
      qPart = `+ ${q}`;
    } else if (q < 0) {
      qPart = `- ${Math.abs(q)}`;
    }

    const core = p === 0 ? "x^2" : pStr;
    return `${aStr}${core} ${qPart}`.trim();
  }

  /**
   * Generate distractors for canonical problem
   */
  static generateCanonicalDistractors(a, p, q, correctForm) {
    const pStr1 =
      p > 0 ? `(x - ${p})^2` : p < 0 ? `(x + ${Math.abs(p)})^2` : `x^2`;
    const pStr2 =
      p > 0 ? `(x + ${p})^2` : p < 0 ? `(x - ${Math.abs(p)})^2` : `x^2`;
    const pStr3 =
      q > 0 ? `(x - ${q})^2` : q < 0 ? `(x + ${Math.abs(q)})^2` : `x^2`;
    const core = p === 0 ? "x^2" : pStr1;
    const coreWrongSign = p === 0 ? "x^2" : pStr2;

    let qPart = "";
    if (q > 0) qPart = `+ ${q}`;
    else if (q < 0) qPart = `- ${Math.abs(q)}`;

    let pPartQ = "";
    if (p > 0) pPartQ = `+ ${p}`;
    else if (p < 0) pPartQ = `- ${Math.abs(p)}`;

    const aStr = a === 1 ? "" : a === -1 ? "-" : a;

    const candidates = [
      `${aStr}${pStr3}${pPartQ}`,
      `${aStr}${coreWrongSign}${qPart}`,
      `${core}${qPart}`,
      `${a}(x-${q})^2+${p}`,
      `${a}(x+${p})^2+${q}`,
      `(x-${p})^2+${q}`,
      `${aStr}${core} ${q > 0 ? "-" : "+"} ${Math.abs(q)}`,
      `${-a}${core}${qPart}`,
    ];

    const uniqueDistractors = [];
    const used = new Set([correctForm]);

    for (const d of candidates) {
      const formatted = `f(x) = ${d}`;
      if (!used.has(formatted)) {
        uniqueDistractors.push(formatted);
        used.add(formatted);
      }
      if (uniqueDistractors.length === 3) break;
    }

    return uniqueDistractors;
  }

  /**
   * Get parameters for symmetry axis problem
   */
  static getSymmetryAxisParams(difficulty) {
    if (difficulty === "easy") {
      return {
        aList: [-1, 1],
        pRange: [-3, 3],
      };
    } else if (difficulty === "hard") {
      return {
        aList: [-2, 2, 3],
        pRange: [-6, 6],
      };
    } else {
      return {
        aList: [-1, 1, 2],
        pRange: [-4, 4],
      };
    }
  }

  /**
   * Generate coefficients for symmetry axis problem
   */
  static generateSymmetryAxisCoefficients(difficulty) {
    const params = this.getSymmetryAxisParams(difficulty);
    const p = MathUtils.randomInt(params.pRange[0], params.pRange[1]);
    const q = MathUtils.randomInt(params.pRange[0], params.pRange[1]);
    const a = MathUtils.randomElement(params.aList);

    const b = -2 * a * p;
    const c = a * p * p + q;

    return { a, b, c, p, q };
  }

  /**
   * Get templates for symmetry axis problem
   */
  static getSymmetryAxisTemplates(a, b, c) {
    const formula = `f(x) = ${MathUtils.formatPolynomial(a, b, c)}`;
    return [
      () => `Osią symetrii wykresu funkcji $$${formula}$$ jest prosta:`,
      () => `Wskaż równanie osi symetrii paraboli $$${formula}$$`,
      () => `Prosta będąca osią symetrii paraboli $$${formula}$$ ma równanie:`,
      () => `Dla funkcji $$${formula}$$ oś symetrii to:`,
      () =>
        `Znajdź równanie osi symetrii paraboli opisanej wzorem $$${formula}$$`,
      () =>
        `Oś symetrii wykresu funkcji $$${formula}$$ jest opisana równaniem:`,
      () => `Jakie jest równanie osi symetrii paraboli $$${formula}$$`,
      () =>
        `Podaj równanie prostej będącej osią symetrii wykresu $$${formula}$$`,
      () => `Wyznacz oś symetrii paraboli $$${formula}$$`,
      () => `Równanie osi symetrii dla funkcji $$${formula}$$ to:`,
      () => `Znajdź prostą symetrii wykresu paraboli $$${formula}$$`,
      () => `Oś symetrii dla podanej paraboli $$${formula}$$ to prosta:`,
      () => `Wykres funkcji $$${formula}$$ ma oś symetrii opisaną jako:`,
      () => `Parabola $$${formula}$$ jest symetryczna względem prostej:`,
      () => `Zapisz równanie osi symetrii dla $$${formula}$$`,
      () => `Znajdź prostą pionową będącą osią symetrii $$${formula}$$`,
      () => `Dla paraboli $$${formula}$$ wyznacz oś symetrii:`,
      () => `Podaj równanie symetrii wykresu funkcji $$${formula}$$`,
      () => `Oś symetrii paraboli opisanej $$${formula}$$ to:`,
      () => `Wyznacz równanie prostej symetrii dla $$${formula}$$`,
      () => `Jaka prosta jest osią symetrii paraboli $$${formula}$$`,
      () => `Znajdź pionową oś symetrii funkcji $$${formula}$$`,
      () => `Równanie prostej symetrii dla paraboli $$${formula}$$`,
      () => `Dla $$${formula}$$ podaj równanie osi symetrii:`,
      () => `Symetria wykresu $$${formula}$$ względem prostej:`,
      () => `Zidentyfikuj oś symetrii paraboli $$${formula}$$`,
      () => `Wskaż prostą symetrii dla funkcji $$${formula}$$`,
      () => `Oś symetrii wierzchołka paraboli $$${formula}$$ to:`,
      () => `Znajdź równanie pionowej osi symetrii $$${formula}$$`,
      () => `Dla funkcji kwadratowej $$${formula}$$ oś symetrii to:`,
      () => `Prosta symetrii paraboli danej wzorem $$${formula}$$`,
      () => `Podaj oś symetrii dla wykresu $$${formula}$$`,
      () => `Wyznacz równanie osi symetrii funkcji $$${formula}$$`,
      () => `Znajdź prostą pionową symetrii paraboli $$${formula}$$`,
      () => `Równanie symetrii dla podanej paraboli $$${formula}$$`,
      () => `Jak brzmi równanie osi symetrii $$${formula}$$`,
      () => `Oś symetrii wykresu paraboli $$${formula}$$ to prosta:`,
      () => `Wskaż równanie prostej symetrii dla $$${formula}$$`,
      () => `Zapisz równanie pionowej osi symetrii $$${formula}$$`,
    ];
  }

  /**
   * Generate distractors for symmetry axis problem
   */
  static generateSymmetryAxisDistractors(p, b) {
    const candidates = [
      `x = ${-p}`,
      `y = ${p}`,
      `x = ${b}`,
      `y = ${-p}`,
      `x = ${2 * p}`,
      `x = ${p + 1}`,
      `x = ${p - 1}`,
      `y = ${b}`,
      `x = ${-b}`,
      `x = ${Math.abs(p)}`,
    ];

    const correctAnswer = `x = ${p}`;
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
}

module.exports = VertexAndRootsValues;
