const BaseGenerator = require("../../core/BaseGenerator");
const MathUtils = require("../../utils/MathUtils");

class AnalyticGenerator extends BaseGenerator {
  generate() {
    const variants = [
      // --- STARE (9) ---
      "midpoint_length", // Środek i długość odcinka
      "missing_endpoint", // Znajdź drugi koniec mając środek
      "line_equation_2p", // Równanie prostej przez 2 punkty
      "line_parallel", // Prosta równoległa przez punkt
      "line_perpendicular", // Prosta prostopadła przez punkt
      "line_parameter_m", // Parametr m (równoległe/prostopadłe)
      "intersection_point", // Punkt przecięcia prostych
      "perpendicular_bisector", // Symetralna odcinka
      "circle_equation", // Równanie okręgu

      // --- NOWE (11) ---
      "point_on_line_param", // Punkt z parametrem m należy do prostej
      "slope_angle", // Kąt nachylenia prostej (30, 45, 60, 120, 135, 150)
      "parallelogram_vertex", // Czwarty wierzchołek równoległoboku
      "collinear_points", // Współliniowość punktów
      "triangle_area_coords", // Pole trójkąta z wierzchołków
      "circle_tangent_to_axis", // Okrąg styczny do osi OX/OY
      "point_symmetry", // Symetria punktu względem osi
      "distance_unknown_coord", // Długość odcinka z niewiadomą współrzędną
      "intersection_with_axes", // Przecięcie prostej z osiami OX/OY
      "perpendicular_coeff", // Prosty współczynnik prostopadłej (1pkt)
      "radius_from_equation", // Promień z równania (x-a)^2...
    ];

    const selectedVariant = MathUtils.randomElement(variants);

    switch (selectedVariant) {
      // NOWE
      case "point_on_line_param":
        return this.generatePointOnLineParam();
      case "slope_angle":
        return this.generateSlopeAngle();
      case "parallelogram_vertex":
        return this.generateParallelogramVertex();
      case "collinear_points":
        return this.generateCollinearPoints();
      case "triangle_area_coords":
        return this.generateTriangleAreaCoords();
      case "circle_tangent_to_axis":
        return this.generateCircleTangentToAxis();
      case "point_symmetry":
        return this.generatePointSymmetry();
      case "distance_unknown_coord":
        return this.generateDistanceUnknownCoord();
      case "intersection_with_axes":
        return this.generateIntersectionWithAxes();
      case "perpendicular_coeff":
        return this.generatePerpendicularCoeff();
      case "radius_from_equation":
        return this.generateRadiusFromEquation();

      // STARE
      case "missing_endpoint":
        return this.generateMissingEndpoint();
      case "line_parameter_m":
        return this.generateParameterMProblem();
      case "intersection_point":
        return this.generateIntersectionProblem();
      case "circle_equation":
        return this.generateCircleProblem();
      case "line_equation_2p":
        return this.generateLineThroughTwoPoints();
      case "line_parallel":
        return this.generateParallelLine();
      case "line_perpendicular":
        return this.generatePerpendicularLine();
      case "perpendicular_bisector":
        return this.generateBisector();
      case "midpoint_length":
      default:
        return this.generateMidpointProblem();
    }
  }

  // =================================================================
  // NOWE METODY (V3)
  // =================================================================

  // --- 1. PUNKT Z PARAMETREM NALEŻY DO PROSTEJ ---
  generatePointOnLineParam() {
    // A = (m, y) lub (x, m) należy do y = ax + b
    const a = MathUtils.randomInt(-3, 3) || 1;
    const b = MathUtils.randomInt(-5, 5);
    const m = MathUtils.randomInt(-5, 5);

    // Wariant 1: A = (m, knownY) -> szukamy m (x)
    // Wariant 2: A = (knownX, m) -> szukamy m (y)
    const mode = MathUtils.randomElement(["find_x", "find_y"]);

    let P, knownCoord, unknownVar;
    let question;

    const eq = this.formatLineEquation(a, b);

    if (mode === "find_y") {
      const x = MathUtils.randomInt(-4, 4);
      const y = a * x + b;
      P = { x: x, y: "m" };
      question = `Punkt $$P=(${x}, m)$$ należy do wykresu funkcji liniowej $$y=${eq}$$. Liczba $$m$$ jest równa:`;
      return this.createResponse({
        question,
        latex: `y=${eq}`,
        image: null,
        variables: { a, b, x, m_val: y },
        correctAnswer: `${y}`,
        distractors: [`${-y}`, `${x}`, `${a * x}`],
        steps: [
          `Podstawiamy $$x=${x}$$ do wzoru:`,
          `$$m = ${a}\\cdot(${x}) ${b >= 0 ? "+" : ""}${b} = ${a * x + b}$$`,
        ],
      });
    } else {
      // Find x given y. Need to ensure result is nice.
      const y = a * m + b;
      P = { x: "m", y: y };
      question = `Punkt $$P=(m, ${y})$$ należy do prostej o równaniu $$y=${eq}$$. Liczba $$m$$ jest równa:`;
      return this.createResponse({
        question,
        latex: `y=${eq}`,
        image: null,
        variables: { a, b, y, m_val: m },
        correctAnswer: `${m}`,
        distractors: [`${y}`, `${-m}`, `${m + 1}`],
        steps: [
          `Podstawiamy $$y=${y}$$ do wzoru:`,
          `$$${y} = ${a}m ${b >= 0 ? "+" : ""}${b}$$`,
          `$$${a}m = ${y - b}$$`,
          `$$m = ${m}$$`,
        ],
      });
    }
  }

