"""Way Canguk fork: build the logo files (bird singing three sound arcs under a blue sky,
MAARU-style bouncy condensed capitals). Text is converted to outlines so no font is
needed at run time. Font: Oswald (SIL Open Font License), fetched on demand.

    uv run -q --with fonttools python scripts/waycanguk/make_logo.py
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
    return "".join(out)


def wordmark(x=225, y=140, size=58):
    sub = text_paths(font(500), "ANOTASI SUARA", x + 2, y - size * 0.95, size * 0.36, S.INK, spacing=size * 0.12)
    big = text_paths(font(700), "WAY CANGUK", x, y, size, S.GREEN, spacing=3,
                     dys=[0, 8, -4, -4, 4, 6, -12, 10, -3, -5], rots=[0, -4, 3, 0, -3, 4, -3, 5, -4, 3])
    return sub + big


mark = f'{S.CLIP}<g clip-path="url(#c)">{S.mark()}</g>'
full = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 200">'
        f'{mark}{wordmark()}</svg>\n')
(OUT_PUBLIC / "waycanguk_logo.svg").write_text(full)
(OUT_PUBLIC / "waycanguk_icon.svg").write_text(S.svg(S.mark()))
(OUT_PUBLIC / "favicon.svg").write_text(S.svg(S.favicon_mark()))
(OUT_APP / "icon.svg").write_text(S.svg(S.favicon_mark()))
print("wrote logo, icon, favicon")
