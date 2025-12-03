class PlanimetrySVGUtils {
  static generateSVG(params) {
    const size = 300;
    const center = size / 2;
    const drawPoly = (pts) =>
      `<polygon points="${pts.map((p) => `${p.x},${p.y}`).join(" ")}" stroke="black" stroke-width="2" fill="none" />`;
    const drawText = (x, y, txt, col = "black") =>
      `<text x="${x}" y="${y}" fill="${col}" font-size="14">${txt}</text>`;
    const drawLine = (x1, y1, x2, y2, col = "black", dash = false) =>
      `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width="2" ${dash ? 'stroke-dasharray="4"' : ""} />`;
    const drawCircle = (cx, cy, r, col = "black", fill = "none") =>
      `<circle cx="${cx}" cy="${cy}" r="${r}" stroke="${col}" stroke-width="2" fill="${fill}" />`;

    let content = "";

    if (params.type === "circle_angles") {
      const r = 80;
      const A = {
        x: center + r * Math.cos(2.1),
        y: center + r * Math.sin(2.1),
      };
      const B = {
        x: center + r * Math.cos(1.0),
        y: center + r * Math.sin(1.0),
      };
      const C = {
        x: center + r * Math.cos(-1.5),
        y: center + r * Math.sin(-1.5),
      };
      content += drawCircle(center, center, r);
      content += `<circle cx="${center}" cy="${center}" r="3" fill="black"/>`;
      content += drawLine(C.x, C.y, A.x, A.y, "blue");
      content += drawLine(C.x, C.y, B.x, B.y, "blue");
      content += drawLine(center, center, A.x, A.y, "red", true);
      content += drawLine(center, center, B.x, B.y, "red", true);
      content += drawText(C.x, C.y - 10, "α", "blue");
      content += drawText(center + 5, center + 20, "β", "red");
    } else if (params.type === "circle_tangent") {
      const scale = 15;
      const r = params.r * scale;
      const d = params.d * scale;
      const angle = Math.acos(params.r / params.d);
      const Sx = 50 + r * Math.cos(angle);
      const Sy = 150 - r * Math.sin(angle);
      content += drawCircle(50, 150, r);
      content += drawLine(50, 150, 50 + d, 150);
      content += drawLine(50, 150, Sx, Sy, "red");
      content += drawLine(50 + d, 150, Sx, Sy, "blue");
      content += drawText(40, 140, "r", "red");
      content += drawText(50 + d / 2, 170, "d");
      content += drawText(Sx + 10, Sy - 10, "x", "blue");
    } else if (params.type === "triangle_sas" || params.type === "isosceles") {
      const p1 = { x: 50, y: 250 };
      const p2 = { x: 250, y: 250 };
      let p3;
      if (params.type === "isosceles") {
        const h = 100 * Math.tan((params.baseAngle * Math.PI) / 180);
        p3 = { x: 150, y: 250 - Math.min(h, 200) };
        content += drawPoly([p1, p2, p3]);
        content += drawText(70, 240, "α");
        content += drawText(220, 240, "α");
      } else {
        const angleRad = (params.alpha * Math.PI) / 180;
        p3 = {
          x: 50 + 150 * Math.cos(angleRad),
          y: 250 - 150 * Math.sin(angleRad),
        };
        content += drawPoly([p1, p2, p3]);
        content += drawText(80, 240, `${params.alpha}°`);
      }
    } else if (params.type === "trapezoid" || params.type === "parallelogram") {
      if (params.h) {
        const scale = 15;
        const w1 = params.a * scale;
        const w2 = params.b * scale;
        const h = params.h * scale;
        const off = (w1 - w2) / 2;
        const x0 = 50;
        const y0 = 250;
        content += drawPoly([
          { x: x0, y: y0 },
          { x: x0 + w1, y: y0 },
          { x: x0 + w1 - off, y: y0 - h },
          { x: x0 + off, y: y0 - h },
        ]);
        content += drawLine(x0 + off, y0, x0 + off, y0 - h, "blue", true);
        content += drawText(x0 + off + 5, y0 - h / 2, `h`, "blue");
      } else {
        const h = 100;
        const w = 120;
        const shift = h / Math.tan((params.angle * Math.PI) / 180);
        const p1 = { x: 50, y: 200 };
        const p2 = { x: 50 + w, y: 200 };
        const p3 = {
          x: 50 + w + (params.type === "trapezoid" ? -shift : shift),
          y: 200 - h,
        };
        const p4 = { x: 50 + shift, y: 200 - h };
        content += drawPoly([p1, p2, p3, p4]);
        content += drawText(70, 190, `${params.angle}°`);
      }
    } else if (
      params.type === "right_triangle" ||
      params.type === "right_triangle_basic"
    ) {
      const scale = 12;
      const w = params.b * scale;
      const h = params.a * scale;
      const x0 = 50,
        y0 = 250;
      content += drawPoly([
        { x: x0, y: y0 },
        { x: x0 + w, y: y0 },
        { x: x0, y: y0 - h },
      ]);
      content += `<rect x="${x0}" y="${y0 - 15}" width="15" height="15" fill="none" stroke="black" />`;
      if (params.type === "right_triangle_basic" && params.missing) {
        if (params.missing !== "b")
          content += drawText(x0 + w / 2, y0 + 20, `b=${params.b}`);
        if (params.missing !== "a")
          content += drawText(x0 - 20, y0 - h / 2, `a=${params.a}`);
      }
    } else if (params.type === "rhombus" || params.type === "rhombus_angles") {
      const scale = 15;
      const dx = params.d2 ? (params.d2 * scale) / 2 : 100;
      const dy = params.d1 ? (params.d1 * scale) / 2 : 60;
      const p1 = { x: center, y: center - dy };
      const p2 = { x: center + dx, y: center };
      const p3 = { x: center, y: center + dy };
      const p4 = { x: center - dx, y: center };
      content += drawPoly([p1, p2, p3, p4]);
      content += drawLine(p1.x, p1.y, p3.x, p3.y, "red", true);
      content += drawLine(p2.x, p2.y, p4.x, p4.y, "blue", true);
      if (params.type === "rhombus_angles")
        content += drawText(center + 20, center - 10, `${params.alpha}°`);
    } else if (params.type === "similarity") {
      const h1 = 40,
        w1 = 30;
      const h2 = h1 * 1.5,
        w2 = w1 * 1.5;
      const drawTri = (x, y, w, h, label) =>
        `<polygon points="${x},${y} ${x + w},${y} ${x},${y - h}" stroke="black" fill="none" stroke-width="2"/><text x="${x + w / 3}" y="${y - h / 3}" font-size="12">${label}</text>`;
      content += drawTri(50, 200, w1, h1, "T1");
      content += drawTri(150, 200, w2, h2, "T2");
    } else if (params.type === "intersecting_lines") {
      content += drawLine(50, 50, 250, 250);
      content += drawLine(50, 250, 250, 50);
      content += drawText(140, 90, "α");
      content += drawText(140, params.mode === "vertical" ? 220 : 150, "β");
    } else if (params.type === "triangle_angles") {
      content += drawPoly([
        { x: 50, y: 250 },
        { x: 250, y: 250 },
        { x: 150, y: 100 },
      ]);
      content += drawText(70, 240, `${params.a}°`);
      content += drawText(210, 240, `${params.b}°`);
    } else if (params.type === "circle_r" || params.type === "sector") {
      const r = 80;
      content += drawCircle(center, center, r);
      content += `<circle cx="${center}" cy="${center}" r="3" fill="black"/>`;
      content += drawLine(center, center, center + r, center);
      if (params.type === "sector") {
        const rad = (-params.alpha * Math.PI) / 180;
        const x = center + r * Math.cos(rad);
        const y = center + r * Math.sin(rad);
        content += drawLine(center, center, x, y);
        content += `<path d="M ${center + 20} ${center} A 20 20 0 0 0 ${center + 20 * Math.cos(rad)} ${center + 20 * Math.sin(rad)}" stroke="black" fill="none"/>`;
      }
    } else if (params.type === "equilateral") {
      const a = 150;
      const h = (a * Math.sqrt(3)) / 2;
      content += drawPoly([
        { x: center - a / 2, y: 250 },
        { x: center + a / 2, y: 250 },
        { x: center, y: 250 - h },
      ]);
      content += drawLine(center, 250, center, 250 - h, "blue", true);
    } else if (params.type === "thales") {
      const r = 80;
      content += drawCircle(center, center, r);
      content += drawLine(center - r, center, center + r, center);
      const rad = -1.2;
      const cx = center + r * Math.cos(rad);
      const cy = center + r * Math.sin(rad);
      content += drawLine(center - r, center, cx, cy);
      content += drawLine(center + r, center, cx, cy);
    } else if (
      params.type === "cyclic_quad" ||
      params.type === "tangential_quad"
    ) {
      const r = 80;
      content += drawCircle(center, center, r);
      const pts = [0, 1.5, 3, 4.5].map((a) => ({
        x: center + r * Math.cos(a),
        y: center + r * Math.sin(a),
      }));
      content += drawPoly(pts);
    }

    return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="border:1px solid #ddd; background:#fff">${content}</svg>`;
  }
}

module.exports = PlanimetrySVGUtils;
