const BaseGenerator = require("../../../../core/BaseGenerator");
const MathUtils = require("../../../../utils/MathUtils");
const VertexAndRootsValues = require("../../values/VertexAndRootsValues");

class VertexAndRootsGenerator extends BaseGenerator {
  generateVertexProblem() {
    const { a, b, c, p, q } = VertexAndRootsValues.generateVertexCoefficients(
      this.difficulty,
    );

    const formula = `f(x) = ${MathUtils.formatPolynomial(a, b, c)}`;

    const templates = VertexAndRootsValues.getVertexTemplates();
    const question = MathUtils.randomElement(templates)();

    const correctAnswer = `W(${p}, ${q})`;
    const distractors = VertexAndRootsValues.generateVertexDistractors(p, q, c);

    return this.createResponse({
      question: question,
      latex: formula,
      image: null,
      variables: { a, b, c, p, q },
      correctAnswer: correctAnswer,
      distractors: distractors,
      steps: [
        `$$p = \\frac{-b}{2a} = \\frac{${-b}}{${2 * a}} = ${p}$$`,
        `$$q = f(p) = ${q}$$`,
      ],
      questionType: "open",
      answerFormat: "W(x, y)",
    });
  }

  generateRootsProblem() {
    const { a, b, c, x1, x2, roots, p, q } =
      VertexAndRootsValues.generateRootsCoefficients(this.difficulty);

    const templates = VertexAndRootsValues.getRootsTemplates();
    const question = MathUtils.randomElement(templates)();

    const correctAnswer = `${roots[0]}, ${roots[1]}`;
    const distractors = VertexAndRootsValues.generateRootsDistractors(roots, c);

    return this.createResponse({
      question: question,
      latex: `f(x) = ${MathUtils.formatPolynomial(a, b, c)}`,
      image: null,
      variables: { a, b, c, x1, x2 },
      correctAnswer: correctAnswer,
      distractors: distractors,
      steps: [
        `$$\\Delta = b^2 - 4ac = ${b * b - 4 * a * c}$$`,
        `$$x_1 = ${roots[0]}, x_2 = ${roots[1]}$$`,
      ],
      questionType: "open",
      answerFormat: "x_1, x_2",
    });
  }

  generateCanonicalProblem() {
    const { a, b, c, p, q } =
      VertexAndRootsValues.generateCanonicalCoefficients(this.difficulty);

    const templates = VertexAndRootsValues.getCanonicalTemplates();
    const question = MathUtils.randomElement(templates)();

    const correctForm = VertexAndRootsValues.formatCanonical(a, p, q);
    const correctAnswer = `f(x) = ${correctForm}`;

    const distractors = VertexAndRootsValues.generateCanonicalDistractors(
      a,
      p,
      q,
      correctAnswer,
    );

    return this.createResponse({
      question: question,
      latex: `f(x) = ${MathUtils.formatPolynomial(a, b, c)}`,
      variables: { a, b, c },
      correctAnswer: correctAnswer,
      distractors: distractors,
      steps: [`$$p=${p}, q=${q}$$`, `$$f(x)=a(x-p)^2+q$$`],
      questionType: "open",
      answerFormat: "f(x) = ...",
    });
  }

  generateSymmetryAxisProblem() {
    const { a, b, c, p, q } =
      VertexAndRootsValues.generateSymmetryAxisCoefficients(this.difficulty);

    const templates = VertexAndRootsValues.getSymmetryAxisTemplates(a, b, c);
    const question = MathUtils.randomElement(templates)();

    const correctAnswer = `x = ${p}`;
    const distractors = VertexAndRootsValues.generateSymmetryAxisDistractors(
      p,
      b,
    );

    return this.createResponse({
      question: question,
      latex: null,
      image: null,
      variables: { a, b, c, p },
      correctAnswer: correctAnswer,
      distractors: distractors,
      steps: [`Oś symetrii przechodzi przez wierzchołek.`, `$$x = p = ${p}$$`],
      questionType: "closed",
    });
  }
}

module.exports = VertexAndRootsGenerator;
