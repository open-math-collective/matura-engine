const BaseGenerator = require("../../../core/BaseGenerator");
const MathUtils = require("../../../utils/MathUtils");
const NumbersValues = require("../values/NumbersValues");

class NumbersGenerator extends BaseGenerator {
  generatePercentProblem() {
    const { pList, priceRange } = NumbersValues.getPercentProblemValues(
      this.difficulty,
    );

    const p = MathUtils.randomElement(pList);
    const originalPrice = MathUtils.randomInt(priceRange[0], priceRange[1]);

    const finalPrice = originalPrice * (1 - p / 100);

    const finalPriceStr = Number.isInteger(finalPrice)
      ? `${finalPrice}`
      : finalPrice.toFixed(2);

    return this.createResponse({
      question: `Cena towaru została obniżona o $$${p}\\%$$. Po obniżce towar kosztuje $$${finalPriceStr}$$ zł. Cena początkowa wynosiła:`,
      latex: null,
      image: null,
      variables: { p, originalPrice, finalPrice },
      correctAnswer: `${originalPrice} zł`,
      distractors: [
        `${(finalPrice * (1 + p / 100)).toFixed(2).replace(".00", "") + 5} zł`,
        `${originalPrice - 10} zł`,
        `${(finalPrice + p).toFixed(2).replace(".00", "") - 5} zł`,
      ],
      steps: [
        `$$(100\\% - ${p}\\%)x = ${finalPriceStr} \\implies ${(100 - p) / 100}x = ${finalPriceStr} \\implies x = ${originalPrice}$$`,
      ],
      questionType: "closed",
    });
  }

  generatePercentRelations() {
    const s = NumbersValues.getPercentRelationsValues(this.difficulty);

    return this.createResponse({
      question: `Liczba $$${s.varX}$$ jest o $$${s.p}\\%$$ większa od liczby $$${s.varY}$$. Wynika stąd, że $$${s.varY}=?$$`,
      latex: null,
      image: null,
      variables: { p: s.p, varX: s.varX, varY: s.varY },
      correctAnswer: `${s.varY} = ${s.b_frac}${s.varX}`,
      distractors: [
        `${s.varY} = ${1 + s.p / 100}${s.varX}`,
        `${s.varY} = ${Math.abs(1 - s.p / 100)
          .toFixed(2)
          .replace("0.", ".")}${s.varX}`,
        `${s.varY} = ${s.p / 100}${s.varX}`,
      ],
      steps: [
        `$$${s.varX} = ${1 + s.p / 100}${s.varY}$$`,
        `$$${s.varY} = ${s.varX} : ${1 + s.p / 100} = ${s.b_frac}${s.varX}$$`,
      ],
      questionType: "closed",
    });
  }

  generateErrorProblem() {
    const { errorList, xRange } = NumbersValues.getErrorProblemValues(
      this.difficulty,
    );

    const errorPercent = MathUtils.randomElement(errorList);
    const x = MathUtils.randomInt(xRange[0] / 10, xRange[1] / 10) * 10;

    const delta = x * (errorPercent / 100);
    const isExcess = MathUtils.randomElement([true, false]);
    const y = isExcess ? x + delta : x - delta;

    const yStr = Number.isInteger(y) ? `${y}` : y.toFixed(2);
    const deltaStr = Number.isInteger(delta) ? `${delta}` : delta.toFixed(2);

    return this.createResponse({
      question: `Liczba $$y=${yStr}$$ jest przybliżeniem liczby $$x=${x}$$. Błąd względny wynosi:`,
      latex: null,
      image: null,
      variables: { x, y },
      correctAnswer: `${errorPercent}\\%`,
      distractors: [
        `${deltaStr}\\%`,
        `${100 - errorPercent}\\%`,
        `${errorPercent / 10}\\%`,
      ],
      steps: [
        `Błąd bezwzględny: $$|x-y|=${deltaStr}$$`,
        `Błąd względny: $$\\frac{${deltaStr}}{${x}} = ${errorPercent}\\%$$`,
      ],
      questionType: "closed",
    });
  }

  generateGcdLcm() {
    const { commonList, mRange } = NumbersValues.getGcdLcmValues(
      this.difficulty,
    );

    const common = MathUtils.randomElement(commonList);
    const m1 = MathUtils.randomInt(mRange[0], mRange[1]);
    const m2 = MathUtils.randomInt(mRange[0], mRange[1]);

    // a != b
    const a = common * m1;
    let b = common * m2;
    if (a === b) b += common;

    const gcdVal = this.getGCD(a, b);
    const lcmVal = this.getLCM(a, b);
    const mode = MathUtils.randomElement(["gcd", "lcm"]);
    const symbol = mode === "gcd" ? "NWD" : "NWW";
    const result = mode === "gcd" ? gcdVal : lcmVal;

    return this.createResponse({
      question: `Oblicz $$${symbol}(${a}, ${b})$$.`,
      latex: null,
      image: null,
      variables: { a, b, mode },
      correctAnswer: `${result}`,
      distractors: [
        `${mode === "gcd" ? lcmVal : gcdVal}`,
        `${mode === "gcd" ? 1 : a * b}`,
        `${mode === "gcd" ? Math.min(a, b) : Math.max(a, b)}`,
      ],
      steps: [
        `Rozkładamy na czynniki i stosujemy algorytm Euklidesa lub własność $$NWD \\cdot NWW = a \\cdot b$$.`,
      ],
      questionType: "open",
      answerFormat: `number`,
    });
  }

  getGCD(a, b) {
    return b ? this.getGCD(b, a % b) : a;
  }
  getLCM(a, b) {
    return (a * b) / this.getGCD(a, b);
  }
}

module.exports = NumbersGenerator;
