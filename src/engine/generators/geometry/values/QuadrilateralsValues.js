const MathUtils = require("../../../utils/MathUtils");

class QuadrilateralsValues {
  static generateRhombusData(difficulty) {
    let range;
    if (difficulty === "easy") range = [4, 24];
    else if (difficulty === "hard") range = [3, 80];
    else range = [3, 50];

    let d1 = MathUtils.randomInt(range[0], range[1]);
    let d2 = MathUtils.randomInt(range[0], range[1]);

    if (difficulty === "easy") {
      if (d1 % 2 !== 0) d1 += 1;
      if (d2 % 2 !== 0) d2 += 1;
    }

    const area = (d1 * d2) / 2;
    const areaStr = Number.isInteger(area) ? `${area}` : area.toFixed(1);

    return { d1, d2, area, areaStr };
  }

  static getRhombusTemplates(d1, d2) {
    return [
      () => `Pole rombu o przekątnych $$${d1}$$ i $$${d2}$$ wynosi:`,
      () =>
        `Oblicz pole rombu z przekątnymi $$d_1 = ${d1}$$ i $$d_2 = ${d2}$$:`,
      () =>
        `Romb ma przekątne długości $$${d1}$$ i $$${d2}$$. Jakie jest jego pole?`,
      () => `Znajdź pole rombu o przekątnych $$${d1}$$ i $$${d2}$$:`,
      () => `Dla rombu z przekątnymi $$${d1}$$ i $$${d2}$$ oblicz pole:`,
      () =>
        `Wyznacz pole rombu, którego przekątne mają długości $$${d1}$$ i $$${d2}$$:`,
      () =>
        `Przekątne rombu wynoszą $$${d1}$$ i $$${d2}$$. Pole tego rombu to:`,
      () => `Podaj pole rombu o przekątnych równych $$${d1}$$ i $$${d2}$$:`,
      () => `Jakie jest pole rombu z przekątnymi $$${d1}$$ oraz $$${d2}$$?`,
      () => `Oblicz $$P$$ dla rombu o przekątnych $$${d1}$$ i $$${d2}$$:`,
    ];
  }

  static generateRhombusDistractors(d1, d2, area) {
    const correct = Number.isInteger(area) ? `${area}` : area.toFixed(1);
    const candidates = [
      d1 * d2,
      d1 + d2,
      (d1 * d2) / 4,
      2 * (d1 + d2),
      area + d1,
      area + d2,
      Math.abs(d1 - d2),
      area * 2,
    ].map((v) => (Number.isInteger(v) ? `${v}` : v.toFixed(1)));

    return this.pickUniqueDistractors(candidates, correct, 3);
  }

  static generateRhombusAnglesData(difficulty) {
    let angle;
    if (difficulty === "easy") {
      angle = MathUtils.randomInt(2, 8) * 10;
    } else if (difficulty === "hard") {
      angle = MathUtils.randomInt(5, 89);
    } else {
      angle = MathUtils.randomInt(10, 80);
    }

    const obtuse = 180 - 2 * angle;
    return { angle, obtuse };
  }

  static getRhombusAnglesTemplates(angle) {
    return [
      () =>
        `Kąt między dłuższą przekątną a bokiem rombu ma miarę $$${angle}^\\circ$$. Oblicz kąt rozwarty tego rombu.`,
      () =>
        `W rombie kąt między przekątną a bokiem wynosi $$${angle}^\\circ$$. Znajdź kąt rozwarty:`,
      () =>
        `Przekątna rombu tworzy z bokiem kąt $$${angle}^\\circ$$. Jaki jest kąt rozwarty rombu?`,
      () =>
        `Kąt przy przekątnej rombu to $$${angle}^\\circ$$. Wyznacz kąt rozwarty:`,
      () =>
        `Dłuższa przekątna rombu tworzy z bokiem kąt $$${angle}^\\circ$$. Oblicz kąt rozwarty:`,
      () =>
        `W rombie kąt między bokiem a dłuższą przekątną wynosi $$${angle}^\\circ$$. Kąt rozwarty to:`,
      () =>
        `Znajdź kąt rozwarty rombu, gdy kąt między przekątną a bokiem ma $$${angle}^\\circ$$:`,
      () =>
        `Kąt $$${angle}^\\circ$$ jest między przekątną a bokiem rombu. Oblicz kąt rozwarty:`,
      () =>
        `Dla rombu z kątem $$${angle}^\\circ$$ przy przekątnej, podaj kąt rozwarty:`,
      () =>
        `Wyznacz miarę kąta rozwartego rombu, gdy kąt przy przekątnej wynosi $$${angle}^\\circ$$:`,
    ];
  }

