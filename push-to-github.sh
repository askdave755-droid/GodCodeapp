#!/usr/bin/env bash
# Usage: ./push-to-github.sh <your-github-username> [repo-name]
set -e
USER="${1:?Usage: ./push-to-github.sh <github-username> [repo-name]}"
REPO="${2:-godcode}"

git add -A
git diff --cached --quiet || git commit -m "Update GodCode"
git branch -M main
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$USER/$REPO.git"
git push -u origin main

echo
echo "Pushed to https://github.com/$USER/$REPO"
echo "Next: repo Settings -> Pages -> Source = 'GitHub Actions'."
echo "Your site will build automatically and appear at:"
echo "  https://$USER.github.io/$REPO/"
