const BaseGenerator = require("../../core/BaseGenerator");
const MathUtils = require("../../utils/MathUtils");

const SimpleRulesGenerator = require("./topics/SimpleRulesGenerator");
const PermutationsGenerator = require("./topics/PermutationsGenerator");
const CombinationsGenerator = require("./topics/CombinationsGenerator");

class CombinatoricsGenerator extends BaseGenerator {
  constructor(difficulty) {
    super(difficulty);
    this.simpleGen = new SimpleRulesGenerator(difficulty);
    this.permGen = new PermutationsGenerator(difficulty);
    this.combGen = new CombinationsGenerator(difficulty);
  }

  generate() {
    const variants = [
      "numbers_rule", // Liczby n-cyfrowe parzyste/podzielne
      "distinct_digits", // Liczby o różnych cyfrach
      "numbers_from_set", // Liczby z małego zbioru cyfr
      "numbers_sum_digits", // Liczby o sumie cyfr X
      "codes_mixed", // Kody (litery i cyfry)

      "queue_perm", // Kolejka (n!)
      "flag_coloring", // Flagi (wariacje)
      "seating_constraint", // Ustawienia z warunkiem

      "clothing_sets", // Zestawy ubrań/menu (mnożenie zbiorów)
      "handshakes", // Uściski dłoni (C(n,2))
      "team_selection", // Delegacja (C(n,3))
    ];

    const selectedVariant = MathUtils.randomElement(variants);

    switch (selectedVariant) {
      // PROSTE REGUŁY (LICZBY, KODY)
      case "numbers_rule":
        return this.simpleGen.generateNumbersRule();
      case "distinct_digits":
        return this.simpleGen.generateDistinctDigits();
      case "numbers_from_set":
        return this.simpleGen.generateNumbersFromSet();
      case "numbers_sum_digits":
        return this.simpleGen.generateSumOfDigits();
      case "codes_mixed":
        return this.simpleGen.generateMixedCodes();

      // PERMUTACJE I WARIACJE
      case "queue_perm":
        return this.permGen.generateQueueProblem();
      case "flag_coloring":
        return this.permGen.generateFlagProblem();
      case "seating_constraint":
        return this.permGen.generateSeatingConstraint();

      // KOMBINACJE I ZBIORY
      case "clothing_sets":
        return this.combGen.generateSetsProblem();
      case "handshakes":
        return this.combGen.generateHandshakesProblem();
      case "team_selection":
        return this.combGen.generateTeamSelection();

      default:
        return this.simpleGen.generateNumbersRule();
    }
  }
}

module.exports = CombinatoricsGenerator;
