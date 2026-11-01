"""Way Canguk fork: logo shapes (MAARU art style). Used by make_logo.py."""
import math, random

GREEN = "#2E6B3F"      # forest green (accent)
GREEN_D = "#1F4A2B"
SAGE = "#B9D7A6"       # light disc (MAARU peach disc, in green)
PEACH = "#FFBF81"      # MAARU orange, as a nod
INK = "#1A1A1A"
BLUE = "#3DA5F4"       # MAARU bird blue
BLUE_L = "#CFE6F5"

# songbird facing right, ~100x100 box
BIRD = ("M91 38 L80 35 C80 27 73 21.5 66 22 C58.5 22.5 54.5 28.5 53.5 35 "
        "C44 36 33 40 25 46 L7 52.5 L11 57 L26 55.5 C33 64.5 44 69 56 67.5 "
        "C70 65.5 78.5 55.5 79.5 42.5 Z")
BIRD_LEGS = "M55 66 L52 79 M62 65 L62 79"


def wave(x0, x1, y, xc, w, amp, f, seed, n=360):
    rnd = random.Random(seed)
    ph = rnd.random() * 6.28
    pts = []
    for i in range(n + 1):
        x = x0 + (x1 - x0) * i / n
        u = (x - xc) / w
        env = math.exp(-u * u) if u < 0 else math.exp(-u * u * 0.35)
        mod = 1 + 0.35 * math.sin(0.9 * (x - xc) + ph)
        pts.append((x, y - amp * env * mod * math.sin(2 * math.pi * f * (x - xc) + ph)))
    return "M" + " L".join(f"{a:.1f} {b:.1f}" for a, b in pts)


def bird(x, y, s, fill, rot=0, legs=True):
    t = f"translate({x} {y}) rotate({rot}) scale({s}) translate(-50 -45)"
    g = f'<g transform="{t}"><path d="{BIRD}" fill="{fill}"/>'
    if legs:
        g += f'<path d="{BIRD_LEGS}" stroke="{fill}" stroke-width="3" stroke-linecap="round" fill="none"/>'
    return g + "</g>"


def arcs(cx, cy, r0, n, step, a0, a1, color, sw, op=1.0):
    out = []
    for i in range(n):
        r = r0 + i * step
        p0 = (cx + r * math.cos(math.radians(a0)), cy + r * math.sin(math.radians(a0)))
        p1 = (cx + r * math.cos(math.radians(a1)), cy + r * math.sin(math.radians(a1)))
        out.append(f'<path d="M{p0[0]:.1f} {p0[1]:.1f} A{r} {r} 0 0 1 {p1[0]:.1f} {p1[1]:.1f}" '
                   f'stroke="{color}" stroke-width="{sw}" fill="none" stroke-linecap="round" opacity="{op}"/>')
    return "".join(out)


def hexagon(cx, cy, r, stroke, fill, dots):
    pts = [(cx + r * math.cos(math.radians(60 * k)), cy + r * math.sin(math.radians(60 * k))) for k in range(6)]
    d = "M" + " L".join(f"{a:.1f} {b:.1f}" for a, b in pts) + " Z"
    s = f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="5" stroke-linejoin="round"/>'
    for a, b in pts:
        s += f'<circle cx="{cx + (a - cx) * 0.62:.1f}" cy="{cy + (b - cy) * 0.62:.1f}" r="{r*0.11:.1f}" fill="{dots}"/>'
    return s


def word(x, y, color, size=58, bounce=True):
    # MAARU-style bouncy condensed capitals; the browser lays out glyph advances
    offs = [0, 8, -4, -4, 4, 6, -12, 10, -3, -5] if bounce else [0] * 10
    rots = [0, -4, 3, 0, -3, 4, -3, 5, -4, 3] if bounce else [0] * 10
    dy = " ".join(str(o) for o in offs)
    rot = " ".join(str(r) for r in rots)
    sub = (f'<text x="{x+2}" y="{y-size*0.95:.0f}" font-family="Oswald" font-weight="500" '
           f'font-size="{size*0.36:.0f}" letter-spacing="{size*0.12:.1f}" fill="{INK}">ANOTASI SUARA</text>')
    return sub + (f'<text x="{x}" y="{y}" dy="{dy}" rotate="{rot}" font-family="Oswald" font-weight="700" '
                  f'font-size="{size}" letter-spacing="3" fill="{color}">WAY CANGUK</text>')


