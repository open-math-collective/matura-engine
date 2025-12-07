class SVGUtils {
  static generateSVG({ a, b, c, p, q, x1, x2, highlight, inequalitySign }) {
    const size = 300;
    const center = size / 2;

    const pointsOfInterest = [Math.abs(p || 0), Math.abs(q || 0)];
    if (x1 !== undefined) pointsOfInterest.push(Math.abs(x1));
    if (x2 !== undefined) pointsOfInterest.push(Math.abs(x2));

    const maxVal = Math.max(...pointsOfInterest) + 2;
    let scale = (center - 20) / maxVal;

    if (scale > 40) scale = 40;
    if (scale < 10) scale = 10;

    let grid = "";
    let axisLabels = "";

    const unitsVisible = Math.floor(center / scale);

    let step = 1;
    if (unitsVisible > 12) step = 2;
    if (unitsVisible > 25) step = 5;

    for (let i = -unitsVisible; i <= unitsVisible; i += step) {
      if (i === 0) continue;

      const pos = i * scale;
      const screenX = center + pos;
      const screenY = center - pos;

      grid += `<line x1="${screenX}" y1="0" x2="${screenX}" y2="${size}" stroke="#f0f0f0" stroke-width="1" />`;
      grid += `<line x1="0" y1="${screenY}" x2="${size}" y2="${screenY}" stroke="#f0f0f0" stroke-width="1" />`;

      grid += `<line x1="${screenX}" y1="${center - 3}" x2="${screenX}" y2="${center + 3}" stroke="#666" stroke-width="1" />`;
      grid += `<line x1="${center - 3}" y1="${screenY}" x2="${center + 3}" y2="${screenY}" stroke="#666" stroke-width="1" />`;

      axisLabels += `<text x="${screenX}" y="${center + 15}" font-size="10" text-anchor="middle" fill="#666">${i}</text>`;
      axisLabels += `<text x="${center - 5}" y="${screenY + 3}" font-size="10" text-anchor="end" fill="#666">${i}</text>`;
    }

    const arrowSize = 6;
    const arrowX = `<path d="M ${size} ${center} L ${size - arrowSize} ${center - 3} L ${size - arrowSize} ${center + 3} Z" fill="#333" />`;
    const arrowY = `<path d="M ${center} 0 L ${center - 3} ${arrowSize} L ${center + 3} ${arrowSize} Z" fill="#333" />`;

    const axes = `
        <line x1="0" y1="${center}" x2="${size}" y2="${center}" stroke="#333" stroke-width="2" />
        <line x1="${center}" y1="0" x2="${center}" y2="${size}" stroke="#333" stroke-width="2" />
        ${arrowX} ${arrowY}
        <text x="${size - 15}" y="${center + 25}" font-weight="bold" font-size="12">x</text>
        <text x="${center + 15}" y="15" font-weight="bold" font-size="12">y</text>
        <text x="${center - 8}" y="${center + 15}" font-size="10" fill="#666">0</text>
    `;

    let pathData = "";
    const xLimit = unitsVisible + 2;
    for (let x = -xLimit; x <= xLimit; x += 0.1) {
      const y = a * x * x + b * x + c;

      const svgX = center + x * scale;
      const svgY = center - y * scale;

      if (svgY >= -size && svgY <= size * 2) {
        pathData += `${pathData ? "L" : "M"} ${svgX.toFixed(1)} ${svgY.toFixed(1)} `;
      }
    }

    let extras = "";

    if (highlight === "vertex") {
      const vx = center + p * scale;
      const vy = center - q * scale;
      extras += `<circle cx="${vx}" cy="${vy}" r="4" fill="red" />`;
      extras += `<line x1="${vx}" y1="${vy}" x2="${vx}" y2="${center}" stroke="#aaa" stroke-dasharray="4" />`;
      extras += `<line x1="${vx}" y1="${vy}" x2="${center}" y2="${vy}" stroke="#aaa" stroke-dasharray="4" />`;
    } else if (highlight === "roots" || highlight === "roots_axis") {
      if (x1 !== undefined)
        extras += `<circle cx="${center + x1 * scale}" cy="${center}" r="4" fill="red" />`;
      if (x2 !== undefined)
        extras += `<circle cx="${center + x2 * scale}" cy="${center}" r="4" fill="red" />`;

      if (highlight === "roots_axis") {
        const vx = center + p * scale;
        extras += `<line x1="${vx}" y1="0" x2="${vx}" y2="${size}" stroke="green" stroke-dasharray="4"/>`;
      }
    } else if (highlight === "axis") {
      const vx = center + p * scale;
      extras += `<line x1="${vx}" y1="0" x2="${vx}" y2="${size}" stroke="green" stroke-dasharray="4"/>`;
    } else if (highlight === "inequality") {
      const yAxis = center;
      const x1Pos = center + x1 * scale;
      const x2Pos = center + x2 * scale;
      const rangeColor = "rgba(0, 200, 0, 0.6)";

      const isParabolaUp = a > 0;
      const isSignGreater = inequalitySign.includes(">");

      // (!Up && Gr) || (Up && !Gr) -> inside
      const drawInside =
        (isParabolaUp && !isSignGreater) || (!isParabolaUp && isSignGreater);

      if (drawInside) {
        extras += `<line x1="${x1Pos}" y1="${yAxis}" x2="${x2Pos}" y2="${yAxis}" stroke="${rangeColor}" stroke-width="6" />`;
        extras += `<circle cx="${x1Pos}" cy="${yAxis}" r="4" fill="${rangeColor}" />`;
        extras += `<circle cx="${x2Pos}" cy="${yAxis}" r="4" fill="${rangeColor}" />`;
      } else {
        extras += `<line x1="0" y1="${yAxis}" x2="${x1Pos}" y2="${yAxis}" stroke="${rangeColor}" stroke-width="6" />`;
        extras += `<line x1="${x2Pos}" y1="${yAxis}" x2="${size}" y2="${yAxis}" stroke="${rangeColor}" stroke-width="6" />`;
        extras += `<circle cx="${x1Pos}" cy="${yAxis}" r="4" fill="${rangeColor}" />`;
        extras += `<circle cx="${x2Pos}" cy="${yAxis}" r="4" fill="${rangeColor}" />`;
      }
    }

    return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff">
        ${grid}
        ${axes}
        ${axisLabels}
        <path d="${pathData}" stroke="#007bff" stroke-width="2" fill="none" />
        ${extras}
    </svg>`;
  }
}

module.exports = SVGUtils;
