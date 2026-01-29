class TransformationsQuadraticValues {
  /**
   * Get shift parabola problem parameters
   */
  static getShiftParabolaParams(difficulty) {
    if (difficulty === "easy") {
      return {
        aList: [1],
        rangeV: [-3, 3],
      };
    } else if (difficulty === "hard") {
      return {
        aList: [2, -2],
        rangeV: [-6, 6],
      };
    } else {
      return {
        aList: [-1, 1],
        rangeV: [-5, 5],
      };
    }
  }

  /**
   * Get shift parabola problem templates
   */
  static getShiftParabolaTemplates(formulaBase, p, q) {
    return [
      () =>
        `Wykres funkcji $$f(x)=${formulaBase}$$ przesunięto o wektor $$v=[${p}, ${q}]$$. Jaki jest nowy wzór funkcji?`,
      () =>
        `Funkcję $$f(x)=${formulaBase}$$ przesunięto o wektor $$v=[${p}, ${q}]$$. Podaj wzór funkcji po przesunięciu:`,
      () =>
        `Wyznacz wzór funkcji powstałej z przesunięcia $$f(x)=${formulaBase}$$ o wektor $$v=[${p}, ${q}]$$:`,
      () =>
        `Przesunięto wykres funkcji $$f(x)=${formulaBase}$$ o wektor $$v=[${p}, ${q}]$$. Znajdź wzór nowej funkcji:`,
      () =>
        `Funkcja $$f(x)=${formulaBase}$$ zostaje przesunięta o wektor $$v=[${p}, ${q}]$$. Jaki będzie jej wzór?`,
      () =>
        `Wykres $$f(x)=${formulaBase}$$ przesunięto o $$[${p}, ${q}]$$. Podaj równanie nowej funkcji:`,
      () =>
        `Z przesunięcia funkcji $$f(x)=${formulaBase}$$ o wektor $$v=[${p}, ${q}]$$ otrzymano funkcję g(x). Wyznacz g(x):`,
      () =>
        `Przesunięcie wykresu $$f(x)=${formulaBase}$$ o wektor $$v=[${p}, ${q}]$$ daje funkcję. Podaj jej wzór:`,
      () =>
        `O wektor $$v=[${p}, ${q}]$$ przesunięto wykres funkcji $$f(x)=${formulaBase}$$. Znajdź wzór otrzymanej funkcji:`,
      () =>
        `Funkcję $$f(x)=${formulaBase}$$ transformujemy przez przesunięcie o $$v=[${p}, ${q}]$$. Podaj wzór wynikowy:`,
      () =>
        `Wyznacz równanie funkcji powstałej z przesunięcia $$f(x)=${formulaBase}$$ o wektor $$v=[${p}, ${q}]$$:`,
      () =>
        `Przesunięto parabolę $$f(x)=${formulaBase}$$ o wektor $$v=[${p}, ${q}]$$. Jaki jest wzór nowej paraboli?`,
      () =>
        `Wykres funkcji kwadratowej $$f(x)=${formulaBase}$$ przesunięto o $$[${p}, ${q}]$$. Podaj jej nowy wzór:`,
      () =>
        `Zapisz wzór funkcji otrzymanej z przesunięcia $$f(x)=${formulaBase}$$ o wektor $$v=[${p}, ${q}]$$:`,
      () =>
        `Funkcja $$f(x)=${formulaBase}$$ poddana została przesunięciu o wektor $$v=[${p}, ${q}]$$. Znajdź wzór:`,
      () =>
        `Parabolę $$f(x)=${formulaBase}$$ przesunięto o wektor $$v=[${p}, ${q}]$$. Wyznacz wzór funkcji wynikowej:`,
      () =>
        `Przesunięcie o $$v=[${p}, ${q}]$$ wykresu $$f(x)=${formulaBase}$$ daje nową funkcję. Podaj jej wzór:`,
      () =>
        `Wyznacz wzór paraboli powstałej z przesunięcia $$f(x)=${formulaBase}$$ o wektor $$v=[${p}, ${q}]$$:`,
      () =>
        `Funkcję $$f(x)=${formulaBase}$$ przesunięto o wektor $$v=[${p}, ${q}]$$. Znajdź wzór funkcji g(x):`,
      () =>
        `O wektor $$[${p}, ${q}]$$ przesunięto wykres $$f(x)=${formulaBase}$$. Podaj równanie nowej funkcji:`,
      () =>
        `Przekształcenie przesunięcia $$f(x)=${formulaBase}$$ o $$v=[${p}, ${q}]$$ - podaj wzór wynikowy:`,
      () =>
        `Wykres funkcji $$f(x)=${formulaBase}$$ przesunięto o wektor translacji $$v=[${p}, ${q}]$$. Jaki jest wzór?`,
      () =>
        `Znajdź wzór funkcji po przesunięciu $$f(x)=${formulaBase}$$ o wektor $$v=[${p}, ${q}]$$:`,
      () =>
        `Przesunięcie paraboli $$f(x)=${formulaBase}$$ o $$v=[${p}, ${q}]$$ - wyznacz wzór nowej funkcji:`,
      () =>
        `Funkcję $$f(x)=${formulaBase}$$ przesunięto wzdłuż osi o wektor $$v=[${p}, ${q}]$$. Podaj wzór g(x):`,
      () =>
        `Wyznacz równanie paraboli powstałej z przesunięcia wykresu $$f(x)=${formulaBase}$$ o $$v=[${p}, ${q}]$$:`,
      () =>
        `Przesunięto wykres funkcji kwadratowej $$f(x)=${formulaBase}$$ o wektor $$v=[${p}, ${q}]$$. Znajdź wzór:`,
      () =>
        `Zastosowano przesunięcie o wektor $$v=[${p}, ${q}]$$ do funkcji $$f(x)=${formulaBase}$$. Podaj wzór wynikowy:`,
      () =>
        `Wykres $$f(x)=${formulaBase}$$ poddano translacji o wektor $$v=[${p}, ${q}]$$. Wyznacz wzór nowej funkcji:`,
      () =>
        `Funkcja $$f(x)=${formulaBase}$$ po przesunięciu o $$v=[${p}, ${q}]$$ ma wzór:`,
    ];
  }

  /**
   * Generate shift parabola distractors
   */
  static generateShiftParabolaDistractors(
    A,
    B,
    C,
    p,
    formulaNew,
    formatPolynomial,
  ) {
    const dist1 = formatPolynomial(A, -B, C);
    const dist2 = formatPolynomial(A, B, -C);
    const wrongC = p * p + C - A * p * p;
    const dist3 = formatPolynomial(A, B, wrongC);
    const dist4 = formatPolynomial(A, 0, C);
    const dist5 = formatPolynomial(A, B, A * p * p);
    const dist6 = formatPolynomial(A, B, -A * p * p + (C - A * p * p));
    const dist7 = formatPolynomial(-A, B, C);
    const dist8 = formatPolynomial(A, B + 1, C);
    const dist9 = formatPolynomial(A, B, C + 1);

    const candidates = [
      `g(x) = ${dist1}`,
      `g(x) = ${dist2}`,
      `g(x) = ${dist3}`,
      `g(x) = ${dist4}`,
      `g(x) = ${dist5}`,
      `g(x) = ${dist6}`,
      `g(x) = ${dist7}`,
      `g(x) = ${dist8}`,
      `g(x) = ${dist9}`,
    ];

    const uniqueDistractors = [];
    const used = new Set([`g(x) = ${formulaNew}`]);

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
   * Get inequality graph problem parameters
   */
  static getInequalityGraphParams(difficulty) {
    if (difficulty === "easy") {
      return {
        aList: [1],
        rootRange: [-3, 3],
      };
    } else if (difficulty === "hard") {
      return {
        aList: [-1],
        rootRange: [-6, 6],
      };
    } else {
      return {
        aList: [-1, 1],
        rootRange: [-5, 5],
      };
    }
  }

  /**
   * Get inequality graph problem templates
   */
  static getInequalityGraphTemplates(a, sign, minX, maxX, res) {
    return [
      () =>
        `Na rysunku przedstawiono fragment wykresu funkcji kwadratowej. Zbiór rozwiązań nierówności $$f(x) ${sign} 0$$ to:`,
      () =>
        `Wskaż zbiór rozwiązań nierówności $$f(x) ${sign} 0$$ na podstawie wykresu:`,
      () =>
        `Na podstawie wykresu funkcji kwadratowej podaj rozwiązanie nierówności $$f(x) ${sign} 0$$:`,
      () => `Zaznacz na osi zbiór rozwiązań nierówności $$f(x) ${sign} 0$$:`,
      () =>
        `Rozwiąż graficznie nierówność $$f(x) ${sign} 0$$ odczytując z wykresu:`,
      () =>
        `Odczytaj z wykresu i podaj zbiór rozwiązań nierówności $$f(x) ${sign} 0$$:`,
      () =>
        `Wykres przedstawia funkcję kwadratową. Dla jakich x zachodzi $$f(x) ${sign} 0$$:`,
      () =>
        `Na rysunku wykres funkcji kwadratowej. Wskaż rozwiązanie $$f(x) ${sign} 0$$:`,
      () =>
        `Podaj przedział rozwiązań nierówności $$f(x) ${sign} 0$$ na podstawie rysunku:`,
      () =>
        `Z wykresu funkcji odczytaj zbiór x spełniających $$f(x) ${sign} 0$$:`,
      () =>
        `Na podstawie przedstawionego wykresu rozwiąż nierówność $$f(x) ${sign} 0$$:`,
      () =>
        `Wskaż wszystkie x dla których zachodzi nierówność $$f(x) ${sign} 0$$ (odczytaj z wykresu):`,
      () =>
        `Odczytaj z rysunku zbiór wartości x spełniających $$f(x) ${sign} 0$$:`,
      () =>
        `Przedstawiono wykres funkcji kwadratowej. Znajdź rozwiązanie $$f(x) ${sign} 0$$:`,
      () =>
        `Na rysunku wykres paraboli. Podaj zbiór x dla których $$f(x) ${sign} 0$$:`,
      () =>
        `Wykres funkcji kwadratowej pokazuje gdzie $$f(x) ${sign} 0$$. Wskaż te x:`,
      () =>
        `Zaznaczono wykres funkcji kwadratowej. Rozwiąż nierówność $$f(x) ${sign} 0$$:`,
      () =>
        `Na podstawie grafu funkcji podaj zbiór rozwiązań $$f(x) ${sign} 0$$:`,
      () =>
        `Odczytaj z wykresu paraboli rozwiązanie nierówności $$f(x) ${sign} 0$$:`,
      () =>
        `Przedstawiony wykres pokazuje funkcję kwadratową. Dla jakich x jest $$f(x) ${sign} 0$$:`,
      () => `Wskaż na podstawie rysunku zbiór rozwiązań $$f(x) ${sign} 0$$:`,
      () =>
        `Na rysunku przedstawiono parabolę. Znajdź x spełniające $$f(x) ${sign} 0$$:`,
      () =>
        `Z grafu funkcji kwadratowej odczytaj rozwiązanie nierówności $$f(x) ${sign} 0$$:`,
      () =>
        `Podaj zbiór x dla których $$f(x) ${sign} 0$$ na podstawie wykresu:`,
      () => `Wykres przedstawia parabolę. Wskaż gdzie $$f(x) ${sign} 0$$:`,
      () => `Na podstawie ilustracji rozwiąż nierówność $$f(x) ${sign} 0$$:`,
      () => `Odczytaj z rysunku przedział rozwiązań $$f(x) ${sign} 0$$:`,
      () =>
        `Przedstawiono graf funkcji kwadratowej. Znajdź gdzie $$f(x) ${sign} 0$$:`,
      () =>
        `Na wykresie funkcja kwadratowa. Podaj zbiór x spełniających $$f(x) ${sign} 0$$:`,
    ];
  }

  /**
   * Generate inequality graph distractors
   */
  static generateInequalityGraphDistractors(isInside, minX, maxX, res) {
    const oppositeRes = isInside
      ? `(-\\infty, ${minX}) \\cup (${maxX}, \\infty)`
      : `(${minX}, ${maxX})`;

    return [
      `x \\in ${oppositeRes}`,
      `x \\in \\langle ${minX - 1}, ${maxX + 1} \\rangle`,
      `x \\in \\mathbb{R}`,
      `x \\in \\emptyset`,
      `x \\in (${minX - 1}, ${maxX + 1})`,
    ];
  }
}

module.exports = TransformationsQuadraticValues;
