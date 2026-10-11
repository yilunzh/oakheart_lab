#!/bin/bash
# Re-copy the shared Oakheart skills (yilunzh/oakheart-skills, Claude Code build in dist/oakheart)
# into this repo's .claude/skills and .claude/agents. Project skills load in every Claude Code
# session, including cloud sessions; marketplace plugins declared in settings do not auto-install there.
# Usage: scripts/sync-oakheart-skills.sh [git ref, default main]
set -euo pipefail
ref="${1:-main}"
root="$(cd "$(dirname "$0")/.." && pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
git clone --quiet --depth 1 --branch "$ref" https://github.com/yilunzh/oakheart-skills "$tmp/src"
for dir in "$tmp"/src/dist/oakheart/skills/*/; do
  name="$(basename "$dir")"
  rm -rf "$root/.claude/skills/$name"
  cp -r "$dir" "$root/.claude/skills/$name"
done
mkdir -p "$root/.claude/agents"
cp "$tmp"/src/dist/oakheart/agents/*.md "$root/.claude/agents/"
commit="$(git -C "$tmp/src" rev-parse --short HEAD)"
version="$(cat "$tmp/src/VERSION")"
printf 'source: https://github.com/yilunzh/oakheart-skills (dist/oakheart)\nversion: %s\ncommit: %s\nskills: %s\nagents: %s\n' \
  "$version" "$commit" \
  "$(ls "$tmp"/src/dist/oakheart/skills | tr '\n' ' ')" \
  "$(ls "$tmp"/src/dist/oakheart/agents | tr '\n' ' ')" > "$root/.claude/oakheart-skills.lock"
echo "Synced oakheart-skills $version ($commit). Review with: git diff --stat .claude"
