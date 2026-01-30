const LinesGenerator = require("../src/engine/generators/geometry/topics/analytic/LinesGenerator");

console.log("Running test for LinesGenerator...");

function runTest() {
  try {
    const generator = new LinesGenerator("hard");
    const iterations = 1000;

    const methods = [
      "generateLineThroughTwoPoints",
      "generateParallelLine",
      "generatePerpendicularLine",
      "generateParameterMProblem",
      "generateIntersectionProblem",
      "generateSlopeAngle",
      "generatePointOnLineParam",
      "generateIntersectionWithAxes",
      "generatePerpendicularCoeff",
      "generateBisector",
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
          console.error("Correct:", cAnswer);
          console.error("Distractors:", dists);
          process.exit(1);
        }

        const vars = problem.content.variables;
        let signature = qText;

        if (method === "generateLineThroughTwoPoints") {
          signature = `${qText}|${vars?.A?.x}|${vars?.A?.y}|${vars?.B?.x}|${vars?.B?.y}`;
        } else if (
          method === "generateParallelLine" ||
          method === "generatePerpendicularLine"
        ) {
          signature = `${qText}|${vars?.a2}|${vars?.b2}`;
        } else if (method === "generateParameterMProblem") {
          signature = `${qText}|${vars?.m}|${vars?.a1_coeff}|${vars?.a1_const}|${vars?.mode}`;
        } else if (method === "generateIntersectionProblem") {
          signature = `${qText}|${vars?.intX}|${vars?.intY}`;
        } else if (method === "generateSlopeAngle") {
          signature = `${qText}|${vars?.angle}|${vars?.b}`;
        } else if (method === "generatePointOnLineParam") {
          signature = `${qText}|${vars?.x}|${vars?.m_val}`;
        } else if (method === "generateIntersectionWithAxes") {
          signature = `${qText}|${vars?.axis}|${vars?.a}|${vars?.b}`;
        } else if (method === "generatePerpendicularCoeff") {
          signature = `${qText}|${cAnswer}`;
        } else if (method === "generateBisector") {
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

      let threshold = 0.95;
      if (method === "generateSlopeAngle") threshold = 0.80;
      else if (method === "generateIntersectionWithAxes") threshold = 0.90;
      else if (method === "generatePerpendicularCoeff") threshold = 0.50;
      else if (method === "generateBisector") threshold = 0.02;
      if (uniqueCount < iterations * threshold) {
        console.error(
          `FAIL: Too many collisions in ${method}. Expected >= ${iterations * threshold} unique, got ${uniqueCount}.`,
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
