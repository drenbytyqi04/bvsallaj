"""Create WebP versions (full size + 480/800 px) next to every JPG in public/images.

Run after adding or replacing photos:  python3 scripts/optimize-images.py
The site picks the WebP files up automatically (lib/images.ts).
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "public" / "images"
WIDTHS = (480, 800)

for jpg in sorted(ROOT.rglob("*.jpg")):
    im = Image.open(jpg).convert("RGB")
    w, h = im.size
    targets = [(w, jpg.with_suffix(".webp"))] + [
        (tw, jpg.with_name(f"{jpg.stem}-{tw}.webp")) for tw in WIDTHS if tw < w
    ]
    for tw, out in targets:
        img = im if tw == w else im.resize((tw, round(h * tw / w)), Image.LANCZOS)
        img.save(out, "WEBP", quality=72, method=6)
    print(jpg.relative_to(ROOT), "->", ", ".join(o.name for _, o in targets))