  // --- 2. KĄT NACHYLENIA PROSTEJ ---
  generateSlopeAngle() {
    // a = tan(alpha). Znane kąty: 30, 45, 60, 120, 135, 150
    const angles = [
      { ang: 30, tan: "\\frac{\\sqrt{3}}{3}", val: Math.sqrt(3) / 3 },
      { ang: 45, tan: "1", val: 1 },
      { ang: 60, tan: "\\sqrt{3}", val: Math.sqrt(3) },
      { ang: 120, tan: "-\\sqrt{3}", val: -Math.sqrt(3) },
      { ang: 135, tan: "-1", val: -1 },
      { ang: 150, tan: "-\\frac{\\sqrt{3}}{3}", val: -Math.sqrt(3) / 3 },
    ];
    const sel = MathUtils.randomElement(angles);
    const b = MathUtils.randomInt(-4, 4);

    // Formatowanie równania z pierwiastkiem
    const aStr = sel.tan;
    const bStr = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
    const eq =
      aStr === "1"
        ? `x ${bStr}`
        : aStr === "-1"
          ? `-x ${bStr}`
          : `${aStr}x ${bStr}`;

    return this.createResponse({
      question: `Prosta o równaniu $$y = ${eq}$$ tworzy z osią $$Ox$$ kąt $$\\alpha$$. Miara tego kąta jest równa:`,
      latex: ``,
      image: null,
      variables: { angle: sel.ang, a_latex: sel.tan },
      correctAnswer: `${sel.ang}^\\circ`,
      distractors: [
        `${180 - sel.ang}^\\circ`,
        `${90 - sel.ang}^\\circ`,
        `${sel.ang > 90 ? sel.ang - 90 : sel.ang + 30}^\\circ`,
      ],
      steps: [
        `Współczynnik kierunkowy prostej $$a = \\tg\\alpha$$.`,
        `Z równania odczytujemy $$a = ${sel.tan}$$.`,
        `Z tablic trygonometrycznych: $$\\tg ${sel.ang}^\\circ = ${sel.tan}$$.`,
        `Odp: $$\\alpha = ${sel.ang}^\\circ$$`,
      ],
    });
  }

  // --- 3. CZWARTY WIERZCHOŁEK RÓWNOLEGŁOBOKU ---
  generateParallelogramVertex() {
    // A, B, C dane. D = A + C - B (wektorowo)
    const A = { x: MathUtils.randomInt(-5, 5), y: MathUtils.randomInt(-5, 5) };
    const B = {
      x: A.x + MathUtils.randomInt(2, 6),
      y: A.y + MathUtils.randomInt(-2, 4),
    };
    const C = {
      x: B.x + MathUtils.randomInt(-2, 4),
      y: B.y + MathUtils.randomInt(3, 7),
    };

    // Srodkiem przekatnej AC jest S = (A+C)/2. Srodkiem BD tez jest S.
    // (xA + xC)/2 = (xB + xD)/2 => xD = xA + xC - xB
    const D = {
      x: A.x + C.x - B.x,
      y: A.y + C.y - B.y,
    };

    return this.createResponse({
      question: `Punkty $$A=(${A.x}, ${A.y}), B=(${B.x}, ${B.y}), C=(${C.x}, ${C.y})$$ są kolejnymi wierzchołkami równoległoboku $$ABCD$$. Współrzędne wierzchołka $$D$$ są równe:`,
      latex: ``,
      image: this.generateSVG({ type: "parallelogram_points", A, B, C, D }),
      variables: { A, B, C, D },
      correctAnswer: `(${D.x}, ${D.y})`,
      distractors: [
        `(${B.x + C.x - A.x}, ${B.y + C.y - A.y})`, // Zła kolejność
        `(${A.x + B.x - C.x}, ${A.y + B.y - C.y})`,
        `(${(A.x + C.x) / 2}, ${(A.y + C.y) / 2})`, // Środek przekątnej
      ],
      steps: [
        `W równoległoboku przekątne $$AC$$ i $$BD$$ dzielą się na połowy.`,
        `Środek $$S$$ odcinka $$AC$$: $$S = (\\frac{${A.x}+${C.x}}{2}, \\frac{${A.y}+${C.y}}{2}) = (\\frac{${A.x + C.x}}{2}, \\frac{${A.y + C.y}}{2})$$`,
        `Ten sam punkt $$S$$ jest środkiem $$BD$$: $$\\frac{${B.x}+x_D}{2} = \\frac{${A.x + C.x}}{2} \\implies x_D = ${A.x + C.x} - ${B.x} = ${D.x}$$`,
        `Analogicznie dla y: $$y_D = ${A.y + C.y} - ${B.y} = ${D.y}$$`,
        `Odp: $$D=(${D.x}, ${D.y})$$`,
      ],
    });
  }

