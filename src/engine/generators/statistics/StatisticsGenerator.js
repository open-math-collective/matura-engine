const BaseGenerator = require("../../core/BaseGenerator");
const MathUtils = require("../../utils/MathUtils");

class StatisticsGenerator extends BaseGenerator {
  generate() {
    const variants = [
      // STARE (5)
      "stats_basic", // Średnia/Mediana z listy liczb
      "stats_mode", // Dominanta
      "weighted_mean", // Średnia ważona
      "std_deviation", // Odchylenie standardowe
      "stats_chart", // Średnia z wykresu SVG

      // NOWE (5)
      "missing_number_mean", // 2, 4, x, 8 -> średnia 5. Oblicz x
      "median_with_param", // 1, 3, x, 7 -> mediana 4. Oblicz x
      "mean_after_adding", // Średnia n liczb to S. Dodajemy x...
      "frequency_table_mean", // Średnia z tabeli liczebności
      "std_dev_properties", // Teoria: zmiana odchylenia przy przesunięciu
    ];

    const selectedVariant = MathUtils.randomElement(variants);

    switch (selectedVariant) {
      // NOWE
      case "missing_number_mean":
        return this.generateMissingNumberMean();
      case "median_with_param":
        return this.generateMedianWithParam();
      case "mean_after_adding":
        return this.generateMeanAfterAdding();
      case "frequency_table_mean":
        return this.generateFrequencyTableMean();
      case "std_dev_properties":
        return this.generateStdDevProperties();

      // STARE
      case "stats_mode":
        return this.generateModeProblem();
      case "weighted_mean":
        return this.generateWeightedMeanProblem();
      case "std_deviation":
        return this.generateStdDevProblem();
      case "stats_chart":
        return this.generateChartMeanProblem();
      case "stats_basic":
      default:
        return this.generateBasicStatsProblem();
    }
  }

  // =================================================================
  // NOWE METODY (V3)
  // =================================================================

  // --- 1. BRAKUJĄCA LICZBA DO ŚREDNIEJ ---
  generateMissingNumberMean() {
    // Zestaw n-1 liczb znanych + x. Średnia zadana.
    const count = MathUtils.randomInt(4, 6);
    const known = [];
    for (let i = 0; i < count - 1; i++) known.push(MathUtils.randomInt(1, 10));

    const targetMean = MathUtils.randomInt(4, 8);
    // Suma wszystkich musi wynosić count * targetMean
    const targetSum = count * targetMean;
    const currentSum = known.reduce((a, b) => a + b, 0);
    const x = targetSum - currentSum;

    // Mieszamy x z known, żeby nie był zawsze na końcu
    const allNums = [...known, "x"];
    // Shuffle simple
    for (let i = allNums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allNums[i], allNums[j]] = [allNums[j], allNums[i]];
    }

