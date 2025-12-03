const BaseGenerator = require("../../core/BaseGenerator");
const MathUtils = require("../../utils/MathUtils");

class StereometryGenerator extends BaseGenerator {
  generate() {
    const variants = [
      // STARE (9)
      "cube_features", // Sześcian: przekątna, objętość
      "cuboid_angle", // Kąt nachylenia przekątnej prostopadłościanu
      "cone_basics", // Stożek: l^2 = h^2 + r^2
      "cylinder_volume", // Walec: przekrój kwadratem
      "solid_scaling", // Jak zmienia się objętość przy skalowaniu
      "pyramid_square", // Ostrosłup praw. czworokątny (kąt krawędzi)
      "pyramid_triangle", // Ostrosłup praw. trójkątny (kąt ściany)
      "prism_triangle", // Graniastosłup praw. trójkątny
      "sphere_calc", // Kula

      // NOWE (4)
      "cuboid_diagonal", // Długość przekątnej prostopadłościanu
      "tetrahedron_regular", // Czworościan foremny (wysokość/pole)
      "pyramid_face_angle", // Kąt nachylenia ściany bocznej (ostrosłup czworokątny)
      "cylinder_section_diagonal", // Przekątna przekroju osiowego walca
    ];

    const selectedVariant = MathUtils.randomElement(variants);

    switch (selectedVariant) {
      // NOWE
      case "cuboid_diagonal":
        return this.generateCuboidDiagonal();
      case "tetrahedron_regular":
        return this.generateTetrahedronRegular();
      case "pyramid_face_angle":
        return this.generatePyramidFaceAngle();
      case "cylinder_section_diagonal":
        return this.generateCylinderSectionDiagonal();

      // STARE
      case "cuboid_angle":
        return this.generateCuboidAngle();
      case "cone_basics":
        return this.generateConeProblem();
      case "cylinder_volume":
        return this.generateCylinderProblem();
      case "solid_scaling":
        return this.generateScalingProblem();
      case "pyramid_square":
        return this.generatePyramidSquare();
      case "pyramid_triangle":
        return this.generatePyramidTriangle();
      case "prism_triangle":
        return this.generatePrismTriangle();
      case "sphere_calc":
        return this.generateSphereProblem();
      case "cube_features":
      default:
        return this.generateCubeProblem();
    }
  }

  // =================================================================
  // NOWE METODY (V3)
  // =================================================================

  // --- 1. PRZEKĄTNA PROSTOPADŁOŚCIANU ---
  generateCuboidDiagonal() {
    // d = sqrt(a^2 + b^2 + c^2)
    const a = MathUtils.randomInt(2, 6);
    const b = MathUtils.randomInt(2, 6);
    const c = MathUtils.randomInt(2, 8);

    const sumSq = a * a + b * b + c * c;
    const diagStr = Number.isInteger(Math.sqrt(sumSq))
      ? `${Math.sqrt(sumSq)}`
      : `\\sqrt{${sumSq}}`;

    return this.createResponse({
      question: `Wymiary prostopadłościanu są równe: $$a=${a}$$, $$b=${b}$$, $$c=${c}$$. Długość przekątnej tego prostopadłościanu wynosi:`,
      latex: `a=${a}, b=${b}, c=${c}`,
      image: this.generateSVG({ type: "cuboid_diagonal", a, b, c }),
      variables: { a, b, c },
      correctAnswer: `${diagStr}`,
      distractors: [
        `\\sqrt{${a * a + b * b}}`, // Przekątna podstawy
        `${a + b + c}`,
        `\\sqrt{${sumSq - c * c}}`,
      ],
      steps: [
        `Wzór na długość przekątnej prostopadłościanu: $$d = \\sqrt{a^2 + b^2 + c^2}$$`,
        `$$d = \\sqrt{${a}^2 + ${b}^2 + ${c}^2}$$`,
        `$$d = \\sqrt{${a * a} + ${b * b} + ${c * c}} = \\sqrt{${sumSq}} = ${diagStr}$$`,
      ],
    });
  }

