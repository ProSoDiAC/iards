# IARDS website

Static site for the International Workshop on Intelligent, Adaptive and Resilient Distributed Systems.
Plain HTML, CSS and a little vanilla JS. No framework, no build step, no external requests (fonts are self-hosted).

## Preview locally
```
python3 -m http.server 8000     # then open http://localhost:8000
```

## Before publishing: set the base URL (once)
Canonical, Open Graph, `sitemap.xml` and `robots.txt` use the placeholder `BASE_URL`.
Replace it with the public address, **no trailing slash**:
```
grep -rl BASE_URL . | xargs sed -i 's#BASE_URL#https://USER.github.io/iards#g'
```
(or `https://your-domain.org` once a custom domain is set). `404.html` also uses it in `<base href>`, so that
the 404 page finds its CSS and links at any depth. Until replaced, the 404 page looks unstyled locally.

## Deploy on GitHub Pages
1. Create a repository named `iards` (neutral name, so the URL survives future editions) and push this folder to `main`.
2. Settings → Pages → Build and deployment → **Deploy from a branch** → `main` / `/ (root)`.
3. `.nojekyll` is already included.
4. Custom domain later: rename `CNAME.example` to `CNAME`, put the domain inside it, and set it in Settings → Pages. Then update `BASE_URL`.

## Edit dates
`js/config.js` holds the dates used by the deadline bar, the countdown card and the timeline.
- `kind: "deadline"` expires at 23:59 AoE (UTC-12) of that day; `kind: "event"` starts at 00:00 UTC.
- `sample: true` shows a "[sample date]" label. Set it to `false` when the date is confirmed.
- The same dates also appear as plain text in the HTML (no-JavaScript fallback): update the first deadline in the bar of every page and the rows in `dates/index.html`.
  Quick check: `grep -rn "Mar 7, 2027" .`

## Edit content
Each page is a plain HTML file; the header, deadline bar and footer are repeated and must stay identical across the 7 files
(`index.html`, `404.html`, and one `index.html` in each of `call-for-papers/ dates/ program/ committee/ venue/`).
Placeholders still to fill are visible as `TBA` or `[BRACKETS]`:
`grep -rn "TBA\|\[" --include=*.html . | grep -v "<!--"`

## Changing edition or host conference
Every reference to ICCCN sits between `<!-- HOST-CONF:start -->` and `<!-- HOST-CONF:end -->` comments
(hero badge, footer, venue page, dates note, meta keywords). Find them with `grep -rn HOST-CONF .`.
Other mentions of ICCCN in plain text (home card, CFP intro, program label, titles) can be found with `grep -rni icccn .`.
No ICCCN or IEEE logos are used; IEEE sponsorship is text only.

## Fonts and licenses
Space Grotesk and IBM Plex Mono, SIL Open Font License (`assets/fonts/OFL-*.txt`).
Paper templates are not hosted here: the Author kit buttons link to IEEE's official template page.
