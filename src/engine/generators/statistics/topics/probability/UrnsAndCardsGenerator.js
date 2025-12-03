const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");

class UrnsAndCardsGenerator extends BaseGenerator {
  generateUrnDynamic() {
    const b = MathUtils.randomInt(2, 6);
    const c = MathUtils.randomInt(2, 6);
    const n = MathUtils.randomInt(2, 6);
    const total = b + c + n;

    const type = MathUtils.randomElement(["white", "not_black"]);
    let favored = 0;
    let desc = "";

    if (type === "white") {
      favored = b;
      desc = "wylosowana kula będzie biała";
    } else {
      favored = b + n;
      desc = "wylosowana kula NIE będzie czarna";
    }

    const gcd = this.getGCD(favored, total);

    return this.createResponse({
      question: `W urnie znajduje się $$${b}$$ kul białych, $$${c}$$ czarnych i $$${n}$$ niebieskich. Losujemy jedną kulę. Oblicz prawdopodobieństwo, że ${desc}.`,
      latex: ``,
      image: null,
      variables: { b, c, n, total, favored },
      correctAnswer: `\\frac{${favored / gcd}}{${total / gcd}}`,
      distractors: [
        `\\frac{${c}}{${total}}`,
        `\\frac{1}{3}`,
        `\\frac{${b}}{${c + n}}`,
      ],
      steps: [
        `Razem kul: $$${total}$$`,
        `Sprzyjające: $$${favored}$$`,
        `$$P(A) = \\frac{${favored}}{${total}}$$`,
      ],
    });
  }

  generateDrawingWithoutReplacement() {
    const boys = MathUtils.randomInt(8, 15);
    const girls = MathUtils.randomInt(8, 15);
    const total = boys + girls;
    const omega = (total * (total - 1)) / 2;

    const type = MathUtils.randomElement(["two_girls", "mixed"]);
    let favored = 0;
    let desc = "";

    if (type === "two_girls") {
      desc = "wylosowane zostaną dwie dziewczyny";
      favored = (girls * (girls - 1)) / 2;
    } else {
      desc = "wylosowana zostanie jedna dziewczyna i jeden chłopiec";
      favored = girls * boys;
    }

    const gcd = this.getGCD(favored, omega);

    return this.createResponse({
      question: `W klasie jest $$${boys}$$ chłopców i $$${girls}$$ dziewcząt. Wybieramy losowo dwie osoby. Oblicz prawdopodobieństwo, że ${desc}.`,
      latex: ``,
      image: null,
      variables: { boys, girls, total, favored },
      correctAnswer: `\\frac{${favored / gcd}}{${omega / gcd}}`,
      distractors: [
        `\\frac{1}{2}`,
        `\\frac{${favored}}{${total * total}}`,
        `\\frac{${girls}}{${total}}`,
      ],
      steps: [
        `$$|\\Omega| = {${total} \\choose 2} = \\frac{${total} \\cdot ${total - 1}}{2} = ${omega}$$`,
        type === "two_girls"
          ? `$$|A| = {${girls} \\choose 2} = ${favored}$$`
          : `$$|A| = ${boys} \\cdot ${girls} = ${favored}$$`,
        `$$P(A) = \\frac{${favored}}{${omega}}$$`,
      ],
    });
  }

  generateCardsDynamic() {
    const omega = 52;
    const type = MathUtils.randomElement(["color", "face", "suit"]);
    let favored = 0;
    let desc = "";

    if (type === "color") {
      const color = MathUtils.randomElement(["czerwoną", "czarną"]);
      favored = 26;
      desc = `wylosowana karta będzie miała barwę ${color}`;
    } else if (type === "face") {
      favored = 16;
      desc = "wylosowana karta będzie figurą (J, Q, K, A)";
    } else {
      const suit = MathUtils.randomElement(["kierem", "karem"]);
      favored = 13;
      desc = `wylosowana karta będzie ${suit}`;
    }

    const gcd = this.getGCD(favored, omega);

    return this.createResponse({
      question: `Z talii 52 kart losujemy jedną. Prawdopodobieństwo, że ${desc}, wynosi:`,
      latex: ``,
      image: null,
      variables: { type, favored },
      correctAnswer: `\\frac{${favored / gcd}}{${omega / gcd}}`,
      distractors: [`\\frac{1}{52}`, `\\frac{1}{4}`, `\\frac{13}{52}`],
      steps: [
        `Liczba wszystkich kart: 52.`,
        `Liczba kart sprzyjających: $$${favored}$$.`,
        `$$P(A) = \\frac{${favored}}{52}$$`,
      ],
    });
  }

  getGCD(a, b) {
    return b ? this.getGCD(b, a % b) : a;
  }
}

module.exports = UrnsAndCardsGenerator;
