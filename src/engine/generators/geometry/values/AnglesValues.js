const MathUtils = require("../../../utils/MathUtils");

class AnglesValues {
  /**
   * Get parameters for angles lines problem
   */
  static getAnglesLinesParams(difficulty) {
    if (difficulty === "easy") {
      return { alphaMin: 3, alphaMax: 15, multiplier: 10, decimals: 0 };
    } else if (difficulty === "hard") {
      return { alphaMin: 60, alphaMax: 290, multiplier: 0.5, decimals: 1 };
    } else {
      return { alphaMin: 20, alphaMax: 160, multiplier: 1, decimals: 0 };
    }
  }

  /**
   * Generate data for angles lines problem
   */
  static generateAnglesLinesData(difficulty) {
    const params = this.getAnglesLinesParams(difficulty);

    let alpha;
    if (difficulty === "easy") {
      alpha =
        MathUtils.randomInt(params.alphaMin, params.alphaMax) *
        params.multiplier;
    } else if (difficulty === "hard") {
      alpha =
        MathUtils.randomInt(params.alphaMin, params.alphaMax) *
        params.multiplier;
    } else {
      alpha = MathUtils.randomInt(params.alphaMin, params.alphaMax);
    }

    const beta = 180 - alpha;
    const mode = MathUtils.randomElement(["vertical", "supplementary"]);

    const alphaStr = alpha % 1 === 0 ? `${alpha}` : alpha.toFixed(1);
    const betaStr = beta % 1 === 0 ? `${beta}` : beta.toFixed(1);

    return { alpha, beta, mode, alphaStr, betaStr };
  }

