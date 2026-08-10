# Jerome Portfolio

Personal portfolio website for **Jerome Yat Hei Siu** — Cybersecurity MSc graduate (University of Birmingham) and Network Security & Systems Engineer with hands-on experience in penetration testing and IoT/RF reverse engineering.

Live pages:
- `index.html` — About Me + Projects
- `generic.html` — CV (embedded PDF viewer)

## Overview

The site is a static HTML/CSS/JS site based on the [Massively](https://html5up.net/massively) template by HTML5 UP, customized with:

- A dynamically rendered project grid (see `assets/js/projects.js`)
- Modal pop-ups with additional project details
- An embedded CV viewer (`assets/cv.pdf`)
- Links out to [GitHub](https://github.com/jeroomeehh) and [LinkedIn](https://uk.linkedin.com/in/jeromesiu)

## Project Structure

```
.
├── index.html              # Landing page (About Me, Projects)
├── generic.html             # CV page
├── assets/
│   ├── css/                 # Main + noscript stylesheets, Font Awesome
│   ├── js/
│   │   ├── projects.js      # Project data + dynamic rendering + modal logic
│   │   ├── main.js          # Template scripts (scrolling, breakpoints, etc.)
│   │   └── ...              # jQuery and template helper scripts
│   ├── sass/                # Source SCSS for the stylesheets
│   ├── webfonts/            # Font Awesome icon fonts
│   └── cv.pdf               # CV, embedded on generic.html
├── images/                   # Project screenshots, favicons, and media
└── LICENSE.txt               # Template license (HTML5 UP, CCA 3.0)
```

## Adding or Editing Projects

Projects are defined as data in `assets/js/projects.js` and rendered into `index.html` at runtime — no need to edit the HTML directly. Each entry supports:

| Field         | Description                                              |
|---------------|-----------------------------------------------------------|
| `title`       | Project name                                              |
| `githubLink`  | Link to the GitHub repo (makes the card clickable)         |
| `demoLink`    | Optional link to a live demo                               |
| `demoLabel`   | Optional label for the demo button (defaults to "Live Demo") |
| `modal`       | Optional ID of a modal (defined in `index.html`) for extra details |
| `description` | Short project summary shown on the card                    |

To add a new project, append an object to the `projectsData` array before the trailing `{ "dummy": true }` placeholder (used to keep the grid aligned when there's an odd number of projects).

## Running Locally

This is a static site with no build step. Serve the folder with any static file server, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## License

The underlying **Massively** template is by [HTML5 UP](https://html5up.net) (@ajlkn) and is free for personal and commercial use under the [CCA 3.0 license](https://html5up.net/license). See `LICENSE.txt` for details. Portfolio content, project write-ups, and images are © Jerome Yat Hei Siu.
