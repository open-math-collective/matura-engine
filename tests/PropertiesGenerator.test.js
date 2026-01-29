const PropertiesGenerator = require("../src/engine/generators/functions/topics/quadratic/PropertiesGenerator");

console.log("Running test for PropertiesGenerator...");

function runTest() {
  try {
    const generator = new PropertiesGenerator("hard");
    const iterations = 1000;

    const methods = [
      "generateValueRangeProblem",
      "generateMonotonicityProblem",
      "generateMinMaxIntervalProblem",
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
          console.error("Problem:", JSON.stringify(problem, null, 2));
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

        const vars = problem.content.variables;
        let signature = qText;

        if (method === "generateValueRangeProblem") {
          signature = `${qText}|${vars?.q}|${vars?.a}`;
        } else if (method === "generateMonotonicityProblem") {
          signature = `${qText}|${vars?.p}|${vars?.type}|${vars?.a}`;
        } else if (method === "generateMinMaxIntervalProblem") {
          signature = `${qText}|${vars?.ans}`;
        }

        if (seen.has(signature)) {
        } else {
          seen.add(signature);
          uniqueCount++;
        }
      }

      console.log(
        `  - Unique problems generated: ${uniqueCount} / ${iterations}`,
      );

      const threshold = method === "generateValueRangeProblem" ? 0.93 : 0.95;
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
    console.error(e.stack);
    process.exit(1);
  }
}

runTest();
