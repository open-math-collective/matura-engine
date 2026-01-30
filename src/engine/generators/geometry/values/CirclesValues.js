const MathUtils = require("../../../utils/MathUtils");

class CirclesValues {
  static generateCircleAnglesData(difficulty) {
    let alpha;
    if (difficulty === "easy") {
      alpha = MathUtils.randomInt(2, 7) * 10;
    } else if (difficulty === "hard") {
      alpha = MathUtils.randomInt(40, 140) / 2;
    } else {
      alpha = MathUtils.randomInt(20, 70);
    }

    const beta = 2 * alpha;
    const mode = MathUtils.randomElement(["find_central", "find_inscribed"]);

    const aStr = Number.isInteger(alpha) ? `${alpha}` : alpha.toFixed(1);
    const bStr = Number.isInteger(beta) ? `${beta}` : beta.toFixed(1);

    return { alpha, beta, mode, aStr, bStr };
  }

  static getCircleAnglesTemplates(mode, aStr, bStr) {
    if (mode === "find_central") {
      return [
        () =>
          `Punkt $$O$$ jest środkiem okręgu. Kąt wpisany $$\\alpha$$ ma miarę $$${aStr}^\\circ$$. Miara kąta środkowego $$\\beta$$ opartego na tym samym łuku jest równa:`,
        () =>
          `Kąt wpisany w okrąg o środku $$O$$ wynosi $$${aStr}^\\circ$$. Wyznacz kąt środkowy oparty na tym samym łuku:`,
        () =>
          `W okręgu o środku $$O$$ kąt wpisany $$\\alpha = ${aStr}^\\circ$$. Kąt środkowy $$\\beta$$ oparty na tym samym łuku wynosi:`,
        () =>
          `Znajdź miarę kąta środkowego, gdy kąt wpisany na tym samym łuku wynosi $$${aStr}^\\circ$$:`,
        () =>
          `Kąt wpisany w okrąg ma miarę $$${aStr}^\\circ$$. Oblicz odpowiadający mu kąt środkowy:`,
        () =>
          `W okręgu kąt wpisany wynosi $$${aStr}^\\circ$$. Jaki jest kąt środkowy na tym samym łuku?`,
        () =>
          `Dla kąta wpisanego $$\\alpha = ${aStr}^\\circ$$ znajdź kąt środkowy $$\\beta$$:`,
        () =>
          `Oblicz kąt środkowy, jeśli kąt wpisany na tym samym łuku ma $$${aStr}^\\circ$$:`,
        () =>
          `Kąt wpisany wynosi $$${aStr}^\\circ$$. Podaj miarę kąta środkowego:`,
        () =>
          `Wyznacz $$\\beta$$ (kąt środkowy), gdy $$\\alpha$$ (kąt wpisany) = $$${aStr}^\\circ$$:`,
      ];
    } else {
      return [
        () =>
          `Punkt $$O$$ jest środkiem okręgu. Kąt środkowy $$\\beta$$ ma miarę $$${bStr}^\\circ$$. Miara kąta wpisanego $$\\alpha$$ opartego na tym samym łuku jest równa:`,
        () =>
          `Kąt środkowy w okręgu o środku $$O$$ wynosi $$${bStr}^\\circ$$. Wyznacz kąt wpisany oparty na tym samym łuku:`,
        () =>
          `W okręgu o środku $$O$$ kąt środkowy $$\\beta = ${bStr}^\\circ$$. Kąt wpisany $$\\alpha$$ oparty na tym samym łuku wynosi:`,
        () =>
          `Znajdź miarę kąta wpisanego, gdy kąt środkowy na tym samym łuku wynosi $$${bStr}^\\circ$$:`,
        () =>
          `Kąt środkowy w okręgu ma miarę $$${bStr}^\\circ$$. Oblicz odpowiadający mu kąt wpisany:`,
        () =>
          `W okręgu kąt środkowy wynosi $$${bStr}^\\circ$$. Jaki jest kąt wpisany na tym samym łuku?`,
        () =>
          `Dla kąta środkowego $$\\beta = ${bStr}^\\circ$$ znajdź kąt wpisany $$\\alpha$$:`,
        () =>
          `Oblicz kąt wpisany, jeśli kąt środkowy na tym samym łuku ma $$${bStr}^\\circ$$:`,
        () =>
          `Kąt środkowy wynosi $$${bStr}^\\circ$$. Podaj miarę kąta wpisanego:`,
        () =>
          `Wyznacz $$\\alpha$$ (kąt wpisany), gdy $$\\beta$$ (kąt środkowy) = $$${bStr}^\\circ$$:`,
      ];
    }
  }

