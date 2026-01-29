const BaseGenerator = require("../../../core/BaseGenerator");
const MathUtils = require("../../../utils/MathUtils");
const PermutationsValues = require("../values/PermutationsValues");

class PermutationsGenerator extends BaseGenerator {
  generateQueueProblem() {
    const { nRange, scenarios, usePartial } =
      PermutationsValues.getQueueProblemParams(this.difficulty);

    const n = MathUtils.randomInt(nRange[0], nRange[1]);
    const scenario = MathUtils.randomElement(scenarios);

    let res, q, steps;

    const partialScenarios = [
      "arrangement",
      "tournament",
      "podium",
      "seats",
      "stations",
      "queue",
      "row",
      "shelf",
      "line",
      "circle",
      "photo",
      "order",
    ];

    if (usePartial && partialScenarios.includes(scenario)) {
      const maxK = Math.min(n - 1, 5);
      const k = MathUtils.randomInt(2, maxK);

      if (scenario === "circle") {
        res = Math.floor(PermutationsValues.permutation(n, k) / k);
        q = PermutationsValues.getPartialPermutationTemplates(scenario, n, k);
        steps = [
          `Liczba permutacji ${k} osób z $$${n}$$ w okręgu: $$\\frac{P(n,k)}{k}$$`,
          `$$\\frac{${n} \\cdot ${n - 1} \\cdot ... \\cdot ${n - k + 1}}{${k}} = ${res}$$`,
        ];
      } else {
        res = PermutationsValues.permutation(n, k);
        q = PermutationsValues.getPartialPermutationTemplates(scenario, n, k);
        steps = [
          `Liczba permutacji $$k$$-elementowych ze zbioru $$n$$-elementowego: $$P(n,k) = \\frac{n!}{(n-k)!}$$`,
          `$$P(${n},${k}) = ${n} \\cdot ${n - 1} \\cdot ... \\cdot ${n - k + 1} = ${res}$$`,
        ];
      }
    } else {
      const isCircle = scenario === "circle";
      res = isCircle
        ? PermutationsValues.circularPermutation(n)
        : PermutationsValues.factorial(n);

      q = PermutationsValues.getQueueTemplates(scenario, n);

      steps = isCircle
        ? [
            `W układzie okrągłym (permutacje cykliczne) liczba ustawień to $$(n-1)!$$.`,
            `$$(${n}-1)! = ${n - 1}! = ${res}$$`,
          ]
        : [
            `Liczba permutacji zbioru $$n$$-elementowego to $$n!$$.`,
            `$$${n}! = ${res}$$`,
          ];
    }

    return this.createResponse({
      question: q,
      latex: null,
      image: null,
      variables: { n, scenario },
      correctAnswer: `${res}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `${res}`,
        [`${n * n}`, `${n}`, `${Math.floor(res / 2)}`, `${res + n}`],
        () => {
          const multiplier = MathUtils.randomElement([2, 0.5, n, n - 1]);
          return `${Math.floor(res * multiplier)}`;
        },
      ),
      steps: steps,
      questionType: "open",
      answerFormat: "number",
    });
  }

  generateFlagProblem() {
    const { kRange, stripeCounts, repetitionOptions } =
      PermutationsValues.getFlagProblemParams(this.difficulty);

    const stripeCount = MathUtils.randomElement(stripeCounts);
    const distinct = MathUtils.randomElement(repetitionOptions);

    const maxSafeK = {
      2: 100000, // P(100000,2) = 1e10
      3: 30000, // P(30000,3) ~= 2.7e13
      4: 1000, // P(1000,4) ~= 1e12
      5: 500, // P(500,5) ~= 3e13
      6: 200, // P(200,6) ~= 4e13
      7: 100, // P(100,7) ~= 8e13
    };
    const safeMaxK = Math.min(kRange[1], maxSafeK[stripeCount] || 50);
    const k = MathUtils.randomInt(kRange[0], safeMaxK);

    const res = distinct
      ? PermutationsValues.permutation(k, stripeCount)
      : Math.pow(k, stripeCount);

    const q = PermutationsValues.getFlagTemplates(k, stripeCount, distinct);

    let steps;
    if (distinct) {
      const parts = [];
      for (let i = 0; i < stripeCount; i++) {
        parts.push(`${k - i}`);
      }
      steps = [
        `Pierwszy pas: ${k} opcji. Drugi: ${k - 1} opcji. ` +
          (stripeCount > 2 ? `Trzeci: ${k - 2} opcji.` : ""),
        `$$${parts.join(" \\cdot ")} = ${res}$$`,
      ];
    } else {
      steps = [
        `Każdy pas możemy wybrać na ${k} sposobów.`,
        `$$${k}^{${stripeCount}} = ${res}$$`,
      ];
    }

    return this.createResponse({
      question: q,
      latex: null,
      image: null,
      variables: { k, stripeCount, distinct },
      correctAnswer: `${res}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `${res}`,
        [
          distinct
            ? `${Math.pow(k, stripeCount)}`
            : `${PermutationsValues.permutation(k, stripeCount)}`,
          `${k * stripeCount}`,
          `${Math.pow(stripeCount, k)}`,
        ],
        () => {
          const offset = MathUtils.randomInt(1, 3);
          const fakeK = k + offset;
          const fake = distinct
            ? PermutationsValues.permutation(fakeK, stripeCount)
            : Math.pow(fakeK, stripeCount);
          return `${fake}`;
        },
      ),
      steps: steps,
      questionType: "open",
      answerFormat: "number",
    });
  }

  generateSeatingConstraint() {
    const { nRange, constraintTypes, personNames } =
      PermutationsValues.getSeatingConstraintParams(this.difficulty);

    const n = MathUtils.randomInt(nRange[0], nRange[1]);
    const type = MathUtils.randomElement(constraintTypes);

    const availableNames = [...personNames];
    const name1 = MathUtils.randomElement(availableNames);
    const name2 = availableNames.filter((n) => n !== name1)[
      MathUtils.randomInt(0, availableNames.length - 2)
    ];
    const name3 = availableNames.filter((n) => n !== name1 && n !== name2)[
      MathUtils.randomInt(0, availableNames.length - 3)
    ];

    let res, desc;

    switch (type) {
      case "together": {
        // (n-1)! * 2
        const fact = PermutationsValues.factorial(n - 1);
        res = fact * 2;
        desc = `Sklejamy ${name1} i ${name2} w jeden element. Mamy wtedy $$${n - 1}$$ elementów do ustawienia ($$${n - 1}!$$). Osoby te mogą zamienić się miejscami ($$\\cdot 2$$).`;
        break;
      }
      case "fixed_first": {
        // (n-1)!
        res = PermutationsValues.factorial(n - 1);
        desc = `Skoro ${name1} jest ustalony na pierwszym miejscu, to pozostałe $$${n - 1}$$ osób ustawiamy dowolnie.`;
        break;
      }
      case "fixed_position": {
        // (n-1)!
        res = PermutationsValues.factorial(n - 1);
        desc = `${name1} ma ustaloną pozycję, więc pozostałe $$${n - 1}$$ osób ustawiamy na $$${n - 1}$$ miejscach.`;
        break;
      }
      case "apart": {
        // n! - (n-1)! * 2
        const total = PermutationsValues.factorial(n);
        const together = PermutationsValues.factorial(n - 1) * 2;
        res = total - together;
        desc = `Od wszystkich permutacji ($$${n}! = ${total}$$) odejmujemy te, gdzie siedzą razem ($$(${n}-1)! \\cdot 2 = ${together}$$).`;
        break;
      }
      case "ends": {
        // 2! * (n-2)!
        const innerFact = PermutationsValues.factorial(n - 2);
        res = 2 * innerFact;
        desc = `${name1} i ${name2} mogą zamienić się miejscami na krańcach ($$2!$$), a pozostałe $$${n - 2}$$ osób ustawiamy na środku ($$${n - 2}!$$).`;
        break;
      }
      case "together_three": {
        // (n-2)! * 3!
        const groupFact = PermutationsValues.factorial(n - 2);
        res = groupFact * 6; // 3! = 6
        desc = `Traktujemy trójkę jako jeden element. Mamy $$${n - 2}$$ elementów ($$${n - 2}!$$), a wewnątrz trójki mamy $$3!$$ permutacji.`;
        break;
      }
      default: {
        const fact = PermutationsValues.factorial(n - 1);
        res = fact * 2;
        desc = `Sklejamy ${name1} i ${name2} w jeden element. Mamy $$${n - 1}$$ elementów do ustawienia ($$${n - 1}!$$).`;
      }
    }

    const q = PermutationsValues.getSeatingConstraintTemplates(
      type,
      n,
      name1,
      name2,
      name3,
    );

    return this.createResponse({
      question: q,
      latex: ``,
      image: null,
      variables: { n, type, name1, name2 },
      correctAnswer: `${res}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `${res}`,
        [
          `${PermutationsValues.factorial(n)}`,
          `${PermutationsValues.factorial(n - 1)}`,
          `${Math.abs(res - n)}`,
        ],
        () => {
          const offset = MathUtils.randomElement([
            1,
            -1,
            n,
            PermutationsValues.factorial(n - 2),
          ]);
          return `${Math.abs(res + offset)}`;
        },
      ),
      steps: [desc, `Wynik: $$${res}$$`],
      questionType: "open",
      answerFormat: "number",
    });
  }

  generateSVG(params) {
    if (params.type === "flag") {
      return `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff">
                <rect x="50" y="20" width="200" height="50" fill="#ddd" stroke="black"/>
                <rect x="50" y="70" width="200" height="50" fill="#bbb" stroke="black"/>
                <rect x="50" y="120" width="200" height="50" fill="#999" stroke="black"/>
                <line x1="50" y1="20" x2="50" y2="190" stroke="black" stroke-width="4"/>
            </svg>`;
    }
    return "";
  }
}

module.exports = PermutationsGenerator;