  // --- 4. WSPÓŁLINIOWOŚĆ PUNKTÓW ---
  generateCollinearPoints() {
    // Sprawdź dla jakiego m punkty są współliniowe
    // Lub: Czy punkty A, B, C są współliniowe?

    // Zróbmy z parametrem m, bo to częstsze.
    // A, B ustalone. C = (m, val) lub (val, m).
    // Prosta AB: y = ax + b. C musi spełniać równanie.
    const { A, B, a, b } = this.generateNiceLinePoints(); // a, b są współczynnikami prostej AB

    const m = MathUtils.randomInt(-5, 5);
    // C leży na prostej:
    const Cy = a * m + b;
    const C = { x: "m", y: Cy };

    // Uwaga: Cy może być ułamkiem jeśli a jest ułamkiem.
    // Aby uniknąć ułamków w pytaniu, zróbmy a całkowite.
    // W generateNiceLinePoints a jest ułamkiem.

    // Prostsze podejście:
    // A, B całkowite. a = int.
    const a_int = MathUtils.randomInt(-3, 3) || 1;
    const b_int = MathUtils.randomInt(-5, 5);
    const A2 = { x: 1, y: a_int * 1 + b_int };
    const B2 = { x: 3, y: a_int * 3 + b_int };

    const m_sol = MathUtils.randomInt(-4, 4);
    const C_val = a_int * m_sol + b_int; // y

    // Pytanie: Dla jakiego m punkt C=(m, C_val) leży na prostej AB?

    return this.createResponse({
      question: `Punkty $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$ i $$C=(m, ${C_val})$$ są współliniowe. Wynika stąd, że:`,
      latex: ``,
      image: null,
      variables: { A2, B2, m_sol, C_val },
      correctAnswer: `m = ${m_sol}`,
      distractors: [`m = ${m_sol + 1}`, `m = ${-m_sol}`, `m = 0`],
      steps: [
        `Wyznaczamy równanie prostej $$AB$$: $$y = ax + b$$.`,
        `$$a = \\frac{${B2.y} - ${A2.y}}{${B2.x} - ${A2.x}} = ${a_int}$$`,
        `$$b = y_A - a x_A = ${A2.y} - ${a_int}\\cdot${A2.x} = ${b_int}$$`,
        `Prosta: $$y = ${a_int}x ${b_int >= 0 ? "+" : ""}${b_int}$$`,
        `Punkt $$C=(m, ${C_val})$$ należy do prostej, więc podstawiamy:`,
        `$$${C_val} = ${a_int}m ${b_int >= 0 ? "+" : ""}${b_int}$$`,
        `$$${a_int}m = ${C_val - b_int} \\implies m = ${m_sol}$$`,
      ],
    });
  }

  // --- 5. POLE TRÓJKĄTA W UKŁADZIE ---
  generateTriangleAreaCoords() {
    // Prosty przypadek: podstawa pozioma lub pionowa.
    // A=(x1, y), B=(x2, y), C=(x3, y3).
    // Podstawa |AB| = |x2 - x1|. Wysokość h = |y3 - y|.

    const y_base = MathUtils.randomInt(-4, 4);
    const x1 = MathUtils.randomInt(-6, 0);
    const x2 = x1 + MathUtils.randomInt(3, 8); // x2 > x1
    const x3 = MathUtils.randomInt(-5, 5);
    const y3 = y_base + MathUtils.randomElement([-3, -4, -5, 3, 4, 5]); // y3 != y_base

    const base = Math.abs(x2 - x1);
    const h = Math.abs(y3 - y_base);
    const area = 0.5 * base * h;

    return this.createResponse({
      question: `W układzie współrzędnych dane są punkty $$A=(${x1}, ${y_base}), B=(${x2}, ${y_base}), C=(${x3}, ${y3})$$. Pole trójkąta $$ABC$$ jest równe:`,
      latex: ``,
      image: this.generateSVG({
        type: "triangle_coords",
        A: { x: x1, y: y_base },
        B: { x: x2, y: y_base },
        C: { x: x3, y: y3 },
      }),
      variables: { base, h, area },
      correctAnswer: `${area}`,
      distractors: [`${area * 2}`, `${area + 2}`, `${base + h}`],
      steps: [
        `Zauważmy, że punkty $$A$$ i $$B$$ mają tę samą rzędną $$y=${y_base}$$.`,
        `Długość podstawy $$AB$$: $$|AB| = |${x2} - (${x1})| = ${base}$$.`,
        `Wysokość $$h$$ opuszczona z wierzchołka $$C$$ to odległość $$C$$ od prostej $$AB$$ (czyli od prostej $$y=${y_base}$$).`,
        `$$h = |${y3} - ${y_base}| = ${h}$$`,
        `Pole: $$P = \\frac{1}{2} \\cdot ${base} \\cdot ${h} = ${area}$$`,
      ],
    });
  }

