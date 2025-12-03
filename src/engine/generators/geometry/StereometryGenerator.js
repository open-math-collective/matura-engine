const BaseGenerator = require("../../core/BaseGenerator");
const MathUtils = require("../../utils/MathUtils");

class StereometryGenerator extends BaseGenerator {
  generate() {
    const variants = [
      "cube_features", // Sześcian: przekątna, objętość
      "cuboid_angle", // Kąt nachylenia przekątnej prostopadłościanu
      "cone_basics", // Stożek: l^2 = h^2 + r^2
      "cylinder_volume", // Walec: przekrój kwadratem
      "solid_scaling", // Jak zmienia się objętość przy skalowaniu
      "pyramid_square", // NOWOŚĆ: Ostrosłup prawidłowy czworokątny
      "pyramid_triangle", // NOWOŚĆ: Ostrosłup prawidłowy trójkątny
      "prism_triangle", // NOWOŚĆ: Graniastosłup prawidłowy trójkątny
      "sphere_calc", // NOWOŚĆ: Kula (objętość/pole)
    ];

    const selectedVariant = MathUtils.randomElement(variants);

    switch (selectedVariant) {
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

  // --- 1. SZEŚCIAN (Bez zmian logicznych) ---
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

  // --- 2. KĄTY W PROSTOPADŁOŚCIANIE (Bez zmian logicznych) ---
  generateCuboidAngle() {
    const a = MathUtils.randomInt(3, 6); // bok podstawy
    const angle = MathUtils.randomElement([30, 45, 60]);
    // H wyliczamy tak, żeby pasowało do kąta
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
        `Z trójkąta prostokątnego (wysokość $$H$$, przekątna podstawy $$d$$): $$\\tg ${angle}^\\circ = \\frac{H}{d}$$`,
        `$$H = ${a}\\sqrt{2} \\cdot \\tg ${angle}^\\circ = ${H_latex}$$`,
      ],
    });
  }

  // --- 3. STOŻEK (Bez zmian logicznych) ---
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

  // --- 4. WALEC (Bez zmian logicznych) ---
  generateCylinderProblem() {
    const r = MathUtils.randomInt(2, 6);
    const h = 2 * r; // przekrój kwadratem
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

  // --- 5. SKALOWANIE (Bez zmian logicznych) ---
  generateScalingProblem() {
    const k = MathUtils.randomElement([2, 3, 4]);
    const type = MathUtils.randomElement(["volume", "area"]);
    const factor = type === "volume" ? k * k * k : k * k;
    return this.createResponse({
      question: `Jeśli krawędź bryły zwiększymy $$${k}$$-krotnie, to jej ${type === "volume" ? "objętość" : "pole powierzchni"} zwiększy się:`,
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

  // --- NOWOŚĆ 6: OSTROSŁUP PRAWIDŁOWY CZWOROKĄTNY ---
  generatePyramidSquare() {
    // Kąt między krawędzią boczną (b) a podstawą (przekątną d).
    // Trójkąt prostokątny: H, d/2, b.
    // tan(alpha) = H / (d/2)
    const a = MathUtils.randomInt(4, 10); // krawędź podstawy
    // Niech kąt będzie "ładny", np. 45 lub 60 stopni.
    const angle = MathUtils.randomElement([45, 60]);

    // d = a*sqrt(2), d/2 = a*sqrt(2)/2
    // H = (d/2) * tan(alpha)

    let H_latex;
    if (angle === 45) {
      // tan 45 = 1 => H = d/2
      H_latex = `\\frac{${a}\\sqrt{2}}{2}`;
      // Jeśli a parzyste, skracamy
      if (a % 2 === 0) H_latex = `${a / 2}\\sqrt{2}`;
    } else {
      // tan 60 = sqrt(3) => H = (a*sqrt(2)/2) * sqrt(3) = a*sqrt(6)/2
      H_latex = `\\frac{${a}\\sqrt{6}}{2}`;
      if (a % 2 === 0) H_latex = `${a / 2}\\sqrt{6}`;
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
        `Przekątna podstawy (kwadratu): $$d = a\\sqrt{2} = ${a}\\sqrt{2}$$`,
        `Połowa przekątnej: $$\\frac{d}{2} = \\frac{${a}\\sqrt{2}}{2}$$`,
        `Z trójkąta prostokątnego (wysokość $$H$$, połowa przekątnej): $$\\tg ${angle}^\\circ = \\frac{H}{d/2}$$`,
        `$$H = \\frac{d}{2} \\cdot \\tg ${angle}^\\circ$$`,
        `$$H = ${H_latex}$$`,
      ],
    });
  }

  // --- NOWOŚĆ 7: OSTROSŁUP PRAWIDŁOWY TRÓJKĄTNY ---
  generatePyramidTriangle() {
    // Wysokość ściany bocznej (h_b) tworzy z podstawą kąt alpha.
    // Trójkąt prostokątny: H, (1/3)h_p (promień okręgu wpisanego w podstawę), h_b.
    const a = MathUtils.randomInt(3, 9) * 2; // parzyste, żeby łatwo dzielić
    const angle = 60; // Najczęściej na maturze

    // h_p = a*sqrt(3)/2
    // r = (1/3)*h_p = a*sqrt(3)/6
    // H = r * tan(60) = (a*sqrt(3)/6) * sqrt(3) = 3a/6 = a/2

    const H = a / 2;

    return this.createResponse({
      question: `Krawędź podstawy ostrosłupa prawidłowego trójkątnego ma długość $$${a}$$. Wysokość ściany bocznej tworzy z płaszczyzną podstawy kąt $$60^\\circ$$. Wysokość ostrosłupa jest równa:`,
      latex: `a=${a}, \\alpha=60^\\circ`,
      image: this.generateSVG({ type: "pyramid_triangle", a }),
      variables: { a, H },
      correctAnswer: `${H}`,
      distractors: [`${a}`, `${a}\\sqrt{3}`, `\\frac{${a}\\sqrt{3}}{2}`],
      steps: [
        `Wysokość podstawy (trójkąta równobocznego): $$h_p = \\frac{a\\sqrt{3}}{2} = \\frac{${a}\\sqrt{3}}{2} = ${a / 2}\\sqrt{3}$$`,
        `Promień okręgu wpisanego w podstawę: $$r = \\frac{1}{3}h_p = \\frac{${a / 2}\\sqrt{3}}{3} = \\frac{${a}\\sqrt{3}}{6}$$`,
        `Z trójkąta prostokątnego: $$\\tg 60^\\circ = \\frac{H}{r}$$`,
        `$$H = r \\cdot \\sqrt{3} = \\frac{${a}\\sqrt{3}}{6} \\cdot \\sqrt{3} = \\frac{${a}\\cdot 3}{6} = \\frac{${3 * a}}{6} = ${H}$$`,
      ],
    });
  }

  // --- NOWOŚĆ 8: GRANIASTOSŁUP PRAWIDŁOWY TRÓJKĄTNY ---
  generatePrismTriangle() {
    // Objętość V = Pp * H
    const a = MathUtils.randomInt(2, 6) * 2;
    const H = MathUtils.randomInt(5, 12);

    // Pp = a^2 sqrt(3) / 4
    // V = Pp * H
    const Pp_coeff = (a * a) / 4; // np. 4*4/4 = 4
    const V_coeff = Pp_coeff * H;

    return this.createResponse({
      question: `Krawędź podstawy graniastosłupa prawidłowego trójkątnego ma długość $$${a}$$, a jego wysokość wynosi $$${H}$$. Objętość tego graniastosłupa jest równa:`,
      latex: `a=${a}, H=${H}`,
      image: this.generateSVG({ type: "prism_triangle", a, H }),
      variables: { a, H, V_coeff },
      correctAnswer: `${V_coeff}\\sqrt{3}`,
      distractors: [
        `${V_coeff * 3}\\sqrt{3}`, // Zapomniane dzielenie przez 4 w polu podstawy (wzór na trójkąt 1/2 ah?)
        `${V_coeff}\\sqrt{2}`,
        `${a * a * H}\\sqrt{3}`,
      ],
      steps: [
        `Pole podstawy (trójkąt równoboczny): $$P_p = \\frac{a^2\\sqrt{3}}{4} = \\frac{${a}^2\\sqrt{3}}{4} = ${Pp_coeff}\\sqrt{3}$$`,
        `Objętość: $$V = P_p \\cdot H$$`,
        `$$V = ${Pp_coeff}\\sqrt{3} \\cdot ${H} = ${V_coeff}\\sqrt{3}$$`,
      ],
    });
  }

  // --- NOWOŚĆ 9: KULA ---
  generateSphereProblem() {
    const r = MathUtils.randomInt(2, 6);
    const type = MathUtils.randomElement(["volume", "area"]);

    if (type === "volume") {
      // V = 4/3 pi r^3
      // Żeby było ładnie, r powinno być podzielne przez 3... albo wynik zostawiamy w ułamku.
      // Zróbmy r = 3, 6 to się skróci.
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
          `Wzór na objętość kuli: $$V = \\frac{4}{3}\\pi r^3$$`,
          `$$V = \\frac{4}{3}\\pi \\cdot ${niceR}^3 = \\frac{4}{3}\\pi \\cdot ${Math.pow(niceR, 3)}$$`,
          `$$V = 4 \\cdot ${Math.pow(niceR, 3) / 3}\\pi = ${V}\\pi$$`,
        ],
      });
    } else {
      // P = 4 pi r^2
      const P = 4 * r * r;
      return this.createResponse({
        question: `Promień kuli jest równy $$${r}$$. Pole powierzchni tej kuli wynosi:`,
        latex: `r=${r}`,
        image: this.generateSVG({ type: "sphere", r }),
        variables: { r, P },
        correctAnswer: `${P}\\pi`,
        distractors: [`${r * r}\\pi`, `${2 * r * r}\\pi`, `${P / 4}\\pi`],
        steps: [
          `Wzór na pole kuli: $$P = 4\\pi r^2$$`,
          `$$P = 4\\pi \\cdot ${r}^2 = 4\\pi \\cdot ${r * r} = ${P}\\pi$$`,
        ],
      });
    }
  }

  // --- ULEPSZONY GENERATOR SVG (MARGINESY + SKALOWANIE) ---
  generateSVG(params) {
    const size = 300;
    const padding = 40; // Margines bezpieczeństwa
    const drawingSize = size - 2 * padding;
    const cx = size / 2;
    const cy = size / 2 + 50; // Przesunięcie w dół, bo 3D idzie w górę

    let scale = 15;
    // Inteligentne skalowanie, żeby duże bryły nie wychodziły poza kadr
    if (params.h > 8 || params.a > 8) scale = 12;
    if (params.h > 12) scale = 10;

    let content = "";
    const line = (x1, y1, x2, y2, dashed = false, color = "black") =>
      `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="2" ${dashed ? 'stroke-dasharray="4"' : ""}/>`;
    const text = (x, y, str) =>
      `<text x="${x}" y="${y}" font-size="14" font-weight="bold" fill="black" style="text-shadow: 1px 1px 2px white;">${str}</text>`;

    if (params.type === "cube" || params.type === "cuboid_angle") {
      const a = (params.a || 4) * scale;
      const h = a;
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
        content += line(D.x, D.y, D1.x, D1.y, true, "blue"); // Wysokość tylna
        content += text(B.x - 20, B.y - 5, "α");
      } else {
        content += line(A.x, A.y, C1.x, C1.y, false, "red"); // Przekątna sześcianu
      }
    } else if (params.type === "pyramid_square") {
      const a = params.a * scale;
      const h = a * 1.5;
      const slant = a * 0.5;

      // Podstawa (równoległobok)
      const A = { x: cx - a / 2, y: cy };
      const B = { x: cx + a / 2, y: cy };
      const C = { x: cx + a / 2 + slant, y: cy - slant };
      const D = { x: cx - a / 2 + slant, y: cy - slant };
      const S = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 }; // Środek podstawy
      const Top = { x: S.x, y: S.y - h }; // Wierzchołek

      content += line(A.x, A.y, B.x, B.y) + line(B.x, B.y, C.x, C.y);
      content +=
        line(A.x, A.y, Top.x, Top.y) +
        line(B.x, B.y, Top.x, Top.y) +
        line(C.x, C.y, Top.x, Top.y);

      content +=
        line(A.x, A.y, D.x, D.y, true) +
        line(C.x, C.y, D.x, D.y, true) +
        line(D.x, D.y, Top.x, Top.y, true);

      // Wysokość i przekątna podstawy (połowa)
      content += line(S.x, S.y, Top.x, Top.y, true, "blue"); // H
      content += line(S.x, S.y, C.x, C.y, true, "blue"); // d/2
      content += text(C.x - 15, C.y - 5, "α");
    } else if (params.type === "pyramid_triangle") {
      const a = params.a * scale;
      const h = a * 1.2;

      // Podstawa (trójkąt w rzucie)
      const A = { x: cx - a / 2, y: cy };
      const B = { x: cx + a / 2, y: cy };
      const C = { x: cx, y: cy - a * 0.6 }; // Wierzchołek tylny podstawy
      const S = { x: cx, y: cy - a * 0.2 }; // Środek podstawy (mniej więcej)
      const Top = { x: S.x, y: S.y - h };

      content +=
        line(A.x, A.y, B.x, B.y) +
        line(A.x, A.y, Top.x, Top.y) +
        line(B.x, B.y, Top.x, Top.y);
      content +=
        line(A.x, A.y, C.x, C.y, true) +
        line(B.x, B.y, C.x, C.y, true) +
        line(C.x, C.y, Top.x, Top.y, true);

      // Kąt ściany bocznej
      const midAB = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
      content += line(S.x, S.y, Top.x, Top.y, true, "red"); // H
      content += line(S.x, S.y, midAB.x, midAB.y, true, "red"); // r
      content += line(Top.x, Top.y, midAB.x, midAB.y, false, "red"); // h_boczna
    } else if (params.type === "prism_triangle") {
      const a = params.a * scale;
      const h = params.H * scale;

      const A = { x: cx - a / 2, y: cy };
      const B = { x: cx + a / 2, y: cy };
      const C = { x: cx, y: cy - a * 0.6 };

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
    } else if (params.type === "sphere") {
      const r = params.r * scale * 1.5;
      content += `<circle cx="${cx}" cy="${cy - r / 2}" r="${r}" stroke="black" fill="none" stroke-width="2"/>`;
      // Równik (elipsa)
      content += `<ellipse cx="${cx}" cy="${cy - r / 2}" rx="${r}" ry="${r / 4}" stroke="black" fill="none" stroke-dasharray="4"/>`;
      content += text(cx + 5, cy - r / 2, "r");
      content += line(cx, cy - r / 2, cx + r, cy - r / 2, true, "red");
    } else if (params.type === "cone") {
      const r = params.r * scale;
      const h = params.h * scale;

      // Podstawa (elipsa)
      content += `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r / 3}" stroke="black" fill="none" stroke-width="2" />`;
      // Boki
      content += line(cx - r, cy, cx, cy - h);
      content += line(cx + r, cy, cx, cy - h);
      // Wysokość i promień
      content += line(cx, cy, cx, cy - h, true, "blue"); // H
      content += line(cx, cy, cx + r, cy, true, "blue"); // r

      content += text(cx + 5, cy - h / 2, "h");
      content += text(cx + r / 2, cy + 15, "r");
      content += text(cx + r / 2 + 10, cy - h / 2, "l");
    } else if (params.type === "cylinder") {
      const r = params.r * scale;
      const h = params.h * scale;

      // Górna podstawa
      content += `<ellipse cx="${cx}" cy="${cy - h}" rx="${r}" ry="${r / 3}" stroke="black" fill="white" stroke-width="2" />`;
      // Dolna podstawa (połowa widoczna)
      content += `<path d="M ${cx - r} ${cy} A ${r} ${r / 3} 0 0 0 ${cx + r} ${cy}" stroke="black" fill="none" stroke-width="2" />`;
      content += `<path d="M ${cx - r} ${cy} A ${r} ${r / 3} 0 0 1 ${cx + r} ${cy}" stroke="black" fill="none" stroke-width="2" stroke-dasharray="4" />`;

      // Boki
      content += line(cx - r, cy - h, cx - r, cy);
      content += line(cx + r, cy - h, cx + r, cy);

      // Przekrój (prostokąt)
      content += `<rect x="${cx - r}" y="${cy - h}" width="${2 * r}" height="${h}" fill="rgba(0,0,255,0.1)" stroke="none" />`;
      content += line(cx - r, cy - h, cx + r, cy, true, "red"); // przekątna przekroju (opcja)
    }

    return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff">${content}</svg>`;
  }
}

module.exports = StereometryGenerator;