  static generateCircleAnglesDistractors(alpha, beta, mode, aStr, bStr) {
    const correctAnswer =
      mode === "find_central" ? `${bStr}^\\circ` : `${aStr}^\\circ`;
    const decimals = Number.isInteger(alpha) ? 0 : 1;

    const candidates = [
      mode === "find_central"
        ? `${(alpha - 10).toFixed(decimals).replace(".0", "")}^\\circ`
        : `${(beta - 10).toFixed(decimals).replace(".0", "")}^\\circ`,
      `${(180 - alpha).toFixed(decimals).replace(".0", "")}^\\circ`,
      `${(90 + alpha).toFixed(decimals).replace(".0", "")}^\\circ`,
      mode === "find_central"
        ? `${(beta * 2).toFixed(decimals).replace(".0", "")}^\\circ`
        : `${(180 - beta).toFixed(decimals).replace(".0", "")}^\\circ`,
      `${(alpha + 45).toFixed(decimals).replace(".0", "")}^\\circ`,
      `${(90 - alpha / 2).toFixed(decimals).replace(".0", "")}^\\circ`,
    ];

    return this.pickUniqueDistractors(candidates, correctAnswer, 3);
  }

  static generateCircleAreaData(difficulty) {
    let rRange;
    if (difficulty === "easy") rRange = [2, 5];
    else if (difficulty === "hard") rRange = [8, 15];
    else rRange = [4, 9];

    const r = MathUtils.randomInt(rRange[0], rRange[1]);
    const mode = MathUtils.randomElement([
      "area_from_r",
      "circ_from_r",
      "r_from_area",
    ]);

    return { r, mode, area: r * r, circ: 2 * r };
  }

  static getCircleAreaTemplates(mode, r, area) {
    if (mode === "area_from_r") {
      return [
        () => `Pole koła o promieniu $$${r}$$ jest równe:`,
        () => `Oblicz pole koła, którego promień wynosi $$${r}$$:`,
        () => `Znajdź pole koła o promieniu $$r = ${r}$$:`,
        () => `Promień koła wynosi $$${r}$$. Jakie jest jego pole?`,
        () => `Wyznacz pole koła o promieniu $$${r}$$:`,
        () => `Koło ma promień $$${r}$$. Oblicz jego pole:`,
        () => `Dla $$r = ${r}$$ oblicz pole koła:`,
        () => `Podaj pole koła o promieniu $$${r}$$:`,
        () => `Jakie jest pole koła z promieniem $$${r}$$?`,
        () => `Oblicz $$P$$ dla koła o $$r = ${r}$$:`,
      ];
    } else if (mode === "circ_from_r") {
      return [
        () => `Obwód koła o promieniu $$${r}$$ jest równy:`,
        () => `Oblicz obwód koła, którego promień wynosi $$${r}$$:`,
        () => `Znajdź obwód okręgu o promieniu $$r = ${r}$$:`,
        () => `Promień koła wynosi $$${r}$$. Jaki jest jego obwód?`,
        () => `Wyznacz obwód okręgu o promieniu $$${r}$$:`,
        () => `Koło ma promień $$${r}$$. Oblicz jego obwód:`,
        () => `Dla $$r = ${r}$$ oblicz obwód okręgu:`,
        () => `Podaj obwód koła o promieniu $$${r}$$:`,
        () => `Jaki jest obwód okręgu z promieniem $$${r}$$?`,
        () => `Oblicz $$L$$ dla okręgu o $$r = ${r}$$:`,
      ];
    } else {
      return [
        () => `Pole koła jest równe $$${area}\\pi$$. Promień tego koła wynosi:`,
        () => `Koło ma pole $$${area}\\pi$$. Znajdź jego promień:`,
        () => `Wyznacz promień koła o polu $$${area}\\pi$$:`,
        () => `Znajdź $$r$$, jeśli pole koła wynosi $$${area}\\pi$$:`,
        () => `Pole koła to $$${area}\\pi$$. Oblicz promień:`,
        () => `Oblicz promień koła, którego pole jest równe $$${area}\\pi$$:`,
        () => `Dla pola $$P = ${area}\\pi$$ wyznacz promień koła:`,
        () => `Jaki jest promień koła o polu $$${area}\\pi$$?`,
        () => `Promień koła o polu $$${area}\\pi$$ wynosi:`,
        () => `Znajdź $$r$$ dla koła o polu $$${area}\\pi$$:`,
      ];
    }
  }

