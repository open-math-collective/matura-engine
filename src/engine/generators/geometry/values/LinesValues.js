const MathUtils = require("../../../utils/MathUtils");

class LinesValues {
  /**
   * Get parameters for line through two points
   */
  static getLineThroughTwoPointsParams(difficulty) {
    if (difficulty === "easy") {
      return {
        dxRange: [1, 1],
        dyRange: [-3, 3],
      };
    } else if (difficulty === "hard") {
      return {
        dxRange: [2, 5],
        dyRange: [-5, 5],
      };
    } else {
      return {
        dxRange: [1, 3],
        dyRange: [-4, 4],
      };
    }
  }

  /**
   * Generate data for line through two points
   */
  static generateLineThroughTwoPointsData(difficulty) {
    const params = this.getLineThroughTwoPointsParams(difficulty);

    const x1 = MathUtils.randomInt(-5, 5);
    const y1 = MathUtils.randomInt(-5, 5);
    const dx = MathUtils.randomInt(params.dxRange[0], params.dxRange[1]);
    const dy = MathUtils.randomInt(params.dyRange[0], params.dyRange[1]);

    if (dx === 0) return this.generateLineThroughTwoPointsData(difficulty);
    if (dy === 0 && difficulty !== "easy")
      return this.generateLineThroughTwoPointsData(difficulty);

    const x2 = x1 + dx;
    const y2 = y1 + dy;
    const a = dy / dx;
    const b = y1 - a * x1;

    const A = { x: x1, y: y1 };
    const B = { x: x2, y: y2 };

    return { A, B, a, b, dx, dy };
  }

  /**
   * Get templates for line through two points
   */
  static getLineThroughTwoPointsTemplates() {
    return [
      () => "Podaj równanie prostej przechodzącej przez punkty:",
      () => "Wyznacz równanie prostej przechodzącej przez punkty A i B:",
      () =>
        "Znajdź wzór funkcji liniowej, której wykres przechodzi przez punkty:",
      () => "Dla punktów A i B podaj równanie prostej:",
      () => "Oblicz równanie prostej przechodzącej przez punkty:",
      () => "Wyznacz wzór prostej przechodzącej przez punkty A i B:",
      () => "Znajdź równanie prostej określonej przez punkty:",
      () => "Podaj wzór prostej przechodzącej przez dane punkty:",
      () => "Dla podanych punktów wyznacz równanie prostej:",
      () => "Oblicz wzór funkcji liniowej przechodzącej przez punkty:",
      () => "Znajdź równanie prostej zawierającej punkty A i B:",
      () => "Wyznacz wzór prostej przechodzącej przez punkty A i B:",
      () => "Podaj równanie funkcji liniowej dla punktów:",
      () => "Dla punktów A i B znajdź równanie prostej:",
      () => "Oblicz wzór prostej przechodzącej przez punkty A i B:",
      () => "Wyznacz funkcję liniową, której wykres zawiera punkty:",
      () => "Znajdź równanie prostej przechodzącej przez punkty A i B:",
      () => "Podaj wzór prostej dla podanych punktów:",
      () => "Dla punktów wyznacz równanie prostej:",
      () => "Oblicz równanie prostej przechodzącej przez A i B:",
    ];
  }