  /**
   * Get templates for angles lines problem
   */
  static getAnglesLinesTemplates(mode, alphaStr) {
    const modeName = mode === "vertical" ? "wierzchołkowe" : "przyległe";
    const modeNameCap = mode === "vertical" ? "Wierzchołkowe" : "Przyległe";

    return [
      () =>
        `Kąty $$\\alpha$$ i $$\\beta$$ są ${modeName}. Jeśli $$\\alpha = ${alphaStr}^\\circ$$, to $$\\beta$$ wynosi:`,
      () =>
        `Dla kątów ${modeName} $$\\alpha = ${alphaStr}^\\circ$$. Oblicz $$\\beta$$:`,
      () =>
        `Kąty $$\\alpha$$ i $$\\beta$$ to kąty ${modeName}. Znajdź $$\\beta$$ dla $$\\alpha = ${alphaStr}^\\circ$$:`,
      () =>
        `Jeśli $$\\alpha = ${alphaStr}^\\circ$$, to dla kątów ${modeName} $$\\beta$$ wynosi:`,
      () =>
        `${modeNameCap} kąty $$\\alpha$$ i $$\\beta$$, gdzie $$\\alpha = ${alphaStr}^\\circ$$. Oblicz $$\\beta$$:`,
      () =>
        `Znajdź miarę $$\\beta$$, gdy $$\\alpha = ${alphaStr}^\\circ$$ dla kątów ${modeName}:`,
      () =>
        `Dla kątów ${modeName} z $$\\alpha = ${alphaStr}^\\circ$$ oblicz $$\\beta$$:`,
      () =>
        `Oblicz $$\\beta$$, gdy $$\\alpha = ${alphaStr}^\\circ$$ (kąty ${modeName}):`,
      () =>
        `Kąty ${modeName} $$\\alpha = ${alphaStr}^\\circ$$ i $$\\beta$$. Wyznacz $$\\beta$$:`,
      () =>
        `Znajdź $$\\beta$$ dla kątów ${modeName} z $$\\alpha = ${alphaStr}^\\circ$$:`,
      () =>
        `Dla $$\\alpha = ${alphaStr}^\\circ$$ w kątach ${modeName} oblicz $$\\beta$$:`,
      () =>
        `Wyznacz miarę kąta $$\\beta$$, gdy $$\\alpha = ${alphaStr}^\\circ$$ (kąty ${modeName}):`,
      () =>
        `Kąty $$\\alpha$$ i $$\\beta$$ są ${modeName}, $$\\alpha = ${alphaStr}^\\circ$$. Podaj $$\\beta$$:`,
      () =>
        `Oblicz miarę $$\\beta$$ dla $$\\alpha = ${alphaStr}^\\circ$$ (kąty ${modeName}):`,
      () =>
        `Znajdź $$\\beta$$, gdy $$\\alpha = ${alphaStr}^\\circ$$ i kąty są ${modeName}:`,
      () =>
        `Dla kątów ${modeName} $$\\alpha = ${alphaStr}^\\circ$$ podaj miarę $$\\beta$$:`,
      () =>
        `Wyznacz $$\\beta$$ dla kątów ${modeName} z $$\\alpha = ${alphaStr}^\\circ$$:`,
      () =>
        `Oblicz miarę kąta $$\\beta$$, gdy $$\\alpha = ${alphaStr}^\\circ$$ (kąty ${modeName}):`,
      () =>
        `Kąty ${modeName}: $$\\alpha = ${alphaStr}^\\circ$$. Znajdź miarę $$\\beta$$:`,
      () =>
        `Podaj $$\\beta$$ dla kątów ${modeName} z $$\\alpha = ${alphaStr}^\\circ$$:`,
      () =>
        `${modeNameCap} kąty, $$\\alpha = ${alphaStr}^\\circ$$. Ile wynosi $$\\beta$$:`,
      () =>
        `Oblicz $$\\beta$$ dla $$\\alpha = ${alphaStr}^\\circ$$ w kątach ${modeName}:`,
      () =>
        `Znajdź miarę kąta $$\\beta$$ (kąty ${modeName}, $$\\alpha = ${alphaStr}^\\circ$$):`,
      () =>
        `Dla $$\\alpha = ${alphaStr}^\\circ$$ podaj $$\\beta$$ (kąty ${modeName}):`,
      () =>
        `Wyznacz $$\\beta$$, gdy $$\\alpha = ${alphaStr}^\\circ$$ i kąty są ${modeName}:`,
      () =>
        `Kąty ${modeName}: znajdź $$\\beta$$ dla $$\\alpha = ${alphaStr}^\\circ$$:`,
      () =>
        `Miarę $$\\beta$$ dla kątów ${modeName} z $$\\alpha = ${alphaStr}^\\circ$$:`,
      () =>
        `Oblicz $$\\beta$$ (kąty ${modeName}), gdy $$\\alpha = ${alphaStr}^\\circ$$:`,
      () =>
        `Znajdź $$\\beta$$ dla $$\\alpha = ${alphaStr}^\\circ$$ - kąty ${modeName}:`,
    ];
  }

  /**
   * Generate distractors for angles lines problem
   */
  static generateAnglesLinesDistractors(alpha, beta, mode, alphaStr, betaStr) {
    const correctAnswer =
      mode === "vertical" ? `${alphaStr}^\\circ` : `${betaStr}^\\circ`;

    const candidates = [
      mode === "vertical" ? `${betaStr}^\\circ` : `${alphaStr}^\\circ`,
      `${Math.abs(90 - alpha).toFixed(alpha % 1 === 0 ? 0 : 1)}^\\circ`,
      `${(360 - alpha).toFixed(alpha % 1 === 0 ? 0 : 1)}^\\circ`,
      `${(alpha / 2).toFixed(alpha % 1 === 0 ? 0 : 1)}^\\circ`,
      `${(2 * alpha).toFixed(alpha % 1 === 0 ? 0 : 1)}^\\circ`,
      `${(180 + alpha).toFixed(alpha % 1 === 0 ? 0 : 1)}^\\circ`,
      `${(alpha + 10).toFixed(alpha % 1 === 0 ? 0 : 1)}^\\circ`,
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

module.exports = AnglesValues;
