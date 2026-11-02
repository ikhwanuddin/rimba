import { setBorderStyle, setFontStyle } from "@/lib/draw/styles";
import type { Position, SpectrogramWindow } from "@/lib/types";
import { scaleFreqToViewport, scaleTimeToViewport } from "@/lib/utils/geometry";

export function drawCursor(
  ctx: CanvasRenderingContext2D,
  position: Position,
  viewport: SpectrogramWindow,
  {
    buffer = 5,
  }: {
    buffer?: number;
  } = {},
) {
  if (position.time === 0 && position.freq === 0) return;
  const y = scaleFreqToViewport(position.freq, viewport, ctx.canvas.height);
  const x = scaleTimeToViewport(position.time, viewport, ctx.canvas.width);

  setBorderStyle(ctx, {
    borderColor: "white",
    borderWidth: 1,
    borderAlpha: 0.6,
    borderDash: [10, 5],
  });

  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(ctx.canvas.width, y);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, ctx.canvas.height);
  ctx.stroke();

  setFontStyle(ctx, {
    fontColor: "white",
    textBaseline: "bottom",
    fontSize: 13,
  });
  const label = `${(position.freq / 1000).toFixed(1)} kHz · ${position.time.toFixed(2)} s`;
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(0,0,0,0.75)";
  ctx.strokeText(label, x + buffer, y - buffer);
  ctx.fillText(label, x + buffer, y - buffer);
}
