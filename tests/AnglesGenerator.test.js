const AnglesGenerator = require("../src/engine/generators/geometry/topics/planimetry/AnglesGenerator");

console.log("Running test for AnglesGenerator...");

function runTest() {
  try {
    const generator = new AnglesGenerator("hard");
    const iterations = 1000;

    const methods = ["generateAnglesLines"];

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
          console.error("Problem:", JSON.stringify(problem, null, 2));
          process.exit(1);
        }

        const allAnswers = [cAnswer, ...dists];
        if (new Set(allAnswers).size !== 4) {
          console.error(
            `FAIL: Duplicate answers generated inside single problem in ${method}`,
          );
          console.error("Correct:", cAnswer);
          console.error("Distractors:", dists);
          process.exit(1);
        }

        const vars = problem.content.variables;
        let signature = qText;

        if (method === "generateAnglesLines") {
          signature = `${qText}|${vars?.alpha}|${vars?.mode}`;
        }

        if (seen.has(signature)) {
          // collision
        } else {
          seen.add(signature);
          uniqueCount++;
        }
      }

      console.log(
        `  - Unique problems generated: ${uniqueCount} / ${iterations}`,
      );

      if (uniqueCount < iterations * 0.95) {
        console.error(
          `FAIL: Too many collisions in ${method}. Expected >= 950 unique, got ${uniqueCount}.`,
        );
        process.exit(1);
      }
    }

    console.log("\nALL TESTS PASSED");
  } catch (e) {
    console.error("Test Crashed:", e);
    console.error(e.stack);
    process.exit(1);
  }
}

runTest();