  // --- 2. CZWOROŚCIAN FOREMNY ---
  generateTetrahedronRegular() {
    // a - krawędź. H = a*sqrt(6)/3. V = a^3*sqrt(2)/12. Pc = a^2*sqrt(3).
    // Najczęściej pytają o wysokość lub pole.
    const a = MathUtils.randomInt(1, 5) * 3; // podzielne przez 3 dla ładnej wysokości
    const mode = MathUtils.randomElement(["height", "area"]);

    if (mode === "height") {
      const hStr = `${(a / 3).toFixed(0)}\\sqrt{6}`; // a*sqrt(6)/3 = (a/3)sqrt(6)
      return this.createResponse({
        question: `Wysokość czworościanu foremnego o krawędzi $$a=${a}$$ jest równa:`,
        latex: `a=${a}`,
        image: this.generateSVG({ type: "pyramid_triangle", a }), // Używamy rysunku ostrosłupa trójkątnego
        variables: { a },
        correctAnswer: hStr,
        distractors: [
          `${a}\\sqrt{3}`, // Wysokość trójkąta
          `${a}\\sqrt{6}`,
          `${(a / 2).toFixed(0)}\\sqrt{3}`,
        ],
        steps: [
          `Wzór na wysokość czworościanu foremnego: $$H = \\frac{a\\sqrt{6}}{3}$$`,
          `$$H = \\frac{${a}\\sqrt{6}}{3} = ${a / 3}\\sqrt{6}$$`,
        ],
      });
    } else {
      const areaStr = `${a * a}\\sqrt{3}`;
      return this.createResponse({
        question: `Pole powierzchni całkowitej czworościanu foremnego o krawędzi $$a=${a}$$ jest równe:`,
        latex: `a=${a}`,
        image: this.generateSVG({ type: "pyramid_triangle", a }),
        variables: { a },
        correctAnswer: areaStr,
        distractors: [
          `\\frac{${a * a}\\sqrt{3}}{4}`, // Jedna ściana
          `${a * a}\\sqrt{2}`,
          `${3 * a * a}`,
        ],
        steps: [
          `Czworościan foremny składa się z 4 ścian, które są trójkątami równobocznymi.`,
          `$$P_c = 4 \\cdot \\frac{a^2\\sqrt{3}}{4} = a^2\\sqrt{3}$$`,
          `$$P_c = ${a}^2\\sqrt{3} = ${a * a}\\sqrt{3}$$`,
        ],
      });
    }
  }

  // --- 3. KĄT ŚCIANY BOCZNEJ (OSTROSŁUP CZWOROKĄTNY) ---
  generatePyramidFaceAngle() {
    // Kąt między wysokością ściany bocznej (h_b) a podstawą.
    // Trójkąt prostokątny: H (wysokość bryły), a/2 (połowa boku), h_b.
    // cos(alpha) = (a/2) / h_b
    // tan(alpha) = H / (a/2)

    const a = MathUtils.randomInt(4, 10);
    const angle = MathUtils.randomElement([45, 60]);

    // Obliczamy H w zależności od kąta
    let H_latex;
    if (angle === 45) {
      // H = a/2 * tg(45) = a/2
      H_latex = a % 2 === 0 ? `${a / 2}` : `\\frac{${a}}{2}`;
    } else {
      // H = a/2 * tg(60) = a/2 * sqrt(3)
      H_latex = a % 2 === 0 ? `${a / 2}\\sqrt{3}` : `\\frac{${a}\\sqrt{3}}{2}`;
    }

    return this.createResponse({
      question: `Krawędź podstawy ostrosłupa prawidłowego czworokątnego ma długość $$${a}$$. Wysokość ściany bocznej tworzy z płaszczyzną podstawy kąt $$${angle}^\\circ$$. Wysokość tego ostrosłupa jest równa:`,
      latex: `a=${a}, \\alpha=${angle}^\\circ`,
      image: this.generateSVG({ type: "pyramid_face_angle", a, angle }),
      variables: { a, angle },
      correctAnswer: H_latex,
      distractors: [`${a}`, `${a}\\sqrt{2}`, `${a}\\sqrt{3}`],
      steps: [
        `Kąt nachylenia ściany bocznej znajduje się pomiędzy wysokością ściany bocznej a odcinkiem łączącym spodek wysokości bryły ze środkiem krawędzi podstawy.`,
        `Długość tego odcinka to połowa boku podstawy: $$\\frac{a}{2} = \\frac{${a}}{2}$$.`,
        `Z trójkąta prostokątnego: $$\\tg ${angle}^\\circ = \\frac{H}{a/2}$$.`,
        `$$H = \\frac{${a}}{2} \\cdot \\tg ${angle}^\\circ = ${H_latex}$$`,
      ],
    });
  }

