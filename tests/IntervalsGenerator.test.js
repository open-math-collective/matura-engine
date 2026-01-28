const IntervalsGenerator = require("../src/engine/generators/algebra/topics/IntervalsGenerator");

console.log("Running Infinite Variations Test for IntervalsGenerator...");

function runTest() {
  try {
    console.log("TEST 1: Easy Mode Uniqueness (1000 iter)");
    const genEasy = new IntervalsGenerator("easy");
    let uniEasy = 0;
    let seenEasy = new Set();

    for (let i = 0; i < 1000; i++) {
      const p = genEasy.generateAbsValueProblem();
      const sig = `${p.content.question_text}|${JSON.stringify(p.content.variables)}|${p.answers.correct}`;
      if (!seenEasy.has(sig)) {
        seenEasy.add(sig);
        uniEasy++;
      }
    }
    console.log(`  - generateAbsValueProblem (Easy): ${uniEasy}/1000`);
    if (uniEasy < 990) throw new Error("Easy mode AbsValue uniqueness too low");

    seenEasy.clear();
    uniEasy = 0;
    for (let i = 0; i < 1000; i++) {
      const p = genEasy.generateIntervalOpsProblem();
      const sig = `${p.content.question_text}|${JSON.stringify(p.content.variables)}|${p.answers.correct}`;
      if (!seenEasy.has(sig)) {
        seenEasy.add(sig);
        uniEasy++;
      }
    }
    console.log(`  - generateIntervalOpsProblem (Easy): ${uniEasy}/1000`);
    if (uniEasy < 990)
      throw new Error("Easy mode IntervalOps uniqueness too low");

    console.log("\nTEST 2: Hard Mode Complexity Check");
    const genHard = new IntervalsGenerator("hard");
    const pHard = genHard.generateAbsValueProblem();

    if (
      !pHard.answers.correct.includes("\\frac") &&
      !pHard.content.variables.a.includes("\\frac") &&
      !pHard.content.variables.b.includes("\\frac")
    ) {
      console.warn(
        "WARN: Hard mode problem might not have fractions (could be random integers, or logic fail)",
      );
    } else {
      console.log("  - Fractions detected in hard mode output [OK]");
    }

    console.log("\nALL INTERVALS TESTS PASSED");
  } catch (e) {
    console.error("Test Crashed:", e);
    process.exit(1);
  }
}

runTest();
