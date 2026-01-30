const CirclesGenerator = require("../src/engine/generators/geometry/topics/planimetry/CirclesGenerator");

console.log("Running test for CirclesGenerator...");

function runTest() {
  try {
    const generator = new CirclesGenerator("hard");

    const methodConfigs = [
      { method: "generateCircleAngles", iterations: 300, threshold: 0.5 },
      {
        method: "generateCircleAreaCircumference",
        iterations: 100,
        threshold: 0.2,
      },
      { method: "generateSectorArea", iterations: 50, threshold: 0.25 },
      { method: "generateArcLength", iterations: 40, threshold: 0.2 },
      { method: "generateThalesTheorem", iterations: 200, threshold: 0.25 },
      { method: "generateCircleTangent", iterations: 30, threshold: 0.2 },
    ];

    for (const { method, iterations, threshold } of methodConfigs) {
      console.log(
        `Testing method: ${method} (${iterations} iterations, ${(threshold * 100).toFixed(0)}% threshold)`,
      );
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
        let signature;

        if (method === "generateCircleAngles") {
          signature = `${vars?.alpha}|${vars?.mode}`;
        } else if (method === "generateCircleAreaCircumference") {
          signature = `${vars?.r}|${vars?.mode}`;
        } else if (method === "generateSectorArea") {
          signature = `${vars?.niceR}|${vars?.alpha}`;
        } else if (method === "generateArcLength") {
          signature = `${vars?.niceR}|${vars?.alpha}`;
        } else if (method === "generateThalesTheorem") {
          signature = `${vars?.alpha}`;
        } else if (method === "generateCircleTangent") {
          signature = `${vars?.r}|${vars?.x}|${vars?.d}|${vars?.mode}`;
        } else {
          signature = qText;
        }

        if (seen.has(signature)) {
          // collision
        } else {
          seen.add(signature);
          uniqueCount++;
        }
      }

      const required = Math.floor(iterations * threshold);
      console.log(
        `  - Unique problems generated: ${uniqueCount} / ${iterations} (required: ${required})`,
      );

      if (uniqueCount < required) {
        console.error(
          `FAIL: Too many collisions in ${method}. Expected >= ${required} unique, got ${uniqueCount}.`,
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
