const MathUtils = require("../../../utils/MathUtils");

class EconomicOptimizationValues {
  /**
   * Get revenue problem scenarios with templates
   */
  static getRevenueScenarios() {
    return [
      {
        id: "electronics",
        subject: "słuchawek bezprzewodowych",
        unit: "zł",
        ranges: {
          easy: { price: [50, 100], sales: [20, 50] },
          medium: { price: [80, 150], sales: [40, 100] },
          hard: { price: [200, 400], sales: [100, 300] },
        },
        templates: [
          (price, sales, stepP, stepS, subject, unit) =>
            `Sklep z elektroniką sprzedaje dziennie ${sales} sztuk ${subject} w cenie ${price} ${unit} za sztukę. ` +
            `Badania rynku pokazały, że każda obniżka ceny o ${stepP} ${unit} powoduje wzrost sprzedaży o ${stepS} sztuk. ` +
            `Jaką cenę powinien ustalić sprzedawca, aby jego dzienny przychód był największy?`,
          (price, sales, stepP, stepS, subject, unit) =>
            `W sklepie RTV sprzedaje się ${sales} sztuk ${subject} dziennie po ${price} ${unit} za sztukę. ` +
            `Każda obniżka ceny o ${stepP} ${unit} zwiększa sprzedaż o ${stepS} egzemplarzy. ` +
            `Jaka cena zapewni maksymalny dzienny przychód?`,
          (price, sales, stepP, stepS, subject, unit) =>
            `Sprzedawca oferuje ${subject} w cenie ${price} ${unit}, sprzedając dziennie ${sales} sztuk. ` +
            `Wykazano, że obniżka o ${stepP} ${unit} przyciąga ${stepS} dodatkowych klientów. ` +
            `Jaką cenę ustalić dla maksymalnego przychodu?`,
          (price, sales, stepP, stepS, subject, unit) =>
            `Dziennie sprzedawanych jest ${sales} sztuk ${subject} po cenie ${price} ${unit}. ` +
            `Obniżka ceny o ${stepP} ${unit} zwiększa popyt o ${stepS} sztuk. ` +
            `Wyznacz cenę optymalną dla przychodu.`,
          (price, sales, stepP, stepS, subject, unit) =>
            `Firma sprzedaje ${sales} ${subject} dziennie w cenie ${price} ${unit}. ` +
            `Analiza pokazuje, że przy obniżce o ${stepP} ${unit} sprzedaż rośnie o ${stepS} sztuk. ` +
            `Oblicz optymalną cenę sprzedaży.`,
        ],
        answerTemplates: {
          optimal: (newPriceStr, unit) =>
            `Szukana cena: ${newPriceStr} ${unit}.`,
          reduction: (xStr, unit) => `Należy obniżyć cenę o ${xStr} ${unit}.`,
        },
      },
      {
        id: "hotel",
        subject: "pokoi",
        unit: "zł",
        ranges: {
          easy: { price: [100, 200], sales: [10, 30] },
          medium: { price: [180, 300], sales: [20, 50] },
          hard: { price: [300, 600], sales: [50, 100] },
        },
        templates: [
          (price, sales, stepP, stepS, subject, unit) =>
            `Właściciel hotelu zauważył, że przy cenie wynajmu wynoszącej ${price} ${unit} za dobę, zajętych jest ${sales} ${subject}. ` +
            `Każde obniżenie ceny o ${stepP} ${unit} sprawia, że wynajmowanych jest o ${stepS} pokoi więcej. ` +
            `Oblicz, przy jakiej cenie za dobę przychód hotelu będzie maksymalny.`,
          (price, sales, stepP, stepS, subject, unit) =>
            `Hotel oferuje ${subject} za ${price} ${unit} na dobę, zajętych jest ${sales} pokoi. ` +
            `Obniżka ceny o ${stepP} ${unit} przyciąga ${stepS} dodatkowych gości. ` +
            `Jaka cena zapewni maksymalny przychód?`,
          (price, sales, stepP, stepS, subject, unit) =>
            `Przy cenie ${price} ${unit} za dobę wynajmowanych jest ${sales} ${subject}. ` +
            `Każda obniżka o ${stepP} ${unit} zwiększa liczbę gości o ${stepS}. ` +
            `Wyznacz optymalną cenę wynajmu.`,
          (price, sales, stepP, stepS, subject, unit) =>
            `Właściciel wynajmuje ${sales} ${subject} po ${price} ${unit}. ` +
            `Zauważono, że obniżka o ${stepP} ${unit} daje ${stepS} rezerwacji więcej. ` +
            `Przy jakiej cenie przychód będzie największy?`,
          (price, sales, stepP, stepS, subject, unit) =>
            `W hotelu przy cenie ${price} ${unit} zajęte są ${sales} pokoje. ` +
            `Badanie wykazało, że obniżka o ${stepP} ${unit} przynosi ${stepS} nowych gości. ` +
            `Oblicz cenę dla maksymalnego przychodu.`,
        ],
        answerTemplates: {
          optimal: (newPriceStr, unit) =>
            `Szukana cena: ${newPriceStr} ${unit}.`,
        },
      },
      {
        id: "tutor",
        subject: "kurs online",
        unit: "zł",
        ranges: {
          easy: { price: [20, 50], sales: [50, 100] },
          medium: { price: [40, 90], sales: [100, 300] },
          hard: { price: [100, 200], sales: [200, 500] },
        },
        templates: [
          (price, sales, stepP, stepS, subject, unit) =>
            `Platforma edukacyjna oferuje ${subject} w cenie ${price} ${unit}. Obecnie z kursu korzysta ${sales} uczniów miesięcznie. ` +
            `Analiza wykazała, że każda obniżka ceny o ${stepP} ${unit} przyciągnie ${stepS} nowych uczniów. ` +
            `O ile ${unit} należy obniżyć cenę, aby miesięczny wpływ ze sprzedaży był największy?`,
          (price, sales, stepP, stepS, subject, unit) =>
            `Kurs online kosztuje ${price} ${unit}, zapisanych jest ${sales} uczniów. ` +
            `Każda obniżka o ${stepP} ${unit} przyciąga ${stepS} nowych studentów. ` +
            `Jaką kwotę należy obniżyć dla maksymalnego przychodu?`,
          (price, sales, stepP, stepS, subject, unit) =>
            `Platforma sprzedaje ${subject} za ${price} ${unit} miesięcznie do ${sales} uczniów. ` +
            `Promocja obniżająca cenę o ${stepP} ${unit} daje ${stepS} zapisów więcej. ` +
            `O ile złotych obniżyć cenę dla największego wpływu?`,
          (price, sales, stepP, stepS, subject, unit) =>
            `Miesięcznie ${sales} osób kupuje kurs za ${price} ${unit}. ` +
            `Obniżka o ${stepP} ${unit} zwiększa sprzedaż o ${stepS} sztuk. ` +
            `Wyznacz optymalną obniżkę ceny.`,
          (price, sales, stepP, stepS, subject, unit) =>
            `Kurs online ma ${sales} uczestników przy cenie ${price} ${unit}. ` +
            `Analiza: obniżka o ${stepP} ${unit} = ${stepS} nowych klientów. ` +
            `O ile obniżyć dla maksymalnego przychodu?`,
        ],
        answerTemplates: {
          reduction: (xStr, unit) => `Należy obniżyć cenę o ${xStr} ${unit}.`,
        },
      },
    ];
  }

