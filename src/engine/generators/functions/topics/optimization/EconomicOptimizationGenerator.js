const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");
const EconomicOptimizationValues = require("../../values/EconomicOptimizationValues");

class EconomicOptimizationGenerator extends BaseGenerator {
  generateRevenueProblem() {
    const scenarios = EconomicOptimizationValues.getRevenueScenarios();
    const scenario = MathUtils.randomElement(scenarios);
    const diffRanges =
      scenario.ranges[this.difficulty] || scenario.ranges.medium;

    const stepPrice = 1;
    const stepSales =
      this.difficulty === "hard"
        ? MathUtils.randomInt(5, 15)
        : MathUtils.randomInt(2, 5);

    let startPrice, startSales, p;
    let attempts = 0;

    do {
      startPrice = MathUtils.randomInt(
        diffRanges.price[0],
        diffRanges.price[1],
      );
      startSales = MathUtils.randomInt(
        diffRanges.sales[0],
        diffRanges.sales[1],
      );

      const b = startPrice * stepSales - startSales;
      const doubleA = 2 * -stepSales;
      p = -b / doubleA;
      attempts++;

      if (this.difficulty !== "hard" && !Number.isInteger(p)) p = -1;
      if (this.difficulty === "hard" && !Number.isInteger(p * 2)) p = -1;
    } while ((p <= 0 || p >= startPrice) && attempts < 100);

    if (p <= 0) {
      startPrice = 50;
      startSales = 100;
      p = (50 * stepSales - 100) / (2 * stepSales);
    }

    const x = p;
    const newPrice = startPrice - x;
    const newSales = startSales + stepSales * x;
    const maxRevenue = newPrice * newSales;

    const xStr = Number.isInteger(x) ? `${x}` : x.toFixed(1);
    const newPriceStr = Number.isInteger(newPrice)
      ? `${newPrice}`
      : newPrice.toFixed(1);

    const templateFn = MathUtils.randomElement(scenario.templates);
    const questionText = templateFn(
      startPrice,
      startSales,
      stepPrice,
      stepSales,
      scenario.subject,
      scenario.unit,
    );

    const correctAnswer =
      scenario.id === "hotel" || scenario.id === "electronics"
        ? `${newPriceStr}`
        : `${xStr}`;

    const distractors = EconomicOptimizationValues.generateRevenueDistractors(
      correctAnswer,
      startPrice,
      scenario.unit,
    );

    return this.createResponse({
      question: questionText,
      latex: `P(x) = (${startPrice} - x)(${startSales} + ${stepSales}x)`,
      image: null,
      variables: { startPrice, startSales, stepSales, optimalX: x },
      correctAnswer,
      distractors: MathUtils.ensureUniqueDistractors(
        `${correctAnswer} ${scenario.unit}`,
        distractors.map((d) => `${correctAnswer} ${scenario.unit}`),
        () =>
          `${Number(correctAnswer) + MathUtils.randomInt(1, 10)} ${scenario.unit}`,
      ),
      steps: [
        `Oznaczmy przez $$x$$ kwotę obniżki. Nowa cena: $$${startPrice} - x$$. Nowa sprzedaż: $$${startSales} + ${stepSales}x$$.`,
        `Funkcja przychodu: $$P(x) = (${startPrice} - x)(${startSales} + ${stepSales}x)$$`,
        `Po wymnożeniu: $$P(x) = -${stepSales}x^2 + ${startPrice * stepSales - startSales}x + ${startPrice * startSales}$$`,
        `Wierzchołek paraboli (maksimum): $$p = \\frac{-b}{2a} = ${xStr}$$`,
        scenario.id === "hotel" || scenario.id === "electronics"
          ? `Szukana cena: $$${startPrice} - ${xStr} = ${newPriceStr}$$ ${scenario.unit}.`
          : `Należy obniżyć cenę o $$${xStr}$$ ${scenario.unit}.`,
      ],
      questionType: "open",
      answerFormat: "number",
    });
  }

  generateDensityProblem() {
    const params = EconomicOptimizationValues.getDensityParams(this.difficulty);
    const templates = EconomicOptimizationValues.getDensityTemplates();

    const startTrees = MathUtils.randomInt(
      params.treeRange[0],
      params.treeRange[1],
    );
    const lossPerTree = MathUtils.randomElement(params.lossList);
    const targetX = MathUtils.randomInt(
      params.targetXRange[0],
      params.targetXRange[1],
    );

    const calculatedStartFruits = lossPerTree * (2 * targetX + startTrees);

    const templateFn = MathUtils.randomElement(templates);
    const questionText = templateFn(
      calculatedStartFruits,
      startTrees,
      lossPerTree,
      "drzew",
    );

    const distractors = EconomicOptimizationValues.generateDensityDistractors(
      targetX,
      startTrees,
    );

    return this.createResponse({
      question: questionText,
      latex: `Plon(x) = (${startTrees} + x)(${calculatedStartFruits} - ${lossPerTree}x)`,
      image: null,
      variables: { calculatedStartFruits, startTrees, lossPerTree, targetX },
      correctAnswer: `${targetX}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `${targetX} drzew`,
        distractors,
        () => `${targetX + MathUtils.randomInt(-5, 5)} drzew`,
      ),
      steps: [
        `Niech $$x$$ oznacza liczbę dosadzonych drzew. Liczba drzew: $$${startTrees} + x$$.`,
        `Plon z jednego drzewa: $$${calculatedStartFruits} - ${lossPerTree}x$$.`,
        `Funkcja plonu całkowitego: $$P(x) = (${startTrees} + x)(${calculatedStartFruits} - ${lossPerTree}x)$$`,
        `Jest to funkcja kwadratowa o ramionach w dół. Obliczamy wierzchołek $$p$$.`,
        `Miejsca zerowe: $$x_1 = -${startTrees}$$, $$x_2 = ${calculatedStartFruits / lossPerTree}$$.`,
        `Wierzchołek leży pośrodku: $$p = \\frac{-${startTrees} + ${calculatedStartFruits / lossPerTree}}{2} = ${targetX}$$`,
        `Należy dosadzić $$${targetX}$$ drzew.`,
      ],
      questionType: "open",
      answerFormat: "number",
    });
  }

  generateParabolaSVG(startP, startS, step, optX, maxRev, isDensity = false) {
    const size = 300;
    const center = size / 2;
    let pathData = "";
    for (let x = -10; x <= 10; x += 0.5) {
      const relX = x;
      const relY = -(x * x) + 9;
      const svgX = center + relX * 10;
      const svgY = center - relY * 10;
      pathData += `${pathData ? "L" : "M"} ${svgX} ${svgY} `;
    }
    const axis = `
        <line x1="10" y1="${center + 90}" x2="${size - 10}" y2="${center + 90}" stroke="#333" stroke-width="2" />
        <line x1="${center - 100}" y1="${size - 10}" x2="${center - 100}" y2="10" stroke="#333" stroke-width="2" />
        <text x="${center + 120}" y="${center + 110}" font-size="12">ilość (x)</text>
        <text x="${center - 110}" y="20" font-size="12">przychód</text>
    `;
    const vertex = `<circle cx="${center}" cy="${center - 90}" r="5" fill="red" />`;
    return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff">${axis}<path d="${pathData}" stroke="#007bff" stroke-width="3" fill="none" transform="translate(0, 90)"/><g transform="translate(0, 90)">${vertex}</g></svg>`;
  }
}

module.exports = EconomicOptimizationGenerator;
