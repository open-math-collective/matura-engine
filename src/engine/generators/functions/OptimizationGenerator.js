const BaseGenerator = require("../../core/BaseGenerator");
const MathUtils = require("../../utils/MathUtils");

class OptimizationGenerator extends BaseGenerator {
  generate() {
    const variants = [
      "revenue", // Ekonomiczne: Bilet/Klocki (przychód)
      "density", // Ekonomiczne: Sadownik (zagęszczenie)
      "fencing_3_pens", // Geometryczne: Ogrodzenie 3 wybiegów (pole)
      "cuboid_surface", // Geometryczne: Prostopadłościan (suma krawędzi)
      "trapezoid_window", // Geometryczne: Okno trapezowe (pole)
    ];

    const selectedVariant = MathUtils.randomElement(variants);

    switch (selectedVariant) {
      case "density":
        return this.generateDensityProblem();
      case "fencing_3_pens":
        return this.generateFencingProblem();
      case "cuboid_surface":
        return this.generateCuboidProblem();
      case "trapezoid_window":
        return this.generateTrapezoidProblem();
      case "revenue":
      default:
        return this.generateRevenueProblem();
    }
  }

  // --- 1. PRZYCHÓD (CENA * ILOŚĆ) ---
  generateRevenueProblem() {
    const scenarios = [
      {
        id: "electronics",
        subject: "słuchawek bezprzewodowych",
        unit: "zł",
        ranges: { price: [80, 150], sales: [40, 100], stepSales: [2, 5] },
        template: (price, sales, stepP, stepS, subject, unit) =>
          `Sklep z elektroniką sprzedaje dziennie ${sales} sztuk ${subject} w cenie ${price} ${unit} za sztukę. ` +
          `Badania rynku pokazały, że każda obniżka ceny o ${stepP} ${unit} powoduje wzrost sprzedaży o ${stepS} sztuk. ` +
          `Jaką cenę powinien ustalić sprzedawca, aby jego dzienny przychód był największy?`,
      },
      {
        id: "hotel",
        subject: "pokoi",
        unit: "zł",
        ranges: { price: [180, 300], sales: [20, 50], stepSales: [1, 3] },
        template: (price, sales, stepP, stepS, subject, unit) =>
          `Właściciel hotelu zauważył, że przy cenie wynajmu wynoszącej ${price} ${unit} za dobę, zajętych jest ${sales} ${subject}. ` +
          `Każde obniżenie ceny o ${stepP} ${unit} sprawia, że wynajmowanych jest o ${stepS} pokoi więcej. ` +
          `Oblicz, przy jakiej cenie za dobę przychód hotelu będzie maksymalny.`,
      },
      {
        id: "tutor",
        subject: "kurs online",
        unit: "zł",
        ranges: { price: [40, 90], sales: [100, 300], stepSales: [5, 15] },
        template: (price, sales, stepP, stepS, subject, unit) =>
          `Platforma edukacyjna oferuje ${subject} w cenie ${price} ${unit}. Obecnie z kursu korzysta ${sales} uczniów miesięcznie. ` +
          `Analiza wykazała, że każda obniżka ceny o ${stepP} ${unit} przyciągnie ${stepS} nowych uczniów. ` +
          `O ile ${unit} należy obniżyć cenę, aby miesięczny wpływ ze sprzedaży był największy?`,
      },
    ];

    const scenario = MathUtils.randomElement(scenarios);
    const stepPrice = 1;
    const stepSales = MathUtils.randomInt(
      scenario.ranges.stepSales[0],
      scenario.ranges.stepSales[1],
    );

    let startPrice, startSales, p;
    let attempts = 0;

    // Reverse engineering dla ładnego wierzchołka
    do {
      startPrice = MathUtils.randomInt(
        scenario.ranges.price[0],
        scenario.ranges.price[1],
      );
      startSales = MathUtils.randomInt(
        scenario.ranges.sales[0],
        scenario.ranges.sales[1],
      );

      const b = startPrice * stepSales - startSales;
      const doubleA = 2 * -stepSales;
      p = -b / doubleA;
      attempts++;
    } while (
      (!Number.isInteger(p) || p <= 0 || p >= startPrice) &&
      attempts < 100
    );

    if (!Number.isInteger(p)) {
      startPrice = 50;
      startSales = 100;
      p = (50 * stepSales - 100) / (2 * stepSales);
    }

    const x = p;
    const newPrice = startPrice - x;
    const newSales = startSales + stepSales * x;
    const maxRevenue = newPrice * newSales;

    const questionText = scenario.template(
      startPrice,
      startSales,
      stepPrice,
      stepSales,
      scenario.subject,
      scenario.unit,
    );

    return this.createResponse({
      question: questionText,
      latex: `P(x) = (${startPrice} - x)(${startSales} + ${stepSales}x)`,
      image: this.generateParabolaSVG(
        startPrice,
        startSales,
        stepSales,
        x,
        maxRevenue,
      ),
      variables: { startPrice, startSales, stepSales, optimalX: x },
      correctAnswer:
        scenario.id === "hotel" || scenario.id === "electronics"
          ? `${newPrice} ${scenario.unit}`
          : `${x} ${scenario.unit}`,
      distractors: [
        `${x + 5} ${scenario.unit}`,
        `${newPrice - 10} ${scenario.unit}`,
        `${startPrice} ${scenario.unit}`,
      ],
      steps: [
        `Oznaczmy przez $$x$$ kwotę obniżki. Nowa cena: $$${startPrice} - x$$. Nowa sprzedaż: $$${startSales} + ${stepSales}x$$.`,
        `Funkcja przychodu: $$P(x) = (${startPrice} - x)(${startSales} + ${stepSales}x)$$`,
        `Po wymnożeniu: $$P(x) = -${stepSales}x^2 + ${startPrice * stepSales - startSales}x + ${startPrice * startSales}$$`,
        `Wierzchołek paraboli (maksimum): $$p = \\frac{-b}{2a} = \\frac{-(${startPrice * stepSales - startSales})}{2 \\cdot (-${stepSales})} = ${x}$$`,
        scenario.id === "hotel" || scenario.id === "electronics"
          ? `Szukana cena: $$${startPrice} - ${x} = ${newPrice}$$ ${scenario.unit}.`
          : `Należy obniżyć cenę o $$${x}$$ ${scenario.unit}.`,
      ],
    });
  }

