# How to see GodCode, and how to push it live

Everything below is already set up in this project — Git history, build config, and host configs for
Netlify and Vercel. Pick the path that matches what you want to do.

---

## 1. See it right now (nothing to install)

The dev server is already running in this workspace. Open the **live preview** link shown next to
"GodCode app" in the Arena UI. It's the real app — create an account, generate your code, everything works.

Because it's mobile-first, narrow the browser window (or open it on your phone) to see the intended layout
with the bottom navigation.

> Accounts in this build are stored in your own browser, so the preview on your phone and the preview on
> your laptop will each have their own account. That's expected until a real backend is connected.

---

## 2. See it on your own machine

```bash
# download godcode-source.zip from the workspace, unzip it, then:
cd godcode
npm install
npm run dev
```

Open http://localhost:5173.

To check the production build locally:

```bash
npm run build
npm run preview
```

---

## 3. Just open the built files (no Node needed)

`godcode-site.zip` in the workspace is the compiled site. Unzip it and double-click `index.html` —
it runs straight from the filesystem (asset paths are relative). This is also the folder to drag onto any
static host.

---

## 4. Push it live

### Option A — Netlify Drop (fastest, ~30 seconds, no account setup)

1. Go to https://app.netlify.com/drop
2. Drag the **unzipped `godcode-site` folder** onto the page.
3. You get a public URL immediately. Rename it in Site settings → Domain management.

`netlify.toml` is included, so connecting the Git repo later works with zero config.

### Option B — Vercel (best for the Next.js/Stripe upgrade later)

```bash
npm i -g vercel
cd godcode
vercel          # preview deploy
vercel --prod   # production deploy
```

`vercel.json` already sets the build command, output directory, and SPA rewrites.

### Option C — GitHub, then auto-deploy

The project is already a Git repo with two commits. To push it:

```bash
cd godcode
git remote add origin https://github.com/<your-username>/godcode.git
git branch -M main
git push -u origin main
```

Then in Netlify or Vercel: **Add new site → Import from Git → pick the repo**. Build command `npm run build`,
publish directory `dist`. Every push to `main` redeploys automatically.

If you'd rather not use the command line, create an empty repo on github.com and use its
"upload files" button with the contents of `godcode-source.zip`.

### Option D — GitHub Pages

```bash
npm run build
npx gh-pages -d dist
```

Works without extra config because the build uses relative asset paths.

---

## 5. Before you put it in front of real users

Current build is a complete, working front end with a **local data layer** — accounts live in the visitor's
browser. That's fine for demos, feedback, and showing investors. Three things to do before a public launch:

| Need | What to do | Where |
| --- | --- | --- |
| Real accounts across devices | Swap the local store for Supabase / Postgres + server auth | `src/store.js` — one file, same API surface |
| Payments | Connect Stripe Checkout + webhook to flip `user.plan` | Profile screen upgrade button |
| Bible text licensing | Verse text here is a plain-English rendering. For a commercial launch, license a translation (ESV, NIV) or use a public-domain text (KJV, WEB) via a Bible API | `src/data/*.js` |

Also worth doing: a custom domain, a privacy policy (you collect names, birth dates, emails), and
favicon/app icons for the home-screen install experience.

---

## Files in the workspace

| File | What it is |
| --- | --- |
| `godcode/` | The full project — edit this |
| `godcode-source.zip` | Source code, no `node_modules` — for your machine or GitHub |
| `godcode-site.zip` | Compiled site — drag onto any static host |
| `godcode/README.md` | Feature list and architecture notes |
| `godcode/DEPLOY.md` | This file |