  static generateRhombusAnglesDistractors(angle, obtuse) {
    const correct = `${obtuse}^\\circ`;
    const candidates = [
      `${2 * angle}^\\circ`,
      `${90 + angle}^\\circ`,
      `${180 - angle}^\\circ`,
      `${90 - angle}^\\circ`,
      `${angle}^\\circ`,
      `${3 * angle}^\\circ`,
      `${obtuse + 10}^\\circ`,
      `${obtuse - 10}^\\circ`,
      `${angle + 20}^\\circ`,
      `${180 - 2 * angle + angle}^\\circ`,
    ];
    return this.pickUniqueDistractors(candidates, correct, 3);
  }

  static generateParallelogramData(difficulty) {
    let alpha;
    if (difficulty === "easy") {
      alpha = MathUtils.randomInt(4, 8) * 10;
    } else if (difficulty === "hard") {
      alpha = MathUtils.randomInt(1, 89);
    } else {
      alpha = MathUtils.randomInt(20, 80);
    }

    const beta = 180 - alpha;
    return { alpha, beta };
  }

  static getParallelogramTemplates(alpha) {
    return [
      () =>
        `Kąt ostry równoległoboku ma miarę $$${alpha}^\\circ$$. Miara kąta rozwartego tego równoległoboku jest równa:`,
      () =>
        `W równoległoboku kąt ostry wynosi $$${alpha}^\\circ$$. Oblicz kąt rozwarty:`,
      () =>
        `Równoległobok ma kąt ostry $$${alpha}^\\circ$$. Jaki jest kąt rozwarty?`,
      () =>
        `Znajdź kąt rozwarty równoległoboku, gdy kąt ostry ma $$${alpha}^\\circ$$:`,
      () =>
        `Kąt ostry równoległoboku to $$${alpha}^\\circ$$. Wyznacz kąt rozwarty:`,
      () =>
        `Dla kąta ostrego $$${alpha}^\\circ$$ w równoległoboku oblicz kąt rozwarty:`,
      () =>
        `Jeden kąt równoległoboku ma $$${alpha}^\\circ$$. Podaj miarę kąta rozwartego:`,
      () =>
        `W równoległoboku kąt ostry wynosi $$${alpha}^\\circ$$. Kąt rozwarty to:`,
      () =>
        `Oblicz kąt rozwarty równoległoboku z kątem ostrym $$${alpha}^\\circ$$:`,
      () =>
        `Jeśli kąt ostry równoległoboku to $$${alpha}^\\circ$$, to kąt rozwarty wynosi:`,
    ];
  }

  static generateParallelogramDistractors(alpha, beta) {
    const correct = `${beta}^\\circ`;
    const dist1 = 90 - alpha > 0 ? 90 - alpha : alpha + 10;
    const candidates = [
      `${dist1}^\\circ`,
      `${alpha}^\\circ`,
      `${2 * alpha}^\\circ`,
      `${alpha + 45}^\\circ`,
      `${360 - alpha}^\\circ`,
    ];
    return this.pickUniqueDistractors(candidates, correct, 3);
  }

  static generateTrapezoidData(difficulty) {
    let range;
    if (difficulty === "easy") range = [2, 12];
    else if (difficulty === "hard") range = [3, 30];
    else range = [3, 20];

    const a = MathUtils.randomInt(range[0] + 2, range[1] + 4);
    let b = MathUtils.randomInt(range[0], a - 1);
    const h = MathUtils.randomInt(range[0], range[1]);

    if (difficulty === "easy" && (a + b) % 2 !== 0) {
      b += 1;
    }

    const area = 0.5 * (a + b) * h;
    const areaStr = Number.isInteger(area) ? `${area}` : area.toFixed(1);

    return { a, b, h, area, areaStr };
  }

  static getTrapezoidTemplates(a, b, h) {
    return [
      () =>
        `Trapez ma podstawy $$${a}$$ i $$${b}$$ oraz wysokość $$${h}$$. Jego pole wynosi:`,
      () =>
        `Oblicz pole trapezu o podstawach $$${a}$$ i $$${b}$$ oraz wysokości $$${h}$$:`,
      () =>
        `Znajdź pole trapezu z podstawami $$a = ${a}$$, $$b = ${b}$$ i wysokością $$h = ${h}$$:`,
      () =>
        `Trapez o podstawach $$${a}$$ i $$${b}$$, wysokość $$${h}$$. Jakie jest pole?`,
      () =>
        `Wyznacz pole trapezu: podstawy $$${a}$$ i $$${b}$$, wysokość $$${h}$$:`,
      () =>
        `Dla trapezu z $$a = ${a}$$, $$b = ${b}$$, $$h = ${h}$$ oblicz pole:`,
      () =>
        `Podstawy trapezu wynoszą $$${a}$$ i $$${b}$$, wysokość $$${h}$$. Pole to:`,
      () =>
        `Podaj pole trapezu o podstawach $$${a}$$, $$${b}$$ i wysokości $$${h}$$:`,
      () =>
        `Jakie jest pole trapezu z podstawami $$${a}$$ i $$${b}$$ oraz $$h = ${h}$$?`,
      () =>
        `Oblicz $$P$$ dla trapezu: $$a = ${a}$$, $$b = ${b}$$, $$h = ${h}$$:`,
    ];
  }