  // --- 4. PRZEKĄTNA PRZEKROJU OSIOWEGO WALCA ---
  generateCylinderSectionDiagonal() {
    // Przekrój osiowy walca to prostokąt o bokach 2r i h.
    // Przekątna d = sqrt((2r)^2 + h^2).
    // Używamy trójek pitagorejskich, żeby d było ładne.
    // (2r, h, d) np. (6, 8, 10) -> r=3, h=8.
    const triples = [
      [3, 4, 5],
      [6, 8, 10],
      [5, 12, 13],
      [8, 15, 17],
    ];
    const [base, height, diag] = MathUtils.randomElement(triples);

    // Losujemy, co jest średnicą (2r), a co wysokością (h)
    const isBaseDiameter = MathUtils.randomElement([true, false]);
    const r = isBaseDiameter ? base / 2 : height / 2;
    const h = isBaseDiameter ? height : base;

    return this.createResponse({
      question: `Przekrój osiowy walca jest prostokątem o wymiarach $$${
        2 * r
      } \\times ${h}$$ (średnica $$\\times$$ wysokość). Długość przekątnej tego przekroju jest równa:`,
      latex: `2r=${2 * r}, h=${h}`,
      image: this.generateSVG({ type: "cylinder_section", r, h }),
      variables: { r, h, diag },
      correctAnswer: `${diag}`,
      distractors: [
        `${Math.sqrt(r * r + h * h).toFixed(1)}`, // Pomyłka r zamiast 2r
        `${2 * r + h}`,
        `${diag + 2}`,
      ],
      steps: [
        `Przekrój osiowy walca to prostokąt o bokach równych średnicy podstawy ($$2r$$) i wysokości walca ($$h$$).`,
        `Boki prostokąta: $$a = 2r = ${2 * r}$$, $$b = h = ${h}$$.`,
        `Z twierdzenia Pitagorasa dla przekątnej $$d$$: $$d = \\sqrt{a^2 + b^2}$$`,
        `$$d = \\sqrt{${2 * r}^2 + ${h}^2} = \\sqrt{${
          (2 * r) ** 2
        } + ${h * h}} = \\sqrt{${diag * diag}} = ${diag}$$`,
      ],
    });
  }

  // =================================================================
  // STARE METODY (BEZ ZMIAN W LOGICE)
  // =================================================================

  generateCubeProblem() {
    const a = MathUtils.randomInt(2, 10);
    const mode = MathUtils.randomElement(["given_edge", "given_diag"]);
    if (mode === "given_edge") {
      return this.createResponse({
        question: `Krawędź sześcianu ma długość $$${a}$$. Długość przekątnej tego sześcianu jest równa:`,
        latex: `a = ${a}`,
        image: this.generateSVG({ type: "cube", a }),
        variables: { a },
        correctAnswer: `${a}\\sqrt{3}`,
        distractors: [`${a}\\sqrt{2}`, `${3 * a}`, `${a * a}`],
        steps: [
          `Przekątna sześcianu o krawędzi $$a$$: $$D = a\\sqrt{3}$$`,
          `$$D = ${a}\\sqrt{3}$$`,
        ],
      });
    } else {
      const V = a * a * a;
      return this.createResponse({
        question: `Przekątna sześcianu ma długość $$${a}\\sqrt{3}$$. Objętość tego sześcianu wynosi:`,
        latex: `D = ${a}\\sqrt{3}`,
        image: this.generateSVG({ type: "cube", a }),
        variables: { a, V },
        correctAnswer: `${V}`,
        distractors: [`${3 * a}`, `${a * a}`, `${Math.floor(V / 3)}`],
        steps: [
          `$$D = a\\sqrt{3} = ${a}\\sqrt{3} \\implies a = ${a}$$`,
          `$$V = a^3 = ${a}^3 = ${V}$$`,
        ],
      });
    }
  }