  static generateCircleAreaDistractors(r, mode) {
    const area = r * r;
    const circ = 2 * r;

    if (mode === "area_from_r") {
      const correct = `${area}\\pi`;
      const candidates = [
        `${circ}\\pi`,
        `${r}\\pi`,
        `${area}`,
        `${2 * area}\\pi`,
        `${Math.floor(area / 2)}\\pi`,
      ];
      return this.pickUniqueDistractors(candidates, correct, 3);
    } else if (mode === "circ_from_r") {
      const correct = `${circ}\\pi`;
      const candidates = [
        `${area}\\pi`,
        `${r}\\pi`,
        `${circ}`,
        `${4 * r}\\pi`,
        `${r}`,
      ];
      return this.pickUniqueDistractors(candidates, correct, 3);
    } else {
      const correct = `${r}`;
      const candidates = [
        `${area}`,
        `${Math.floor(area / 2)}`,
        `${Math.floor(Math.sqrt(area) * 2)}`,
        `${r * 2}`,
        `${r + 1}`,
      ];
      return this.pickUniqueDistractors(candidates, correct, 3);
    }
  }

  static generateSectorAreaData(difficulty) {
    let angles, niceR;
    if (difficulty === "easy") {
      angles = [60, 90, 120, 180];
      niceR = MathUtils.randomElement([4, 6]);
    } else if (difficulty === "hard") {
      angles = [40, 72, 150, 45, 36];
      niceR = MathUtils.randomElement([5, 6, 10]);
    } else {
      angles = [30, 45, 60, 90, 120];
      niceR = MathUtils.randomElement([4, 6]);
    }

    const alpha = MathUtils.randomElement(angles);
    if (alpha === 72 || alpha === 36) niceR = MathUtils.randomElement([5, 10]);

    const niceTotal = niceR * niceR;
    const niceSector = (niceTotal * alpha) / 360;
    const niceSectorStr = Number.isInteger(niceSector)
      ? `${niceSector}`
      : niceSector.toFixed(1);

    return { niceR, alpha, niceSector, niceSectorStr, niceTotal };
  }