    return this.createResponse({
      question: `Średnia arytmetyczna zestawu liczb: $$${allNums.join(", ")}$$ jest równa $$${targetMean}$$. Wtedy $$x$$ wynosi:`,
      latex: `\\bar{x}=${targetMean}`,
      image: null,
      variables: { known, targetMean, x },
      correctAnswer: `${x}`,
      distractors: [`${x + 1}`, `${x - 2}`, `${targetMean}`],
      steps: [
        `Wzór na średnią: $$\\frac{\\text{suma liczb}}{${count}} = ${targetMean}$$`,
        `Suma znanych liczb: $$${known.join("+")} = ${currentSum}$$`,
        `Równanie: $$\\frac{${currentSum} + x}{${count}} = ${targetMean}$$`,
        `$$${currentSum} + x = ${count} \\cdot ${targetMean} = ${targetSum}$$`,
        `$$x = ${targetSum} - ${currentSum} = ${x}$$`,
      ],
    });
  }

  // --- 2. MEDIANA Z PARAMETREM ---
  generateMedianWithParam() {
    // Zestaw 4 liczb (parzysta ilość): a, b, x, c. (uporządkowane a < b < c)
    // Mediana = (b+x)/2 = M.
    // x = 2M - b.
    const a = MathUtils.randomInt(1, 3);
    const b = a + MathUtils.randomInt(1, 3);
    const c = b + MathUtils.randomInt(4, 8);

    const M = b + MathUtils.randomInt(1, 2); // Mediana
    // x musi być <= c i >= b
    const x = 2 * M - b;

    // Prezentujemy liczby nieuporządkowane, ale z informacją że x jest jedną z największych?
    // Na maturze zazwyczaj podają uporządkowane rosnąco: "Zestaw uporządkowanych liczb: a, b, x, c".

    const setStr = `${a}, ${b}, x, ${c}`;

    return this.createResponse({
      question: `Dany jest zestaw liczb uporządkowanych rosnąco: $$${setStr}$$. Mediana tego zestawu jest równa $$${M}$$. Wtedy $$x$$ wynosi:`,
      latex: `M=${M}`,
      image: null,
      variables: { a, b, x, c, M },
      correctAnswer: `${x}`,
      distractors: [`${M}`, `${2 * M}`, `${b}`],
      steps: [
        `Liczb jest 4 (parzysta ilość). Mediana to średnia arytmetyczna dwóch środkowych wyrazów ($$${b}$$ i $$x$$).`,
        `$$M = \\frac{${b} + x}{2}$$`,
        `$$${M} = \\frac{${b} + x}{2}$$`,
        `$$${2 * M} = ${b} + x \\implies x = ${2 * M - b}$$`,
      ],
    });
  }

  // --- 3. ZMIANA ŚREDNIEJ PO DOPISANIU ---
  generateMeanAfterAdding() {
    // Średnia n liczb to S1. Po dopisaniu x średnia to S2.
    const n = MathUtils.randomInt(4, 8);
    const S1 = MathUtils.randomInt(5, 10);
    // Suma1 = n * S1
    const sum1 = n * S1;

    // Nowa średnia
    const S2 = S1 + 1; // wzrosła o 1
    // Suma2 = (n+1) * S2 = Suma1 + x
    const sum2 = (n + 1) * S2;
    const x = sum2 - sum1;

    return this.createResponse({
      question: `Średnia arytmetyczna zestawu $$${n}$$ liczb wynosi $$${S1}$$. Gdy do tego zestawu dopiszemy liczbę $$x$$, to średnia arytmetyczna wzrośnie do $$${S2}$$. Liczba $$x$$ jest równa:`,
      latex: ``,
      image: null,
      variables: { n, S1, S2, x },
      correctAnswer: `${x}`,
      distractors: [`${x - 1}`, `${S2}`, `${S1}`],
      steps: [
        `Suma $$${n}$$ liczb wynosi: $$S_{stara} = ${n} \\cdot ${S1} = ${sum1}$$`,
        `Po dopisaniu $$x$$ mamy $$${n + 1}$$ liczb, a średnia to $$${S2}$$.`,
        `Nowa suma: $$S_{nowa} = ${n + 1} \\cdot ${S2} = ${sum2}$$`,
        `$$x = S_{nowa} - S_{stara} = ${sum2} - ${sum1} = ${x}$$`,
      ],
    });
  }

  // --- 4. ŚREDNIA Z TABELI LICZEBNOŚCI ---
  generateFrequencyTableMean() {
    // Wartość: 1, 2, 3, 4
    // Liczebność: n1, n2, n3, n4
    const values = [1, 2, 3, 4];
    const counts = [];
    let sumVals = 0;
    let totalCount = 0;

    // Dobieramy tak, żeby średnia była ładna
    let attempts = 0;
    do {
      counts.length = 0;
      sumVals = 0;
      totalCount = 0;
      for (let v of values) {
        const c = MathUtils.randomInt(1, 5);
        counts.push(c);
        sumVals += v * c;
        totalCount += c;
      }
      attempts++;
    } while (
      (totalCount === 0 || ((sumVals / totalCount) * 10) % 5 !== 0) &&
      attempts < 50
    );

    const mean = sumVals / totalCount;

    // Tabela w markdown/latex
    // Wartość | 1 | 2 | 3 | 4
    // Liczebność| n1| n2| n3| n4

    const tableLatex = `
    \\begin{array}{|c|c|c|c|c|} \\hline
    \\text{Wartość} & 1 & 2 & 3 & 4 \\\\ \\hline
    \\text{Liczebność} & ${counts[0]} & ${counts[1]} & ${counts[2]} & ${counts[3]} \\\\ \\hline
    \\end{array}
    `;

    return this.createResponse({
      question:
        "Tabela przedstawia rozkład pewnych danych. Średnia arytmetyczna tych danych jest równa:",
      latex: tableLatex,
      image: null,
      variables: { counts, mean },
      correctAnswer: `${mean}`,
      distractors: [
        `${(mean + 0.5).toFixed(1)}`,
        `${(mean - 0.2).toFixed(1)}`,
        `${Math.floor(mean)}`,
      ],
      steps: [
        `Obliczamy średnią ważoną liczebnościami:`,
        `Licznik: $$1\\cdot${counts[0]} + 2\\cdot${counts[1]} + 3\\cdot${counts[2]} + 4\\cdot${counts[3]} = ${sumVals}$$`,
        `Mianownik (suma liczebności): $$${counts.join("+")} = ${totalCount}$$`,
        `Średnia: $$${sumVals} : ${totalCount} = ${mean}$$`,
      ],
    });
  }

  // --- 5. WŁASNOŚCI ODCHYLENIA (TEORIA) ---
  generateStdDevProperties() {
    // Pytanie o zmianę odchylenia przy przesunięciu zbioru (dodanie stałej).
    // Odchylenie się NIE zmienia.

    const addVal = MathUtils.randomInt(2, 10);
    const sigma = MathUtils.randomInt(2, 6);

    return this.createResponse({
      question: `Odchylenie standardowe zestawu danych jest równe $$${sigma}$$. Jeśli do każdej liczby z tego zestawu dodamy stałą wartość $$${addVal}$$, to odchylenie standardowe nowego zestawu będzie równe:`,
      latex: `\\sigma_{stare}=${sigma}`,
      image: null,
      variables: { sigma, addVal },
      correctAnswer: `${sigma}`,
      distractors: [
        `${sigma + addVal}`,
        `${sigma * addVal}`,
        `\\sqrt{${sigma * sigma} + ${addVal}}`,
      ],
      steps: [
        `Dodanie stałej wartości do wszystkich danych przesuwa je na osi, ale nie zmienia ich rozrzutu (odległości od średniej).`,
        `Średnia wzrośnie o $$${addVal}$$, ale odchylenie standardowe pozostanie bez zmian.`,
        `Odp: $$${sigma}$$`,
      ],
    });
  }

  // =================================================================
  // STARE METODY (BEZ ZMIAN)
  // =================================================================

  generateBasicStatsProblem() {
    const count = MathUtils.randomInt(6, 9);
    const numbers = [];
    for (let i = 0; i < count; i++) numbers.push(MathUtils.randomInt(1, 9));
    const mode = MathUtils.randomElement(["mean", "median"]);
    const sorted = [...numbers].sort((a, b) => a - b);
    const sum = numbers.reduce((a, b) => a + b, 0);

    let answer,
      steps = [];
    if (mode === "mean") {
      const mean = sum / count;
      const meanStr = Number.isInteger(mean)
        ? `${mean}`
        : `\\frac{${sum}}{${count}}`;
      answer = meanStr;
      steps = [
        `Suma: $$${sum}$$`,
        `Ilość: $$${count}$$`,
        `Średnia: $$${meanStr}$$`,
      ];
    } else {
      const mid = Math.floor(count / 2);
      let medVal;
      steps.push(`Porządkujemy: $$${sorted.join(", ")}$$`);
      if (count % 2 !== 0) {
        medVal = sorted[mid];
        steps.push(`Środkowy: $$${medVal}$$`);
      } else {
        medVal = (sorted[mid - 1] + sorted[mid]) / 2;
        steps.push(`Średnia środkowych: $$${medVal}$$`);
      }
      answer = `${medVal}`;
    }

    return this.createResponse({
      question: `Dany jest zestaw liczb: $$${numbers.join(", ")}$$. ${mode === "mean" ? "Średnia arytmetyczna" : "Mediana"} jest równa:`,
      latex: ``,
      image: null,
      variables: { numbers },
      correctAnswer: answer,
      distractors: [
        `${(sum / (count - 1)).toFixed(2)}`,
        `${sorted[0]}`,
        `${sorted[count - 1]}`,
      ],
      steps: steps,
    });
  }

  generateModeProblem() {
    const targetMode = MathUtils.randomInt(1, 9);
    const numbers = [targetMode, targetMode, targetMode];
    for (let i = 0; i < 5; i++) {
      let n;
      do {
        n = MathUtils.randomInt(1, 9);
      } while (n === targetMode);
      numbers.push(n);
    }
    // Shuffle
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return this.createResponse({
      question: `Dominanta zestawu: $$${numbers.join(", ")}$$ wynosi:`,
      latex: ``,
      image: null,
      variables: { targetMode },
      correctAnswer: `${targetMode}`,
      distractors: [`${numbers[0]}`, `5`, `0`],
      steps: [`Liczba $$${targetMode}$$ występuje najczęściej.`],
    });
  }

  generateWeightedMeanProblem() {
    const grades = [];
    let num = 0,
      den = 0;
    const c = 3;
    for (let i = 0; i < c; i++) {
      const g = MathUtils.randomInt(2, 5),
        w = MathUtils.randomInt(1, 3);
      grades.push({ g, w });
      num += g * w;
      den += w;
    }
    const mean = num / den;
    const meanStr = Number.isInteger(mean) ? `${mean}` : mean.toFixed(2);
    return this.createResponse({
      question: `Oceny z wagami: ${grades.map((x) => `${x.g} (waga ${x.w})`).join(", ")}. Średnia ważona:`,
      latex: ``,
      image: null,
      variables: { mean },
      correctAnswer: meanStr,
      distractors: [`${mean + 0.5}`, `${mean - 0.5}`, `${Math.floor(mean)}`],
      steps: [`Licznik: ${num}, Mianownik: ${den}, Wynik: ${meanStr}`],
    });
  }

  generateStdDevProblem() {
    const nums = [1, 3, 5, 7, 9];
    const mean = 5;
    const variance = 8; // simplified
    const stdDev = `\\sqrt{8}`; // 2sqrt(2)
    return this.createResponse({
      question: `Odchylenie standardowe liczb: 1, 3, 5, 7, 9 wynosi:`,
      latex: ``,
      image: null,
      variables: {},
      correctAnswer: `2\\sqrt{2}`,
      distractors: [`8`, `2`, `4`],
      steps: [`Średnia 5. Wariancja 8. Odchylenie sqrt(8).`],
    });
  }

  generateChartMeanProblem() {
    const data = [
      { grade: 1, count: 2 },
      { grade: 3, count: 4 },
      { grade: 5, count: 2 },
    ];
    const mean = (1 * 2 + 3 * 4 + 5 * 2) / 8; // 24/8 = 3
    return this.createResponse({
      question: "Średnia ocen z diagramu:",
      latex: ``,
      image: this.generateSVG({ type: "bar_chart", data }),
      variables: { mean },
      correctAnswer: `${mean}`,
      distractors: [`2.5`, `3.5`, `4`],
      steps: [`Suma: 24, Ilość: 8, Średnia: 3`],
    });
  }

  generateSVG(params) {
    if (params.type === "bar_chart") {
      const size = 300;
      const margin = 40;
      const maxCount = 4;
      const barW = (size - 2 * margin) / 7;
      const scaleY = (size - 2 * margin) / (maxCount + 1);
      let svg = `<line x1="${margin}" y1="${size - margin}" x2="${size - margin}" y2="${size - margin}" stroke="black" stroke-width="2" />`;
      svg += `<line x1="${margin}" y1="${margin}" x2="${margin}" y2="${size - margin}" stroke="black" stroke-width="2" />`;
      params.data.forEach((d) => {
        const x = margin + d.grade * barW;
        const h = d.count * scaleY;
        svg += `<rect x="${x - barW / 2 + 5}" y="${size - margin - h}" width="${barW - 10}" height="${h}" fill="#4a90e2" stroke="black" />`;
        svg += `<text x="${x}" y="${size - margin - h - 5}" text-anchor="middle" font-size="12">${d.count}</text>`;
        svg += `<text x="${x}" y="${size - margin + 20}" text-anchor="middle" font-size="14">${d.grade}</text>`;
      });
      return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff">${svg}</svg>`;
    }
    return "";
  }
}

module.exports = StatisticsGenerator;