  generateCuboidAngle() {
    const a = MathUtils.randomInt(3, 6);
    const angle = MathUtils.randomElement([30, 45, 60]);
    let H_latex;
    if (angle === 45) H_latex = `${a}\\sqrt{2}`;
    else if (angle === 60) H_latex = `${a}\\sqrt{6}`;
    else H_latex = `\\frac{${a}\\sqrt{6}}{3}`;

    return this.createResponse({
      question: `Podstawą prostopadłościanu jest kwadrat o boku $$${a}$$. Przekątna bryły tworzy z płaszczyzną podstawy kąt $$${angle}^\\circ$$. Wysokość bryły wynosi:`,
      latex: `a=${a}, \\alpha=${angle}^\\circ`,
      image: this.generateSVG({ type: "cuboid_angle", a, angle }),
      variables: { a, angle },
      correctAnswer: H_latex,
      distractors: [
        `${a}\\sqrt{3}`,
        angle === 60 ? `${a}\\sqrt{2}` : `${3 * a}`,
        `${a}`,
      ],
      steps: [
        `Przekątna podstawy (kwadratu): $$d = a\\sqrt{2} = ${a}\\sqrt{2}$$`,
        `Z trójkąta prostokątnego: $$\\tg ${angle}^\\circ = \\frac{H}{d}$$`,
        `$$H = ${a}\\sqrt{2} \\cdot \\tg ${angle}^\\circ = ${H_latex}$$`,
      ],
    });
  }

  generateConeProblem() {
    const triples = [
      [3, 4, 5],
      [5, 12, 13],
      [6, 8, 10],
      [8, 15, 17],
    ];
    const [r, h, l] = MathUtils.randomElement(triples);
    const mode = MathUtils.randomElement(["find_l", "find_h"]);
    return this.createResponse({
      question:
        mode === "find_l"
          ? `Wysokość stożka $$h=${h}$$, promień $$r=${r}$$. Tworząca $$l$$ ma długość:`
          : `Tworząca stożka $$l=${l}$$, promień $$r=${r}$$. Wysokość $$h$$ wynosi:`,
      latex: mode === "find_l" ? `h=${h}, r=${r}` : `l=${l}, r=${r}`,
      image: this.generateSVG({ type: "cone", r, h }),
      variables: { r, h, l },
      correctAnswer: mode === "find_l" ? `${l}` : `${h}`,
      distractors: [
        `${r + h}`,
        `${Math.abs(h - r)}`,
        `${Math.sqrt(h * h + r * r).toFixed(1)}`,
      ],
      steps: [
        `Z twierdzenia Pitagorasa: $$r^2 + h^2 = l^2$$`,
        `Podstawiamy dane i obliczamy brakujący bok.`,
      ],
    });
  }

  generateCylinderProblem() {
    const r = MathUtils.randomInt(2, 6);
    const h = 2 * r;
    const V = r * r * h;
    return this.createResponse({
      question: `Przekrój osiowy walca jest kwadratem o boku $$${h}$$. Objętość walca wynosi:`,
      latex: `H=2r=${h}`,
      image: this.generateSVG({ type: "cylinder", r, h }),
      variables: { r, h, V },
      correctAnswer: `${V}\\pi`,
      distractors: [`${V}`, `${2 * r * h}\\pi`, `${h * h}\\pi`],
      steps: [
        `$$2r = ${h} \\implies r = ${r}$$`,
        `$$V = \\pi r^2 H = \\pi \\cdot ${r}^2 \\cdot ${h} = ${V}\\pi$$`,
      ],
    });
  }