  static generateTrapezoidDistractors(a, b, h, area) {
    const correct = Number.isInteger(area) ? `${area}` : area.toFixed(1);
    const candidates = [
      area * 2,
      (a + b) * 2,
      a * b * h,
      a * h,
      b * h,
      a + b + h,
      area + h,
      Math.abs(area - h),
    ].map((v) => (Number.isInteger(v) ? `${v}` : v.toFixed(1)));

    return this.pickUniqueDistractors(candidates, correct, 3);
  }

  static generateQuadAnglesData(difficulty) {
    let alpha;
    if (difficulty === "easy") {
      alpha = MathUtils.randomInt(4, 8) * 10;
    } else if (difficulty === "hard") {
      alpha = MathUtils.randomInt(1, 89);
    } else {
      alpha = MathUtils.randomInt(30, 85);
    }

    return { alpha, beta: 180 - alpha };
  }

  static getQuadAnglesTemplates(alpha) {
    return [
      () =>
        `Kąt ostry równoległoboku to $$${alpha}^\\circ$$. Oblicz kąt rozwarty.`,
      () =>
        `W równoległoboku jeden kąt ma $$${alpha}^\\circ$$. Znajdź kąt rozwarty:`,
      () =>
        `Dany jest równoległobok z kątem $$${alpha}^\\circ$$. Wyznacz kąt rozwarty:`,
      () =>
        `Kąt równoległoboku wynosi $$${alpha}^\\circ$$. Oblicz kąt przyległy:`,
      () =>
        `Znajdź kąt rozwarty równoległoboku, gdy jeden kąt ma $$${alpha}^\\circ$$:`,
      () =>
        `Równoległobok ma kąt $$${alpha}^\\circ$$. Podaj miarę kąta rozwartego:`,
      () =>
        `Dla kąta $$${alpha}^\\circ$$ w równoległoboku oblicz kąt rozwarty:`,
      () => `W równoległoboku kąt wynosi $$${alpha}^\\circ$$. Kąt rozwarty to:`,
      () => `Oblicz kąt rozwarty równoległoboku z kątem $$${alpha}^\\circ$$:`,
      () =>
        `Jeśli kąt równoległoboku to $$${alpha}^\\circ$$, to kąt rozwarty wynosi:`,
    ];
  }

  static generateQuadAnglesDistractors(alpha) {
    const beta = 180 - alpha;
    const correct = `α=${beta}^\\circ`;
    const dist1 = 90 - alpha > 0 ? 90 - alpha : alpha + 20;
    const candidates = [
      `α=${dist1}^\\circ`,
      `α=${alpha}^\\circ`,
      `α=${2 * alpha}^\\circ`,
      `α=${alpha + 30}^\\circ`,
      `α=${360 - alpha}^\\circ`,
    ];
    return this.pickUniqueDistractors(candidates, correct, 3);
  }

  static generateCyclicData(difficulty) {
    let alpha;
    if (difficulty === "easy") {
      alpha = MathUtils.randomInt(5, 17) * 10;
    } else if (difficulty === "hard") {
      alpha = MathUtils.randomInt(1, 179);
    } else {
      alpha = MathUtils.randomInt(30, 150);
    }

    const gamma = 180 - alpha;
    return { alpha, gamma };
  }