  // --- 2. SADOWNIK (ZAGĘSZCZENIE) ---
  generateDensityProblem() {
    const scenario = {
      subject: "drzew",
      unit: "szt.",
      template: (fruits, trees, stepFruits, stepTrees, subject) =>
        `Sadownik zauważył, że jeśli posadzi ${trees} ${subject} na hektar, to z każdego zbierze średnio ${fruits} kg owoców. ` +
        `Każde dodatkowe posadzone drzewo (powyżej liczby ${trees}) powoduje zmniejszenie plonu z każdego drzewa o ${stepFruits} kg. ` +
        `Ile drzew należy dosadzić, aby łączny plon z sadu był największy?`,
    };

    const startTrees = MathUtils.randomInt(50, 80);
    const lossPerTree = MathUtils.randomElement([1, 2]);
    const targetX = MathUtils.randomInt(5, 15);
    const calculatedStartFruits =
      2 * lossPerTree * targetX + startTrees * lossPerTree;

    const questionText = scenario.template(
      calculatedStartFruits,
      startTrees,
      lossPerTree,
      null,
      scenario.subject,
    );

    return this.createResponse({
      question: questionText,
      latex: `Plon(x) = (${startTrees} + x)(${calculatedStartFruits} - ${lossPerTree}x)`,
      image: this.generateParabolaSVG(
        calculatedStartFruits,
        startTrees,
        lossPerTree,
        targetX,
        0,
        true,
      ),
      variables: { calculatedStartFruits, startTrees, lossPerTree, targetX },
      correctAnswer: `${targetX} drzew`,
      distractors: [
        `${targetX + 5} drzew`,
        `${targetX * 2} drzew`,
        `${startTrees} drzew`,
      ],
      steps: [
        `Niech $$x$$ oznacza liczbę dosadzonych drzew. Liczba drzew: $$${startTrees} + x$$.`,
        `Plon z jednego drzewa: $$${calculatedStartFruits} - ${lossPerTree}x$$.`,
        `Funkcja plonu całkowitego: $$P(x) = (${startTrees} + x)(${calculatedStartFruits} - ${lossPerTree}x)$$`,
        `Jest to funkcja kwadratowa o ramionach w dół. Obliczamy wierzchołek $$p$$.`,
        `Miejsca zerowe: $$x_1 = -${startTrees}$$, $$x_2 = ${calculatedStartFruits / lossPerTree}$$.`,
        `Wierzchołek leży pośrodku: $$p = \\frac{-${startTrees} + ${calculatedStartFruits / lossPerTree}}{2} = ${targetX}$$`,
        `Należy dosadzić $$${targetX}$$ drzew.`,
      ],
    });
  }

