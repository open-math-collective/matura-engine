const BaseGenerator = require("../../../core/BaseGenerator");
const MathUtils = require("../../../utils/MathUtils");
const TrigSVGUtils = require("./TrigSVGUtils");

class TrigWordProblemsGenerator extends BaseGenerator {
  generateWordLadder() {
    const d = MathUtils.randomInt(4, 10) * 2;
    const angle = MathUtils.randomElement([30, 45, 60]);
    let hStr;
    if (angle === 30) hStr = `${d / 2}`;
    else if (angle === 45) hStr = `${d / 2}\\sqrt{2}`;
    else hStr = `${d / 2}\\sqrt{3}`;

    return this.createResponse({
      question: `Drabina o długości $$${d}$$ m jest oparta o ścianę budynku pod kątem $$${angle}^\\circ$$ do podłoża. Na jaką wysokość sięga ta drabina?`,
      latex: ``,
      image: TrigSVGUtils.generateSVG({ type: "ladder", d, angle }),
      variables: { d, angle },
      correctAnswer: hStr,
      distractors: [`${d}`, `${d / 2}`, `${d / 2}\\sqrt{5}`],
      steps: [`$$h = d \\cdot \\sin ${angle}^\\circ$$`],
    });
  }

  generateWordShadow() {
    const base = MathUtils.randomInt(5, 15);
    const type = MathUtils.randomElement(["45", "30", "60"]);
    let h, s, angle;
    if (type === "45") {
      h = base;
      s = base;
      angle = 45;
    } else if (type === "30") {
      h = base;
      s = `${base}\\sqrt{3}`;
      angle = 30;
    } else {
      h = `${base}\\sqrt{3}`;
      s = base;
      angle = 60;
    }

    return this.createResponse({
      question: `Drzewo o wysokości $$${h}$$ m rzuca cień o długości $$${s}$$ m. Pod jakim kątem promienie słoneczne padają na ziemię?`,
      latex: ``,
      image: TrigSVGUtils.generateSVG({ type: "shadow", h, s }),
      variables: { h, s, angle },
      correctAnswer: `${angle}^\\circ`,
      distractors: [`30^\\circ`, `45^\\circ`, `60^\\circ`]
        .filter((x) => x !== `${angle}^\\circ`)
        .concat([`${90 - angle}^\\circ`]),
      steps: [`$$\\tg\\alpha = \\frac{h}{s}$$`],
    });
  }
}

module.exports = TrigWordProblemsGenerator;
