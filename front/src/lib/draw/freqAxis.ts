import {
  type AxisStyle,
  DEFAULT_AXIS_STYLE,
  MAYOR_TICK_STYLE,
  MINOR_TICK_STYLE,
  type TickStyle,
  setBorderStyle,
  setFontStyle,
} from "@/lib/draw/styles";
import { getTicks } from "@/lib/draw/timeAxis";
import type { Interval } from "@/lib/types";

function drawFreqTick(
  ctx: CanvasRenderingContext2D,
  y: number,
  {
    label,
    length = 10,
    width = 1,
    alpha = 1,
    color = "black",
  }: {
    label?: string;
  } & Partial<TickStyle> = {},
) {
  setBorderStyle(ctx, {
    borderColor: color,
    borderWidth: width,
    borderAlpha: alpha,
    borderDash: [],
  });
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(length, y);
  ctx.stroke();
  if (label != null && y > 14 && y < ctx.canvas.height - 8) {
    // RIMBA: horizontal labels with an outline, readable on any spectrogram
    setFontStyle(ctx, {
      fontColor: color,
      textBaseline: "middle",
      fontSize: 12,
    });
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(0,0,0,0.7)";
    ctx.strokeText(label, length + 3, y);
    ctx.fillText(label, length + 3, y);
  }
}

export default function drawTimeAxis(
  ctx: CanvasRenderingContext2D,
  interval: Interval,
  style: AxisStyle = DEFAULT_AXIS_STYLE,
) {
  const { canvas } = ctx;
  const { height } = canvas;
  const { min, max } = interval;
  const range = max - min;
  // RIMBA: a major tick every 0.5, 1, 2, 5 or 10 kHz, at least 40 px apart
  const mayorTickStep =
    [500, 1000, 2000, 5000, 10000, 20000].find(
      (step) => (height * step) / range >= 40,
    ) ?? 50000;
  const minorTickStep = mayorTickStep / 5;
  const mayorTicks = getTicks(interval, mayorTickStep);
  const minorTicks = getTicks(interval, minorTickStep);

  mayorTicks.forEach((freq) => {
    const y = (height * (max - freq)) / range;
    drawFreqTick(ctx, y, {
      label: `${parseFloat((freq / 1000).toFixed(1))} kHz`,
      ...style,
      ...MAYOR_TICK_STYLE,
    });
  });

  minorTicks.forEach((freq) => {
    const y = (height * (max - freq)) / range;
    drawFreqTick(ctx, y, { ...style, ...MINOR_TICK_STYLE });
  });
}
