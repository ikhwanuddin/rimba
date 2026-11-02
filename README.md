# RIMBA

**Rainforest Identification and Monitoring through Bioacoustic Analysis**
*Mendengar rimba, mengenali penghuninya.*

RIMBA is a web app for checking and annotating sounds in rainforest recordings from Indonesia
and Southeast Asia: machines detect the sounds, people confirm them. Annotators get one clip
at a time from a shared queue and answer one question (is the sound in the box the species on
its label?) with Yes / No / Not sure. The interface is in Indonesian.

The first project is Way Canguk, Bukit Barisan Selatan National Park, Lampung, recorded with
MAARU multichannel recorders, part of a PhD at the Dyson School of Design Engineering, Imperial
College London, with the Wildlife Conservation Society – Indonesia Program.

## Built on Whombat

RIMBA is a modified version of [Whombat](https://github.com/mbsantiago/whombat) 0.9.0 by
Santiago Martínez Balvanera et al. (GPL-3.0). It keeps Whombat's database, API and
spectrogram tools and adds:

- a simple annotator page (Yes / No / Not sure, keys 1-3), with the answer stored as the clip tag `jawaban`;
- a shared clip queue with a 30 min lease (`POST /api/v1/annotation_tasks/claim/`, `.../answer/`) and a progress endpoint;
- a home dashboard (team progress, answers per day, finish estimate);
- an Indonesian interface, readable tag colours, a kHz frequency axis and admin-only menus.

If you use RIMBA in research, please also cite Whombat:

> Balvanera, S. M., Mac Aodha, O., Weldy, M. J., Pringle, H., Browning, E., & Jones, K. E. (2023).
> Whombat: An open-source annotation tool for machine learning development in bioacoustics.
> arXiv preprint [arXiv:2308.12688](https://arxiv.org/abs/2308.12688).

## Install and run

Each release has a wheel with the front end built in:

```bash
uv tool install --python 3.12 https://github.com/ikhwanuddin/rimba/releases/download/v0.1.0/rimba-0.1.0-py3-none-any.whl
RIMBA_DATA_DIR=~/rimba-data rimba
```

Settings live in `$RIMBA_DATA_DIR/settings.json`; every field can also be set with a `RIMBA_`
environment variable.

## Build

```bash
scripts/rimba/build.sh                                        # front end + wheel in dist/ (needs node and uv)
uv run -q --with fonttools python scripts/rimba/make_logo.py  # logo, icon, favicon
```

## Licence

GPL-3.0, as Whombat (see `LICENSE`). Whombat's original authors are listed in `back/AUTHORS.md`.