  static getSectorAreaTemplates(niceR, alpha) {
    return [
      () =>
        `Pole wycinka koła o promieniu $$${niceR}$$ i kącie środkowym $$${alpha}^\\circ$$ jest równe:`,
      () =>
        `Oblicz pole wycinka kołowego dla $$r = ${niceR}$$ i kąta $$${alpha}^\\circ$$:`,
      () =>
        `Wyznacz pole wycinka koła o promieniu $$${niceR}$$ i kącie $$${alpha}^\\circ$$:`,
      () =>
        `Znajdź pole wycinka dla koła o $$r = ${niceR}$$ i kącie środkowym $$${alpha}^\\circ$$:`,
      () =>
        `Koło o promieniu $$${niceR}$$ ma wycinek o kącie $$${alpha}^\\circ$$. Oblicz pole wycinka:`,
      () =>
        `Dla $$r = ${niceR}$$ i $$\\alpha = ${alpha}^\\circ$$ oblicz pole wycinka:`,
      () =>
        `Wycinek koła o promieniu $$${niceR}$$ i kącie $$${alpha}^\\circ$$ ma pole:`,
      () =>
        `Jakie jest pole wycinka koła ($$r = ${niceR}$$, kąt $$${alpha}^\\circ$$)?`,
      () =>
        `Podaj pole wycinka kołowego o promieniu $$${niceR}$$ i kącie $$${alpha}^\\circ$$:`,
      () =>
        `Oblicz $$P_w$$ dla wycinka o $$r = ${niceR}$$ i $$\\alpha = ${alpha}^\\circ$$:`,
    ];
  }

  static generateSectorAreaDistractors(niceSector, niceTotal, niceSectorStr) {
    const correct = `${niceSectorStr}\\pi`;
    const candidates = [
      `${(niceSector * 2).toFixed(1).replace(".0", "")}\\pi`,
      `${niceTotal}\\pi`,
      `${niceSectorStr}`,
      `${(niceSector / 2).toFixed(1).replace(".0", "")}\\pi`,
      `${Math.floor(niceTotal / 2)}\\pi`,
    ];
    return this.pickUniqueDistractors(candidates, correct, 3);
  }

  static generateArcLengthData(difficulty) {
    let angles, niceR;
    if (difficulty === "easy") {
      angles = [90, 180, 60];
      niceR = MathUtils.randomElement([4, 6]);
    } else if (difficulty === "hard") {
      angles = [40, 80, 160, 72, 36];
      niceR = MathUtils.randomElement([9, 10]);
    } else {
      angles = [60, 120, 45, 90];
      niceR = MathUtils.randomElement([6, 8]);
    }

    const alpha = MathUtils.randomElement(angles);
    if (alpha === 72 || alpha === 36) niceR = MathUtils.randomElement([5, 10]);

    const niceLen = (alpha / 360) * 2 * niceR;
    const niceLenStr = Number.isInteger(niceLen)
      ? `${niceLen}`
      : niceLen.toFixed(1);

    return { niceR, alpha, niceLen, niceLenStr };
  }

  static getArcLengthTemplates(niceR, alpha) {
    return [
      () =>
        `Długość łuku okręgu o promieniu $$${niceR}$$ i kącie środkowym $$${alpha}^\\circ$$ wynosi:`,
      () =>
        `Oblicz długość łuku dla okręgu o $$r = ${niceR}$$ i kącie $$${alpha}^\\circ$$:`,
      () =>
        `Wyznacz długość łuku okręgu o promieniu $$${niceR}$$ i kącie $$${alpha}^\\circ$$:`,
      () =>
        `Znajdź długość łuku dla $$r = ${niceR}$$ i kąta środkowego $$${alpha}^\\circ$$:`,
      () =>
        `Okrąg o promieniu $$${niceR}$$ ma łuk o kącie $$${alpha}^\\circ$$. Oblicz długość łuku:`,
      () =>
        `Dla $$r = ${niceR}$$ i $$\\alpha = ${alpha}^\\circ$$ oblicz długość łuku:`,
      () =>
        `Łuk okręgu o promieniu $$${niceR}$$ i kącie $$${alpha}^\\circ$$ ma długość:`,
      () =>
        `Jaka jest długość łuku okręgu ($$r = ${niceR}$$, kąt $$${alpha}^\\circ$$)?`,
      () =>
        `Podaj długość łuku okręgu o promieniu $$${niceR}$$ i kącie $$${alpha}^\\circ$$:`,
      () =>
        `Oblicz $$L$$ dla łuku o $$r = ${niceR}$$ i $$\\alpha = ${alpha}^\\circ$$:`,
    ];
  }

