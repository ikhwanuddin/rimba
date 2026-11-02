"""Way Canguk fork: logo mark (MAARU art style). Used by make_logo.py.

A large songbird on a branch sings three thick sound arcs, turned 18 degrees upwards, under
a light-blue sky with two clouds and a curved green hill. Shapes are kept thick so the bird,
the arcs and the clouds still read at 32 px. favicon_mark() drops the branch and the legs
for the 16-32 px browser tab.
"""
import math

GREEN = "#2E6B3F"      # forest green (app accent), the bird
SAGE = "#B9D7A6"       # hill
SKY = "#CFE6F5"        # sky
INK = "#1A1A1A"        # sound arcs, small text
BRANCH = "#5B3A1E"
WHITE = "#FFFFFF"

# songbird facing right, ~100x100 box; beak a little longer and deeper than a plain
# wedge so it still reads at 36 px (tip at (94, 37)). beak() keeps (91, 38) as the
# anchor for the sound arcs.
BIRD = ("M94 37 L80 33.5 C80 27 73 21.5 66 22 C58.5 22.5 54.5 28.5 53.5 35 "
        "C44 36 33 40 25 46 L7 52.5 L11 57 L26 55.5 C33 64.5 44 69 56 67.5 "
        "C70 65.5 78.5 55.5 79.8 43 Z")
BIRD_LEGS = "M55 66 L52 79 M62 65 L62 79"

CLIP = '<defs><clipPath id="c"><circle cx="100" cy="100" r="96"/></clipPath></defs>'


def bird(x, y, s, legs=True):
    g = f'<g transform="translate({x} {y}) scale({s}) translate(-50 -45)"><path d="{BIRD}" fill="{GREEN}"/>'
    if legs:
        g += f'<path d="{BIRD_LEGS}" stroke="{GREEN}" stroke-width="5" stroke-linecap="round" fill="none"/>'
    return g + "</g>"


def beak(x, y, s):
    return x + s * 41, y - s * 7


def arcs(x, y, rot, sw, r0, step, ang=48):
    """Three sound arcs centred on (x, y), opening to the right, turned by rot degrees."""
    a = math.radians(ang)
    out = []
    for k in range(3):
        r = r0 + k * step
        x0, y0 = x + r * math.cos(a), y - r * math.sin(a)
        x1, y1 = x + r * math.cos(a), y + r * math.sin(a)
        out.append(f'<path d="M{x0:.1f} {y0:.1f} A{r} {r} 0 0 1 {x1:.1f} {y1:.1f}" stroke="{INK}" '
                   f'stroke-width="{sw}" fill="none" stroke-linecap="round"/>')
    return f'<g transform="rotate({rot} {x:.1f} {y:.1f})">' + "".join(out) + "</g>"


def cloud(x, y, k):
    """Flat-bottomed cartoon cloud, about 50k wide, bottom at y + 13k."""
    parts = [(0, 0, 13), (16, -8, 17), (34, -2, 14), (47, 4, 10)]
    s = "".join(f'<circle cx="{x + dx * k:.1f}" cy="{y + dy * k:.1f}" r="{r * k:.1f}" fill="{WHITE}"/>'
                for dx, dy, r in parts)
    return s + (f'<rect x="{x - 2 * k:.1f}" y="{y:.1f}" width="{50 * k:.1f}" height="{13 * k:.1f}" '
                f'rx="{6 * k:.1f}" fill="{WHITE}"/>')


def hill(y_edge, y_top):
    return f'<path d="M-10 {y_edge} Q100 {y_top} 210 {y_edge} L210 210 L-10 210 Z" fill="{SAGE}"/>'


def sky():
    return f'<circle cx="100" cy="100" r="96" fill="{SKY}"/>'


def mark():
    """Full mark in a 200x200 box (logo, top bar, login page)."""
    bx, by, s = 54, 118, 1.6
    x, y = beak(bx, by, s)
    return (sky() + hill(160, 128) + cloud(40, 54, 0.9) + cloud(116, 44, 0.7)
            + f'<path d="M-10 168 Q70 162 150 170" stroke="{BRANCH}" stroke-width="9" fill="none" stroke-linecap="round"/>'
            + bird(bx, by, s) + arcs(x + 5, y, -18, 10, 15, 15))


def favicon_mark():
    """Browser-tab mark: no branch, no legs, one cloud, thicker arcs."""
    bx, by, s = 58, 124, 1.5
    x, y = beak(bx, by, s)
    return (sky() + hill(166, 136) + cloud(60, 50, 1.0) + bird(bx, by, s, legs=False)
            + arcs(x + 6, y, -18, 12, 15, 18, 46))


def svg(body, view="0 0 200 200"):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}">{CLIP}<g clip-path="url(#c)">{body}</g></svg>\n'