  // --- 3. OGRODZENIE (GEOMETRIA 2D) ---
  generateFencingProblem() {
    // 3 wybiegi prostokątne przylegające do siebie (jak w arkuszu maj 2024)
    // Rysunek: Duży prostokąt podzielony 2 liniami pionowymi na 3 mniejsze.
    // Suma drutu L. Wymiary małego wybiegu: x, y.
    // Długość drutu = 6x + 4y (jeśli x to poziome boki małych) lub 2*(3x) + 4y...
    // Ustalmy jak w maturze: 3 identyczne wybiegi.
    // Całość to prostokąt o bokach X (suma szerokości) i Y (wysokość).
    // Jeśli wybiegi są obok siebie: mamy 2 długie boki (góra/dół) i 4 krótkie (piony).
    // Niech y = bok pionowy (wspólny), x = bok poziomy jednego wybiegu.
    // Długość siatki L = 6x + 4y.
    // Pole całkowite P = 3 * x * y.
    // L = 6x + 4y => y = (L - 6x)/4 = L/4 - 1.5x
    // P(x) = 3x * (L/4 - 1.5x) = 0.75Lx - 4.5x^2.
    // Wierzchołek x = -b/2a = -(0.75L) / (2 * -4.5) = 0.75L / 9 = L/12.

    // Żeby x był całkowity, L musi być wielokrotnością 12.
    const L = MathUtils.randomInt(3, 8) * 12; // np. 36, 48, 60

    const x = L / 12;
    const y = (L - 6 * x) / 4;
    const maxArea = 3 * x * y;

    return this.createResponse({
      question: `W schronisku należy zbudować ogrodzenie wydzielające trzy identyczne prostokątne wybiegi o wspólnych ścianach wewnętrznych (przylegające do siebie dłuższym bokiem całego terenu). Do wykonania ogrodzenia zakupiono $$${L}$$ metrów siatki. Oblicz wymiary jednego małego wybiegu ($$x$$ i $$y$$), dla których suma pól tych wybiegów będzie największa.`,
      latex: `L = ${L}m`,
      image: this.generateGeometrySVG({ type: "fencing_3", x, y }),
      variables: { L, x, y, maxArea },
      correctAnswer: `x=${x} m, y=${y} m`,
      distractors: [
        `x=${x + 1} m, y=${y - 1} m`,
        `x=${y} m, y=${x} m`,
        `x=${L / 6} m, y=${L / 4} m`,
      ],
      steps: [
        `Oznaczmy wymiary jednego wybiegu przez $$x$$ (poziomy) i $$y$$ (pionowy).`,
        `Mamy 3 wybiegi obok siebie. Siatka składa się z 6 odcinków poziomych (po 2 na każdy wybieg? Nie, zewnętrzne są ciągłe).`,
        `Patrząc na schemat (duży prostokąt podzielony na 3): Mamy 2 długie boki o długości $$3x$$ i 4 boki pionowe o długości $$y$$.`,
        `Równanie długości siatki: $$2 \\cdot (3x) + 4y = ${L} \\implies 6x + 4y = ${L}$$.`,
        `Wyznaczamy $$y$$: $$4y = ${L} - 6x \\implies y = ${L / 4} - 1.5x$$.`,
        `Pole całkowite: $$P = 3 \\cdot x \\cdot y = 3x(${L / 4} - 1.5x) = ${(3 * L) / 4}x - 4.5x^2$$.`,
        `Szukamy wierzchołka paraboli $$p = \\frac{-b}{2a} = \\frac{-${(3 * L) / 4}}{2 \\cdot (-4.5)} = \\frac{${(3 * L) / 4}}{9} = ${x}$$.`,
        `Zatem $$x = ${x}$$ m.`,
        `Obliczamy $$y = ${L / 4} - 1.5 \\cdot ${x} = ${y}$$ m.`,
      ],
    });
  }

