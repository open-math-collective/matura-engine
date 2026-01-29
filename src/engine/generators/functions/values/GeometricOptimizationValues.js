const MathUtils = require("../../../utils/MathUtils");

class GeometricOptimizationValues {
  /**
   * Get fencing problem parameters
   */
  static getFencingParams(difficulty) {
    if (difficulty === "easy") {
      return { rangeL: [24, 120] };
    } else if (difficulty === "hard") {
      return { rangeL: [24, 600] };
    } else {
      return { rangeL: [24, 360] };
    }
  }

  /**
   * Get fencing problem templates
   */
  static getFencingTemplates() {
    return [
      (L, x, y) =>
        `W schronisku należy zbudować ogrodzenie wydzielające trzy identyczne prostokątne wybiegi o wspólnych ścianach wewnętrznych (przylegające do siebie dłuższym bokiem całego terenu). Do wykonania ogrodzenia zakupiono $$${L}$$ metrów siatki. Oblicz wymiary jednego małego wybiegu ($$x$$ i $$y$$), dla których suma pól tych wybiegów będzie największa.`,
      (L, x, y) =>
        `Schronisko dla zwierząt planuje budowę trzech identycznych wybiegów prostokątnych połączonych dłuższymi bokami. Dysponują $$${L}$$ metrami siatki ogrodzeniowej. Wyznacz wymiary pojedynczego wybiegu ($$x$$, $$y$$) dla maksymalnego pola.`,
      (L, x, y) =>
        `Do budowy trzech sąsiadujących wybiegów prostokątnych (o wspólnych ścianach) przeznaczono $$${L}$$ m siatki. Znajdź wymiary jednego wybiegu ($$x$$ i $$y$$), aby suma ich pól była maksymalna.`,
      (L, x, y) =>
        `W gospodarstwie buduje się trzy identyczne prostokątne wybiegi z wspólnymi przegrodami. Mają $$${L}$$ metrów siatki. Oblicz optymalne wymiary pojedynczego wybiegu ($$x$$, $$y$$).`,
      (L, x, y) =>
        `Na terenie schroniska wydzielone zostaną trzy wybiegi prostokątne o wspólnych dłuższych ścianach. Dostępne jest $$${L}$$ m siatki. Jakie wymiary ($$x$$, $$y$$) da jeden wybieg dla maksymalnego pola?`,
      (L, x, y) =>
        `Trzy prostokątne wybiegi o wspólnych ścianach wewnętrznych mają być ogrodzone siatką. Dysponujemy $$${L}$$ metrami materiału. Wyznacz $$x$$ i $$y$$ pojedynczego wybiegu dla największego pola.`,
      (L, x, y) =>
        `Wybudowano trzy przylegające do siebie wybiegi prostokątne o wspólnych przegrodach. Na ogrodzenie zużyto $$${L}$$ m siatki. Oblicz wymiary pojedynczego wybiegu dla maksymalnego pola całkowitego.`,
      (L, x, y) =>
        `Zakupiono $$${L}$$ metrów siatki na ogrodzenie trzech identycznych prostokątnych wybiegów z wspólnymi ścianami wewnętrznymi. Znajdź $$x$$ i $$y$$ dające największą powierzchnię.`,
      (L, x, y) =>
        `Teren dzieli się na trzy identyczne prostokątne części przegrodami. Ogrodzenie zewnętrzne i wewnętrzne wymaga $$${L}$$ m siatki. Jakie wymiary wybiegu dadzą maksymalne pole?`,
      (L, x, y) =>
        `Projekt zakłada trzy sąsiednie prostokątne wybiegi o wspólnych dłuższych ścianach. Budżet na siatkę to $$${L}$$ metrów. Wyznacz optymalne $$x$$ i $$y$$ dla maksymalnego pola.`,
      (L, x, y) =>
        `W parku buduje się trzy przylegające wybiegi dla zwierząt o wspólnych ścianach wewnętrznych. Dostępnych jest $$${L}$$ m siatki. Znajdź wymiary $$x$$ i $$y$$ dla maksymalnego pola.`,
      (L, x, y) =>
        `Na farmie planowane są trzy identyczne kwatery prostokątne z przegrodami. Na ogrodzenie przeznaczono $$${L}$$ metrów siatki. Oblicz $$x$$ i $$y$$ dające największe pole.`,
      (L, x, y) =>
        `Osada dla zwierząt wymaga trzech sąsiednich wybiegów prostokątnych. Do ogrodzenia potrzeba $$${L}$$ m siatki. Wyznacz optymalne wymiary pojedynczego wybiegu.`,
      (L, x, y) =>
        `Przedszkolna farma buduje trzy wybiegi dla królików z wspólnymi ścianami. Zakupiono $$${L}$$ m siatki. Jakie wymiary $$x$$ i $$y$$ dadzą największą powierzchnię?`,
      (L, x, y) =>
        `W zoo projektowane są trzy identyczne wybiegi prostokątne o wspólnych dłuższych bokach. Dysponujemy $$${L}$$ metrami siatki. Znajdź optymalne wymiary $$x$$ i $$y$$.`,
      (L, x, y) =>
        `Rolnik buduje trzy sąsiednie zagrody prostokątne dla owiec. Na ogrodzenie ma $$${L}$$ m siatki. Oblicz wymiary pojedynczej zagrody dla maksymalnego pola.`,
      (L, x, y) =>
        `Na terenie hodowli wydziela się trzy identyczne wybiegi z przegrodami. Przeznaczono $$${L}$$ m siatki. Wyznacz $$x$$ i $$y$$ przy maksymalnym polu powierzchni.`,
      (L, x, y) =>
        `Projekt obejmuje trzy połączone prostokątne wybiegi dla koni. Dostępnych jest $$${L}$$ metrów siatki. Znajdź optymalne wymiary jednego wybiegu.`,
      (L, x, y) =>
        `W ośrodku rehabilitacji zwierząt budowane są trzy przylegające wybiegi. Na siatkę przeznaczono $$${L}$$ m. Jakie wymiary dadzą maksymalne pole całkowite?`,
      (L, x, y) =>
        `Trzy sąsiadujące prostokątne wybiegi dla zwierząt domowych mają wspólne przegrody. Dostępnych jest $$${L}$$ m siatki. Wyznacz $$x$$ i $$y$$ dla maksymalnego pola.`,
      (L, x, y) =>
        `Na terenie gospodarstwa agroturystycznego buduje się trzy identyczne wybiegi. Na ogrodzenie przeznaczono $$${L}$$ metrów siatki. Znajdź optymalne wymiary.`,
      (L, x, y) =>
        `W schronisku dla bezdomnych zwierząt planuje się wybudowanie trzech wybiegów o wspólnych ścianach. Dysponujemy $$${L}$$ m siatki. Oblicz $$x$$ i $$y$$.`,
      (L, x, y) =>
        `Trzy identyczne prostokątne wybiegi dla kóz mają być połączone wspólnymi przegrodami. Zakupiono $$${L}$$ m siatki. Jakie wymiary dadzą największe pole?`,
      (L, x, y) =>
        `Hodowla drobiu planuje trzy sąsiednie wybiegi prostokątne. Na siatkę przeznaczono $$${L}$$ metrów. Wyznacz wymiary $$x$$ i $$y$$ dla maksymalnego pola.`,
      (L, x, y) =>
        `Wilanowskie zoo buduje trzy wybiegi dla ptaków z wspólnymi ścianami. Dysponuje $$${L}$$ m siatki. Oblicz optymalne wymiary pojedynczego wybiegu.`,
      (L, x, y) =>
        `Gospodarstwo ekologiczne zakłada trzy wybiegi dla indyków. Przeznaczono $$${L}$$ metrów siatki. Znajdź $$x$$ i $$y$$ dające największą powierzchnię.`,
    ];
  }

