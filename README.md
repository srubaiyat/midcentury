# 50 Years of Mainul Islam

A static, self-contained archive site. No backend, no database, no build step.
Drop it in a repository, add the photographs, turn on GitHub Pages.

---

## 1. File structure

```
your-repo/
├── index.html      the page shell (hero, left rail, stream container)
├── style.css       all styling, including the cinematic vignette
├── data.js         ← ALL THE CONTENT. This is the only file you edit.
├── script.js       renders the page from data.js and runs the focus effect
├── README.md       this file
└── images/         ← you create this folder and put the photographs in it
    ├── the-classroom-door.png
    ├── friday-cake-dates.png
    └── ...
```

`data.js` holds every memory, every trivia question and every testimonial.
`script.js` builds the page from it. You never have to touch HTML to add a story.

---

## 2. Where the images go

Create a folder called exactly **`images`** at the top level of the repository,
next to `index.html`, and upload all 30 files into it. Filenames are
case-sensitive on GitHub Pages — `Genie.png` will not load if the code says
`genie.png`.

The full list, already wired up in `data.js`:

```
airport1.png                  favorite-perfume.png          the-absent-proposal.png
airport2.png                  first-married.jpg             the-classroom-door.png
career-path.jpeg              friday-cake-dates.png         the-coconut-trick.png
dress-for-me-and-munez1.png   genie.png                     the-digha-disaster.jpg
dress-for-me-and-munez2.png   ghatsila-disaster.webp        the-valentines-deception.png
favorite-flowers.jpeg         marriage-to-do-list.jpg       three-days-at-the-crease.png
favorite-hobby.png            me-back-off.png               three-friends-one-crush.png
favorite-ice-cream.jpg        mountain-lion.jpg             wild-fire.png
favorite-mocktail.png         number-of-weddings.png
                              reasonable.png
                              sixes-for-the-ladies.png
                              sleep-at-restaurant.png
                              sumadhu-rubaiyat.jpeg
```

`the-digha-disaster.jpg` is intentionally **not used** anywhere yet — no story
was provided for it. Upload it anyway; it's ready when you are.

Memories with no photograph render an elegant empty frame rather than a broken
image, so the site looks finished even before the rest of the pictures arrive.

---

## 3. Enabling GitHub Pages

1. Create a repository on GitHub and upload `index.html`, `style.css`,
   `data.js`, `script.js`, `README.md` and the `images/` folder.
