#!/bin/bash
# Way Canguk fork: build the front end into the Python package and make a wheel in dist/.
# Usage: scripts/waycanguk/build.sh   (needs node/npm and uv)
set -euo pipefail
cd "$(dirname "$0")/../.."
(cd front && npm ci --no-audit --no-fund >/dev/null && npm run build >/dev/null)
rm -rf back/src/whombat/statics && mkdir back/src/whombat/statics
mv front/out/* back/src/whombat/statics/
rm -f dist/whombat-*.whl
(cd back && uv build --wheel -q -o ../dist)
ls dist/*.whl
