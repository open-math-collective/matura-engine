const EquationsAndInequalitiesGenerator = require("../src/engine/generators/functions/topics/quadratic/EquationsAndInequalitiesGenerator");

console.log("Running test for EquationsAndInequalitiesGenerator...");

function runTest() {
  try {
    const generator = new EquationsAndInequalitiesGenerator("hard");
    const iterations = 1000;

    const methods = [
      "generateInequalityProblem",
      "generateSolutionsCountProblem",
      "generateVietaProblem",
      "generateFormulaFromVertexProblem",
      "generateCoeffsFromVertexProblem",
      "generateProductToGeneralProblem",
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

        const vars = problem.content.variables;
        let signature = qText;

        if (method === "generateInequalityProblem") {
          signature = `${qText}|${vars?.x1}|${vars?.x2}`;
        } else if (method === "generateSolutionsCountProblem") {
          signature = `${qText}|${vars?.q}`;
        } else if (method === "generateFormulaFromVertexProblem") {
          const match = cAnswer.match(/\((x\s*[-+]\s*\d+)\)\^2\s*([+-]\s*\d+)/);
          if (match) {
            signature = `${qText}|${match[1]}|${match[2]}`;
          }
        } else if (method === "generateCoeffsFromVertexProblem") {
          const match = cAnswer.match(/b=(-?\d+),\s*c=(-?\d+)/);
          if (match) {
            signature = `${qText}|${match[1]}|${match[2]}`;
          }
        } else if (method === "generateProductToGeneralProblem") {
          signature = `${qText}|${cAnswer}`;
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
