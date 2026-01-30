const VertexAndRootsGenerator = require("../src/engine/generators/functions/topics/quadratic/VertexAndRootsGenerator");

console.log("Running test for VertexAndRootsGenerator...");

function runTest() {
  try {
    const generator = new VertexAndRootsGenerator("hard");
    const iterations = 1000;

    const methods = [
      "generateVertexProblem",
      "generateRootsProblem",
      "generateCanonicalProblem",
      "generateSymmetryAxisProblem",
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
          console.error("Correct:", cAnswer);
          console.error("Distractors:", dists);
          console.error("Problem:", JSON.stringify(problem, null, 2));
          process.exit(1);
        }

        const vars = problem.content.variables;
        let signature = qText;

        if (method === "generateVertexProblem") {
          signature = `${qText}|${vars?.p}|${vars?.q}|${vars?.a}`;
        } else if (method === "generateRootsProblem") {
          signature = `${qText}|${vars?.x1}|${vars?.x2}`;
        } else if (method === "generateCanonicalProblem") {
          signature = `${qText}|${vars?.a}|${vars?.b}|${vars?.c}`;
        } else if (method === "generateSymmetryAxisProblem") {
          signature = `${qText}|${vars?.p}|${vars?.a}`;
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
