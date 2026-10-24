#!/bin/sh
# Copy the current web app into www/ (what goes inside the APK).
# Usage: ./sync.sh [path-to-app]   (default: /mnt/project-files/app-botany)
set -e
SRC="${1:-/mnt/project-files/app-botany}"
cd "$(dirname "$0")"
rm -rf www && mkdir www
(cd "$SRC" && tar cf - --exclude='*.md' --exclude='papers' --exclude='index-dev.html' .) | tar xf - -C www
echo "www/ updated from $SRC: $(du -sh www | cut -f1)"
