const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");

class TheoryStatsGenerator extends BaseGenerator {
  generateStdDevProperties() {
    let type;
    if (this.difficulty === "easy") {
      type = "add";
    } else {
      type = MathUtils.randomElement(["add", "multiply"]);
    }

    const sigma = MathUtils.randomInt(2, 6);

    if (type === "add") {
      const addVal = MathUtils.randomInt(2, 10);
      return this.createResponse({
        question: `Odchylenie standardowe zestawu danych jest równe $$${sigma}$$. Jeśli do każdej liczby z tego zestawu dodamy stałą wartość $$${addVal}$$, to odchylenie standardowe nowego zestawu będzie równe:`,
        latex: `\\sigma_{stare}=${sigma}`,
        image: null,
        variables: { sigma, addVal, type },
        correctAnswer: `${sigma}`,
        distractors: [
          `${sigma + addVal}`,
          `${sigma * addVal}`,
          `\\sqrt{${sigma * sigma} + ${addVal}}`,
        ],
        steps: [
          `Dodanie stałej wartości do wszystkich danych przesuwa je na osi, ale nie zmienia ich rozrzutu (odległości od średniej).`,
          `Zatem odchylenie standardowe pozostaje bez zmian: $$${sigma}$$`,
        ],
      });
    } else {
      const k = MathUtils.randomElement([-2, 2, 3]);
      const newSigma = sigma * Math.abs(k);

      return this.createResponse({
        question: `Odchylenie standardowe zestawu danych jest równe $$${sigma}$$. Jeśli każdą liczbę z tego zestawu pomnożymy przez $$${k}$$, to odchylenie standardowe nowego zestawu będzie równe:`,
        latex: `\\sigma_{stare}=${sigma}, k=${k}`,
        image: null,
        variables: { sigma, k, type },
        correctAnswer: `${newSigma}`,
        distractors: [
          `${sigma}`,
          `${sigma + Math.abs(k)}`,
          `${sigma * k * k}`,
        ],
        steps: [
          `Mnożenie wszystkich danych przez stałą $$k$$ zmienia odchylenie standardowe $$|k|$$ razy.`,
          `Nowe odchylenie: $$|${k}| \\cdot ${sigma} = ${Math.abs(k)} \\cdot ${sigma} = ${newSigma}$$`,
        ],
      });
    }
  }
}

module.exports = TheoryStatsGenerator;
