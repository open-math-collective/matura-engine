const BaseGenerator = require("../../../core/BaseGenerator");
const MathUtils = require("../../../utils/MathUtils");
const CombinationsValues = require("../values/CombinationsValues");

class CombinationsGenerator extends BaseGenerator {
  generateSetsProblem() {
    const { nRange, categories, types, extraItemRange } =
      CombinationsValues.getSetsProblemParams(this.difficulty);

    const type = MathUtils.randomElement(types);
    const categoryCount = MathUtils.randomElement(categories);

    const values = [];
    for (let i = 0; i < categoryCount; i++) {
      values.push(MathUtils.randomInt(nRange[0], nRange[1]));
    }

    const total = values.reduce((acc, val) => acc * val, 1);

    const templateVars = {};
    for (let i = 0; i < categoryCount; i++) {
      templateVars[`n${i + 1}`] = values[i];
    }

    const template = CombinationsValues.getSetsProblemTemplates(
      type,
      categoryCount,
    );
    const q = template.replace(/\{n(\d+)\}/g, (match, num) => {
      return templateVars[`n${num}`] || match;
    });

    const sum = values.reduce((acc, val) => acc + val, 0);
    const distractors = [
      `${sum}`,
      `${total * 2}`,
      `${values[0] * values[1] + (values[2] || 0)}`,
    ];

    const multiplicationSteps = values.join(" \\cdot ");
    const steps = [
      `Reguła mnożenia: mnożymy liczby możliwości z każdej kategorii.`,
      `$$${multiplicationSteps} = ${total}$$`,
    ];

    return this.createResponse({
      question: q,
      latex: ``,
      image: null,
      variables: templateVars,
      correctAnswer: `${total}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `${total}`,
        distractors,
        () => {
          const offset = MathUtils.randomElement([-1, 1, -2, 2]);
          return `${total + offset}`;
        },
      ),
      steps: steps,
      questionType: "open",
      answerFormat: "number",
    });
  }

  generateHandshakesProblem() {
    const { nRange, types } = CombinationsValues.getHandshakesProblemParams(
      this.difficulty,
    );

    const n = MathUtils.randomInt(nRange[0], nRange[1]);
    const result = (n * (n - 1)) / 2;
    const type = MathUtils.randomElement(types);

    const q = CombinationsValues.getHandshakesTemplates(type, n);

    return this.createResponse({
      question: q,
      latex: null,
      image: null,
      variables: { n },
      correctAnswer: `${result}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `${result}`,
        [`${n * (n - 1)}`, `${n * 2}`, `${result + n}`],
        () => {
          const offset = MathUtils.randomElement([-1, 1, -2, 2, n]);
          return `${result + offset}`;
        },
      ),
      steps: [
        `Wzór na liczbę kombinacji 2-elementowych ze zbioru n-elementowego: $$\\frac{n(n-1)}{2}$$`,
        `$$\\frac{${n}\\cdot${n - 1}}{2} = \\frac{${n * (n - 1)}}{2} = ${result}$$`,
      ],
      questionType: "open",
      answerFormat: "number",
    });
  }

  generateTeamSelection() {
    const { nRange, kValues, groupDescriptions } =
      CombinationsValues.getTeamSelectionParams(this.difficulty);

    const kIndex = MathUtils.randomInt(0, kValues.length - 1);
    const k = kValues[kIndex];
    const total = MathUtils.randomInt(nRange[0], nRange[1]);

    let res;
    let stepsCalc;

    if (k === 2) {
      res = (total * (total - 1)) / 2;
      stepsCalc = `\\frac{${total} \\cdot ${total - 1}}{2} = ${res}`;
    } else if (k === 3) {
      res = (total * (total - 1) * (total - 2)) / 6;
      stepsCalc = `\\frac{${total} \\cdot ${total - 1} \\cdot ${total - 2}}{3 \\cdot 2 \\cdot 1} = \\frac{${total * (total - 1) * (total - 2)}}{6} = ${res}`;
    } else if (k === 4) {
      res = (total * (total - 1) * (total - 2) * (total - 3)) / 24;
      stepsCalc = `\\frac{${total} \\cdot ${total - 1} \\cdot ${total - 2} \\cdot ${total - 3}}{4 \\cdot 3 \\cdot 2 \\cdot 1} = ${res}`;
    } else if (k === 5) {
      res =
        (total * (total - 1) * (total - 2) * (total - 3) * (total - 4)) / 120;
      stepsCalc = `\\frac{${total} \\cdot ${total - 1} \\cdot ... \\cdot ${total - 4}}{5!} = ${res}`;
    } else if (k === 6) {
      res =
        (total *
          (total - 1) *
          (total - 2) *
          (total - 3) *
          (total - 4) *
          (total - 5)) /
        720;
      stepsCalc = `\\frac{${total} \\cdot ${total - 1} \\cdot ... \\cdot ${total - 5}}{6!} = ${res}`;
    }

    const q = CombinationsValues.getTeamSelectionTemplates(k, total);

    return this.createResponse({
      question: q,
      latex: null,
      image: null,
      variables: { total, k },
      correctAnswer: `${res}`,
      distractors: MathUtils.ensureUniqueDistractors(
        `${res}`,
        [
          k === 2
            ? `${total * (total - 1)}`
            : k === 3
              ? `${total * (total - 1) * (total - 2)}`
              : `${total * k * 10}`,
          `${total * k}`,
          `${res + total}`,
        ],
        () => {
          const offset = MathUtils.randomElement([-1, 1, -k, k, total]);
          return `${Math.abs(res + offset)}`;
        },
      ),
      steps: [
        `Kolejność wyboru nie ma znaczenia, stosujemy symbol Newtona (kombinacje) $${total} \\choose ${k}$$`,
        `$$${stepsCalc}$$`,
      ],
      questionType: "open",
      answerFormat: "number",
    });
  }
}

module.exports = CombinationsGenerator;