  /**
   * Get density problem parameters
   */
  static getDensityParams(difficulty) {
    if (difficulty === "easy") {
      return {
        treeRange: [40, 60],
        lossList: [1, 2],
        targetXRange: [5, 12],
      };
    } else if (difficulty === "hard") {
      return {
        treeRange: [80, 150],
        lossList: [2, 3, 4, 5],
        targetXRange: [8, 20],
      };
    } else {
      return {
        treeRange: [50, 80],
        lossList: [1, 2, 3],
        targetXRange: [6, 15],
      };
    }
  }

  /**
   * Get density problem templates
   */
  static getDensityTemplates() {
    return [
      (fruits, trees, stepFruits, subject) =>
        `Sadownik zauważył, że jeśli posadzi ${trees} ${subject} na hektar, to z każdego zbierze średnio ${fruits} kg owoców. ` +
        `Każde dodatkowe posadzone drzewo (powyżej liczby ${trees}) powoduje zmniejszenie plonu z każdego drzewa o ${stepFruits} kg. ` +
        `Ile drzew należy dosadzić, aby łączny plon z sadu był największy?`,
      (fruits, trees, stepFruits, subject) =>
        `W sadzie przy ${trees} ${subject} na hektar plon wynosi ${fruits} kg z drzewa. ` +
        `Dosadzenie drzewa powyżej ${trees} zmniejsza plon o ${stepFruits} kg z każdego drzewa. ` +
        `Ile drzew dosadzić dla maksymalnego zbioru?`,
      (fruits, trees, stepFruits, subject) =>
        `Przy gęstości ${trees} ${subject} plon wynosi ${fruits} kg z drzewa. ` +
        `Każde dodatkowe drzewo zmniejsza plon o ${stepFruits} kg. ` +
        `Jaka liczba dosadzonych drzew da największy plon?`,
      (fruits, trees, stepFruits, subject) =>
        `Sadownik ustalił, że ${trees} ${subject} daje plon ${fruits} kg z drzewa. ` +
        `Zagęszczenie o jedno drzewo więcej obniża plon o ${stepFruits} kg. ` +
        `Oblicz ile drzew dosadzić dla maksymalnego plonu.`,
      (fruits, trees, stepFruits, subject) =>
        `Na hektarze rośnie ${trees} ${subject} z plonem ${fruits} kg z drzewa. ` +
        `Dodatkowe drzewo powyżej ${trees} obniża plon o ${stepFruits} kg. ` +
        `Wyznacz optymalną liczbę dosadzonych drzew.`,
    ];
  }

  /**
   * Generate distractors for revenue problem
   */
  static generateRevenueDistractors(correctAnswer, startPrice, unit) {
    const distractors = [
      `${Number(correctAnswer) + MathUtils.randomInt(3, 8)} ${unit}`,
      `${Math.max(1, Number(correctAnswer) - MathUtils.randomInt(5, 15))} ${unit}`,
      `${Math.max(1, Number(startPrice) - MathUtils.randomInt(5, 20))} ${unit}`,
    ];
    return distractors;
  }

  /**
   * Generate distractors for density problem
   */
  static generateDensityDistractors(targetX, startTrees) {
    return [
      `${targetX + MathUtils.randomInt(2, 6)} drzew`,
      `${Math.max(1, Math.floor(targetX / 2))} drzew`,
      `${Math.max(1, targetX * 2)} drzew`,
    ];
  }
}

module.exports = EconomicOptimizationValues;