2. Go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**.
4. Set the branch to **main** and the folder to **/ (root)**. Save.
5. Wait a minute, then open `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

Every asset path in this project is relative (`./images/...`, `./style.css`),
so the site works correctly from a repository subpath. Nothing needs changing.

To preview locally, just open `index.html` in a browser — it works from the file
system too.

---

## 4. Adding another memory later

Open `data.js`, find the `MEMORIES` list, and paste a new block anywhere inside
it. It will automatically be sorted into the right chapter and numbered.

**A normal memory with one photograph:**

```js
{
  category: "fatherhood",
  title: "The thing he did",
  text: "The story, in your voice, exactly how you'd tell it out loud.",
  images: ["./images/the-photo.png"]
},
```

**Two photographs shown together:**

```js
images: ["./images/one.png", "./images/two.png"]
```

**No photograph yet** — leave it empty and a frame is drawn instead:

```js
images: []
```

**Filling in a missing photograph.** Thirteen memories currently show an empty
frame. To give one a picture, upload the file to `images/`, find that memory in
`data.js`, and change its `images: []` line:

```js
images: []                              ← before
images: ["./images/everest.jpg"]        ← after
```

The thirteen waiting for photographs are: Everest, South Africa, The
cross-country road trip, Darjeeling, Las Vegas, Macau and Hong Kong, The Grand
Canyon (Travel), London, Portugal, The permanent third wheel, The Grand Canyon
(Fatherhood), The water cycle, and The dry-cleaning ritual.

Filenames must match exactly, including capitals and the extension —
`Everest.JPG` will not load if the code says `everest.jpg`. Any format a browser
can show works: `.jpg`, `.png`, `.jpeg`, `.webp`.

**A trivia question** (reveal-only):

```js
{
  category: "trivia", type: "quiz",
  question: "What is Papa's favorite ...?",
  answer: "The answer.",
  note: "An optional extra line of context.",
  images: ["./images/the-photo.png"]
},
```

**A multiple-choice trivia question** — `correctIndex: 0` means the first
option, `1` the second, and so on:

```js
{
  category: "trivia", type: "quiz",
  question: "Which one?",
  options: ["First", "Second", "Third"],
  correctIndex: 1,
  answer: "Second.",
  images: ["./images/the-photo.png"]
},
```

**A friend's testimonial:**

```js
{
  category: "friendship", type: "voice",
  who: "Name",
  quote: "What they said, word for word."
},
```

### The five category ids

| Use this id    | Chapter it appears in       |
|----------------|-----------------------------|
| `"prince"`     | Prince Charming Chronicles  |
| `"travel"`     | Travel Chronicles           |
| `"trivia"`     | Trivia                      |
| `"fatherhood"` | Fatherhood Chronicles       |
| `"friendship"` | Friendship Chronicles       |

### Optional extras on any memory

| Field     | What it does                                                 |
|-----------|--------------------------------------------------------------|
| `aside`   | A short italic wink in brass under the story                 |
| `alt`     | Description of the photo for screen readers                  |
| `pending` | `true` marks it as still being collected                     |

You can also edit the chapter names and one-line descriptions at the top of
`data.js` (`CATEGORIES`), the opening screen (`HERO`) and the closing note
(`CODA`).

Two small housekeeping notes: **London** and **Portugal** are marked
`pending: true` and are waiting for their stories, and **The Grand Canyon**
deliberately appears twice — once as a journey in Travel and once as a father
in Fatherhood. Delete either block if you'd rather it appear once.

---

## 5. Tuning how dark the page is

All the shadow settings live together at the top of `style.css`, in the block
marked `READABILITY DIALS`. Change a number, save, refresh — nothing else needs
touching.

```css
--gate: 26vh;          /* how deep the top/bottom shadow reaches      */
--gate-strength: .92;  /* how black that shadow gets (0 – 1)          */
--vignette: .55;       /* corner darkening (0 = none at all)          */
--dim: .20;            /* opacity of far-away memories (0 – 1)        */
--dim-bright: .62;     /* brightness of far-away memories (0 – 1)     */
--defocus-blur: 3px;   /* blur on far-away memories (0 = perfectly sharp) */
```

If a room full of relatives is squinting, try `--gate: 18vh`,
`--gate-strength: .8`, `--vignette: .3`, `--dim: .32`, `--dim-bright: .75`,
`--defocus-blur: 0`. To go the other way and make it more theatrical, push
`--gate` to `34vh` and `--dim` down to `.08`.

There is one more dial in `script.js`, near the top:

```js
var FOCUS_SPAN = 0.72;   // how much of the screen stays lit at once
```

Bigger keeps more of the page readable; smaller lights one memory at a time.

---

## 6. The page numbers

Every story, trivia question and testimonial carries a small brass number in its
top-right corner — `07 / 47`. It numbers itself, so if you add a memory
everything renumbers automatically.

The total is set in `script.js`:

```js
var PAGE_TOTAL = null;   // null = count them automatically
```

Set it to `50` if you'd rather every story read `07 / 50` regardless of how many
there actually are. (There are 47 right now — three more memories and it reaches
fifty on its own.)

---

## 7. How the effect works, briefly

`script.js` measures how close each memory is to the vertical centre of the
screen and writes a single number, `--f` (0 to 1), onto it. CSS uses that one
number for opacity, scale, brightness and blur, so only the centred memory is
lit. The black gradients at the top and bottom are a fixed viewport overlay
(`.filmgate`) that never scrolls — memories pass underneath it and dissolve.

Scrolling is ordinary native scrolling: mouse wheel, trackpad, touch, arrow
keys, Page Up/Down and Home/End all behave normally. Nothing is hijacked.
Clicking a chapter in the left rail jumps to it. `prefers-reduced-motion` turns
off the blur, scaling and animations while keeping the focus hierarchy intact.