  generateScalingProblem() {
    const k = MathUtils.randomElement([2, 3, 4]);
    const type = MathUtils.randomElement(["volume", "area"]);
    const factor = type === "volume" ? k * k * k : k * k;
    return this.createResponse({
      question: `Jeśli krawędź bryły zwiększymy $$${k}$$-krotnie, to jej ${
        type === "volume" ? "objętość" : "pole powierzchni"
      } zwiększy się:`,
      latex: `k=${k}`,
      image: null,
      variables: { k, factor },
      correctAnswer: `${factor}-krotnie`,
      distractors: [
        `${k}-krotnie`,
        `${k * 2}-krotnie`,
        `${type === "volume" ? k * k : k * 3}-krotnie`,
      ],
      steps: [
        `Stosunek ${type === "volume" ? "objętości" : "pól"} brył podobnych to $$k^${type === "volume" ? 3 : 2}$$`,
        `$$${k}^${type === "volume" ? 3 : 2} = ${factor}$$`,
      ],
    });
  }

  generatePyramidSquare() {
    const a = MathUtils.randomInt(4, 10);
    const angle = MathUtils.randomElement([45, 60]);
    let H_latex;
    if (angle === 45) {
      H_latex = a % 2 === 0 ? `${a / 2}\\sqrt{2}` : `\\frac{${a}\\sqrt{2}}{2}`;
    } else {
      H_latex = a % 2 === 0 ? `${a / 2}\\sqrt{6}` : `\\frac{${a}\\sqrt{6}}{2}`;
    }
    return this.createResponse({
      question: `Krawędź podstawy ostrosłupa prawidłowego czworokątnego ma długość $$${a}$$. Krawędź boczna tworzy z płaszczyzną podstawy kąt $$${angle}^\\circ$$. Wysokość tego ostrosłupa jest równa:`,
      latex: `a=${a}, \\alpha=${angle}^\\circ`,
      image: this.generateSVG({ type: "pyramid_square", a, angle }),
      variables: { a, angle },
      correctAnswer: H_latex,
      distractors: [
        `${a}\\sqrt{2}`,
        angle === 45 ? `${a}` : `${a}\\sqrt{3}`,
        `\\frac{${a}\\sqrt{2}}{4}`,
      ],
      steps: [
        `$$d = a\\sqrt{2} = ${a}\\sqrt{2} \\implies d/2 = \\frac{${a}\\sqrt{2}}{2}$$`,
        `$$H = d/2 \\cdot \\tg ${angle}^\\circ = ${H_latex}$$`,
      ],
    });
  }

  generatePyramidTriangle() {
    const a = MathUtils.randomInt(3, 9) * 2;
    const H = a / 2; // Dla kąta 60
    return this.createResponse({
      question: `Krawędź podstawy ostrosłupa prawidłowego trójkątnego ma długość $$${a}$$. Wysokość ściany bocznej tworzy z płaszczyzną podstawy kąt $$60^\\circ$$. Wysokość ostrosłupa jest równa:`,
      latex: `a=${a}, \\alpha=60^\\circ`,
      image: this.generateSVG({ type: "pyramid_triangle", a }),
      variables: { a, H },
      correctAnswer: `${H}`,
      distractors: [`${a}`, `${a}\\sqrt{3}`, `\\frac{${a}\\sqrt{3}}{2}`],
      steps: [
        `$$r = \\frac{a\\sqrt{3}}{6}$$`,
        `$$H = r \\cdot \\tg 60^\\circ = \\frac{${a}\\sqrt{3}}{6} \\cdot \\sqrt{3} = ${H}$$`,
      ],
    });
  }

