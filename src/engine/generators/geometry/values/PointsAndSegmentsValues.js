const MathUtils = require("../../../utils/MathUtils");

class PointsAndSegmentsValues {
  /**
   * Get parameters for midpoint problem
   */
  static getMidpointParams(difficulty) {
    if (difficulty === "easy") {
      return { range: [-4, 4], dxMult: 2, dyMult: 2 };
    } else if (difficulty === "hard") {
      return { range: [-8, 8], dxMult: 1, dyMult: 1 };
    } else {
      return { range: [-6, 6], dxMult: 1, dyMult: 1 };
    }
  }

  /**
   * Generate data for midpoint problem
   */
  static generateMidpointData(difficulty) {
    const params = this.getMidpointParams(difficulty);

    const A = {
      x: MathUtils.randomInt(params.range[0], params.range[1]),
      y: MathUtils.randomInt(params.range[0], params.range[1]),
    };

    const dx = MathUtils.randomInt(1, 5) * params.dxMult;
    const dy = MathUtils.randomInt(1, 5) * params.dyMult;

    const B = { x: A.x + dx, y: A.y + dy };
    const S = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };

    const lengthSquared = Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2);
    const lengthStr = Number.isInteger(Math.sqrt(lengthSquared))
      ? `${Math.sqrt(lengthSquared)}`
      : `\\sqrt{${lengthSquared}}`;

    return { A, B, S, dx, dy, lengthSquared, lengthStr };
  }

  /**
   * Get templates for midpoint problem
   */
  static getMidpointTemplates(A, B) {
    return [
      () => `Dane są punkty $$A=(${A.x}, ${A.y})$$ i $$B=(${B.x}, ${B.y})$$. Oblicz środek i długość odcinka.`,
      () => `Dla punktów $$A=(${A.x}, ${A.y})$$ i $$B=(${B.x}, ${B.y})$$ znajdź środek i długość odcinka AB.`,
      () => `Punkty $$A=(${A.x}, ${A.y})$$ i $$B=(${B.x}, ${B.y})$$ wyznaczają odcinek. Oblicz środek i długość.`,
      () => `Oblicz środek i długość odcinka AB dla $$A=(${A.x}, ${A.y})$$ i $$B=(${B.x}, ${B.y})$$.`,
      () => `Znajdź środek oraz długość odcinka o końcach $$A=(${A.x}, ${A.y})$$ i $$B=(${B.x}, ${B.y})$$.`,
      () => `Dla odcinka z końcami $$A=(${A.x}, ${A.y})$$ i $$B=(${B.x}, ${B.y})$$ wyznacz środek i długość.`,
      () => `Wyznacz środek i długość odcinka AB, gdzie $$A=(${A.x}, ${A.y})$$ i $$B=(${B.x}, ${B.y})$$.`,
      () => `Oblicz współrzędne środka i długość odcinka $$A=(${A.x}, ${A.y})$$, $$B=(${B.x}, ${B.y})$$.`,
      () => `Znajdź środek odcinka oraz jego długość dla punktów $$A=(${A.x}, ${A.y})$$ i $$B=(${B.x}, ${B.y})$$.`,
      () => `Dla punktów $$A=(${A.x}, ${A.y})$$ i $$B=(${B.x}, ${B.y})$$ oblicz środek i |AB|.`,
      () => `Punkty $$A=(${A.x}, ${A.y})$$ i $$B=(${B.x}, ${B.y})$$. Znajdź środek S i długość |AB|.`,
      () => `Wyznacz S i |AB| dla odcinka o końcach $$A=(${A.x}, ${A.y})$$ i $$B=(${B.x}, ${B.y})$$.`,
      () => `Oblicz środek S i długość odcinka AB: $$A=(${A.x}, ${A.y})$$, $$B=(${B.x}, ${B.y})$$.`,
      () => `Znajdź współrzędne środka i miarę długości odcinka $$A=(${A.x}, ${A.y})$$, $$B=(${B.x}, ${B.y})$$.`,
      () => `Dla $$A=(${A.x}, ${A.y})$$ i $$B=(${B.x}, ${B.y})$$ podaj środek i długość odcinka.`,
      () => `Wyznacz środek S oraz długość |AB| odcinka: $$A=(${A.x}, ${A.y})$$, $$B=(${B.x}, ${B.y})$$.`,
      () => `Oblicz S i |AB| dla punktów $$A=(${A.x}, ${A.y})$$ i $$B=(${B.x}, ${B.y})$$.`,
      () => `Znajdź środek i długość: $$A=(${A.x}, ${A.y})$$, $$B=(${B.x}, ${B.y})$$.`,
      () => `Dla odcinka AB($$A=(${A.x}, ${A.y})$$, $$B=(${B.x}, ${B.y})$$) oblicz S i |AB|.`,
      () => `Punkty końcowe $$A=(${A.x}, ${A.y})$$ i $$B=(${B.x}, ${B.y})$$. Wyznacz środek i długość.`,
    ];
  }

  /**
   * Generate distractors for midpoint problem
   */
  static generateMidpointDistractors(S, B, A, lengthSquared, lengthStr) {
    const correctAnswer = `S=(${S.x}, ${S.y}), |AB|=${lengthStr}`;
    const candidates = [
      `S=(${S.x}, ${S.y}), |AB|=${lengthSquared}`,
      `S=(${B.x - A.x}, ${B.y - A.y}), |AB|=${lengthStr}`,
      `S=(${S.y}, ${S.x}), |AB|=${lengthStr}`,
      `S=(${2*S.x}, ${2*S.y}), |AB|=${lengthStr}`,
      `S=(${S.x + 1}, ${S.y}), |AB|=${lengthStr}`,
      `S=(${S.x}, ${S.y + 1}), |AB|=${lengthStr}`,
      `S=(${S.x}, ${S.y}), |AB|=${Math.sqrt(lengthSquared).toFixed(1)}`,
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
   * Get parameters for missing endpoint problem
   */
  static getMissingEndpointParams(difficulty) {
    if (difficulty === "easy") return { range: [-4, 4] };
    else return { range: [-8, 8] };
  }

  /**
   * Generate data for missing endpoint problem
   */
  static generateMissingEndpointData(difficulty) {
    const params = this.getMissingEndpointParams(difficulty);

    const A = {
      x: MathUtils.randomInt(params.range[0], params.range[1]),
      y: MathUtils.randomInt(params.range[0], params.range[1]),
    };
    const S = {
      x: MathUtils.randomInt(params.range[0], params.range[1]),
      y: MathUtils.randomInt(params.range[0], params.range[1]),
    };

    // B = 2S - A
    const B = { x: 2 * S.x - A.x, y: 2 * S.y - A.y };

    return { A, B, S };
  }

  /**
   * Get templates for missing endpoint problem
   */
  static getMissingEndpointTemplates(S, A) {
    return [
      () => `Punkt $$S=(${S.x}, ${S.y})$$ jest środkiem odcinka AB. Wiedząc, że $$A=(${A.x}, ${A.y})$$ oblicz B.`,
      () => `Środek odcinka AB to $$S=(${S.x}, ${S.y})$$. Dla $$A=(${A.x}, ${A.y})$$ znajdź współrzędne B.`,
      () => `Dla $$A=(${A.x}, ${A.y})$$ i środka $$S=(${S.x}, ${S.y})$$ odcinka AB wyznacz punkt B.`,
      () => `Znajdź punkt B końca odcinka, gdy $$A=(${A.x}, ${A.y})$$ i środek to $$S=(${S.x}, ${S.y})$$.`,
      () => `Oblicz współrzędne B, jeśli środek odcinka AB to $$S=(${S.x}, ${S.y})$$ i $$A=(${A.x}, ${A.y})$$.`,
      () => `Wyznacz B, gdy $$S=(${S.x}, ${S.y})$$ jest środkiem odcinka AB, a $$A=(${A.x}, ${A.y})$$.`,
      () => `Punkt $$S=(${S.x}, ${S.y})$$ dzieli odcinek AB na pół. Dla $$A=(${A.x}, ${A.y})$$ znajdź B.`,
      () => `Znajdź drugi koniec odcinka B, gdy $$A=(${A.x}, ${A.y})$$ i $$S=(${S.x}, ${S.y})$$.`,
      () => `Dla środka $$S=(${S.x}, ${S.y})$$ i punktu $$A=(${A.x}, ${A.y})$$ oblicz współrzędne B.`,
      () => `Oblicz B, mając dane $$A=(${A.x}, ${A.y})$$ i środek odcinka $$S=(${S.x}, ${S.y})$$.`,
      () => `Wiedząc że $$S=(${S.x}, ${S.y})$$ to środek AB i $$A=(${A.x}, ${A.y})$$, znajdź B.`,
      () => `Znajdź punkt B, gdy $$A=(${A.x}, ${A.y})$$ i $$S=(${S.x}, ${S.y})$$ to środek AB.`,
      () => `Punkt $$S=(${S.x}, ${S.y})$$ to środek odcinka z końcem $$A=(${A.x}, ${A.y})$$. Oblicz B.`,
      () => `Wyznacz współrzędne B dla środka $$S=(${S.x}, ${S.y})$$ i $$A=(${A.x}, ${A.y})$$.`,
      () => `Dla $$A=(${A.x}, ${A.y})$$ i środka $$S=(${S.x}, ${S.y})$$ znajdź drugi koniec B.`,
      () => `Oblicz współrzędne punktu B, gdy $$S=(${S.x}, ${S.y})$$ i $$A=(${A.x}, ${A.y})$$.`,
      () => `Znajdź B, mając $$A=(${A.x}, ${A.y})$$ i środek odcinka $$S=(${S.x}, ${S.y})$$.`,
      () => `Punkt $$S=(${S.x}, ${S.y})$$ to środek AB. Dla $$A=(${A.x}, ${A.y})$$ podaj B.`,
      () => `Wyznacz punkt B odcinka, którego środek to $$S=(${S.x}, ${S.y})$$ i $$A=(${A.x}, ${A.y})$$.`,
      () => `Dla odcinka ze środkiem $$S=(${S.x}, ${S.y})$$ i końcem $$A=(${A.x}, ${A.y})$$ znajdź B.`,
    ];
  }

  /**
   * Generate distractors for missing endpoint problem
   */
  static generateMissingEndpointDistractors(B, S, A) {
    const correctAnswer = `B=(${B.x}, ${B.y})`;
    const candidates = [
      `B=(${S.x - A.x}, ${S.y - A.y})`,
      `B=(\\frac{${A.x}+${S.x}}{2}, \\frac{${A.y}+${S.y}}{2})`,
      `B=(${A.x}, ${A.y})`,
      `B=(${2*A.x - S.x}, ${2*A.y - S.y})`,
      `B=(${S.x}, ${S.y})`,
      `B=(${A.x + S.x}, ${A.y + S.y})`,
      `B=(${B.x + 1}, ${B.y})`,
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
   * Get parameters for distance unknown coord problem
   */
  static getDistanceUnknownCoordParams(difficulty) {
    if (difficulty === "easy") {
      return {
        triples: [
          [3, 4, 5],
          [6, 8, 10],
          [5, 12, 13],
          [9, 12, 15],
        ],
      };
    } else {
      return {
        triples: [
          [5, 12, 13],
          [8, 15, 17],
          [7, 24, 25],
          [20, 21, 29],
          [12, 35, 37],
          [9, 40, 41],
        ],
      };
    }
  }

  /**
   * Generate data for distance unknown coord problem
   */
  static generateDistanceUnknownCoordData(difficulty) {
    const params = this.getDistanceUnknownCoordParams(difficulty);
    const triple = MathUtils.randomElement(params.triples);
    const swap = Math.random() > 0.5;
    const dx = swap ? triple[1] : triple[0];
    const dy = swap ? triple[0] : triple[1];
    const d = triple[2];

    // Losowe x1 i y1 dla większej różnorodności
    const x1 = MathUtils.randomInt(0, 5);
    const y1 = MathUtils.randomInt(0, 5);
    const x2 = x1 + dx;

    const targetDy = Math.random() > 0.5 ? dy : -dy;
    const m = y1 + targetDy;

    return { x1, y1, x2, m, d, dx, dy, triple };
  }

  /**
   * Get templates for distance unknown coord problem
   */
  static getDistanceUnknownCoordTemplates(x1, y1, x2, d) {
    return [
      () => `Punkty $$A=(${x1}, ${y1})$$ i $$B=(${x2}, m)$$ są odległe o $$${d}$$. Jedną z możliwych wartości $$m$$ jest:`,
      () => `Dla $$|AB| = ${d}$$, $$A=(${x1}, ${y1})$$ i $$B=(${x2}, m)$$ podaj możliwą wartość $$m$$:`,
      () => `Odległość między $$A=(${x1}, ${y1})$$ a $$B=(${x2}, m)$$ wynosi $$${d}$$. Znajdź $$m$$:`,
      () => `Oblicz $$m$$, gdy $$|AB| = ${d}$$ dla $$A=(${x1}, ${y1})$$ i $$B=(${x2}, m)$$:`,
      () => `Dla $$A=(${x1}, ${y1})$$ i $$B=(${x2}, m)$$ odległych o $$${d}$$ wyznacz $$m$$:`,
      () => `Jedna z wartości $$m$$, gdy $$A=(${x1}, ${y1})$$ i $$B=(${x2}, m)$$ mają odległość $$${d}$$:`,
      () => `Znajdź możliwe $$m$$ dla punktów odległych o $$${d}$$: $$A=(${x1}, ${y1})$$, $$B=(${x2}, m)$$,`,
      () => `Wyznacz $$m$$, jeśli odległość $$A=(${x1}, ${y1})$$ od $$B=(${x2}, m)$$ wynosi $$${d}$$:`,
      () => `Dla odległości $$|AB| = ${d}$$ punktów $$A=(${x1}, ${y1})$$ i $$B=(${x2}, m)$$ podaj $$m$$:`,
      () => `Oblicz jedną z możliwych wartości $$m$$ dla $$A=(${x1}, ${y1})$$ i $$B=(${x2}, m)$$ z $$|AB| = ${d}$$:`,
      () => `Znajdź $$m$$ gdy $$A=(${x1}, ${y1})$$ i $$B=(${x2}, m)$$ są odległe o $$${d}$$:`,
      () => `Punkty odległe o $$${d}$$: $$A=(${x1}, ${y1})$$ i $$B=(${x2}, m)$$. Wyznacz $$m$$:`,
      () => `Dla $$|AB| = ${d}$$ znajdź wartość $$m$$ parametru w $$B=(${x2}, m)$$:`,
      () => `Jedna z wartości parametru $$m$$ dla $$A=(${x1}, ${y1})$$ i $$B=(${x2}, m)$$ z $$|AB|=${d}$$:`,
      () => `Oblicz $$m$$, gdy odległość między $$A=(${x1}, ${y1})$$ a $$B=(${x2}, m)$$ to $$${d}$$:`,
      () => `Wyznacz jedno z możliwych $$m$$ dla $$A=(${x1}, ${y1})$$ i $$B=(${x2}, m)$$ odległych o $$${d}$$:`,
      () => `Znajdź wartość $$m$$, gdy $$A=(${x1}, ${y1})$$ i $$B=(${x2}, m)$$ mają $$|AB| = ${d}$$:`,
      () => `Dla $$A=(${x1}, ${y1})$$ i $$B=(${x2}, m)$$ z odległością $$${d}$$ podaj $$m$$:`,
      () => `Wyznacz możliwe $$m$$ dla punktów $$A=(${x1}, ${y1})$$ i $$B=(${x2}, m)$$ odległych o $$${d}$$:`,
      () => `Oblicz $$m$$, mając $$|AB| = ${d}$$ dla $$A=(${x1}, ${y1})$$ i $$B=(${x2}, m)$$:`,
    ];
  }

  /**
   * Generate distractors for distance unknown coord problem
   */
  static generateDistanceUnknownCoordDistractors(m, y1, x2, d, dy) {
    const candidates = [y1 - (m - y1), m + 2, m - 2, y1, x2, d, m + dy, 0];

    const uniqueDistractors = [];
    const usedValues = new Set();
    usedValues.add(m);

    for (const cand of candidates) {
      if (!usedValues.has(cand)) {
        uniqueDistractors.push(`${cand}`);
        usedValues.add(cand);
      }
      if (uniqueDistractors.length === 3) break;
    }

    let offset = 1;
    while (uniqueDistractors.length < 3) {
      const val = m + offset;
      if (!usedValues.has(val)) {
        uniqueDistractors.push(`${val}`);
        usedValues.add(val);
      }
      offset = offset > 0 ? -offset : -offset + 1;
    }

    return uniqueDistractors;
  }

  /**
   * Get parameters for point symmetry problem
   */
  static getPointSymmetryParams(difficulty) {
    if (difficulty === "easy") {
      return { types: ["Ox", "Oy"] };
    } else {
      return { types: ["Ox", "Oy", "(0,0)"] };
    }
  }

  /**
   * Generate data for point symmetry problem
   */
  static generatePointSymmetryData(difficulty) {
    let P;
    do {
      P = { x: MathUtils.randomInt(-6, 6), y: MathUtils.randomInt(-6, 6) };
    } while (P.x === 0 && P.y === 0);
    
    const params = this.getPointSymmetryParams(difficulty);
    const type = MathUtils.randomElement(params.types);
    
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
    }

    return { P, type, resX, resY };
  }

  /**
   * Get templates for point symmetry problem
   */
  static getPointSymmetryTemplates(P, type) {
    return [
      () => `Oblicz obraz punktu $$P(${P.x}, ${P.y})$$ w symetrii względem osi ${type}.`,
      () => `Znajdź obraz punktu $$P(${P.x}, ${P.y})$$ w symetrii względem ${type}.`,
      () => `Wyznacz punkt symetryczny do $$P(${P.x}, ${P.y})$$ względem ${type}.`,
      () => `Jaki jest obraz punktu $$P(${P.x}, ${P.y})$$ w symetrii względem ${type}?`,
      () => `Znajdź odbicie punktu $$P(${P.x}, ${P.y})$$ względem ${type}.`,
      () => `Wyznacz obraz $$P(${P.x}, ${P.y})$$ w symetrii względem osi ${type}.`,
      () => `Punkt $$P(${P.x}, ${P.y})$$ - obraz w symetrii względem ${type}:`,
      () => `Oblicz punkt symetryczny do $$(${P.x}, ${P.y})$$ względem ${type}.`,
      () => `Znajdź punkt odbicia $$P(${P.x}, ${P.y})$$ względem ${type}.`,
      () => `Współrzędne punktu symetrycznego do $$P(${P.x}, ${P.y})$$ względem ${type}:`,
      () => `Obraz $$P(${P.x}, ${P.y})$$ w symetrii ${type}:`,
      () => `Jakie współrzędne ma obraz $$P(${P.x}, ${P.y})$$ w symetrii ${type}?`,
      () => `Znajdź punkt symetryczny do $$(${P.x}, ${P.y})$$ przy symetrii ${type}.`,
      () => `Wyznacz odbicie punktu $$P(${P.x}, ${P.y})$$ względem osi ${type}.`,
      () => `Punkt symetryczny do $$P(${P.x}, ${P.y})$$ względem ${type}:`,
      () => `Oblicz odbicie $$P(${P.x}, ${P.y})$$ w symetrii względem ${type}.`,
      () => `Znajdź obraz punktu $$(${P.x}, ${P.y})$$ w symetrii ${type}.`,
      () => `Współrzędne obrazu $$P(${P.x}, ${P.y})$$ w symetrii ${type}:`,
      () => `Punkt odbicia $$P(${P.x}, ${P.y})$$ względem osi ${type}:`,
      () => `Jaki punkt jest obrazem $$P(${P.x}, ${P.y})$$ w symetrii ${type}?`,
    ];
  }

  /**
   * Generate distractors for point symmetry problem
   */
  static generatePointSymmetryDistractors(P, resX, resY) {
    const correctAnswer = `(${resX}, ${resY})`;
    const candidates = [
      `(${P.x}, ${P.y})`,
      `(${-resX}, ${-resY})`,
      `(${P.y}, ${P.x})`,
      `(${-P.x}, ${-P.y})`,
      `(${-P.y}, ${-P.x})`,
      `(${resY}, ${resX})`,
      `(${P.x}, ${-P.y})`,
      `(${-P.x}, ${P.y})`,
      `(0, 0)`,
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
   * Get parameters for collinear points problem
   */
  static getCollinearPointsParams(difficulty) {
    if (difficulty === "easy") {
      return { aRange: [-2, 2], aDen: 1 };
    } else {
      return { aRange: [-5, 5], aDen: MathUtils.randomElement([1, 2]) };
    }
  }

  /**
   * Generate data for collinear points problem
   */
  static generateCollinearPointsData(difficulty) {
    const params = this.getCollinearPointsParams(difficulty);

    const a_num = MathUtils.randomInt(params.aRange[0], params.aRange[1]) || 1;
    const a_val = a_num / params.aDen;
    const b_int = MathUtils.randomInt(-5, 5);

    // A=(1, ...), B=(3, ...)
    // y = ax+b
    // C=(m, ...)
    const A2 = { x: 1 * params.aDen, y: a_num * 1 + b_int };
    const B2 = { x: 3 * params.aDen, y: a_num * 3 + b_int };

    const m_sol = MathUtils.randomInt(-4, 4);
    const C_val = a_val * m_sol + b_int;
    const C_val_str = Number.isInteger(C_val) ? `${C_val}` : C_val.toFixed(1);

    return { A2, B2, a_num, a_val, b_int, m_sol, C_val, C_val_str };
  }

  /**
   * Get templates for collinear points problem
   */
  static getCollinearPointsTemplates(A2, B2, C_val_str) {
    return [
      () => `Punkty $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$ i $$C=(m, ${C_val_str})$$ są współliniowe. Wynika stąd, że:`,
      () => `Dla punktów współliniowych $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$, $$C=(m, ${C_val_str})$$ znajdź $$m$$:`,
      () => `Punkty $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$ i $$C=(m, ${C_val_str})$$ leżą na jednej prostej. Wyznacz $$m$$:`,
      () => `Znajdź $$m$$, jeśli $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$ i $$C=(m, ${C_val_str})$$ są współliniowe:`,
      () => `Dla $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$ i $$C=(m, ${C_val_str})$$ na jednej prostej oblicz $$m$$:`,
      () => `Współliniowość punktów $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$, $$C=(m, ${C_val_str})$$. Znajdź $$m$$:`,
      () => `Oblicz $$m$$, gdy $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$ i $$C=(m, ${C_val_str})$$ są współliniowe:`,
      () => `Punkty $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$, $$C=(m, ${C_val_str})$$ na prostej. Wyznacz $$m$$:`,
      () => `Znajdź wartość $$m$$ dla współliniowych punktów $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$, $$C=(m, ${C_val_str})$$:`,
      () => `Dla punktów $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$ i $$C=(m, ${C_val_str})$$ na jednej prostej podaj $$m$$:`,
      () => `Wyznacz $$m$$, jeśli trzy punkty $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$, $$C=(m, ${C_val_str})$$ są współliniowe:`,
      () => `Oblicz parametr $$m$$ dla współliniowych punktów $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$, $$C=(m, ${C_val_str})$$:`,
      () => `Znajdź $$m$$ takie, że $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$ i $$C=(m, ${C_val_str})$$ leżą na prostej:`,
      () => `Dla $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$, $$C=(m, ${C_val_str})$$ na prostej znajdź $$m$$:`,
      () => `Współliniowe punkty $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$, $$C=(m, ${C_val_str})$$. Oblicz $$m$$:`,
      () => `Znajdź $$m$$, gdy punkty $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$, $$C=(m, ${C_val_str})$$ są współliniowe:`,
      () => `Oblicz wartość $$m$$, jeśli $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$ i $$C=(m, ${C_val_str})$$ leżą na jednej prostej:`,
      () => `Dla współliniowych $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$, $$C=(m, ${C_val_str})$$ wyznacz $$m$$:`,
      () => `Punkty $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$, $$C=(m, ${C_val_str})$$ - współliniowość. Znajdź $$m$$:`,
      () => `Wyznacz parametr $$m$$, gdy $$A=(${A2.x}, ${A2.y})$$, $$B=(${B2.x}, ${B2.y})$$, $$C=(m, ${C_val_str})$$ są na prostej:`,
    ];
  }

  /**
   * Generate distractors for collinear points problem
   */
  static generateCollinearPointsDistractors(m_sol) {
    const correctAnswer = `m = ${m_sol}`;
    const candidates = [
      `m = ${m_sol + 1}`,
      `m = ${-m_sol}`,
      `m = 0`,
      `m = ${m_sol - 1}`,
      `m = ${m_sol + 2}`,
      `m = 1`,
      `m = -1`,
      `m = ${2 * m_sol}`,
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
}

module.exports = PointsAndSegmentsValues;
