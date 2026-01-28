const LogarithmsGenerator = require("../src/engine/generators/algebra/topics/LogarithmsGenerator");

console.log("Running Infinite Variations Test for LogarithmsGenerator...");

function runTest() {
  try {
    const gen = new LogarithmsGenerator("easy");
    const genHard = new LogarithmsGenerator("hard");

    console.log("TEST 1: generateLogProblem");

    let seenEasy = new Set();
    for (let i = 0; i < 500; i++) {
      const p = gen.generateLogProblem();
      if (p.content.question_text.includes("NaN"))
        throw new Error("NaN in easy log");
      seenEasy.add(`${p.content.question_text}`);
    }
    console.log(`  - Easy Unique: ${seenEasy.size}/500`);

    let seenHard = new Set();
    for (let i = 0; i < 500; i++) {
      const p = genHard.generateLogProblem();
      if (p.content.question_text.includes("NaN"))
        throw new Error("NaN in hard log");
      seenHard.add(`${p.content.question_text}`);
    }
    console.log(`  - Hard Unique: ${seenHard.size}/500`);

    console.log("TEST 2: generateLogPowerRule");

    seenEasy = new Set();
    for (let i = 0; i < 500; i++) {
      const p = gen.generateLogPowerRule();
      seenEasy.add(JSON.stringify(p));
    }
    console.log(`  - Easy Unique: ${seenEasy.size}/500`);

    seenHard = new Set();
    for (let i = 0; i < 500; i++) {
      const p = genHard.generateLogPowerRule();
      seenHard.add(JSON.stringify(p));
    }
    console.log(`  - Hard Unique: ${seenHard.size}/500`);

    console.log("\nALL LOGARITHMS TESTS PASSED");
  } catch (e) {
    console.error("Test Crashed:", e);
    process.exit(1);
  }
}

runTest();
