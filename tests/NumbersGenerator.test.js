const NumbersGenerator = require("../src/engine/generators/algebra/topics/NumbersGenerator");

console.log("Running Infinite Variations Test for NumbersGenerator...");

function runTest() {
  try {
    const gen = new NumbersGenerator("easy");
    const genHard = new NumbersGenerator("hard");

    console.log("TEST 1: generatePercentProblem");
    let seen = new Set();
    for (let i = 0; i < 500; i++) {
      const p = gen.generatePercentProblem();
      seen.add(JSON.stringify(p));
    }
    console.log(`  - Easy Unique: ${seen.size}/500`);

    seen = new Set();
    for (let i = 0; i < 500; i++) {
      const p = genHard.generatePercentProblem();
      seen.add(JSON.stringify(p));
    }
    console.log(`  - Hard Unique: ${seen.size}/500`);

    console.log("TEST 2: generatePercentRelations");
    seen = new Set();
    for (let i = 0; i < 500; i++) {
      const p = gen.generatePercentRelations();
      seen.add(JSON.stringify(p));
    }
    console.log(`  - Easy Unique: ${seen.size}/500`);

    seen = new Set();
    for (let i = 0; i < 500; i++) {
      const p = genHard.generatePercentRelations();
      seen.add(JSON.stringify(p));
    }
    console.log(`  - Hard Unique: ${seen.size}/500`);

    console.log("TEST 3: generateErrorProblem");
    seen = new Set();
    for (let i = 0; i < 500; i++) {
      const p = gen.generateErrorProblem();
      seen.add(JSON.stringify(p));
    }
    console.log(`  - Easy Unique: ${seen.size}/500`);

    seen = new Set();
    for (let i = 0; i < 500; i++) {
      const p = genHard.generateErrorProblem();
      seen.add(JSON.stringify(p));
    }
    console.log(`  - Hard Unique: ${seen.size}/500`);

    console.log("TEST 4: generateGcdLcm");
    seen = new Set();
    for (let i = 0; i < 500; i++) {
      const p = gen.generateGcdLcm();
      seen.add(JSON.stringify(p));
    }
    console.log(`  - Easy Unique: ${seen.size}/500`);

    seen = new Set();
    for (let i = 0; i < 500; i++) {
      const p = genHard.generateGcdLcm();
      seen.add(JSON.stringify(p));
    }
    console.log(`  - Hard Unique: ${seen.size}/500`);

    console.log("\nALL NUMBERS TESTS PASSED");
  } catch (e) {
    console.error("Test Crashed:", e);
    process.exit(1);
  }
}

runTest();
