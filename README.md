# RIMBA

**Rainforest Identification and Monitoring through Bioacoustic Analysis**
*Mendengar rimba, mengenali penghuninya · Hear the forest, know who's calling.*

RIMBA is a web app for checking and annotating sounds in rainforest recordings from Indonesia
and Southeast Asia: machines detect the sounds, people confirm them. Annotators get one clip
at a time from a shared queue and answer one question (is the sound in the box the species on
its label?) with Yes / No / Not sure. The interface is in Indonesian and English: a saved choice
wins, otherwise visitors in Indonesia get Indonesian and everyone else English (country from
Cloudflare), with an ID | EN switch on every page.

The first project is the Way Canguk ground truth (Bukit Barisan Selatan National Park, Lampung),
recorded with MAARU multichannel recorders, part of a PhD at the Dyson School of Design
Engineering, Imperial College London, with the Wildlife Conservation Society – Indonesia
Program. That ground truth has two stages:

- **Full Annotation** (*Anotasi Penuh*): whole dawn recordings are listened to and every sound
  is boxed and labelled, without any model output. It gives the species list and the recall side.
- **Detection Validation** (*Validasi Deteksi*): BirdNET and Perch detections from mono and
  beamformed audio are checked clip by clip (Yes / No / Not sure). It gives precision per
  method and per score range. This is what RIMBA runs today.

Project names, descriptions and annotator instructions can hold both languages: Indonesian
first, then a line `=== EN ===`, then English. RIMBA shows the part for the interface language.

## Built on Whombat

RIMBA is a modified version of [Whombat](https://github.com/mbsantiago/whombat) 0.9.0 by
Santiago Martínez Balvanera et al. (GPL-3.0). It keeps Whombat's database, API and
spectrogram tools and adds:

- a simple annotator page (Yes / No / Not sure, keys 1-3), with the answer stored as the clip tag `jawaban`;
- a shared clip queue with a 30 min lease (`POST /api/v1/annotation_tasks/claim/`, `.../answer/`) and a progress endpoint;
- a home dashboard (team progress, answers per day, finish estimate);
- an Indonesian and English interface, readable tag colours, a kHz frequency axis and admin-only menus.

If you use RIMBA in research, please also cite Whombat:

> Balvanera, S. M., Mac Aodha, O., Weldy, M. J., Pringle, H., Browning, E., & Jones, K. E. (2023).
> Whombat: An open-source annotation tool for machine learning development in bioacoustics.
> arXiv preprint [arXiv:2308.12688](https://arxiv.org/abs/2308.12688).

### Compared with Whombat (Table 1 of the Whombat paper)

The Whombat paper compares seven annotation tools on 14 features (Table 1). RIMBA 0.3 against
the same list:

| Feature (Table 1) | Whombat 0.9.0 | RIMBA 0.3 |
|---|---|---|
| Open-source | ✓ | ✓ GPL-3.0 |
| Self-host | ✓ server, desktop bundles, Docker | ✓ server only (Python wheel); bundles and Docker removed |
| Collaborative | ✓ many users, each picks tasks | ✓ shared queue: each clip goes to one annotator, 30 min lease, team dashboard |
| Large datasets | ✓ | ✓ unchanged |
| Rich metadata | ✓ | ✓ admins only; annotators see the clip, not the metadata |
| Search capabilities | ✓ | ✓ admins only |
| Annotation exploration | ✓ gallery, histograms, scatter plots | hidden (code kept) |
| Flexible spectrogram | ✓ | admins: ✓; annotators: fixed 6 s viridis view with a kHz axis |
| Flexible annotations | ✓ points, intervals, boxes, key-value tags | admins: ✓; annotators: one answer per box (plus label change and note) |
| Quality assurance | ✓ notes, issues, review status | ✓ the same, plus a Not sure list for team discussion |
| Training tools | ✓ | hidden (code kept) |
| Prediction evaluation | ✓ model runs, metrics | hidden; precision is computed outside the app for now |
| Export annotations | ✓ AOEF JSON, CSV | ✓ unchanged |
| Integrated detectors | – | – BirdNET and Perch run outside (HPC), clips are imported |

Beyond Table 1, RIMBA adds the one-question annotator page, the clip lease with a check that
rejects answers to clips handed to someone else, the progress dashboard, the bilingual
interface, and a deployment recipe with email sign-in (Cloudflare Access) and daily backups.

## Roadmap

RIMBA grows with the research. Whombat features that are hidden now stay in the code and come
back when a project needs them.

1. **Now: Way Canguk Detection Validation.** Mono and beam clips shuffled in one queue; answers
   exported to compute precision per method and per score range.
2. **Full Annotation in RIMBA.** Whole dawn recordings annotated here too, starting from automatic
   candidate boxes, so both ground-truth stages live in one place.
3. **Answer quality.** A share of clips answered by two people (inter-annotator agreement), and Not
   sure clips discussed inside the app.
4. **Model evaluation.** Whombat's evaluation back on: import BirdNET and Perch detections,
   precision and recall per species, per-species score thresholds.
5. **Local species names.** Indonesian, scientific and BirdNET names matched in one species list
   per site.
6. **Multichannel and spatial audio.** Play each MAARU channel and beam, show direction of
   arrival, map the recording points.
7. **More sites and partners.** Projects for other forests in Indonesia and Southeast Asia, with
   admin roles per project.
8. **Annotator practice.** Practice sessions from verified clips for new team members.
9. **Open and citable.** Tagged releases with a DOI; export to AOEF, CSV and Raven selection tables.

## Install and run

Each release has a wheel with the front end built in:

```bash
uv tool install --python 3.12 https://github.com/ikhwanuddin/rimba/releases/download/v0.5.0/rimba-0.5.0-py3-none-any.whl
RIMBA_DATA_DIR=~/rimba-data rimba
```

Settings live in `$RIMBA_DATA_DIR/settings.json`; every field can also be set with a `RIMBA_`
environment variable.

## Build

```bash
scripts/rimba/build.sh                                        # front end + wheel in dist/ (needs node and uv)
uv run -q --with fonttools python scripts/rimba/make_logo.py  # logos (Indonesian and English tagline), icon, favicon
```

Interface texts are written in Indonesian in the code and wrapped in `t()`
(`front/src/lib/i18n.ts`); the English texts are in `front/src/lib/i18n_en.ts`.

## Contact

Rifqi Ikhwanuddin, ri322@ic.ac.uk.

## Licence

GPL-3.0, as Whombat (see `LICENSE`). Whombat's original authors are listed in `back/AUTHORS.md`.
