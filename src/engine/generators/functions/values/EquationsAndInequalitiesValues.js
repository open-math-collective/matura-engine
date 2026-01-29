class EquationsAndInequalitiesValues {
  /**
   * Get inequality problem parameters
   */
  static getInequalityParams(difficulty) {
    if (difficulty === "easy") {
      return {
        rootRange: [-3, 3],
        aList: [-1, 1],
      };
    } else if (difficulty === "hard") {
      return {
        rootRange: [-8, 8],
        aList: [-2, -1, 1, 2, 3],
      };
    } else {
      return {
        rootRange: [-5, 5],
        aList: [-1, 1, 2],
      };
    }
  }

  /**
   * Get inequality problem templates
   */
  static getInequalityTemplates() {
    return [
      () => "Rozwiąż nierówność kwadratową:",
      () => "Wyznacz zbiór rozwiązań nierówności:",
      () => "Znajdź wszystkie wartości x spełniające nierówność:",
      () => "Podaj rozwiązanie nierówności kwadratowej:",
      () => "Dla jakich x prawdziwa jest nierówność:",
      () => "Oblicz zbiór wartości x spełniających:",
      () => "Wyznacz przedział rozwiązań nierówności:",
      () => "Rozwiąż podaną nierówność kwadratową:",
      () => "Znajdź zbiór x dla których zachodzi:",
      () => "Podaj rozwiązanie nierówności:",
      () => "Dla jakich liczb rzeczywistych x spełniona jest nierówność:",
      () => "Wyznacz dziedzinę nierówności kwadratowej:",
      () => "Zaznacz na osi liczbowej zbiór rozwiązań nierówności:",
      () => "Wskaż przedział liczbowy spełniający nierówność:",
      () => "Podaj wszystkie x dla których zachodzi podana nierówność:",
      () => "Rozstrzygnij dla jakich x spełniona jest nierówność:",
      () => "Wyznacz zbiór rozwiązań podanej nierówności kwadratowej:",
      () => "Znajdź rozwiązanie nierówności kwadratowej w zbiorze R:",
      () => "Oblicz dla jakich argumentów funkcja jest dodatnia/ujemna:",
      () => "Wskaż przedziały spełniające podaną nierówność kwadratową:",
      () => "Podaj zbiór wartości x dla których nierówność jest prawdziwa:",
      () => "Rozwiąż graficznie podaną nierówność kwadratową:",
      () => "Wyznacz algebraicznie rozwiązanie nierówności:",
      () => "Znajdź zbiór x spełniających warunek podany nierównością:",
      () => "Określ dziedzinę rozwiązania nierówności kwadratowej:",
      () => "Wskaż wszystkie wartości rzeczywiste x spełniające:",
      () => "Podaj rozwiązanie nierówności w postaci przedziałów:",
      () => "Zbadaj dla jakich x podana nierówność zachodzi:",
      () => "Wyznacz argumenty spełniające nierówność kwadratową:",
      () => "Oblicz zbiór rozwiązań nierówności w dziedzinie R:",
      () => "Dla jakich argumentów x podana nierówność jest spełniona:",
      () => "Znajdź wszystkie rozwiązania nierówności kwadratowej:",
      () => "Podaj przedziały x spełniające warunek nierówności:",
      () => "Wyznacz wartości x dla których podana nierówność zachodzi:",
      () => "Wskaż zbiór wszystkich x spełniających nierówność:",
      () => "Zbadaj znak trójmianu kwadratowego i podaj rozwiązanie:",
      () => "Rozwiąż nierówność wiedząc że jej pierwiastki to podane wartości:",
      () => "Wyznacz zbiór x dla których wartość funkcji jest dodatnia:",
      () => "Podaj dziedzinę dla której spełniona jest nierówność:",
      () => "Oblicz dla jakich x trójmian kwadratowy spełnia warunek:",
      () => "Znajdź argumenty x przy których zachodzi nierówność:",
      () => "Wskaż przedziały spełniające warunek nierównościowy:",
      () => "Podaj wszystkie wartości x z dziedziny R spełniające:",
      () => "Rozstrzygnij dla jakich liczb x podana nierówność jest prawdziwa:",
      () => "Wyznacz zbiór liczbowy rozwiązań nierówności kwadratowej:",
    ];
  }

  /**
   * Generate inequality problem distractors
   */
  static generateInequalityDistractors(res, minX, maxX, isCl) {
    const brL = isCl ? "\\langle" : "(";
    const brR = isCl ? "\\rangle" : ")";
    const oppositeRes = res.includes("cup")
      ? `(${minX},${maxX})`
      : `R\\setminus(${minX},${maxX})`;
    return [`x \\in ${oppositeRes}`, `x \\in \\R`, `x \\in \\emptyset`];
  }

  /**
   * Get solutions count problem parameters
   */
  static getSolutionsCountParams(difficulty) {
    if (difficulty === "easy") {
      return {
        aList: [-1, 1],
        range: [-3, 3],
      };
    } else if (difficulty === "hard") {
      return {
        aList: [-2, 2, 3, -3],
        range: [-6, 6],
      };
    } else {
      return {
        aList: [-1, 1, 2, -2],
        range: [-4, 4],
      };
    }
  }

  /**
   * Get solutions count problem templates
   */
  static getSolutionsCountTemplates(formula) {
    return [
      () => `Równanie $$${formula} = k$$ ma dwa rozwiązania dla:`,
      () =>
        `Dla jakich wartości k równanie $$${formula} = k$$ ma dwa pierwiastki:`,
      () =>
        `Równanie $$${formula} = k$$ posiada dokładnie dwa rozwiązania gdy:`,
      () =>
        `Podaj zbiór k, dla których $$${formula} = k$$ ma dwa miejsca zerowe:`,
      () =>
        `Dla jakiego k równanie kwadratowe $$${formula} = k$$ ma dwa pierwiastki rzeczywiste:`,
      () =>
        `Wyznacz k tak, aby równanie $$${formula} = k$$ miało dwa rozwiązania:`,
      () =>
        `Znajdź warunek na k, przy którym $$${formula} = k$$ ma dwa pierwiastki:`,
      () =>
        `Dla jakich k równanie $$${formula} = k$$ ma dokładnie dwa rozwiązania:`,
      () =>
        `Podaj wartości parametru k, dla których $$${formula} = k$$ ma dwa miejsca zerowe:`,
      () =>
        `Oblicz k, przy którym równanie $$${formula} = k$$ posiada dwa pierwiastki:`,
      () =>
        `Dla jakich wartości parametru k równanie $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Podaj zbiór wartości k, dla których równanie $$${formula} = k$$ ma dwa pierwiastki:`,
      () =>
        `Wskaż warunek na k, przy którym równanie $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Znajdź zbiór k spełniający warunek, że $$${formula} = k$$ ma dwa pierwiastki:`,
      () =>
        `Dla jakiego zakresu k równanie $$${formula} = k$$ posiada dokładnie dwa rozwiązania:`,
      () =>
        `Określ wartości k, dla których równanie $$${formula} = k$$ ma dwa miejsca zerowe:`,
      () =>
        `Wyznacz zbiór wszystkich k, dla których $$${formula} = k$$ ma dwa pierwiastki:`,
      () =>
        `Podaj warunek na parametr k, przy którym $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Dla jakich liczb k równanie kwadratowe $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Znajdź wszystkie wartości k, dla których $$${formula} = k$$ ma dwa pierwiastki:`,
      () =>
        `Wskaż zbiór k, przy którym równanie $$${formula} = k$$ ma dokładnie dwa rozwiązania:`,
      () =>
        `Określ dla jakich k równanie $$${formula} = k$$ posiada dwa miejsca zerowe:`,
      () =>
        `Podaj warunki na k, przy których $$${formula} = k$$ ma dwa rozwiązania rzeczywiste:`,
      () =>
        `Dla jakiego parametru k równanie $$${formula} = k$$ ma dwa różne pierwiastki:`,
      () =>
        `Wyznacz dziedzinę k, dla której $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Znajdź przedział wartości k, dla których $$${formula} = k$$ ma dwa pierwiastki:`,
      () =>
        `Dla jakich k równanie $$${formula} = k$$ ma dwa rozwiązania rzeczywiste i różne:`,
      () =>
        `Podaj zbiór wartości k spełniających warunek, że $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Wskaż wszystkie k, dla których równanie $$${formula} = k$$ ma dwa pierwiastki rzeczywiste:`,
      () =>
        `Określ wartości parametru k, przy których $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Dla jakiego zbioru k równanie kwadratowe $$${formula} = k$$ ma dwa miejsca zerowe:`,
      () =>
        `Znajdź warunek na parametr k, dla którego $$${formula} = k$$ ma dwa pierwiastki:`,
      () =>
        `Podaj zakres wartości k, w którym $$${formula} = k$$ ma dokładnie dwa rozwiązania:`,
      () =>
        `Wyznacz zbiór k, dla których równanie $$${formula} = k$$ posiada dwa pierwiastki:`,
      () =>
        `Dla jakich liczb rzeczywistych k równanie $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Określ zbiór k spełniający warunek dwa rozwiązania dla $$${formula} = k$$:`,
      () =>
        `Wskaż warunki na k, przy których $$${formula} = k$$ ma dwa różne pierwiastki:`,
      () =>
        `Podaj wszystkie wartości k, dla których równanie $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Znajdź dziedzinę parametru k, dla której $$${formula} = k$$ ma dwa pierwiastki:`,
      () =>
        `Dla jakiego przedziału k równanie $$${formula} = k$$ posiada dwa miejsca zerowe:`,
      () =>
        `Wyznacz wartości k, przy których równanie $$${formula} = k$$ ma dwa rozwiązania rzeczywiste:`,
      () =>
        `Podaj zbiór k, dla którego równanie $$${formula} = k$$ ma dokładnie dwa rozwiązania:`,
      () =>
        `Określ warunek na k, przy którym równanie $$${formula} = k$$ ma dwa pierwiastki:`,
      () =>
        `Znajdź wszystkie k, dla których równanie kwadratowe $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Dla jakich wartości k podane równanie $$${formula} = k$$ ma dwa pierwiastki rzeczywiste:`,
      () =>
        `Wskaż zbiór wartości k, przy których $$${formula} = k$$ ma dwa rozwiązania różne:`,
      () =>
        `Podaj warunek na k, dla którego $$${formula} = k$$ posiada dwa miejsca zerowe:`,
      () =>
        `Wyznacz przedział k, w którym równanie $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Dla jakiego zbioru wartości k równanie $$${formula} = k$$ ma dwa pierwiastki:`,
      () =>
        `Określ dla jakich k równanie $$${formula} = k$$ ma dokładnie dwa rozwiązania rzeczywiste:`,
      () =>
        `Znajdź zbiór wszystkich wartości k, dla których $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Podaj dziedzinę k, przy której równanie $$${formula} = k$$ ma dwa pierwiastki:`,
      () =>
        `Wskaż wartości parametru k, dla których $$${formula} = k$$ ma dwa rozwiązania różne:`,
      () =>
        `Dla jakich k równanie $$${formula} = k$$ posiada dwa różne pierwiastki rzeczywiste:`,
      () =>
        `Wyznacz warunek na k, przy którym równanie $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Podaj przedział wartości k, dla których $$${formula} = k$$ ma dwa pierwiastki:`,
      () =>
        `Znajdź wszystkie wartości parametru k, dla których $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Określ zbiór k, przy którym równanie $$${formula} = k$$ ma dwa miejsca zerowe:`,
      () =>
        `Dla jakiego warunku na k równanie $$${formula} = k$$ ma dwa rozwiązania rzeczywiste:`,
      () =>
        `Wskaż zakres k, w którym równanie $$${formula} = k$$ ma dokładnie dwa rozwiązania:`,
      () =>
        `Podaj zbiór wartości k, dla których równanie $$${formula} = k$$ ma dwa pierwiastki różne:`,
      () =>
        `Wyznacz wszystkie k, przy których równanie $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Dla jakich wartości k równanie kwadratowe $$${formula} = k$$ posiada dwa rozwiązania:`,
      () =>
        `Znajdź warunek na parametr k, przy którym $$${formula} = k$$ ma dwa pierwiastki rzeczywiste:`,
      () =>
        `Określ dziedzinę wartości k, dla której $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Podaj zbiór k spełniający, że równanie $$${formula} = k$$ ma dwa pierwiastki:`,
      () =>
        `Wskaż wszystkie wartości k, przy których $$${formula} = k$$ ma dwa rozwiązania różne:`,
      () =>
        `Dla jakiego przedziału wartości k równanie $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Wyznacz warunki na k, przy których równanie $$${formula} = k$$ ma dwa pierwiastki:`,
      () =>
        `Znajdź zbiór wartości k, dla których równanie $$${formula} = k$$ posiada dwa rozwiązania:`,
      () =>
        `Podaj wszystkie k, dla których równanie kwadratowe $$${formula} = k$$ ma dwa miejsca zerowe:`,
      () =>
        `Określ wartości k, przy których równanie $$${formula} = k$$ ma dwa rozwiązania rzeczywiste:`,
      () =>
        `Dla jakich liczb k podane równanie $$${formula} = k$$ ma dokładnie dwa rozwiązania:`,
      () =>
        `Wskaż zbiór k, dla którego $$${formula} = k$$ ma dwa różne pierwiastki:`,
      () =>
        `Podaj warunek na k, przy którym równanie $$${formula} = k$$ ma dwa rozwiązania różne:`,
      () =>
        `Znajdź dziedzinę k, dla której równanie $$${formula} = k$$ ma dwa pierwiastki:`,
      () =>
        `Wyznacz przedział k, przy którym $$${formula} = k$$ ma dwa rozwiązania rzeczywiste:`,
      () =>
        `Dla jakiego zbioru k równanie $$${formula} = k$$ posiada dwa rozwiązania różne:`,
      () =>
        `Określ warunki na parametr k, przy których $$${formula} = k$$ ma dwa pierwiastki:`,
      () =>
        `Wskaż wszystkie wartości k, dla których $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Podaj zakres k, w którym równanie $$${formula} = k$$ ma dwa pierwiastki rzeczywiste:`,
      () =>
        `Znajdź zbiór wartości parametru k, dla których $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Dla jakich k równanie $$${formula} = k$$ ma dwa różne rozwiązania rzeczywiste:`,
      () =>
        `Wyznacz warunek na k, dla którego równanie $$${formula} = k$$ ma dwa miejsca zerowe:`,
      () =>
        `Podaj zbiór k, przy którym równanie $$${formula} = k$$ ma dwa pierwiastki różne:`,
      () =>
        `Określ dziedzinę k, dla której $$${formula} = k$$ ma dokładnie dwa rozwiązania:`,
      () =>
        `Znajdź wszystkie k, dla których równanie $$${formula} = k$$ ma dwa rozwiązania rzeczywiste:`,
      () =>
        `Wskaż przedział wartości k, przy których $$${formula} = k$$ ma dwa pierwiastki:`,
      () =>
        `Podaj warunki na k, dla których równanie $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Dla jakiego zakresu wartości k równanie $$${formula} = k$$ ma dwa rozwiązania:`,
      () =>
        `Wyznacz zbiór wszystkich k, przy których $$${formula} = k$$ ma dwa pierwiastki:`,
      () =>
        `Znajdź wartości k, dla których równanie $$${formula} = k$$ ma dwa rozwiązania różne:`,
      () =>
        `Podaj zbiór k spełniający warunek dwa rozwiązania dla $$${formula} = k$$:`,
      () =>
        `Określ warunek na k, przy którym równanie $$${formula} = k$$ posiada dwa pierwiastki:`,
      () =>
        `Dla jakich wartości k równanie kwadratowe $$${formula} = k$$ ma dwa rozwiązania różne:`,
      () =>
        `Wskaż dziedzinę k, przy której $$${formula} = k$$ ma dwa rozwiązania rzeczywiste:`,
    ];
  }

  /**
   * Generate solutions count distractors
   */
  static generateSolutionsCountDistractors(q, condition, p) {
    return [`k = ${q}`, `k \\in \\R`, `k > ${p}`];
  }

  /**
   * Get Vieta problem parameters
   */
  static getVietaParams(difficulty) {
    if (difficulty === "easy") {
      return {
        aList: [-1, 1],
        rootRange: [-5, 5],
      };
    } else if (difficulty === "hard") {
      return {
        aList: [-3, -2, 2, 3, 4],
        rootRange: [-8, 8],
      };
    } else {
      return {
        aList: [-2, 2],
        rootRange: [-6, 6],
      };
    }
  }

  /**
   * Get Vieta problem templates
   */
  static getVietaTemplates(formula) {
    return [
      () =>
        `Suma i iloczyn pierwiastków równania $$${formula} = 0$$ wynoszą odpowiednio:`,
      () =>
        `Dla równania $$${formula} = 0$$ oblicz sumę i iloczyn pierwiastków:`,
      () =>
        `Pierwiastki równania $$${formula} = 0$$ mają sumę i iloczyn równe:`,
      () => `Wyznacz sumę oraz iloczyn rozwiązań równania $$${formula} = 0$$:`,
      () =>
        `Oblicz sumę i iloczyn miejsc zerowych funkcji $$f(x) = ${formula}$$:`,
      () =>
        `Dla funkcji $$f(x) = ${formula}$$ podaj sumę i iloczyn pierwiastków:`,
      () =>
        `Znajdź wartości sumy i iloczynu pierwiastków równania $$${formula} = 0$$:`,
      () =>
        `Korzystając ze wzorów Viète'a, podaj sumę i iloczyn pierwiastków $$${formula} = 0$$:`,
      () =>
        `Dla równania kwadratowego $$${formula} = 0$$ oblicz $x_1 + x_2$ oraz $x_1 \\cdot x_2$:`,
      () => `Podaj sumę i iloczyn rozwiązań równania $$${formula} = 0$$:`,
      () =>
        `Wyznacz $x_1 + x_2$ i $x_1 \\cdot x_2$ dla równania $$${formula} = 0$$:`,
      () =>
        `Oblicz sumę i iloczyn pierwiastków równania kwadratowego $$${formula} = 0$$:`,
      () =>
        `Dla $$${formula} = 0$$ podaj wartości sumy i iloczynu pierwiastków:`,
      () =>
        `Znajdź sumę oraz iloczyn pierwiastków równania $$${formula} = 0$$:`,
      () =>
        `Stosując wzory Viète'a oblicz sumę i iloczyn dla $$${formula} = 0$$:`,
      () =>
        `Podaj $x_1 + x_2$ oraz $x_1 \\cdot x_2$ dla równania $$${formula} = 0$$:`,
      () =>
        `Wykorzystując zależności Viète'a podaj sumę i iloczyn pierwiastków $$${formula} = 0$$:`,
      () =>
        `Oblicz sumę i iloczyn rozwiązań równania kwadratowego $$${formula} = 0$$:`,
      () =>
        `Dla trójmianu $$${formula}$$ wyznacz sumę i iloczyn miejsc zerowych:`,
      () =>
        `Podaj sumę i iloczyn pierwiastków dla równania $$${formula} = 0$$:`,
      () =>
        `Znajdź $x_1 + x_2$ oraz $x_1 \\cdot x_2$ dla funkcji $$f(x) = ${formula}$$:`,
      () =>
        `Oblicz wartości sumy i iloczynu pierwiastków dla $$${formula} = 0$$:`,
      () =>
        `Wyznacz sumę i iloczyn pierwiastków równania kwadratowego $$${formula} = 0$$:`,
      () =>
        `Dla równania $$${formula} = 0$$ wyznacz sumę i iloczyn pierwiastków:`,
      () =>
        `Podaj wartości $x_1 + x_2$ oraz $x_1 \\cdot x_2$ dla $$${formula} = 0$$:`,
      () =>
        `Stosując twierdzenie Viète'a oblicz sumę i iloczyn pierwiastków $$${formula} = 0$$:`,
      () => `Znajdź sumę i iloczyn pierwiastków dla trójmianu $$${formula}$$:`,
      () =>
        `Oblicz $x_1 + x_2$ i $x_1 \\cdot x_2$ dla równania kwadratowego $$${formula} = 0$$:`,
      () =>
        `Wyznacz sumę i iloczyn miejsc zerowych funkcji kwadratowej $$f(x) = ${formula}$$:`,
      () =>
        `Podaj sumę i iloczyn pierwiastków równania $$${formula} = 0$$ używając wzorów Viète'a:`,
      () =>
        `Dla funkcji kwadratowej $$f(x) = ${formula}$$ oblicz sumę i iloczyn pierwiastków:`,
      () =>
        `Znajdź wartości sumy i iloczynu pierwiastków dla równania $$${formula} = 0$$:`,
      () =>
        `Oblicz sumę oraz iloczyn pierwiastków równania kwadratowego $$${formula} = 0$$:`,
      () =>
        `Wyznacz $x_1 + x_2$ oraz $x_1 \\cdot x_2$ korzystając ze wzorów Viète'a dla $$${formula} = 0$$:`,
      () =>
        `Podaj sumę i iloczyn rozwiązań równania kwadratowego $$${formula} = 0$$:`,
      () =>
        `Dla równania $$${formula} = 0$$ znajdź sumę i iloczyn pierwiastków:`,
      () =>
        `Oblicz sumę i iloczyn pierwiastków stosując wzory Viète'a dla $$${formula} = 0$$:`,
      () =>
        `Wyznacz sumę i iloczyn pierwiastków dla równania $$${formula} = 0$$:`,
      () =>
        `Znajdź sumę i iloczyn miejsc zerowych dla funkcji $$f(x) = ${formula}$$:`,
      () =>
        `Podaj $x_1 + x_2$ oraz $x_1 \\cdot x_2$ dla równania $$${formula} = 0$$:`,
      () =>
        `Dla trójmianu kwadratowego $$${formula}$$ wyznacz sumę i iloczyn pierwiastków:`,
      () =>
        `Oblicz sumę i iloczyn pierwiastków dla równania $$${formula} = 0$$:`,
      () =>
        `Wykorzystując zależności między pierwiastkami a współczynnikami podaj sumę i iloczyn dla $$${formula} = 0$$:`,
      () => `Znajdź sumę i iloczyn rozwiązań równania $$${formula} = 0$$:`,
      () =>
        `Oblicz wartości $x_1 + x_2$ oraz $x_1 \\cdot x_2$ dla $$${formula} = 0$$:`,
      () =>
        `Dla równania kwadratowego $$${formula} = 0$$ podaj sumę i iloczyn pierwiastków:`,
      () =>
        `Wyznacz sumę i iloczyn pierwiastków stosując twierdzenie Viète'a dla $$${formula} = 0$$:`,
      () =>
        `Podaj sumę i iloczyn pierwiastków dla równania $$${formula} = 0$$:`,
      () =>
        `Znajdź sumę oraz iloczyn pierwiastków równania kwadratowego $$${formula} = 0$$:`,
      () =>
        `Oblicz $x_1 + x_2$ i $x_1 \\cdot x_2$ dla funkcji kwadratowej $$f(x) = ${formula}$$:`,
      () =>
        `Wyznacz sumę i iloczyn pierwiastków dla $$${formula} = 0$$ metodą Viète'a:`,
      () =>
        `Dla równania $$${formula} = 0$$ oblicz sumę i iloczyn pierwiastków rzeczywistych:`,
      () =>
        `Podaj wartości sumy i iloczynu pierwiastków dla funkcji $$f(x) = ${formula}$$:`,
      () =>
        `Znajdź sumę i iloczyn pierwiastków równania $$${formula} = 0$$ używając wzorów:`,
      () =>
        `Oblicz sumę i iloczyn miejsc zerowych dla trójmianu $$${formula}$$:`,
      () =>
        `Wyznacz $x_1 + x_2$ oraz $x_1 \\cdot x_2$ dla równania $$${formula} = 0$$:`,
      () =>
        `Dla funkcji $$f(x) = ${formula}$$ znajdź sumę i iloczyn pierwiastków:`,
      () =>
        `Podaj sumę i iloczyn pierwiastków równania kwadratowego $$${formula} = 0$$:`,
      () =>
        `Oblicz sumę i iloczyn pierwiastków korzystając ze wzorów Viète'a dla $$${formula} = 0$$:`,
      () =>
        `Znajdź sumę i iloczyn pierwiastków dla równania $$${formula} = 0$$:`,
      () =>
        `Wyznacz sumę i iloczyn pierwiastków stosując wzory Viète'a dla $$${formula} = 0$$:`,
      () =>
        `Dla równania $$${formula} = 0$$ podaj $x_1 + x_2$ oraz $x_1 \\cdot x_2$:`,
      () =>
        `Oblicz sumę i iloczyn pierwiastków dla funkcji kwadratowej $$f(x) = ${formula}$$:`,
      () =>
        `Znajdź wartości sumy i iloczynu pierwiastków równania kwadratowego $$${formula} = 0$$:`,
      () =>
        `Podaj sumę i iloczyn pierwiastków dla $$${formula} = 0$$ korzystając z twierdzenia Viète'a:`,
      () => `Wyznacz sumę i iloczyn pierwiastków równania $$${formula} = 0$$:`,
      () =>
        `Oblicz $x_1 + x_2$ oraz $x_1 \\cdot x_2$ dla trójmianu $$${formula}$$:`,
      () =>
        `Dla równania kwadratowego $$${formula} = 0$$ wyznacz sumę i iloczyn pierwiastków:`,
      () =>
        `Znajdź sumę i iloczyn pierwiastków równania $$${formula} = 0$$ metodą Viète'a:`,
      () =>
        `Podaj sumę i iloczyn miejsc zerowych dla funkcji $$f(x) = ${formula}$$:`,
      () =>
        `Oblicz sumę i iloczyn pierwiastków dla $$${formula} = 0$$ używając wzorów:`,
      () => `Wyznacz sumę i iloczyn pierwiastków równania $$${formula} = 0$$:`,
      () =>
        `Dla funkcji kwadratowej $$f(x) = ${formula}$$ podaj sumę i iloczyn pierwiastków:`,
      () =>
        `Znajdź sumę i iloczyn pierwiastków stosując zależności Viète'a dla $$${formula} = 0$$:`,
      () => `Oblicz sumę i iloczyn rozwiązań równania $$${formula} = 0$$:`,
      () =>
        `Podaj $x_1 + x_2$ oraz $x_1 \\cdot x_2$ dla równania kwadratowego $$${formula} = 0$$:`,
      () =>
        `Wyznacz sumę i iloczyn pierwiastków dla równania $$${formula} = 0$$:`,
      () =>
        `Dla równania $$${formula} = 0$$ oblicz sumę i iloczyn pierwiastków stosując twierdzenie Viète'a:`,
      () =>
        `Znajdź sumę i iloczyn pierwiastków dla trójmianu kwadratowego $$${formula}$$:`,
      () =>
        `Oblicz wartości $x_1 + x_2$ oraz $x_1 \\cdot x_2$ dla $$${formula} = 0$$:`,
      () => `Podaj sumę i iloczyn pierwiastków równania $$${formula} = 0$$:`,
      () =>
        `Wykorzystując wzory Viète'a wyznacz sumę i iloczyn pierwiastków $$${formula} = 0$$:`,
      () =>
        `Znajdź sumę i iloczyn pierwiastków dla równania $$${formula} = 0$$:`,
      () =>
        `Oblicz sumę i iloczyn pierwiastków dla funkcji $$f(x) = ${formula}$$ przyrównanej do zera:`,
      () =>
        `Dla równania $$${formula} = 0$$ znajdź sumę i iloczyn pierwiastków rzeczywistych:`,
      () =>
        `Wyznacz sumę i iloczyn pierwiastków równania kwadratowego $$${formula} = 0$$:`,
      () =>
        `Podaj sumę i iloczyn pierwiastków dla równania $$${formula} = 0$$:`,
      () =>
        `Oblicz $x_1 + x_2$ oraz $x_1 \\cdot x_2$ korzystając ze wzorów Viète'a dla $$${formula} = 0$$:`,
      () =>
        `Znajdź sumę i iloczyn pierwiastków dla równania kwadratowego $$${formula} = 0$$:`,
      () =>
        `Dla trójmianu $$${formula}$$ wyznacz sumę i iloczyn miejsc zerowych:`,
      () =>
        `Podaj sumę i iloczyn pierwiastków równania $$${formula} = 0$$ metodą Viète'a:`,
      () =>
        `Oblicz sumę i iloczyn pierwiastków dla równania $$${formula} = 0$$:`,
      () =>
        `Wyznacz sumę i iloczyn pierwiastków stosując wzory Viète'a dla $$${formula} = 0$$:`,
    ];
  }

  /**
   * Generate Vieta problem distractors
   */
  static generateVietaDistractors(
    sum,
    prod,
    formatFrac,
    b,
    a,
    c,
    correctAnswer,
  ) {
    const sumVal = -b / a;
    const prodVal = c / a;

    const candidates = [
      `${formatFrac(b, a)}, ${prod}`,
      `${sum}, ${formatFrac(-c, a)}`,
      `${prod}, ${sum}`,
      `${formatFrac(-b, a)}, ${formatFrac(-c, a)}`,
      `${prod}, ${formatFrac(b, a)}`,
      `${formatFrac(c, a)}, ${sum}`,
      `${sumVal + 1}, ${prodVal}`,
      `${sumVal}, ${prodVal + 1}`,
      `${sumVal - 1}, ${prodVal}`,
      `${sumVal}, ${prodVal - 1}`,
      `${-sumVal}, ${prodVal}`,
      `${sumVal}, ${-prodVal}`,
      `${prodVal}, ${sumVal}`,
      `${sumVal + 2}, ${prodVal}`,
      `${sumVal}, ${prodVal + 2}`,
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
   * Get formula from vertex problem parameters
   */
  static getFormulaFromVertexParams(difficulty) {
    if (difficulty === "easy") {
      return {
        pRange: [1, 3],
        qRange: [1, 3],
        aList: [1],
      };
    } else if (difficulty === "hard") {
      return {
        pRange: [-5, 5],
        qRange: [-5, 5],
        aList: [-2, 2, 3],
      };
    } else {
      return {
        pRange: [-3, 3],
        qRange: [-3, 3],
        aList: [-1, 1],
      };
    }
  }

  /**
   * Get formula from vertex problem templates
   */
  static getFormulaFromVertexTemplates(p, q, x, y) {
    return [
      () =>
        `Wierzchołkiem paraboli jest punkt $$W(${p},${q})$$, a jej wykres przechodzi przez punkt $$A(${x},${y})$$. Wyznacz wzór tej funkcji w postaci kanonicznej.`,
      () =>
        `Parabola ma wierzchołek w punkcie $$W(${p},${q})$$ i przechodzi przez $$A(${x},${y})$$. Znajdź jej wzór w postaci kanonicznej.`,
      () =>
        `Dana jest parabola o wierzchołku $$W(${p},${q})$$ przechodząca przez $$A(${x},${y})$$. Wyznacz wzór funkcji kwadratowej.`,
      () =>
        `Wykres funkcji kwadratowej ma wierzchołek $$W(${p},${q})$$ i punkt $$A(${x},${y})$$. Podaj wzór w postaci kanonicznej.`,
      () =>
        `Funkcja kwadratowa ma wierzchołek w $$W(${p},${q})$$ oraz przechodzi przez $$A(${x},${y})$$. Znajdź jej wzór.`,
      () =>
        `Parabola o wierzchołku $$W(${p},${q})$$ zawiera punkt $$A(${x},${y})$$. Wyznacz wzór funkcji.`,
      () =>
        `Wierzchołek paraboli to $$W(${p},${q})$$, a punkt $$A(${x},${y})$$ należy do wykresu. Podaj wzór kanoniczny.`,
      () =>
        `Znajdź wzór funkcji kwadratowej z wierzchołkiem $$W(${p},${q})$$ przechodzącej przez $$A(${x},${y})$$.`,
      () =>
        `Dla paraboli o wierzchołku $$W(${p},${q})$$ i punkcie $$A(${x},${y})$$ wyznacz wzór kanoniczny.`,
      () =>
        `Wyznacz równanie paraboli mającej wierzchołek $$W(${p},${q})$$ i przechodzącej przez $$A(${x},${y})$$.`,
      () =>
        `Funkcja kwadratowa o wierzchołku $$W(${p},${q})$$ przechodzi przez punkt $$A(${x},${y})$$. Podaj jej postać kanoniczną.`,
      () =>
        `Dana jest funkcja kwadratowa z wierzchołkiem w $$W(${p},${q})$$ i punktem $$A(${x},${y})$$ na wykresie. Znajdź wzór.`,
      () =>
        `Parabola z wierzchołkiem $$W(${p},${q})$$ przechodzi przez $$A(${x},${y})$$. Wyznacz jej równanie w postaci kanonicznej.`,
      () =>
        `Wykres paraboli ma wierzchołek w $$W(${p},${q})$$ i zawiera punkt $$A(${x},${y})$$. Podaj wzór funkcji.`,
      () =>
        `Znajdź postać kanoniczną funkcji kwadratowej o wierzchołku $$W(${p},${q})$$ przechodzącej przez $$A(${x},${y})$$.`,
      () =>
        `Dla funkcji kwadratowej z wierzchołkiem $$W(${p},${q})$$ i punktem $$A(${x},${y})$$ wyznacz wzór kanoniczny.`,
      () =>
        `Parabola ma wierzchołek $$W(${p},${q})$$ oraz przechodzi przez punkt $$A(${x},${y})$$. Znajdź jej równanie.`,
      () =>
        `Wierzchołek w punkcie $$W(${p},${q})$$ i przechodzenie przez $$A(${x},${y})$$ określają parabolę. Podaj jej wzór.`,
      () =>
        `Funkcja kwadratowa z wierzchołkiem $$W(${p},${q})$$ zawiera punkt $$A(${x},${y})$$. Wyznacz postać kanoniczną.`,
      () =>
        `Podaj wzór funkcji kwadratowej o wierzchołku $$W(${p},${q})$$ przechodzącej przez punkt $$A(${x},${y})$$.`,
      () =>
        `Dana jest parabola o wierzchołku $$W(${p},${q})$$ i punkcie $$A(${x},${y})$$. Znajdź jej postać kanoniczną.`,
      () =>
        `Wyznacz wzór funkcji kwadratowej, której wykres ma wierzchołek $$W(${p},${q})$$ i przechodzi przez $$A(${x},${y})$$.`,
      () =>
        `Znajdź równanie paraboli z wierzchołkiem w $$W(${p},${q})$$ zawierającej punkt $$A(${x},${y})$$.`,
      () =>
        `Parabola z wierzchołkiem $$W(${p},${q})$$ przechodzi przez punkt $$A(${x},${y})$$. Podaj jej wzór kanoniczny.`,
      () =>
        `Funkcja kwadratowa o wierzchołku $$W(${p},${q})$$ ma punkt $$A(${x},${y})$$ na wykresie. Wyznacz wzór.`,
      () =>
        `Wierzchołek paraboli znajduje się w $$W(${p},${q})$$, a wykres przechodzi przez $$A(${x},${y})$$. Podaj równanie.`,
      () =>
        `Dla paraboli o wierzchołku $$W(${p},${q})$$ i przechodzącej przez $$A(${x},${y})$$ znajdź postać kanoniczną.`,
      () =>
        `Znajdź wzór kanoniczny funkcji kwadratowej z wierzchołkiem $$W(${p},${q})$$ i punktem $$A(${x},${y})$$.`,
      () =>
        `Wyznacz równanie kanoniczne paraboli o wierzchołku $$W(${p},${q})$$ przechodzącej przez $$A(${x},${y})$$.`,
      () =>
        `Parabola ma wierzchołek w $$W(${p},${q})$$ i zawiera $$A(${x},${y})$$. Podaj jej wzór w postaci kanonicznej.`,
      () =>
        `Funkcja kwadratowa z wierzchołkiem $$W(${p},${q})$$ przechodzi przez $$A(${x},${y})$$. Znajdź jej równanie.`,
      () =>
        `Dana jest funkcja kwadratowa o wierzchołku $$W(${p},${q})$$ i punkcie $$A(${x},${y})$$ na wykresie. Wyznacz wzór kanoniczny.`,
      () =>
        `Wykres funkcji kwadratowej zawiera wierzchołek $$W(${p},${q})$$ i punkt $$A(${x},${y})$$. Podaj równanie w postaci kanonicznej.`,
      () =>
        `Znajdź postać kanoniczną funkcji kwadratowej, której wierzchołek to $$W(${p},${q})$$, a wykres przechodzi przez $$A(${x},${y})$$.`,
      () =>
        `Parabola z wierzchołkiem w punkcie $$W(${p},${q})$$ przechodzi przez $$A(${x},${y})$$. Wyznacz jej wzór.`,
      () =>
        `Podaj równanie funkcji kwadratowej o wierzchołku $$W(${p},${q})$$ przechodzącej przez punkt $$A(${x},${y})$$.`,
      () =>
        `Wierzchołek w $$W(${p},${q})$$ i punkt $$A(${x},${y})$$ określają parabolę. Znajdź jej postać kanoniczną.`,
      () =>
        `Funkcja kwadratowa ma wierzchołek $$W(${p},${q})$$ i przechodzi przez $$A(${x},${y})$$. Wyznacz wzór kanoniczny.`,
    ];
  }

  /**
   * Generate formula from vertex distractors
   */
  static generateFormulaFromVertexDistractors(a, aStr, pSign, pAbs, qSign, q) {
    return [
      `f(x) = ${aStr}(x ${pSign === "-" ? "+" : "-"} ${pAbs})^2 ${qSign}${q}`,
      `f(x) = ${-a}(x ${pSign} ${pAbs})^2 ${qSign}${q}`,
      `f(x) = (x ${pSign} ${pAbs})^2 ${qSign}${q}`,
    ];
  }

  /**
   * Get coefficients from vertex problem parameters
   */
  static getCoeffsFromVertexParams(difficulty) {
    if (difficulty === "easy") {
      return {
        aList: [-1, 1],
        range: [-3, 3],
      };
    } else if (difficulty === "hard") {
      return {
        aList: [-2, 2, 3, -3],
        range: [-6, 6],
      };
    } else {
      return {
        aList: [-1, 1, 2, -2],
        range: [-4, 4],
      };
    }
  }

  /**
   * Get coefficients from vertex problem templates
   */
  static getCoeffsFromVertexTemplates(p, q, a) {
    return [
      () =>
        `Wierzchołek $$W(${p},${q})$$ paraboli $$y=${a}x^2+bx+c$$. Oblicz b, c.`,
      () =>
        `Dla paraboli $$y=${a}x^2+bx+c$$ o wierzchołku $$W(${p},${q})$$ wyznacz współczynniki b i c.`,
      () =>
        `Parabola $$y=${a}x^2+bx+c$$ ma wierzchołek w $$W(${p},${q})$$. Oblicz b oraz c.`,
      () =>
        `Wyznacz b i c dla funkcji $$f(x)=${a}x^2+bx+c$$ z wierzchołkiem $$W(${p},${q})$$.`,
      () =>
        `Dla funkcji kwadratowej $$f(x)=${a}x^2+bx+c$$ o wierzchołku $$W(${p},${q})$$ znajdź b i c.`,
      () =>
        `Oblicz współczynniki b i c paraboli $$y=${a}x^2+bx+c$$ z wierzchołkiem $$W(${p},${q})$$.`,
      () =>
        `Wierzchołek $$W(${p},${q})$$ należy do paraboli $$y=${a}x^2+bx+c$$. Wyznacz b, c.`,
      () =>
        `Znajdź współczynniki b i c dla paraboli o równaniu $$y=${a}x^2+bx+c$$ i wierzchołku $$W(${p},${q})$$.`,
      () =>
        `Parabola z wierzchołkiem $$W(${p},${q})$$ ma postać $$y=${a}x^2+bx+c$$. Oblicz b i c.`,
      () =>
        `Dla $$y=${a}x^2+bx+c$$ z wierzchołkiem $$W(${p},${q})$$ podaj wartości b oraz c.`,
    ];
  }

  /**
   * Generate coefficients from vertex distractors
   */
  static generateCoeffsFromVertexDistractors(b, c, correctAnswer) {
    const candidates = [
      `b=${-b}, c=${c}`,
      `b=${c}, c=${b}`,
      `b=${b}, c=${-c}`,
      `b=${b + 1}, c=${c}`,
      `b=${b}, c=${c + 1}`,
      `b=${b - 1}, c=${c}`,
      `b=${b}, c=${c - 1}`,
      `b=${-b}, c=${-c}`,
      `b=${c}, c=${-b}`,
      `b=${b + 2}, c=${c}`,
      `b=${b}, c=${c + 2}`,
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
   * Get product to general form problem parameters
   */
  static getProductToGeneralParams(difficulty) {
    if (difficulty === "easy") {
      return {
        rootRange: [-3, 3],
        aList: [1, -1],
      };
    } else if (difficulty === "hard") {
      return {
        rootRange: [-6, 6],
        aList: [-2, -1, 1, 2, 3],
      };
    } else {
      return {
        rootRange: [-4, 4],
        aList: [-2, -1, 1, 2],
      };
    }
  }

  /**
   * Get product to general form problem templates
   */
  static getProductToGeneralTemplates(formula) {
    return [
      () =>
        `Funkcja kwadratowa jest dana wzorem: $$${formula}$$. Współczynnik b we wzorze ogólnym wynosi:`,
      () =>
        `Dla funkcji $$${formula}$$ podaj współczynnik b w postaci ogólnej:`,
      () =>
        `Wyznacz współczynnik b funkcji $$f(x)=${formula}$$ w postaci ogólnej:`,
      () =>
        `Dla $$${formula}$$ oblicz wartość współczynnika b w postaci $$ax^2+bx+c$$:`,
      () =>
        `Podaj współczynnik b funkcji kwadratowej $$f(x)=${formula}$$ w postaci ogólnej:`,
      () =>
        `Funkcja $$f(x)=${formula}$$ w postaci ogólnej ma współczynnik b równy:`,
      () => `Oblicz b w postaci ogólnej dla funkcji $$f(x)=${formula}$$:`,
      () =>
        `Przedstaw $$f(x)=${formula}$$ w postaci ogólnej i podaj współczynnik b:`,
      () =>
        `Wymnażając nawiasy w $$${formula}$$ otrzymasz współczynnik b równy:`,
      () => `Dla postaci ogólnej funkcji $$f(x)=${formula}$$ wyznacz b:`,
    ];
  }

  /**
   * Generate product to general form distractors
   */
  static generateProductToGeneralDistractors(b, x1, x2, a) {
    const candidates = [
      -b,
      x1 * x2,
      a,
      -(x1 + x2),
      x1 + x2,
      b + a,
      b - a,
      x1,
      x2,
      -x1,
      -x2,
    ];

    const uniqueDistractors = [];
    const usedValues = new Set();
    usedValues.add(b);

    for (const val of candidates) {
      if (!usedValues.has(val)) {
        uniqueDistractors.push(`${val}`);
        usedValues.add(val);
      }
      if (uniqueDistractors.length === 3) break;
    }

    let offset = 1;
    while (uniqueDistractors.length < 3) {
      const val = b + offset;
      if (!usedValues.has(val)) {
        uniqueDistractors.push(`${val}`);
        usedValues.add(val);
      }
      offset = offset > 0 ? -offset : -offset + 1;
    }

    return uniqueDistractors;
  }

  /**
   * Format number as LaTeX fraction
   */
  static formatFraction(num, den) {
    if (num % den === 0) return `${num / den}`;
    return `\\frac{${num}}{${den}}`;
  }
}

module.exports = EquationsAndInequalitiesValues;
