"""Way Canguk fork: logo mark (MAARU art style). Used by make_logo.py.

A robin-like songbird sits in the middle with two thick sound arcs on each side,
under a dawn sky (peach to cream) with two clouds and a curved green hill. Shapes are kept thick so the bird,
the arcs and the clouds still read at 32 px. favicon_mark() drops the branch and the legs
for the 16-32 px browser tab.
"""
import math

GREEN = "#2E6B3F"      # forest green (app accent), the bird
SAGE = "#B9D7A6"       # hill
INK = "#1A1A1A"        # sound arcs, small text
BRANCH = "#5B3A1E"
WHITE = "#FFFFFF"

# robin-like songbird facing right, ~100x100 box: round head and breast, short sharp beak
# (tip at (92, 26)), long straight tail down to the lower left, thin legs, a cream eye
BIRD = ("M92 26 L85 23.3 C83 18 76 15 71 15.5 C64 16 60 20 57 25 C54 30 51 31 47 34 "
        "C38 41 30 50 20.5 63 C19.5 64.5 21 65 25.5 65.7 L9.5 80 C8.5 81.5 11 83.5 14 82.5 "
        "L36 67 C40 66 44 68.5 47 69.3 C52 70.5 60 70.5 63 70 C74 67 82 57 83 46 "
        "C83.5 41 82.5 37 83.5 34 L85.5 29.5 Z")
BIRD_LEGS = "M49.5 69.5 L55 79.5 L61 79.5 M56 69.5 L61.5 78 L67 78"
EYE = (77, 24.5, 2.2)
EYE_COLOUR = "#FBEBD8"

# dawn sky: warm peach at the top fading to cream (matches the warm greys of the site)
SKY_TOP, SKY_LOW = "#F9D3A8", "#FBEBD8"
CLIP = ('<defs><clipPath id="c"><circle cx="100" cy="100" r="96"/></clipPath>'
        f'<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{SKY_TOP}"/>'
        f'<stop offset="0.75" stop-color="{SKY_LOW}"/></linearGradient></defs>')


def bird(x, y, s, legs=True):
    g = (f'<g transform="translate({x} {y}) scale({s}) translate(-50 -45)"><path d="{BIRD}" fill="{GREEN}"/>'
         f'<circle cx="{EYE[0]}" cy="{EYE[1]}" r="{EYE[2]}" fill="{EYE_COLOUR}"/>')
    if legs:
        g += (f'<path d="{BIRD_LEGS}" stroke="{GREEN}" stroke-width="3" stroke-linecap="round" '
              f'stroke-linejoin="round" fill="none"/>')
    return g + "</g>"


def waves(cx, cy, r0, step, ang, sw):
    """Two sound arcs on each side of (cx, cy): ( ( bird ) )."""
    out = []
    for r in (r0, r0 + step):
        for a0, a1 in ((-ang, ang), (180 - ang, 180 + ang)):
            x0, y0 = cx + r * math.cos(math.radians(a0)), cy + r * math.sin(math.radians(a0))
            x1, y1 = cx + r * math.cos(math.radians(a1)), cy + r * math.sin(math.radians(a1))
            out.append(f'<path d="M{x0:.1f} {y0:.1f} A{r} {r} 0 0 1 {x1:.1f} {y1:.1f}" stroke="{INK}" '
                       f'stroke-width="{sw}" fill="none" stroke-linecap="round"/>')
    return "".join(out)


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
    return '<circle cx="100" cy="100" r="96" fill="url(#sky)"/>'


def mark():
    """Full mark in a 200x200 box (logo, top bar, login page): the bird in the middle on a
    branch, two sound arcs on each side."""
    s = 1.1
    bx, by = 94, 108 - s * 2.5          # body centred (the long tail pulls the box to the left)
    feet = by + s * 34.5
    return (sky() + hill(feet + 8, feet - 6) + cloud(52, 36, 0.6) + cloud(112, 28, 0.55)
            + f'<path d="M-10 {feet + 3:.0f} Q100 {feet - 5:.0f} 210 {feet + 3:.0f}" stroke="{BRANCH}" '
              f'stroke-width="8" fill="none" stroke-linecap="round"/>'
            + bird(bx, by, s) + waves(100, 104, 56, 18, 30, 10))


def favicon_mark():
    """Browser-tab mark: no branch, no legs, one cloud, thicker arcs."""
    s = 1.1
    bx, by = 94, 108 - s * 2.5
    feet = by + s * 34.5
    return (sky() + hill(feet + 8, feet - 6) + cloud(72, 30, 0.7) + bird(bx, by, s, legs=False)
            + waves(100, 104, 56, 20, 30, 12))


def svg(body, view="0 0 200 200"):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}">{CLIP}<g clip-path="url(#c)">{body}</g></svg>\n'