  /**
   * Generate distractors for line through two points
   */
  static generateLineThroughTwoPointsDistractors(a, b) {
    const candidates = [
      `y = ${this.formatLineEquation(-a, b)}`,
      `y = ${this.formatLineEquation(a, -b)}`,
      `y = ${this.formatLineEquation(b, a)}`,
      `y = ${this.formatLineEquation(-a, -b)}`,
      `y = ${this.formatLineEquation(2 * a, b)}`,
      `y = ${this.formatLineEquation(a, 2 * b)}`,
      `y = ${this.formatLineEquation(-b, a)}`,
    ];

    const correctAnswer = `y = ${this.formatLineEquation(a, b)}`;
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
   * Get parameters for relative line (parallel/perpendicular)
   */
  static getRelativeLineParams(difficulty) {
    if (difficulty === "easy") {
      return {
        aNumRange: [-3, 3],
        aDenRange: [1, 1],
      };
    } else if (difficulty === "hard") {
      return {
        aNumRange: [-5, 5],
        aDenRange: [2, 5],
      };
    } else {
      return {
        aNumRange: [-2, 2],
        aDenRange: [1, 2],
      };
    }
  }

  /**
   * Generate data for relative line
   */
  static generateRelativeLineData(difficulty, mode) {
    const params = this.getRelativeLineParams(difficulty);

    let a1_num = MathUtils.randomInt(params.aNumRange[0], params.aNumRange[1]);
    if (a1_num === 0) a1_num = 1;
    let a1_den = MathUtils.randomInt(params.aDenRange[0], params.aDenRange[1]);

    const a1 = a1_num / a1_den;
    const b1 = MathUtils.randomInt(-5, 5);
    const P = {
      x: MathUtils.randomInt(-3, 3) * a1_den,
      y: MathUtils.randomInt(-5, 5),
    };

    const a2 = mode === "parallel" ? a1 : -1 / a1;
    const b2 = P.y - a2 * P.x;

    return { a1, b1, P, a2, b2, mode };
  }

  /**
   * Get templates for relative line
   */
  static getRelativeLineTemplates(mode, P, eq1) {
    const relation = mode === "parallel" ? "równoległej" : "prostopadłej";
    return [
      () =>
        `Wyznacz równanie prostej $$l$$ przechodzącej przez punkt $$P=(${P.x}, ${P.y})$$ i ${relation} do prostej $$k$$:`,
      () =>
        `Znajdź równanie prostej $$l$$ przechodzącej przez $$P(${P.x}, ${P.y})$$ i ${relation} do $$k$$:`,
      () =>
        `Dla punktu $$P(${P.x}, ${P.y})$$ podaj równanie prostej ${relation} do $$k$$:`,
      () =>
        `Wyznacz $$l$$ przechodzącą przez $$P(${P.x}, ${P.y})$$ i ${relation} do prostej $$k$$:`,
      () =>
        `Znajdź $$l: y=...$$ dla punktu $$P(${P.x}, ${P.y})$$ ${relation} do $$k$$:`,
      () =>
        `Prosta $$l$$ przez $$P(${P.x}, ${P.y})$$ ${relation} do $$k$$ ma równanie:`,
      () =>
        `Podaj równanie $$l$$ przechodzącej przez $$P(${P.x}, ${P.y})$$ i ${relation} do $$k$$:`,
      () => `Dla $$P(${P.x}, ${P.y})$$ wyznacz $$l$$ ${relation} do $$k$$:`,
      () =>
        `Oblicz równanie $$l$$ przechodzącej przez $$P(${P.x}, ${P.y})$$ i ${relation} do $$k$$:`,
      () =>
        `Znajdź $$l$$ dla punktu $$P(${P.x}, ${P.y})$$ ${relation} do prostej $$k$$:`,
      () =>
        `Równanie prostej $$l$$ przez $$P(${P.x}, ${P.y})$$ ${relation} do $$k$$:`,
      () =>
        `Wyznacz $$l$$ przechodzącą przez punkt $$P(${P.x}, ${P.y})$$, ${relation} do $$k$$:`,
      () => `Podaj $$l$$ dla $$P(${P.x}, ${P.y})$$ ${relation} do $$k$$:`,
      () =>
        `Dla $$P(${P.x}, ${P.y})$$ znajdź $$l$$ ${relation} do prostej $$k$$:`,
      () =>
        `Oblicz $$l: y=...$$ przez $$P(${P.x}, ${P.y})$$ i ${relation} do $$k$$:`,
      () =>
        `Znajdź równanie $$l$$ dla $$P(${P.x}, ${P.y})$$ ${relation} do $$k$$:`,
      () =>
        `Wyznacz równanie $$l$$ przechodzącej przez $$P(${P.x}, ${P.y})$$, ${relation} do $$k$$:`,
      () =>
        `Podaj wzór $$l$$ dla punktu $$P(${P.x}, ${P.y})$$ ${relation} do $$k$$:`,
      () => `Dla $$P(${P.x}, ${P.y})$$ oblicz $$l$$ ${relation} do $$k$$:`,
      () =>
        `Znajdź $$l$$ przechodzącą przez $$P(${P.x}, ${P.y})$$ i ${relation} do $$k$$:`,
    ];
  }

  /**
   * Generate distractors for relative line
   */
  static generateRelativeLineDistractors(a1, a2, b2) {
    const eq2 = this.formatLineEquation(a2, b2);
    const correctAnswer = `l: y=${eq2}`;

    const candidates = [
      `l: y=${this.formatLineEquation(a1 + 1, b2)}`,
      `l: y=${this.formatLineEquation(-a2, b2)}`,
      `l: y=${this.formatLineEquation(1 / (a2 || 0.5), b2)}`,
      `l: y=${this.formatLineEquation(a1, -b2)}`,
      `l: y=${this.formatLineEquation(2 * a2, b2)}`,
      `l: y=${this.formatLineEquation(a2, 2 * b2 + 1)}`,
      `l: y=${this.formatLineEquation(-a1, b2)}`,
      `l: y=${this.formatLineEquation(a2 + 1, b2)}`,
      `l: y=${this.formatLineEquation(a2, -b2 + 1)}`,
      `l: y=${this.formatLineEquation(a2 - 1, b2)}`,
      `l: y=${this.formatLineEquation(2 * a1, b2)}`,
      `l: y=${this.formatLineEquation(a2, b2 + 1)}`,
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
   * Generate data for parameter m problem
   */
  static generateParameterMData(difficulty) {
    const mode = MathUtils.randomElement(["parallel", "perpendicular"]);

    let m;
    if (difficulty === "easy") {
      m = MathUtils.randomInt(-3, 3);
    } else if (difficulty === "hard") {
      m = MathUtils.randomInt(-8, 8);
    } else {
      m = MathUtils.randomInt(-5, 5);
    }

    let a1_coeff;
    if (difficulty === "easy") {
      a1_coeff = 2;
    } else if (difficulty === "hard") {
      a1_coeff = MathUtils.randomElement([2, 3, 4, 5, 6]);
    } else {
      a1_coeff = MathUtils.randomElement([2, 3, 4]);
    }

    const a1_const = MathUtils.randomInt(-3, 3);

    let a2;
    if (mode === "parallel") {
      a2 = a1_coeff * m + a1_const;
    } else {
      const denominator = a1_coeff * m + a1_const;
      if (denominator === 0) return this.generateParameterMData(difficulty);
      a2 = -1.0 / denominator;
    }

    return { mode, m, a1_coeff, a1_const, a2 };
  }

  /**
   * Get templates for parameter m problem
   */
  static getParameterMTemplates(mode) {
    const relation = mode === "parallel" ? "równoległe" : "prostopadłe";
    const relationCap = mode === "parallel" ? "Równoległe" : "Prostopadłe";
    return [
      () => `Proste $$l$$ i $$k$$ są ${relation}. Oblicz parametr $$m$$.`,
      () => `Dla prostych ${relation} znajdź wartość parametru $$m$$.`,
      () => `Wyznacz $$m$$, jeśli proste są ${relation}.`,
      () => `Podaj $$m$$ dla prostych ${relation}.`,
      () => `Oblicz parametr $$m$$ gdy proste są ${relation}.`,
      () => `Znajdź $$m$$ dla ${relation} prostych.`,
      () => `Dla prostych ${relation} oblicz $$m$$.`,
      () => `Wyznacz wartość $$m$$ dla prostych ${relation}.`,
      () => `Podaj wartość parametru $$m$$ gdy proste są ${relation}.`,
      () => `Oblicz $$m$$ dla ${relation} prostych $$l$$ i $$k$$.`,
      () => `Znajdź $$m$$ jeśli $$l$$ i $$k$$ są ${relation}.`,
      () => `Dla ${relation} prostych wyznacz $$m$$.`,
      () => `Wyznacz parametr $$m$$ dla prostych ${relation}.`,
      () => `Podaj $$m$$ gdy proste są ${relation}.`,
      () => `Oblicz $$m$$ dla prostych $$l$$ i $$k$$ będących ${relation}.`,
      () => `Znajdź wartość $$m$$ dla ${relation} prostych.`,
      () => `Dla prostych ${relation} podaj $$m$$.`,
      () => `Wyznacz $$m$$ gdy $$l$$ i $$k$$ są ${relation}.`,
      () => `Oblicz parametr $$m$$ dla ${relation} prostych.`,
      () => `Podaj wartość $$m$$ jeśli proste są ${relation}.`,
      () => `${relationCap} proste - oblicz $$m$$:`,
      () => `Dla prostych ${relation} znajdź $$m$$:`,
      () => `Wartość $$m$$ dla ${relation} prostych:`,
      () => `Znajdź parametr $$m$$ - proste ${relation}:`,
      () => `Oblicz $$m$$ - warunek prostych ${relation}:`,
      () => `Wyznacz $$m$$ (${relation} proste):`,
      () => `Parametr $$m$$ dla ${relation} prostych:`,
      () => `Znajdź $$m$$ (proste ${relation}):`,
      () => `Oblicz $$m$$ (${relation}):`,
      () => `Wartość $$m$$ (proste ${relation}):`,
      () => `Dla ${relation} prostych - $$m$$:`,
      () => `Znajdź $$m$$ dla ${relation}:`,
      () => `Oblicz $$m$$ dla warunku ${relation}:`,
      () => `Wyznacz $$m$$ (${relation}):`,
      () => `Parametr $$m$$ (${relation}):`,
      () => `$$m$$ dla prostych ${relation}:`,
      () => `Znajdź $$m$$ - ${relation}:`,
      () => `Oblicz $$m$$ gdy ${relation}:`,
      () => `Wartość $$m$$ (${relation}):`,
    ];
  }

  /**
   * Generate distractors for parameter m problem
   */
  static generateParameterMDistractors(m) {
    const candidates = [
      `m=${m + 1}`,
      `m=${-m}`,
      `m=0`,
      `m=${m + 2}`,
      `m=${m - 1}`,
      `m=1`,
      `m=-1`,
    ];

    const correctAnswer = `m=${m}`;
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
   * Generate data for intersection problem
   */
  static generateIntersectionData(difficulty) {
    let range;
    if (difficulty === "easy") range = [-2, 2];
    else range = [-5, 5];

    const intX = MathUtils.randomInt(range[0], range[1]);
    const intY = MathUtils.randomInt(range[0], range[1]);

    const a1 = 1;
    const b1 = intY - a1 * intX;

    const a2 = -1;
    const b2 = intY - a2 * intX;

    return { intX, intY, a1, b1, a2, b2 };
  }

  /**
   * Get templates for intersection problem
   */
  static getIntersectionTemplates() {
    return [
      () => "Jakie są współrzędne punktu przecięcia prostych układu równań:",
      () => "Znajdź punkt przecięcia prostych:",
      () => "Wyznacz współrzędne przecięcia prostych:",
      () => "Podaj punkt wspólny prostych:",
      () => "Oblicz współrzędne punktu przecięcia:",
      () => "Znajdź rozwiązanie układu równań (punkt przecięcia):",
      () => "Wyznacz punkt przecięcia prostych:",
      () => "Podaj współrzędne punktu wspólnego prostych:",
      () => "Dla układu równań znajdź punkt przecięcia:",
      () => "Oblicz punkt przecięcia prostych:",
      () => "Znajdź współrzędne punktu przecięcia prostych:",
      () => "Wyznacz rozwiązanie układu (punkt przecięcia):",
      () => "Podaj punkt przecięcia prostych:",
      () => "Oblicz współrzędne punktu wspólnego:",
      () => "Znajdź punkt przecięcia dla układu:",
      () => "Dla prostych podaj punkt przecięcia:",
      () => "Wyznacz punkt wspólny prostych:",
      () => "Podaj współrzędne przecięcia:",
      () => "Znajdź rozwiązanie układu równań:",
      () => "Oblicz punkt przecięcia prostych liniowych:",
      () => "Rozwiąż układ równań (punkt przecięcia):",
      () => "Znajdź współrzędne rozwiązania układu:",
      () => "Punkt przecięcia prostych z układu to:",
      () => "Wyznacz współrzędne punktu wspólnego prostych:",
      () => "Dla danego układu znajdź punkt przecięcia:",
      () => "Oblicz współrzędne przecięcia prostych z układu:",
      () => "Znajdź punkt, w którym proste się przecinają:",
      () => "Współrzędne punktu przecięcia prostych to:",
      () => "Rozwiązaniem układu jest punkt przecięcia:",
      () => "Znajdź punkt przecięcia prostych liniowych:",
      () => "Podaj współrzędne rozwiązania układu równań:",
      () => "Wyznacz punkt przecięcia podanych prostych:",
      () => "Oblicz współrzędne punktu przecięcia prostych:",
      () => "Znajdź punkt wspólny dla obu prostych:",
      () => "Dla prostych z układu podaj punkt przecięcia:",
      () => "W którym punkcie przecinają się proste:",
      () => "Wyznacz współrzędne punktu przecięcia układu:",
      () => "Znajdź rozwiązanie graficzne układu równań:",
      () => "Punkt przecięcia prostych z równań to:",
      () => "Oblicz współrzędne punktu przecięcia prostych liniowych:",
      () => "Znajdź punkt przecięcia układu dwóch równań:",
      () => "Wyznacz współrzędne punktu przecięcia prostych z układu:",
      () => "Punkt wspólny prostych z podanego układu to:",
      () => "Rozwiązanie graficzne układu równań (punkt przecięcia):",
      () => "Znajdź współrzędne punktu, gdzie proste się przecinają:",
      () => "Dla układu dwóch prostych znajdź punkt przecięcia:",
      () => "Oblicz współrzędne punktu wspólnego obu prostych:",
      () => "Znajdź punkt przecięcia prostych z podanych równań:",
      () => "Współrzędne rozwiązania układu dwóch równań to:",
      () => "Wyznacz punkt przecięcia prostych z równań liniowych:",
      () => "Znajdź punkt przecięcia dla podanego układu prostych:",
      () => "Punkt przecięcia dwóch prostych z układu to:",
      () => "Oblicz współrzędne punktu przecięcia prostych z równań:",
      () => "Znajdź współrzędne punktu przecięcia prostych liniowych:",
      () => "Dla podanych równań prostych znajdź punkt przecięcia:",
      () => "Rozwiązaniem układu jest punkt wspólny prostych:",
      () => "Znajdź punkt, w którym proste przecinają się:",
      () => "Wyznacz współrzędne punktu przecięcia prostych z układu równań:",
      () => "Oblicz współrzędne punktu wspólnego prostych z równań:",
      () => "Znajdź punkt przecięcia prostych z danego układu:",
      () => "Wyznacz współrzędne punktu przecięcia dwóch prostych:",
      () => "Punkt przecięcia prostych z układu równań to:",
      () => "Dla podanego układu równań znajdź punkt przecięcia:",
      () => "Znajdź współrzędne punktu przecięcia prostych:",
      () => "Oblicz punkt przecięcia prostych z podanych równań:",
      () => "Wyznacz punkt wspólny prostych z układu równań:",
      () => "Znajdź punkt przecięcia prostych liniowych z układu:",
      () => "Dla prostych z układu równań podaj punkt przecięcia:",
      () => "Współrzędne punktu przecięcia prostych z układu:",
      () => "Znajdź punkt przecięcia prostych opisanych układem równań:",
      () => "Wyznacz punkt przecięcia prostych z danego układu równań:",
      () => "Dla układu dwóch równań liniowych znajdź punkt przecięcia:",
      () => "Oblicz współrzędne punktu przecięcia prostych z układu:",
      () => "Znajdź punkt wspólny prostych opisanych równaniami:",
      () => "Wyznacz współrzędne punktu przecięcia prostych z równań:",
      () => "Punkt przecięcia prostych z podanego układu równań:",
      () => "Znajdź rozwiązanie układu w postaci punktu przecięcia:",
      () => "Dla prostych zadanego układu znajdź punkt przecięcia:",
      () => "Oblicz współrzędne punktu wspólnego prostych z układu:",
    ];
  }

  /**
   * Generate distractors for intersection problem
   */
  static generateIntersectionDistractors(intX, intY) {
    const candidates = [
      `(${intY}, ${intX})`,
      `(0,0)`,
      `(${intX}, 0)`,
      `(0, ${intY})`,
      `(${intX + 1}, ${intY})`,
      `(${intX}, ${intY + 1})`,
      `(${-intX}, ${intY})`,
      `(${intX}, ${-intY})`,
    ];

    const correctAnswer = `(${intX}, ${intY})`;
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
   * Generate data for slope angle problem
   */
  static generateSlopeAngleData(difficulty) {
    const angles = [
      { ang: 30, tan: "\\frac{\\sqrt{3}}{3}", val: Math.sqrt(3) / 3 },
      { ang: 45, tan: "1", val: 1 },
      { ang: 60, tan: "\\sqrt{3}", val: Math.sqrt(3) },
      { ang: 120, tan: "-\\sqrt{3}", val: -Math.sqrt(3) },
      { ang: 135, tan: "-1", val: -1 },
      { ang: 150, tan: "-\\frac{\\sqrt{3}}{3}", val: -Math.sqrt(3) / 3 },
    ];

    let availableAngles = angles;
    if (difficulty === "easy") {
      availableAngles = angles.filter((x) => x.ang === 45 || x.ang === 135);
    }

    const sel = MathUtils.randomElement(availableAngles);
    const angle = sel.ang;

    let bRange;
    if (difficulty === "easy") {
      bRange = [-2, 2];
    } else if (difficulty === "hard") {
      bRange = [-6, 6];
    } else {
      bRange = [-4, 4];
    }
    const b = MathUtils.randomInt(bRange[0], bRange[1]);

    const aStr = sel.tan;
    const bStr = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
    const eq =
      aStr === "1"
        ? `x ${bStr}`
        : aStr === "-1"
          ? `-x ${bStr}`
          : `${aStr}x ${bStr}`;

    return { angle, b, eq, sel };
  }

  /**
   * Get templates for slope angle problem
   */
  static getSlopeAngleTemplates(eq) {
    return [
      () =>
        `Prosta o równaniu $$y = ${eq}$$ tworzy z osią $$Ox$$ kąt $$\\alpha$$. Miara tego kąta jest równa:`,
      () =>
        `Kąt $$\\alpha$$ utworzony przez prostą $$y = ${eq}$$ z osią $$Ox$$ wynosi:`,
      () => `Dla prostej $$y = ${eq}$$ kąt z osią $$Ox$$ jest równy:`,
      () => `Prosta $$y = ${eq}$$ tworzy z osią $$Ox$$ kąt:`,
      () =>
        `Jaka jest miara kąta $$\\alpha$$ prostej $$y = ${eq}$$ z osią $$Ox$$:`,
      () => `Kąt nachylenia prostej $$y = ${eq}$$ do osi $$Ox$$ wynosi:`,
      () => `Dla $$y = ${eq}$$ wyznacz kąt $$\\alpha$$ z osią $$Ox$$:`,
      () => `Podaj miarę kąta $$\\alpha$$ prostej $$y = ${eq}$$ z osią $$Ox$$:`,
      () =>
        `Znajdź kąt $$\\alpha$$ utworzony przez $$y = ${eq}$$ z osią $$Ox$$:`,
      () => `Oblicz kąt $$\\alpha$$ prostej $$y = ${eq}$$ z osią $$Ox$$:`,
      () => `Kąt między prostą $$y = ${eq}$$ a osią $$Ox$$ wynosi:`,
      () => `Wyznacz miarę kąta $$\\alpha$$ dla $$y = ${eq}$$:`,
      () => `Dla prostej $$y = ${eq}$$ oblicz kąt z osią $$Ox$$:`,
      () => `Jaki kąt tworzy prosta $$y = ${eq}$$ z osią $$Ox$$:`,
      () => `Znajdź miarę kąta nachylenia $$y = ${eq}$$:`,
      () => `Podaj kąt $$\\alpha$$ dla prostej $$y = ${eq}$$:`,
      () => `Oblicz nachylenie prostej $$y = ${eq}$$ jako kąt:`,
      () => `Wyznacz kąt $$\\alpha$$ prostej $$y = ${eq}$$ z osią poziomą:`,
      () => `Kąt prostej $$y = ${eq}$$ z dodatnią półosią $$Ox$$:`,
      () => `Znajdź miarę kąta utworzonego przez $$y = ${eq}$$:`,
      () => `Miara kąta $$\\alpha$$ prostej $$y = ${eq}$$ z osią $$Ox$$:`,
      () => `Kąt $$\\alpha$$ dla prostej $$y = ${eq}$$ z osią poziomą:`,
      () => `Nachylenie prostej $$y = ${eq}$$ wyrażone jako kąt:`,
      () => `Znajdź kąt nachylenia prostej $$y = ${eq}$$:`,
      () => `Dla $$y = ${eq}$$ podaj miarę kąta z osią $$Ox$$:`,
      () => `Oblicz miarę kąta $$\\alpha$$ dla $$y = ${eq}$$:`,
      () => `Kąt $$\\alpha$$ utworzony przez prostą $$y = ${eq}$$:`,
      () => `Wyznacz kąt prostej $$y = ${eq}$$ z osią $$Ox$$:`,
      () => `Podaj nachylenie prostej $$y = ${eq}$$ w stopniach:`,
      () => `Znajdź miarę kąta prostej $$y = ${eq}$$:`,
      () => `Kąt między $$y = ${eq}$$ a osią poziomą:`,
      () => `Oblicz kąt nachylenia $$y = ${eq}$$:`,
      () => `Dla prostej $$y = ${eq}$$ znajdź kąt $$\\alpha$$:`,
      () => `Miara kąta prostej $$y = ${eq}$$ z osią $$Ox$$:`,
      () => `Kąt $$\\alpha$$ dla $$y = ${eq}$$ wynosi:`,
      () => `Podaj kąt utworzony przez $$y = ${eq}$$:`,
      () => `Znajdź nachylenie prostej $$y = ${eq}$$:`,
      () => `Wyznacz kąt między $$y = ${eq}$$ a $$Ox$$:`,
      () => `Oblicz miarę kąta prostej $$y = ${eq}$$:`,
      () => `Kąt prostej $$y = ${eq}$$ z osią $$Ox$$ to:`,
    ];
  }

  /**
   * Generate distractors for slope angle problem
   */
  static generateSlopeAngleDistractors(angle) {
    const candidates = [
      180 - angle,
      Math.abs(90 - angle),
      angle > 90 ? angle - 90 : angle + 90,
      angle + 30,
      angle - 30,
      180 - (angle + 30),
      30,
      45,
      60,
      120,
      135,
      150,
    ];

    const uniqueDistractors = [];
    const usedValues = new Set();
    usedValues.add(angle);

    for (const cand of candidates) {
      if (!usedValues.has(cand) && cand > 0 && cand < 180) {
        uniqueDistractors.push(`${cand}^\\circ`);
        usedValues.add(cand);
      }
      if (uniqueDistractors.length === 3) break;
    }

    let fallbackAngle = 10;
    while (uniqueDistractors.length < 3) {
      if (!usedValues.has(fallbackAngle)) {
        uniqueDistractors.push(`${fallbackAngle}^\\circ`);
        usedValues.add(fallbackAngle);
      }
      fallbackAngle += 10;
    }

    return uniqueDistractors;
  }

  /**
   * Generate data for point on line problem
   */
  static generatePointOnLineData() {
    const a = MathUtils.randomInt(-3, 3) || 1;
    const b = MathUtils.randomInt(-5, 5);
    const x = MathUtils.randomInt(-4, 4);
    const y = a * x + b;

    return { a, b, x, y };
  }

  /**
   * Get templates for point on line problem
   */
  static getPointOnLineTemplates(x, eq) {
    return [
      () =>
        `Punkt $$P=(${x}, m)$$ należy do wykresu funkcji liniowej $$y=${eq}$$. Liczba $$m$$ jest równa:`,
      () =>
        `Dla punktu $$(${x}, m)$$ leżącego na prostej $$y=${eq}$$ wyznacz $$m$$:`,
      () => `Jeśli punkt $$(${x}, m)$$ należy do $$y=${eq}$$, to $$m$$ wynosi:`,
      () => `Punkt $$P(${x}, m)$$ leży na prostej $$y=${eq}$$. Oblicz $$m$$:`,
      () =>
        `Dla $$y=${eq}$$ punkt $$(${x}, m)$$ spełnia równanie. Znajdź $$m$$:`,
      () => `Wartość $$m$$ dla punktu $$(${x}, m)$$ na prostej $$y=${eq}$$:`,
      () => `Podaj $$m$$ jeśli punkt $$(${x}, m)$$ należy do $$y=${eq}$$:`,
      () => `Oblicz $$m$$ dla punktu $$(${x}, m)$$ leżącego na $$y=${eq}$$:`,
      () => `Znajdź $$m$$ gdy punkt $$(${x}, m)$$ jest na prostej $$y=${eq}$$:`,
      () => `Dla $$y=${eq}$$ wyznacz $$m$$ punktu $$(${x}, m)$$:`,
      () => `Jeśli $$(${x}, m)$$ leży na $$y=${eq}$$, to $$m=$$:`,
      () => `Punkt $$(${x}, m)$$ na prostej $$y=${eq}$$. Podaj $$m$$:`,
      () => `Wyznacz $$m$$ dla punktu $$(${x}, m)$$ na $$y=${eq}$$:`,
      () => `Oblicz wartość $$m$$ punktu $$(${x}, m)$$ na $$y=${eq}$$:`,
      () => `Dla punktu na $$y=${eq}$$ o $$x=${x}$$ znajdź $$m$$:`,
      () => `Znajdź $$m$$ jeśli $$P(${x}, m)$$ należy do $$y=${eq}$$:`,
      () => `Podaj wartość $$m$$ dla $$P(${x}, m)$$ na prostej $$y=${eq}$$:`,
      () => `Wartość $$m$$ punktu $$(${x}, m)$$ na $$y=${eq}$$ to:`,
      () => `Dla $$y=${eq}$$ oblicz $$m$$ gdy $$x=${x}$$:`,
      () => `Znajdź $$m$$ punktu $$(${x}, m)$$ należącego do $$y=${eq}$$:`,
    ];
  }

  /**
   * Generate distractors for point on line problem
   */
  static generatePointOnLineDistractors(y, a, x, b) {
    const candidates = [-y, x, a * x, b, y + 1, y - 1, a + b];

    const uniqueDistractors = [];
    const usedValues = new Set();
    usedValues.add(y);

    for (const cand of candidates) {
      if (!usedValues.has(cand)) {
        uniqueDistractors.push(`${cand}`);
        usedValues.add(cand);
      }
      if (uniqueDistractors.length === 3) break;
    }

    let offset = 2;
    while (uniqueDistractors.length < 3) {
      const val = y + offset;
      if (!usedValues.has(val)) {
        uniqueDistractors.push(`${val}`);
        usedValues.add(val);
      }
      offset = offset > 0 ? -offset : -offset + 1;
    }

    return uniqueDistractors;
  }

  /**
   * Generate data for intersection with axes problem
   */
  static generateIntersectionWithAxesData(difficulty) {
    let b = MathUtils.randomInt(-6, 6);
    while (b === 0) b = MathUtils.randomInt(-6, 6);
    
    let root = MathUtils.randomInt(-6, 6);
    while (root === 0) root = MathUtils.randomInt(-6, 6);

    const a = -b / root;

    if (difficulty !== "hard" && !Number.isInteger(a))
      return this.generateIntersectionWithAxesData(difficulty);

    const axis = MathUtils.randomElement(["Ox", "Oy"]);

    return { a, b, root, axis };
  }

  /**
   * Get templates for intersection with axes problem
   */
  static getIntersectionWithAxesTemplates(eq, axis) {
    return [
      () =>
        `Punkt przecięcia prostej $$y=${eq}$$ z osią $$${axis}$$ ma współrzędne:`,
      () => `Prosta $$y=${eq}$$ przecina oś $$${axis}$$ w punkcie:`,
      () => `Znajdź punkt przecięcia $$y=${eq}$$ z osią $$${axis}$$:`,
      () => `Współrzędne punktu przecięcia $$y=${eq}$$ z $$${axis}$$:`,
      () => `Gdzie prosta $$y=${eq}$$ przecina oś $$${axis}$$:`,
      () => `Podaj punkt przecięcia prostej $$y=${eq}$$ z osią $$${axis}$$:`,
      () => `Punkt wspólny prostej $$y=${eq}$$ i osi $$${axis}$$ to:`,
      () => `Znajdź współrzędne przecięcia $$y=${eq}$$ z $$${axis}$$:`,
      () => `Oblicz punkt przecięcia $$y=${eq}$$ z osią $$${axis}$$:`,
      () => `Dla $$y=${eq}$$ znajdź przecięcie z $$${axis}$$:`,
      () => `W którym punkcie $$y=${eq}$$ przecina oś $$${axis}$$:`,
      () => `Podaj współrzędne przecięcia $$y=${eq}$$ z osią $$${axis}$$:`,
      () => `Znajdź punkt na osi $$${axis}$$ dla prostej $$y=${eq}$$:`,
      () => `Oblicz współrzędne punktu $$y=${eq}$$ na $$${axis}$$:`,
      () => `Punkt przecięcia $$y=${eq}$$ z $$${axis}$$ ma współrzędne:`,
      () => `Gdzie prosta $$y=${eq}$$ przecina oś $$${axis}$$:`,
      () => `Współrzędne przecięcia $$y=${eq}$$ z osią $$${axis}$$ to:`,
      () => `Znajdź punkt $$y=${eq}$$ na osi $$${axis}$$:`,
      () => `Dla $$y=${eq}$$ podaj punkt przecięcia z $$${axis}$$:`,
      () => `Oblicz punkt na osi $$${axis}$$ dla $$y=${eq}$$:`,
      () => `Miejsce przecięcia $$y=${eq}$$ z osią $$${axis}$$:`,
      () => `Współrzędne punktu na $$${axis}$$ dla $$y=${eq}$$:`,
      () => `Znajdź przecięcie prostej $$y=${eq}$$ z $$${axis}$$:`,
      () => `Punkt na osi $$${axis}$$ dla prostej $$y=${eq}$$:`,
      () => `Gdzie $$y=${eq}$$ przecina oś $$${axis}$$:`,
      () => `Współrzędne punktu przecięcia z $$${axis}$$:`,
      () => `Znajdź punkt przecięcia z osią $$${axis}$$:`,
      () => `Oblicz przecięcie $$y=${eq}$$ z $$${axis}$$:`,
      () => `Punkt przecięcia prostej z osią $$${axis}$$:`,
      () => `Dla $$y=${eq}$$ znajdź punkt na $$${axis}$$:`,
      () => `W którym miejscu $$y=${eq}$$ przecina $$${axis}$$:`,
    ];
  }

  /**
   * Generate distractors for intersection with axes problem
   */
  static generateIntersectionWithAxesDistractors(root, b, axis) {
    return [
      axis === "Oy" ? `(${b}, 0)` : `(0, ${root})`,
      `(0, 0)`,
      axis === "Oy" ? `(0, ${-b})` : `(${-root}, 0)`,
    ];
  }

  /**
   * Generate data for perpendicular coefficient problem
   */
  static generatePerpendicularCoeffData() {
    let num = MathUtils.randomInt(1, 5);
    let den = MathUtils.randomInt(1, 5);

    const gcd = (a, b) => (b ? gcd(b, a % b) : a);
    const common = gcd(num, den);
    num /= common;
    den /= common;

    const sign = MathUtils.randomElement([1, -1]);

    return { num, den, sign };
  }

  /**
   * Format coefficient for equation
   */
  static formatCoeffForEquation(n, d, s) {
    if (d === 1) {
      if (n === 1) return s === 1 ? "" : "-";
      return s === 1 ? `${n}` : `-${n}`;
    }
    return (s === 1 ? "" : "-") + `\\frac{${n}}{${d}}`;
  }

  /**
   * Format coefficient as value
   */
  static formatCoeffAsValue(n, d, s) {
    if (d === 1) {
      return s === 1 ? `${n}` : `-${n}`;
    }
    return (s === 1 ? "" : "-") + `\\frac{${n}}{${d}}`;
  }

  /**
   * Get templates for perpendicular coefficient problem
   */
  static getPerpendicularCoeffTemplates(a1_eq_latex) {
    return [
      () =>
        `Współczynnik kierunkowy prostej prostopadłej do prostej $$y = ${a1_eq_latex}x + 5$$ jest równy:`,
      () =>
        `Dla prostej prostopadłej do $$y = ${a1_eq_latex}x + 5$$ podaj współczynnik kierunkowy:`,
      () => `Znajdź $$a$$ prostej prostopadłej do $$y = ${a1_eq_latex}x + 5$$:`,
      () =>
        `Współczynnik $$a$$ prostej prostopadłej do $$y = ${a1_eq_latex}x + 5$$:`,
      () =>
        `Oblicz $$a$$ dla prostej prostopadłej do $$y = ${a1_eq_latex}x + 5$$:`,
      () =>
        `Dla $$y = ${a1_eq_latex}x + 5$$ znajdź $$a$$ prostej prostopadłej:`,
      () =>
        `Podaj współczynnik kierunkowy prostej prostopadłej do $$y = ${a1_eq_latex}x + 5$$:`,
      () =>
        `Wartość $$a$$ prostej prostopadłej do $$y = ${a1_eq_latex}x + 5$$:`,
      () =>
        `Znajdź współczynnik kierunkowy prostej $$\\perp$$ do $$y = ${a1_eq_latex}x + 5$$:`,
      () =>
        `Oblicz współczynnik kierunkowy prostej prostopadłej do $$y = ${a1_eq_latex}x + 5$$:`,
      () =>
        `Dla $$y = ${a1_eq_latex}x + 5$$ wyznacz $$a$$ prostej prostopadłej:`,
      () =>
        `Współczynnik $$a$$ prostej $$\\perp$$ do $$y = ${a1_eq_latex}x + 5$$:`,
      () => `Podaj $$a$$ prostej prostopadłej do $$y = ${a1_eq_latex}x + 5$$:`,
      () =>
        `Znajdź $$a_2$$ dla prostej prostopadłej do $$y = ${a1_eq_latex}x + 5$$:`,
      () => `Współczynnik kierunkowy $$a$$ prostej $$\\perp$$:`,
      () => `Oblicz $$a$$ prostej prostopadłej do danej:`,
      () => `Dla prostej $$y = ${a1_eq_latex}x + 5$$ podaj $$a$$ prostopadłej:`,
      () =>
        `Znajdź współczynnik prostej prostopadłej do $$y = ${a1_eq_latex}x + 5$$:`,
      () => `Wartość współczynnika $$a$$ prostej prostopadłej:`,
      () =>
        `Wyznacz $$a$$ dla prostej prostopadłej do $$y = ${a1_eq_latex}x + 5$$:`,
    ];
  }

  /**
   * Generate distractors for perpendicular coefficient problem
   */
  static generatePerpendicularCoeffDistractors(num, den, sign, a2_val_latex) {
    const a1_val_latex = this.formatCoeffAsValue(num, den, sign);

    const candidates = [
      a1_val_latex,
      this.formatCoeffAsValue(num, den, -sign),
      this.formatCoeffAsValue(den, num, -sign),
      "1",
      "-1",
    ];

    const uniqueDistractors = [];
    const usedValues = new Set();
    usedValues.add(a2_val_latex);

    for (const cand of candidates) {
      if (!usedValues.has(cand)) {
        uniqueDistractors.push(cand);
        usedValues.add(cand);
      }
      if (uniqueDistractors.length === 3) break;
    }

    let fallbackNum = 2;
    while (uniqueDistractors.length < 3) {
      const val = `${fallbackNum}`;
      if (!usedValues.has(val)) {
        uniqueDistractors.push(val);
        usedValues.add(val);
      }
      fallbackNum++;
    }

    return uniqueDistractors;
  }

  /**
   * Get templates for bisector problem
   */
  static getBisectorTemplates() {
    return [
      () => "Wyznacz równanie symetralnej odcinka AB, gdzie A(-2,0) i B(2,4).",
      () => "Znajdź równanie symetralnej odcinka AB dla A(-2,0) i B(2,4).",
      () => "Dla odcinka AB o końcach A(-2,0) i B(2,4) podaj symetralną:",
      () => "Oblicz równanie symetralnej odcinka A(-2,0)B(2,4):",
      () => "Wyznacz symetralną odcinka o końcach A(-2,0) i B(2,4):",
      () =>
        "Znajdź równanie prostej będącej symetralną AB, gdzie A(-2,0), B(2,4):",
      () => "Podaj równanie symetralnej odcinka AB: A(-2,0), B(2,4).",
      () => "Dla punktów A(-2,0) i B(2,4) znajdź symetralną odcinka AB:",
      () => "Oblicz równanie symetralnej odcinka o końcach A(-2,0), B(2,4):",
      () => "Wyznacz równanie prostej symetralnej do AB dla A(-2,0) i B(2,4):",
      () => "Znajdź symetralną odcinka z końcami A(-2,0) i B(2,4):",
      () => "Podaj równanie symetralnej dla odcinka AB(A(-2,0), B(2,4)):",
      () => "Dla A(-2,0) i B(2,4) wyznacz równanie symetralnej:",
      () => "Oblicz symetralną odcinka AB gdzie A(-2,0), B(2,4):",
      () => "Znajdź równanie prostej symetralnej AB(A(-2,0), B(2,4)):",
      () => "Wyznacz równanie symetralnej odcinka o punktach A(-2,0), B(2,4):",
      () => "Podaj symetralną dla odcinka z końcami w A(-2,0) i B(2,4):",
      () => "Dla odcinka A(-2,0)B(2,4) znajdź równanie symetralnej:",
      () =>
        "Oblicz równanie prostej symetralnej do odcinka AB(A(-2,0), B(2,4)):",
      () => "Znajdź równanie symetralnej odcinka o końcach A(-2,0) i B(2,4):",
    ];
  }

  /**
   * Generate distractors for bisector problem
   */
  static generateBisectorDistractors() {
    return [`y=x+2`, `y=-x`, `y=x`];
  }

  /**
   * Format line equation
   */
  static formatLineEquation(a, b) {
    const aStr = this.fractionToLatex(a);
    if (a === 0) return this.fractionToLatex(b);
    let xPart = aStr === "1" ? "x" : aStr === "-1" ? "-x" : `${aStr}x`;
    if (b === 0) return xPart;
    return `${xPart} ${b > 0 ? "+" : "-"} ${this.fractionToLatex(Math.abs(b))}`;
  }

  /**
   * Convert fraction to LaTeX
   */
  static fractionToLatex(val) {
    if (Number.isInteger(val)) return `${val}`;
    if (Math.abs(val - 0.5) < 0.001) return "\\frac{1}{2}";
    if (Math.abs(val + 0.5) < 0.001) return "-\\frac{1}{2}";
    if (Math.abs(val - 1 / 3) < 0.001) return "\\frac{1}{3}";
    if (Math.abs(val + 1 / 3) < 0.001) return "-\\frac{1}{3}";
    return parseFloat(val.toFixed(2));
  }

  /**
   * Format line equation for steps
   */
  static formatLineEquationForSteps(a, b) {
    return this.formatLineEquation(a, b);
  }
}

module.exports = LinesValues;
