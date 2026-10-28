#!/usr/bin/env bash
# Build a clean folder for Cloudflare Pages (no node_modules)
set -e
OUT=".cf-pages"
rm -rf "$OUT"
mkdir -p "$OUT"

# Copy site files only
for f in *.html *.js *.css *.svg *.png *.jpg *.jpeg *.webp *.ico *.toml *.json; do
  [ -e "$f" ] && cp -R "$f" "$OUT/" || true
done

[ -d images ] && cp -R images "$OUT/"
[ -d functions ] && cp -R functions "$OUT/"
[ -d supabase ] && cp -R supabase "$OUT/"

# Never ship these
rm -rf "$OUT/node_modules" "$OUT/.wrangler" "$OUT/.git" "$OUT/netlify" 2>/dev/null || true

echo "Pages output ready in $OUT"
ls -la "$OUT" | head -30