  /**
   * Get cuboid problem parameters
   */
  static getCuboidParams(difficulty) {
    if (difficulty === "easy") {
      return { rangeS: [24, 84] };
    } else if (difficulty === "hard") {
      return { rangeS: [24, 600] };
    } else {
      return { rangeS: [24, 360] };
    }
  }

  /**
   * Get cuboid problem templates
   */
  static getCuboidTemplates() {
    return [
      (S, a, h) =>
        `Suma długości wszystkich krawędzi prostopadłościanu o podstawie kwadratowej jest równa $$${S}$$. Oblicz długość krawędzi podstawy $$x$$ tego prostopadłościanu, dla której jego pole powierzchni całkowitej jest największe.`,
      (S, a, h) =>
        `Prostopadłościan o podstawie kwadratowej ma sumę długości wszystkich krawędzi równą $$${S}$$. Znajdź długość krawędzi podstawy $$x$$ przy maksymalnym polu powierzchni.`,
      (S, a, h) =>
        `Dany jest prostopadłościan z kwadratową podstawą, którego suma krawędzi wynosi $$${S}$$. Wyznacz krawędź podstawy $$x$$ dla największego pola powierzchni całkowitej.`,
      (S, a, h) =>
        `Pudełko w kształcie prostopadłościanu ma podstawę kwadratową. Suma długości wszystkich krawędzi to $$${S}$$. Oblicz $$x$$ (krawędź podstawy) przy maksymalnym polu.`,
      (S, a, h) =>
        `Graniastosłup prawidłowy czworokątny (prostopadłościan) ma sumę krawędzi $$${S}$$. Znajdź krawędź podstawy $$x$$, dla której pole powierzchni jest największe.`,
      (S, a, h) =>
        `Kartoniarska firma produkuje pudełka prostopadłościany z kwadratową podstawą. Suma wszystkich krawędzi wynosi $$${S}$$ cm. Wyznacz krawędź podstawy $$x$$ dla największego pola powierzchni.`,
      (S, a, h) =>
        `Prostopadłościan z podstawą kwadratową ma wszystkie krawędzie o sumie $$${S}$$. Jak długa powinna być krawędź podstawy $$x$$, aby pole powierzchni było maksymalne?`,
      (S, a, h) =>
        `Pudełko o podstawie kwadratowej zbudowano tak, że suma krawędzi wynosi $$${S}$$. Oblicz długość krawędzi podstawy $$x$$ przy maksymalnym polu powierzchni całkowitej.`,
      (S, a, h) =>
        `Z drutu o długości $$${S}$$ zbudowano szkielet prostopadłościanu z kwadratową podstawą. Znajdź krawędź podstawy $$x$$, dla której pole powierzchni szkieletu jest największe.`,
      (S, a, h) =>
        `Bryła prostopadłościanu ma kwadratową podstawę i sumę krawędzi równą $$${S}$$. Wyznacz długość krawędzi podstawy $$x$$ dla maksymalnego pola.`,
      (S, a, h) =>
        `Szkielet pudełka zbudowany z drutu ma sumę krawędzi $$${S}$$ cm. Podstawa jest kwadratem. Oblicz $$x$$ dla największego pola powierzchni.`,
      (S, a, h) =>
        `Graniastosłup o podstawie kwadratowej ma wszystkich krawędzi $$${S}$$. Znajdź krawędź podstawy $$x$$ przy maksymalnym polu.`,
      (S, a, h) =>
        `Pudełko kartonowe ma formę prostopadłościanu z kwadratową podstawą. Suma krawędzi wynosi $$${S}$$ mm. Wyznacz $$x$$ dla największego pola.`,
      (S, a, h) =>
        `Konstrukcja prostopadłościanu z podstawą kwadratową ma sumę krawędzi $$${S}$$. Oblicz krawędź podstawy $$x$$ przy maksymalnym polu.`,
      (S, a, h) =>
        `Model prostopadłościanu wykonano z drutu o długości $$${S}$$ cm. Podstawa jest kwadratem. Znajdź $$x$$ dla największego pola.`,
      (S, a, h) =>
        `Pudełko prezentowe ma kształt prostopadłościanu z kwadratową podstawą. Suma krawędzi to $$${S}$$ cm. Wyznacz $$x$$ dla maksymalnego pola.`,
      (S, a, h) =>
        `Szkielet bryły prostopadłościanu ma podstawę kwadratową i sumę krawędzi $$${S}$$. Znajdź $$x$$ dla największego pola powierzchni.`,
      (S, a, h) =>
        `Pudełko na biżuterię to prostopadłościan z kwadratową podstawą. Suma krawędzi to $$${S}$$ mm. Wyznacz krawędź podstawy $$x$$ przy maksymalnym polu.`,
      (S, a, h) =>
        `Konstrukcja z drutu o długości $$${S}$$ ma formę prostopadłościanu z podstawą kwadratową. Oblicz $$x$$ dla największego pola powierzchni.`,
      (S, a, h) =>
        `Pudełko na zapałki to prostopadłościan z podstawą kwadratową. Suma krawędzi szkieletu to $$${S}$$ mm. Wyznacz $$x$$ przy maksymalnym polu.`,
      (S, a, h) =>
        `Kartonowe pudełko ma kształt prostopadłościanu z kwadratową podstawą. Suma wszystkich krawędzi wynosi $$${S}$$ cm. Znajdź $$x$$ dla maksymalnego pola.`,
      (S, a, h) =>
        `Opakowanie na prezent to prostopadłościan z podstawą kwadratową. Suma krawędzi to $$${S}$$ cm. Wyznacz krawędź podstawy $$x$$ przy maksymalnym polu.`,
      (S, a, h) =>
        `Pudełko z tektury ma formę graniastosłupa z kwadratową podstawą. Suma krawędzi wynosi $$${S}$$. Oblicz $$x$$ dla największego pola powierzchni.`,
      (S, a, h) =>
        `Prostopadłościan z kwadratową podstawą ma sumę krawędzi równą $$${S}$$. Znajdź długość krawędzi podstawy $$x$$ dla maksymalnego pola całkowitej powierzchni.`,
      (S, a, h) =>
        `Pudełko transportowe ma podstawę kwadratową i sumę krawędzi $$${S}$$ cm. Wyznacz $$x$$ przy maksymalnym polu powierzchni.`,
      (S, a, h) =>
        `Kartonowe opakowanie w kształcie prostopadłościanu z kwadratową podstawą ma sumę krawędzi $$${S}$$. Oblicz $$x$$ dla największego pola.`,
    ];
  }