def mark(i):
    """Mark variants in a 200x200 box; the fork uses variant 5 (bird singing a waveform)."""
    if i == 1:   # MAARU disc + delayed waveforms, bird perched on the last line
        s = f'<circle cx="100" cy="100" r="92" fill="{SAGE}"/>'
        for k, (y, xc) in enumerate([(64, 48), (100, 76), (136, 104)]):
            s += f'<path d="{wave(8, 192, y, xc, 14, 17, 0.11, k)}" stroke="{INK}" stroke-width="3" fill="none"/>'
        s += bird(158, 104, 0.72, GREEN)
        return s
    if i == 2:   # bird singing, white arcs as in the MAARU hero map
        s = f'<circle cx="100" cy="100" r="92" fill="{GREEN}"/>'
        s += arcs(92, 104, 30, 6, 11, -55, 55, "#FFFFFF", 5, 0.9)
        s += bird(70, 112, 0.95, SAGE)
        return s
    if i == 3:   # MAARU hexagon array hearing a bird, arcs between them
        s = f'<circle cx="100" cy="100" r="92" fill="{SAGE}"/>'
        s += arcs(150, 62, 22, 5, 13, 125, 205, GREEN, 4.5)
        s += hexagon(70, 128, 34, GREEN_D, "#FFFFFF", GREEN_D)
        s += f'<circle cx="150" cy="62" r="34" fill="{BLUE_L}"/>' + bird(150, 64, 0.52, BLUE)
        return s
    if i == 4:   # polar beam (directional amplification) pointing at a bird
        s = f'<circle cx="100" cy="100" r="92" fill="#FFFFFF" stroke="{GREEN}" stroke-width="8"/>'
        for r in (28, 52, 76):
            s += f'<circle cx="100" cy="100" r="{r}" fill="none" stroke="#C9D6C3" stroke-width="2"/>'
        for a in range(0, 180, 30):
            x, y = 84 * math.cos(math.radians(a)), 84 * math.sin(math.radians(a))
            s += f'<line x1="{100-x:.1f}" y1="{100-y:.1f}" x2="{100+x:.1f}" y2="{100+y:.1f}" stroke="#C9D6C3" stroke-width="2"/>'
        s += (f'<path d="M100 100 C118 60 150 40 166 50 C176 58 150 86 100 100 Z" fill="{PEACH}" '
              f'stroke="#8C2F10" stroke-width="3.5"/>')
        s += f'<ellipse cx="100" cy="100" rx="10" ry="16" transform="rotate(-30 100 100)" fill="none" stroke="#8C2F10" stroke-width="3"/>'
        s += f'<circle cx="152" cy="50" r="24" fill="{BLUE_L}"/>' + bird(153, 52, 0.38, BLUE)
        return s
    if i == 5:   # bird whose song is a waveform leaving the beak
        s = f'<circle cx="100" cy="100" r="92" fill="{SAGE}"/>'
        s += f'<path d="{wave(98, 192, 86, 140, 16, 20, 0.12, 7)}" stroke="{INK}" stroke-width="3" fill="none"/>'
        s += f'<path d="M14 147 Q60 140 104 146" stroke="#5B3A1E" stroke-width="5" fill="none" stroke-linecap="round"/>'
        s += bird(64, 108, 0.98, GREEN)
        return s


CLIP = '<defs><clipPath id="c"><circle cx="100" cy="100" r="96"/></clipPath></defs>'

NAMES = {1: "Cakram & gelombang tertunda", 2: "Burung bernyanyi, busur suara",
         3: "Larik heksagon MAARU", 4: "Pola beam ke burung", 5: "Kicau jadi gelombang"}


def logo_svg(i, h=200):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200" height="{h}">'
            f'{CLIP}<g clip-path="url(#c)">{mark(i)}</g><g>{word(225, 140, GREEN)}</g></svg>')


def mark_svg(i, size):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="{size}" height="{size}">{CLIP}<g clip-path="url(#c)">{mark(i)}</g></svg>'