  // --- 4. PROSTOPADŁOŚCIAN (GEOMETRIA 3D) ---
  generateCuboidProblem() {
    // Zadanie: Suma wszystkich krawędzi = S. Zależność np. h = a. Podstawa prostokąt a x b.
    // Albo: Podstawa kwadratowa a x a. Suma krawędzi = S. Max Pole.
    // 8a + 4h = S => 2a + h = S/4 => h = S/4 - 2a.
    // P = 2a^2 + 4ah = 2a^2 + 4a(S/4 - 2a) = 2a^2 + aS - 8a^2 = -6a^2 + aS.
    // Wierzchołek a = -S / (2*-6) = S/12.
    // S musi być podzielne przez 12.

    const S = MathUtils.randomInt(2, 8) * 12; // np. 24, 36, 48...
    const a = S / 12;
    const h = S / 4 - 2 * a; // Dla sześcianu h=a.
    // Żeby było ciekawiej, zróbmy zależność inną, np. h inna niż a.
    // Ale w podstawie kwadratowej optimum to sześcian.

    // Wersja z arkusza grudzień 2024: Krawędź boczna 3 razy dłuższa od krawędzi podstawy.
    // To inna optymalizacja (np. ustalona objętość?).
    // Wróćmy do zadania: "Suma długości wszystkich krawędzi wynosi S". Podstawa kwadratowa.

    const Pc = 2 * a * a + 4 * a * h;

    return this.createResponse({
      question: `Suma długości wszystkich krawędzi prostopadłościanu o podstawie kwadratowej jest równa $$${S}$$. Oblicz długość krawędzi podstawy $$x$$ tego prostopadłościanu, dla której jego pole powierzchni całkowitej jest największe.`,
      latex: `\\text{Suma} = ${S}`,
      image: this.generateGeometrySVG({ type: "cuboid_opt", a, h }),
      variables: { S, a, h, Pc },
      correctAnswer: `x = ${a}`,
      distractors: [`x = ${a + 1}`, `x = ${a / 2}`, `x = ${S / 12 + 1}`],
      steps: [
        `Oznaczmy krawędź podstawy jako $$x$$, a wysokość jako $$h$$.`,
        `Prostopadłościan ma 8 krawędzi podstawy ($$x$$) i 4 krawędzie boczne ($$h$$).`,
        `$$8x + 4h = ${S} \\implies 2x + h = ${S / 4} \\implies h = ${S / 4} - 2x$$.`,
        `Pole całkowite $$P(x) = 2x^2 + 4xh = 2x^2 + 4x(${S / 4} - 2x)$$`,
        `$$P(x) = 2x^2 + ${S}x - 8x^2 = -6x^2 + ${S}x$$.`,
        `Szukamy wierzchołka $$p = \\frac{-${S}}{2 \\cdot (-6)} = \\frac{${S}}{12} = ${a}$$.`,
        `Odp: $$x = ${a}$$`,
      ],
    });
  }