  static generateArcLengthDistractors(niceLen, niceR, niceLenStr) {
    const correct = `${niceLenStr}\\pi`;
    const circ = 2 * niceR;
    const candidates = [
      `${(niceLen * niceR).toFixed(0)}\\pi`,
      `${(niceLen / 2).toFixed(1).replace(".0", "")}\\pi`,
      `${circ}\\pi`,
      `${(niceLen * 2).toFixed(1).replace(".0", "")}\\pi`,
      `${niceLenStr}`,
    ];
    return this.pickUniqueDistractors(candidates, correct, 3);
  }

  static generateThalesData(difficulty) {
    let angleRange;
    if (difficulty === "easy") angleRange = [30, 60];
    else if (difficulty === "hard") angleRange = [15, 75];
    else angleRange = [20, 70];

    const alpha = MathUtils.randomInt(angleRange[0], angleRange[1]);
    const beta = 90 - alpha;

    return { alpha, beta };
  }

  static getThalesTemplates(alpha) {
    return [
      () =>
        `Trójkąt $$ABC$$ wpisany w okrąg o średnicy $$AB$$. Kąt $$A$$ ma $$${alpha}^\\circ$$. Kąt $$B$$ ma:`,
      () =>
        `W okręgu o średnicy $$AB$$ wpisano trójkąt $$ABC$$. Jeśli kąt $$A = ${alpha}^\\circ$$, to kąt $$B$$ wynosi:`,
      () =>
        `Trójkąt wpisany w półokrąg ma kąt przy wierzchołku $$A$$ równy $$${alpha}^\\circ$$. Znajdź kąt $$B$$:`,
      () =>
        `Twierdzenie Talesa: trójkąt $$ABC$$ ma średnicę $$AB$$. Dla $$\\angle A = ${alpha}^\\circ$$ oblicz $$\\angle B$$:`,
      () =>
        `W trójkącie wpisanym w okrąg o średnicy $$AB$$, kąt $$A = ${alpha}^\\circ$$. Jaki jest kąt $$B$$?`,
      () =>
        `Średnica $$AB$$ okręgu jest podstawą trójkąta $$ABC$$. Jeśli $$\\angle A = ${alpha}^\\circ$$, to $$\\angle B =$$:`,
      () =>
        `Oblicz kąt $$B$$ w trójkącie wpisanym w półokrąg, gdy kąt $$A = ${alpha}^\\circ$$:`,
      () =>
        `Trójkąt $$ABC$$ z kątem prostym przy $$C$$ jest wpisany w okrąg. Jeśli $$\\angle A = ${alpha}^\\circ$$, to $$\\angle B =$$:`,
      () =>
        `W okręgu o średnicy $$AB$$ trójkąt $$ABC$$ ma $$\\angle A = ${alpha}^\\circ$$. Wyznacz $$\\angle B$$:`,
      () =>
        `Znajdź kąt $$B$$ w trójkącie wpisanym w okrąg o średnicy $$AB$$, gdy $$\\angle A = ${alpha}^\\circ$$:`,
    ];
  }

  static generateThalesDistractors(alpha, beta) {
    const correct = `${beta}^\\circ`;
    const candidates = [
      `${alpha}^\\circ`,
      `${90 + alpha}^\\circ`,
      `${180 - alpha}^\\circ`,
      `${90 - alpha / 2}^\\circ`,
      `${2 * beta}^\\circ`,
      `${45}^\\circ`,
    ];
    return this.pickUniqueDistractors(candidates, correct, 3);
  }

  static generateTangentData(difficulty) {
    let triples;
    if (difficulty === "easy") {
      triples = [
        [3, 4, 5],
        [6, 8, 10],
        [5, 12, 13],
      ];
    } else if (difficulty === "hard") {
      triples = [
        [8, 15, 17],
        [9, 12, 15],
        [7, 24, 25],
        [20, 21, 29],
      ];
    } else {
      triples = [
        [5, 12, 13],
        [9, 12, 15],
        [8, 15, 17],
      ];
    }

    const [r, x, d] = MathUtils.randomElement(triples);
    const mode = MathUtils.randomElement(["find_tangent", "find_dist"]);

    return { r, x, d, mode };
  }

