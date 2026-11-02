#!/bin/bash
# RIMBA: build the front end into the Python package and make a wheel in dist/.
# Usage: scripts/rimba/build.sh   (needs node/npm and uv)
set -euo pipefail
cd "$(dirname "$0")/../.."
(cd front && { [ -d node_modules ] || npm ci --no-audit --no-fund >/dev/null; } && npm run build >/dev/null)
rm -rf back/src/rimba/statics && mkdir back/src/rimba/statics
mv front/out/* back/src/rimba/statics/
rm -f dist/rimba-*.whl
(cd back && uv build --wheel -q -o ../dist)
ls dist/*.whl