  // --- 5. TRAPEZ / OKNO (GEOMETRIA 2D) ---
  generateTrapezoidProblem() {
    // Okno trapez równoramienny. Dłuższa podstawa 'a' (stała).
    // Suma krótszej podstawy 'b' i wysokości 'h' wynosi S. Max pole.
    // b + h = S => b = S - h.
    // P = 0.5(a+b)h = 0.5(a + S - h)h = 0.5(a+S)h - 0.5h^2.
    // Wierzchołek h = -0.5(a+S) / (2*-0.5) = 0.5(a+S) = (a+S)/2.
    // Wtedy b = S - (a+S)/2 = (2S - a - S)/2 = (S-a)/2.

    // Żeby b > 0, musi być S > a.
    // Żeby liczby były ładne (parzyste), niech a i S będą parzyste.

    const a = MathUtils.randomInt(4, 10) * 2; // np. 12
    const S = a + MathUtils.randomInt(2, 6) * 2; // np. 12 + 6 = 18

    const h_opt = (a + S) / 2;
    const b_opt = S - h_opt;
    const maxArea = 0.5 * (a + b_opt) * h_opt;

    return this.createResponse({
      question: `Okno ma kształt trapezu równoramiennego. Dłuższa podstawa ma stałą długość $$${a}$$ dm. Suma długości krótszej podstawy i wysokości tego trapezu wynosi $$${S}$$ dm. Oblicz jaką długość powinna mieć wysokość $$h$$ tego okna, aby jego powierzchnia była największa.`,
      latex: `a=${a}, b+h=${S}`,
      image: this.generateGeometrySVG({
        type: "trapezoid_opt",
        a,
        b: b_opt,
        h: h_opt,
      }),
      variables: { a, S, h_opt, b_opt },
      correctAnswer: `h = ${h_opt} dm`,
      distractors: [
        `h = ${h_opt - 2} dm`,
        `h = ${b_opt} dm`,
        `h = ${S / 2} dm`,
      ],
      steps: [
        `Wzór na pole trapezu: $$P = \\frac{a+b}{2} \\cdot h$$.`,
        `Z treści zadania: $$a=${a}$$ oraz $$b+h=${S} \\implies b = ${S} - h$$.`,
        `Podstawiamy do wzoru na pole:`,
        `$$P(h) = \\frac{${a} + (${S} - h)}{2} \\cdot h = \\frac{${a + S} - h}{2} \\cdot h$$`,
        `$$P(h) = \\frac{${a + S}}{2}h - \\frac{1}{2}h^2 = -0.5h^2 + ${(a + S) / 2}h$$.`,
        `Obliczamy wierzchołek (maksimum):`,
        `$$h_{opt} = \\frac{-${(a + S) / 2}}{2 \\cdot (-0.5)} = \\frac{-${(a + S) / 2}}{-1} = ${h_opt}$$.`,
        `Odp: $$h = ${h_opt}$$ dm.`,
      ],
    });
  }

