/* ==========================================================================
   script.js — builds the site from data.js and runs the cinematic focus.
   You should not need to edit this file to add a memory. Edit data.js.
   ========================================================================== */

(function () {
  "use strict";

  document.body.classList.remove("no-js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---- TWO DIALS YOU MIGHT WANT ----------------------------------------
     PAGE_TOTAL: the number after the slash in the corner page number.
                 null = count the memories automatically (currently 47).
                 Set it to 50 if you want every story to read "07 / 50".
     FOCUS_SPAN: how far from the centre of the screen a memory can still be
                 lit, as a fraction of screen height. Bigger = more of the
                 page stays readable at once. 0.62 was the original.        */
  var PAGE_TOTAL = null;
  var FOCUS_SPAN = 0.72;

  /* SHOW_PLACEHOLDERS: what to do with a memory that has no photograph yet.
     false = show just the words, as a quiet typographic page (the default).
     true  = draw an empty brass frame reading "Photograph pending".        */
  var SHOW_PLACEHOLDERS = false;

  var stream    = document.getElementById("stream");
  var stage     = document.getElementById("stage");
  var railList  = document.getElementById("rail-list");
  var railFill  = document.getElementById("rail-fill");
  var railMeta  = document.getElementById("rail-meta");
  var heroEl    = document.getElementById("hero");

  var ROMAN = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];

  /* ---------------------------- tiny helpers ---------------------------- */

  function make(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function letter(i) { return String.fromCharCode(65 + i); }

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }


  /* -------------------------- opening + closing ------------------------- */

  if (typeof HERO === "object") {
    document.getElementById("hero-headline").textContent = HERO.headline;
    document.getElementById("hero-name").textContent     = HERO.name;
    document.getElementById("hero-years").textContent    = HERO.years;
    document.getElementById("enter-label").textContent   = HERO.invitation;
    document.title = HERO.headline + " " + HERO.name;
  }

  document.getElementById("hero-index").textContent =
    ROMAN[CATEGORIES.length - 1] + " chapters · " +
    MEMORIES.length + " memories · one extremely charming man";

  document.getElementById("coda-line").textContent = CODA.line;
  document.getElementById("coda-sign").textContent = CODA.sign;


  /* ------------------------------ the rail ------------------------------ */

  CATEGORIES.forEach(function (cat, i) {
    var li  = make("li", "rail__item");
    li.dataset.cat = cat.id;

    var btn = make("button", "rail__btn");
    btn.type = "button";
    btn.setAttribute("aria-label", "Go to " + cat.name);

    btn.appendChild(make("span", "rail__dot"));

    var name = make("span", "rail__name");
    name.textContent = window.innerWidth <= 900 ? cat.short : cat.name;
    name.dataset.long  = cat.name;
    name.dataset.short = cat.short;
    btn.appendChild(name);

    btn.appendChild(make("span", "rail__code", cat.code + " · " + pad(i + 1)));

    btn.addEventListener("click", function () {
      var target = document.getElementById("chapter-" + cat.id);
      if (!target) return;
      target.scrollIntoView({
        behavior: reduceMotion.matches ? "auto" : "smooth",
        block: "start"
      });
      target.focus({ preventScroll: true });
    });

    li.appendChild(btn);
    railList.appendChild(li);
  });

  var railItems = Array.prototype.slice.call(railList.children);

  function relabelRail() {
    var small = window.innerWidth <= 900;
    railItems.forEach(function (li) {
      var n = li.querySelector(".rail__name");
      n.textContent = small ? n.dataset.short : n.dataset.long;
    });
  }


  /* --------------------------- scene builders --------------------------- */

  var folioCount = 0;

  function folio() {
    folioCount += 1;
    var p = make("p", "folio",
      pad(folioCount) + " / " + pad(PAGE_TOTAL || MEMORIES.length));
    p.setAttribute("aria-hidden", "true");
    return p;
  }

  function scene(kind, catId) {
    var a = make("article", "scene " + kind);
    a.dataset.cat = catId;
    a.setAttribute("data-focus", "");
    a.tabIndex = -1;
    var body = make("div", "scene__body");
    a.appendChild(body);
    a._body = body;
    return a;
  }

  function chapterScene(cat, i) {
    var s = scene("chapter", cat.id);
    s.id = "chapter-" + cat.id;
    s.setAttribute("aria-label", cat.name);

    s._body.appendChild(make("p", "chapter__code",
      "Chapter " + ROMAN[i] + " · " + cat.code));

    var h = make("h2", "chapter__title", cat.name);
    s._body.appendChild(h);
    s._body.appendChild(make("span", "chapter__rule"));

    var blurb = make("p", "chapter__blurb reveal", cat.blurb);
    s._body.appendChild(blurb);
    return s;
  }

  function photoPlate(item) {
    var fig = make("figure", "memory__plate" +
      (item.images && item.images.length > 1 ? " memory__plate--pair" : ""));

    if (!item.images || item.images.length === 0) {
      if (!SHOW_PLACEHOLDERS) return null;      // no photo, no frame, no fuss
      var frame = make("div", "memory__frame");
      frame.appendChild(make("span", null,
        item.pending ? "Awaiting the story" : "Photograph pending"));
      fig.appendChild(frame);
      return fig;
    }

    item.images.forEach(function (src, i) {
      var img = new Image();
      img.src = src;
      img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", "async");
      img.alt = item.alt
        ? item.alt
        : (item.title || item.question || "Family photograph") +
          (item.images.length > 1 ? " (" + (i + 1) + " of " + item.images.length + ")" : "");
      fig.appendChild(img);
    });

    return fig;
  }

  function memoryScene(item, cat, code) {
    var s = scene("memory" + (item.pending ? " memory--pending" : ""), cat.id);

    s._body.appendChild(folio());

    var plate = photoPlate(item);
    if (plate) s._body.appendChild(plate);
    else s.classList.add("memory--textonly");

    var label = make("div", "memory__label reveal");
    label.appendChild(make("p", "memory__code", cat.code + " · " + code));
    label.appendChild(make("h3", "memory__title", item.title));
    if (item.text)  label.appendChild(make("p", "memory__text", item.text));
    if (item.aside) label.appendChild(make("p", "memory__aside", item.aside));
    s._body.appendChild(label);

    return s;
  }

  function voiceScene(item, cat, code) {
    var s = scene("memory voice", cat.id);

    s._body.appendChild(folio());

    var fig = make("figure");
    fig.style.margin = "0";

    var mark = make("span", "voice__mark", "\u201C");
    mark.setAttribute("aria-hidden", "true");
    fig.appendChild(mark);

    fig.appendChild(make("blockquote", "voice__quote", item.quote));

    var cap = make("figcaption", "voice__name reveal", item.who);
    fig.appendChild(cap);

    s._body.appendChild(fig);
    return s;
  }


  /* ------------------------------- trivia ------------------------------- */

  var quizState = [];   // one entry per multiple-choice question

  function quizScene(item, cat, code) {
    var s = scene("memory trivia", cat.id);

    s._body.appendChild(folio());

    var quiz = make("div", "quiz");
    quiz.appendChild(make("p", "quiz__code", cat.code + " · " + code));
    quiz.appendChild(make("h3", "quiz__q", item.question));

    var isMC = Array.isArray(item.options) && item.options.length > 0;
    var picked = -1;
    var slot = null;

    if (isMC) {
      slot = quizState.length;
      quizState.push({ correct: false, answered: false });
    }

    var optionBtns = [];

    if (isMC) {
      var ul = make("ul", "quiz__options");
      item.options.forEach(function (opt, i) {
        var li = make("li");
        var b  = make("button", "opt");
        b.type = "button";
        b.appendChild(make("span", "opt__key", letter(i)));
        b.appendChild(make("span", "opt__text", opt));
        b.addEventListener("click", function () {
          if (b.disabled) return;
          picked = i;
          optionBtns.forEach(function (o) { o.classList.remove("is-picked"); });
          b.classList.add("is-picked");
          revealBtn.disabled = false;
          hint.textContent = "Locked in. Now find out.";
        });
        optionBtns.push(b);
        li.appendChild(b);
        ul.appendChild(li);
      });
      quiz.appendChild(ul);
    }

    var actions = make("div", "quiz__actions");
    var revealBtn = make("button", "reveal-btn", "Reveal answer");
    revealBtn.type = "button";
    if (isMC) revealBtn.disabled = true;

    var hint = make("p", "quiz__hint",
      isMC ? "Pick one first." : "Say your guess out loud. Nobody's watching.");

    actions.appendChild(revealBtn);
    actions.appendChild(hint);
    quiz.appendChild(actions);

    var answer = make("div", "quiz__answer");
    answer.hidden = true;
    answer.setAttribute("aria-live", "polite");
    quiz.appendChild(answer);

    revealBtn.addEventListener("click", function () {
      if (answer.dataset.done) return;
      answer.dataset.done = "1";

      var right = isMC && picked === item.correctIndex;

      if (isMC) {
        optionBtns.forEach(function (o, i) {
          o.disabled = true;
          if (i === item.correctIndex) o.classList.add("is-right");
          else if (i === picked)       o.classList.add("is-wrong");
        });
        quizState[slot].answered = true;
        quizState[slot].correct  = right;
        updateScore();
      }

      var verdict = make("p", "quiz__verdict");
      if (isMC) {
        verdict.textContent = right ? "You know him" : "Not quite";
        if (!right) verdict.classList.add("is-miss");
      } else {
        verdict.textContent = "The answer";
        verdict.classList.add("is-plain");
      }
      answer.appendChild(verdict);

      answer.appendChild(make("p", "quiz__a", item.answer));
      if (item.note) answer.appendChild(make("p", "quiz__note", item.note));

      if (item.images && item.images.length) {
        var fig = make("figure", "quiz__img");
        item.images.forEach(function (src) {
          var img = new Image();
          img.src = src;
          img.setAttribute("loading", "lazy");
          img.setAttribute("decoding", "async");
          img.alt = item.alt || item.question;
          fig.appendChild(img);
        });
        answer.appendChild(fig);
      }

      answer.hidden = false;
      revealBtn.disabled = true;
      revealBtn.textContent = "Revealed";
      hint.textContent = "";

      celebrate(quiz, right || !isMC ? 10 : 5);
      requestUpdate();
    });

    s._body.appendChild(quiz);
    return s;
  }

  function celebrate(host, count) {
    if (reduceMotion.matches) return;
    var box = make("div", "spark");
    for (var i = 0; i < count; i++) {
      var dot = make("i");
      var ang = Math.random() * Math.PI * 2;
      var dist = 40 + Math.random() * 90;
      dot.style.left = (30 + Math.random() * 40) + "%";
      dot.style.top  = (52 + Math.random() * 16) + "%";
      dot.style.setProperty("--dx", Math.cos(ang) * dist + "px");
      dot.style.setProperty("--dy", (Math.sin(ang) * dist - 30) + "px");
      dot.style.animationDelay = (Math.random() * 160) + "ms";
      box.appendChild(dot);
    }
    host.appendChild(box);
    setTimeout(function () { box.remove(); }, 1600);
  }

  var scoreLine, scoreMeta;

  function scorecardScene(cat) {
    var s = scene("memory scorecard", cat.id);
    s._body.appendChild(make("p", "chapter__code", cat.code + " · Scorecard"));
    s._body.appendChild(make("h3", "score__title", "So — how well do you know him?"));
    scoreLine = make("p", "score__line reveal");
    scoreMeta = make("p", "score__meta reveal");
    s._body.appendChild(scoreLine);
    s._body.appendChild(scoreMeta);

    var reset = make("button", "score__reset reveal", "Play it again");
    reset.type = "button";
    reset.addEventListener("click", function () {
      window.location.reload();
    });
    s._body.appendChild(reset);
    return s;
  }

  function updateScore() {
    if (!scoreLine) return;
    var total = quizState.length;
    var done  = quizState.filter(function (q) { return q.answered; }).length;
    var right = quizState.filter(function (q) { return q.correct; }).length;

    var msg;
    if (done === 0) {
      msg = "Nothing guessed yet. He would say that's completely fine. He would be lying.";
    } else if (right === 0) {
      msg = "Zero so far. Bold. He respects conviction more than accuracy anyway.";
    } else if (right < total) {
      msg = right + " of " + total + ". Close enough to be invited to the wedding. Any of them.";
    } else {
      msg = "All " + total + ". You may now be trusted with the biryani recipe.";
    }

    scoreLine.textContent = msg;
    scoreMeta.textContent = right + " of " + total + " guessed right · " +
      done + " of " + total + " answered";
  }


  /* --------------------------- build the stream -------------------------- */

  CATEGORIES.forEach(function (cat, ci) {
    var group = MEMORIES.filter(function (m) { return m.category === cat.id; });
    if (!group.length) return;

    stream.appendChild(chapterScene(cat, ci));

    group.forEach(function (item, i) {
      var code = pad(i + 1);
      if (item.type === "voice")      stream.appendChild(voiceScene(item, cat, code));
      else if (item.type === "quiz")  stream.appendChild(quizScene(item, cat, code));
      else                            stream.appendChild(memoryScene(item, cat, code));
    });

    if (cat.id === "trivia" && quizState.length) {
      stream.appendChild(scorecardScene(cat));
    }
  });

  updateScore();


  /* --------------------------- the focus engine -------------------------- */
  /* Every scene gets a --f value between 0 (invisible, blurred, dark) and
     1 (dead centre, sharp, lit). CSS does the rest.                         */

  var scenes = Array.prototype.slice.call(stream.querySelectorAll("[data-focus]"));
  var live = new Set();
  var ticking = false;
  var activeCat = null;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        live.add(e.target);
      } else {
        live.delete(e.target);
        e.target.style.setProperty("--f", "0");
      }
    });
    requestUpdate();
  }, { rootMargin: "30% 0px 30% 0px", threshold: 0 });

  scenes.forEach(function (s) { io.observe(s); });

  function setActive(catId) {
    if (catId === activeCat) return;
    activeCat = catId;
    var index = 0;
    CATEGORIES.forEach(function (c, i) { if (c.id === catId) index = i; });

    railItems.forEach(function (li, i) {
      li.classList.toggle("is-active", li.dataset.cat === catId);
      li.classList.toggle("is-done", i < index);
    });

    railMeta.textContent = pad(index + 1) + " / " + pad(CATEGORIES.length);

    if (window.innerWidth <= 900) {
      var btn = railItems[index];
      if (btn) {
        railList.scrollTo({
          left: btn.offsetLeft - (railList.clientWidth - btn.offsetWidth) / 2,
          behavior: reduceMotion.matches ? "auto" : "smooth"
        });
      }
    }
  }

  function update() {
    ticking = false;

    var vh = window.innerHeight;
    var centre = vh / 2;
    var window_ = vh * FOCUS_SPAN;    // how far from centre a scene can still glow
    var best = null, bestF = -1;

    live.forEach(function (s) {
      var r = s.getBoundingClientRect();
      var c = r.top + r.height / 2;
      var f = 1 - Math.abs(c - centre) / window_;
      f = clamp(f, 0, 1);
      f = f * f * (3 - 2 * f);         // smoothstep
      s.style.setProperty("--f", f.toFixed(3));
      if (f > bestF) { bestF = f; best = s; }
    });

    if (best && best.dataset.cat) setActive(best.dataset.cat);

    var top = stage.getBoundingClientRect().top;
    var span = stage.offsetHeight - vh;
    railFill.style.setProperty("--p", String(span > 0 ? clamp(-top / span, 0, 1) : 0));
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", function () {
    relabelRail();
    requestUpdate();
  });


  /* ------------------------- hero / navigation --------------------------- */

  var heroIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      document.body.classList.toggle("is-hero", e.intersectionRatio > 0.4);
    });
  }, { threshold: [0, 0.4, 0.8] });
  heroIO.observe(heroEl);

  document.getElementById("enter").addEventListener("click", function () {
    var first = stream.querySelector(".scene");
    if (!first) return;
    first.scrollIntoView({
      behavior: reduceMotion.matches ? "auto" : "smooth",
      block: "start"
    });
    first.focus({ preventScroll: true });
  });

  document.getElementById("back-to-top").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" });
    document.getElementById("enter").focus({ preventScroll: true });
  });

  /* keep the focused scene lit when someone tabs into it */
  stream.addEventListener("focusin", requestUpdate);

  relabelRail();
  setActive(CATEGORIES[0].id);
  requestUpdate();
  window.addEventListener("load", requestUpdate);
})();
