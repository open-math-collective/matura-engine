const MathUtils = require("../../../utils/MathUtils");

class ShapesCoordsValues {
  /**
   * Get parameters for circle problem
   */
  static getCircleParams(difficulty) {
    if (difficulty === "easy") return { rangeS: [-3, 3] };
    else return { rangeS: [-8, 8] };
  }

  /**
   * Generate data for circle problem
   */
  static generateCircleData(difficulty) {
    const params = this.getCircleParams(difficulty);
    const S = {
      x: MathUtils.randomInt(params.rangeS[0], params.rangeS[1]),
      y: MathUtils.randomInt(params.rangeS[0], params.rangeS[1]),
    };
    const r = MathUtils.randomInt(2, 6);

    const eq = `(x ${S.x > 0 ? "-" : "+"} ${Math.abs(S.x)})^2 + (y ${S.y > 0 ? "-" : "+"} ${Math.abs(S.y)})^2 = ${r * r}`;

    return { S, r, eq };
  }

  /**
   * Get templates for circle problem
   */
  static getCircleTemplates() {
    return [
      () => "Podaj kolejno: środek i promień okręgu o równaniu:",
      () => "Wyznacz środek i promień okręgu z równania:",
      () => "Znajdź środek oraz promień okręgu opisanego równaniem:",
      () => "Dla okręgu o podanym równaniu oblicz środek i promień:",
      () => "Podaj współrzędne środka i długość promienia okręgu:",
      () => "Znajdź S i r dla okręgu o równaniu:",
      () => "Wyznacz środek S i promień r okręgu:",
      () => "Z równania okręgu podaj środek i promień:",
      () => "Oblicz środek i promień okręgu zadanego równaniem:",
      () => "Dla równania okręgu znajdź S oraz r:",
      () => "Określ środek i promień okręgu:",
      () => "Wyznacz współrzędne środka i promień okręgu:",
      () => "Znajdź środek okręgu oraz jego promień:",
      () => "Podaj S i r dla danego okręgu:",
      () => "Dla okręgu z równania wyznacz środek i promień:",
      () => "Oblicz współrzędne środka i długość promienia:",
      () => "Z podanego równania znajdź środek i promień okręgu:",
      () => "Wyznacz S=(x,y) oraz r dla okręgu:",
      () => "Znajdź środek i promień okręgu opisanego wzorem:",
      () => "Dla okręgu o równaniu podaj środek S i promień r:",
    ];
  }