  static getTangentTemplates(mode, r, x, d) {
    if (mode === "find_tangent") {
      return [
        () =>
          `Promień okręgu wynosi $$r=${r}$$, odległość od środka $$d=${d}$$. Styczna $$x$$ ma długość:`,
        () =>
          `Okrąg o promieniu $$${r}$$ ma tangentę z punktu odległego o $$${d}$$. Oblicz długość stycznej:`,
        () =>
          `Znajdź długość stycznej do okręgu o $$r = ${r}$$, gdy punkt jest odległy o $$${d}$$ od środka:`,
        () =>
          `Styczna do okręgu ($$r = ${r}$$) wychodzi z punktu odległego o $$${d}$$. Jaka jest jej długość?`,
        () =>
          `Dla okręgu o promieniu $$${r}$$ i punktu w odległości $$${d}$$ od środka, oblicz długość stycznej:`,
        () =>
          `Wyznacz długość stycznej do okręgu o $$r = ${r}$$ z punktu oddalonego o $$${d}$$:`,
        () =>
          `Z punktu odległego o $$${d}$$ od środka okręgu ($$r = ${r}$$) poprowadzono styczną. Jej długość:`,
        () =>
          `Oblicz $$x$$ dla stycznej do okręgu o $$r = ${r}$$, gdy $$d = ${d}$$:`,
        () =>
          `Jaka jest długość stycznej z punktu w odległości $$${d}$$ do okręgu o promieniu $$${r}$$?`,
        () =>
          `Styczna do okręgu $$r = ${r}$$, punkt odległy o $$d = ${d}$$. Znajdź długość stycznej:`,
      ];
    } else {
      return [
        () =>
          `Styczna do okręgu wynosi $$x=${x}$$, promień okręgu $$r=${r}$$. Odległość $$d$$ ma długość:`,
        () =>
          `Okrąg o promieniu $$${r}$$ ma styczną długości $$${x}$$. Jak daleko jest punkt od środka?`,
        () =>
          `Znajdź odległość od środka okręgu ($$r = ${r}$$), gdy styczna ma długość $$${x}$$:`,
        () =>
          `Styczna do okręgu ($$r = ${r}$$) ma długość $$${x}$$. Jaka jest odległość punktu od środka?`,
        () =>
          `Dla okręgu o promieniu $$${r}$$ i stycznej długości $$${x}$$, oblicz odległość od środka:`,
        () =>
          `Wyznacz odległość $$d$$ dla okręgu o $$r = ${r}$$, gdy styczna wynosi $$${x}$$:`,
        () =>
          `Styczna długości $$${x}$$ do okręgu ($$r = ${r}$$). Odległość punktu od środka:`,
        () => `Oblicz $$d$$ dla okręgu o $$r = ${r}$$ i stycznej $$x = ${x}$$:`,
        () =>
          `Jaka jest odległość od środka okręgu ($$r = ${r}$$), gdy styczna ma długość $$${x}$$?`,
        () => `Znajdź $$d$$, gdy $$r = ${r}$$ i styczna $$x = ${x}$$:`,
      ];
    }
  }

  static generateTangentDistractors(r, x, d, mode) {
    const correct = mode === "find_tangent" ? `${x}` : `${d}`;
    const candidates = [
      `${d - r}`,
      `${x + r}`,
      `${d + r}`,
      `${Math.abs(d - x)}`,
      `${r + x}`,
      `${Math.floor(d / 2)}`,
    ];
    return this.pickUniqueDistractors(candidates, correct, 3);
  }

  static pickUniqueDistractors(candidates, correctAnswer, count) {
    const used = new Set([correctAnswer]);
    const distractors = [];

    for (const c of candidates) {
      if (!used.has(c)) {
        distractors.push(c);
        used.add(c);
      }
      if (distractors.length >= count) break;
    }

    return distractors;
  }
}

module.exports = CirclesValues;