  /**
   * Get trapezoid problem parameters
   */
  static getTrapezoidParams(difficulty) {
    if (difficulty === "easy") {
      return { rangeA: [4, 20] };
    } else if (difficulty === "hard") {
      return { rangeA: [4, 60] };
    } else {
      return { rangeA: [4, 40] };
    }
  }

  /**
   * Get trapezoid problem templates
   */
  static getTrapezoidTemplates() {
    return [
      (a, S, h_opt, b_opt) =>
        `Okno ma kształt trapezu równoramiennego. Dłuższa podstawa ma stałą długość $$${a}$$ dm. Suma długości krótszej podstawy i wysokości tego trapezu wynosi $$${S}$$ dm. Oblicz jaką długość powinna mieć wysokość $$h$$ tego okna, aby jego powierzchnia była największa.`,
      (a, S, h_opt, b_opt) =>
        `Witraż w kształcie trapezu równoramiennego ma dłuższą podstawę $$${a}$$ dm. Suma krótszej podstawy i wysokości wynosi $$${S}$$ dm. Znajdź wysokość $$h$$ dla maksymalnego pola witraża.`,
      (a, S, h_opt, b_opt) =>
        `Figura geometryczna w kształcie trapezu równoramiennego ma dłuższą podstawę $$${a}$$ dm. Wiadomo, że krótsza podstawa plus wysokość dają $$${S}$$ dm. Wyznacz $$h$$ przy maksymalnym polu.`,
      (a, S, h_opt, b_opt) =>
        `Projektowane jest okno trapezowe z dłuższą podstawą $$${a}$$ dm. Krótsza podstawa razem z wysokością dają $$${S}$$ dm. Oblicz optymalną wysokość $$h$$ dla największej powierzchni.`,
      (a, S, h_opt, b_opt) =>
        `Trapez równoramienny ma podstawę dolną $$${a}$$ dm. Suma górnej podstawy i wysokości to $$${S}$$ dm. Jakie $$h$$ da maksymalne pole trapezu?`,
      (a, S, h_opt, b_opt) =>
        `Ramka okienna w kształcie trapezu równoramiennego ma podstawę dolną $$${a}$$ dm. Górna podstawa plus wysokość dają $$${S}$$ dm. Znajdź wysokość $$h$$ dla maksymalnego pola.`,
      (a, S, h_opt, b_opt) =>
        `Płachta w kształcie trapezu równoramiennego ma stałą dolną podstawę $$${a}$$ dm. Suma górnej podstawy i wysokości to $$${S}$$ dm. Wyznacz $$h$$ przy największym polu.`,
      (a, S, h_opt, b_opt) =>
        `Element dekoracyjny w kształcie trapezu ma podstawę $$${a}$$ dm. Krótsza podstawa z wysokością dają $$${S}$$ dm. Oblicz $$h$$ dla maksymalnego pola powierzchni.`,
      (a, S, h_opt, b_opt) =>
        `Panel trapezowy ma dłuższą podstawę $$${a}$$ dm. Wiadomo że b + h = $$${S}$$ dm. Jaką wysokość $$h$$ wybrać dla największego pola?`,
      (a, S, h_opt, b_opt) =>
        `Kształt trapezu równoramiennego ma dolną podstawę $$${a}$$ dm. Górna podstawa i wysokość sumują się do $$${S}$$ dm. Znajdź optymalne $$h$$ dla maksymalnego pola.`,
      (a, S, h_opt, b_opt) =>
        `Okno trapezowe w budynku ma dłuższą podstawę $$${a}$$ dm. Suma krótszej podstawy i wysokości to $$${S}$$ dm. Wyznacz $$h$$ dla największej powierzchni.`,
      (a, S, h_opt, b_opt) =>
        `Witraż w oknie ma kształt trapezu o podstawie $$${a}$$ dm. Wiadomo, że b + h = $$${S}$$ dm. Znajdź wysokość $$h$$ przy maksymalnym polu.`,
      (a, S, h_opt, b_opt) =>
        `Forma trapezowa z podstawą $$${a}$$ dm ma warunek b + h = $$${S}$$ dm. Oblicz optymalną wysokość $$h$$ dla maksymalnego pola.`,
      (a, S, h_opt, b_opt) =>
        `Szyba okienna w kształcie trapezu ma dolną podstawę $$${a}$$ dm. Wiadomo, że górna podstawa plus wysokość to $$${S}$$ dm. Wyznacz $$h$$ dla maksymalnego pola.`,
      (a, S, h_opt, b_opt) =>
        `Blat trapezowy ma dłuższą podstawę $$${a}$$ dm. Suma krótszej podstawy i wysokości wynosi $$${S}$$ dm. Znajdź optymalną wysokość $$h$$.`,
    ];
  }