  // --- 6. OKRĄG STYCZNY DO OSI ---
  generateCircleTangentToAxis() {
    // S=(a,b). Styczny do OX => r=|b|. Styczny do OY => r=|a|.
    const axis = MathUtils.randomElement(["Ox", "Oy"]);
    const S = { x: MathUtils.randomInt(-5, 5), y: MathUtils.randomInt(-5, 5) };
    // Unikamy 0 na osiach
    if (S.x === 0) S.x = 2;
    if (S.y === 0) S.y = -3;

    const r = axis === "Ox" ? Math.abs(S.y) : Math.abs(S.x);

    const eq = `(x ${S.x > 0 ? "-" : "+"} ${Math.abs(S.x)})^2 + (y ${S.y > 0 ? "-" : "+"} ${Math.abs(S.y)})^2 = ${r * r}`;

    return this.createResponse({
      question: `Okrąg o środku $$S=(${S.x}, ${S.y})$$ jest styczny do osi $$${axis}$$ układu współrzędnych. Promień tego okręgu jest równy:`,
      latex: ``,
      image: this.generateSVG({ type: "circle", S, r }), // Używamy istniejącego rysowania okręgu
      variables: { S, axis, r },
      correctAnswer: `${r}`,
      distractors: [
        `${axis === "Ox" ? Math.abs(S.x) : Math.abs(S.y)}`, // Pomyłka współrzędnych
        `${r * r}`,
        `${Math.sqrt(S.x * S.x + S.y * S.y).toFixed(1)}`, // Odległość od (0,0)
      ],
      steps: [
        `Odległość środka $$S=(${S.x}, ${S.y})$$ od osi $$${axis}$$ jest równa promieniowi.`,
        axis === "Ox"
          ? `Dla osi $$Ox$$ ta odległość to moduł z współrzędnej $$y$$: $$r = |${S.y}| = ${r}$$`
          : `Dla osi $$Oy$$ ta odległość to moduł z współrzędnej $$x$$: $$r = |${S.x}| = ${r}$$`,
      ],
    });
  }

  // --- 7. SYMETRIA PUNKTU ---
  generatePointSymmetry() {
    const P = { x: MathUtils.randomInt(-6, 6), y: MathUtils.randomInt(-6, 6) };
    const type = MathUtils.randomElement(["Ox", "Oy", "(0,0)"]);

    let resX, resY;
    if (type === "Ox") {
      resX = P.x;
      resY = -P.y;
    } else if (type === "Oy") {
      resX = -P.x;
      resY = P.y;
    } else {
      resX = -P.x;
      resY = -P.y;
    } // (0,0)

    return this.createResponse({
      question: `Punkt $$P'$$ jest obrazem punktu $$P=(${P.x}, ${P.y})$$ w symetrii względem ${type === "(0,0)" ? "początku układu współrzędnych" : `osi $$${type}$$`}. Współrzędne punktu $$P'$$ to:`,
      latex: ``,
      image: null,
      variables: { P, type },
      correctAnswer: `(${resX}, ${resY})`,
      distractors: [
        `(${P.x}, ${P.y})`,
        `(${-resX}, ${-resY})`,
        `(${P.y}, ${P.x})`,
      ],
      steps: [
        type === "Ox"
          ? `Symetria względem $$Ox$$ zmienia znak $$y$$: $$(x, -y)$$`
          : "",
        type === "Oy"
          ? `Symetria względem $$Oy$$ zmienia znak $$x$$: $$(-x, y)$$`
          : "",
        type === "(0,0)"
          ? `Symetria środkowa względem $$(0,0)$$ zmienia znaki obu współrzędnych: $$(-x, -y)$$`
          : "",
        `Odp: $$(${resX}, ${resY})$$`,
      ],
    });
  }

  // --- 8. DŁUGOŚĆ ODCINKA Z NIEWIADOMĄ ---
  generateDistanceUnknownCoord() {
    // |AB| = d. A=(x1, y1), B=(x2, m). Oblicz m.
    const x1 = 1,
      y1 = 2;
    // Dobieramy trójkę pitagorejską, np. 3, 4, 5. dx=3, dy=4, d=5.
    const triple = MathUtils.randomElement([
      [3, 4, 5],
      [6, 8, 10],
      [5, 12, 13],
    ]);
    const dx = triple[0];
    const dy = triple[1];
    const d = triple[2];

    const x2 = x1 + dx;
    const m = y1 + dy; // Jedno z rozwiązań

    return this.createResponse({
      question: `Punkty $$A=(${x1}, ${y1})$$ i $$B=(${x2}, m)$$ są odległe o $$${d}$$. Jedną z możliwych wartości $$m$$ jest:`,
      latex: `|AB|=${d}`,
      image: null,
      variables: { x1, y1, x2, m, d },
      correctAnswer: `${m}`,
      distractors: [`${m + 2}`, `${y1}`, `${x2}`],
      steps: [
        `Wzór na długość: $$|AB| = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$$`,
        `$$${d} = \\sqrt{(${x2}-${x1})^2 + (m-${y1})^2}$$`,
        `$$${d}^2 = ${dx}^2 + (m-${y1})^2 \\implies ${d * d} = ${dx * dx} + (m-${y1})^2$$`,
        `$$(m-${y1})^2 = ${d * d - dx * dx} = ${dy * dy}$$`,
        `$$m-${y1} = ${dy}$$ lub $$m-${y1} = -${dy}$$`,
        `$$m = ${y1 + dy}$$ lub $$m = ${y1 - dy}$$`,
      ],
    });
  }

