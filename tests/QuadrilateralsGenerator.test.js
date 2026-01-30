const QuadrilateralsGenerator = require("../src/engine/generators/geometry/topics/planimetry/QuadrilateralsGenerator");

console.log("Running test for QuadrilateralsGenerator...");

function runTest() {
  try {
    const generator = new QuadrilateralsGenerator("hard");

    const methodConfigs = [
      { method: "generateRhombus", iterations: 1000, threshold: 0.9 },
      { method: "generateRhombusAngles", iterations: 200, threshold: 0.35 },
      {
        method: "generateParallelogramNeighbor",
        iterations: 200,
        threshold: 0.35,
      },
      { method: "generateTrapezoidArea", iterations: 1000, threshold: 0.9 },
      {
        method: "generateQuadrilateralAngles",
        iterations: 200,
        threshold: 0.35,
      },
      {
        method: "generateCyclicQuadrilateral",
        iterations: 400,
        threshold: 0.35,
      },
      {
        method: "generateTangentialQuadrilateral",
        iterations: 1000,
        threshold: 0.9,
      },
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

        if (method === "generateRhombus") {
          signature = `${vars?.d1}|${vars?.d2}`;
        } else if (method === "generateRhombusAngles") {
          signature = `${vars?.alpha}`;
        } else if (method === "generateParallelogramNeighbor") {
          signature = `${vars?.alpha}`;
        } else if (method === "generateTrapezoidArea") {
          signature = `${vars?.a}|${vars?.b}|${vars?.h}`;
        } else if (method === "generateQuadrilateralAngles") {
          signature = `${vars?.alpha}`;
        } else if (method === "generateCyclicQuadrilateral") {
          signature = `${vars?.alpha}`;
        } else if (method === "generateTangentialQuadrilateral") {
          signature = `${vars?.a}|${vars?.b}|${vars?.c}`;
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
