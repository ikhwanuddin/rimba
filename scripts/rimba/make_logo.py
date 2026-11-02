"""RIMBA: build the logo files (the bird mark of logo_shapes.py, "RIMBA" in MAARU-style
bouncy condensed capitals, the tagline underneath, Indonesian or English). Text is converted to
outlines so no font is needed at run time. Font: Oswald (SIL Open Font License), fetched
on demand.

    uv run -q --with fonttools python scripts/rimba/make_logo.py
"""
import pathlib, sys, urllib.request

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

HERE = pathlib.Path(__file__).parent
sys.path.insert(0, str(HERE))
import logo_shapes as S  # noqa: E402

ROOT = HERE.parent.parent
OUT_PUBLIC = ROOT / "front" / "public"
OUT_APP = ROOT / "front" / "src" / "app"
# imported by the pages, so Next serves them under a content-hashed URL (no stale cache)
OUT_ASSETS = ROOT / "front" / "src" / "assets"
FONT_URL = "https://github.com/google/fonts/raw/main/ofl/oswald/Oswald%5Bwght%5D.ttf"
FONT = HERE / ".cache" / "Oswald.ttf"

if not FONT.exists():
    FONT.parent.mkdir(exist_ok=True)
    urllib.request.urlretrieve(FONT_URL, FONT)


def font(weight):
    f = TTFont(FONT)
    return instancer.instantiateVariableFont(f, {"wght": weight})


def text_paths(f, text, x, y, size, color, spacing=0.0, dys=None, rots=None):
    import math
    gs, cmap, hmtx = f.getGlyphSet(), f.getBestCmap(), f["hmtx"]
    upm = f["head"].unitsPerEm
    k = size / upm
    out, cy = [], y
    for i, ch in enumerate(text):
        g = cmap[ord(ch)]
        cy += (dys[i] if dys else 0)
        r = math.radians(rots[i] if rots else 0)
        c, s = math.cos(r), math.sin(r)
        # glyph space (y up) -> SVG (y down), scaled, rotated about the glyph origin
        t = (k * c, k * s, k * s, -k * c, x, cy)
        pen = SVGPathPen(gs)
        gs[g].draw(TransformPen(pen, t))
        d = pen.getCommands()
        if d:
            out.append(f'<path d="{d}" fill="{color}"/>')
        x += hmtx[g][0] * k + spacing
    return "".join(out), x


TAGLINES = {"": "Mendengar rimba, mengenali penghuninya", "_en": "Hear the forest, know who's calling"}


def wordmark(tagline, x=228, y=118, size=92):
    """'RIMBA' and the tagline; returns the SVG and the right edge."""
    big, x1 = text_paths(font(700), "RIMBA", x, y, size, S.GREEN, spacing=5,
                         dys=[0, 7, -5, 6, -4], rots=[-3, 3, -2, 4, -3])
    sub, x2 = text_paths(font(500), tagline, x + 3, y + 38, size * 0.215, S.INK, spacing=size * 0.012)
    # the site follows the system light/dark setting; an SVG shown with <img> sees the same
    # media query, so the words switch to light colours on a dark page
    style = ("<style>@media (prefers-color-scheme: dark)"
             "{.sub path{fill:#E7E5E4}.big path{fill:#93BF7E}}</style>")
    return f'{style}<g class="big">{big}</g><g class="sub">{sub}</g>', max(x1, x2)


mark = f'{S.CLIP}<g clip-path="url(#c)">{S.mark()}</g>'
# one logo per interface language: rimba_logo.svg (Indonesian tagline), rimba_logo_en.svg
for suffix, tagline in TAGLINES.items():
    words, right = wordmark(tagline)
    full = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {right + 12:.0f} 200">'
            f'{mark}{words}</svg>\n')
    (OUT_ASSETS / f"rimba_logo{suffix}.svg").write_text(full)
(OUT_ASSETS / "rimba_icon.svg").write_text(S.svg(S.mark()))
(OUT_PUBLIC / "favicon.svg").write_text(S.svg(S.favicon_mark()))
(OUT_APP / "icon.svg").write_text(S.svg(S.favicon_mark()))
print("wrote logo, icon, favicon")