  generatePrismTriangle() {
    const a = MathUtils.randomInt(2, 6) * 2;
    const H = MathUtils.randomInt(5, 12);
    const Pp_coeff = (a * a) / 4;
    const V_coeff = Pp_coeff * H;
    return this.createResponse({
      question: `Krawędź podstawy graniastosłupa prawidłowego trójkątnego ma długość $$${a}$$, a jego wysokość wynosi $$${H}$$. Objętość tego graniastosłupa jest równa:`,
      latex: `a=${a}, H=${H}`,
      image: this.generateSVG({ type: "prism_triangle", a, H }),
      variables: { a, H, V_coeff },
      correctAnswer: `${V_coeff}\\sqrt{3}`,
      distractors: [
        `${V_coeff * 3}\\sqrt{3}`,
        `${V_coeff}\\sqrt{2}`,
        `${a * a * H}\\sqrt{3}`,
      ],
      steps: [
        `$$P_p = \\frac{a^2\\sqrt{3}}{4} = ${Pp_coeff}\\sqrt{3}$$`,
        `$$V = P_p \\cdot H = ${V_coeff}\\sqrt{3}$$`,
      ],
    });
  }

  generateSphereProblem() {
    const r = MathUtils.randomInt(2, 6);
    const type = MathUtils.randomElement(["volume", "area"]);
    if (type === "volume") {
      const niceR = MathUtils.randomElement([3, 6]);
      const V = (4 * Math.pow(niceR, 3)) / 3;
      return this.createResponse({
        question: `Promień kuli jest równy $$${niceR}$$. Objętość tej kuli wynosi:`,
        latex: `r=${niceR}`,
        image: this.generateSVG({ type: "sphere", r: niceR }),
        variables: { r: niceR, V },
        correctAnswer: `${V}\\pi`,
        distractors: [
          `${(V * 3) / 4}\\pi`,
          `${4 * niceR * niceR}\\pi`,
          `${Math.pow(niceR, 3)}\\pi`,
        ],
        steps: [
          `$$V = \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi \\cdot ${Math.pow(
            niceR,
            3,
          )} = ${V}\\pi$$`,
        ],
      });
    } else {
      const P = 4 * r * r;
      return this.createResponse({
        question: `Promień kuli jest równy $$${r}$$. Pole powierzchni tej kuli wynosi:`,
        latex: `r=${r}`,
        image: this.generateSVG({ type: "sphere", r }),
        variables: { r, P },
        correctAnswer: `${P}\\pi`,
        distractors: [`${r * r}\\pi`, `${2 * r * r}\\pi`, `${P / 4}\\pi`],
        steps: [`$$P = 4\\pi r^2 = 4\\pi \\cdot ${r * r} = ${P}\\pi$$`],
      });
    }
  }