  // --- 9. PRZECIĘCIE Z OSIAMI ---
  generateIntersectionWithAxes() {
    // Prosta y = ax + b. Przecięcie z OY -> (0, b). Z OX -> (-b/a, 0).
    const b = MathUtils.randomInt(-6, 6);
    // a dobieramy tak, by miejsce zerowe było ładne.
    const root = MathUtils.randomInt(-6, 6);
    // 0 = a*root + b => a = -b/root
    if (root === 0) {
      // Unikamy dzielenia przez 0, restart
      return this.generateIntersectionWithAxes();
    }
    const a = -b / root;
    if (!Number.isInteger(a)) {
      // Jeśli a brzydkie, to po prostu losujemy a i b, trudno
      // Wróćmy do prostych liczb.
      return this.generateIntersectionWithAxes();
    }

    const axis = MathUtils.randomElement(["Ox", "Oy"]);
    const eq = this.formatLineEquation(a, b);

    return this.createResponse({
      question: `Punkt przecięcia prostej $$y=${eq}$$ z osią $$${axis}$$ ma współrzędne:`,
      latex: ``,
      image: null,
      variables: { a, b, axis },
      correctAnswer: axis === "Oy" ? `(0, ${b})` : `(${root}, 0)`,
      distractors: [
        axis === "Oy" ? `(${b}, 0)` : `(0, ${root})`, // Zamiana
        `(0, 0)`,
        axis === "Oy" ? `(0, ${-b})` : `(${-root}, 0)`, // Zły znak
      ],
      steps: [
        axis === "Oy"
          ? `Z osią $$Oy$$ przecinamy się, gdy $$x=0$$.`
          : `Z osią $$Ox$$ przecinamy się, gdy $$y=0$$.`,
        axis === "Oy"
          ? `$$y = ${a}\\cdot 0 ${b >= 0 ? "+" : ""}${b} = ${b}$$`
          : `$$0 = ${a}x ${b >= 0 ? "+" : ""}${b} \\implies ${a}x = ${-b} \\implies x = ${root}$$`,
      ],
    });
  }

  // --- 10. WSPÓŁCZYNNIK KIERUNKOWY PROSTOPADŁEJ ---
  generatePerpendicularCoeff() {
    // a1 = m/n. a2 = -n/m.
    const num = MathUtils.randomElement([1, 2, 3]);
    const den = MathUtils.randomElement([2, 3, 4, 5]);
    const sign = MathUtils.randomElement([1, -1]);

    const a1 = (sign * num) / den;
    const a1_latex =
      (sign < 0 ? "-" : "") +
      (num === 1 && den === 1 ? "1" : `\\frac{${num}}{${den}}`);

    const a2_latex = (sign < 0 ? "" : "-") + `\\frac{${den}}{${num}}`; // Odwrotny i przeciwny

    return this.createResponse({
      question: `Współczynnik kierunkowy prostej prostopadłej do prostej określonej wzorem $$y = ${a1_latex}x + 5$$ jest równy:`,
      latex: ``,
      image: null,
      variables: { a1 },
      correctAnswer: a2_latex,
      distractors: [
        a1_latex, // Równoległa
        (sign < 0 ? "" : "-") +
          (num === 1 && den === 1 ? "1" : `\\frac{${num}}{${den}}`), // Tylko znak zmieniony
        (sign < 0 ? "-" : "") + `\\frac{${den}}{${num}}`, // Tylko odwrotność
      ],
      steps: [
        `Warunek prostopadłości: $$a_1 \\cdot a_2 = -1$$`,
        `$$a_2 = -\\frac{1}{a_1} = -\\frac{1}{${a1_latex}} = ${a2_latex}$$`,
      ],
    });
  }

