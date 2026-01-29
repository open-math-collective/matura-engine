const SimpleRulesGenerator = require("../src/engine/generators/combinatorics/topics/SimpleRulesGenerator");

console.log("Running test for SimpleRulesGenerator...");

function runTest() {
  try {
    const generator = new SimpleRulesGenerator("hard");
    const iterations = 1000;

    const methods = [
      "generateNumbersRule",
      "generateDistinctDigits",
      "generateNumbersFromSet",
      "generateSumOfDigits",
      "generateMixedCodes",
    ];

    for (const method of methods) {
      console.log(`Testing method: ${method}`);
      let uniqueCount = 0;
      const seen = new Set();

      for (let i = 0; i < iterations; i++) {
        const problem = generator[method]();

        const qText = problem.content?.question_text;
        const cAnswer = problem.answers?.correct;
        const dists = problem.answers?.distractors;

        if (!qText || !cAnswer || !dists) {
          console.error(`FAIL: Invalid problem structure in ${method}`);
          console.error("Problem:", JSON.stringify(problem, null, 2));
          process.exit(1);
        }

        if (dists.length !== 3) {
          console.error(
            `FAIL: Invalid distractor count in ${method}: ${dists.length}`,
          );
          process.exit(1);
        }

        const allAnswers = [cAnswer, ...dists];
        if (new Set(allAnswers).size !== 4) {
          console.error(
            `FAIL: Duplicate answers generated inside single problem in ${method}`,
          );
          console.error(JSON.stringify(problem, null, 2));
          process.exit(1);
        }

        const signature = qText;
        if (seen.has(signature)) {
        } else {
          seen.add(signature);
          uniqueCount++;
        }
      }

      console.log(
        `  - Unique problems generated: ${uniqueCount} / ${iterations}`,
      );
      let threshold = 0.98;
      if (method === "generateSumOfDigits") threshold = 0.55;
      if (method === "generateMixedCodes") threshold = 0.93;
      if (uniqueCount < iterations * threshold) {
        console.error(
          `FAIL: Too many collisions in ${method}. Expected >= ${Math.floor(iterations * threshold)} unique, got ${uniqueCount}.`,
        );
        process.exit(1);
      }
    }

    console.log("\nALL TESTS PASSED");
  } catch (e) {
    console.error("Test Crashed:", e);
    process.exit(1);
  }
}

runTest();