  /**
   * Generate fencing problem distractors
   */
  static generateFencingDistractors(x, y, L) {
    return [
      `x=${x + MathUtils.randomInt(1, 3)} m, y=${Math.max(1, y - MathUtils.randomInt(1, 3))} m`,
      `x=${y} m, y=${x} m`,
      `x=${Math.floor(L / 6)} m, y=${Math.floor(L / 8)} m`,
    ];
  }

  /**
   * Generate cuboid problem distractors
   */
  static generateCuboidDistractors(a, S) {
    return [
      `x = ${a + MathUtils.randomInt(1, 3)}`,
      `x = ${Math.max(1, Math.floor(a / 2))}`,
      `x = ${Math.floor(S / 12) + MathUtils.randomInt(1, 3)}`,
    ];
  }

  /**
   * Generate trapezoid problem distractors
   */
  static generateTrapezoidDistractors(h_opt, b_opt, S) {
    return [
      `h = ${Math.max(1, h_opt - MathUtils.randomInt(1, 4))}`,
      `h = ${b_opt}`,
      `h = ${Math.floor(S / 2)}`,
    ];
  }

  /**
   * Generate fencing problem SVG
   */
  static generateFencingSVG() {
    const size = 300;
    const w = 200;
    const h = 100;
    return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff">
          <rect x="50" y="100" width="${w}" height="${h}" stroke="black" fill="none" stroke-width="2"/>
          <line x1="${50 + w / 3}" y1="100" x2="${50 + w / 3}" y2="${100 + h}" stroke="black" stroke-width="2"/>
          <line x1="${50 + (2 * w) / 3}" y1="100" x2="${50 + (2 * w) / 3}" y2="${100 + h}" stroke="black" stroke-width="2"/>
          <text x="${50 + w / 2}" y="220" font-size="14">3x</text>
          <text x="30" y="${100 + h / 2}" font-size="14">y</text>
      </svg>`;
  }

  /**
   * Generate cuboid problem SVG
   */
  static generateCuboidSVG() {
    const size = 300;
    return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff">
          <rect x="100" y="150" width="100" height="100" stroke="black" fill="none" stroke-width="2"/>
          <line x1="100" y1="150" x2="150" y2="100" stroke="black" stroke-width="2"/>
          <line x1="200" y1="150" x2="250" y2="100" stroke="black" stroke-width="2"/>
          <line x1="200" y1="250" x2="250" y2="200" stroke="black" stroke-width="2"/>
          <rect x="150" y="100" width="100" height="100" stroke="black" fill="none" stroke-width="2" stroke-dasharray="4"/>
          <text x="140" y="270" font-size="14">x</text>
          <text x="210" y="200" font-size="14">h</text>
      </svg>`;
  }

  /**
   * Generate trapezoid problem SVG
   */
  static generateTrapezoidSVG(params) {
    const size = 300;
    const cx = 150;
    const cy = 200;
    const scale = 10;
    const w1 = params.a * scale;
    const w2 = params.b * scale;
    const h = params.h * scale;
    return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff">
          <polygon points="${cx - w2 / 2},${cy - h} ${cx + w2 / 2},${cy - h} ${cx + w1 / 2},${cy} ${cx - w1 / 2},${cy}" stroke="black" fill="none" stroke-width="2"/>
          <line x1="${cx - w2 / 2}" y1="${cy - h}" x2="${cx - w2 / 2}" y2="${cy}" stroke="blue" stroke-dasharray="4"/>
          <text x="${cx}" y="${cy + 20}" font-size="14">a=${params.a}</text>
          <text x="${cx}" y="${cy - h - 10}" font-size="14">b=${params.b}</text>
          <text x="${cx - w2 / 2 - 20}" y="${cy - h / 2}" font-size="14" fill="blue">h</text>
      </svg>`;
  }
}

module.exports = GeometricOptimizationValues;