  static getCyclicTemplates(alpha) {
    return [
      () =>
        `W okrąg wpisano czworokąt. Kąt $$A$$ ma $$${alpha}^\\circ$$. Kąt $$C$$ ma miarę:`,
      () =>
        `Czworokąt wpisany w okrąg ma kąt $$A = ${alpha}^\\circ$$. Oblicz kąt $$C$$:`,
      () =>
        `Dla czworokąta wpisanego w okrąg z $$\\angle A = ${alpha}^\\circ$$ znajdź $$\\angle C$$:`,
      () =>
        `W czworokącie wpisanym w okrąg $$\\angle A = ${alpha}^\\circ$$. Jaki jest $$\\angle C$$?`,
      () =>
        `Kąt $$A$$ czworokąta wpisanego w okrąg wynosi $$${alpha}^\\circ$$. Wyznacz kąt $$C$$:`,
      () =>
        `Czworokąt wpisany: $$\\angle A = ${alpha}^\\circ$$. Oblicz $$\\angle C$$:`,
      () =>
        `Znajdź miarę kąta $$C$$ w czworokącie wpisanym, gdy $$\\angle A = ${alpha}^\\circ$$:`,
      () =>
        `W okrąg wpisano czworokąt $$ABCD$$. Jeśli $$\\angle A = ${alpha}^\\circ$$, to $$\\angle C =$$:`,
      () =>
        `Dla czworokąta wpisanego z kątem $$A = ${alpha}^\\circ$$ podaj kąt $$C$$:`,
      () =>
        `Czworokąt wpisany w okrąg: $$\\angle A = ${alpha}^\\circ$$. Kąt przeciwległy $$C$$ wynosi:`,
    ];
  }

  static generateCyclicDistractors(alpha, gamma) {
    const correct = `${gamma}^\\circ`;
    const candidates = [
      `${alpha}^\\circ`,
      `${180 + alpha}^\\circ`,
      `${360 - alpha}^\\circ`,
      `${90 + alpha}^\\circ`,
      `${alpha / 2}^\\circ`,
    ];
    return this.pickUniqueDistractors(candidates, correct, 3);
  }

  static generateTangentialData(difficulty) {
    let range;
    if (difficulty === "easy") range = [3, 12];
    else if (difficulty === "hard") range = [3, 35];
    else range = [3, 25];

    const a = MathUtils.randomInt(range[0], range[1]);
    const b = MathUtils.randomInt(range[0], range[1]);
    const c = MathUtils.randomInt(range[0], range[1]);

    let d = a + c - b;
    let aFinal = a;
    let cFinal = c;

    if (d <= 0) {
      aFinal += Math.abs(d) + 2;
      d = aFinal + cFinal - b;
    }

    return { a: aFinal, b, c: cFinal, d };
  }

  static getTangentialTemplates(a, b, c) {
    return [
      () =>
        `W czworokąt wpisano okrąg. Boki $$AB=${a}, BC=${b}, CD=${c}$$. $$DA$$ wynosi:`,
      () =>
        `Czworokąt opisany na okręgu ma boki $$AB=${a}$$, $$BC=${b}$$, $$CD=${c}$$. Oblicz $$DA$$:`,
      () =>
        `Dla czworokąta z wpisanym okręgiem: $$AB=${a}$$, $$BC=${b}$$, $$CD=${c}$$. Znajdź $$DA$$:`,
      () =>
        `W czworokąt wpisano okrąg. $$AB=${a}$$, $$BC=${b}$$, $$CD=${c}$$. Jaki jest bok $$DA$$?`,
      () =>
        `Czworokąt z wpisanym okręgiem: boki $$${a}$$, $$${b}$$, $$${c}$$. Wyznacz czwarty bok:`,
      () =>
        `Okrąg wpisano w czworokąt. $$AB=${a}$$, $$BC=${b}$$, $$CD=${c}$$. Oblicz $$DA$$:`,
      () =>
        `Znajdź bok $$DA$$ czworokąta z wpisanym okręgiem ($$AB=${a}$$, $$BC=${b}$$, $$CD=${c}$$):`,
      () =>
        `W czworokącie opisanym na okręgu: $$AB=${a}$$, $$BC=${b}$$, $$CD=${c}$$. $$DA$$ to:`,
      () =>
        `Dla czworokąta opisanego: $$AB=${a}$$, $$BC=${b}$$, $$CD=${c}$$. Podaj $$DA$$:`,
      () =>
        `Czworokąt z wpisanym okręgiem ma boki $$${a}$$, $$${b}$$, $$${c}$$. Czwarty bok:`,
    ];
  }

  static generateTangentialDistractors(a, b, c, d) {
    const correct = `${d}`;
    const candidates = [
      `${a + b + c}`,
      `${Math.abs(a - c)}`,
      `${a + c}`,
      `${b + c}`,
      `${a + b}`,
      `${d + 1}`,
      `${d - 1}`,
    ].filter((v) => parseInt(v) > 0);
    return this.pickUniqueDistractors(candidates, correct, 3);
  }

  static pickUniqueDistractors(candidates, correctAnswer, count) {
    const used = new Set([correctAnswer]);
    const distractors = [];

    for (const c of candidates) {
      if (!used.has(c) && c !== "0" && !c.startsWith("-")) {
        distractors.push(c);
        used.add(c);
      }
      if (distractors.length >= count) break;
    }

    return distractors;
  }
}

module.exports = QuadrilateralsValues;