  /**
   * Generate distractors for circle problem
   */
  static generateCircleDistractors(S, r) {
    const correctAnswer = `S=(${S.x},${S.y}), r=${r}`;
    const candidates = [
      `S=(${-S.x},${-S.y}), r=${r}`,
      `S=(${S.x},${S.y}), r=${r * r}`,
      `S=(${S.y},${S.x}), r=${r}`,
      `S=(${S.x + 1},${S.y}), r=${r}`,
      `S=(${S.x},${S.y + 1}), r=${r}`,
      `S=(${-S.x},${S.y}), r=${r}`,
      `S=(${S.x},${-S.y}), r=${r}`,
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
   * Get parameters for circle tangent to axis problem
   */
  static getCircleTangentParams(difficulty) {
    if (difficulty === "easy") return { rangeS: [-3, 3] };
    else if (difficulty === "hard") return { rangeS: [-10, 10] };
    else return { rangeS: [-8, 8] };
  }

  /**
   * Generate data for circle tangent to axis problem
   */
  static generateCircleTangentData(difficulty) {
    const params = this.getCircleTangentParams(difficulty);
    const axis = MathUtils.randomElement(["Ox", "Oy"]);
    const S = {
      x: MathUtils.randomInt(params.rangeS[0], params.rangeS[1]),
      y: MathUtils.randomInt(params.rangeS[0], params.rangeS[1]),
    };
    if (S.x === 0) S.x = 2;
    if (S.y === 0) S.y = -3;

    const r = axis === "Ox" ? Math.abs(S.y) : Math.abs(S.x);

    return { S, axis, r };
  }

  /**
   * Get templates for circle tangent to axis problem
   */
  static getCircleTangentTemplates(S, axis) {
    return [
      () => `Okrąg o środku $$S=(${S.x}, ${S.y})$$ jest styczny do osi $$${axis}$$. Jego promień wynosi:`,
      () => `Dla okręgu ze środkiem $$S=(${S.x}, ${S.y})$$ stycznego do $$${axis}$$ podaj promień:`,
      () => `Oblicz promień okręgu o środku $$S=(${S.x}, ${S.y})$$ stycznego do osi $$${axis}$$:`,
      () => `Znajdź promień okręgu stycznego do $$${axis}$$ ze środkiem $$S=(${S.x}, ${S.y})$$:`,
      () => `Wyznacz promień okręgu ze środkiem $$S=(${S.x}, ${S.y})$$ stycznego do $$${axis}$$:`,
      () => `Promień okręgu stycznego do $$${axis}$$ o środku $$S=(${S.x}, ${S.y})$$ wynosi:`,
      () => `Dla okręgu $$S=(${S.x}, ${S.y})$$ stycznego do $$${axis}$$ oblicz r:`,
      () => `Znajdź r dla okręgu ze środkiem $$S=(${S.x}, ${S.y})$$ stycznego do $$${axis}$$:`,
      () => `Oblicz r, gdy okrąg $$S=(${S.x}, ${S.y})$$ jest styczny do $$${axis}$$:`,
      () => `Promień okręgu $$S=(${S.x}, ${S.y})$$ stycznego do osi $$${axis}$$:`,
      () => `Wyznacz r okręgu stycznego do $$${axis}$$ ze środkiem $$S=(${S.x}, ${S.y})$$:`,
      () => `Dla $$S=(${S.x}, ${S.y})$$ i styczności do $$${axis}$$ podaj r:`,
      () => `Znajdź promień okręgu ze środkiem $$S=(${S.x}, ${S.y})$$ i stycznym do $$${axis}$$:`,
      () => `Oblicz promień okręgu stycznego do osi $$${axis}$$ ze środkiem $$S=(${S.x}, ${S.y})$$:`,
      () => `Promień okręgu o środku $$S=(${S.x}, ${S.y})$$ stycznego do $$${axis}$$ to:`,
      () => `Wyznacz promień dla $$S=(${S.x}, ${S.y})$$ stycznego do $$${axis}$$:`,
      () => `Znajdź r, gdy $$S=(${S.x}, ${S.y})$$ i styczność do $$${axis}$$:`,
      () => `Dla okręgu ze środkiem $$S=(${S.x}, ${S.y})$$ stycznego do $$${axis}$$ r wynosi:`,
      () => `Oblicz r okręgu $$S=(${S.x}, ${S.y})$$ stycznego do osi $$${axis}$$:`,
      () => `Promień okręgu $$S=(${S.x}, ${S.y})$$ przy styczności do $$${axis}$$:`,
    ];
  }

  /**
   * Generate distractors for circle tangent to axis problem
   */
  static generateCircleTangentDistractors(S, axis, r) {
    const correctAnswer = `${r}`;
    const candidates = [
      `${axis === "Ox" ? Math.abs(S.x) : Math.abs(S.y)}`,
      `${r * r}`,
      `${Math.sqrt(S.x * S.x + S.y * S.y).toFixed(1)}`,
      `${r + 1}`,
      `${r - 1}`,
      `${2 * r}`,
      `${axis === "Ox" ? Math.abs(S.y) + 1 : Math.abs(S.x) + 1}`,
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
   * Get parameters for radius from equation problem
   */
  static getRadiusFromEquationParams(difficulty) {
    if (difficulty === "easy") {
      return { rSqList: [4, 9, 16, 25, 36, 49, 64, 81, 100] };
    } else if (difficulty === "hard") {
      return { rSqList: [2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 65, 66, 67, 68] };
    } else {
      return { rSqList: [4, 9, 25, 2, 3, 5, 6, 7, 8] };
    }
  }

  /**
   * Generate data for radius from equation problem
   */
  static generateRadiusFromEquationData(difficulty) {
    const params = this.getRadiusFromEquationParams(difficulty);
    const rSq = MathUtils.randomElement(params.rSqList);
    const rStr = Number.isInteger(Math.sqrt(rSq)) ? `${Math.sqrt(rSq)}` : `\\sqrt{${rSq}}`;
    
    // Losowe współrzędne środka dla większej różnorodności
    const a = MathUtils.randomInt(-3, 3);
    const b = MathUtils.randomInt(-3, 3);

    return { rSq, rStr, a, b };
  }

  /**
   * Get templates for radius from equation problem
   */
  static getRadiusFromEquationTemplates(rSq, a, b) {
    const aStr = a >= 0 ? `-$${a}` : `+$${-a}`;
    const bStr = b >= 0 ? `-$${b}` : `+$${-b}`;
    const eq = `(x$${aStr})^2 + (y$${bStr})^2 = $${rSq}`;
    return [
      () => `Promień okręgu $$(x-1)^2 + (y+2)^2 = ${rSq}$$ wynosi:`,
      () => `Dla okręgu $$(x-1)^2 + (y+2)^2 = ${rSq}$$ podaj promień:`,
      () => `Oblicz promień okręgu o równaniu $$(x-1)^2 + (y+2)^2 = ${rSq}$$:`,
      () => `Znajdź długość promienia okręgu $$(x-1)^2 + (y+2)^2 = ${rSq}$$:`,
      () => `Wyznacz promień r okręgu $$(x-1)^2 + (y+2)^2 = ${rSq}$$:`,
      () => `Promień r okręgu $$(x-1)^2 + (y+2)^2 = ${rSq}$$ jest równy:`,
      () => `Dla $$(x-1)^2 + (y+2)^2 = ${rSq}$$ oblicz r:`,
      () => `Znajdź r dla okręgu $$(x-1)^2 + (y+2)^2 = ${rSq}$$:`,
      () => `Oblicz r, gdy r² = ${rSq} w równaniu okręgu:`,
      () => `Promień okręgu z równania $$(x-1)^2 + (y+2)^2 = ${rSq}$$:`,
      () => `Wyznacz r, gdy $$(x-1)^2 + (y+2)^2 = ${rSq}$$:`,
      () => `Dla okręgu $$(x-1)^2 + (y+2)^2 = ${rSq}$$ podaj r:`,
      () => `Znajdź promień okręgu $$(x-1)^2 + (y+2)^2 = ${rSq}$$:`,
      () => `Oblicz promień dla $$(x-1)^2 + (y+2)^2 = ${rSq}$$:`,
      () => `Promień r dla $$(x-1)^2 + (y+2)^2 = ${rSq}$$ wynosi:`,
      () => `Wyznacz promień okręgu $$(x-1)^2 + (y+2)^2 = ${rSq}$$:`,
      () => `Znajdź r z równania $$(x-1)^2 + (y+2)^2 = ${rSq}$$:`,
      () => `Dla $$(x-1)^2 + (y+2)^2 = ${rSq}$$ r jest równe:`,
      () => `Oblicz długość promienia dla $$(x-1)^2 + (y+2)^2 = ${rSq}$$:`,
      () => `Promień okręgu o równaniu $$(x-1)^2 + (y+2)^2 = ${rSq}$$ to:`,
      () => `Jaki jest promień okręgu $$(x-1)^2 + (y+2)^2 = ${rSq}$$:`
,
      () => `Wartość promienia r dla $$(x-1)^2 + (y+2)^2 = ${rSq}$$:`,

      () => `Dla równania $$(x-1)^2 + (y+2)^2 = ${rSq}$$ oblicz promień:`,
      () => `Znajdź wartość r z $$(x-1)^2 + (y+2)^2 = ${rSq}$$:`,
      () => `Oblicz r z równania okręgu $$(x-1)^2 + (y+2)^2 = ${rSq}$$:`,
      () => `Promień dla okręgu $$(x-1)^2 + (y+2)^2 = ${rSq}$$ wynosi:`,
      () => `Z równania $$(x-1)^2 + (y+2)^2 = ${rSq}$$ wyznacz r:`,
      () => `Wyznacz wartość promienia r dla $$(x-1)^2 + (y+2)^2 = ${rSq}$$:`,
      () => `Dla $$(x-1)^2 + (y+2)^2 = ${rSq}$$ znajdź promień:`,
      () => `Oblicz wartość r dla okręgu $$(x-1)^2 + (y+2)^2 = ${rSq}$$:`,
      () => `Promień okręgu $$(x-1)^2 + (y+2)^2 = ${rSq}$$ jest równy:`,
    ];
  }

  /**
   * Generate distractors for radius from equation problem
   */
  static generateRadiusFromEquationDistractors(rSq) {
    return [`${rSq}`, `${rSq / 2}`, `${rSq * 2}`];
  }

  /**
   * Get parameters for parallelogram vertex problem
   */
  static getParallelogramVertexParams(difficulty) {
    if (difficulty === "easy") return { range: [0, 5] };
    else return { range: [-6, 6] };
  }

  /**
   * Generate data for parallelogram vertex problem
   */
  static generateParallelogramVertexData(difficulty) {
    const params = this.getParallelogramVertexParams(difficulty);
    const A = {
      x: MathUtils.randomInt(params.range[0], params.range[1]),
      y: MathUtils.randomInt(params.range[0], params.range[1]),
    };
    const B = {
      x: A.x + MathUtils.randomInt(2, 6),
      y: A.y + MathUtils.randomInt(-2, 4),
    };
    const C = {
      x: B.x + MathUtils.randomInt(-2, 4),
      y: B.y + MathUtils.randomInt(3, 7),
    };
    const D = { x: A.x + C.x - B.x, y: A.y + C.y - B.y };

    return { A, B, C, D };
  }

  /**
   * Get templates for parallelogram vertex problem
   */
  static getParallelogramVertexTemplates(A, B, C) {
    return [
      () => `Wierzchołki równoległoboku ABCD: $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y}), C(${C.x},${C.y})$$. Oblicz współrzędne wierzchołka $$D$$.`,
      () => `Dla równoległoboku ABCD z wierzchołkami $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y})$$, $$C(${C.x},${C.y})$$ znajdź D:`,
      () => `Znajdź wierzchołek D równoległoboku ABCD, gdy $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y})$$, $$C(${C.x},${C.y})$$:`,
      () => `Wyznacz współrzędne D równoległoboku o wierzchołkach $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y})$$, $$C(${C.x},${C.y})$$:`,
      () => `Oblicz D dla równoległoboku z wierzchołkami $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y})$$, $$C(${C.x},${C.y})$$:`,
      () => `Dla $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y})$$, $$C(${C.x},${C.y})$$ znajdź wierzchołek D:`,
      () => `Znajdź współrzędne wierzchołka D równoległoboku ABCD: $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y})$$, $$C(${C.x},${C.y})$$:`,
      () => `Wyznacz D dla równoległoboku z wierzchołkami $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y})$$, $$C(${C.x},${C.y})$$:`,
      () => `Oblicz współrzędne D równoległoboku ABCD z $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y})$$, $$C(${C.x},${C.y})$$:`,
      () => `Dla równoległoboku ABCD ze znanymi A, B, C znajdź D: $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y})$$, $$C(${C.x},${C.y})$$:`,
      () => `Znajdź brakujący wierzchołek D równoległoboku: $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y})$$, $$C(${C.x},${C.y})$$:`,
      () => `Wyznacz wierzchołek D równoległoboku ABCD dla $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y})$$, $$C(${C.x},${C.y})$$:`,
      () => `Oblicz współrzędne punktu D równoległoboku: $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y})$$, $$C(${C.x},${C.y})$$:`,
      () => `Dla $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y})$$, $$C(${C.x},${C.y})$$ oblicz wierzchołek D:`,
      () => `Znajdź D równoległoboku ABCD o wierzchołkach $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y})$$, $$C(${C.x},${C.y})$$:`,
      () => `Wyznacz punkt D dla równoległoboku z $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y})$$, $$C(${C.x},${C.y})$$:`,
      () => `Oblicz brakujący wierzchołek D: $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y})$$, $$C(${C.x},${C.y})$$:`,
      () => `Dla równoległoboku z wierzchołkami $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y})$$, $$C(${C.x},${C.y})$$ znajdź D:`,
      () => `Znajdź współrzędne D w równoległoboku ABCD: $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y})$$, $$C(${C.x},${C.y})$$:`,
      () => `Wyznacz D dla $$A(${A.x},${A.y})$$, $$B(${B.x},${B.y})$$, $$C(${C.x},${C.y})$$ w równoległoboku:`,
    ];
  }

  /**
   * Generate distractors for parallelogram vertex problem
   */
  static generateParallelogramVertexDistractors(A, B, C, D) {
    const correctAnswer = `(${D.x}, ${D.y})`;
    const candidates = [
      `(${B.x + C.x - A.x}, ${B.y + C.y - A.y})`,
      `(${A.x + B.x - C.x}, ${A.y + B.y - C.y})`,
      `(${(A.x + C.x) / 2}, ${(A.y + C.y) / 2})`,
      `(${A.x}, ${A.y})`,
      `(${B.x}, ${B.y})`,
      `(${C.x}, ${C.y})`,
      `(${D.x + 1}, ${D.y})`,
      `(${D.x}, ${D.y + 1})`,
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
   * Get parameters for triangle area coords problem
   */
  static getTriangleAreaCoordsParams(difficulty) {
    if (difficulty === "easy") return { range: [-3, 3] };
    else return { range: [-6, 6] };
  }

  /**
   * Generate data for triangle area coords problem
   */
  static generateTriangleAreaCoordsData(difficulty) {
    const params = this.getTriangleAreaCoordsParams(difficulty);
    const isHorizontal = difficulty === "easy" || Math.random() > 0.5;

    let x1, y1, x2, y2, x3, y3;
    let base, h;

    if (isHorizontal) {
      const y_base = MathUtils.randomInt(params.range[0], params.range[1]);
      x1 = MathUtils.randomInt(params.range[0], 0);
      x2 = x1 + MathUtils.randomInt(3, 8);
      x3 = MathUtils.randomInt(params.range[0], params.range[1]);
      y3 = y_base + MathUtils.randomElement([-3, -4, 3, 4]);

      y1 = y_base;
      y2 = y_base;
      base = Math.abs(x2 - x1);
      h = Math.abs(y3 - y_base);
    } else {
      const x_base = MathUtils.randomInt(params.range[0], params.range[1]);
      y1 = MathUtils.randomInt(params.range[0], 0);
      y2 = y1 + MathUtils.randomInt(3, 8);
      y3 = MathUtils.randomInt(params.range[0], params.range[1]);
      x3 = x_base + MathUtils.randomElement([-3, -4, 3, 4]);

      x1 = x_base;
      x2 = x_base;
      base = Math.abs(y2 - y1);
      h = Math.abs(x3 - x_base);
    }

    const area = 0.5 * base * h;

    return { x1, y1, x2, y2, x3, y3, base, h, area, isHorizontal };
  }

  /**
   * Get templates for triangle area coords problem
   */
  static getTriangleAreaCoordsTemplates(x1, y1, x2, y2, x3, y3) {
    return [
      () => `Oblicz pole trójkąta o wierzchołkach $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$.`,
      () => `Znajdź pole trójkąta ABC z wierzchołkami $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$:`,
      () => `Wyznacz pole trójkąta o wierzchołkach $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$:`,
      () => `Dla trójkąta z wierzchołkami $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$ oblicz pole:`,
      () => `Pole trójkąta ABC: $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$ wynosi:`,
      () => `Znajdź pole trójkąta o wierzchołkach $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$:`,
      () => `Oblicz pole trójkąta ABC dla $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$:`,
      () => `Wyznacz pole trójkąta z wierzchołkami $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$:`,
      () => `Dla $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$ znajdź pole trójkąta:`,
      () => `Pole trójkąta o wierzchołkach $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$:`,
      () => `Znajdź pole trójkąta ABC: $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$:`,
      () => `Oblicz pole trójkąta dla wierzchołków $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$:`,
      () => `Wyznacz pole trójkąta ABC: $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$:`,
      () => `Dla trójkąta ABC ze współrzędnymi $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$ oblicz pole:`,
      () => `Znajdź pole trójkąta ze współrzędnymi $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$:`,
      () => `Oblicz pole trójkąta o podanych wierzchołkach $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$:`,
      () => `Pole trójkąta z wierzchołkami $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$ wynosi:`,
      () => `Wyznacz pole trójkąta dla $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$:`,
      () => `Znajdź pole trójkąta ABC o wierzchołkach $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$:`,
      () => `Dla $$A(${x1},${y1})$$, $$B(${x2},${y2})$$, $$C(${x3},${y3})$$ oblicz pole trójkąta ABC:`,
    ];
  }

  /**
   * Generate distractors for triangle area coords problem
   */
  static generateTriangleAreaCoordsDistractors(area, base, h) {
    const candidates = [
      area * 2,
      base + h,
      area + 2,
      area - 2,
      Math.abs(area - 1),
      (base * h) / 4,
      base * h + 2,
    ];

    const uniqueDistractors = [];
    const usedValues = new Set();
    usedValues.add(area);

    for (const val of candidates) {
      if (val > 0 && !usedValues.has(val)) {
        uniqueDistractors.push(`${val}`);
        usedValues.add(val);
      }
      if (uniqueDistractors.length === 3) break;
    }

    let offset = 1;
    while (uniqueDistractors.length < 3) {
      const val = area + offset;
      if (val > 0 && !usedValues.has(val)) {
        uniqueDistractors.push(`${val}`);
        usedValues.add(val);
      }
      offset = offset > 0 ? -offset : -offset + 1;
    }

    return uniqueDistractors;
  }
}

module.exports = ShapesCoordsValues;