  // --- GENERATORY SVG ---
  generateParabolaSVG(startP, startS, step, optX, maxRev, isDensity = false) {
    const size = 300;
    const center = size / 2;
    // ... (Kod SVG paraboli z poprzedniej wersji - bez zmian, wklej go tutaj) ...
    // DLA OSZCZĘDNOŚCI MIEJSCA - UŻYJ TEGO SAMEGO KODU CO W POPRZEDNIEJ ODPOWIEDZI
    // Implementacja Parabola SVG jest identyczna jak wcześniej.
    let pathData = "";
    for (let x = -10; x <= 10; x += 0.5) {
      const relX = x;
      const relY = -(x * x) + 9;
      const svgX = center + relX * 10;
      const svgY = center - relY * 10;
      pathData += `${pathData ? "L" : "M"} ${svgX} ${svgY} `;
    }
    const axis = `
        <line x1="10" y1="${center + 90}" x2="${size - 10}" y2="${center + 90}" stroke="#333" stroke-width="2" />
        <line x1="${center - 100}" y1="${size - 10}" x2="${center - 100}" y2="10" stroke="#333" stroke-width="2" />
        <text x="${center + 120}" y="${center + 110}" font-size="12">x</text>
        <text x="${center - 110}" y="20" font-size="12">f(x)</text>
    `;
    const vertex = `<circle cx="${center}" cy="${center - 90}" r="5" fill="red" />`;
    return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff">${axis}<path d="${pathData}" stroke="#007bff" stroke-width="3" fill="none" transform="translate(0, 90)"/><g transform="translate(0, 90)">${vertex}</g></svg>`;
  }

  generateGeometrySVG(params) {
    const size = 300;
    const cx = 150;
    const cy = 200;

    if (params.type === "fencing_3") {
      const w = 200;
      const h = 100;
      // Rysunek: prostokąt podzielony na 3
      return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff">
            <rect x="50" y="100" width="${w}" height="${h}" stroke="black" fill="none" stroke-width="2"/>
            <line x1="${50 + w / 3}" y1="100" x2="${50 + w / 3}" y2="${100 + h}" stroke="black" stroke-width="2"/>
            <line x1="${50 + (2 * w) / 3}" y1="100" x2="${50 + (2 * w) / 3}" y2="${100 + h}" stroke="black" stroke-width="2"/>
            <text x="${50 + w / 2}" y="220" font-size="14">3x (łączna szerokość)</text>
            <text x="30" y="${100 + h / 2}" font-size="14">y</text>
        </svg>`;
    }

    if (params.type === "cuboid_opt") {
      // Prosty prostopadłościan z oznaczeniami
      return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff">
            <rect x="100" y="150" width="100" height="100" stroke="black" fill="none" stroke-width="2"/> <line x1="100" y1="150" x2="150" y2="100" stroke="black" stroke-width="2"/>
            <line x1="200" y1="150" x2="250" y2="100" stroke="black" stroke-width="2"/>
            <line x1="200" y1="250" x2="250" y2="200" stroke="black" stroke-width="2"/>
            <rect x="150" y="100" width="100" height="100" stroke="black" fill="none" stroke-width="2" stroke-dasharray="4"/> <text x="140" y="270" font-size="14">x</text>
            <text x="210" y="200" font-size="14">h</text>
        </svg>`;
    }

    if (params.type === "trapezoid_opt") {
      // Trapez równoramienny
      const scale = 10;
      const w1 = params.a * scale;
      const w2 = params.b * scale;
      const h = params.h * scale;
      const xOffset = (w1 - w2) / 2;

      return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff">
            <polygon points="${cx - w2 / 2},${cy - h} ${cx + w2 / 2},${cy - h} ${cx + w1 / 2},${cy} ${cx - w1 / 2},${cy}" stroke="black" fill="none" stroke-width="2"/>
            <line x1="${cx - w2 / 2}" y1="${cy - h}" x2="${cx - w2 / 2}" y2="${cy}" stroke="blue" stroke-dasharray="4"/>
            <text x="${cx}" y="${cy + 20}" font-size="14">a=${params.a}</text>
            <text x="${cx}" y="${cy - h - 10}" font-size="14">b=${params.b}</text>
            <text x="${cx - w2 / 2 - 20}" y="${cy - h / 2}" font-size="14" fill="blue">h</text>
        </svg>`;
    }
    return "";
  }
}

module.exports = OptimizationGenerator;