  // --- 11. PROMIEŃ Z RÓWNANIA OKRĘGU ---
  generateRadiusFromEquation() {
    // (x-a)^2 + (y-b)^2 = r^2
    // Czasem r^2 to np. 5 (promień sqrt(5)).
    const rSq = MathUtils.randomElement([4, 9, 16, 25, 2, 3, 5, 8]);
    const rStr = Number.isInteger(Math.sqrt(rSq))
      ? `${Math.sqrt(rSq)}`
      : `\\sqrt{${rSq}}`;

    return this.createResponse({
      question: `Promień okręgu o równaniu $$(x-1)^2 + (y+2)^2 = ${rSq}$$ jest równy:`,
      latex: ``,
      image: null,
      variables: { rSq },
      correctAnswer: rStr,
      distractors: [`${rSq}`, `${rSq / 2}`, `${rSq * 2}`],
      steps: [
        `Równanie okręgu: $$(x-a)^2 + (y-b)^2 = r^2$$`,
        `$$r^2 = ${rSq} \\implies r = \\sqrt{${rSq}} = ${rStr}$$`,
      ],
    });
  }

  // --- STARE METODY (BEZ ZMIAN) ---
  generateMidpointProblem() {
    const A = { x: MathUtils.randomInt(-6, 6), y: MathUtils.randomInt(-6, 6) };
    const S = { x: MathUtils.randomInt(-4, 4), y: MathUtils.randomInt(-4, 4) };
    const B = { x: 2 * S.x - A.x, y: 2 * S.y - A.y };
    const lengthSquared = Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2);
    const lengthStr = Number.isInteger(Math.sqrt(lengthSquared))
      ? `${Math.sqrt(lengthSquared)}`
      : `\\sqrt{${lengthSquared}}`;
    return this.createResponse({
      question:
        "Dane są punkty $$A$$ i $$B$$. Oblicz środek i długość odcinka.",
      latex: `A=(${A.x}, ${A.y}), B=(${B.x}, ${B.y})`,
      image: this.generateSVG({ type: "segment", A, B, S }),
      variables: { A, B, S },
      correctAnswer: `S=(${S.x}, ${S.y}), |AB|=${lengthStr}`,
      distractors: [
        `S=(${S.x}, ${S.y}), |AB|=${lengthSquared}`,
        `S=(${B.x - A.x}, ${B.y - A.y}), |AB|=${lengthStr}`,
        `S=(${S.y}, ${S.x}), |AB|=${lengthStr}`,
      ],
      steps: [
        `$$S=(\\frac{${A.x}+${B.x}}{2}, \\frac{${A.y}+${B.y}}{2})=(${S.x}, ${S.y})$$`,
        `$$|AB|=\\sqrt{(${B.x}-${A.x})^2+(${B.y}-${A.y})^2}=${lengthStr}$$`,
      ],
    });
  }

  generateMissingEndpoint() {
    const A = { x: MathUtils.randomInt(-6, 6), y: MathUtils.randomInt(-6, 6) };
    const S = { x: MathUtils.randomInt(-4, 4), y: MathUtils.randomInt(-4, 4) };
    const B = { x: 2 * S.x - A.x, y: 2 * S.y - A.y };
    return this.createResponse({
      question: "Punkt S jest środkiem odcinka AB. Znając A i S oblicz B.",
      latex: `S=(${S.x}, ${S.y}), A=(${A.x}, ${A.y})`,
      image: this.generateSVG({ type: "segment", A, B, S }),
      variables: { A, B, S },
      correctAnswer: `B=(${B.x}, ${B.y})`,
      distractors: [
        `B=(${S.x - A.x}, ${S.y - A.y})`,
        `B=(\\frac{${A.x}+${S.x}}{2}, \\frac{${A.y}+${S.y}}{2})`,
        `B=(${A.x}, ${A.y})`,
      ],
      steps: [`$$x_B = 2x_S - x_A = ${B.x}$$`, `$$y_B = 2y_S - y_A = ${B.y}$$`],
    });
  }

  generateParameterMProblem() {
    const mode = MathUtils.randomElement(["parallel", "perpendicular"]);
    const m = MathUtils.randomInt(-3, 3);
    const a1_coeff = MathUtils.randomElement([2, 3]);
    const a1_const = MathUtils.randomInt(-2, 2);
    const a1 = a1_coeff * m + a1_const;
    const a2 = mode === "parallel" ? a1 : a1 !== 0 ? -1 / a1 : 1;
    // Uproszczenie dla formatowania - zakładamy ładne liczby w generate
    return this.createResponse({
      question: `Proste są ${mode}. Oblicz m.`,
      latex: `l: y=(${a1_coeff}m ${a1_const >= 0 ? "+" : ""}${a1_const})x+1, k: y=${this.fractionToLatex(a2)}x-2`,
      image: null,
      variables: { m },
      correctAnswer: `m=${m}`,
      distractors: [`m=${m + 1}`, `m=${-m}`, `m=0`],
      steps: [
        `Warunek: $${mode === "parallel" ? "a_1=a_2" : "a_1 a_2 = -1"}$$`,
      ],
    });
  }

  generateIntersectionProblem() {
    const intX = MathUtils.randomInt(-4, 4),
      intY = MathUtils.randomInt(-4, 4);
    const a1 = 1,
      b1 = intY - a1 * intX;
    const a2 = -1,
      b2 = intY - a2 * intX;
    return this.createResponse({
      question: "Punkt przecięcia prostych:",
      latex: `y=x${b1 >= 0 ? "+" : ""}${b1}, y=-x${b2 >= 0 ? "+" : ""}${b2}`,
      image: this.generateSVG({
        type: "lines_intersection",
        a1,
        b1,
        a2,
        b2,
        P: { x: intX, y: intY },
      }),
      variables: { intX, intY },
      correctAnswer: `(${intX}, ${intY})`,
      distractors: [`(${intY}, ${intX})`, `(0,0)`, `(${intX}, 0)`],
      steps: [
        `$$x${b1 >= 0 ? "+" : ""}${b1} = -x${b2 >= 0 ? "+" : ""}${b2} \\implies 2x=${b2 - b1} \\implies x=${intX}$$`,
      ],
    });
  }

  generateCircleProblem() {
    const S = { x: 2, y: -3 },
      r = 4;
    return this.createResponse({
      question: "Środek i promień okręgu:",
      latex: `(x-2)^2 + (y+3)^2 = 16`,
      image: this.generateSVG({ type: "circle", S, r }),
      variables: { S, r },
      correctAnswer: `S=(2,-3), r=4`,
      distractors: [`S=(-2,3), r=4`, `S=(2,-3), r=16`, `S=(2,3), r=2`],
      steps: [`$$(x-a)^2+(y-b)^2=r^2$$`],
    });
  }

  generateLineThroughTwoPoints() {
    const { A, B, a, b } = this.generateNiceLinePoints();
    const eq = this.formatLineEquation(a, b);
    return this.createResponse({
      question: "Równanie prostej przez punkty:",
      latex: `A=(${A.x}, ${A.y}), B=(${B.x}, ${B.y})`,
      image: this.generateSVG({ type: "line", A, B }),
      variables: { A, B, a, b },
      correctAnswer: `y = ${eq}`,
      distractors: [
        `y = ${this.formatLineEquation(-a, b)}`,
        `y = ${this.formatLineEquation(a, -b)}`,
        `y = ${this.formatLineEquation(b, a)}`,
      ],
      steps: [`$$a = \\frac{${B.y}-${A.y}}{${B.x}-${A.x}}$$`, `$$y = ${eq}$$`],
    });
  }

  generateParallelLine() {
    return this.generateRelativeLine("parallel");
  }
  generatePerpendicularLine() {
    return this.generateRelativeLine("perpendicular");
  }

  generateRelativeLine(mode) {
    const a1 = MathUtils.randomInt(-3, 3) || 1;
    const b1 = 2;
    const P = { x: 2, y: 3 };
    const a2 = mode === "parallel" ? a1 : -1 / a1;
    const b2 = P.y - a2 * P.x;
    const eq2 = this.formatLineEquation(a2, b2);
    return this.createResponse({
      question: `Prosta przez P ${mode === "parallel" ? "równoległa" : "prostopadła"} do k:`,
      latex: `k: y=${a1}x+${b1}, P(2,3)`,
      image: null,
      variables: { a2, b2 },
      correctAnswer: `y=${eq2}`,
      distractors: [`y=${a1}x`, `y=${-a1}x+3`, `y=x+1`],
      steps: [
        `$$a_2=${this.fractionToLatex(a2)}$$`,
        `$$b_2=${this.fractionToLatex(b2)}$$`,
      ],
    });
  }

  generateBisector() {
    const A = { x: -2, y: 0 },
      B = { x: 2, y: 4 },
      S = { x: 0, y: 2 };
    const a_sym = -1;
    const b_sym = 2;
    return this.createResponse({
      question: "Symetralna odcinka AB:",
      latex: `A(-2,0), B(2,4)`,
      image: null,
      variables: { S },
      correctAnswer: `y=-x+2`,
      distractors: [`y=x+2`, `y=-x`, `y=x`],
      steps: [`Środek S(0,2)`, `a_{AB}=1 \\implies a_{sym}=-1`],
    });
  }

  // --- HELPERY ---
  generateNiceLinePoints() {
    const x1 = MathUtils.randomInt(-5, 5),
      y1 = MathUtils.randomInt(-5, 5);
    const dx = MathUtils.randomElement([1, 2, 3]),
      dy = MathUtils.randomInt(-4, 4);
    return {
      A: { x: x1, y: y1 },
      B: { x: x1 + dx, y: y1 + dy },
      a: dy / dx,
      b: y1 - (dy / dx) * x1,
    };
  }

  formatLineEquation(a, b) {
    const aStr = this.fractionToLatex(a);
    if (a === 0) return this.fractionToLatex(b);
    let xPart = aStr === "1" ? "x" : aStr === "-1" ? "-x" : `${aStr}x`;
    if (b === 0) return xPart;
    return `${xPart} ${b > 0 ? "+" : "-"} ${this.fractionToLatex(Math.abs(b))}`;
  }

  fractionToLatex(val) {
    if (Number.isInteger(val)) return `${val}`;
    if (Math.abs(val - 0.5) < 0.001) return "\\frac{1}{2}";
    if (Math.abs(val + 0.5) < 0.001) return "-\\frac{1}{2}";
    if (Math.abs(val - 1 / 3) < 0.001) return "\\frac{1}{3}";
    if (Math.abs(val + 1 / 3) < 0.001) return "-\\frac{1}{3}";
    return parseFloat(val.toFixed(2));
  }

  generateSVG(params) {
    const size = 300;
    const center = size / 2;
    const scale = 20;
    const toSVG = (p) => ({ x: center + p.x * scale, y: center - p.y * scale });
    let content = "";
    const drawLine = (a, b, color, dash) => {
      const x1 = -10,
        x2 = 10;
      const p1 = toSVG({ x: x1, y: a * x1 + b }),
        p2 = toSVG({ x: x2, y: a * x2 + b });
      return `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${color}" stroke-width="2" ${dash ? 'stroke-dasharray="4"' : ""}/>`;
    };

    if (params.type === "segment" || params.type === "bisector") {
      const A = toSVG(params.A),
        B = toSVG(params.B);
      content += `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="black" stroke-width="2" />`;
      content += `<circle cx="${A.x}" cy="${A.y}" r="3" fill="blue" /><text x="${A.x + 5}" y="${A.y - 5}" font-size="10">A</text>`;
      content += `<circle cx="${B.x}" cy="${B.y}" r="3" fill="blue" /><text x="${B.x + 5}" y="${B.y - 5}" font-size="10">B</text>`;
      if (params.S) {
        const S = toSVG(params.S);
        content += `<circle cx="${S.x}" cy="${S.y}" r="3" fill="red" /><text x="${S.x + 5}" y="${S.y - 10}" font-size="10" fill="red">S</text>`;
      }
      if (params.type === "bisector")
        content += drawLine(params.a_sym, params.b_sym, "green", true);
    }

    if (
      params.type === "line" ||
      params.type === "lines_relative" ||
      params.type === "lines_intersection"
    ) {
      if (params.a !== undefined)
        content += drawLine(params.a, params.b, "blue");
      if (params.a1 !== undefined)
        content += drawLine(params.a1, params.b1, "black");
      if (params.a2 !== undefined)
        content += drawLine(params.a2, params.b2, "blue", true);
      if (params.P) {
        const P = toSVG(params.P);
        content += `<circle cx="${P.x}" cy="${P.y}" r="4" fill="red" /><text x="${P.x + 5}" y="${P.y - 5}" font-size="12">P</text>`;
      }
    }

    if (params.type === "circle") {
      const S = toSVG(params.S);
      content += `<circle cx="${S.x}" cy="${S.y}" r="${params.r * scale}" stroke="blue" stroke-width="2" fill="none" />`;
      content += `<circle cx="${S.x}" cy="${S.y}" r="3" fill="red" /><text x="${S.x + 5}" y="${S.y - 5}" font-size="12">S</text>`;
    }

    if (params.type === "parallelogram_points") {
      const A = toSVG(params.A),
        B = toSVG(params.B),
        C = toSVG(params.C),
        D = toSVG(params.D);
      content += `<polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}" stroke="black" fill="none" stroke-width="2" />`;
      content += `<circle cx="${A.x}" cy="${A.y}" r="3" fill="blue"/><text x="${A.x}" y="${A.y - 5}">A</text>`;
      content += `<circle cx="${B.x}" cy="${B.y}" r="3" fill="blue"/><text x="${B.x}" y="${B.y - 5}">B</text>`;
      content += `<circle cx="${C.x}" cy="${C.y}" r="3" fill="blue"/><text x="${C.x}" y="${C.y - 5}">C</text>`;
      content += `<circle cx="${D.x}" cy="${D.y}" r="3" fill="red"/><text x="${D.x}" y="${D.y - 5}">D</text>`;
    }

    if (params.type === "triangle_coords") {
      const A = toSVG(params.A),
        B = toSVG(params.B),
        C = toSVG(params.C);
      content += `<polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}" stroke="black" fill="rgba(0,0,255,0.1)" stroke-width="2" />`;
      content += `<circle cx="${A.x}" cy="${A.y}" r="3" fill="black"/><text x="${A.x}" y="${A.y + 15}">A</text>`;
      content += `<circle cx="${B.x}" cy="${B.y}" r="3" fill="black"/><text x="${B.x}" y="${B.y + 15}">B</text>`;
      content += `<circle cx="${C.x}" cy="${C.y}" r="3" fill="black"/><text x="${C.x}" y="${C.y - 5}">C</text>`;
    }

    return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff"><line x1="0" y1="${center}" x2="${size}" y2="${center}" stroke="#aaa" stroke-width="1" /><line x1="${center}" y1="0" x2="${center}" y2="${size}" stroke="#aaa" stroke-width="1" />${content}</svg>`;
  }
}

module.exports = AnalyticGenerator;