  // --- ULEPSZONY GENERATOR SVG ---
  generateSVG(params) {
    const size = 300;
    const padding = 40;
    const cx = size / 2;
    const cy = size / 2 + 50;

    let scale = 15;
    if (params.h > 8 || params.a > 8) scale = 12;
    if (params.h > 12) scale = 10;

    let content = "";
    const line = (x1, y1, x2, y2, dashed = false, color = "black") =>
      `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2" ${
        dashed ? 'stroke-dasharray="4"' : ""
      }/>`;
    const text = (x, y, str) =>
      `<text x="${x}" y="${y}" font-size="14" font-weight="bold" fill="black" style="text-shadow: 1px 1px 2px white;">${str}</text>`;

    if (
      params.type === "cube" ||
      params.type === "cuboid_angle" ||
      params.type === "cuboid_diagonal"
    ) {
      const a = (params.a || 4) * scale;
      const h = params.c ? params.c * scale : a; // Dla sześcianu h=a, dla prostopadłościanu h=c
      const b_side = params.b ? params.b * scale : a; // szerokość podstawy
      const slant = a * 0.5;

      const A = { x: cx - a / 2, y: cy };
      const B = { x: cx + a / 2, y: cy };
      const C = { x: cx + a / 2 + slant, y: cy - slant };
      const D = { x: cx - a / 2 + slant, y: cy - slant };
      const A1 = { x: A.x, y: A.y - h };
      const B1 = { x: B.x, y: B.y - h };
      const C1 = { x: C.x, y: C.y - h };
      const D1 = { x: D.x, y: D.y - h };

      content +=
        line(A.x, A.y, B.x, B.y) +
        line(B.x, B.y, C.x, C.y) +
        line(C.x, C.y, C1.x, C1.y);
      content +=
        line(A.x, A.y, A1.x, A1.y) +
        line(B.x, B.y, B1.x, B1.y) +
        line(A1.x, A1.y, B1.x, B1.y);
      content +=
        line(B1.x, B1.y, C1.x, C1.y) +
        line(C1.x, C1.y, D1.x, D1.y) +
        line(D1.x, D1.y, A1.x, A1.y);
      content +=
        line(A.x, A.y, D.x, D.y, true) +
        line(C.x, C.y, D.x, D.y, true) +
        line(D.x, D.y, D1.x, D1.y, true);

      if (params.type === "cuboid_angle") {
        content += line(B.x, B.y, D.x, D.y, true, "blue"); // Przekątna podstawy
        content += line(B.x, B.y, D1.x, D1.y, false, "red"); // Przekątna bryły
        content += line(D.x, D.y, D1.x, D1.y, true, "blue"); // Wysokość
        content += text(B.x - 20, B.y - 5, "α");
      } else if (params.type === "cuboid_diagonal") {
        content += line(A.x, A.y, C1.x, C1.y, true, "red"); // Przekątna
      } else {
        content += line(A.x, A.y, C1.x, C1.y, false, "red"); // Przekątna sześcianu
      }
    } else if (
      params.type === "pyramid_square" ||
      params.type === "pyramid_face_angle"
    ) {
      const a = params.a * scale;
      const h = a * 1.5;
      const slant = a * 0.5;

      const A = { x: cx - a / 2, y: cy };
      const B = { x: cx + a / 2, y: cy };
      const C = { x: cx + a / 2 + slant, y: cy - slant };
      const D = { x: cx - a / 2 + slant, y: cy - slant };
      const S = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };
      const Top = { x: S.x, y: S.y - h };

      content += line(A.x, A.y, B.x, B.y) + line(B.x, B.y, C.x, C.y);
      content +=
        line(A.x, A.y, Top.x, Top.y) +
        line(B.x, B.y, Top.x, Top.y) +
        line(C.x, C.y, Top.x, Top.y);
      content +=
        line(A.x, A.y, D.x, D.y, true) +
        line(C.x, C.y, D.x, D.y, true) +
        line(D.x, D.y, Top.x, Top.y, true);

      if (params.type === "pyramid_face_angle") {
        const midBC = { x: (B.x + C.x) / 2, y: (B.y + C.y) / 2 };
        content += line(S.x, S.y, Top.x, Top.y, true, "blue"); // H
        content += line(S.x, S.y, midBC.x, midBC.y, true, "blue"); // a/2
        content += line(Top.x, Top.y, midBC.x, midBC.y, false, "red"); // h_boczna
        content += text(midBC.x - 20, midBC.y + 5, "α");
      } else {
        content += line(S.x, S.y, Top.x, Top.y, true, "blue"); // H
        content += line(S.x, S.y, C.x, C.y, true, "blue"); // d/2
        content += text(C.x - 15, C.y - 5, "α");
      }
    } else if (
      params.type === "pyramid_triangle" ||
      params.type === "prism_triangle"
    ) {
      const a = params.a * scale;
      const h = params.H ? params.H * scale : a * 1.2;

      const A = { x: cx - a / 2, y: cy };
      const B = { x: cx + a / 2, y: cy };
      const C = { x: cx, y: cy - a * 0.6 };

      if (params.type === "prism_triangle") {
        const A1 = { x: A.x, y: A.y - h };
        const B1 = { x: B.x, y: B.y - h };
        const C1 = { x: C.x, y: C.y - h };
        content +=
          line(A.x, A.y, B.x, B.y) +
          line(A.x, A.y, A1.x, A1.y) +
          line(B.x, B.y, B1.x, B1.y);
        content +=
          line(A1.x, A1.y, B1.x, B1.y) +
          line(B1.x, B1.y, C1.x, C1.y) +
          line(C1.x, C1.y, A1.x, A1.y);
        content +=
          line(A.x, A.y, C.x, C.y, true) +
          line(B.x, B.y, C.x, C.y, true) +
          line(C.x, C.y, C1.x, C1.y, true);
      } else {
        const S = { x: cx, y: cy - a * 0.2 };
        const Top = { x: S.x, y: S.y - h };
        content +=
          line(A.x, A.y, B.x, B.y) +
          line(A.x, A.y, Top.x, Top.y) +
          line(B.x, B.y, Top.x, Top.y);
        content +=
          line(A.x, A.y, C.x, C.y, true) +
          line(B.x, B.y, C.x, C.y, true) +
          line(C.x, C.y, Top.x, Top.y, true);
        const midAB = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
        content += line(S.x, S.y, Top.x, Top.y, true, "red");
        content += line(S.x, S.y, midAB.x, midAB.y, true, "red");
        content += line(Top.x, Top.y, midAB.x, midAB.y, false, "red");
      }
    } else if (params.type === "sphere") {
      const r = params.r * scale * 1.5;
      content += `<circle cx="${cx}" cy="${cy - r / 2}" r="${r}" stroke="black" fill="none" stroke-width="2"/>`;
      content += `<ellipse cx="${cx}" cy="${cy - r / 2}" rx="${r}" ry="${r / 4}" stroke="black" fill="none" stroke-dasharray="4"/>`;
      content += text(cx + 5, cy - r / 2, "r");
      content += line(cx, cy - r / 2, cx + r, cy - r / 2, true, "red");
    } else if (params.type === "cone") {
      const r = params.r * scale;
      const h = params.h * scale;
      content += `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r / 3}" stroke="black" fill="none" stroke-width="2" />`;
      content += line(cx - r, cy, cx, cy - h) + line(cx + r, cy, cx, cy - h);
      content +=
        line(cx, cy, cx, cy - h, true, "blue") +
        line(cx, cy, cx + r, cy, true, "blue");
      content +=
        text(cx + 5, cy - h / 2, "h") +
        text(cx + r / 2, cy + 15, "r") +
        text(cx + r / 2 + 10, cy - h / 2, "l");
    } else if (
      params.type === "cylinder" ||
      params.type === "cylinder_section"
    ) {
      const r = params.r * scale;
      const h = params.h * scale;
      content += `<ellipse cx="${cx}" cy="${cy - h}" rx="${r}" ry="${r / 3}" stroke="black" fill="white" stroke-width="2" />`;
      content += `<path d="M ${cx - r} ${cy} A ${r} ${r / 3} 0 0 0 ${cx + r} ${cy}" stroke="black" fill="none" stroke-width="2" />`;
      content += `<path d="M ${cx - r} ${cy} A ${r} ${r / 3} 0 0 1 ${cx + r} ${cy}" stroke="black" fill="none" stroke-width="2" stroke-dasharray="4" />`;
      content +=
        line(cx - r, cy - h, cx - r, cy) + line(cx + r, cy - h, cx + r, cy);

      if (params.type === "cylinder_section") {
        content += `<rect x="${cx - r}" y="${cy - h}" width="${2 * r}" height="${h}" fill="rgba(0,0,255,0.1)" stroke="none" />`;
        content += line(cx - r, cy - h, cx + r, cy, true, "red"); // przekątna
      } else {
        content += `<rect x="${cx - r}" y="${cy - h}" width="${2 * r}" height="${h}" fill="rgba(0,0,255,0.1)" stroke="none" />`;
      }
    }

    return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff">${content}</svg>`;
  }
}

module.exports = StereometryGenerator;
